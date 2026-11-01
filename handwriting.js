// 注音手寫辨識（不需網路、不需訓練資料）
// 做法：把學生的筆跡和「用字型畫出來的注音符號」都縮放到 N×N 格子、細化成單線，
// 再用 chamfer 距離（兩邊的線互相離多遠）比對，距離越小越像。
window.HW = (() => {
  const SYMS = [...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'];
  const FONTS = [
    '"DFKai-SB", "BiauKai", "標楷體", "Kaiti TC", serif',
    '"Microsoft JhengHei", "PingFang TC", "Noto Sans TC", sans-serif',
  ];
  const N = 48;      // 比對格子大小
  const PAD = 4;     // 格子四周留白
  let templates = null;   // [{ sym, ink: [idx...], dt: Float32Array }]

  // ---- 影像工具 ----
  // 把 canvas 的某塊區域（保持長寬比、置中）縮到 N×N，回傳 0/1 陣列
  function toGrid(src, bx, by, bw, bh) {
    const c = document.createElement('canvas');
    c.width = c.height = N;
    const ctx = c.getContext('2d');
    const s = (N - 2 * PAD) / Math.max(bw, bh);
    const dw = bw * s, dh = bh * s;
    ctx.drawImage(src, bx, by, bw, bh, (N - dw) / 2, (N - dh) / 2, dw, dh);
    const a = ctx.getImageData(0, 0, N, N).data;
    const g = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) g[i] = a[i * 4 + 3] > 90 ? 1 : 0;
    return g;
  }

  // 墨跡的外框
  function inkBox(ctx, w, h) {
    const a = ctx.getImageData(0, 0, w, h).data;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (a[(y * w + x) * 4 + 3] > 90) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
    return x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
  }

  // Zhang-Suen 細化：粗線變成一個像素寬的骨架
  function thin(g) {
    const at = (x, y) => (x < 0 || y < 0 || x >= N || y >= N) ? 0 : g[y * N + x];
    let changed = true;
    while (changed) {
      changed = false;
      for (const step of [0, 1]) {
        const del = [];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          if (!g[y * N + x]) continue;
          const p = [at(x, y - 1), at(x + 1, y - 1), at(x + 1, y), at(x + 1, y + 1),
                     at(x, y + 1), at(x - 1, y + 1), at(x - 1, y), at(x - 1, y - 1)];
          const b = p.reduce((s, v) => s + v, 0);
          if (b < 2 || b > 6) continue;
          let a = 0;
          for (let i = 0; i < 8; i++) if (!p[i] && p[(i + 1) % 8]) a++;
          if (a !== 1) continue;
          if (step === 0 && (p[0] * p[2] * p[4] || p[2] * p[4] * p[6])) continue;
          if (step === 1 && (p[0] * p[2] * p[6] || p[0] * p[4] * p[6])) continue;
          del.push(y * N + x);
        }
        for (const i of del) g[i] = 0;
        if (del.length) changed = true;
      }
    }
    return g;
  }

  // 距離轉換（3-4 chamfer）：每一格離最近墨跡多遠
  function distance(g) {
    const d = new Float32Array(N * N);
    for (let i = 0; i < N * N; i++) d[i] = g[i] ? 0 : 1e6;
    const relax = (i, j, c) => { if (d[j] + c < d[i]) d[i] = d[j] + c; };
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const i = y * N + x;
      if (x > 0) relax(i, i - 1, 3);
      if (y > 0) {
        relax(i, i - N, 3);
        if (x > 0) relax(i, i - N - 1, 4);
        if (x < N - 1) relax(i, i - N + 1, 4);
      }
    }
    for (let y = N - 1; y >= 0; y--) for (let x = N - 1; x >= 0; x--) {
      const i = y * N + x;
      if (x < N - 1) relax(i, i + 1, 3);
      if (y < N - 1) {
        relax(i, i + N, 3);
        if (x < N - 1) relax(i, i + N + 1, 4);
        if (x > 0) relax(i, i + N - 1, 4);
      }
    }
    for (let i = 0; i < N * N; i++) d[i] /= 3;
    return d;
  }

  const inkOf = g => { const r = []; for (let i = 0; i < N * N; i++) if (g[i]) r.push(i); return r; };

  // ---- 範本：用字型把每個符號畫出來 ----
  // 有預先算好的 hw-templates.js（window.HW_TEMPLATES）就用它，各平板結果才會一致；
  // 沒有的話才用這台裝置上的字型現場畫。
  function buildTemplates() {
    templates = [];
    if (window.HW_TEMPLATES) {
      for (const { sym, bits } of window.HW_TEMPLATES) {
        const raw = atob(bits);
        const g = new Uint8Array(N * N);
        for (let i = 0; i < N * N; i++) g[i] = (raw.charCodeAt(i >> 3) >> (i & 7)) & 1;
        templates.push({ sym, g, ink: inkOf(g), dt: distance(g) });
      }
      return;
    }
    const S = 240;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    for (const font of FONTS) for (const sym of SYMS) {
      ctx.clearRect(0, 0, S, S);
      ctx.font = `200px ${font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sym, S / 2, S / 2);
      const box = inkBox(ctx, S, S);
      if (!box) continue;
      const g = thin(toGrid(c, box.x, box.y, box.w, box.h));
      templates.push({ sym, g, ink: inkOf(g), dt: distance(g) });
    }
  }

  // ---- 學生筆跡 → 格子 ----
  // strokes：[[{x, y}, ...], ...]（任意座標）
  function strokesToGrid(strokes) {
    const pts = strokes.flat();
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const x0 = Math.min(...xs), y0 = Math.min(...ys);
    const bw = Math.max(...xs) - x0, bh = Math.max(...ys) - y0;
    const s = (N - 2 * PAD) / Math.max(bw, bh, 1);
    const ox = (N - bw * s) / 2, oy = (N - bh * s) / 2;
    const c = document.createElement('canvas');
    c.width = c.height = N;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.lineWidth = 2.5;
    ctx.lineCap = ctx.lineJoin = 'round';
    for (const st of strokes) {
      ctx.beginPath();
      st.forEach((p, i) => {
        const x = ox + (p.x - x0) * s, y = oy + (p.y - y0) * s;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      if (st.length === 1) ctx.lineTo(ox + (st[0].x - x0) * s + .1, oy + (st[0].y - y0) * s);
      ctx.stroke();
    }
    const a = ctx.getImageData(0, 0, N, N).data;
    const g = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) g[i] = a[i * 4 + 3] > 90 ? 1 : 0;
    return thin(g);
  }

  // 回傳最像的 k 個符號（由像到不像）
  function recognize(strokes, k = 5) {
    if (!strokes.length) return [];
    if (!templates) buildTemplates();
    const g = strokesToGrid(strokes);
    const ink = inkOf(g);
    if (!ink.length) return [];
    const dt = distance(g);
    const best = new Map();
    for (const t of templates) {
      let a = 0, b = 0;
      for (const i of ink) a += t.dt[i];
      for (const i of t.ink) b += dt[i];
      const score = a / ink.length + b / t.ink.length;
      if (!best.has(t.sym) || score < best.get(t.sym)) best.set(t.sym, score);
    }
    return [...best].sort((p, q) => p[1] - q[1]).slice(0, k).map(([sym, score]) => ({ sym, score }));
  }

  // 產生 hw-templates.js 的內容（開發用：在有標楷體的電腦上執行一次）
  function exportTemplates() {
    const saved = window.HW_TEMPLATES;
    window.HW_TEMPLATES = null;
    buildTemplates();
    window.HW_TEMPLATES = saved;
    const data = templates.map(({ sym, g }) => {
      const bytes = new Uint8Array(N * N / 8);
      g.forEach((v, i) => { if (v) bytes[i >> 3] |= 1 << (i & 7); });
      return { sym, bits: btoa(String.fromCharCode(...bytes)) };
    });
    return `// 手寫辨識範本（由 HW.exportTemplates() 產生，請勿手動修改）
window.HW_TEMPLATES = [
${data.map(d => `  ${JSON.stringify(d)},`).join('\n')}
];
`;
  }

  // 聲調：筆畫很簡單，直接看形狀判斷，不用範本
  // size 是寫字格的邊長（用來判斷「很小的一點」＝輕聲）。回傳 '' 一聲（沒寫或寫一橫）、'ˊ' 'ˇ' 'ˋ' '˙'
  function recognizeTone(strokes, size) {
    const pts = strokes.flat();
    if (!pts.length) return '';
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const w = x1 - x0, h = y1 - y0;
    if (Math.max(w, h) < size * 0.2) return '˙';
    if (h < w * 0.3) return '';                     // 一橫：一聲
    // 最左、最右的點都比最低點高很多 → 打勾的 ˇ
    const yAt = x => pts.find(p => p.x === x).y;
    if (w > h * 0.4 && y1 - yAt(x0) > h * 0.4 && y1 - yAt(x1) > h * 0.4) return 'ˇ';
    // 往右上斜是 ˊ，往右下斜是 ˋ（畫布的 y 往下變大）
    const mx = xs.reduce((s, v) => s + v, 0) / pts.length, my = ys.reduce((s, v) => s + v, 0) / pts.length;
    const cov = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0);
    return cov < 0 ? 'ˊ' : 'ˋ';
  }

  return { recognize, recognizeTone, exportTemplates, SYMS, warmUp: () => { if (!templates) buildTemplates(); } };
})();
