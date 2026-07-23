/* =========================================================
   AIR COOLER FAN — script.js
   Table of contents:
   1. Loader
   2. Sticky nav + mobile menu
   3. Smooth scroll (nav close on click)
   4. Hero particle canvas
   5. Scroll reveal (fade-in)
   6. Accordion (FAQ)
   7. Video play
   8. Gallery lazy-load
   9. Ripple button effect
   10. Sticky mobile CTA + back to top
   11. Footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('is-hidden');
      setTimeout(() => loader.remove(), 600);
    }
  });

  /* ---------- 2. Sticky nav + mobile menu ---------- */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('navBurger');
  const navMobile = document.getElementById('navMobile');

  const onScrollNav = () => {
    if (window.scrollY > 12) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  if (navBurger && navMobile) {
    navBurger.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('is-open');
      navBurger.setAttribute('aria-expanded', String(isOpen));
      navBurger.setAttribute('aria-label', isOpen ? 'بستن منو' : 'باز کردن منو');
    });

    /* ---------- 3. Close mobile nav on link click ---------- */
    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('is-open');
        navBurger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 4. Hero particle canvas ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    const PARTICLE_COUNT = 34;

    const resize = () => {
      const hero = canvas.closest('.hero');
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.8,
        speed: Math.random() * 0.35 + 0.1,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.35 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    requestAnimationFrame(draw);
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  }

  /* ---------- 5. Scroll reveal (fade-in) ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el) => revealObserver.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 6. Accordion (FAQ) ---------- */
  const triggers = document.querySelectorAll('.accordion__trigger');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels for a clean single-open accordion
      triggers.forEach((t) => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(t.getAttribute('aria-controls'));
          if (p) p.style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });

  /* ---------- 7. Video play ---------- */
 (function(){
    var wrap = document.getElementById('videoWrap');
    var video = document.getElementById('productVideo');
    var bigPlay = document.getElementById('bigPlay');
    var playBtn = document.getElementById('playBtn');
    var muteBtn = document.getElementById('muteBtn');
    var fullBtn = document.getElementById('fullBtn');
    var progressBar = document.getElementById('progressBar');
    var progressFill = document.getElementById('progressFill');
    var timeEl = document.getElementById('videoTime');

    function fmt(t){
        if(isNaN(t)) return '00:00';
        var m = Math.floor(t/60);
        var s = Math.floor(t%60);
        return (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    }

    function togglePlay(){
        if(video.paused){ video.play(); } else { video.pause(); }
    }

    function updatePlayIcon(){
        var isPaused = video.paused;
        playBtn.querySelector('.icon-play').style.display = isPaused ? 'block' : 'none';
        playBtn.querySelector('.icon-pause').style.display = isPaused ? 'none' : 'block';
        wrap.classList.toggle('is-playing', !isPaused);
    }
if (video && bigPlay && playBtn && muteBtn && fullBtn) {
   bigPlay.addEventListener('click', togglePlay);
    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayIcon);
    video.addEventListener('pause', updatePlayIcon);
    video.addEventListener('click', togglePlay);

}
   
    video.addEventListener('timeupdate', function(){
        var pct = (video.currentTime / video.duration) * 100 || 0;
        progressFill.style.width = pct + '%';
        timeEl.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
    });

    video.addEventListener('loadedmetadata', function(){
        timeEl.textContent = fmt(0) + ' / ' + fmt(video.duration);
    });

    progressBar.addEventListener('click', function(e){
        var rect = progressBar.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        video.currentTime = pct * video.duration;
    });

    muteBtn.addEventListener('click', function(){
        video.muted = !video.muted;
        muteBtn.querySelector('.icon-vol').style.display = video.muted ? 'none' : 'block';
        muteBtn.querySelector('.icon-mute').style.display = video.muted ? 'block' : 'none';
    });

    fullBtn.addEventListener('click', function(){
        if(document.fullscreenElement){
            document.exitFullscreen();
        } else {
            wrap.requestFullscreen();
        }
    });
})();

  

 

  /* ---------- 8. Gallery lazy-load ---------- */


  /* ---------- 9. Ripple button effect ---------- */
  document.querySelectorAll('.btn--ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 10. Sticky mobile CTA + back to top ---------- */
  const stickyCta = document.getElementById('stickyCta');
  const backToTop = document.getElementById('backToTop');
  const heroEl = document.getElementById('hero');

  const toggleFloatingUI = () => {
    const scrolled = window.scrollY > (heroEl ? heroEl.offsetHeight * 0.6 : 300);
    if (stickyCta) stickyCta.classList.toggle('is-visible', scrolled);
    if (backToTop) backToTop.classList.toggle('is-visible', scrolled);
  };
  toggleFloatingUI();
  window.addEventListener('scroll', toggleFloatingUI, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 11. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
