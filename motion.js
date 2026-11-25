const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
  for (const lens of document.querySelectorAll('.lens')) {
    lens.addEventListener('pointermove', event => {
      const box = lens.getBoundingClientRect();
      lens.style.setProperty('--glint', ((event.clientX - box.left) / box.width * 100) + '%');
    });
    lens.addEventListener('pointerleave', () => lens.style.removeProperty('--glint'));
  }
}
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('incoming');
        observer.unobserve(entry.target);
      }
    }
  }, {threshold: 0.12});
  document.querySelectorAll('.work-head, .project, .experience article, .detail, .case-section h2, .next-project').forEach(element => observer.observe(element));
}
const pocket = document.querySelector('.envelope-pocket');
if (pocket) {
  const sheet = document.getElementById(pocket.getAttribute('aria-controls'));
  const setExpanded = expanded => {
    sheet.inert = !expanded;
    pocket.setAttribute('aria-expanded', String(expanded));
  };
  setExpanded(false);
  pocket.addEventListener('click', () => setExpanded(sheet.inert));
}
