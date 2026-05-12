/* animations.js — Dra. Geovana Camargo
   Estratégia segura: elementos NUNCA ficam invisíveis antes da animação.
   Usamos apenas translateY (movimento) sem opacity, exceto em itens
   onde a animação está 100% garantida de completar. */

gsap.registerPlugin(ScrollTrigger);

/* ── Utilitário: só anima se o elemento existe ── */
function animateIfExists(selector, vars, trigger) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  gsap.from(els, { ...vars, scrollTrigger: trigger });
}

/* ════════════════════════════════════════════
   HERO — entrada suave SEM esconder o botão
════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {

  // Tag + título: deslize para cima
  gsap.from('.hero .tag', {
    y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.15
  });

  gsap.from('.hero__title', {
    y: 28, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.30
  });

  gsap.from('.hero__subtitle', {
    y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.48,
    clearProps: 'all'
  });

  // Botão: SEM animação — garante que sempre aparece e é clicável

});

/* ════════════════════════════════════════════
   SEÇÕES COM SCROLL TRIGGER
════════════════════════════════════════════ */

/* Results — cards */
animateIfExists('.result-card', {
  y: 32, opacity: 0, duration: 0.65, ease: 'power2.out',
  stagger: 0.12, clearProps: 'all'
}, {
  trigger: '.results__grid',
  start: 'top 82%',
  toggleActions: 'play none none none'
});

/* Formulário */
animateIfExists('.form-wrapper', {
  y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', clearProps: 'all'
}, {
  trigger: '.form-wrapper',
  start: 'top 85%',
  toggleActions: 'play none none none'
});

/* About */
animateIfExists('.about__visual', {
  x: -32, opacity: 0, duration: 0.8, ease: 'power2.out', clearProps: 'all'
}, {
  trigger: '.about__container',
  start: 'top 80%',
  toggleActions: 'play none none none'
});

animateIfExists('.about__content', {
  x: 32, opacity: 0, duration: 0.8, ease: 'power2.out', clearProps: 'all'
}, {
  trigger: '.about__container',
  start: 'top 80%',
  toggleActions: 'play none none none'
});

/* Experience — mosaico */
animateIfExists('.mosaic__main', {
  y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', clearProps: 'all'
}, {
  trigger: '.experience__mosaic',
  start: 'top 82%',
  toggleActions: 'play none none none'
});

animateIfExists('.mosaic__item', {
  y: 24, opacity: 0, duration: 0.65, stagger: 0.14, ease: 'power2.out', clearProps: 'all'
}, {
  trigger: '.experience__mosaic',
  start: 'top 82%',
  toggleActions: 'play none none none'
});
