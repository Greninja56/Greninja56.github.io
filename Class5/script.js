const expandBtns = document.querySelectorAll('.expand-btn');

expandBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const details = card.querySelector('.details');
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    btn.setAttribute('aria-expanded', !expanded);
    btn.textContent = expanded ? '+' : '–';
    details.classList.toggle('show');
  });
});
