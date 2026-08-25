# 🦷 Implementation Plan: Dr. Chavhan's Multispeciality Dental Clinic Website

A high-conversion, luxury, interactive single-page application for Dr. Chavhan's Multispeciality Dental Clinic in Aundh, Pune.

## 🎨 Design System & Identity
- **Primary Color:** Clinical Deep Teal (`#0A7E8C` / `#0D9488`)
- **Secondary Accent:** Soft Mint Emerald (`#10B981` / `#34D399` matching modern desk accents)
- **Backgrounds:** Pristine Clinical White (`#FFFFFF`), Soft Slate Cloud (`#F8FAFC`), Soft Glass Blur
- **Typography:** Plus Jakarta Sans & Inter
- **Geometry:** Precision medical sharp/net curves (2px - 12px), avoiding generic AI soft blobs
- **No Purple Policy:** Strictly enforced.

## 🏗️ Structural Breakdown
1. `ToothLoader.tsx` - Minimalist dental loader animation.
2. `Navbar.tsx` - Glassmorphism, Dual-Language (English/मराठी), Sticky, Book CTA.
3. `Hero.tsx` - Headline, 5-Star badge, interactive clinic suite visual cards, primary/secondary CTAs.
4. `ServicesMatrix.tsx` - Multispeciality cards (General, Orthodontics, Implants, Cosmetic) with interactive modal details.
5. `ClinicExperience.tsx` - Dr. Guru profile, mint-paneled consultation desk visual, interactive accordions (Digital X-Ray, UV Sterilization, Restrooms).
6. `TestimonialsCarousel.tsx` - Verified Google 5.0 ★ reviews with filter tabs.
7. `BookingModal.tsx` - Interactive appointment scheduler with instant WhatsApp dispatch.
8. `ContactFooter.tsx` - Dynamic "OPEN NOW" status indicator, click-to-call, address, and interactive Google Maps widget.
9. `WhatsAppFAB.tsx` - Fixed mobile float CTA.

## 🚀 Execution Strategy
- Update `src/app/globals.css` with dedicated design tokens and utilities.
- Modularly create component files in `src/components/dental/`.
- Wire up `src/app/page.tsx` for seamless fluid scrolling and scroll restoration.
