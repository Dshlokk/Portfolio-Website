// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Inject Custom Cursor & Flash Effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-viewfinder"></div><div class="cursor-dot"></div>';
    document.body.appendChild(cursor);

    const flash = document.createElement('div');
    flash.className = 'flash-effect';
    document.body.appendChild(flash);

    // Mouse Move - Camera Cursor & Perspective Parallax
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Cursor movement
        cursor.style.transform = `translate(${x - 20}px, ${y - 20}px)`;

        // Perspective Parallax (Flashy effect)
        const moveX = (window.innerWidth / 2 - x) / 50;
        const moveY = (window.innerHeight / 2 - y) / 50;
        
        document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Camera Flash Effect on Click
    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, a, .skill-card, .website-card')) {
            flash.classList.remove('flash-active');
            void flash.offsetWidth; // Trigger reflow
            flash.classList.add('flash-active');
        }
        cursor.style.transform += ' scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
    });

    // Hover Scaling for Cursor
    const interactiveElements = document.querySelectorAll('button, a, .skill-card, .website-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.transition = 'width 0.3s, height 0.3s, transform 0.1s';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
});

// Smooth scroll behavior
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

// Add active class to current page nav link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .website-card, .capability-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-accent');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add hover effect to buttons
document.querySelectorAll('button, .cta-button, .preview-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Lazy load iframes
const lazyIframes = document.querySelectorAll('iframe[data-src]');
const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            iframeObserver.unobserve(iframe);
        }
    });
});

lazyIframes.forEach(iframe => iframeObserver.observe(iframe));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console greeting (easter egg)
console.log('%c👋 Welcome to my portfolio!', 'color: #6366F1; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #EC4899; font-size: 14px;');
