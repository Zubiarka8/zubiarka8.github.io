// Standalone export enhancement. Production uses ContextComparison.tsx.
document.querySelectorAll('[data-comparison]').forEach((comparison) => {
  const controls = comparison.querySelector('.comparison-controls');
  const buttons = comparison.querySelectorAll('[data-view]');
  const lines = comparison.querySelectorAll('[data-line]');
  const status = comparison.querySelector('.comparison-status');
  const label = comparison.querySelector('[data-view-label]');
  controls.hidden = false;
  buttons.forEach((button) => {
    button.addEventListener('keydown', () => { comparison.dataset.keyboard = 'true'; });
    button.addEventListener('pointerdown', () => { comparison.dataset.keyboard = 'false'; });
    button.addEventListener('click', (event) => {
      const view = button.dataset.view;
      comparison.dataset.keyboard = String(event.detail === 0);
      lines.forEach((line) => { line.hidden = view === 'focused' && line.dataset.relevant !== 'true'; });
      buttons.forEach((control) => {
        const selected = control === button;
        control.setAttribute('aria-pressed', String(selected));
        control.querySelector('[data-marker]').textContent = selected ? '●' : '○';
      });
      label.textContent = button.textContent.trim().slice(1).trim();
      status.textContent = status.dataset[view];
    });
  });
});
document.querySelectorAll('[data-language]').forEach((link) => {
  link.addEventListener('click', () => { link.hash = window.location.hash; });
});
