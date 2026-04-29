/* ======================================================
   SHRIRAM BYRAPPA — Portfolio Script
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     TYPING ANIMATION
     -------------------------------------------------- */
  const phrases = [
    'Web Developer',
    'CSE Student',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  const typingEl = document.getElementById('typingText');
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  // Start typing after hero animations settle
  setTimeout(type, 1400);

  /* --------------------------------------------------
     NAVBAR SCROLL EFFECT
     -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* --------------------------------------------------
     MOBILE NAV TOGGLE
     -------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* --------------------------------------------------
     SMOOTH SCROLL
     -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        // Reduced the offset so the section title aligns nicely below the navbar
        const offsetTop = target.offsetTop - 10;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------
     REVEAL ON SCROLL (Intersection Observer)
     -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Don't unobserve so we can re-trigger if needed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------
     COUNTER ANIMATION
     -------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-number');
  let countersDone = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const duration = 1800;
          const increment = target / (duration / 16);
          let current = 0;

          function updateCounter() {
            current += increment;
            if (current < target) {
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  if (counters.length > 0) {
    counterObserver.observe(counters[0].closest('.about-stats'));
  }

  /* --------------------------------------------------
     ACTIVE NAV LINK HIGHLIGHT
     -------------------------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  /* --------------------------------------------------
     PARALLAX-LITE FOR FLOATING ICONS
     -------------------------------------------------- */
  const floatingIcons = document.querySelectorAll('.float-icon');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    floatingIcons.forEach((icon, i) => {
      const speed = 8 + (i * 3);
      icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });

});
