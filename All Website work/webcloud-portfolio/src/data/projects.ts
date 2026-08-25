export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Dental Practice' | 'Beauty & Editorial' | 'Healthcare';
  year: string;
  description: string;
  fullDetails: string;
  tags: string[];
  image: string;
  stats: { label: string; value: string }[];
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'dental-angel',
    title: 'Dental Angel Care Platform',
    client: 'Dental Angel Clinic',
    category: 'Dental Practice',
    year: '2026',
    description: 'High-conversion clinical dentistry platform with instant patient booking and procedure guide.',
    fullDetails: 'Engineered a modern clinical portal for Dental Angel Clinic, optimizing patient trust through high-contrast typography, interactive procedure breakdowns, and dynamic appointment booking dispatches.',
    tags: ['Dental Clinic', 'Patient Booking', 'Responsive UX', 'Local SEO'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Patient Inquiries', value: '+140%' },
      { label: 'Mobile Bounce Rate', value: '-32%' },
      { label: 'Page Load Speed', value: '0.6s' }
    ],
    features: [
      'Interactive Procedure Matrix',
      'One-Tap WhatsApp Emergency Booking',
      'Verified Google Review Carousel',
      'Dual Language Support'
    ]
  },
  {
    id: 'sparkle-dental',
    title: 'Sparkle Cosmetic & General Dentistry',
    client: 'Sparkle Dental Care',
    category: 'Dental Practice',
    year: '2026',
    description: 'Vibrant, patient-friendly cosmetic dentistry portal focused on smile transformations and teeth whitening.',
    fullDetails: 'Created an inviting, high-energy digital identity for Sparkle Dental Care. Uses soft mint accents, before-and-after smile transformation sliders, and streamlined patient onboarding.',
    tags: ['Cosmetic Dentistry', 'Smile Gallery', 'WhatsApp CTA', 'Fast Load'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Cosmetic Inquiries', value: '+185%' },
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Google Rating', value: '5.0 ★' }
    ],
    features: [
      'Interactive Smile Slider',
      'Instant Quote Consultation',
      'Doctor Profile & Credentials',
      'Clinic Virtual Tour'
    ]
  },
  {
    id: 'dr-aadesh-jain',
    title: 'Dr. Aadesh Jain Implant & Surgery Clinic',
    client: 'Dr. Aadesh Jain Dental',
    category: 'Dental Practice',
    year: '2025',
    description: 'Specialized oral surgery and dental implant medical portal designed to instill clinical authority.',
    fullDetails: 'Designed a clinical authority platform for Dr. Aadesh Jain, highlighting advanced dental implants, 3D CT imaging capabilities, and painless surgical procedures with transparent pricing guidance.',
    tags: ['Implant Surgery', 'Clinical Authority', 'Patient FAQs', 'Structured Schema'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Implant Consults', value: '+95%' },
      { label: 'Organic Search Rank', value: '#1 Local' },
      { label: 'Trust Index', value: '99%' }
    ],
    features: [
      'Implant Procedure Visualizer',
      '3D Diagnostics Showcase',
      'Direct Surgeon WhatsApp Line',
      'Patient Recovery FAQ'
    ]
  },
  {
    id: 'dr-kothawala-dental',
    title: 'Dr. Kothawala Multispeciality Dental',
    client: 'Dr. Kothawala Clinic',
    category: 'Dental Practice',
    year: '2025',
    description: 'Established family dentistry platform emphasizing preventive care, pediatric dental, and orthodontics.',
    fullDetails: 'Built a clean, comforting family dentistry website for Dr. Kothawala Clinic. Features child-friendly appointment scheduling, emergency dental dispatch, and insurance guidance.',
    tags: ['Family Dentistry', 'Orthodontics', 'Emergency Dispatch', 'Mobile First'],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Family Appointments', value: '+110%' },
      { label: 'Repeat Visits', value: '88%' },
      { label: 'Mobile Traffic', value: '78%' }
    ],
    features: [
      'Family Booking Module',
      'Emergency Dental Fast-Track',
      'Treatment Cost Estimator',
      'Patient Testimonial Videos'
    ]
  },
  {
    id: 'lotus-dental-clinic',
    title: 'Lotus Dental Holistic Care',
    client: 'Lotus Dental Clinic',
    category: 'Dental Practice',
    year: '2025',
    description: 'Serene, holistic dentistry website designed to alleviate dental anxiety and boost appointment signups.',
    fullDetails: 'Designed a tranquil, high-trust web platform for Lotus Dental Clinic, utilizing soothing color palettes, gentle micro-animations, and painless dental technology highlights.',
    tags: ['Holistic Dental', 'Calming UX', 'Online Scheduler', 'Local SEO'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'New Patients/Mo', value: '65+' },
      { label: 'Anxiety Rating Drop', value: '-60%' },
      { label: 'WhatsApp Leads', value: '250+' }
    ],
    features: [
      'Anxiety-Free Treatment Guide',
      'One-Click Appointment Booking',
      'Interactive Hygiene Matrix',
      'Google Maps Directions Widget'
    ]
  },
  {
    id: 'neha-ahuja-studio',
    title: 'Neha Ahuja Editorial Makeup Studio',
    client: 'Neha Ahuja Artistry',
    category: 'Beauty & Editorial',
    year: '2026',
    description: 'Luxury editorial & bridal makeup studio platform crafted with high-fashion aesthetic and lookbooks.',
    fullDetails: 'Designed a high-end luxury website for celebrity & bridal makeup artist Neha Ahuja. Features rich dark elegance, interactive gallery lookbooks, booking packages, and seamless bridal consultation requests.',
    tags: ['Makeup Artistry', 'Luxury Editorial', 'Bridal Packages', 'High-Fashion UX'],
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'Bridal Bookings', value: '3.5x' },
      { label: 'Session Duration', value: '4m 12s' },
      { label: 'Brand Perception', value: 'Elite' }
    ],
    features: [
      'Interactive Portfolio Lookbook',
      'Bridal Consultation Funnel',
      'Instagram Social Stream Sync',
      'Package Calculator'
    ]
  }
];
