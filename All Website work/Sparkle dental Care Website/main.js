// Sparkle Dental Care - Refined Interactions

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // 1. Reveal Animations (fade-in + slide-in variants)
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-slide-left, .reveal-slide-right, .reveal-slide-up').forEach((el) => {
        revealObserver.observe(el);
    });

    // 2. Header Shrink on Scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // 3. Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('toggle-active');
        });
    }

    // 4. Smooth Anchor Scrolling with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({ top, behavior: 'smooth' });

                // Close mobile menu
                navLinks.classList.remove('active');
                menuToggle.classList.remove('toggle-active');
            }
        });
    });

    // 5. Active Nav Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;
        sections.forEach((section) => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            navAnchors.forEach((a) => {
                if (a.getAttribute('href') === `#${id}`) {
                    if (scrollY >= top && scrollY < bottom) {
                        a.style.color = 'var(--primary)';
                    } else {
                        a.style.color = '';
                    }
                }
            });
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
});
