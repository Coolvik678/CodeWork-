// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// CUSTOM CURSOR LOGIC
const cursorDot = document.querySelector('.cursor-dot');
const cursorTrail = document.querySelector('.cursor-trail');
const interactables = document.querySelectorAll('a, button, input, select, label, .ba-divider, .accordion-header, .magnetic-btn');

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// Smooth trail animation
function animateCursor() {
    let distX = mouseX - trailX;
    let distY = mouseY - trailY;
    
    trailX += distX * 0.15;
    trailY += distY * 0.15;
    
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorTrail.style.width = '60px';
        cursorTrail.style.height = '60px';
        cursorTrail.style.backgroundColor = 'rgba(210, 143, 149, 0.2)'; // Primary gold with opacity
    });
    
    el.addEventListener('mouseleave', () => {
        cursorTrail.style.width = '40px';
        cursorTrail.style.height = '40px';
        cursorTrail.style.backgroundColor = 'rgba(66, 45, 51, 0.08)'; // Deep anchor with opacity
    });
});

// MAGNETIC BUTTONS
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// HEADER SCROLL EFFECT
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// MOBILE MENU TOGGLE
const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.toggle('active');
    
    // Animate hamburger to X
    const hamburger = document.querySelector('.hamburger');
    if (mobileMenuOverlay.classList.contains('active')) {
        hamburger.style.backgroundColor = 'transparent';
        hamburger.style.setProperty('--after-transform', 'translateY(0) rotate(-45deg)');
        hamburger.style.setProperty('--before-transform', 'translateY(0) rotate(45deg)');
    } else {
        hamburger.style.backgroundColor = 'var(--primary-gold)';
        hamburger.style.setProperty('--after-transform', 'translateY(8px)');
        hamburger.style.setProperty('--before-transform', 'translateY(-8px)');
    }
});

// INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

// Observe all reveal elements
const elementsToReveal = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-delay, .img-reveal-wrapper, .service-grid');
elementsToReveal.forEach(el => {
    revealObserver.observe(el);
});

// SERVICE TABS
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked button and corresponding content
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// LOOKBOOK TABS
const lbTabs = document.querySelectorAll('.lb-tab');
const lbContents = document.querySelectorAll('.lb-content');

lbTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        lbTabs.forEach(t => t.classList.remove('active'));
        lbContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// BEFORE & AFTER SLIDER
const baSlider = document.querySelector('.ba-slider');
if (baSlider) {
    const baBefore = document.querySelector('.ba-before');
    const baDivider = document.querySelector('.ba-divider');
    let isDown = false;
    
    baSlider.addEventListener('mousedown', () => isDown = true);
    window.addEventListener('mouseup', () => isDown = false);
    
    baSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const rect = baSlider.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        
        // Boundaries
        if (percentage < 5) percentage = 5;
        if (percentage > 95) percentage = 95;
        
        baBefore.style.width = `${percentage}%`;
        baDivider.style.left = `${percentage}%`;
    });

    // Touch support
    baSlider.addEventListener('touchstart', () => isDown = true);
    window.addEventListener('touchend', () => isDown = false);
    baSlider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const rect = baSlider.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        
        if (percentage < 5) percentage = 5;
        if (percentage > 95) percentage = 95;
        
        baBefore.style.width = `${percentage}%`;
        baDivider.style.left = `${percentage}%`;
    });
}

// TESTIMONIAL CAROUSEL
const testSlides = document.querySelectorAll('.test-slide');
const navDots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        testSlides.forEach(slide => slide.classList.remove('active'));
        navDots.forEach(d => d.classList.remove('active'));
        
        testSlides[index].classList.add('active');
        dot.classList.add('active');
        currentSlide = index;
    });
});

// Auto rotate testimonials
setInterval(() => {
    if(!document.hidden && testSlides.length > 0) {
        currentSlide = (currentSlide + 1) % testSlides.length;
        navDots[currentSlide].click();
    }
}, 5000);

// FAQ ACCORDION
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        // Toggle current
        const isActive = header.classList.contains('active');
        const content = header.nextElementSibling;
        
        // Close all others
        accordionHeaders.forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.style.maxHeight = null;
        });
        
        if (!isActive) {
            header.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// BOOKING FORM LOGIC
const pillTags = document.querySelectorAll('.pill-tag');
pillTags.forEach(pill => {
    pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
    });
});

// Get Quote Button (scrolls to booking form with selections)
const quoteBtn = document.getElementById('quote-btn');
if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
        const selectedPackages = Array.from(document.querySelectorAll('.builder-card input:checked')).map(cb => cb.value);
        if (selectedPackages.length > 0) {
            alert(`We will structure your quote based on:\n- ${selectedPackages.join('\n- ')}\n\nPlease proceed to fill your details in the contact form.`);
        }
        
        // Lenis scroll to booking
        lenis.scrollTo('#booking');
    });
}

// Form Submission to WhatsApp
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const service = document.getElementById('book-service').value;
        const date = document.getElementById('book-date').value;
        const name = document.getElementById('book-name').value;
        const phone = document.getElementById('book-phone').value;
        
        if (!name || !phone || !service) {
            alert("Please fill in your Name, Phone Number, and select a Service.");
            return;
        }

        let message = `*NEW BOOKING REQUEST - NEHA AHUJA STUDIO*\n\n`;
        message += `*Name:* ${name}\n`;
        message += `*Phone:* ${phone}\n`;
        message += `*Service Category:* ${service}\n`;
        if (date) message += `*Preferred Date:* ${date}\n`;
        
        message += `\n_Please reply to confirm availability and finalize pricing._`;

        // Redirect to WhatsApp
        const waUrl = `https://api.whatsapp.com/send?phone=917339952918&text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });
}
