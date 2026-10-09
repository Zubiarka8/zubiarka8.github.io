export function enhanceFrequency() {
  const root = document.querySelector<HTMLElement>('[data-frequency]');
  if (!root) return;
  const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-signal-section]'));
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-section-link]'));
  const paths = Array.from(root.querySelectorAll<SVGPathElement>('[data-signal-path]'));
  const currentLabel = root.querySelector<HTMLElement>('[data-current-section]');
  const status = root.querySelector<HTMLElement>('.current-section');
  let currentId = '';
  function activate(id: string) {
    const section = sections.find((item) => item.id === id);
    if (!section || currentId === id) return;
    currentId = id;
    sections.forEach((item) => { item.dataset.signalActive = String(item.id === id); });
    links.forEach((link) => {
      if (link.dataset.sectionLink === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    paths.forEach((path) => path.classList.toggle('is-active', path.dataset.signalPath === id));
    if (currentLabel) currentLabel.textContent = section.dataset.sectionLabel ?? '';
  }
  activate(window.location.hash.slice(1) || 'introduction');
  if (!currentId) activate('introduction');
  if (status) status.hidden = false;
  root.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (anchor) activate(anchor.hash.slice(1));
  });
  root.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    const section = event.target.closest<HTMLElement>('[data-signal-section]');
    const link = event.target.closest<HTMLAnchorElement>('[data-section-link]');
    if (section) activate(section.id);
    else if (link) activate(link.dataset.sectionLink ?? '');
  });
  window.addEventListener('hashchange', () => activate(window.location.hash.slice(1) || 'introduction'));
  // Observe only on larger screens: the phone signature stays compact and still.
  if ('IntersectionObserver' in window && window.matchMedia('(min-width: 768px)').matches) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) activate(visible[0].target.id);
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
  root.querySelectorAll<HTMLAnchorElement>('[data-language]').forEach((link) => {
    link.addEventListener('click', () => { link.hash = window.location.hash; });
  });
}
