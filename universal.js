// Universal Transitions JavaScript for SethChenge Website
// Author: SethChenge IT Solutions
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Global variables
    let sidebarTimeout;
    let isScrolling = false;

    // Mobile Sidebar Management
    class SidebarManager {
        constructor() {
            this.sidebar = document.querySelector('.mobile-sidebar');
            this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            this.closeSidebarBtn = document.querySelector('.close-sidebar');
            this.sidebarOverlay = document.querySelector('.sidebar-overlay');
            this.sidebarContent = document.querySelector('.sidebar-content');
            this.isOpen = false;
            
            this.init();
        }

        init() {
            if (!this.sidebar) return;

            // Event listeners
            this.mobileMenuBtn?.addEventListener('click', () => this.openSidebar());
            this.closeSidebarBtn?.addEventListener('click', () => this.closeSidebar());
            this.sidebarOverlay?.addEventListener('click', () => this.closeSidebar());
            
            // Close sidebar when clicking nav links
            const navLinks = this.sidebar.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeSidebar();
                });
            });

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeSidebar();
                }
            });

            // Auto-close after 5 seconds of inactivity
            this.setupAutoClose();
        }

        openSidebar() {
            if (!this.sidebar) return;
            
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
            
            // GSAP animation for smooth opening
            if (typeof gsap !== 'undefined') {
                gsap.set(this.sidebar, { display: 'flex' });
                gsap.fromTo(this.sidebar, 
                    { x: '-100%' }, 
                    { x: '0%', duration: 0.4, ease: 'power2.out' }
                );
                gsap.fromTo(this.sidebarOverlay, 
                    { opacity: 0 }, 
                    { opacity: 1, duration: 0.3 }
                );
                gsap.fromTo(this.sidebarContent, 
                    { x: '-20px', opacity: 0 }, 
                    { x: '0px', opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
                );
            } else {
                // Fallback CSS animation
                this.sidebar.style.display = 'flex';
                this.sidebar.classList.add('sidebar-open');
            }

            this.startAutoCloseTimer();
        }

        closeSidebar() {
            if (!this.sidebar || !this.isOpen) return;
            
            this.isOpen = false;
            document.body.style.overflow = '';
            
            // Clear auto-close timer
            this.clearAutoCloseTimer();
            
            // GSAP animation for smooth closing
            if (typeof gsap !== 'undefined') {
                gsap.to(this.sidebar, { 
                    x: '-100%', 
                    duration: 0.3, 
                    ease: 'power2.in',
                    onComplete: () => {
                        gsap.set(this.sidebar, { display: 'none' });
                    }
                });
                gsap.to(this.sidebarOverlay, { 
                    opacity: 0, 
                    duration: 0.2 
                });
            } else {
                // Fallback CSS animation
                this.sidebar.classList.remove('sidebar-open');
                setTimeout(() => {
                    this.sidebar.style.display = 'none';
                }, 300);
            }
        }

        setupAutoClose() {
            // Reset timer on any interaction within sidebar
            if (this.sidebar) {
                this.sidebar.addEventListener('mouseenter', () => this.clearAutoCloseTimer());
                this.sidebar.addEventListener('mouseleave', () => this.startAutoCloseTimer());
                this.sidebar.addEventListener('touchstart', () => this.clearAutoCloseTimer());
                this.sidebar.addEventListener('click', () => this.clearAutoCloseTimer());
            }
        }

        startAutoCloseTimer() {
            if (!this.isOpen) return;
            
            this.clearAutoCloseTimer();
            sidebarTimeout = setTimeout(() => {
                this.closeSidebar();
            }, 5000); // 5 seconds
        }

        clearAutoCloseTimer() {
            if (sidebarTimeout) {
                clearTimeout(sidebarTimeout);
                sidebarTimeout = null;
            }
        }
    }

    // Smooth Scrolling Manager
    class SmoothScrollManager {
        constructor() {
            this.init();
        }

        init() {
            // Handle anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#' || href === '#sethchenge') {
                        e.preventDefault();
                        this.scrollToTop();
                    } else {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            this.scrollToElement(target);
                        }
                    }
                });
            });

            // Handle scroll events for navbar
            this.handleNavbarScroll();
        }

        scrollToTop() {
            if (typeof gsap !== 'undefined') {
                gsap.to(window, { 
                    scrollTo: { y: 0 }, 
                    duration: 1, 
                    ease: 'power2.out' 
                });
            } else {
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
            }
        }

        scrollToElement(element) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

            if (typeof gsap !== 'undefined') {
                gsap.to(window, { 
                    scrollTo: { y: targetPosition }, 
                    duration: 1, 
                    ease: 'power2.out' 
                });
            } else {
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: 'smooth' 
                });
            }
        }

        handleNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            let lastScrollY = window.scrollY;
            let ticking = false;

            const updateNavbar = () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }

                // Hide/show navbar on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            };

            const onScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(updateNavbar);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', onScroll, { passive: true });
        }
    }

    // Page Transitions Manager
    class PageTransitionsManager {
        constructor() {
            this.init();
        }

        init() {
            // Add page load animation
            this.animatePageLoad();
            
            // Handle page transitions for internal links
            this.handlePageTransitions();
        }

        animatePageLoad() {
            if (typeof gsap !== 'undefined') {
                // Animate page elements on load
                gsap.from('.navbar', { 
                    y: -100, 
                    opacity: 0, 
                    duration: 0.8, 
                    ease: 'power2.out' 
                });

                // Animate any hero sections
                const heroElements = document.querySelectorAll('.hero, .hero-content, .main-content');
                heroElements.forEach((element, index) => {
                    gsap.from(element, { 
                        y: 50, 
                        opacity: 0, 
                        duration: 0.8, 
                        delay: index * 0.1 + 0.3, 
                        ease: 'power2.out' 
                    });
                });

                // Animate cards or service items
                const cards = document.querySelectorAll('.card, .service-card, .staff-card');
                cards.forEach((card, index) => {
                    gsap.from(card, { 
                        y: 30, 
                        opacity: 0, 
                        duration: 0.6, 
                        delay: index * 0.1 + 0.5, 
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                });
            }
        }

        handlePageTransitions() {
            // Add hover effects to interactive elements
            const interactiveElements = document.querySelectorAll('.nav-link, .btn, .card, button');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(element, { 
                            scale: 1.02, 
                            duration: 0.2, 
                            ease: 'power2.out' 
                        });
                    }
                });

                element.addEventListener('mouseleave', () => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(element, { 
                            scale: 1, 
                            duration: 0.2, 
                            ease: 'power2.out' 
                        });
                    }
                });
            });
        }
    }

    // Utility Functions
    class Utils {
        static debounce(func, wait) {
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

        static throttle(func, limit) {
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
    }

    // Initialize all managers
    const sidebarManager = new SidebarManager();
    const smoothScrollManager = new SmoothScrollManager();
    const pageTransitionsManager = new PageTransitionsManager();

    // Handle resize events
    const handleResize = Utils.debounce(() => {
        // Close sidebar on desktop resize
        if (window.innerWidth >= 1024 && sidebarManager.isOpen) {
            sidebarManager.closeSidebar();
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Performance optimization: Preload critical pages
    const criticalLinks = document.querySelectorAll('a[href$=".html"]');
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const linkEl = document.createElement('link');
            linkEl.rel = 'prefetch';
            linkEl.href = link.href;
            document.head.appendChild(linkEl);
        }, { once: true });
    });

    // Add loading states for better UX
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('page-transitioning');
    });

    // Console log for debugging (remove in production)
    console.log('SethChenge Universal Transitions loaded successfully');
});