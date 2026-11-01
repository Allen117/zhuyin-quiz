// 自動出題：從 bank.js 的用字庫抽字，組成和試卷1～3 一樣結構的考卷（9 大題、35 題）。
// 有作答紀錄時，會多抽含有學生弱點符號的字，誘答選項也優先用他常混淆的符號。
// 出好的考卷存在這台裝置的瀏覽器裡，最多留 MAX_SAVED 份。
window.GEN = (() => {
  const { slots, compose, tested } = window.LOG;
  const SAVE_KEY = 'zhuyin-gen-v1';
  const MAX_SAVED = 6;

  // ---- 合法音節（不含聲調）：誘答選項只用這裡面有的，才不會出現拼不出來的音 ----
  const G1 = 'ㄚ ㄜ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ ㄨㄚ ㄨㄛ ㄨㄞ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄤ ㄨㄥ';   // ㄍㄎㄏ
  const G2 = 'ㄧ ㄧㄚ ㄧㄝ ㄧㄠ ㄧㄡ ㄧㄢ ㄧㄣ ㄧㄤ ㄧㄥ ㄩ ㄩㄝ ㄩㄢ ㄩㄣ ㄩㄥ';                 // ㄐㄑㄒ
  const G3 = '∅ ㄚ ㄜ ㄞ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ ㄨㄛ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄥ';                       // ㄗㄘㄙ
  const RHYMES = {
    '': 'ㄚ ㄛ ㄜ ㄝ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄦ ㄧ ㄧㄚ ㄧㄝ ㄧㄠ ㄧㄡ ㄧㄢ ㄧㄣ ㄧㄤ ㄧㄥ ㄨ ㄨㄚ ㄨㄛ ㄨㄞ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄤ ㄨㄥ ㄩ ㄩㄝ ㄩㄢ ㄩㄣ ㄩㄥ',
    'ㄅ': 'ㄚ ㄛ ㄞ ㄟ ㄠ ㄢ ㄣ ㄤ ㄥ ㄧ ㄧㄝ ㄧㄠ ㄧㄢ ㄧㄣ ㄧㄥ ㄨ',
    'ㄆ': 'ㄚ ㄛ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄧ ㄧㄝ ㄧㄠ ㄧㄢ ㄧㄣ ㄧㄥ ㄨ',
    'ㄇ': 'ㄚ ㄛ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄧ ㄧㄝ ㄧㄠ ㄧㄡ ㄧㄢ ㄧㄣ ㄧㄥ ㄨ',
    'ㄈ': 'ㄚ ㄛ ㄟ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ',
    'ㄉ': 'ㄚ ㄜ ㄞ ㄟ ㄠ ㄡ ㄢ ㄤ ㄥ ㄧ ㄧㄝ ㄧㄠ ㄧㄡ ㄧㄢ ㄧㄥ ㄨ ㄨㄛ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄥ',
    'ㄊ': 'ㄚ ㄜ ㄞ ㄠ ㄡ ㄢ ㄤ ㄥ ㄧ ㄧㄝ ㄧㄠ ㄧㄢ ㄧㄥ ㄨ ㄨㄛ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄥ',
    'ㄋ': 'ㄚ ㄜ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄧ ㄧㄝ ㄧㄠ ㄧㄡ ㄧㄢ ㄧㄣ ㄧㄤ ㄧㄥ ㄨ ㄨㄛ ㄨㄢ ㄨㄥ ㄩ ㄩㄝ',
    'ㄌ': 'ㄚ ㄜ ㄞ ㄟ ㄠ ㄡ ㄢ ㄤ ㄥ ㄧ ㄧㄚ ㄧㄝ ㄧㄠ ㄧㄡ ㄧㄢ ㄧㄣ ㄧㄤ ㄧㄥ ㄨ ㄨㄛ ㄨㄢ ㄨㄣ ㄨㄥ ㄩ ㄩㄝ',
    'ㄍ': G1, 'ㄎ': G1, 'ㄏ': G1,
    'ㄐ': G2, 'ㄑ': G2, 'ㄒ': G2,
    'ㄓ': '∅ ㄚ ㄜ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ ㄨㄚ ㄨㄛ ㄨㄞ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄤ ㄨㄥ',
    'ㄔ': '∅ ㄚ ㄜ ㄞ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ ㄨㄛ ㄨㄞ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄤ ㄨㄥ',
    'ㄕ': '∅ ㄚ ㄜ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ ㄨㄚ ㄨㄛ ㄨㄞ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄤ',
    'ㄖ': '∅ ㄜ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄨ ㄨㄛ ㄨㄟ ㄨㄢ ㄨㄣ ㄨㄥ',
    'ㄗ': G3, 'ㄘ': G3, 'ㄙ': G3,
  };
  const VALID = new Set();
  for (const [ini, list] of Object.entries(RHYMES)) for (const r of list.split(' ')) VALID.add(ini + (r === '∅' ? '' : r));
  const baseOf = z => z.replace(/[ˊˇˋ˙]/g, '');
  const isValid = z => VALID.has(baseOf(z));

  // 一年級常混淆的符號（CLAUDE.md 出題規則）；學生自己搞混過的會另外加進來
  const CONFUSE = [['ㄅ', 'ㄆ'], ['ㄋ', 'ㄌ'], ['ㄈ', 'ㄏ'], ['ㄓ', 'ㄗ'], ['ㄔ', 'ㄘ'], ['ㄕ', 'ㄙ'], ['ㄐ', 'ㄑ'], ['ㄑ', 'ㄒ'], ['ㄐ', 'ㄒ'],
    ['ㄢ', 'ㄤ'], ['ㄣ', 'ㄥ'], ['ㄛ', 'ㄡ'], ['ㄜ', 'ㄝ'], ['ㄠ', 'ㄡ'], ['ㄧ', 'ㄩ']];
  // 長得像的符號（圈符號題用）
  const LOOKALIKE = [['ㄅ', 'ㄆ', 'ㄉ'], ['ㄛ', 'ㄜ', 'ㄝ'], ['ㄊ', 'ㄒ', 'ㄠ'], ['ㄢ', 'ㄤ', 'ㄣ'], ['ㄇ', 'ㄈ', 'ㄏ'], ['ㄓ', 'ㄗ', 'ㄔ'],
    ['ㄘ', 'ㄔ', 'ㄑ'], ['ㄐ', 'ㄑ', 'ㄒ'], ['ㄍ', 'ㄎ', 'ㄐ'], ['ㄋ', 'ㄌ', 'ㄎ'], ['ㄙ', 'ㄥ', 'ㄠ'], ['ㄚ', 'ㄞ', 'ㄟ']];
  const symClass = c => 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ'.includes(c) ? 'i' : 'ㄧㄨㄩ'.includes(c) ? 'm' : 'f';

  // 大題標題（和試卷1～3 相同）
  const T = {
    match: '一、連(ㄌㄧㄢˊ)連(ㄌㄧㄢˊ)看(ㄎㄢˋ)',
    findSym: '二、圈(ㄑㄩㄢ)出(ㄔㄨ)相(ㄒㄧㄤ)同(ㄊㄨㄥˊ)的(˙ㄉㄜ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
    choice: '三、看(ㄎㄢˋ)圖(ㄊㄨˊ)選(ㄒㄩㄢˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
    pickPic: '四、看(ㄎㄢˋ)注(ㄓㄨˋ)音(ㄧㄣ)選(ㄒㄩㄢˇ)圖(ㄊㄨˊ)',
    judge: '五、對(ㄉㄨㄟˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)○，錯(ㄘㄨㄛˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)×',
    pickWord: '六、選(ㄒㄩㄢˇ)詞(ㄘˊ)填(ㄊㄧㄢˊ)空(ㄎㄨㄥˋ)',
    fill: '七、補(ㄅㄨˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
    wordBlank: '（一）看(ㄎㄢˋ)圖(ㄊㄨˊ)補(ㄅㄨˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
    sentence: '（二）看(ㄎㄢˋ)圖(ㄊㄨˊ)完(ㄨㄢˊ)成(ㄔㄥˊ)句(ㄐㄩˋ)子(˙ㄗ)',
    toneSentence: '八、補(ㄅㄨˇ)上(ㄕㄤˋ)聲(ㄕㄥ)調(ㄉㄧㄠˋ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
    dictation: '九、聽(ㄊㄧㄥ)寫(ㄒㄧㄝˇ)（按(ㄢˋ)🔊聽(ㄊㄧㄥ)）',
  };

  // ---- 用字庫 ----
  // groups：每組 [ ] 裡有幾個字
  function parseSentence(text) {
    const blank = [], ctx = [], groups = [];
    let inBlank = false, w = '';
    for (const m of text.matchAll(/\[|\]|([^()\[\]])\(([^)]+)\)/g)) {
      if (m[0] === '[') { inBlank = true; groups.push(0); }
      else if (m[0] === ']') inBlank = false;
      else if (inBlank) { blank.push(m[2]); w += m[1]; groups[groups.length - 1]++; }
      else ctx.push(m[2]);
    }
    return { blank, ctx, w, groups };
  }
  const sylsOf = s => [...s.matchAll(/\(([^)]+)\)/g)].map(m => m[1]);
  // 選詞填空：[ ] 裡是正確的詞，考卷上換成空的 [ ]
  function parsePick([text, wrong]) {
    const m = text.match(/\[([^\]]*)\]/);
    const ans = m?.[1] ?? '';
    return { text: text.replace(/\[[^\]]*\]/, '[ ]'), ans, wrong, w: ans.replace(/\([^)]*\)/g, ''), syls: [...sylsOf(text), ...sylsOf(wrong)] };
  }
  const B = window.BANK;
  const SINGLE = B.single.map(([w, z, e, c]) => ({ w, z: [z], e, c }));
  const WORDS = B.words.map(([w, z, e, c]) => ({ w, z: z.split(' '), e, c }));
  const SENTS = B.sentences.map(([e, text, scene]) => ({ e, text, scene, ...parseSentence(text) }));
  const TONES = B.toneSentences.map(([e, text]) => ({ e, text, ...parseSentence(text) }));
  const DICT = B.dictation.map(([w, z]) => ({ w, z: z.split(' ') }));
  const PICKS = B.pickWords.map(parsePick);

  // 檢查用字庫有沒有打錯（老師頁會列出來）
  function check() {
    const bad = [];
    const syl = (where, z) => {
      if (/[´^'`ˉ]/.test(z)) bad.push(`${where}：「${z}」聲調符號要用 ˊ ˇ ˋ ˙`);
      else if (!isValid(z)) bad.push(`${where}：「${z}」不是合法的音節`);
      else if (z.includes('˙') && !z.startsWith('˙')) bad.push(`${where}：「${z}」輕聲 ˙ 要寫在最前面`);
    };
    const seen = {};
    const emoji = (where, e) => { if (seen[e]) bad.push(`${where}：${e} 和「${seen[e]}」用了同一個圖`); else seen[e] = where; };
    SINGLE.forEach(x => { syl(x.w, x.z[0]); emoji(x.w, x.e); });
    WORDS.forEach(x => {
      if (x.z.length !== [...x.w].length) bad.push(`${x.w}：字數和注音數不一樣`);
      x.z.forEach(z => syl(x.w, z));
      emoji(x.w, x.e);
    });
    SENTS.forEach(x => {
      [...x.blank, ...x.ctx].forEach(z => syl(x.text, z));
      if (x.groups.length !== 2 || x.groups.some(n => n !== 1)) bad.push(`${x.text}：要有兩組 [ ]，各包住一個字`);
      if (x.blank.some(z => z.includes('˙'))) bad.push(`${x.text}：挖空的字不能是輕聲`);
      if (!/^scenes\/.+\.svg$/.test(x.scene ?? '')) bad.push(`${x.text}：缺少情境插圖（scenes/….svg）`);
    });
    PICKS.forEach(x => {
      x.syls.forEach(z => syl(x.text, z));
      if (!x.ans || (x.text.match(/\[/g) ?? []).length !== 1) bad.push(`${x.text}：要有一組 [ ] 包住正確的詞`);
      if (!sylsOf(x.wrong).length) bad.push(`${x.text}：錯的詞要用「字(注音)」寫法`);
    });
    TONES.forEach(x => {
      [...x.blank, ...x.ctx].forEach(z => syl(x.text, z));
      if (x.blank.length !== 1) bad.push(`${x.text}：[ ] 裡只能有 1 個字`);
      else if (!/[ˊˇˋ]$/.test(x.blank[0])) bad.push(`${x.text}：挖空的字要是二、三、四聲`);
    });
    DICT.forEach(x => {
      if (x.z.length !== [...x.w].length) bad.push(`${x.w}：字數和注音數不一樣`);
      x.z.forEach(z => syl(x.w, z));
      if (x.z.some(z => z.includes('˙'))) bad.push(`${x.w}：聽寫不能有輕聲`);
    });
    return bad;
  }

  // ---- 亂數小工具 ----
  const rand = n => Math.floor(Math.random() * n);
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function wpick(list, wf) {
    const ws = list.map(wf);
    let r = Math.random() * ws.reduce((a, b) => a + b, 0);
    if (!(r > 0)) return null;
    for (let i = 0; i < list.length; i++) if ((r -= ws[i]) < 0) return list[i];
    return list[list.length - 1];
  }
  const insertAt = (arr, x, i) => [...arr.slice(0, i), x, ...arr.slice(i)];
  // 答案位置要分散：①②③ 不重複地用，題數多於 3 時多的隨機，再打亂
  const positions = n => {
    const p = shuffle([0, 1, 2]);
    while (p.length < n) p.push(rand(3));
    return shuffle(p.slice(0, n));
  };
  // 兩個選項：①② 各一半
  const positions2 = n => shuffle(Array.from({ length: n }, (_, i) => i % 2));

  const RETRY = Symbol('retry');

  // ---- 出一份卷 ----
  function generate(no, { stats = window.LOG.stats(), recent = new Set() } = {}) {
    const W = s => stats.syms[s]?.w ?? 0;
    const mates = window.LOG.partners(stats);
    const P = (a, b) => mates[a]?.[b] ?? 0;
    const sylW = z => tested(z).reduce((a, s) => a + W(s), 0);
    const weightOf = zs => 1 + 3 * Math.min(3, zs.reduce((a, z) => a + sylW(z), 0));

    // 同一份卷裡：每個答案只考一次，題目上顯示的注音不能剛好是別題的答案，同一張圖只用一次
    const used = { ans: new Set(), shown: new Set(), emoji: new Set(), key: new Set(), cat: {} };
    const fits = p => p.ans.every(z => !used.ans.has(z) && !used.shown.has(z))
      && new Set(p.ans).size === p.ans.length
      && p.shown.every(z => !used.ans.has(z))
      && (p.emojis ?? []).every(e => !used.emoji.has(e));
    const take = (key, p, cat) => {
      used.key.add(key);
      p.ans.forEach(z => used.ans.add(z));
      p.shown.forEach(z => used.shown.add(z));
      (p.emojis ?? []).forEach(e => used.emoji.add(e));
      if (cat) used.cat[cat] = (used.cat[cat] ?? 0) + 1;
    };
    const keyOf = x => x.text ?? x.w;   // 和 recentKeys 記的一樣：句子記 text，其他記國字
    // 從 pool 抽 n 題；plan(x) 回傳 null（這個字不能用）或 { ans, shown, emojis, weight, item }
    function draw(pool, n, plan) {
      const out = [];
      while (out.length < n) {
        const cands = pool.filter(x => !used.key.has(keyOf(x)))
          .map(x => [x, plan(x)]).filter(([, p]) => p && fits(p));
        const pick = wpick(cands, ([x, p]) => p.weight
          / (1 + 0.6 * (used.cat[x.c] ?? 0))         // 題材分散
          * (recent.has(keyOf(x)) ? 0.3 : 1));       // 最近出過的少出
        if (!pick) throw RETRY;
        take(keyOf(pick[0]), pick[1], pick[0].c);
        out.push(pick[1].item);
      }
      return out;
    }

    // 誘答：只換一個地方（聲母、介音、韻母或聲調），優先換成學生搞混過的
    function variants(z) {
      const s = slots(z), out = [];
      for (const k of ['i', 'm', 'f']) {
        if (!s[k]) continue;
        const alts = new Set([...CONFUSE.filter(p => p.includes(s[k])).flat(), ...Object.keys(mates[s[k]] ?? {})]);
        for (const alt of alts) {
          if (alt === s[k] || symClass(alt) !== k) continue;
          const v = compose({ ...s, [k]: alt });
          if (isValid(v)) out.push({ z: v, w: 1 + 3 * P(s[k], alt) });
        }
      }
      if (s.t !== '˙') for (const t of ['ˉ', 'ˊ', 'ˇ', 'ˋ']) {
        if (t === s.t) continue;
        const hard = (s.t + t === 'ˊˇ' || s.t + t === 'ˇˊ') ? 2 : 0.7;   // 二聲、三聲最容易混
        out.push({ z: compose({ ...s, t }), w: hard + 3 * P(s.t, t) });
      }
      return out;
    }
    function distractors(z, n = 2) {
      let vs = variants(z);
      const out = [];
      while (out.length < n) {
        const v = wpick(vs, v => v.w);
        if (!v) return null;
        out.push(v.z);
        vs = vs.filter(x => x.z !== v.z);
      }
      return out;
    }

    // 句子和聽寫的限制最多，先抽；排版順序照大題
    const sentence = draw(SENTS, 6, x => ({
      ans: x.blank, shown: x.ctx, emojis: [x.e], weight: weightOf(x.blank),
      item: { type: 'sentence', emoji: x.e, scene: x.scene, text: x.text },
    }));
    const toneSentence = draw(TONES, 6, x => {
      const t = x.blank[0].slice(-1);
      return {
        ans: x.blank, shown: x.ctx, emojis: [x.e], weight: 1 + 4 * Math.min(2, W(t)),
        item: { type: 'toneSentence', emoji: x.e, text: x.text },
      };
    });
    const dictPlan = x => ({ ans: x.z, shown: [], weight: weightOf(x.z), item: { type: 'dictation', word: x.w, zhuyin: x.z } });
    const dictation = [
      ...draw(DICT.filter(x => x.z.length === 2), 3, dictPlan),
      ...draw(DICT.filter(x => x.z.length === 3), 2, dictPlan),
    ];

    const judgeFlags = shuffle([true, false]);
    const judge = judgeFlags.map(correct => draw(WORDS, 1, x => {
      if (correct) return { ans: [], shown: x.z, emojis: [x.e], weight: weightOf(x.z), item: { type: 'judge', emoji: x.e, word: x.w, zhuyin: x.z, correct } };
      // 錯的：挑一個字（不挑輕聲），換掉一個地方
      const js = x.z.map((z, j) => j).filter(j => !x.z[j].includes('˙'));
      const j = wpick(js, j => 1 + 3 * sylW(x.z[j]));
      const d = j === null ? null : distractors(x.z[j], 1);
      if (!d) return null;
      const shown = x.z.map((z, k) => k === j ? d[0] : z);
      return { ans: [x.z[j]], shown, emojis: [x.e], weight: weightOf(x.z), item: { type: 'judge', emoji: x.e, word: x.w, zhuyin: shown, correct, fix: x.z[j] } };
    })[0]);

    const wordBlank = draw(WORDS, 6, x => {
      const js = x.z.map((z, j) => j).filter(j => !x.z[j].includes('˙'));
      const j = wpick(js, j => 1 + 3 * sylW(x.z[j]));
      if (j === null) return null;
      return {
        ans: [x.z[j]], shown: x.z.filter((z, k) => k !== j), emojis: [x.e],
        weight: weightOf([x.z[j]]) * (x.z.length > 2 ? 0.5 : 1),
        item: { type: 'wordBlank', emoji: x.e, word: x.w, zhuyin: x.z, blank: j },
      };
    });

    const choicePos = positions(2);
    const choice = draw(SINGLE, 2, x => {
      const d = distractors(x.z[0]);
      if (!d) return null;
      return { ans: x.z, shown: d, emojis: [x.e], weight: weightOf(x.z), item: { type: 'choice', emoji: x.e, word: x.w, d, answer: x.z[0] } };
    }).map(({ d, ...it }, k) => ({ ...it, options: insertAt(d, it.answer, choicePos[k]) }));

    // 看注音選圖：誘答圖挑讀音相近、沒在別題出現過的
    const picPos = positions(2);
    const pickPic = draw(SINGLE, 2, x => {
      const a = slots(x.z[0]);
      let pool = SINGLE.filter(y => y !== x && y.z[0] !== x.z[0] && !used.emoji.has(y.e));
      const ds = [];
      while (ds.length < 2) {
        const y = wpick(pool, y => {
          const b = slots(y.z[0]);
          return 1 + 2 * ['i', 'm', 'f'].filter(k => a[k] && a[k] === b[k]).length + (y.c === x.c ? 1 : 0);
        });
        if (!y) return null;
        ds.push(y.e);
        pool = pool.filter(p => p !== y);
      }
      return { ans: x.z, shown: [], emojis: [x.e, ...ds], weight: weightOf(x.z), item: { type: 'pickPic', zhuyin: x.z[0], word: x.w, d: ds, answer: x.e } };
    }).map(({ d, ...it }, k) => ({ ...it, options: insertAt(d, it.answer, picPos[k]) }));

    const m = draw(SINGLE, 4, x => ({ ans: x.z, shown: [], emojis: [x.e], weight: weightOf(x.z), item: x }));
    let right;
    do right = shuffle([0, 1, 2, 3]); while (right.some((p, i) => p === i));
    const match = [{ type: 'match', pairs: m.map(x => [x.e, x.z[0], x.w]), right }];

    // 選詞填空：整句和兩個選項的注音都會顯示，所以最後抽，避開別題的答案
    const pickPos = positions2(4);
    const pickWord = draw(PICKS, 4, x => ({
      ans: [], shown: x.syls, weight: 1,
      item: { type: 'pickWord', text: x.text, answer: x.ans, wrong: x.wrong },
    })).map(({ wrong, ...it }, k) => ({ ...it, options: insertAt([wrong], it.answer, pickPos[k]) }));

    // 圈符號：挑一組長得像的，目標符號優先挑學生弱的
    const group = wpick(LOOKALIKE, g => 1 + 3 * g.reduce((a, s) => a + W(s), 0));
    const target = wpick(group, s => 1 + 3 * W(s));
    const [o1, o2] = group.filter(s => s !== target);
    let row;
    do row = shuffle([target, target, target, o1, o1, o2, o2]); while (row.some((s, i) => s === row[i + 1]));  // 一樣的不要相鄰
    const findSym = [{ type: 'findSym', target, row }];

    return {
      name: `新卷${no}`,
      title: `一(ㄧ)年(ㄋㄧㄢˊ)級(ㄐㄧˊ)注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)測(ㄘㄜˋ)驗(ㄧㄢˋ)（新(ㄒㄧㄣ)${no}）`,
      sections: [
        { title: T.match, items: match },
        { title: T.findSym, items: findSym },
        { title: T.choice, items: choice },
        { title: T.pickPic, items: pickPic },
        { title: T.judge, items: judge },
        { title: T.pickWord, items: pickWord },
        { title: T.fill, items: [] },
        { title: T.wordBlank, sub: true, items: wordBlank },
        { title: T.sentence, sub: true, items: sentence },
        { title: T.toneSentence, items: toneSentence },
        { title: T.dictation, items: dictation },
      ],
    };
  }

  // ---- 存起來的自出試卷 ----
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY)) ?? { seq: 0, exams: [] }; } catch { return { seq: 0, exams: [] }; }
  }
  const storeSaved = g => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(g)); return true; } catch { return false; } };

  // 最近兩份自出卷用過的字（新卷少出這些）
  function recentKeys(exams) {
    const keys = new Set();
    for (const ex of exams.slice(-2)) for (const sec of ex.sections) for (const it of sec.items) {
      if (it.type === 'match') it.pairs.forEach(p => keys.add(p[2]));
      else if (it.text) keys.add(it.text);
      else if (it.word) keys.add(it.word);
    }
    return keys;
  }

  function create() {
    const g = loadSaved();
    const no = g.seq + 1;
    const opts = { recent: recentKeys(g.exams) };
    let exam = null;
    for (let i = 0; i < 50 && !exam; i++) {
      try { exam = generate(no, opts); } catch (e) { if (e !== RETRY) throw e; }
    }
    if (!exam) throw new Error('用字庫的字不夠，出不了新卷');
    exam.created = Date.now();
    g.seq = no;
    g.exams.push(exam);
    while (g.exams.length > MAX_SAVED) g.exams.shift();
    if (!storeSaved(g)) throw new Error('瀏覽器不能存檔（可能是無痕模式）');
    return exam;
  }
  function remove(name) {
    const g = loadSaved();
    g.exams = g.exams.filter(e => e.name !== name);
    storeSaved(g);
  }
  // 存成 questionsN.js 的格式，放進專案就會變成固定的試卷
  const toJS = ex => {
    const q = s => `'${s}'`;
    const val = v => Array.isArray(v) ? `[${v.map(val).join(', ')}]` : typeof v === 'string' ? q(v) : String(v);
    const item = it => `{ ${Object.entries(it).map(([k, v]) => `${k}: ${val(v)}`).join(', ')} }`;
    const sec = s => `    {\n      title: ${q(s.title)},\n${s.sub ? '      sub: true,\n' : ''}      items: [${s.items.length
      ? `\n${s.items.map(it => `        ${item(it)},`).join('\n')}\n      ` : ''}],\n    },`;
    return `(window.EXAMS ??= []).push({\n  name: ${q(ex.name)},\n  title: ${q(ex.title)},\n  sections: [\n${ex.sections.map(sec).join('\n')}\n  ],\n});\n`;
  };

  return { generate, create, remove, saved: () => loadSaved().exams, dump: loadSaved, restore: storeSaved, toJS, check, isValid, MAX_SAVED };
})();
