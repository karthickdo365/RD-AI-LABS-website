// ---------------------------------------------------------------------------
//  All site content lives here. Edit this file to customise the website.
// ---------------------------------------------------------------------------
import {
  FiCode,
  FiGlobe,
  FiSmartphone,
  FiPenTool,
  FiLifeBuoy,
  FiTrendingUp,
  FiCpu,
  FiAward,
  FiShield,
  FiZap,
  FiHeart,
  FiBookOpen,
  FiClock,
  FiTarget,
  FiUsers,
  FiShoppingCart,
  FiActivity,
  FiMessageSquare,
} from 'react-icons/fi'

/* ----- 1. Company details: REPLACE the placeholders ---------------------- */
export const COMPANY = {
  name: 'RD AI Labs',
  tagline: 'Tap the Untapped',
  email: 'hello@yourdomain.com', // <- your email
  phone: '+91 00000 00000', // <- your phone (shown on the page)
  whatsapp: '910000000000', // <- digits only, with country code (used for wa.me link)
  address: 'Your Office Address, City, State, Country', // <- also used for the Google Map
  social: {
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    x: 'https://x.com/',
    github: 'https://github.com/',
  },
  hours: [
    { days: 'Monday – Friday', time: '9:30 AM – 6:30 PM' },
    { days: 'Saturday', time: '10:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
}

/* ----- 2. Navigation ------------------------------------------------------ */
export const NAV_LINKS = [
  { id: 'home', label: 'Home', short: 'Home' },
  { id: 'services', label: 'Services', short: 'Services' },
  { id: 'about', label: 'About Us', short: 'About Us' },
  { id: 'portfolio', label: 'Portfolio / Case Studies', short: 'Portfolio' },
  { id: 'careers', label: 'Careers', short: 'Careers' },
  { id: 'blog', label: 'Blog', short: 'Blog' },
  { id: 'contact', label: 'Contact', short: 'Contact' },
]

/* ----- 3. Services -------------------------------------------------------- */
export const SERVICES = [
  {
    icon: FiCode,
    title: 'Custom Software Development',
    desc: 'Scalable, secure software tailored to your workflows, from internal tools to full enterprise platforms.',
  },
  {
    icon: FiGlobe,
    title: 'Website Development',
    desc: 'Fast, SEO-ready websites and online stores built with WordPress, React and modern e-commerce stacks.',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile App Development',
    desc: 'Smooth, native-feel Android and iOS apps that your customers will actually enjoy using.',
  },
  {
    icon: FiPenTool,
    title: 'UI/UX Design',
    desc: 'Research-driven interfaces that look sharp, feel intuitive and turn visitors into customers.',
  },
  {
    icon: FiLifeBuoy,
    title: 'IT Consulting and Support',
    desc: 'Practical technology guidance and reliable support so your systems stay secure and productive.',
  },
  {
    icon: FiTrendingUp,
    title: 'Digital Marketing and SEO',
    desc: 'Data-led SEO and digital campaigns that increase visibility, leads and measurable growth.',
  },
  {
    icon: FiCpu,
    title: 'AI and Automation Solutions',
    desc: 'Chatbots, intelligent assistants, predictive analytics and process automation that save time and cut costs, putting AI to work on real business problems.',
    featured: true,
  },
]

/* ----- 4. About ----------------------------------------------------------- */
export const ABOUT = {
  story: [
    'RD AI Labs was founded on a simple belief: there is huge untapped potential inside every business, and the right technology can unlock it.',
    'We are a team of engineers, designers and AI specialists who turn ideas into dependable digital products. From the first conversation to launch and long-term support, we work as an extension of your team.',
  ],
  mission:
    'To turn ideas into dependable, intelligent digital products that help businesses grow.',
  vision:
    'To be a trusted technology partner known for making AI practical and accessible for every business.',
}

export const VALUES = [
  { icon: FiAward, title: 'Quality', desc: 'Clean code, careful testing and attention to every detail.' },
  { icon: FiShield, title: 'Honesty', desc: 'Transparent pricing, clear timelines and straight answers.' },
  { icon: FiZap, title: 'Innovation', desc: 'We explore new tools and ideas to give you an edge.' },
  { icon: FiHeart, title: 'Customer Focus', desc: 'Your goals drive every decision we make.' },
]

// Sample numbers, replace with your real ones.
export const STATS = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years of Experience' },
]

// Add a `photo: '/team/name.jpg'` (file in /public/team) to show a real photo.
export const TEAM = [
  { name: 'Your Name', role: 'Founder & CEO', photo: '' },
  { name: 'Team Member', role: 'Lead Engineer', photo: '' },
  { name: 'Team Member', role: 'Head of Design', photo: '' },
  { name: 'Team Member', role: 'AI Engineer', photo: '' },
]

/* ----- 5. Portfolio (sample work) ---------------------------------------- */
export const PROJECTS = [
  {
    title: 'SmartRetail ERP',
    industry: 'Retail & E-commerce',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    result: 'Cut inventory processing time by 40%',
    icon: FiShoppingCart,
    from: '#1d4ed8',
    to: '#22d3ee',
  },
  {
    title: 'MediTrack Mobile App',
    industry: 'Healthcare',
    tech: ['Flutter', 'Firebase', 'REST APIs'],
    result: '25,000+ appointments booked in 3 months',
    icon: FiActivity,
    from: '#7c3aed',
    to: '#2f6bff',
  },
  {
    title: 'AI Support Copilot',
    industry: 'SaaS / Customer Service',
    tech: ['Python', 'LLMs', 'FastAPI', 'React'],
    result: 'Resolved 60% of support tickets automatically',
    icon: FiMessageSquare,
    from: '#0891b2',
    to: '#8b5cf6',
  },
]

/* ----- 6. Careers --------------------------------------------------------- */
export const PERKS = [
  { icon: FiBookOpen, title: 'Learn & Grow', desc: 'Learning budget, mentoring and room to try new technology.' },
  { icon: FiClock, title: 'Flexible Work', desc: 'Hybrid-friendly schedules built on trust and results.' },
  { icon: FiTarget, title: 'Real Impact', desc: 'Ship products that real businesses and users depend on.' },
  { icon: FiUsers, title: 'Great Team', desc: 'A friendly, collaborative culture with no ego.' },
]

export const JOBS = [
  { title: 'Frontend Developer (React)', type: 'Full-time', place: 'On-site / Hybrid', exp: '1–3 yrs' },
  { title: 'Backend Developer (Node.js / Python)', type: 'Full-time', place: 'On-site / Hybrid', exp: '2–4 yrs' },
  { title: 'AI / ML Engineer', type: 'Full-time', place: 'On-site / Hybrid', exp: '2+ yrs' },
  { title: 'UI/UX Designer', type: 'Full-time', place: 'On-site / Hybrid', exp: '1–3 yrs' },
]

/* ----- 7. Blog / News (sample posts) ------------------------------------- */
export const POSTS = [
  {
    title: 'How AI Automation Is Saving Small Businesses 20+ Hours a Week',
    date: 'Oct 18, 2026',
    excerpt: 'From invoice processing to customer replies, here are the quick wins that pay off in weeks, not years.',
    icon: FiCpu,
    from: '#2f6bff',
    to: '#8b5cf6',
  },
  {
    title: 'React vs WordPress: Which Is Right for Your Company Website?',
    date: 'Oct 6, 2026',
    excerpt: 'A plain-English comparison of speed, cost, SEO and flexibility to help you choose confidently.',
    icon: FiGlobe,
    from: '#0891b2',
    to: '#2f6bff',
  },
  {
    title: '7 UI/UX Mistakes That Quietly Kill Your Conversions',
    date: 'Sep 22, 2026',
    excerpt: 'Small design choices can cost you leads. Learn what to look for and how to fix it fast.',
    icon: FiPenTool,
    from: '#8b5cf6',
    to: '#22d3ee',
  },
]
