// Profile image upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileImageContainer = document.querySelector('.profile-image-container');
    const profileImage = document.getElementById('profileImage');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    
    // Smooth scrolling for internal navigation (if needed)
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
    
    // Add animation effects on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effects for skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect for contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            // Copy to clipboard if it's email or phone
            if (text.includes('@') || text.includes('+')) {
                let textToCopy = text;
                if (text.includes('@')) {
                    textToCopy = text.replace(/.*?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}).*/, '$1');
                } else if (text.includes('+')) {
                    textToCopy = text.replace(/.*?(\+\d+\s?\d+\s?\d+\s?\d+).*/, '$1');
                }
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show feedback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span style="color: #2ecc71;">✓ Copied!</span>';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(() => {
                    console.log('Could not copy text');
                });
            }
        });
    });
    
    // Print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '🖨️ Print CV';
        printButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        printButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.4)';
        });
        
        printButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(52, 152, 219, 0.3)';
        });
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
    
    // Add print button
    addPrintButton();
    
    // Dynamic typing effect for the name (optional enhancement)
    function typeWriterEffect(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Add parallax effect to header background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add ripple effect to buttons and clickable items
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple CSS
    const rippleCSS = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
    
    // Apply ripple effect to interactive elements
    document.querySelectorAll('.language-item, .job-period, .contact-item').forEach(item => {
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        item.addEventListener('click', createRipple);
    });
    
    // Form validation for contact information (if forms are added later)
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Add download CV functionality
    function addDownloadButton() {
        const downloadButton = document.createElement('button');
        downloadButton.innerHTML = '📄 Download CV';
        downloadButton.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            box-shadow: 0 3px 10px rgba(231, 76, 60, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        downloadButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.4)';
        });
        
        downloadButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(231, 76, 60, 0.3)';
        });
        
        downloadButton.addEventListener('click', function() {
            // Convert CV to PDF (this would require a library like jsPDF in a real implementation)
            // For now, we'll trigger print as an alternative
            window.print();
        });
        
        document.body.appendChild(downloadButton);
    }
    
    // Add download button
    addDownloadButton();
    
    // Add theme toggle functionality (optional)
    function addThemeToggle() {
        const themeButton = document.createElement('button');
        themeButton.innerHTML = '🌙';
        themeButton.style.cssText = `
            position: fixed;
            top: 140px;
            right: 20px;
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 3px 10px rgba(155, 89, 182, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        let isDark = false;
        
        themeButton.addEventListener('click', function() {
            isDark = !isDark;
            if (isDark) {
                document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
                this.innerHTML = '☀️';
            } else {
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.innerHTML = '🌙';
            }
        });
        
        document.body.appendChild(themeButton);
    }
    
    // Add theme toggle
    addThemeToggle();
    
    // Preload images for better performance
    function preloadImages() {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.src && !img.complete) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = img.src;
                document.head.appendChild(preloadLink);
            }
        });
    }
    
    // Initialize preloading
    preloadImages();
    
    // Add loading animation
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-size: 18px;
                color: #2c3e50;
            ">
                <div style="
                    text-align: center;
                    animation: pulse 1.5s ease-in-out infinite;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border: 4px solid #3498db;
                        border-top: 4px solid transparent;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    "></div>
                    Loading CV...
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Remove loader after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.remove();
            }, 500);
        });
    }
    
    // Add loading animations CSS
    const loadingCSS = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = loadingCSS;
    document.head.appendChild(loadingStyle);
    
    // Show loading animation
    showLoadingAnimation();
    
    console.log('Seth Chenge CV loaded successfully! 🚀');
});