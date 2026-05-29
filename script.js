// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Inject Custom Cursor & Flash Effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cursor-camera">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
        </svg>
        <div class="cursor-dot"></div>
        <div class="cursor-viewfinder"></div>
    `;
    document.body.appendChild(cursor);

    const flash = document.createElement('div');
    flash.className = 'flash-effect';
    document.body.appendChild(flash);

    // Track mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Perspective Parallax (Flashy effect)
        const moveX = (window.innerWidth / 2 - mouseX) / 50;
        const moveY = (window.innerHeight / 2 - mouseY) / 50;
        document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Smooth cursor movement
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Camera Flash Effect on Click
    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, a, .skill-card, .website-card, .preview-btn')) {
            flash.classList.remove('flash-active');
            void flash.offsetWidth; // Trigger reflow
            flash.classList.add('flash-active');
        }
        cursor.style.transform = `translate(-50%, -50%) scale(0.8)`;
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = `translate(-50%, -50%) scale(1)`;
    });

    // Hover Scaling for Cursor
    const interactiveElements = document.querySelectorAll('button, a, .skill-card, .website-card, .preview-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.transition = 'width 0.3s, height 0.3s';
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

// --- AI Chat Assistant Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.querySelector('.ai-chat-btn');
    const chatWindow = document.getElementById('aiChatWindow');
    const closeBtn = document.getElementById('aiCloseBtn');
    const chatInput = document.getElementById('aiChatInput');
    const chatSendBtn = document.getElementById('aiChatSend');
    const chatBody = document.getElementById('aiChatBody');

    if (!chatBtn || !chatWindow) return;

    // Toggle Chat Window
    chatBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Handle Sending Messages
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage(text, 'user');
        chatInput.value = '';

        // Show Typing Indicator
        const typingId = showTypingIndicator();

        // Simulate AI Processing (Powered by Gemini Concept)
        setTimeout(() => {
            document.getElementById(typingId).remove();
            const response = generateAIResponse(text);
            appendMessage(response, 'bot');
        }, 1500 + Math.random() * 1000);
    }

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content';
        contentDiv.innerHTML = text; // allow HTML for links
        
        msgDiv.appendChild(contentDiv);
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-message bot';
        msgDiv.id = id;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content typing-indicator';
        contentDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        
        msgDiv.appendChild(contentDiv);
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return id;
    }

    // Simulated Gemini AI Persona (Trained on @d.shlokk Instagram)
    function generateAIResponse(input) {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
            return "Yo! I'm Divya's digital twin. ⚡️ I'm here to help you navigate through the work, the vibes, and everything in between. What's up?";
        }
        
        if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('hire') || lowerInput.includes('price') || lowerInput.includes('rate')) {
            return "Straight to the point, I love it! 🚀 For projects and collaborations, Divya usually hops on a quick call to see if the vibe matches. You should definitely reach out on Instagram or WhatsApp. <br><br>IG: <a href='https://www.instagram.com/d.shlokk/' target='_blank' class='ai-chat-link'>@d.shlokk</a><br>WA: <a href='https://wa.me/918660438751' target='_blank' class='ai-chat-link'>Send a message</a>";
        }

        if (lowerInput.includes('instagram') || lowerInput.includes('ig') || lowerInput.includes('social')) {
            return "Instagram is where the magic happens. 📸 He posts a lot of behind-the-scenes, his latest edits, and sometimes just random creative experiments. Go follow him: <a href='https://www.instagram.com/d.shlokk/' target='_blank' class='ai-chat-link'>@d.shlokk</a>.";
        }
        
        if (lowerInput.includes('skills') || lowerInput.includes('do') || lowerInput.includes('tech') || lowerInput.includes('expert')) {
            return "He's basically a three-headed dragon: <br>1️⃣ **Web Dev:** He calls it 'VibeCoding'—building sites that don't just work, but feel right. <br>2️⃣ **Creative Direction:** Leading shows and visual storytelling. <br>3️⃣ **Video Editing:** High-energy, cinematic stuff. <br><br>Which one are you interested in?";
        }

        if (lowerInput.includes('who') || lowerInput.includes('divya')) {
            return "Divya is a multi-disciplinary creative based in India. He's all about that techy creative vibe—blending code with art. He's been directing shows, building web experiences, and editing content that stops the scroll.";
        }

        if (lowerInput.includes('vibe') || lowerInput.includes('vibecoding')) {
            return "VibeCoding is all about the feel. 🌊 It's not just about clean code; it's about the animations, the gradients, and the overall 'techy' energy that makes a site feel alive. Like this one!";
        }

        return "That's a cool question! I'm still absorbing Divya's creative DNA from his feed, but for a real-deal answer, you should just DM him: <a href='https://www.instagram.com/d.shlokk/' target='_blank' class='ai-chat-link'>@d.shlokk</a>. He's usually pretty quick to respond!";
    }
});
