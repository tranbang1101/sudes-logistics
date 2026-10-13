/* ================= SUDES LOGISTICS - MAIN JS ================= */
(function () {
  'use strict';

  // 1. Header shadow on scroll
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => header && header.classList.toggle('scrolled', window.scrollY > 10);

  // 2. Back-to-top button
  const backBtn = document.getElementById('backToTop');
  const onScrollBtn = () => backBtn && backBtn.classList.toggle('show', window.scrollY > 400);

  window.addEventListener('scroll', () => { onScrollHeader(); onScrollBtn(); }, { passive: true });
  onScrollHeader();
  onScrollBtn();

  if (backBtn) {
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 3. Close mobile menu when a link is tapped
  document.querySelectorAll('#mainNav .nav-link:not(.dropdown-toggle), #mainNav .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      if (nav && nav.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // 4. Scroll-reveal animations
  const revealEls = document.querySelectorAll('[data-anim]');
  revealEls.forEach(el => {
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--delay', delay + 'ms');
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // 5. Count-up numbers (triggered when visible)
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const start = performance.now();
    const format = (n) => n.toLocaleString('vi-VN');
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = format(target);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countIO.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // 6. Parallax-free subtle tilt on the about visual (desktop only)
  const visual = document.querySelector('.visual-card');
  if (visual && window.matchMedia('(pointer: fine)').matches) {
    visual.parentElement.addEventListener('mousemove', (e) => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      visual.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    visual.parentElement.addEventListener('mouseleave', () => {
      visual.style.transform = '';
    });
  }
})();
