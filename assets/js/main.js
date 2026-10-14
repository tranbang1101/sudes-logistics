/* ==========================================================================
   SUDES LOGISTICS - MAIN JAVASCRIPT
   Handles sliders, smooth back-to-top, count-up numbers, video popups,
   search toggling, mobile offcanvas and GTranslate integration.
   ========================================================================== */

(function () {
  'use strict';

  // 1. Initialize Hero Swiper with crossfade & auto-play
  let heroSwiper = null;
  if (typeof Swiper !== 'undefined' && document.getElementById('heroSwiper')) {
    heroSwiper = new Swiper('#heroSwiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.hero-pagination',
        clickable: true
      }
    });
  }

  // 2. Initialize Feedback / Testimonials Swiper
  let feedbackSwiper = null;
  if (typeof Swiper !== 'undefined' && document.getElementById('feedbackSwiper')) {
    feedbackSwiper = new Swiper('#feedbackSwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      pagination: {
        el: '#feedbackSwiper .swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 28
        }
      }
    });
  }

  // 3. Header Shadow on Scroll
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  };

  // 4. Back To Top (Single smooth scroll button)
  const backBtn = document.getElementById('backToTop');
  const onScrollBackBtn = () => {
    if (backBtn) {
      backBtn.classList.toggle('show', window.scrollY > 350);
    }
  };

  window.addEventListener('scroll', () => {
    onScrollHeader();
    onScrollBackBtn();
  }, { passive: true });
  onScrollHeader();
  onScrollBackBtn();

  // Smooth scroll with custom easeOutCubic curve
  const scrollToTopEaseOut = (duration = 800) => {
    const startY = window.scrollY;
    if (startY === 0) return;
    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY * (1 - easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTopEaseOut(800);
    });
  }

  // 5. Search Bar Toggle (Desktop)
  const searchBoxToggle = document.getElementById('searchBoxToggle');
  const btnSearchTrigger = document.getElementById('btnSearchTrigger');
  if (btnSearchTrigger && searchBoxToggle) {
    btnSearchTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBoxToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!searchBoxToggle.contains(e.target)) {
        searchBoxToggle.classList.remove('active');
      }
    });
  }

  // 6. Interactive FAQ Accordion (Click to toggle active class & slide)
  const faqItems = document.querySelectorAll('.faq-list li');
  faqItems.forEach((item) => {
    const heading = item.querySelector('h3');
    if (heading) {
      heading.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close siblings for clean accordion behavior
        faqItems.forEach((sibling) => sibling.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. Video Modal Popup
  const openVideoBtn = document.getElementById('openVideoBtn');
  const popupVideo = document.getElementById('popupVideo');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const videoContainer = document.getElementById('videoIframeContainer');

  if (openVideoBtn && popupVideo && videoContainer) {
    openVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = openVideoBtn.getAttribute('data-video') || '9Jhuvm0-9F4';
      videoContainer.innerHTML = `<iframe class="w-100 h-100" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
      popupVideo.classList.add('open');
    });

    const closeVideo = () => {
      popupVideo.classList.remove('open');
      setTimeout(() => {
        videoContainer.innerHTML = '';
      }, 300);
    };

    if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideo);
    popupVideo.addEventListener('click', (e) => {
      if (e.target === popupVideo) closeVideo();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popupVideo.classList.contains('open')) closeVideo();
    });
  }

  // 8. Scroll-Reveal Animations (IntersectionObserver)
  const animEls = document.querySelectorAll('[data-anim]');
  animEls.forEach((el) => {
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--delay', delay + 'ms');
  });

  if ('IntersectionObserver' in window) {
    const ioAnim = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          ioAnim.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach((el) => ioAnim.observe(el));
  } else {
    animEls.forEach((el) => el.classList.add('in-view'));
  }

  // 9. Count-Up Numbers (for Why us & About stats)
  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const start = performance.now();
    const format = (n) => n.toLocaleString('vi-VN');

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(Math.floor(target * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = format(target);
      }
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => countIO.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  // 10. Language Switcher Trigger for Mobile click support
  const popupNgonngu = document.getElementById('popupNgonngu');
  const toggleLangBtn = document.getElementById('toggleLangDropdown');
  if (toggleLangBtn && popupNgonngu) {
    toggleLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popupNgonngu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!popupNgonngu.contains(e.target)) {
        popupNgonngu.classList.remove('active');
      }
    });
  }

  // 11. GTranslate helper integration
  window.translatePage = function (lang) {
    // If GTranslate float widget creates select or links, trigger them
    const gtSelect = document.querySelector('.goog-te-combo, select.gt_selector');
    if (gtSelect) {
      gtSelect.value = lang;
      gtSelect.dispatchEvent(new Event('change'));
    } else {
      // Trigger via gtranslate function if available
      if (typeof doGTranslate === 'function') {
        doGTranslate('vi|' + lang);
      } else {
        // Fallback cookie translation
        document.cookie = `googtrans=/vi/${lang}; path=/`;
        location.reload();
      }
    }
  };

})();
