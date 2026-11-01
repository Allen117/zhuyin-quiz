// 檢查新版：iPad「加入主畫面」後，切回 App 時不會重新載入，GitHub 更新了也看不到。
// 開頁時記下這一版的檔案（頁面本身＋同站的 .js），之後每次回到畫面就向伺服器抓最新的比對，
// 不一樣就在下方跳出「更新」。不自動重新載入：卷面作答沒存檔，重新載入會清掉。
// 放在每頁最後面載入，頁面有 ruby() 就用它幫按鈕加注音。
(() => {
  if (!/^https?:$/.test(location.protocol)) return;   // file:// 開的不用檢查

  const files = [location.pathname, ...[...document.scripts]
    .filter(s => s.src && new URL(s.src).origin === location.origin)
    .map(s => new URL(s.src).pathname)];
  const read = (f, cache) => fetch(f, { cache }).then(r => r.ok ? r.text() : null).catch(() => null);

  let base = null, lastCheck = 0, shown = false;
  const ready = Promise.all(files.map(f => read(f, 'force-cache'))).then(t => { base = t; });

  async function check() {
    if (shown || Date.now() - lastCheck < 60000) return;
    lastCheck = Date.now();
    await ready;
    // 'reload'：跳過快取向伺服器拿，順便更新快取，按「更新」重新載入時就會拿到新的
    const now = await Promise.all(files.map(f => read(f, 'reload')));
    if (now.some((t, i) => t !== null && base[i] !== null && t !== base[i])) show();
  }

  function show() {
    shown = true;
    const lbl = s => typeof ruby === 'function' ? ruby(s) : s.replace(/\([^)]*\)/g, '');
    const css = document.createElement('style');
    css.textContent = `
      #update-bar { position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 1000;
        display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px;
        background: #333; color: #fff; font: 22px system-ui, sans-serif; box-shadow: 0 4px 16px rgba(0,0,0,.3); }
      #update-bar button { font: inherit; padding: 6px 14px; border: 0; border-radius: 8px; cursor: pointer; }
      #update-bar .go { background: #2a7ae2; color: #fff; }
      #update-bar .x { background: #555; color: #fff; }
      @media print { #update-bar { display: none; } }`;
    const bar = document.createElement('div');
    bar.id = 'update-bar';
    bar.innerHTML = `<span>🆕 ${lbl('有(ㄧㄡˇ)新(ㄒㄧㄣ)版(ㄅㄢˇ)本(ㄅㄣˇ)')}</span>
      <button class="go">${lbl('更(ㄍㄥˋ)新(ㄒㄧㄣ)')}</button><button class="x">✕</button>`;
    bar.querySelector('.go').onclick = () => location.reload();
    bar.querySelector('.x').onclick = () => bar.remove();
    document.head.append(css);
    document.body.append(bar);
  }

  check();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
  addEventListener('pageshow', e => { if (e.persisted) check(); });
})();
