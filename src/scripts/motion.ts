// Motion enhances an already visible page; no JavaScript or observer is required to read it.
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-motion="reveal"]'));
const heroes = Array.from(document.querySelectorAll<HTMLElement>('[data-motion="hero"]'));
const revealed = new Set<HTMLElement>();
const visibleHeroes = new Set<HTMLElement>();
let observer: IntersectionObserver | undefined;

function updateHeroMotion() {
  for (const hero of heroes) {
    hero.classList.toggle('motion-playing', !preference.matches && !document.hidden && visibleHeroes.has(hero));
  }
}

function configureMotion() {
  observer?.disconnect();
  visibleHeroes.clear();
  for (const element of reveals) element.classList.remove('motion-enter');
  for (const hero of heroes) hero.classList.remove('motion-enabled', 'motion-playing');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (element.dataset.motion === 'hero') {
        if (entry.isIntersecting) visibleHeroes.add(element);
        else visibleHeroes.delete(element);
      } else if (entry.isIntersecting && !revealed.has(element)) {
        revealed.add(element);
        const order = Number(element.dataset.motionOrder) || 0;
        element.style.setProperty('--motion-delay', `${Math.min(2, Math.max(0, order)) * 80}ms`);
        element.classList.add('motion-enter');
        observer?.unobserve(element);
      }
    }
    updateHeroMotion();
  }, { threshold: 0.08 });

  for (const element of reveals) if (!revealed.has(element)) observer.observe(element);
  for (const hero of heroes) {
    hero.classList.add('motion-enabled');
    observer.observe(hero);
  }
}

preference.addEventListener('change', configureMotion);
document.addEventListener('visibilitychange', updateHeroMotion);
configureMotion();
