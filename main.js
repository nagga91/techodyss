// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = themeToggle.querySelector('.sun-icon');

  // Function to update icon based on theme
  function updateThemeIcon(isDark) {
    if (isDark) {
      sunIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    } else {
      sunIcon.innerHTML = `<path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0-2V3M12 21v-4M4.22 19.78l2.83-2.83M19.78 19.78l-2.83-2.83M3 12h4M21 12h-4M4.22 4.22l2.83 2.83M19.78 4.22l-2.83 2.83"/>`;
    }
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark);
    updateThemeIcon(isDark);
  });

  // Load saved theme
  if (localStorage.getItem('dark-theme') === 'true') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    updateThemeIcon(true);
  }

  // Updated Hero Slider Setup
  const heroSlider = document.querySelector('.hero-slider');
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      title: 'Connecting Schools to the Future',
      description: 'Advanced networking solutions for modern education'
    },
    {
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      title: 'Building Digital Infrastructure',
      description: 'Empowering education through technology'
    },
    {
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      title: 'Web Development Excellence',
      description: 'Creating powerful digital experiences'
    }
  ];

  // Create slides with content
  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
    slideDiv.style.backgroundImage = `url(${slide.image})`;
    slideDiv.innerHTML = `
      <div class="slide-content">
        <h2>${slide.title}</h2>
        <p>${slide.description}</p>
      </div>
    `;
    heroSlider.appendChild(slideDiv);
  });

  let currentSlide = 0;
  const totalSlides = slides.length;

  function nextSlide() {
    const slideElements = document.querySelectorAll('.slide');
    const currentElement = slideElements[currentSlide];
    const nextIndex = (currentSlide + 1) % totalSlides;
    const nextElement = slideElements[nextIndex];

    gsap.to(currentElement, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      onComplete: () => {
        currentElement.classList.remove('active');
      }
    });

    gsap.fromTo(nextElement,
      {
        opacity: 0,
        scale: 0.95
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        onStart: () => {
          nextElement.classList.add('active');
        }
      }
    );

    const nextContent = nextElement.querySelector('.slide-content');
    gsap.fromTo(nextContent.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    currentSlide = nextIndex;
  }

  setInterval(nextSlide, 6000);

  // Hero content animation
  const heroTimeline = gsap.timeline();
  
  heroTimeline
    .from('.hero-content h1', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-content p', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-content .cta-button', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');

  // Scroll Animations - only initialize if elements exist
  const aboutGrid = document.querySelector('.about-grid');
  if (aboutGrid) {
    gsap.from('.about-grid', {
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top center',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1
    });
  }

  // Service Cards Animation
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length) {
    gsap.from(serviceCards, {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }

  // Process Steps Animation
  const steps = document.querySelectorAll('.step');
  if (steps.length) {
    gsap.from(steps, {
      scrollTrigger: {
        trigger: '.process-steps',
        start: 'top center'
      },
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }

  // Stats Counter Animation
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    if (stat) {
      const target = parseInt(stat.textContent);
      let count = 0;
      
      gsap.to({}, {
        scrollTrigger: {
          trigger: stat,
          start: 'top center'
        },
        duration: 2,
        onUpdate: function() {
          count = Math.floor(this.progress() * target);
          stat.textContent = count + (stat.textContent.includes('%') ? '%' : '+');
        }
      });
    }
  });

  // Contact Form Animation
  const contactForm = document.querySelector('.contact-form');
  const contactInfo = document.querySelector('.contact-info');
  
  if (contactForm && contactInfo) {
    gsap.from(contactForm, {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top center+=100'
      },
      x: -100,
      opacity: 0,
      duration: 1
    });

    gsap.from(contactInfo, {
      scrollTrigger: {
        trigger: '.contact',
        start: 'top center+=100'
      },
      x: 100,
      opacity: 0,
      duration: 1
    });
  }

  // Form submission animation
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      gsap.to(form, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
      
      setTimeout(() => {
        form.reset();
        alert('Thank you for your message! We will get back to you soon.');
      }, 500);
    });
  }

  // Footer Animation
  const footerContent = document.querySelector('.footer-content');
  if (footerContent) {
    gsap.from('.footer-content > *', {
      scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom-=100'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
