/* CFFA — shared layout v2: header, mobile menu, footer, reveal animations, photo fade-in */

(function () {
  // Inject fonts for Arabic & Tifinagh (i18n)
  (function injectI18nFonts() {
    if (document.querySelector('link[data-i18n-fonts]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-i18n-fonts', '');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+Tifinagh&display=swap';
    document.head.appendChild(link);
  })();

  // Right-side main nav (Accueil retiré ; le logo ramène à l'accueil)
  const NAV = [
    {
      label: 'Qui sommes-nous', i18n: 'nav.about', href: 'pages/qui-sommes-nous.html',
      children: [
        { label: 'Le Cluster CFFA', href: 'pages/qui-sommes-nous.html#cluster' },
        { label: 'Siège (Berrechid)', href: 'pages/qui-sommes-nous.html#siege' },
        { label: 'Notre historique', href: 'pages/qui-sommes-nous.html#historique' },
        { label: 'Notre organisation', href: 'pages/qui-sommes-nous.html#organisation' },
        { label: 'Notre écosystème', href: 'pages/qui-sommes-nous.html#ecosysteme' },
        { label: 'Ancrage territorial', href: 'pages/qui-sommes-nous.html#ancrage' },
      ],
    },
    { label: 'Notre vision', i18n: 'nav.vision', href: 'pages/notre-vision.html' },
    {
      label: 'Nos produits', i18n: 'nav.products', href: 'pages/nos-produits.html',
      children: [
        { label: 'Laits fermentés', href: 'pages/nos-produits.html#laits-fermentes' },
        { label: 'Fromages frais & à tartiner', href: 'pages/nos-produits.html#frais' },
        { label: 'Mozzarella', href: 'pages/nos-produits.html#mozzarella' },
        { label: 'Fromages à pâte dure', href: 'pages/nos-produits.html#pate-dure' },
        { label: 'Crèmes, beurre & sauces', href: 'pages/nos-produits.html#cremes' },
      ],
    },
    {
      label: 'Nos partenaires', i18n: 'nav.partners', href: 'pages/nos-partenaires.html',
      children: [
        { label: 'Partenariat stratégique', href: 'pages/nos-partenaires.html#strategique' },
        { label: 'Institutionnels', href: 'pages/nos-partenaires.html#institutionnels' },
        { label: 'Recherche & Académie', href: 'pages/nos-partenaires.html#recherche' },
      ],
    },
    {
      label: 'Flammes du Cluster', i18n: 'nav.rd', href: 'pages/flammes-du-cluster.html',
      children: [
        { label: 'Recherche & Développement', href: 'pages/flammes-du-cluster.html#rd' },
        { label: 'Stratégie générale', href: 'pages/flammes-du-cluster.html#strategie' },
        { label: 'Partenariat Maroc-Mauritanie', href: 'pages/flammes-du-cluster.html#maroc-mauritanie' },
      ],
    },
    {
      label: 'Adhésion', i18n: 'nav.membership', href: 'pages/adhesion.html',
      children: [
        { label: "Devenir adhérent", i18n: 'nav.become_member', href: 'pages/adhesion.html#formulaire' },
        { label: 'Réglementation', i18n: 'nav.regulation', href: 'pages/reglementation.html' },
      ],
    },
    { label: 'Contact', i18n: 'nav.contact', href: 'pages/contact.html' },
  ];

  const isPagesDir = location.pathname.toLowerCase().includes('/pages/');
  const base = isPagesDir ? '../' : '';
  const resolve = (href) => base + href;

  const currentFile = location.pathname.split('/').pop().toLowerCase() || 'index.html';

  function chevron() {
    return `<svg class="w-3 h-3 ml-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"/></svg>`;
  }

  function isActiveItem(item) {
    if (item.href.toLowerCase().endsWith(currentFile)) return true;
    if (item.children) {
      return item.children.some(c => c.href.toLowerCase().split('#')[0].endsWith(currentFile));
    }
    return false;
  }

  function renderDesktopNav() {
    return NAV.map((item) => {
      const linkClass = `nav-link ${isActiveItem(item) ? 'active' : ''}`;
      const i18nAttr = item.i18n ? ` data-i18n="${item.i18n}"` : '';
      if (item.children) {
        return `
          <li class="dropdown">
            <a href="${resolve(item.href)}" class="${linkClass}" aria-haspopup="true"><span${i18nAttr}>${item.label}</span> ${chevron()}</a>
            <div class="dropdown-menu" role="menu">
              ${item.children.map(c => `<a href="${resolve(c.href)}" role="menuitem"${c.i18n ? ` data-i18n="${c.i18n}"` : ''}>${c.label}</a>`).join('')}
            </div>
          </li>`;
      }
      return `<li><a href="${resolve(item.href)}" class="${linkClass}"${i18nAttr}>${item.label}</a></li>`;
    }).join('');
  }

  function renderMobileNav() {
    const motPres = `<a href="${resolve('pages/mot-du-president.html')}" class="block px-5 py-4 font-semibold border-b border-[rgba(23,107,58,.08)]" data-mobile-close data-i18n="nav.president">Mot du Président</a>`;
    const items = NAV.map((item) => {
      const i18nAttr = item.i18n ? ` data-i18n="${item.i18n}"` : '';
      if (item.children) {
        return `
          <details class="mobile-group">
            <summary>
              <span${i18nAttr}>${item.label}</span>
              ${chevron()}
            </summary>
            <div class="submenu">
              <a href="${resolve(item.href)}">Vue d'ensemble</a>
              ${item.children.map(c => `<a href="${resolve(c.href)}"${c.i18n ? ` data-i18n="${c.i18n}"` : ''}>${c.label}</a>`).join('')}
            </div>
          </details>`;
      }
      return `<a href="${resolve(item.href)}" class="block px-5 py-4 font-semibold border-b border-[rgba(23,107,58,.08)]" data-mobile-close${i18nAttr}>${item.label}</a>`;
    }).join('');
    return motPres + items;
  }

  function renderLangSwitcher() {
    return `
      <div class="lang-switch" role="group" aria-label="Langue / Language">
        <button type="button" class="lang-btn" data-lang="fr" aria-pressed="true" title="Français">FR</button>
        <button type="button" class="lang-btn" data-lang="en" aria-pressed="false" title="English">EN</button>
        <button type="button" class="lang-btn" data-lang="ar" aria-pressed="false" title="العربية" style="font-family:'Noto Sans Arabic',Inter,sans-serif;">ع</button>
        <button type="button" class="lang-btn" data-lang="zgh" aria-pressed="false" title="ⵜⴰⵎⴰⵣⵉⵖⵜ" style="font-family:'Noto Sans Tifinagh',Inter,sans-serif;">ⵣ</button>
      </div>
    `;
  }

  function renderHeader() {
    const motPresActive = currentFile === 'mot-du-president.html' ? 'active' : '';
    return `
      <header class="site-header fixed top-0 left-0 right-0 z-40">
        <div class="max-w-7xl mx-auto px-4 lg:px-8 site-header__row flex items-center justify-between gap-3">
          <div class="flex items-center gap-6 min-w-0">
            <a href="${resolve('index.html')}" class="flex items-center gap-2 shrink-0" aria-label="Accueil — Cluster Filière Fromage-Agro (CFFA)">
              <img src="${resolve('assets/img/logo-cffa.jpg')}" alt="Cluster Filière Fromage-Agro (CFFA)" class="brand-logo" />
            </a>
            <a href="${resolve('pages/mot-du-president.html')}" class="nav-link nav-link--lead hidden lg:inline-flex ${motPresActive}" data-i18n="nav.president">Mot du Président</a>
          </div>
          <nav class="hidden xl:block" aria-label="Navigation principale">
            <ul class="flex items-center gap-5">${renderDesktopNav()}</ul>
          </nav>
          <div class="flex items-center gap-2 lg:gap-3">
            ${renderLangSwitcher()}
            <a href="${resolve('pages/adhesion.html')}" class="btn btn-primary text-sm hidden lg:inline-flex" data-i18n="nav.cta_adhesion">
              Devenir adhérent
              <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
            </a>
            <button id="mobileMenuBtn" class="xl:hidden p-2 rounded-lg hover:bg-[rgba(23,107,58,.08)]" aria-label="Ouvrir le menu" aria-expanded="false">
              <svg class="w-6 h-6 text-[var(--ffa-forest-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
        <div id="mobileMenu" class="mobile-menu xl:hidden" role="dialog" aria-label="Menu mobile">
          <div class="py-2">${renderMobileNav()}</div>
          <div class="p-5">
            <a href="${resolve('pages/adhesion.html')}" class="btn btn-primary w-full justify-center" data-i18n="nav.cta_adhesion">Devenir adhérent</a>
          </div>
        </div>
      </header>
      <div class="site-header__spacer"></div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="site-footer mt-24 bg-forest text-white relative overflow-hidden">
        <div class="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20" style="background:#D6A11E;"></div>
        <div class="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20" style="background:#5FB97E;"></div>
        <div class="max-w-7xl mx-auto px-4 lg:px-8 py-16 relative">
          <div class="grid lg:grid-cols-4 gap-12">
            <div>
              <div class="mb-5">
                <div class="brand-logo-card mb-3">
                  <img src="${resolve('assets/img/logo-cffa.jpg')}" alt="Cluster Filière Fromage-Agro (CFFA)" />
                </div>
                <p class="text-xs tracking-widest uppercase text-white/70">CFFA · Maroc</p>
              </div>
              <p class="text-white/75 text-sm leading-relaxed mb-4" data-i18n="footer.tagline">
                Un écosystème marocain réunissant agriculteurs-éleveurs, coopératives, sociétés industrielles et chercheurs
                au service d'une filière fromage souveraine, compétitive et créatrice de valeur.
              </p>
              <div class="space-y-1.5 text-sm text-white/80">
                <p><span class="text-white/60">Siège :</span> Centre de Conseil Agricole, Berrechid</p>
                <p><a href="tel:+212662869696" class="hover:text-white">+212 6 62 86 96 96</a></p>
                <p><a href="mailto:contact@cffa.ma" class="hover:text-white">contact@cffa.ma</a></p>
              </div>
            </div>
            <div>
              <p class="font-display text-lg font-semibold mb-4" data-i18n="footer.explore">Explorer</p>
              <ul class="space-y-2 text-sm text-white/75">
                <li><a href="${resolve('pages/mot-du-president.html')}" class="hover:text-white" data-i18n="nav.president">Mot du Président</a></li>
                <li><a href="${resolve('pages/qui-sommes-nous.html')}" class="hover:text-white" data-i18n="nav.about">Qui sommes-nous</a></li>
                <li><a href="${resolve('pages/notre-vision.html')}" class="hover:text-white" data-i18n="nav.vision">Notre vision</a></li>
                <li><a href="${resolve('pages/qui-sommes-nous.html')}#ancrage" class="hover:text-white">Ancrage territorial</a></li>
                <li><a href="${resolve('pages/flammes-du-cluster.html')}" class="hover:text-white" data-i18n="nav.rd">Flammes du Cluster</a></li>
              </ul>
            </div>
            <div>
              <p class="font-display text-lg font-semibold mb-4" data-i18n="footer.community">Communauté</p>
              <ul class="space-y-2 text-sm text-white/75">
                <li><a href="${resolve('pages/nos-produits.html')}" class="hover:text-white" data-i18n="nav.products">Nos produits</a></li>
                <li><a href="${resolve('pages/nos-partenaires.html')}" class="hover:text-white" data-i18n="nav.partners">Nos partenaires</a></li>
                <li><a href="${resolve('pages/adhesion.html')}" class="hover:text-white" data-i18n="nav.become_member">Devenir adhérent</a></li>
                <li><a href="${resolve('pages/reglementation.html')}" class="hover:text-white" data-i18n="nav.regulation">Réglementation</a></li>
                <li><a href="${resolve('pages/contact.html')}" class="hover:text-white" data-i18n="nav.contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <p class="font-display text-lg font-semibold mb-4" data-i18n="footer.newsletter_title">Restez informé</p>
              <p class="text-white/75 text-sm mb-3" data-i18n="footer.newsletter_text">Recevez les actualités du Cluster et de la filière.</p>
              <form onsubmit="event.preventDefault(); this.querySelector('button').innerText='✓';" class="flex gap-2 mb-5">
                <input type="email" required placeholder="votre@email.ma"
                       class="flex-1 rounded-full px-4 py-2.5 text-sm bg-white/10 placeholder-white/60 text-white border border-white/15 focus:bg-white/15 focus:outline-none" />
                <button class="rounded-full bg-[var(--ffa-gold)] text-[#2a1f08] px-4 text-sm font-semibold hover:opacity-90" data-i18n="footer.newsletter_ok">OK</button>
              </form>
              <div class="flex gap-3 items-center">
                <a href="https://wa.me/212662869696" target="_blank" rel="noopener" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="WhatsApp">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.6 6.3A7.85 7.85 0 0012 4a7.93 7.93 0 00-6.76 12L4 20l4.1-1.2A7.93 7.93 0 0012 20a8 8 0 005.6-13.7zM12 18.5a6.5 6.5 0 01-3.3-.9l-.24-.14-2.43.7.7-2.37-.15-.25A6.5 6.5 0 1112 18.5zm3.55-4.86c-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1s-.5.63-.62.76-.23.15-.43.05a5.32 5.32 0 01-1.56-.96 5.88 5.88 0 01-1.08-1.34c-.11-.2 0-.3.09-.4.09-.1.2-.23.3-.34.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.37c-.13 0-.34.05-.51.25-.18.2-.67.66-.67 1.6 0 .95.69 1.86.78 1.99.1.13 1.36 2.07 3.3 2.9.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.16-.47 1.32-.93.16-.46.16-.85.11-.93-.05-.08-.18-.13-.38-.23z"/></svg>
                </a>
                <a href="mailto:contact@cffa.ma" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Email">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="LinkedIn">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 3H4.4A1.4 1.4 0 003 4.4v15.2A1.4 1.4 0 004.4 21h15.2a1.4 1.4 0 001.4-1.4V4.4A1.4 1.4 0 0019.6 3zM8.3 18.3H5.7V9.8h2.6v8.5zM7 8.6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.3 9.7h-2.6v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1v4.2h-2.6V9.8h2.5v1.2h.03a2.74 2.74 0 012.47-1.36c2.65 0 3.14 1.74 3.14 4z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-white/15 mt-12 pt-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60">
            <p>© ${new Date().getFullYear()} Cluster Filière Fromage-Agro (CFFA) — <span data-i18n="footer.rights">Tous droits réservés.</span></p>
            <p>Conçu au Maroc · Site optimisé IA</p>
          </div>
        </div>
      </footer>
    `;
  }

  function injectLayout() {
    const headerSlot = document.getElementById('app-header');
    const footerSlot = document.getElementById('app-footer');
    if (headerSlot) headerSlot.innerHTML = renderHeader();
    if (footerSlot) footerSlot.innerHTML = renderFooter();

    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }));
    }

    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  function setupReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  function setupCounters() {
    const nodes = document.querySelectorAll('[data-counter]');
    if (!nodes.length) return;
    const animate = (el) => {
      const target = +el.dataset.counter;
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.floor(target * eased);
        el.textContent = value.toLocaleString('fr-FR') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    nodes.forEach(n => io.observe(n));
  }

  function setupPhotos() {
    // Fade-in for .photo > img after load (lazy-friendly)
    const imgs = document.querySelectorAll('.photo img');
    imgs.forEach(img => {
      const markLoaded = () => img.classList.add('loaded');
      if (img.complete && img.naturalWidth > 0) markLoaded();
      else img.addEventListener('load', markLoaded, { once: true });
    });
  }

  function setYear() {
    document.querySelectorAll('[data-year]').forEach(n => n.textContent = new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectLayout();
    setupReveal();
    setupCounters();
    setupPhotos();
    setYear();
    if (window.FFAI18n) window.FFAI18n.init();
    if (window.FFAChatbot) window.FFAChatbot.init();
    if (window.FFASearch) window.FFASearch.init();
  });
})();
