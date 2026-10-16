(() => {
  const root = document.documentElement;
  const rail = document.querySelector('.site-rail');
  const menu = document.querySelector('.menu-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.remove('no-js');
  root.classList.add('js');
  rail?.setAttribute('data-menu-open', 'false');

  function closeMenu(returnFocus = false) {
    rail?.setAttribute('data-menu-open', 'false');
    menu?.setAttribute('aria-expanded', 'false');
    if (returnFocus) menu?.focus({ preventScroll: true });
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    rail.setAttribute('data-menu-open', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  rail?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  matchMedia('(min-width: 851px)').addEventListener('change', () => closeMenu());

  const navLinks = [...document.querySelectorAll('.primary-navigation a')].filter(link => link.pathname === location.pathname || (link.getAttribute('href') || '').startsWith('#'));
  const targets = navLinks.map(link => ({ link, section: document.querySelector(link.hash) })).filter(item => item.section);
  let frame = 0;
  function updateNavigation() {
    frame = 0;
    const line = scrollY + (innerWidth <= 850 ? 150 : 160);
    let current = targets[0];
    for (const item of targets) if (item.section.offsetTop <= line) current = item;
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 8) current = targets.at(-1);
    for (const item of targets) {
      if (item === current) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    }
  }
  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateNavigation); }, { passive: true });
  addEventListener('resize', updateNavigation);
  updateNavigation();

  const controls = document.querySelector('.evidence-controls');
  if (controls) {
    const tabs = [...controls.querySelectorAll('button')];
    const panels = tabs.map(tab => document.getElementById(tab.dataset.panel));
    controls.hidden = false;
    controls.setAttribute('role', 'tablist');
    const activate = (index, focus = false, animate = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
      if (animate && !reduced.matches) panels[index].animate([{ opacity: .65, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' });
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
    activate(0);
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

  if (!reduced.matches && Element.prototype.animate) {
    document.querySelectorAll('.name-line > span').forEach((line, index) => {
      line.animate([{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }], { duration: 800, delay: index * 100, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const image = entry.target.matches('figure');
          entry.target.animate(image ? [{ transform: 'translateY(16px)', opacity: .75 }, { transform: 'translateY(0)', opacity: 1 }] : [{ transform: 'translateY(10px)', opacity: .7 }, { transform: 'translateY(0)', opacity: 1 }], { duration: image ? 650 : 480, easing: 'cubic-bezier(.22,1,.36,1)' });
          observer.unobserve(entry.target);
        }
      }, { threshold: .12 });
      document.querySelectorAll('.section-heading, .project-feature > figure, .about-images, .publication, .research-card, .timeline article, .place-image').forEach(element => observer.observe(element));
    }
  }
})();
