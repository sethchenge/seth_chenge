// Performance-optimized JavaScript for SethChenge website
// Designed for sub-1-second loading with smooth animations

(function() {
    'use strict';
    
    // Cache DOM elements for better performance
    const DOM = {
        navbar: null,
        mobileMenuBtn: null,
        mobileSidebar: null,
        closeSidebar: null,
        sidebarOverlay: null,
        backToTopBtn: null,
        typingText: null,
        cursor: null,
        counters: null,
        heroContent: null,
        heroImage: null,
        certCards: null,
        serviceCards: null,
        ceoCard: null,
        navLinks: null
    };

    // Configuration
    const CONFIG = {
        scrollThrottle: 16, // ~60fps
        typingSpeed: 100,
        counterSpeed: 50,
        fadeDistance: 100,
        backToTopThreshold: 300
    };

    // Throttle function for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Cache DOM elements once
    function cacheDOMElements() {
        DOM.navbar = document.querySelector('.navbar');
        DOM.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        DOM.mobileSidebar = document.querySelector('.mobile-sidebar');
        DOM.closeSidebar = document.querySelector('.close-sidebar');
        DOM.sidebarOverlay = document.querySelector('.sidebar-overlay');
        DOM.backToTopBtn = document.getElementById('backToTop');
        DOM.typingText = document.querySelector('.typing-text');
        DOM.cursor = document.querySelector('.cursor');
        DOM.counters = document.querySelectorAll('.counter');
        DOM.heroContent = document.querySelector('.hero-content');
        DOM.heroImage = document.querySelector('.hero-image');
        DOM.certCards = document.querySelectorAll('.cert-card');
        DOM.serviceCards = document.querySelectorAll('.service-card');
        DOM.ceoCard = document.querySelector('.ceo-card');
        DOM.navLinks = document.querySelectorAll('.nav-link');
    }

    // Optimized scroll handler with requestAnimationFrame
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                // Navbar background opacity
                if (DOM.navbar) {
                    const opacity = Math.min(scrollY / 100, 0.95);
                    DOM.navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
                }
                
                // Back to top button
                if (DOM.backToTopBtn) {
                    if (scrollY > CONFIG.backToTopThreshold) {
                        DOM.backToTopBtn.style.opacity = '1';
                        DOM.backToTopBtn.style.visibility = 'visible';
                        DOM.backToTopBtn.style.transform = 'translateY(0)';
                    } else {
                        DOM.backToTopBtn.style.opacity = '0';
                        DOM.backToTopBtn.style.visibility = 'hidden';
                        DOM.backToTopBtn.style.transform = 'translateY(10px)';
                    }
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }

    // Optimized typing animation
    function initTypingAnimation() {
        if (!DOM.typingText) return;
        
        const messages = [
            "Your IT Solutions Partner",
            "Expert Windows Installation",
            "Advanced Cybersecurity",
            "24/7 Technical Support"
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentMessage = messages[messageIndex];
            
            if (isDeleting) {
                DOM.typingText.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                DOM.typingText.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = CONFIG.typingSpeed;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentMessage.length) {
                typeSpeed = 2000; // Pause at end of message
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                typeSpeed = 500; // Pause before next message
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing animation after a short delay
        setTimeout(type, 1000);
        
        // Animate cursor
        if (DOM.cursor) {
            setInterval(() => {
                DOM.cursor.style.opacity = DOM.cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }

    // Intersection Observer for animations (more performant than scroll events)
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    
                    // Trigger counter animation if it's a counter element
                    if (element.classList.contains('counter') && !element.hasAttribute('data-animated')) {
                        animateCounter(element);
                        element.setAttribute('data-animated', 'true');
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        const elementsToAnimate = [
            ...document.querySelectorAll('.fade-in-up'),
            ...document.querySelectorAll('.fade-in-right'),
            ...DOM.certCards,
            ...DOM.serviceCards,
            DOM.ceoCard,
            ...DOM.counters
        ].filter(Boolean);
        
        elementsToAnimate.forEach(el => {
            if (el) {
                // Set initial state
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });
    }

    // Optimized counter animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / (2000 / CONFIG.counterSpeed); // 2 second duration
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    // Mobile menu functionality
    function initMobileMenu() {
        if (!DOM.mobileMenuBtn || !DOM.mobileSidebar) return;
        
        function openSidebar() {
            DOM.mobileSidebar.style.transform = 'translateX(0)';
            document.body.style.overflow = 'hidden';
        }
        
        function closeSidebar() {
            DOM.mobileSidebar.style.transform = 'translateX(-100%)';
            document.body.style.overflow = '';
        }
        
        DOM.mobileMenuBtn.addEventListener('click', openSidebar);
        
        if (DOM.closeSidebar) {
            DOM.closeSidebar.addEventListener('click', closeSidebar);
        }
        
        if (DOM.sidebarOverlay) {
            DOM.sidebarOverlay.addEventListener('click', closeSidebar);
        }
        
        // Close on nav link click
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSidebar();
        });
    }

    // Smooth scroll functionality
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
        
        // Back to top functionality
        if (DOM.backToTopBtn) {
            DOM.backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Add hover effects with better performance
    function initHoverEffects() {
        // Service cards hover effect
        DOM.serviceCards.forEach(card => {
            let isHovering = false;
            
            card.addEventListener('mouseenter', () => {
                if (!isHovering) {
                    isHovering = true;
                    requestAnimationFrame(() => {
                        card.style.transform = 'translateY(-8px)';
                        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (isHovering) {
                    isHovering = false;
                    requestAnimationFrame(() => {
                        card.style.transform = 'translateY(0)';
                        card.style.boxShadow = '';
                    });
                }
            });
        });
        
        // Cert cards hover effect
        DOM.certCards.forEach(card => {
            let isHovering = false;
            
            card.addEventListener('mouseenter', () => {
                if (!isHovering) {
                    isHovering = true;
                    requestAnimationFrame(() => {
                        card.style.transform = 'translateY(-4px)';
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (isHovering) {
                    isHovering = false;
                    requestAnimationFrame(() => {
                        card.style.transform = 'translateY(0)';
                    });
                }
            });
        });
    }

    // Button interactions
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add CSS animation for ripple effect
    function addRippleCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Lazy load images for better performance
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'images/logo.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Initialize floating animations for hero elements
    function initFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.floating-icon');
        
        floatingElements.forEach((element, index) => {
            const amplitude = 10;
            const speed = 0.02;
            const offset = index * Math.PI;
            
            function animate() {
                const y = Math.sin(Date.now() * speed + offset) * amplitude;
                element.style.transform = `translateY(${y}px)`;
                requestAnimationFrame(animate);
            }
            
            // Start animation with delay to prevent all elements moving in sync
            setTimeout(() => requestAnimationFrame(animate), index * 500);
        });
    }

    // Main initialization function
    function init() {
        // Cache DOM elements first
        cacheDOMElements();
        
        // Initialize core functionality
        initMobileMenu();
        initSmoothScroll();
        initTypingAnimation();
        initScrollAnimations();
        initHoverEffects();
        initButtonEffects();
        initLazyLoading();
        initFloatingAnimations();
        
        // Add CSS for ripple effect
        addRippleCSS();
        
        // Preload critical resources
        preloadCriticalResources();
        
        // Add optimized scroll listener
        window.addEventListener('scroll', throttle(handleScroll, CONFIG.scrollThrottle), { passive: true });
        
        // Add resize listener with debounce
        window.addEventListener('resize', debounce(() => {
            // Recalculate any responsive elements if needed
            if (DOM.navbar) {
                DOM.navbar.style.backgroundColor = '';
            }
        }, 250), { passive: true });
        
        console.log('SethChenge website initialized successfully! 🚀');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section entrance animation
        gsap.timeline()
            .from('.hero-content > *', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            })
            .from('.hero-image', {
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.4');
        
        // Animate sections on scroll
        gsap.utils.toArray('section:not(.hero-section)').forEach(section => {
            gsap.from(section.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // Parallax effect for hero section
        gsap.to('.hero-section', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

})();