import json, pathlib
parts = json.load(open("deck-parts.json"))
DECK_CSS = parts["css"]
DATA = {"slides": parts["slides"], "note": "Edited in place by the team. Keith re-exports the PDF from this page."}

CHROME_CSS = r"""
  /* ── Review chrome (single dark world; the slides are 1280×720 canvases scaled to fit) ── */
  :root{ color-scheme:dark; --bg:#0A0B0E; --bar:#14161B; --line:#2A2D33; --fg:#F0EDE8; --muted:#9B978F; --gold:#C49A6C; --ok:#86BD95; --warn:#E58A63; }
  body{ background:var(--bg); color:var(--fg); font-family:'Barlow',system-ui,sans-serif; font-size:15px; line-height:1.5; }
  .rv-bar{ position:sticky; top:env(safe-area-inset-top,0px); z-index:20; background:var(--bar); border-bottom:1px solid var(--line); padding:10px 16px; display:flex; flex-wrap:wrap; align-items:center; gap:10px 16px; }
  .rv-bar .rv-name{ font-family:'Anton',sans-serif; text-transform:uppercase; letter-spacing:.04em; font-size:18px; color:#fff; }
  .rv-bar .rv-name em{ font-style:normal; color:var(--gold); }
  .rv-bar .rv-meta{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
  .rv-bar .rv-spacer{ flex:1; }
  .rv-bar .rv-status{ font-size:13px; color:var(--muted); min-width:0; }
  .rv-bar .rv-status.ok{ color:var(--ok); } .rv-bar .rv-status.warn{ color:var(--warn); }
  .rv-btn{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; padding:8px 14px; border:1px solid var(--line); background:transparent; color:var(--fg); cursor:pointer; text-decoration:none; display:inline-block; }
  .rv-btn:hover{ border-color:var(--muted); } .rv-btn:focus-visible{ outline:2px solid var(--gold); outline-offset:2px; }
  .rv-btn.primary{ background:var(--gold); color:#0F1115; border-color:var(--gold); }
  .rv-btn[disabled]{ opacity:.5; cursor:default; }
  .rv-btn[hidden]{ display:none !important; }
  .rv-deck{ max-width:1312px; margin:0 auto; padding-inline:16px; padding-block:24px 64px; display:flex; flex-direction:column; gap:28px; }
  .rv-wrap{ scroll-margin-top:72px; }
  .rv-cap{ display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin:0 0 8px; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
  .rv-cap .n{ color:var(--gold); }
  .rv-cap button{ font:inherit; letter-spacing:inherit; text-transform:inherit; color:var(--muted); background:none; border:0; padding:0; cursor:pointer; text-decoration:underline; text-underline-offset:3px; }
  .rv-cap button:hover{ color:var(--fg); } .rv-cap button[hidden]{ display:none; }
  .rv-frame{ width:1280px; height:720px; transform-origin:top left; transform:scale(var(--s,1)); border:1px solid var(--line); box-shadow:0 20px 60px rgba(0,0,0,.45); }
  .rv-fit{ height:calc(720px * var(--s,1)); overflow:hidden; }
  /* editing */
  body.editing .ed{ outline:1px dashed rgba(196,154,108,.55); outline-offset:2px; cursor:text; min-width:1ch; }
  body.editing .ed:focus{ outline:2px solid var(--gold); background:rgba(196,154,108,.08); }
  .rv-hint{ max-width:1312px; margin:0 auto; padding:0 16px; color:var(--muted); font-size:13px; }
  @media (prefers-reduced-motion:no-preference){ html{ scroll-behavior:smooth; } }
"""

APP_JS = r"""
(function(){
  const APP_SRC = document.currentScript.textContent;
  const TITLE = 'Book the Block Deck';
  const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">';
  const CHROME = `<header class="rv-bar" id="bar">
  <span class="rv-name">Book the <em>Block</em></span>
  <span class="rv-meta" id="count"></span>
  <span class="rv-spacer"></span>
  <span class="rv-status" id="status"></span>
  <a class="rv-btn" href="https://www.eastfremontdistrict.com/FEED-BookTheBlock-Deck.pdf" target="_blank" rel="noopener">PDF</a>
  <button class="rv-btn" id="edit" hidden>Edit text</button>
  <button class="rv-btn" id="cancel" hidden>Cancel</button>
  <button class="rv-btn primary" id="save" hidden>Save</button>
</header>
<p class="rv-hint" id="hint"></p>`;

  const dataEl = document.getElementById('deck-data');
  const data = JSON.parse(dataEl.textContent);
  const STYLE = document.getElementById('deck-style').textContent;
  const bar = document.getElementById('bar-slot'); bar.innerHTML = CHROME;
  const deck = document.getElementById('deck');
  const $ = (id) => document.getElementById(id);
  const status = (msg, cls) => { const s = $('status'); s.textContent = msg || ''; s.className = 'rv-status' + (cls ? ' ' + cls : ''); };

  const LABELS = {cover:'Cover', photo:'The block, activated', opp:'The opportunity', canvas:'The canvas', venues:'The venues', idea:'The big idea', map:'What we can build', dn:'Day to night', play:'The playbook', reach:'The proof', case:'Case study · TransUnion', fw:'The framework', win27:'Your window · 2027', close:'Close'};

  function render(){
    deck.innerHTML = data.slides.map((s, i) => `
<section class="rv-wrap" id="s${i+1}">
  <div class="rv-cap"><span><span class="n">${String(i+1).padStart(2,'0')}</span> · ${LABELS[s.cls] || s.cls}</span><button type="button" class="cmt" data-i="${i}" hidden>Comment on this slide</button></div>
  <div class="rv-fit"><div class="rv-frame"><section class="slide ${s.cls}" data-i="${i}">${s.html}</section></div></div>
</section>`).join('');
    $('count').textContent = data.slides.length + ' slides';
    fit();
  }

  function fit(){
    const w = Math.min(1280, deck.clientWidth);
    deck.style.setProperty('--s', (w / 1280).toFixed(4));
  }
  new ResizeObserver(fit).observe(deck);
  window.addEventListener('resize', fit);

  // ── editing: every text-bearing element whose children are inline becomes editable ──
  const INLINE = new Set(['EM','STRONG','B','I','SPAN','BR','U']);
  function leaves(root){
    const out = [];
    (function walk(el){
      for (const c of el.children){
        const inlineOnly = [...c.children].every(x => INLINE.has(x.tagName));
        if (c.textContent.trim() && inlineOnly && !['IMG','BUTTON'].includes(c.tagName)) out.push(c);
        else walk(c);
      }
    })(root);
    return out;
  }
  function setEditing(on){
    document.body.classList.toggle('editing', on);
    deck.querySelectorAll('.slide').forEach(sl => leaves(sl).forEach(el => {
      el.classList.toggle('ed', on);
      if (on) el.setAttribute('contenteditable', 'true'); else el.removeAttribute('contenteditable');
    }));
    $('edit').hidden = on; $('save').hidden = !on; $('cancel').hidden = !on;
    $('hint').textContent = on ? 'Click any text to change it. Layouts are fixed, so keep lengths close to the original. Save publishes a new version for everyone.' : '';
  }
  deck.addEventListener('paste', e => {
    if (!document.body.classList.contains('editing')) return;
    e.preventDefault();
    document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
  });

  function snapshot(){
    // The slides' markup is the record: take each slide's content with the edit attributes stripped.
    return data.slides.map((s, i) => {
      const live = deck.querySelector(`.slide[data-i="${i}"]`);
      const clone = live.cloneNode(true);
      clone.querySelectorAll('[contenteditable]').forEach(el => { el.removeAttribute('contenteditable'); el.classList.remove('ed'); if (!el.className) el.removeAttribute('class'); });
      return {cls: s.cls, html: clone.innerHTML.trim()};
    });
  }

  function buildDocument(next){
    const reset = (document.head.querySelector('style') || {}).textContent || '';
    const json = JSON.stringify(next).replace(/<\//g, '<\\/');
    const body = `<title>${TITLE}</title>\n${FONTS}\n<style id="deck-style">${STYLE}</style>\n<div id="bar-slot"></div>\n<main class="rv-deck" id="deck"></main>\n<script id="deck-data" type="application/json">${json}<\/script>\n<script id="app">${APP_SRC}<\/script>`;
    return `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>${reset}</style></head><body>${body}</body></html>`;
  }

  render();

  // Restore a draft that a reload (conflict) interrupted.
  try {
    const draft = sessionStorage.getItem('btb-draft');
    if (draft) { sessionStorage.removeItem('btb-draft'); status('Your unsaved edits were kept; the page reloaded to a newer version first.', 'warn'); }
  } catch {}

  let artifact = null, comments = null;
  (async () => {
    const [a, c, u] = await Promise.all([claude.use('artifact'), claude.use('comments'), claude.use('user')]);
    artifact = a; comments = c;
    const canEdit = !!a && (u ? (u.canEdit() ?? true) : true);
    $('edit').hidden = !canEdit;
    if (!a) status('Read-only view. Use the comment tool to leave notes.');
    if (c) deck.querySelectorAll('.cmt').forEach(b => b.hidden = false);
  })();

  $('edit').addEventListener('click', () => { setEditing(true); status(''); });
  $('cancel').addEventListener('click', () => { setEditing(false); render(); status('Edits discarded.'); });
  $('save').addEventListener('click', async () => {
    if (!artifact) return;
    const next = {...data, slides: snapshot()};
    $('save').disabled = true; status('Saving…');
    try { sessionStorage.setItem('btb-draft', '1'); } catch {}
    try {
      await artifact.publish(buildDocument(next));
      try { sessionStorage.removeItem('btb-draft'); } catch {}
      status('Saved. Reloading to the new version…', 'ok');
    } catch (err) {
      $('save').disabled = false;
      const code = err && err.code;
      if (code === 'conflict') { status('Someone saved a newer version; reloading to it.', 'warn'); return; }
      try { sessionStorage.removeItem('btb-draft'); } catch {}
      if (code === 'not_writer' || code === 'not_granted') { status('This view is read-only, so edits can\'t be saved. Leave a comment instead.', 'warn'); setEditing(false); render(); $('edit').hidden = true; return; }
      if (code === 'rate_limited') { status('Saving too often. Wait a moment and try again.', 'warn'); return; }
      status('Save failed (' + (code || 'error') + '). Your edits are still on screen; try again.', 'warn');
    }
  });

  deck.addEventListener('click', async (e) => {
    const b = e.target.closest('.cmt'); if (!b || !comments) return;
    const el = deck.querySelector(`.slide[data-i="${b.dataset.i}"]`);
    try { await comments.openComposer({element: el}); } catch {}
  });

  // Deep link: #s5 scrolls to slide 5
  if (/^#s\d+$/.test(location.hash)) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView(), 50); }
})();
"""

json_text = json.dumps(DATA).replace("</", "<\\/")
page = f"""<title>Book the Block Deck</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style id="deck-style">{CHROME_CSS}{DECK_CSS}</style>
<div id="bar-slot"></div>
<main class="rv-deck" id="deck"></main>
<script id="deck-data" type="application/json">{json_text}</script>
<script id="app">{APP_JS}</script>
"""
out = pathlib.Path("book-the-block-deck.html"); out.write_text(page)
print("wrote", out, len(page), "chars")
