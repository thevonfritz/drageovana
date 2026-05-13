/* =========================================================
   Dra. Geovana Camargo — LP Scripts
   - Before/After slider
   - Form validation + Meta Pixel/CAPI stub
   - Reveal-on-scroll animations
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- WhatsApp mask ---------- */
  const phone = document.getElementById('f-phone');
  if (phone) {
    phone.addEventListener('input', () => {
      let v = phone.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      phone.value = v;
    });
  }

  /* ---------- Form submit ---------- */
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const fields = ['f-name', 'f-phone', 'f-procedure'];
      fields.forEach((id) => {
        const el = document.getElementById(id);
        const err = document.querySelector(`.err[data-for="${id}"]`);
        const v = (el.value || '').trim();
        if (!v) { valid = false; err.textContent = 'Campo obrigatório.'; }
        else if (id === 'f-phone' && v.replace(/\D/g, '').length < 10) {
          valid = false; err.textContent = 'Informe um WhatsApp válido.';
        } else err.textContent = '';
      });

      if (!valid) return;

      const data = {
        name: document.getElementById('f-name').value.trim(),
        phone: document.getElementById('f-phone').value.trim(),
        procedure: document.getElementById('f-procedure').value,
      };

      // Meta Pixel — Lead event (stub; pixel.php handles CAPI server-side)
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: data.procedure,
          content_category: 'Avaliação',
        });
      }

      // Server-side: would POST to pixel.php here.
      // fetch('pixel.php', { method:'POST', body: new FormData(form) });

      form.style.display = 'none';
      document.getElementById('form-success').classList.add('show');
    });
  }

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
