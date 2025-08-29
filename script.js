document.addEventListener('DOMContentLoaded', function () {
    // Performance optimization: Preload critical resources
    const preloadResources = () => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';
        link.as = 'style';
        document.head.appendChild(link);
    };

    preloadResources();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Loading Screen Functionality with performance optimization
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            setTimeout(() => {
                loadingScreen.style.transition = 'opacity 0.5s ease';
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        });
    }

    // Lazy Loading Implementation
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Enhanced Counter Animation with performance optimization
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / 2000, 1); // 2 second animation

            current = Math.floor(progress * target);

            if (target === 2000) {
                element.textContent = current + '+';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target === 2000 ? '+' : '');
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);

    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    // Enhanced Hover Effects
    const cards = document.querySelectorAll('.card, .service-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced Scroll-triggered Animations
    const scrollElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // Performance: Debounced scroll handler for dynamic effects
    let scrollTimeout;
    const handleScroll = () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Add scroll-based effects here if needed
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // GPU Acceleration for smooth animations
    const gpuElements = document.querySelectorAll('.gpu-accelerated');
    gpuElements.forEach(el => {
        el.style.transform = 'translateZ(0)';
        el.style.backfaceVisibility = 'hidden';
    });

    // Smooth scrolling for navigation links with performance optimization
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize AOS with performance optimizations
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
        disable: window.innerWidth < 768 ? true : false, // Disable on mobile for better performance
    });

    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');

    const updateScrollProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.transform = `scaleX(${progress / 100})`;
        }
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScrollThrottled = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    updateScrollProgress(); // Initial call

    // Back to Top Button behavior
    const backToTopBtn = document.getElementById('back-to-top');
    const updateBackToTop = () => {
        if (!backToTopBtn) return;
        const y = window.pageYOffset || document.documentElement.scrollTop;
        if (y > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    window.addEventListener('scroll', () => requestAnimationFrame(updateBackToTop), { passive: true });
    updateBackToTop();

    // Highlight active nav link based on section in view
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = Array.from(document.querySelectorAll('nav .navbar-link'));
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.6 });
    sections.forEach(sec => sectionObserver.observe(sec));

    // Respect reduced motion: disable AOS if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        try { AOS.disable(); } catch (e) {}
    }

    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🚀 Portfolio Performance Metrics:');
        console.log('✅ Lazy loading enabled');
        console.log('✅ GPU acceleration active');
        console.log('✅ Intersection Observer active');
        console.log('✅ Scroll progress indicator active');
    }

    // Case Study Toggle Functionality
    window.toggleCaseStudy = function(projectId) {
        const caseStudy = document.getElementById(`${projectId}-case-study`);
        const toggleBtn = caseStudy.previousElementSibling.querySelector('.case-study-toggle');
        const icon = toggleBtn.querySelector('i');

        if (caseStudy.style.display === 'none' || caseStudy.style.display === '') {
            caseStudy.style.display = 'block';
            icon.className = 'fas fa-minus-circle';
            toggleBtn.innerHTML = '<i class="fas fa-minus-circle"></i> Hide Case Study';
        } else {
            caseStudy.style.display = 'none';
            icon.className = 'fas fa-plus-circle';
            toggleBtn.innerHTML = '<i class="fas fa-plus-circle"></i> View Detailed Case Study';
        }
    };

    // Initialize Particles.js
    const initParticles = () => particlesJS('particles-js-header', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
    const initParticlesContact = () => particlesJS('particles-js-contact', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "edge" },
            opacity: { value: 0.6, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 4, direction: "top", straight: true }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: false } }
        },
        retina_detect: true
    });
    if (!prefersReducedMotion.matches) {
        initParticles();
        initParticlesContact();
    }
});