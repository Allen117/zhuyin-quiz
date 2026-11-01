// 作答紀錄與弱點統計。紀錄只存在這台裝置的瀏覽器裡（localStorage），不會上傳。
// 每次交卷存一筆：{ t, exam, score, total, items: [{ n, type, word, ok, parts }] }
//   parts：這題的每一格，{ ans: 正確答案, got: 學生寫的, tested: 考到的符號和聲調, errs: 錯在哪 }
//   errs 例如 'ㄢ→ㄤ'（該寫ㄢ寫成ㄤ）、'ˊ→ˇ'；'?' 表示差太多，看不出錯在哪；'空白' 表示沒寫
//   聲調：一聲記成 ˉ；∅ 表示沒有這個位置（例如漏寫介音是 'ㄧ→∅'）
window.LOG = (() => {
  const KEY = 'zhuyin-log-v1';
  const INITIALS = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ';
  const MEDIALS = 'ㄧㄨㄩ';
  const DECAY = 0.7;   // 每考一次，舊的錯誤就淡一點；連續答對幾次，弱點分數就會降下來

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; }
  }
  function add(attempt) {
    const list = load();
    list.push(attempt);
    navigator.storage?.persist?.();   // 請瀏覽器不要自動清掉
    return save(list);
  }

  // 音節拆成 聲母 i、介音 m、韻母 f、聲調 t
  function slots(z = '') {
    const s = { i: '', m: '', f: '', t: 'ˉ' };
    for (const c of z) {
      if (c === '˙' || 'ˊˇˋ'.includes(c)) s.t = c;
      else if (INITIALS.includes(c)) s.i = c;
      else if (MEDIALS.includes(c) && !s.m && !s.f) s.m = c;
      else s.f = c;
    }
    return s;
  }
  const compose = s => (s.t === '˙' ? '˙' : '') + s.i + s.m + s.f + ('ˊˇˋ'.includes(s.t) ? s.t : '');
  const tested = z => { const s = slots(z); return [s.i, s.m, s.f, s.t].filter(Boolean); };
  const withTone = (base, t) => (t === '˙' ? '˙' + base : base + t);

  // 比對正確答案和學生寫的，找出錯在哪幾個位置；錯超過兩處就當作看不出原因
  function diff(ans, got) {
    if (!got || got === '?') return ['?'];
    const a = slots(ans), b = slots(got);
    const errs = ['i', 'm', 'f', 't'].filter(k => a[k] !== b[k]).map(k => `${a[k] || '∅'}→${b[k] || '∅'}`);
    return errs.length > 2 ? ['?'] : errs;
  }
  // 一格整個字的作答；沒寫記成 '空白'（扣分，但看不出哪個符號不會，不算進弱點）
  const part = (ans, got = '') => ({ ans, got, tested: tested(ans), errs: got === ans ? [] : !got ? ['空白'] : diff(ans, got) });
  // 一格只補聲調的作答
  const tonePart = (base, ans, got = '') => ({
    ans: withTone(base, ans), got: got && withTone(base, got), tested: [ans],
    errs: got === ans ? [] : [got ? `${ans}→${got}` : '空白'],
  });

  // 統計：每個符號考過幾次、錯幾次、目前弱點分數 w；常混淆的組合；各題型正確率
  function stats(list = load()) {
    const syms = {}, pairs = {}, types = {};
    for (const a of list) for (const it of a.items) {
      const ty = types[it.type] ??= { n: 0, ok: 0 };
      ty.n++;
      if (it.ok) ty.ok++;
      for (const p of it.parts) {
        if (p.errs.includes('空白')) continue;
        for (const s of p.tested) {
          const st = syms[s] ??= { n: 0, wrong: 0, w: 0, last: 0 };
          const hit = p.errs.some(e => e.startsWith(s + '→'));
          const vague = !hit && p.errs.includes('?');
          st.n++;
          if (hit || vague) { st.wrong++; st.last = a.t; }
          st.w = st.w * DECAY + (hit ? 1 : vague ? 0.5 : 0);
        }
        for (const e of p.errs) {
          if (e === '?') continue;
          const [x, y] = e.split('→');
          const key = [x, y].sort().join('|');
          const pr = pairs[key] ??= { pair: [x, y].sort(), n: 0, dirs: {}, last: 0 };
          pr.n++;
          pr.dirs[e] = (pr.dirs[e] ?? 0) + 1;
          pr.last = a.t;
        }
      }
    }
    return { syms, pairs, types };
  }

  // 學生把 s 和哪些符號搞混過、各幾次（出題時拿來當誘答）
  function partners(st) {
    const out = {};
    for (const { pair: [x, y], n } of Object.values(st.pairs)) {
      if (x === '∅' || y === '∅') continue;
      (out[x] ??= {})[y] = n;
      (out[y] ??= {})[x] = n;
    }
    return out;
  }

  return { load, save, add, clear: () => save([]), slots, compose, tested, withTone, diff, part, tonePart, stats, partners };
})();
