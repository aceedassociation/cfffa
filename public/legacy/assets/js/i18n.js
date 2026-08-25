/* CFFA — i18n loader (FR default, EN, AR, Tamazight/Tifinagh) */

window.FFAI18n = (function () {
  const SUPPORTED = ['fr', 'en', 'ar', 'zgh'];
  const RTL = ['ar'];
  const DEFAULT = 'fr';
  const STORAGE_KEY = 'cffa.lang';

  const isPagesDir = location.pathname.toLowerCase().includes('/pages/');
  const base = isPagesDir ? '../' : '';

  let dict = {};
  let current = DEFAULT;

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (_) {}
  }

  function detectInitial() {
    const stored = getStored();
    if (stored && SUPPORTED.includes(stored)) return stored;
    return DEFAULT;
  }

  async function load(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT;
    try {
      const res = await fetch(`${base}assets/i18n/${lang}.json`, { cache: 'no-cache' });
      if (!res.ok) throw new Error('http ' + res.status);
      dict = await res.json();
      current = lang;
    } catch (e) {
      console.warn('[i18n] load failed for', lang, e);
      if (lang !== DEFAULT) { await load(DEFAULT); return; }
      dict = {};
    }
  }

  function get(key) {
    return key.split('.').reduce((o, k) => (o && o[k] != null) ? o[k] : null, dict);
  }

  function applyTextNode(el) {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const val = get(key);
    if (typeof val === 'string') {
      // Allow simple HTML if explicit
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    }
  }
  function applyAttr(el) {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;
    spec.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      const val = get(key);
      if (typeof val === 'string') el.setAttribute(attr, val);
    });
  }

  function applyAll() {
    document.querySelectorAll('[data-i18n]').forEach(applyTextNode);
    document.querySelectorAll('[data-i18n-attr]').forEach(applyAttr);
    document.documentElement.lang = current;
    document.documentElement.dir = RTL.includes(current) ? 'rtl' : 'ltr';
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === current ? 'true' : 'false');
    });
  }

  async function setLang(lang) {
    if (lang === current) return;
    await load(lang);
    setStored(current);
    applyAll();
    document.dispatchEvent(new CustomEvent('cffa:langchange', { detail: { lang: current } }));
  }

  function bindButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  async function init() {
    const initial = detectInitial();
    await load(initial);
    bindButtons();
    applyAll();
  }

  return { init, setLang, get current() { return current; } };
})();
