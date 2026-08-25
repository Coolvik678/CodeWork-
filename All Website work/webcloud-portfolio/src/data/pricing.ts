export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '₹4,499',
    period: '/ project',
    description: 'Perfect for new clinics, solo doctors, or small businesses establishing a fast, high-trust web presence.',
    features: [
      'High-Conversion Single Page Website',
      'Mobile-First Responsive Design',
      'Instant WhatsApp Booking CTA Button',
      'Google Maps Location & Contact Integration',
      'Basic On-Page SEO Setup',
      'Fast Cloud Hosting Deployment',
      '1 Week Post-Launch Support'
    ],
    ctaText: 'Get Basic Plan',
    whatsappMessage: 'Hi Webcloud! I want to inquire about the Basic Plan (₹4,499) for my website.'
  },
  {
    id: 'advanced',
    name: 'Advanced Plan',
    price: '₹7,999',
    period: '/ project',
    badge: 'Most Popular',
    popular: true,
    description: 'Ideal for established dental practices and growing businesses looking for an interactive multi-section platform.',
    features: [
      'Multi-Section Custom Website Architecture',
      'Apple-Style 3D Frame Scrubbing Animations',
      'Interactive Treatment / Procedure Matrix',
      'Direct WhatsApp Automated Funnel & Emergency CTA',
      'Verified Google 5-Star Reviews Showcase',
      'Speed Optimization & Foundation SEO Package',
      'Custom Graphic Assets & Social Media Banners',
      '2 Weeks Priority Support & Revisions'
    ],
    ctaText: 'Get Advanced Plan',
    whatsappMessage: 'Hi Webcloud! I want to get started with the Advanced Plan (₹7,999) for my clinic/business website.'
  },
  {
    id: 'final',
    name: 'Final Plan',
    price: '₹9,999',
    period: '/ project',
    badge: 'Best Value',
    description: 'Built for ambitious clinics and practices requiring a premier digital authority ecosystem.',
    features: [
      'Complete Premium Multi-Page Clinic / Business Platform',
      'Dual-Language Ready (English & Regional/Marathi)',
      'Custom Brand Identity Tokens & Logo Guidance',
      'Advanced Patient Appointment Scheduler',
      'Full Local SEO & Google Maps Optimization',
      'Before & After Smile Transformation Gallery',
      'Speed-Blazing Sub-Second Performance Tuning',
      '1 Month Priority VIP Support & Free Minor Updates'
    ],
    ctaText: 'Get Final Plan',
    whatsappMessage: 'Hi Webcloud! I am interested in the Final Plan (₹9,999) to build a premier website for my practice.'
  }
];

export const CUSTOM_ENTERPRISE_INFO = {
  title: 'Want the Absolute Best Website Ever?',
  description: 'Looking for an ultra-bespoke 3D web platform with custom backend workflows, 3D interactive models, or full brand redesign? Consult us directly to discuss custom requirements and tailored investments.',
  ctaText: 'Consult Us for Custom Website',
  whatsappMessage: 'Hi Webcloud! I want the absolute best custom 3D website for my clinic/business. Let\'s schedule a call to discuss custom features and pricing.'
};
