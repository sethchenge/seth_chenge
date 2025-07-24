// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeServiceCards();
    initializeCTAButtons();
    initializePackageCards();
    initializeScrollEffects();
    
    // Performance optimization
    optimizeImages();
    
    // Analytics tracking
    trackUserInteractions();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileSidebar.classList.remove('-translate-x-full');
            document.body.classList.add('overflow-hidden');
            
            // Add entrance animation
            gsap.fromTo(mobileSidebar, 
                { x: '-100%' }, 
                { x: '0%', duration: 0.3, ease: 'power2.out' }
            );
        });
    }
    
    // Close sidebar functionality
    function closeSidebar() {
        gsap.to(mobileSidebar, {
            x: '-100%',
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                mobileSidebar.classList.add('-translate-x-full');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add/remove background opacity based on scroll
        if (scrollTop > 50) {
            navbar.classList.add('bg-white');
            navbar.classList.remove('bg-white/95');
        } else {
            navbar.classList.remove('bg-white');
            navbar.classList.add('bg-white/95');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
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
}

// GSAP Animations
function initializeAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-section h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.hero-section p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-section .btn-primary, .hero-section .btn-secondary', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3');
    
    // Service cards animation
    gsap.fromTo('.service-card', {
        y: 50,
        opacity: 0,
        scale: 0.95
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Feature cards animation
    gsap.fromTo('.feature-card', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.why-choose-us',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Package cards animation
    gsap.fromTo('.package-card', {
        y: 40,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.service-packages',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // CTA section animation
    gsap.fromTo('.cta-section', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
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

// Service Cards Interactive Features
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const button = card.querySelector('button');
        const serviceIcon = card.querySelector('.service-icon');
        const pricing = card.querySelector('.pricing');
        
        // Card hover effects
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(serviceIcon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(pricing, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(serviceIcon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(pricing, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Button click effects
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Ripple effect
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    width: 20px;
                    height: 20px;
                    left: ${e.clientX - rect.left - 10}px;
                    top: ${e.clientY - rect.top - 10}px;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                gsap.to(ripple, {
                    scale: 10,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => {
                        ripple.remove();
                    }
                });
                
                // Button action based on service type
                const serviceName = card.querySelector('h3').textContent;
                handleServiceAction(serviceName);
            });
        }
    });
}

// Package Cards Interactive Features
function initializePackageCards() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        const button = card.querySelector('button');
        
        // Enhanced hover effects for packages
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('scale-105')) {
                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('scale-105')) {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        // Package selection
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const packageName = card.querySelector('h3').textContent;
                const packagePrice = card.querySelector('.price-tag span').textContent;
                
                // Show selection feedback
                showNotification(`${packageName} package selected! Price: ${packagePrice}/month`);
                
                // Analytics tracking
                trackEvent('package_selected', {
                    package_name: packageName,
                    package_price: packagePrice
                });
                
                // Simulate package selection process
                simulatePackageSelection(packageName);
            });
        }
    });
}

// CTA Buttons Functionality
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            
            // Handle different CTA actions
            if (buttonText.includes('Get Quote') || buttonText.includes('Free Quote')) {
                openQuoteModal();
            } else if (buttonText.includes('Schedule') || buttonText.includes('Consultation')) {
                openScheduleModal();
            } else if (buttonText.includes('Call Now') || buttonText.includes('phone')) {
                initiateCall();
            }
            
            // Button press animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// Service Action Handler
function handleServiceAction(serviceName) {
    const serviceActions = {
        'Windows Installation': () => {
            showServiceModal('Windows Installation', {
                description: 'Professional Windows OS installation and configuration',
                price: '$99',
                duration: '2-4 hours',
                includes: ['Complete OS Installation', 'Driver Updates', 'Security Setup']
            });
        },
        'Cybersecurity': () => {
            showServiceModal('Cybersecurity', {
                description: 'Comprehensive security solutions for your business',
                price: '$299/month',
                duration: 'Ongoing',
                includes: ['24/7 Monitoring', 'Threat Detection', 'Incident Response']
            });
        },
        'Cloud Solutions': () => {
            showServiceModal('Cloud Solutions', {
                description: 'Scalable cloud infrastructure and migration services',
                price: '$499 setup',
                duration: '1-2 weeks',
                includes: ['Migration Strategy', 'Infrastructure Setup', 'Training']
            });
        },
        'Network Setup': () => {
            showServiceModal('Network Setup', {
                description: 'Professional network configuration with CISCO equipment',
                price: '$399',
                duration: '1-2 days',
                includes: ['Network Design', 'Equipment Setup', 'Security Configuration']
            });
        },
        'IT Support': () => {
            showServiceModal('IT Support', {
                description: '24/7 technical support and maintenance services',
                price: '$199/month',
                duration: 'Ongoing',
                includes: ['Help Desk', 'Remote Support', 'System Maintenance']
            });
        },
        'Hardware Repair': () => {
            showServiceModal('Hardware Repair', {
                description: 'Expert hardware diagnostics and repair services',
                price: '$79/hour',
                duration: 'Varies',
                includes: ['Free Diagnostics', 'Component Replacement', 'Warranty']
            });
        }
    };
    
    const action = serviceActions[serviceName];
    if (action) {
        action();
    }
}

// Modal Functions
function showServiceModal(serviceName, details) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative';
    modalContent.innerHTML = `
        <button class="close-modal absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <span class="material-icons">close</span>
        </button>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">${serviceName}</h3>
        <p class="text-gray-600 mb-4">${details.description}</p>
        <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">Price:</span>
                <span class="text-blue-600 font-bold">${details.price}</span>
            </div>
            <div class="flex justify-between items-center mb-4">
                <span class="font-semibold">Duration:</span>
                <span>${details.duration}</span>
            </div>
        </div>
        <div class="mb-6">
            <h4 class="font-semibold mb-2">What's Included:</h4>
            <ul class="space-y-1">
                ${details.includes.map(item => `
                    <li class="flex items-center text-sm">
                        <span class="material-icons text-green-600 mr-2 text-sm">check_circle</span>
                        ${item}
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="flex space-x-4">
            <button class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Book Now
            </button>
            <button class="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Get Quote
            </button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners
    const closeBtn = modalOverlay.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });
    
    // Animate modal appearance
    gsap.fromTo(modalContent, {
        scale: 0.8,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
}

function openQuoteModal() {
    showNotification('Quote request form will open here. Contact us for a personalized quote!');
    // In a real implementation, this would open a quote request form
}

function openScheduleModal() {
    showNotification('Scheduling system will open here. Call us to schedule your consultation!');
    // In a real implementation, this would open a calendar booking system
}

function initiateCall() {
    window.location.href = 'tel:+15551234567';
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="material-icons mr-2">
                ${type === 'success' ? 'check_circle' : 
                  type === 'error' ? 'error' : 
                  'info'}
            </span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.fromTo(notification, {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        gsap.to(notification, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }
        });
    }, 5000);
}

// Package Selection Simulation
function simulatePackageSelection(packageName) {
    // Show loading state
    const loader = document.createElement('div');
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Processing ${packageName} package selection...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Simulate processing time
    setTimeout(() => {
        document.body.removeChild(loader);
        showNotification(`${packageName} package selected successfully! Our team will contact you shortly.`, 'success');
    }, 2000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.fromTo(section, {
            y: 30,
            opacity: 0.8
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Progress indicator (optional)
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        } else {
            // Fallback for older browsers
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            imageObserver.observe(img);
        }
    });
}

// Analytics Tracking
function trackUserInteractions() {
    // Track service card clicks
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3').textContent;
            trackEvent('service_card_clicked', { service_name: serviceName });
        });
    });
    
    // Track CTA button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonText = btn.textContent.trim();
            trackEvent('cta_button_clicked', { button_text: buttonText });
        });
    });
}

function trackEvent(eventName, parameters = {}) {
    // In a real implementation, this would send data to your analytics service
    console.log('Event tracked:', eventName, parameters);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, parameters);
    
    // Example: Custom analytics
    // analytics.track(eventName, parameters);
}

// Utility Functions
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

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Resize handler
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Export for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeAnimations,
        initializeServiceCards,
        showNotification,
        trackEvent
    };
}