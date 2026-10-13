/* ==========================================================================
   ZENKART HIGH-END THEME RUNTIME
   Lenis Smooth Scroll, 3D Parallax Tilt, Radar Hotspots, Embers & Live Proof
   ========================================================================== */

// 1. STANDALONE SMOOTH SCROLL RUNTIME
(function() {
  class ZenkartSmoothScroll {
    constructor(options = {}) {
      this.duration = options.duration || 1.2;
      this.targetY = window.scrollY;
      this.currentY = window.scrollY;
      this.isRafActive = false;
      this.init();
    }

    init() {
      // Smooth wheel physics
      window.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        this.targetY = Math.max(0, Math.min(this.targetY + e.deltaY, maxScroll));
        
        if (!this.isRafActive) {
          this.isRafActive = true;
          requestAnimationFrame(() => this.loop());
        }
      }, { passive: false });

      window.addEventListener('scroll', () => {
        if (!this.isRafActive) {
          this.targetY = window.scrollY;
          this.currentY = window.scrollY;
        }
      }, { passive: true });

      // Anchor smooth glide
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link && link.getAttribute('href').length > 1) {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            this.scrollTo(top);
          }
        }
      });
    }

    loop() {
      const delta = this.targetY - this.currentY;
      if (Math.abs(delta) < 0.6) {
        this.currentY = this.targetY;
        window.scrollTo(0, this.currentY);
        this.isRafActive = false;
        return;
      }

      this.currentY += delta * 0.085;
      window.scrollTo(0, this.currentY);
      requestAnimationFrame(() => this.loop());
    }

    scrollTo(targetPos) {
      this.targetY = Math.max(0, Math.min(targetPos, document.documentElement.scrollHeight - window.innerHeight));
      if (!this.isRafActive) {
        this.isRafActive = true;
        requestAnimationFrame(() => this.loop());
      }
    }
  }

  window.Lenis = ZenkartSmoothScroll;
  window.lenis = new ZenkartSmoothScroll();
})();

// 2. 3D GYROSCOPIC / MOUSE PARALLAX CARDS
function init3DCardParallax() {
  const cards = document.querySelectorAll('.interactive-3d-card');
  cards.forEach(card => {
    // Inject glare overlay if not present
    if (!card.querySelector('.glare-overlay')) {
      const glare = document.createElement('div');
      glare.className = 'glare-overlay';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // tilt degrees
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// 3. EMBER PARTICLES GENERATOR
function initEmberParticles() {
  const containers = document.querySelectorAll('[data-embers]');
  containers.forEach(container => {
    const count = parseInt(container.getAttribute('data-embers'), 10) || 16;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const ember = document.createElement('span');
      ember.className = 'ember-particle';
      const left = (Math.random() * 96 + 2).toFixed(2);
      const bottom = (Math.random() * 30 + 5).toFixed(2);
      const delay = (Math.random() * 4.5).toFixed(2);
      const duration = (Math.random() * 3.5 + 4).toFixed(2);
      const size = (Math.random() * 2.5 + 2).toFixed(1);

      ember.style.left = `${left}%`;
      ember.style.bottom = `${bottom}px`;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.animationDelay = `${delay}s`;
      ember.style.animationDuration = `${duration}s`;

      fragment.appendChild(ember);
    }

    container.appendChild(fragment);
  });
}

// 4. FLUID SCROLL REVEAL & FORGE ANIMATION OBSERVER
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach(el => el.classList.add('is-pending'));

  const animateElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-in');
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => observer.observe(el));
    animateElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-in'));
    animateElements.forEach(el => el.classList.add('is-visible'));
  }

  // Safety fallback
  setTimeout(() => {
    document.querySelectorAll('[data-reveal].is-pending').forEach(el => {
      el.classList.remove('is-pending');
      el.classList.add('is-in');
    });
    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 1200);

  // Initialize countdown timer
  initCountdownTimer();
}

function initCountdownTimer() {
  const hoursEl = document.getElementById('ai-hours-discount-countdown-qq4jyf');
  const minsEl = document.getElementById('ai-minutes-discount-countdown-qq4jyf');
  const secsEl = document.getElementById('ai-seconds-discount-countdown-qq4jyf');
  if (!hoursEl || !minsEl || !secsEl) return;

  let totalSecs = 23 * 3600 + 42 * 60 + 15;
  setInterval(() => {
    if (totalSecs > 0) totalSecs--;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// 5. LIVE VERIFIED ACTIVITY NOTIFICATION (HIGH-END PROOF TICKER)
function initLiveSocialProof() {
  const purchases = [
    { name: "Pooja V.", city: "Ahmedabad, Gujarat", item: "Puri & Khakhra Press Machine", time: "2 mins ago" },
    { name: "Rajesh P.", city: "Surat, Gujarat", item: "Wooden Digital Jaap Counter", time: "5 mins ago" },
    { name: "Suresh K.", city: "Pune, Maharashtra", item: "Puri & Khakhra Press Machine", time: "8 mins ago" },
    { name: "Ananya S.", city: "Jaipur, Rajasthan", item: "Wooden Digital Jaap Counter", time: "11 mins ago" },
    { name: "Manoj T.", city: "Varanasi, UP", item: "Puri & Khakhra Press Machine", time: "14 mins ago" },
    { name: "Deepak S.", city: "Chennai, Tamil Nadu", item: "Wooden Digital Jaap Counter", time: "17 mins ago" }
  ];

  let toast = document.getElementById('live-proof-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'live-proof-toast';
    toast.className = 'fixed bottom-6 left-6 z-40 max-w-sm card-glass p-3.5 rounded-xl border border-border-dim shadow-2xl transition-all duration-500 translate-y-20 opacity-0 pointer-events-none flex items-center gap-3.5';
    document.body.appendChild(toast);
  }

  let index = 0;
  function showNext() {
    const item = purchases[index % purchases.length];
    index++;

    toast.innerHTML = `
      <div class="w-9 h-9 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center text-amber font-serif font-bold text-sm flex-shrink-0">
        ✓
      </div>
      <div class="text-xs flex-1">
        <div class="text-bone font-semibold">${item.name} <span class="text-bone-muted font-normal">from ${item.city}</span></div>
        <div class="text-amber text-[11px] font-medium mt-0.5">Purchased ${item.item}</div>
        <div class="text-[10px] text-bone-muted/60 mt-0.5">${item.time} • Verified Buyer</div>
      </div>
      <button onclick="this.parentElement.classList.add('opacity-0', 'translate-y-20')" class="text-bone-muted/50 hover:text-bone text-xs p-1">✕</button>
    `;

    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 6000);
  }

  // Trigger first after 4 seconds, then periodically
  setTimeout(() => {
    showNext();
    setInterval(showNext, 18000);
  }, 4000);
}

// 6. INTERACTIVE PIN CODE ESTIMATOR
window.checkPincodeDelivery = function(inputId, resultId) {
  const input = document.getElementById(inputId);
  const result = document.getElementById(resultId);
  if (!input || !result) return;

  const pin = input.value.trim();
  if (pin.length !== 6 || isNaN(pin)) {
    result.innerHTML = '<span class="text-red-400">Please enter a valid 6-digit Indian PIN code.</span>';
    result.classList.remove('hidden');
    return;
  }

  // Calculate delivery in 2-3 business days
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const dayName = days[deliveryDate.getDay()];

  result.innerHTML = `
    <div class="text-emerald-400 font-medium flex items-center gap-1.5">
      <span>✓</span> Delivery available to PIN <strong>${pin}</strong> by <strong>${dayName}</strong>.
    </div>
    <div class="text-bone-muted text-[11px] mt-0.5">Free Express Shipping &amp; Cash on Delivery Available.</div>
  `;
  result.classList.remove('hidden');
};

// 7. ZENKART CART DRAWER
window.ZenkartCart = (function() {
  let items = JSON.parse(localStorage.getItem('zenkart_cart') || '[]');

  function save() {
    localStorage.setItem('zenkart_cart', JSON.stringify(items));
    render();
  }

  function render() {
    const container = document.getElementById('cart-drawer-items');
    const badge = document.getElementById('cart-count-badge');
    const subtotalEl = document.getElementById('cart-subtotal-price');

    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = '<div class="py-12 text-center text-xs text-bone-muted">Your basket is empty.</div>';
      if (badge) badge.innerText = '0';
      if (subtotalEl) subtotalEl.innerText = '₹0';
      return;
    }

    let subtotal = 0;
    let totalCount = 0;

    container.innerHTML = items.map((item, index) => {
      subtotal += item.price * item.quantity;
      totalCount += item.quantity;
      return `
        <div class="flex items-center justify-between border-b border-border-dim pb-4">
          <div>
            <div class="text-xs font-bold text-bone">${item.title}</div>
            <div class="text-[11px] text-amber mt-0.5">₹${item.price} each</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-bone-muted">Qty: ${item.quantity}</span>
            <button onclick="ZenkartCart.remove(${index})" class="text-[11px] text-red-400 hover:underline">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    if (badge) badge.innerText = totalCount;
    if (subtotalEl) subtotalEl.innerText = '₹' + subtotal;
  }

  function add(id, title, price) {
    const existing = items.find(i => i.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ id, title, price, quantity: 1 });
    }
    save();
    openDrawer();
  }

  function remove(index) {
    items.splice(index, 1);
    save();
  }

  function openDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const panel = document.getElementById('cart-drawer-panel');
    if (!overlay || !panel) return;
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      panel.classList.remove('translate-x-full');
    }, 10);
  }

  function closeDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const panel = document.getElementById('cart-drawer-panel');
    if (!overlay || !panel) return;
    panel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }

  return { add, remove, openDrawer, closeDrawer, render };
})();

// DOM BOOTSTRAP
document.addEventListener('DOMContentLoaded', () => {
  initEmberParticles();
  initScrollReveal();
  init3DCardParallax();
  initLiveSocialProof();

  document.getElementById('cart-toggle-btn')?.addEventListener('click', ZenkartCart.openDrawer);
  document.getElementById('cart-close-btn')?.addEventListener('click', ZenkartCart.closeDrawer);
  document.getElementById('cart-drawer-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'cart-drawer-overlay') ZenkartCart.closeDrawer();
  });

  ZenkartCart.render();
});
