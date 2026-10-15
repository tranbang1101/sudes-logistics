/**
 * SUDES LOGISTICS - MAIN INTERACTION SCRIPT
 * Handles UI components, animations, and dynamic behaviors.
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // ==========================================
  // 1. INITIALIZATION HELPERS
  // ==========================================
  
  const isMobile = window.innerWidth < 992;
  
  // Helper: Debounce function for performance
  function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // 5. Nav prev/next scroll (menu ngang) + auto-hide khi không tràn
(function initNavArrows() {
  const nav = document.getElementById('navMain');
  const prev = document.getElementById('navPrev');
  const next = document.getElementById('navNext');
  if (!nav || !prev || !next) return;

  const step = 240;      // px mỗi lần bấm
  const duration = 700;  // ms
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  let animId = null;

  const maxScroll = () => nav.scrollWidth - nav.clientWidth;

  const scrollToX = (targetX) => {
    if (animId) cancelAnimationFrame(animId);
    const startX = nav.scrollLeft;
    const distance = targetX - startX;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      nav.scrollLeft = startX + distance * easeOutCubic(p);
      animId = p < 1 ? requestAnimationFrame(tick) : null;
    };
    animId = requestAnimationFrame(tick);
  };

  const refresh = () => {
    const overflow = nav.scrollWidth > nav.clientWidth + 2;
    prev.classList.toggle('is-hidden', !overflow);
    next.classList.toggle('is-hidden', !overflow);
    if (!overflow) return;
    prev.disabled = nav.scrollLeft <= 2;
    next.disabled = nav.scrollLeft >= maxScroll() - 2;
  };

  prev.addEventListener('click', () => scrollToX(Math.max(0, nav.scrollLeft - step)));
  next.addEventListener('click', () => scrollToX(Math.min(maxScroll(), nav.scrollLeft + step)));
  nav.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh);
  refresh();
})();
// Đo chiều cao header để đặt nút đổi ngôn ngữ ngay dưới header
(function syncHeaderHeight() {
  const header = document.querySelector('.header-wrapper');
  if (!header) return;
  const setVar = () => document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  setVar();
  window.addEventListener('resize', setVar);
})();
(function fixNavDropdowns() {
  const headerMain = document.querySelector('.header-main');
  if (!headerMain) return;
  document.querySelectorAll('.nav-main > li.has-dropdown').forEach((li) => {
    const menu = li.querySelector('.dropdown-sub');
    if (!menu) return;
    const place = () => {
      const liRect = li.getBoundingClientRect();
      const mainRect = headerMain.getBoundingClientRect();
      const maxLeft = window.innerWidth - menu.offsetWidth - 12;
      menu.style.top = mainRect.bottom + 'px';
      menu.style.left = Math.max(12, Math.min(liRect.left, maxLeft)) + 'px';
    };
    li.addEventListener('mouseenter', place);
    li.addEventListener('focusin', place);
  });
})();

  // ==========================================
  // 2. SWIPER SLIDERS (Hero & Testimonials)
  // ==========================================
  
  // Check if Swiper library is loaded globally
  if (typeof Swiper !== 'undefined') {
    
    // Hero Slider
    const heroSwiperEl = document.querySelector('.hero-swiper');
    if (heroSwiperEl) {
      new Swiper(heroSwiperEl, {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.hero-pagination',
          clickable: true,
        },
        // Pause autoplay on hover for better UX
        on: {
          mouseenter: function(swiper) {
            swiper.autoplay.stop();
          },
          mouseleave: function(swiper) {
            swiper.autoplay.start();
          }
        }
      });
    }

    // Testimonials Slider
    const feedbackSwiperEl = document.getElementById('feedbackSwiper');
    if (feedbackSwiperEl) {
      new Swiper(feedbackSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '#feedbackSwiper .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }
      });
    }
  }

  // ==========================================
  // 3. SCROLL ANIMATIONS (AOS & Header Sticky)
  // ==========================================
  
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true, // Only animate once
      offset: 50,
      disable: window.innerWidth < 768 ? 'mobile' : false // Disable on mobile if needed for perf
    });
  }

  // Header Shadow on Scroll
  const header = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTop');
  
  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    
    // Toggle Header Class
    if (header) {
      if (scrolled) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Toggle Back to Top Button
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', debounce(handleScroll, 10));
  handleScroll(); // Run once on load

  // Smooth Scroll to Top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 4. NUMBER COUNT-UP EFFECT
  // ==========================================
  
  const counters = document.querySelectorAll('[data-count]');
  
  const runCounter = (el) => {
    const target = +el.getAttribute('data-count');
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = target / totalFrames;
    
    let current = 0;
    
    const updateCount = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.ceil(current).toLocaleString('vi-VN');
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target.toLocaleString('vi-VN');
      }
    };
    
    updateCount();
  };

  // Intersection Observer to trigger counter when visible
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.5 // Trigger when 50% of element is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target); // Stop observing after running once
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  } else {
    // Fallback for old browsers
    counters.forEach(counter => {
      counter.innerText = counter.getAttribute('data-count').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });
  }

  // ==========================================
  // 5. FAQ ACCORDION
  // ==========================================
  
  const faqItems = document.querySelectorAll('.faq-list li');
  
  faqItems.forEach(item => {
    const heading = item.querySelector('h3');
    if (heading) {
      heading.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items (Optional: remove this block if you want multiple open)
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================
  // 6. VIDEO POPUP MODAL
  // ==========================================
  
  const openVideoBtn = document.getElementById('openVideoBtn');
  const popupVideo = document.getElementById('popupVideo');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const videoContainer = document.getElementById('videoIframeContainer');

  if (openVideoBtn && popupVideo && videoContainer) {
    openVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = openVideoBtn.getAttribute('data-video');
      
      // Inject YouTube Iframe
      videoContainer.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
      
      popupVideo.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    const closePopup = () => {
      popupVideo.classList.remove('open');
      videoContainer.innerHTML = ''; // Remove iframe to stop audio
      document.body.style.overflow = ''; // Restore scrolling
    };

    if (closeVideoBtn) {
      closeVideoBtn.addEventListener('click', closePopup);
    }

    // Close on outside click
    popupVideo.addEventListener('click', (e) => {
      if (e.target === popupVideo) {
        closePopup();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popupVideo.classList.contains('open')) {
        closePopup();
      }
    });
  }

  // ==========================================
  // 7. SEARCH BOX TOGGLE
  // ==========================================
  
  const searchToggle = document.getElementById('btnSearchTrigger');
  const searchBox = document.getElementById('searchBoxToggle');

  if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBox.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target)) {
        searchBox.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 8. MOBILE MENU HANDLING (Bootstrap Offcanvas)
  // ==========================================
  // Note: Since we are using Bootstrap 5's native offcanvas component via data-bs-target,
  // most functionality is handled by bootstrap.bundle.min.js.
  // We just need to ensure any custom scripts don't conflict.
  
  // Auto-close offcanvas when clicking a link inside it (UX improvement)
  const offcanvasLinks = document.querySelectorAll('#mobileMenuOffcanvas a[href^="#"]');
  offcanvasLinks.forEach(link => {
    link.addEventListener('click', () => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenuOffcanvas'));
      if(offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  });

});
/* ==========================================================
   ĐỔI NGÔN NGỮ (GTranslate) - nút globe dưới header
   ========================================================== */
(function initLanguageSwitcher() {
  const popup = document.getElementById('popupNgonngu');
  const toggle = document.getElementById('toggleLangDropdown');
  if (!popup || !toggle) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target)) popup.classList.remove('active');
  });
  // Language Switcher Trigger for Mobile click support
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
})();

// Gọi doGTranslate('nguồn|đích') của widget GTranslate, ví dụ 'vi|en'
window.translatePage = function (lang) {
  const pair = 'vi|' + lang;
  const run = () => {
    if (typeof window.doGTranslate === 'function') {
      window.doGTranslate(pair);
      return true;
    }
    return false;
  };
  if (!run()) {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (run() || tries >= 10) clearInterval(timer);
    }, 300);
  }
};
