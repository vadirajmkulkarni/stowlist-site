(() => {
  const demo = document.querySelector('[data-demo]');
  if (!demo) return;
  const rows = [...demo.querySelectorAll('[data-demo-row]')];
  const count = demo.querySelector('[data-demo-count]');
  const update = () => {
    const packed = rows.filter(row => row.dataset.state === 'packed').length;
    const skipped = rows.filter(row => row.dataset.state === 'skip').length;
    count.textContent = `${packed} packed · ${skipped} skipped · ${rows.length - packed - skipped} to check`;
  };
  demo.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-reset')) {
      rows.forEach(row => { delete row.dataset.state; row.querySelectorAll('button').forEach(choice => choice.setAttribute('aria-pressed', 'false')); });
    } else if (button.dataset.choice) {
      const row = button.closest('[data-demo-row]');
      row.dataset.state = row.dataset.state === button.dataset.choice ? '' : button.dataset.choice;
      row.querySelectorAll('button').forEach(choice => choice.setAttribute('aria-pressed', String(choice.dataset.choice === row.dataset.state)));
    }
    update();
  });
  update();
})();
