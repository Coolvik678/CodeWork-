/* ==========================================
   DR. KOTHAWALA'S DENTAL CURE & CARE CENTER
   Interactive JavaScript Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Glassmorphism Scroll Transition
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
  });

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 3. Testimonial Slider Navigation
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentSlide = 0;
  const slideCount = slides.length;

  // Create Dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  }

  // Auto-play slider every 6 seconds
  setInterval(nextSlide, 6000);

  // 4. Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('.gallery-img').getAttribute('src');
      lightboxImg.setAttribute('src', imgSrc);
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // 5. Booking Form Validation & Instant WhatsApp Redirect
  const bookingForm = document.getElementById('quick-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('patient-name').value;
      const phone = document.getElementById('patient-phone').value;
      const service = document.getElementById('patient-service').value;

      if (!name || !phone) {
        alert('Please fill in your Name and Phone Number.');
        return;
      }

      // Format WhatsApp Message
      const clinicPhone = "919876543210"; // Placeholder clinic number
      const message = encodeURIComponent(
        `Hello Dr. Kothawala's Dental Care Center,\n\nI would like to book an appointment.\n*Name:* ${name}\n*Phone:* ${phone}\n*Preferred Specialty:* ${service}`
      );
      
      const whatsappUrl = `https://wa.me/${clinicPhone}?text=${message}`;
      
      // Simulate confirmation and open WhatsApp
      alert(`Thank you ${name}! Redirecting to confirm your appointment for ${service} via WhatsApp...`);
      window.open(whatsappUrl, '_blank');
      bookingForm.reset();
    });
  }

  // 6. Magnetic CTA Physics Effect
  const magneticBtns = document.querySelectorAll('.btn-primary');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2 - 3}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px) scale(1)`;
    });
  });
});
