/**
 * Xntrova Technologies - Official Company Data & Spine Definition
 * Real company data as specified for Delhi NCR agency.
 */

export const COMPANY_INFO = {
  name: 'Xntrova Technologies',
  tagline: 'Build Visibility → Engage Audience → Drive Conversions → Measure & Improve',
  category: 'Digital Marketing and Technology Agency',
  location: 'Delhi NCR, India',
  phone: {
    display: '+91 868-382-8646',
    value: '+918683828646',
    telLink: 'tel:+918683828646',
  },
  email: {
    display: 'info@xntrova.com',
    mailto: 'mailto:info@xntrova.com',
  },
  whatsapp: {
    url: 'https://wa.me/918683828646',
    display: '+91 868-382-8646',
  },
  address: {
    street: 'A107, 2nd Floor, Sector 8, Dwarka',
    city: 'New Delhi',
    pincode: '110077',
    state: 'Delhi NCR',
    country: 'India',
    full: 'A107, 2nd Floor, Sector 8, Dwarka, New Delhi - 110077',
  },
  social: [
    { name: 'LinkedIn', url: 'https://linkedin.com/company/xntrova', handle: 'company/xntrova' },
    { name: 'Instagram', url: 'https://instagram.com/xntrova.agency', handle: '@xntrova.agency' },
    { name: 'Facebook', url: 'https://facebook.com/xntrova', handle: 'xntrova' },
    { name: 'X (Twitter)', url: 'https://x.com/xntrova', handle: '@xntrova' },
  ],
};

/**
 * "The Growth Journey" Funnel Spine Configuration
 * Four primary stages tracking user journey down the performance dashboard.
 */
export const GROWTH_JOURNEY_STAGES = [
  {
    id: 'attract',
    step: '01',
    label: 'Attract',
    sublabel: 'Build Visibility',
    sections: ['Hero', 'Services'],
    targetId: 'hero',
  },
  {
    id: 'engage',
    step: '02',
    label: 'Engage',
    sublabel: 'Engage Audience',
    sections: ['About', 'Why Us', 'Process'],
    targetId: 'about',
  },
  {
    id: 'prove',
    step: '03',
    label: 'Prove',
    sublabel: 'Demonstrate ROI',
    sections: ['Portfolio', 'Testimonials'],
    targetId: 'portfolio',
  },
  {
    id: 'convert',
    step: '04',
    label: 'Convert',
    sublabel: 'Drive Conversions',
    sections: ['CTA', 'Contact'],
    targetId: 'contact',
  },
];

/**
 * Main Navigation Items with corresponding Section Anchor Targets
 */
export const NAV_LINKS = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Process', href: '#process', sectionId: 'process' },
  { label: 'Work', href: '#work', sectionId: 'work' },
  { label: 'Reviews', href: '#reviews', sectionId: 'reviews' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

