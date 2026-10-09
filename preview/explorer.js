
  document.querySelectorAll             ('[data-explorer]').forEach((explorer) => {
    const controls = Array.from(explorer.querySelectorAll                   ('[data-group]'));
    const panels = Array.from(explorer.querySelectorAll             ('[data-panel]'));
    function selectGroup(id        ) {
      explorer.dataset.active = id;
      controls.forEach((control) => {
        const selected = control.dataset.group === id;
        control.setAttribute('aria-pressed', String(selected));
        control.querySelector             ('[data-selected]') .hidden = !selected;
        control.querySelector             ('[data-select]') .hidden = selected;
      });
      panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== id; });
    }
    selectGroup('knowledge');
    controls.forEach((control) => {
      control.hidden = false;
      control.addEventListener('click', () => selectGroup(control.dataset.group ));
    });
    explorer.classList.add('is-interactive');
  });

document.querySelectorAll('[data-language]').forEach((link) => { link.addEventListener('click', () => { link.hash = window.location.hash; }); });
