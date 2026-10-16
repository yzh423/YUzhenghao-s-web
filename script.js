(() => {
  const root = document.documentElement;
  const rail = document.querySelector('.site-rail');
  const menu = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.navigation-drawer');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 851px)');
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const entrance = [];
  let input = 'pointer';
  root.classList.replace('no-js', 'js');
  const setInput = value => { input = value; root.dataset.input = value; };
  document.addEventListener('pointerdown', () => setInput('pointer'), true);
  document.addEventListener('keydown', () => setInput('keyboard'), true);

  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  backdrop.hidden = true;
  backdrop.setAttribute('aria-hidden', 'true');
  rail?.after(backdrop);
  let menuOpen = false;
  let menuRevision = 0;
  let menuAnimations = [];
  function setMenu(open, animate = false, returnFocus = false) {
    if (!drawer || !menu || !rail) return;
    const revision = ++menuRevision;
    menuAnimations.forEach(animation => animation.cancel());
    menuAnimations = [];
    menuOpen = open && !desktop.matches;
    menu.setAttribute('aria-expanded', String(menuOpen));
    // Closed controls leave the focus order as soon as dismissal starts.
    if (!menuOpen && (returnFocus || drawer.contains(document.activeElement))) menu.focus({ preventScroll: true });
    drawer.inert = !desktop.matches && !menuOpen;
    const finish = () => {
      if (revision !== menuRevision) return;
      rail.dataset.menuOpen = String(menuOpen);
      backdrop.hidden = !menuOpen;
    };
    const visible = rail.dataset.menuOpen === 'true';
    if (menuOpen) { rail.dataset.menuOpen = 'true'; backdrop.hidden = false; updateNavigation(); }
    if (!animate || reduced.matches || desktop.matches || (!menuOpen && !visible)) { finish(); return; }
    menuAnimations = [
      drawer.animate(menuOpen
        ? [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }]
        : [{ opacity: 1 }, { opacity: 0 }], { duration: menuOpen ? 220 : 100, easing: ease }),
      backdrop.animate(menuOpen ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }], { duration: menuOpen ? 180 : 100 })
    ];
    Promise.all(menuAnimations.map(animation => animation.finished)).then(finish).catch(() => {});
  }
  menu?.addEventListener('click', event => setMenu(!menuOpen, event.detail > 0));
  backdrop.addEventListener('click', () => setMenu(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuOpen) setMenu(false, false, true);
  });
  document.addEventListener('focusin', event => {
    if (menuOpen && !rail.contains(event.target)) setMenu(false);
  });
  rail?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  desktop.addEventListener('change', () => setMenu(false));

  const navigation = document.querySelector('.primary-navigation');
  const navLinks = [...(navigation?.querySelectorAll('a') || [])].filter(link => link.pathname === location.pathname || (link.getAttribute('href') || '').startsWith('#'));
  const targets = navLinks.map(link => ({ link, section: document.querySelector(link.hash) })).filter(item => item.section);
  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  navigation?.append(indicator);
  let frame = 0;
  function updateNavigation() {
    frame = 0;
    const line = scrollY + Math.min(desktop.matches ? 320 : 240, innerHeight * .35);
    let current = targets[0];
    for (const item of targets) if (item.section.offsetTop <= line) current = item;
    if (scrollY + innerHeight >= root.scrollHeight - 8) current = targets.at(-1);
    for (const item of targets) {
      if (item === current) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    }
    indicator.hidden = !current;
    if (current && navigation.getClientRects().length) {
      const link = current.link;
      indicator.style.transform = `translate3d(${link.offsetLeft - 12}px,${link.offsetTop + link.offsetHeight / 2 - 3}px,0)`;
    }
  }
  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateNavigation); }, { passive: true });
  addEventListener('resize', updateNavigation);
  document.fonts.ready.then(updateNavigation);
  setMenu(false);
  updateNavigation();

  const gallery = document.querySelector('.photo-gallery');
  if (gallery) {
    const deck = gallery.querySelector('.photo-deck');
    const slides = [...gallery.querySelectorAll('.photo-slide')];
    const title = gallery.querySelector('.gallery-title');
    const count = gallery.querySelector('.photo-count');
    const status = gallery.querySelector('.gallery-status');
    const buttons = gallery.querySelector('.photo-controls');
    let current = 0;
    let gesture;
    let suppressClickUntil = 0;
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-roledescription', 'carousel');
    buttons.hidden = false;
    count.hidden = false;
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
    });
    function showPhoto(index, animate = false, announce = true) {
      const moveFocus = slides.some(slide => slide.contains(document.activeElement));
      const previous = slides.map(slide => {
        const style = getComputedStyle(slide);
        return { transform: style.transform, opacity: style.opacity };
      });
      slides.forEach(slide => slide.getAnimations().forEach(animation => animation.cancel()));
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const position = (i - current + slides.length) % slides.length;
        slide.dataset.position = String(position);
        slide.inert = position !== 0;
        slide.setAttribute('aria-hidden', String(position !== 0));
        if (animate && !reduced.matches) {
          const style = getComputedStyle(slide);
          slide.animate([previous[i], { transform: style.transform, opacity: style.opacity }], { duration: 280, easing: ease });
        }
      });
      title.textContent = slides[current].dataset.title;
      count.textContent = `${current + 1} / ${slides.length}`;
      if (announce) status.textContent = `Photo ${current + 1} of ${slides.length}: ${title.textContent}.`;
      if (moveFocus) slides[current].querySelector('a').focus({ preventScroll: true });
    }
    buttons.querySelectorAll('button').forEach(button => button.addEventListener('click', event => {
      showPhoto(current + Number(button.dataset.step), event.detail > 0);
    }));
    gallery.addEventListener('keydown', event => {
      if (!deck.contains(event.target) && !buttons.contains(event.target)) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    deck.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    });
    document.addEventListener('pointerup', event => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
      gesture = undefined;
      if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy) * 1.3) return;
      suppressClickUntil = performance.now() + 400;
      showPhoto(current + (dx < 0 ? 1 : -1), true);
    });
    document.addEventListener('pointercancel', () => { gesture = undefined; });
    deck.addEventListener('click', event => {
      if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
    }, true);
    showPhoto(0, false, false);
  }

  let evidenceTransition;
  const controls = document.querySelector('.evidence-controls');
  if (controls) {
    const tabs = [...controls.querySelectorAll('button')];
    const panels = tabs.map(tab => document.getElementById(tab.dataset.panel));
    let selected = 0;
    let revision = 0;
    controls.hidden = false;
    controls.setAttribute('role', 'tablist');
    const apply = index => {
      selected = index;
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
    };
    const activate = (index, focus = false, animate = false) => {
      const request = ++revision;
      evidenceTransition?.skipTransition();
      evidenceTransition = undefined;
      panels.forEach(panel => panel.getAnimations().forEach(animation => animation.cancel()));
      const motion = animate && !reduced.matches && index !== selected;
      if (focus) tabs[index].focus();
      if (motion && typeof document.startViewTransition === 'function') {
        root.dataset.view = 'evidence';
        const transition = document.startViewTransition(() => { if (request === revision) apply(index); });
        evidenceTransition = transition;
        transition.ready.catch(() => {}); // An obsolete snapshot can be skipped deliberately.
        transition.finished.catch(() => {}).finally(() => {
          if (request === revision) { delete root.dataset.view; evidenceTransition = undefined; }
        });
      } else {
        delete root.dataset.view;
        apply(index);
        if (motion) panels[index].animate([{ opacity: .6, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 180, easing: ease });
      }
    };
    tabs.forEach((tab, index) => {
      tab.id = `evidence-tab-${index}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panels[index].id);
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].tabIndex = 0;
      tab.addEventListener('click', event => activate(index, false, event.detail > 0));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); activate(next, true); }
      });
    });
    apply(0);
  }

  const copy = document.querySelector('.copy-email');
  if (copy && navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const status = document.querySelector('.copy-status');
      try { await navigator.clipboard.writeText('Zhenghao@connect.hku.hk'); status.textContent = 'Email address copied.'; }
      catch { status.textContent = 'Select the email address above to copy it.'; }
    });
  }
  document.querySelectorAll('details').forEach(disclosure => {
    disclosure.addEventListener('toggle', () => {
      if (!disclosure.open || input === 'keyboard' || reduced.matches) return;
      [...disclosure.children].filter(child => child.tagName !== 'SUMMARY').forEach(child => {
        child.animate([{ opacity: .4, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 180, easing: ease });
      });
    });
  });
  if (!reduced.matches && !root.dataset.incomingTransition && Element.prototype.animate) {
    document.querySelectorAll('.name-line > span').forEach((line, index) => {
      entrance.push(line.animate([{ transform: 'translateY(28%)', opacity: .3 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 700, delay: index * 70, easing: ease, fill: 'backwards' }));
    });
    const photograph = document.querySelector('.photo-gallery');
    if (photograph) entrance.push(photograph.animate([
      { transform: 'translateY(12px)', opacity: .6 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 680, delay: 100, easing: ease, fill: 'backwards' }));
  }
  addEventListener('pageswap', event => {
    if (reduced.matches || input === 'keyboard') event.viewTransition?.skipTransition();
  });
  addEventListener('pagereveal', event => {
    if (!event.viewTransition) return;
    entrance.forEach(animation => animation.cancel());
    if (reduced.matches) event.viewTransition.skipTransition();
  });
  // A changed accessibility preference also settles any interaction in progress.
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    evidenceTransition?.skipTransition();
    document.getAnimations().forEach(animation => animation.cancel());
    setMenu(menuOpen);
  });
})();
