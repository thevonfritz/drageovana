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

  /* ---------- Before/After sliders ---------- */
  document.querySelectorAll('.ba-frame').forEach((frame) => {
    const after = frame.querySelector('.ba-after');
    const divider = frame.querySelector('.ba-divider');
    const handle = frame.querySelector('.ba-handle');
    let dragging = false;

    function setPos(pct) {
      const p = Math.max(2, Math.min(98, pct));
      after.style.clipPath = `inset(0 0 0 ${p}%)`;
      divider.style.left = p + '%';
      handle.style.left = p + '%';
    }

    function onMove(clientX) {
      const r = frame.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100;
      setPos(pct);
    }

    frame.addEventListener('mousedown', (e) => {
      dragging = true;
      onMove(e.clientX);
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => dragging && onMove(e.clientX));
    window.addEventListener('mouseup', () => (dragging = false));

    frame.addEventListener('touchstart', (e) => {
      dragging = true;
      onMove(e.touches[0].clientX);
    }, { passive: true });
    frame.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      onMove(e.touches[0].clientX);
    }, { passive: true });
    frame.addEventListener('touchend', () => (dragging = false));

    // gentle intro animation
    let start = null;
    function intro(ts) {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / 1400);
      const ease = 1 - Math.pow(1 - t, 3);
      setPos(50 + Math.sin(ease * Math.PI) * 14);
      if (t < 1) requestAnimationFrame(intro);
      else setPos(50);
    }
    const introIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          requestAnimationFrame(intro);
          introIO.unobserve(frame);
        }
      });
    }, { threshold: 0.4 });
    introIO.observe(frame);
  });

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
