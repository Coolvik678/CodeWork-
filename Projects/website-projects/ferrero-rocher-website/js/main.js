/**
 * Ferrero Rocher – Ultra Luxury Edition
 * Vanilla JavaScript · Performance-First
 */

(function () {
    'use strict';

    /* ── Helpers ──────────────────────────────────── */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
    const raf = requestAnimationFrame;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    /* ── Preloader ────────────────────────────────── */
    function initPreloader() {
        const el = $('#preloader');
        if (!el) return;
        window.addEventListener('load', () => {
            setTimeout(() => el.classList.add('done'), 600);
        });
    }

    /* ── Custom Cursor ────────────────────────────── */
    function initCursor() {
        const cursor = $('#cursor');
        const follower = $('#cursorFollower');
        if (!cursor || !follower) return;

        let mx = -200, my = -200, fx = -200, fy = -200;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';
        });

        function loop() {
            fx = lerp(fx, mx, 0.12);
            fy = lerp(fy, my, 0.12);
            follower.style.left = fx + 'px';
            follower.style.top = fy + 'px';
            raf(loop);
        }
        loop();

        // Hover state on interactive elements
        const hoverEls = $$('a, button, .product-card, .social-link, .nav-link');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0'; follower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1'; follower.style.opacity = '1';
        });
    }

    /* ── Hero Parallax & Particles ───────────────── */
    function initHero() {
        const bg = $('#heroBg');
        const particlesContainer = $('#heroParticles');

        // Particles
        if (particlesContainer) {
            for (let i = 0; i < 28; i++) {
                const p = document.createElement('div');
                p.classList.add('particle');
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const dur = (5 + Math.random() * 8).toFixed(1);
                const del = (Math.random() * 6).toFixed(1);
                const drift = (Math.random() * 70 - 35).toFixed(0);
                const size = (2 + Math.random() * 3).toFixed(1);
                p.style.cssText = `
          left:${x}%; bottom:${y}%; 
          width:${size}px; height:${size}px;
          --dur:${dur}s; --delay:${del}s; --drift:${drift}px;
        `;
                particlesContainer.appendChild(p);
            }
        }

        // Parallax scroll
        if (!bg) return;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                raf(() => {
                    const y = window.scrollY;
                    bg.style.transform = `translateY(${y * 0.38}px) scale(1.06)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ── Header on Scroll ─────────────────────────── */
    function initHeader() {
        const header = $('#header');
        const backTop = $('#backToTop');
        const scrollIndicator = $('#scrollIndicator');
        if (!header) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                raf(() => {
                    const y = window.scrollY;
                    header.classList.toggle('scrolled', y > 60);
                    if (backTop) backTop.classList.toggle('visible', y > 400);
                    if (scrollIndicator) scrollIndicator.style.opacity = clamp(1 - y / 300, 0, 1);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ── Mobile Nav ──────────────────────────────── */
    function initMobileNav() {
        const hamburger = $('#hamburger');
        const navMenu = $('#navMenu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        $$('.nav-link', navMenu).forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ── Active Nav on Scroll ─────────────────────── */
    function initActiveNav() {
        const sections = $$('section[id]');
        const links = $$('.nav-link');
        if (!sections.length) return;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(l => l.classList.remove('active'));
                    const link = $(`.nav-link[href="#${entry.target.id}"]`);
                    if (link) link.classList.add('active');
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(s => obs.observe(s));
    }

    /* ── Scroll Reveal ────────────────────────────── */
    function initReveal() {
        const items = $$('.reveal-up, .reveal-left, .reveal-right');
        if (!items.length) return;

        // Apply data-delay as transition-delay
        items.forEach(el => {
            const delay = el.dataset.delay;
            if (delay) el.style.transitionDelay = delay + 'ms';
        });

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

        items.forEach(el => obs.observe(el));
    }

    /* ── Counter Animations ───────────────────────── */
    function initCounters() {
        const nums = $$('.stat-number[data-count]');
        if (!nums.length) return;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const end = +el.dataset.count;
                const duration = 1800;
                const start = performance.now();

                function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

                function tick(now) {
                    const elapsed = now - start;
                    const progress = clamp(elapsed / duration, 0, 1);
                    el.textContent = Math.round(easeOut(progress) * end);
                    if (progress < 1) raf(tick);
                }
                raf(tick);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });

        nums.forEach(el => obs.observe(el));
    }

    /* ── Smooth Scroll ──────────────────────────────── */
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const target = $(link.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
                const top = target.getBoundingClientRect().top + window.scrollY - headerH + 4;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    /* ── Back to Top ─────────────────────────────── */
    function initBackToTop() {
        const btn = $('#backToTop');
        if (!btn) return;
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ── Form Validation ─────────────────────────── */
    function initForm() {
        const form = $('#contactForm');
        const success = $('#formSuccess');
        if (!form) return;

        const fields = {
            name: { el: $('#name'), err: $('#nameError'), label: 'Full Name' },
            email: { el: $('#email'), err: $('#emailError'), label: 'Email' },
            message: { el: $('#message'), err: $('#messageError'), label: 'Message' },
        };

        function setError(field, msg) {
            field.el.closest('.form-group').classList.add('error');
            field.err.textContent = msg;
        }
        function clearError(field) {
            field.el.closest('.form-group').classList.remove('error');
            field.err.textContent = '';
        }
        function validate() {
            let ok = true;
            const { name, email, message } = fields;

            clearError(name); clearError(email); clearError(message);

            if (!name.el.value.trim()) {
                setError(name, 'Please enter your full name.'); ok = false;
            }
            const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.el.value.trim()) {
                setError(email, 'Please enter your email address.'); ok = false;
            } else if (!emailRx.test(email.el.value.trim())) {
                setError(email, 'Please enter a valid email address.'); ok = false;
            }
            if (!message.el.value.trim()) {
                setError(message, 'Please enter a message.'); ok = false;
            }
            return ok;
        }

        // Live clearing
        Object.values(fields).forEach(f => {
            f.el.addEventListener('input', () => clearError(f));
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!validate()) return;

            const btn = $('#submitBtn');
            btn.disabled = true;
            btn.querySelector('.btn-text').textContent = 'Sending…';

            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                btn.querySelector('.btn-text').textContent = 'Send Message';
                if (success) success.classList.add('show');
                setTimeout(() => success && success.classList.remove('show'), 5000);
            }, 1200);
        });
    }

    /* ── Newsletter ──────────────────────────────── */
    function initNewsletter() {
        const form = $('#newsletterForm');
        if (!form) return;
        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = form.querySelector('input');
            if (!input.value.trim()) return;
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            input.value = '';
            setTimeout(() => { btn.innerHTML = '<i class="fas fa-arrow-right"></i>'; }, 3000);
        });
    }

    /* ── Product Card Tilt ───────────────────────── */
    function initTilt() {
        $$('.product-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `
          perspective(800px)
          rotateY(${x * 8}deg)
          rotateX(${-y * 6}deg)
          translateY(-12px)
        `;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.6s cubic-bezier(0.25,1,0.5,1)';
                setTimeout(() => card.style.transition = '', 600);
            });
        });
    }

    /* ── Marquee Pause on Hover ──────────────────── */
    function initMarquee() {
        const track = $('.marquee-track');
        if (!track) return;
        track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
        track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
    }

    /* ── Init All ────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        initPreloader();
        initCursor();
        initHero();
        initHeader();
        initMobileNav();
        initActiveNav();
        initReveal();
        initCounters();
        initSmoothScroll();
        initBackToTop();
        initForm();
        initNewsletter();
        initTilt();
        initMarquee();
    });

})();
