/**
 * Seed Supabase with all existing website content
 * Usage: node scripts/seed-content.mjs
 *
 * Reads env vars from .env.local and upserts every CMS section
 * into the site_content table so the admin panel shows the real website data.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');

// Parse .env.local
const envFile = readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envFile.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  env[key] = val;
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// Use REST API directly to avoid WebSocket dependency
const restUrl = `${supabaseUrl}/rest/v1`;

async function upsertSection(section, content) {
  const body = JSON.stringify({
    section,
    content,
    updated_at: new Date().toISOString(),
    updated_by: 'seed-script',
  });

  const res = await fetch(`${restUrl}/site_content?on_conflict=section`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: 'resolution=merge-duplicates',
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
}

// ── All section content extracted from the live website components ──

const sections = {
  // ═══════════════ HERO ═══════════════
  hero: {
    heading: 'Aluminum & Glass Solutions In Lahore',
    highlightedPhrase: 'Aluminum & Glass',
    subheadline:
      'Basit Ali is emerging as a top choice, offering superior aluminum windows, doors, and custom railings for homes and businesses throughout Lahore.',
    heroImages: [
      { src: '/assets/images/hero_bedroom_glass_doors.webp', alt: 'Luxury bedroom with sliding aluminum and glass doors overlooking the sea' },
      { src: '/assets/images/herosection1.jpg', alt: 'Basit Ali Aluminum professional glass installation work' },
      { src: '/assets/images/herosection2.jpg', alt: 'Premium aluminum window frames and glass fitting' },
      { src: '/assets/images/herosection3.jpg', alt: 'Commercial glass facade installation by Basit Ali team' },
      { src: '/assets/images/herosection4.jpg', alt: 'Modern aluminum and glass door installation in Lahore' },
    ],
    primaryButtonLabel: 'OUR SERVICES',
    primaryButtonLink: '/services',
    secondaryButtonLabel: '',
    secondaryButtonLink: '',
  },

  // ═══════════════ ABOUT HOMEPAGE ═══════════════
  'about-homepage': {
    heading: 'About Basit Ali',
    tagline: 'We are the best & we will prove it',
    description:
      'We are a leading manufacturer, supplier, and installer of architectural aluminum, glazing, stainless steel, and automation works. With a commitment to quality, innovation, and customer satisfaction, we deliver exceptional craftsmanship and reliable solutions for both commercial and residential projects across Lahore.',
    image: '/assets/images/futuristic_basit_ali_lobby_sculpture.png',
    backgroundImage: '/assets/images/basit_ali_metalworking_sparks.png',
    stats: [
      { label: 'Years Experience', value: '10+' },
      { label: 'Projects Completed', value: '500+' },
      { label: 'Happy Clients', value: '400+' },
    ],
  },

  // ═══════════════ FACILITIES ═══════════════
  facilities: {
    heading: 'Our Core Facilities & Specialties',
    subtitle: 'A complete, integrated aluminium processing operation — from molten metal to finished, coated profiles.',
    items: [
      {
        title: 'Billets Plant',
        description: 'Superior alloy 6063 billets produced in-house, homogenized and 100% ultrasonically inspected.',
        image: '/assets/images/billets.jpg',
        badge: 'In-House',
        details: 'Our state-of-the-art billets plant produces premium 6063 alloy billets with precise chemical composition control. Each billet undergoes homogenization treatment and 100% ultrasonic inspection to ensure flawless quality before extrusion.',
      },
      {
        title: 'Extrusion Plant',
        description: 'A comprehensive range of aluminium sections for commercial, residential & industrial use.',
        image: '/assets/images/extrusion-plant.jpg',
        badge: 'Since 2023',
        details: 'Our modern extrusion plant delivers a wide variety of aluminum profiles for windows, doors, curtain walls, and custom architectural applications. Equipped with advanced presses for consistent dimensional accuracy.',
      },
      {
        title: 'Dies Facility',
        description: 'Dies designed with the latest CAD software and manufactured using modern CNC technology.',
        image: '/assets/images/dies.jpg',
        badge: 'CNC',
        details: 'Our in-house die facility uses cutting-edge CAD/CAM software and CNC machining centers to design and manufacture precision extrusion dies, enabling rapid prototyping and custom profile development.',
      },
      {
        title: 'Anodizing Plant',
        description: 'High-performance anodized profiles in Natural, Brown, Bronze, Champagne & Black.',
        image: '/assets/images/anodizing-panel.jpg',
        badge: 'Finishing',
        details: 'Our anodizing plant provides durable, corrosion-resistant finishes in multiple colors. The electrochemical process creates a hard oxide layer that protects aluminum profiles while delivering an elegant appearance.',
      },
      {
        title: 'Powder Coating',
        description: 'A certified applicator offering the widest range of colours with a warranty-grade finish.',
        image: '/assets/images/powdercoat-spray.jpg',
        badge: 'Approved Applicator',
        details: 'As a certified powder coating applicator, we provide premium polyester and PVDF coatings in hundreds of RAL colors. Our automated coating line ensures uniform thickness and superior adhesion for long-lasting results.',
      },
      {
        title: 'Fabrication Facility',
        description: 'Specially designed OEM facility fulfilling any fabrication requirement for aluminium.',
        image: '/assets/images/fabrication.jpg',
        badge: 'OEM',
        details: 'Our fully equipped fabrication facility handles cutting, drilling, punching, bending, and assembly of aluminum profiles. We deliver ready-to-install components for windows, doors, curtain walls, and custom architectural projects.',
      },
    ],
  },

  // ═══════════════ SERVICES HOMEPAGE ═══════════════
  'services-homepage': {
    heading: 'Services',
    description: '',
    services: [
      {
        title: 'Sliding Door and Window Hinges',
        description: 'We provide reliable and smooth sliding door and window hinges, ensuring effortless operation and secure functionality.',
        image: '/assets/images/hero_bedroom_glass_doors.webp',
        category: 'Hardware & Sliding Systems',
      },
      {
        title: 'Curtain Wall and Spider System',
        description: 'Our expertise includes the design and installation of curtain wall systems and spider systems, delivering striking facades with exceptional structural integrity.',
        image: '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
        category: 'Commercial Facades',
      },
      {
        title: 'Glass Handrail',
        description: 'We offer stylish and durable glass handrails that provide safety and elegance, enhancing the aesthetics of staircases, balconies, and other areas.',
        image: '/assets/aistudio/image_68f2d2fe.png',
        category: 'Safety Balustrades',
      },
      {
        title: 'Frameless Glass Doors',
        description: 'Experience the beauty of frameless glass doors, creating a seamless and contemporary look for your interior spaces.',
        image: '/assets/aistudio/image_93949657.png',
        category: 'Architectural Glazing',
      },
      {
        title: 'Bathroom Glass Shower',
        description: 'Transform your bathroom into a luxurious retreat with our expertly crafted glass shower enclosures, combining functionality and elegance.',
        image: '/assets/images/luxury_glass_shower_cabin_1793184890693.jpg',
        category: 'Luxury Enclosures',
      },
      {
        title: 'Automatic Doors, Gates, Rolling Shutters, and Barriers',
        description: 'We provide automation solutions for doors, gates, rolling shutters, and barriers, offering convenience, security, and efficiency.',
        image: '/assets/images/hero_aluminum_glass_facade_1793184890767.jpg',
        category: 'Commercial Automation',
      },
      {
        title: 'Steel Structure and Wrought Iron Work',
        description: 'Our services encompass the fabrication and installation of steel structures and wrought iron works, adding strength and visual appeal to your projects.',
        image: '/assets/images/basit_ali_metalworking_sparks.png',
        category: 'Structural Fabrication',
      },
      {
        title: 'Stainless Steel Handrails and Cladding',
        description: 'Enhance safety and aesthetics with our stainless steel handrails and cladding services, providing durability and a sleek look to various applications.',
        image: '/assets/projects/project_2.jpg',
        category: 'Architectural Stainless Steel',
      },
    ],
  },

  // ═══════════════ PROJECTS HOMEPAGE ═══════════════
  'projects-homepage': {
    heading: 'Basit Ali Recent Projects',
    description:
      'See our latest aluminum and glass installations across Lahore.',
    projects: [
      {
        title: 'Architectural Stainless Steel Glass Stair Balustrade',
        category: 'Metal Work',
        location: 'DHA Phase 6, Lahore',
        image: '/assets/projects/project_1.jpg',
        specs: 'Grade 316 Stainless Steel Handrail · 12mm Toughened Safety Glass',
        description: 'Custom fabricated stainless steel balustrade with beveled tempered glass panels on floating marble staircase.',
      },
      {
        title: 'Modern Black Aluminum Frame Glass Staircase Enclosure',
        category: 'Aluminum Work',
        location: 'Gulberg III, Lahore',
        image: '/assets/projects/project_2.jpg',
        specs: 'Matte Black Thermal Powder-Coated Aluminum · 10mm Clear Tempered Glass',
        description: 'Sleek floor-to-ceiling glass partition wall with integrated acoustic dampening along interior wooden staircase.',
      },
      {
        title: 'Modern Glass Pergola & Aluminum Terrace Room',
        category: 'Custom Fabrication',
        location: 'Model Town, Lahore',
        image: '/assets/projects/project_3.jpg',
        specs: 'Heavy Structural Aluminum Beams · 12mm Heat-Reflective Laminated Glass',
        description: 'Four-season luxury garden conservatory with bi-folding aluminum doors overlooking skyline and lawn.',
      },
      {
        title: 'Luxury Bathroom Glass Shower & Arched Backlit Mirror',
        category: 'Glass Solutions',
        location: 'Bahria Town Sector C, Lahore',
        image: '/assets/projects/project_4.jpg',
        specs: '10mm Anti-Lime Scale Tempered Glass · Matt Black 304 Hinges · Custom LED Mirror',
        description: 'Frameless walk-in glass shower cabin with magnetic watertight seals and bespoke beveled vanity mirror.',
      },
      {
        title: 'Architectural Patio Sliding Glass Doors with Garden View',
        category: 'Aluminum Work',
        location: 'DHA Phase 5, Lahore',
        image: '/assets/projects/project_5.jpg',
        specs: 'Heavy 2.0mm Multi-Track Sliding Aluminum · Double Glazed Low-E Glass',
        description: 'Expansive multi-panel patio sliding system connecting luxury lounge seamlessly to outdoor terrace courtyard.',
      },
      {
        title: 'Commercial Tempered Glass Entrance Doors with Stainless Trim',
        category: 'Glass Solutions',
        location: 'MM Alam Road, Gulberg, Lahore',
        image: '/assets/projects/project_6.jpg',
        specs: '12mm Clear Safety Glass · Heavy-Duty Concealed Floor Springs · Gold PVD Trim',
        description: 'Double swing commercial entrance doors with high-security locks for upscale boutique storefront.',
      },
      {
        title: 'Modern Glass Balustrade Staircase with Dark Treads',
        category: 'Glass Solutions',
        location: 'Johar Town, Lahore',
        image: '/assets/projects/project_7.jpg',
        specs: '12mm Tempered Laminated Glass · Black Anodized Slim Capping Rail',
        description: 'Minimalist glass side-mounted balustrade providing open aesthetic and tested impact protection.',
      },
      {
        title: 'Glass Elevator Shaft & Double Height Atrium Glazing',
        category: 'Custom Fabrication',
        location: 'Lahore Cantt, Lahore',
        image: '/assets/projects/project_8.jpg',
        specs: 'Point-Fixed Spider Glazing · 12mm Laminated Clear Safety Glass',
        description: 'Panoramic glass elevator enclosure and mezzanine atrium railings in private multi-storey residence.',
      },
      {
        title: 'Frameless Glass Swimming Pool Safety Balustrade',
        category: 'Metal Work',
        location: 'Lake City, Lahore',
        image: '/assets/projects/project_9.jpg',
        specs: 'Duplex 2205 Stainless Steel Spigots · 12mm Toughened Clear Glass',
        description: 'Corrosion-proof pool perimeter glass barrier ensuring unhindered views with maximum safety.',
      },
      {
        title: 'Decorative Wrought Iron Staircase Railing',
        category: 'Metal Work',
        location: 'Garden Town, Lahore',
        image: '/assets/projects/project_10.jpg',
        specs: 'Hand-Forged Mild Steel · Powder-Coated Matte Black Finish',
        description: 'Custom decorative iron staircase railing with geometric patterns and premium powder-coated finish.',
      },
      {
        title: 'Modern Geometric Metal Stair Balustrade',
        category: 'Metal Work',
        location: 'Wapda Town, Lahore',
        image: '/assets/projects/project_11.webp',
        specs: 'Structural Steel Frame · Contemporary Geometric Design · Anti-Rust Coating',
        description: 'Contemporary geometric patterned metal balustrade combining modern aesthetics with structural strength.',
      },
      {
        title: 'Industrial Style Iron Railing with Wood Treads',
        category: 'Custom Fabrication',
        location: 'Askari 10, Lahore',
        image: '/assets/projects/project_12.jpg',
        specs: 'Heavy-Gauge Iron · Hardwood Treads · Epoxy Primer + Matte Finish',
        description: 'Industrial-style iron staircase railing paired with hardwood treads for a rustic modern look.',
      },
      {
        title: 'Elegant Curved Metal Staircase Design',
        category: 'Custom Fabrication',
        location: 'DHA Phase 8, Lahore',
        image: '/assets/projects/project_13.jpg',
        specs: 'Curved Mild Steel Structure · Marble Steps · Custom Handrail Profile',
        description: 'Gracefully curved metal staircase with marble steps and custom-profiled handrails for luxury villa.',
      },
      {
        title: 'Classic Iron Baluster Staircase Railing',
        category: 'Metal Work',
        location: 'Faisal Town, Lahore',
        image: '/assets/projects/project_14.jpg',
        specs: 'Cast Iron Balusters · Brass Handrail Cap · Protective Clear Coat',
        description: 'Traditional cast iron baluster staircase with brass-capped handrail delivering timeless elegance.',
      },
    ],
  },

  // ═══════════════ SAFETY BANNER ═══════════════
  'safety-banner': {
    heading: 'Safety & Quality First',
    description:
      'At Basit Ali, the well-being of our employees, clients, and the architectural safety of every building is our top priority. Our comprehensive Safety (HSE) & Quality Policies reflect our commitment to certified safety-tempered glass, accident prevention, and durable engineering. Explore our standards to understand how we protect your space.',
  },

  // ═══════════════ VISION ═══════════════
  vision: {
    heading: 'Basit Ali Vision',
    description:
      'Our vision is to be Lahore\'s most trusted provider of exceptional aluminum and glass solutions. We are dedicated to delivering unmatched craftsmanship, clean modern designs, and attentive customer service on every single installation.\n\nBy consistently exceeding homeowner and architect expectations, incorporating acoustic insulation technologies, and offering reliable 24/7 emergency support, we set higher standards for architectural excellence across Pakistan. Our vision is fueled by passion and a commitment to creating living and commercial spaces that inspire, enhance, and endure.',
    image: '/assets/images/aluminum_installation_craftsmen_1793184890381.jpg',
  },

  // ═══════════════ WHY CHOOSE US ═══════════════
  'why-choose': {
    heading: 'Redefining Excellence in Aluminum and Glass',
    reasons: [
      {
        title: 'Cutting-Edge Tools',
        description:
          'At Basit Ali, we stand out from the crowd by offering a unique combination of expertise, passion, and personalized service.',
        icon: 'wrench',
      },
      {
        title: 'Proven Expertise',
        description:
          'Choose us as your partner and enjoy exclusive advantages that set us apart from the competition.',
        icon: 'star',
      },
      {
        title: 'Competitive Pricing',
        description:
          'Direct factory prices without middlemen markup.',
        icon: 'chart',
      },
      {
        title: 'Long-Term Guarantee',
        description:
          '5-year workmanship warranty with prompt local service support.',
        icon: 'shield',
      },
      {
        title: 'Experience',
        description:
          '10+ years of excellence in aluminum and glass installations across Lahore.',
        icon: 'clock',
      },
      {
        title: 'Exceptional Support',
        description:
          '24/7 emergency repair services and WhatsApp responsiveness.',
        icon: 'phone',
      },
    ],
  },

  // ═══════════════ TESTIMONIALS ═══════════════
  testimonials: {
    heading: 'Testimonials',
    items: [
      {
        name: 'Noman Malik',
        role: 'Verified Client',
        location: 'Lahore',
        quote:
          'I highly recommend Basit Ali Aluminum & Glass. Their rates are very reasonable without compromising quality. Staff is well mannered and clarity in their dealing.',
        avatarBg: '#0f766e',
      },
      {
        name: 'Asim Khan',
        role: 'Verified Client',
        location: 'Lahore',
        quote: 'Had very good experience with team. Responsible management.',
        avatarBg: '#6B3FA0',
      },
      {
        name: 'Engr. Hassan Tariq',
        role: 'Verified Client',
        location: 'DHA Phase 6, Lahore',
        quote:
          'Installed sleek aluminum sliding doors and tempered shower cabins in our new DHA Phase 6 home. Exceptional finish and completed 2 days ahead of schedule!',
        avatarBg: '#1e40af',
      },
      {
        name: 'Zubair Sheikh',
        role: 'Verified Client',
        location: 'Gulberg, Lahore',
        quote:
          'Reliable shop front double-glazed curtain wall installation in Gulberg. Basit Ali and his team provided free laser measurement and very competitive quotation.',
        avatarBg: '#b45309',
      },
      {
        name: 'Muhammad Rizwan',
        role: 'Verified Client',
        location: 'Lahore',
        quote:
          'Prompt 24/7 emergency glass repair and custom slimline aluminum partitions. Very polite technicians and perfectly clean work. Highly recommended!',
        avatarBg: '#047857',
      },
      {
        name: 'Ammar Malik',
        role: 'Lead Interior Designer',
        location: 'DHA Phase 5, Lahore',
        quote:
          "Basit Ali Aluminum & Glass has been our go-to contractor for premium residential projects in Lahore. Their team is punctual, the miter joints on aluminum doors are razor sharp, and their 10mm tempered glass shower cabins are flawless. Highly recommended!",
        avatarBg: '#d97706',
      },
      {
        name: 'Fatima Ali',
        role: 'Operations & Facility Manager',
        location: 'Gulberg Corporate Towers, Lahore',
        quote:
          'We contracted Basit Ali for full-floor office glass partitions and emergency door repair. Their on-time completion, safety standards, and immediate WhatsApp responsiveness sets them far apart from ordinary vendors. True professionals.',
        avatarBg: '#059669',
      },
      {
        name: 'Engr. Sarah Ahmed',
        role: 'Principal Architectural Consultant',
        location: 'Bahria Town, Lahore',
        quote:
          "As an architect, structural precision and glass clarity are paramount. Basit Ali's team executed complex curtain walling and frameless glass balustrades exactly to our CAD drawings. Their free measurement and rapid quotation were incredibly transparent.",
        avatarBg: '#e11d48',
      },
    ],
  },

  // ═══════════════ FAQ ═══════════════
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question:
          'What areas across Lahore does Basit Ali Aluminum & Glass serve?',
        answer:
          'We serve all residential and commercial sectors across Lahore, including DHA (Phases 1-9), Gulberg, Bahria Town, Model Town, Johar Town, Cantt, Wapda Town, Garden Town, Faisal Town, Allama Iqbal Town, Lake City, Askari, and Raiwind Road. Our mobile measurement van covers the entire city.',
      },
      {
        question:
          'Do you provide free on-site measurement and quotation?',
        answer:
          'Yes! We provide 100% free on-site visits, measurements, and formal written quotations anywhere in Lahore with zero obligation. Call or WhatsApp us at 0320-2740066 to schedule a convenient appointment.',
      },
      {
        question:
          'How does your 24/7 Emergency Glass Repair service work?',
        answer:
          'Accidents and storm damage happen at any hour. Our emergency team is on standby 24/7 throughout the week for broken shopfront glass, shattered patio doors, detached sliding rollers, and urgent safety boarding across Lahore. Call 0320-2740066 immediately for priority dispatch.',
      },
      {
        question:
          'What types of aluminum profiles and glass thickness do you use?',
        answer:
          'We utilize prime architectural-grade aluminum profiles (1.2mm, 1.6mm, and 2.0mm heavy gauge) in powder-coated matte black, champagne anodized, silver, and wood-grain finishes. Glass options range from 8mm, 10mm, and 12mm certified tempered safety glass to acoustic double-glazed insulated units.',
      },
      {
        question:
          'What warranty or guarantee do you provide on your installations?',
        answer:
          'We offer an extensive 5-year guarantee on our aluminum fabrication and structural seals, along with manufacturer warranties on imported hardware, rollers, hydraulic floor hinges, and stainless steel fittings.',
      },
      {
        question:
          'How quickly can a typical project like windows or a shower cabin be completed?',
        answer:
          'Standard shower cabins and glass doors are typically fabricated and installed within 3 to 5 business days after final site measurement. Complete home aluminum window packages usually take 7 to 10 working days.',
      },
    ],
  },

  // ═══════════════ ABOUT PAGE ═══════════════
  'about-page': {
    heroBgImage: '/assets/aboutus/about-us-min.jpg',
    heroSubtitle: 'Basit Ali Aluminum & Glass',
    heroTitle: 'About',

    journeyLabel: 'About BASIT ALI',
    journeyHeading: 'Crafting Excellence in Aluminum and Glass Solutions',
    journeySubheading: 'Our Journey to Success',
    journeyDescription:
      'From our humble beginnings, Basit Ali Aluminum & Glass has emerged as a leading architectural aluminum, glazing, stainless steel, and automation company in Lahore. With a commitment to delivering exceptional workmanship at competitive prices, our team of highly experienced engineers and technicians ensures that every project, regardless of size, receives the utmost care and attention.',
    journeyImage: '/assets/aboutus/Professional Workshop Branding.png',
    logoImage: '/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png',

    expertiseHeading: 'Expertise and Innovation',
    expertiseDescription:
      'With a team of highly competent individuals, we uphold our position as a specialist in aluminum and glass works across Pakistan. Our commitment to achieving the highest standards of quality and service is supported by the utilization of state-of-the-art technologies.',
    customerHeading: 'Customer Satisfaction at the Core',
    customerDescription:
      'We take pride in our systematic focus on customer satisfaction, consistently surpassing expectations through our unwavering commitment to high-quality service. By attracting and retaining the best talent, we continue to strive towards our goal of being the foremost manufacturer, supplier, and installer of aluminum, glass, and automation works in the industry.',
    expertiseImage: '/assets/aboutus/twoperosn.png',

    standardsHeading: 'International Standards and Certifications',
    standardsDescription:
      'As part of our dedication to providing clients with the highest quality products, we have taken a significant step by entering into agreements with renowned companies. This partnership allows us to provide our clients with aluminum systems of international standard quality, ensuring that their projects meet and exceed expectations.',

    conclusionHeading: 'Conclusion',
    conclusionDescription:
      'At Basit Ali Aluminum & Glass, we are committed to crafting excellence in aluminum and glass solutions. With our dedication to quality, customer satisfaction, and innovation, we strive to exceed expectations and deliver exceptional results. Partner with us for your next project, and experience the difference that our expertise and passion, combined with international standard quality, can make.',

    hseHeading: 'Prioritizing Health, Safety & Environment (HSE)',
    hseDescription:
      'At Basit Ali, the well-being of our employees, clients, and the environment is our top priority. Our comprehensive HSE Policy reflects our commitment to maintaining high standards, preventing incidents, and fostering a culture of safety. Explore our HSE Policy to understand how we ensure a safe and sustainable working environment.',

    visionHeading: 'Basit Ali Vision',
    visionDescription:
      'Our vision is to be the leading provider of exceptional aluminum and glass solutions. We are dedicated to delivering unmatched quality, innovative designs, and superior customer service. By consistently exceeding client expectations and staying at the forefront of industry advancements, we aim to set new standards and inspire the future of architectural excellence. Our vision is fueled by passion and our commitment to creating spaces that inspire, enhance, and endure.',
    visionImage: '/assets/images/aluminum_installation_craftsmen_1793184890381.jpg',
    visionBadgeText: '10+',
    visionBadgeLabel: 'Years of Excellence',

    whyChooseLabel: 'Why Choose BASIT ALI',
    whyChooseHeading: 'Redefining Excellence in Aluminum and Glass',
    whyChooseDescription:
      'At Basit Ali, we stand out from the crowd by offering a unique combination of expertise, passion, and personalized service. Choose us as your partner and enjoy the following exclusive advantages that set us apart from the competition.',
    whyChooseBgLeft: '/assets/images/image-1-min.jpg',
    whyChooseBgRight: '/assets/images/basit_ali_metalworking_sparks.png',
    advantages: [
      { title: 'Cutting-Edge Tools', icon: 'wrench' },
      { title: 'Proven Expertise', icon: 'award' },
      { title: 'Competitive Pricing', icon: 'credit-card' },
      { title: 'Long-Term Guarantee', icon: 'shield' },
      { title: 'Experience', icon: 'trending-up' },
      { title: 'Exceptional Support', icon: 'headphones' },
    ],

    blogLabel: 'Basit Ali Blog',
    blogHeading: 'Read our Tips and Tricks',
    blogPosts: [
      {
        title: 'Why Aluminum is the Future of Building',
        author: 'Basit Ali Team · 2024',
        excerpt:
          "Imagine a material abundant in nature, effortlessly shaping our world from towering skyscrapers to sleek cars. It's not magic; it's aluminum, the versatile metal transforming modern construction with its lightweight strength and corrosion resistance.",
      },
      {
        title: 'The Ultimate Guide to Custom Aluminum Fabrication in Lahore',
        author: 'Basit Ali Team · 2024',
        excerpt:
          "Welcome to the ultimate guide on custom aluminum fabrication. Aluminum's durability, versatility, and sleek appearance make it a popular choice for both residential and commercial projects across Lahore and Pakistan.",
      },
    ],

    ctaBgImage: '/assets/aboutus/image-1-min.jpg',
    ctaLabel: 'Upgrade to Premium Aluminum & Glass',
    ctaHeading: 'Experience Unmatched Quality with Basit Ali',
    ctaSubtext: 'and Enjoy Exceptional Craftsmanship and a Wide Range of Customizable Options.',
  },

  // ═══════════════ SERVICE PAGES ═══════════════

  // ── Single-group pages ──

  'aluminum-windows-doors-page': {
    title: 'Aluminum Windows & Doors',
    heroDescription: 'Complete aluminium solutions for the building envelope — from windows and doors to curtain walls, kitchens, and custom fabrication, engineered and finished in-house.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/page1/archg-20261010-170457-0d784f.webp',
    sectionLabel: 'Our Product Range',
    sectionHeading: 'Architectural Aluminium Systems',
    sectionDescription: 'Complete aluminium solutions for the building envelope — from windows and doors to curtain walls, kitchens, and custom sections, engineered and finished in-house.',
    sections: [
      {
        title: 'Aluminium Windows',
        description: 'Thermally efficient aluminium windows engineered for slim sightlines, smooth operation, and weather-tight performance — ideal for homes, offices, and high-rise projects across Lahore.',
        bullets: ['Sliding, casement, top-hung & fixed styles', 'Double-glazing ready for heat & sound insulation', 'Powder-coated or anodized finishes in any colour'],
        cta: 'Enquire about Aluminium Windows',
        images: ['/assets/service/page1/archg-20261010-163055-e7f084.webp', '/assets/service/page1/archg-20261010-193015-7462db.jpg', '/assets/service/page1/archg-20261010-163114-517d63.jpg', '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp', '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg'],
      },
      {
        title: 'Aluminium Doors',
        description: 'Strong, secure, and elegant aluminium doors — hinged, sliding, and folding — built for high-traffic commercial entrances and modern residences.',
        bullets: ['Swing, sliding & bi-fold configurations', 'Heavy-duty hardware for commercial use', 'Slim frames with a premium architectural finish'],
        cta: 'Enquire about Aluminium Doors',
        images: ['/assets/service/page1/archg-20261010-193253-1779ec.jpg', '/assets/service/page1/archg-20261010-193156-66aa8b.jpg', '/assets/service/page1/archg-20261010-165444-5de1e7.webp', '/assets/service/page1/archg-20261010-165450-8af689.jpg', '/assets/service/page1/archg-20261010-193156-66aa8b (1).jpg', '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg'],
      },
      {
        title: 'Curtain Walls',
        description: 'Stick-built and semi-unitized aluminium curtain wall systems that clad facades in glass and metal — delivering striking aesthetics, daylight, and all-weather performance for towers and commercial buildings.',
        bullets: ['Stick-built & unitized systems', 'Structural & semi-structural glazing', 'Engineered for wind load & water-tightness'],
        cta: 'Enquire about Curtain Walls',
        images: ['/assets/service/page1/archg-20261010-170457-0d784f.webp', '/assets/service/page1/archg-20261010-170759-7ff538.jpg', '/assets/service/page1/archg-20261010-170816-baa272.jpg', '/assets/service/page1/archg-20261010-170039-b19946.png', '/assets/service/page1/archg-20261010-170457-0d784f (1).webp'],
      },
      {
        title: 'Kitchen Sections',
        description: 'Durable aluminium profiles for modern modular kitchens — moisture-proof and termite-proof cabinet frames, shutter profiles, and handles that outlast timber and laminate.',
        bullets: ['100% moisture & termite proof', 'Shutter, carcass & handle profiles', 'Scratch-resistant, easy-to-clean finishes'],
        cta: 'Enquire about Kitchen Sections',
        images: ['/assets/service/page1/archg-20261010-165050-2ad4d6.jpg', '/assets/service/page1/archg-20261010-165026-e6683a.jpg', '/assets/service/page1/archg-20261010-165151-dd4a36.jpg', '/assets/service/page1/archg-20261010-165034-ba92b6.jpg'],
      },
      {
        title: 'Sliding Glass Interiors',
        description: 'Premium aluminium-framed sliding glass systems for interior partitions, living room dividers, and patio enclosures — maximizing natural light while offering smooth, space-saving operation.',
        bullets: ['Floor-to-ceiling glass panel options', 'Soft-close & heavy-duty roller systems', 'Ideal for living rooms, patios & terraces'],
        cta: 'Enquire about Sliding Glass',
        images: ['/assets/service/page1/project_12.jpg', '/assets/images/hero_bedroom_glass_doors.webp', '/assets/service/page1/archg-20261010-163654-5a70c6.webp'],
      },
      {
        title: 'Pipe & Angle Sections',
        description: 'Aluminium pipe and angle sections for structural, framing, and fabrication work — round, square, and L-angle profiles offering consistent strength, straightness, and finish for railings, grills, frames, and support structures.',
        bullets: ['Round, square & L-angle profiles', 'For railings, grills, frames & structural use', 'Powder-coated or anodized finishes available'],
        cta: 'Enquire about Pipe & Angle Sections',
        images: ['/assets/service/page1/archg-20261010-203458-b5ce20.jpg', '/assets/images/extrusion-plant.jpg', '/assets/images/fabrication.jpg'],
      },
    ],
    ctaHeading: 'Planning a facade, windows or a custom aluminium system?',
  },

  'shop-fronts-page': {
    title: 'Shop Fronts & Commercial Entrances',
    heroDescription: 'Striking commercial glass facades and high-visibility shopfronts that captivate retail customers while providing maximum security — built for Lahore\'s retail plazas, offices, and restaurants.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg',
    sectionLabel: 'Commercial Solutions',
    sectionHeading: 'Shop Front & Entrance Systems',
    sectionDescription: 'Engineered for retail plazas, boutiques, restaurants, and corporate buildings across Lahore — built with heavy-duty aluminium frames and shatter-resistant safety glass.',
    sections: [
      {
        title: 'Retail Shop Fronts',
        description: 'High-visibility aluminium and glass shop fronts designed to maximise product display and attract foot traffic — engineered for boutiques, retail stores, and showrooms across Lahore\'s busiest commercial areas.',
        bullets: ['12mm clear tempered safety glass panels', 'Slim-profile aluminium frames for maximum visibility', 'Custom powder-coated finishes to match brand colours'],
        cta: 'Enquire about Retail Shop Fronts',
        images: ['/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg'],
      },
      {
        title: 'Commercial Glass Facades',
        description: 'Full-height glass facade systems for offices, banks, and corporate buildings — delivering striking modern aesthetics with structural integrity and superior weather performance.',
        bullets: ['Structural glazing for seamless glass walls', 'High wind-load engineered aluminium frames', 'UV-resistant & energy-efficient glass options'],
        cta: 'Enquire about Glass Facades',
        images: ['/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg'],
      },
      {
        title: 'Automatic Sensor Doors',
        description: 'Touchless automatic sliding and swing doors with motion sensor technology — ideal for high-traffic commercial entrances, malls, hospitals, and office lobbies requiring hands-free access.',
        bullets: ['Motion sensor & remote-controlled operation', 'Heavy-duty aluminium track systems', 'Panic exit hardware for safety compliance'],
        cta: 'Enquire about Automatic Doors',
        images: ['/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg'],
      },
      {
        title: 'Restaurant & Cafe Fronts',
        description: 'Elegant folding, sliding, and fixed glass fronts for restaurants, cafes, and food courts — designed to create an inviting open-air atmosphere while maintaining climate control and security.',
        bullets: ['Bi-fold & sliding glass wall configurations', 'Weather-sealed for outdoor dining areas', 'Frosted & tinted glass privacy options'],
        cta: 'Enquire about Restaurant Fronts',
        images: ['/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg'],
      },
      {
        title: 'Security Shutters & Rolling Gates',
        description: 'Heavy-duty aluminium rolling shutters and security gates for shop fronts, warehouses, and parking entrances — offering robust after-hours protection with smooth motorised or manual operation.',
        bullets: ['Motorised & manual rolling shutter systems', 'Perforated, solid, or grille shutter styles', 'Powder-coated finishes with anti-corrosion treatment'],
        cta: 'Enquire about Security Shutters',
        images: ['/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg'],
      },
      {
        title: 'Office Glass Partitions & Entrances',
        description: 'Frameless and aluminium-framed glass entrance systems for corporate offices, co-working spaces, and reception areas — combining transparency, sound insulation, and professional aesthetics.',
        bullets: ['10mm & 12mm toughened safety glass', 'Frosted logos & branded privacy bands', 'Acoustic-rated for meeting rooms & cabins'],
        cta: 'Enquire about Office Entrances',
        images: ['/assets/service/Shop-Fronts-Commercial-Entrances/images (1).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (3).jpg', '/assets/service/Shop-Fronts-Commercial-Entrances/images (2).jpg'],
      },
    ],
    ctaHeading: 'Planning a shop front, facade, or commercial entrance?',
  },

  'office-glass-work-page': {
    title: 'Office Glass Work & Cabins',
    heroDescription: 'Professional acoustic meeting pods, executive cabin partitions, and frosted glass branding — tailored for corporate environments across Lahore.',
    heroLabel: 'Corporate Solutions',
    heroImage: '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
    sectionLabel: 'Office Glass Solutions',
    sectionHeading: 'Corporate Glass & Cabin Systems',
    sectionDescription: 'Sleek acoustic glass walls that optimise natural ambient light while keeping corporate meetings private and sound-insulated — designed for offices, banks, and co-working spaces.',
    sections: [
      {
        title: 'Executive Glass Cabins',
        description: 'Fully enclosed glass cabins for CEOs, directors, and senior management — delivering privacy and prestige while keeping interiors bathed in natural light. Built with acoustic-rated tempered glass and slimline aluminium profiles.',
        bullets: ['Acoustic STC rating 38\u201342 dB for private conversations', 'Floor-to-ceiling 10mm & 12mm toughened glass', 'Integrated blinds & smart-film privacy options'],
        cta: 'Enquire about Executive Cabins',
        images: ['/assets/images/curtain_wall_office_glass_1793184891246.jpg', '/assets/service/page1/project_12.jpg', '/assets/service/page1/archg-20261010-163114-517d63.jpg'],
      },
      {
        title: 'Glass Partition Walls',
        description: 'Open-plan office glass dividers that separate workspaces without blocking light or sightlines — ideal for creating meeting zones, focus pods, and team areas within a modern office layout.',
        bullets: ['Frameless & aluminium-framed partition systems', 'Single & double-glazed acoustic options', 'Modular design for easy reconfiguration'],
        cta: 'Enquire about Glass Partitions',
        images: ['/assets/service/page1/archg-20261010-163055-e7f084.webp', '/assets/service/page1/archg-20261010-193015-7462db.jpg', '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp'],
      },
      {
        title: 'Conference Room Glazing',
        description: 'Sound-insulated glass enclosures for boardrooms and conference halls — engineered for complete acoustic privacy during presentations and client meetings while maintaining visual transparency.',
        bullets: ['Double-glazed laminated glass for sound dampening', 'Frosted bands & logo branding on glass', 'Integrated cable pass-throughs & AV compatibility'],
        cta: 'Enquire about Conference Glazing',
        images: ['/assets/service/page1/archg-20261010-170457-0d784f.webp', '/assets/service/page1/archg-20261010-170816-baa272.jpg', '/assets/service/page1/archg-20261010-170759-7ff538.jpg'],
      },
      {
        title: 'Glass Doors for Offices',
        description: 'Swing, sliding, and frameless glass doors for office entrances, cabin entries, and corridor access — combining elegant aesthetics with smooth operation and durable hardware for daily commercial use.',
        bullets: ['Hydraulic floor springs & soft-close mechanisms', 'Stainless steel pull handles & patch fittings', 'Frosted, clear, and tinted glass options'],
        cta: 'Enquire about Office Glass Doors',
        images: ['/assets/service/page1/archg-20261010-193253-1779ec.jpg', '/assets/service/page1/archg-20261010-193156-66aa8b.jpg', '/assets/service/page1/archg-20261010-165444-5de1e7.webp'],
      },
      {
        title: 'Reception & Lobby Glass Work',
        description: 'Custom glass reception counters, lobby partitions, and entrance feature walls that create a striking first impression — designed with premium finishes and branded frosted graphics for corporate identity.',
        bullets: ['Custom-cut reception counter glass panels', 'Backlit & LED-integrated glass features', 'Company logo etching & vinyl branding'],
        cta: 'Enquire about Reception Glass',
        images: ['/assets/service/page1/archg-20261010-170457-0d784f (1).webp', '/assets/service/page1/archg-20261010-170039-b19946.png', '/assets/images/hero_aluminum_glass_facade_1793184890767.jpg'],
      },
      {
        title: 'Aluminium Window & Facade Systems',
        description: 'High-performance aluminium window systems for office buildings — casement, fixed, and curtain wall configurations that optimise daylight, ventilation, and energy efficiency for modern commercial interiors.',
        bullets: ['Thermal break profiles for energy savings', 'Powder-coated slimline black & silver frames', 'High wind-load rated for multi-storey buildings'],
        cta: 'Enquire about Office Windows',
        images: ['/assets/service/page1/archg-20261010-163114-517d63 (1).jpg', '/assets/service/page1/archg-20261010-165450-8af689.jpg', '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg'],
      },
    ],
    ctaHeading: 'Planning office cabins, partitions, or corporate glass work?',
  },

  'vertical-blinds-page': {
    title: 'Vertical Blinds & Roller Shades',
    heroDescription: 'Functional, elegant vertical blinds, zebra blinds, and sunscreen roller shades providing superior solar control and privacy — custom made for homes and offices across Lahore.',
    heroLabel: 'Window Covering Solutions',
    heroImage: '/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp',
    sectionLabel: 'Blinds & Shades',
    sectionHeading: 'Window Covering Systems',
    sectionDescription: 'Smooth-operating track systems engineered for wide aluminium windows, sliding patio doors, and executive glass offices — UV fade-resistant with motorised remote control options.',
    sections: [
      {
        title: 'Vertical Blinds',
        description: 'Classic vertical blind systems with smooth-rotating PVC and fabric vanes — ideal for large aluminium windows, sliding patio doors, and office partitions where precise light control and privacy are essential.',
        bullets: ['Available in 89mm & 127mm vane widths', 'PVC, fabric & blackout material options', 'Smooth-operating aluminium head rail system'],
        cta: 'Enquire about Vertical Blinds',
        images: ['/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp', '/assets/service/vertical blinds/images (2).jpg', '/assets/service/vertical blinds/images (4).jpg'],
      },
      {
        title: 'Roller Shades',
        description: 'Sleek single-panel roller shades that roll up neatly into a compact aluminium cassette — perfect for bedrooms, living rooms, and offices needing clean aesthetics with full light-blocking capability.',
        bullets: ['Blackout, sunscreen & translucent fabrics', 'Spring-loaded & chain-operated mechanisms', 'Custom-cut to exact window frame dimensions'],
        cta: 'Enquire about Roller Shades',
        images: ['/assets/service/vertical blinds/images (3).jpg', '/assets/service/vertical blinds/images (5).jpg', '/assets/service/vertical blinds/images (1).jpg'],
      },
      {
        title: 'Zebra Blinds',
        description: 'Dual-layer alternating sheer and opaque fabric strips that slide over each other — giving you seamless control between full privacy and soft filtered daylight in one elegant system.',
        bullets: ['Alternating sheer & opaque fabric layers', 'Adjustable light filtering without fully closing', 'Modern slim cassette housing in any colour'],
        cta: 'Enquire about Zebra Blinds',
        images: ['/assets/service/vertical blinds/download.jpg', '/assets/service/vertical blinds/images (2).jpg', '/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp'],
      },
      {
        title: 'Motorised Blinds & Shades',
        description: 'Remote-controlled and smart-home compatible motorised blind systems for hard-to-reach windows, skylights, and large glass facades — offering effortless operation at the touch of a button.',
        bullets: ['Remote control & smart-home integration', 'Battery-powered & wired motor options', 'Timer & sunlight sensor automation'],
        cta: 'Enquire about Motorised Blinds',
        images: ['/assets/service/vertical blinds/images (1).jpg', '/assets/service/vertical blinds/images (4).jpg', '/assets/service/vertical blinds/images (3).jpg'],
      },
      {
        title: 'Wooden & Faux-Wood Blinds',
        description: 'Natural wood and moisture-resistant faux-wood venetian blinds with aluminium ladder tapes — combining warmth and elegance for living rooms, bedrooms, and kitchens where style meets durability.',
        bullets: ['Real basswood & PVC faux-wood slats', 'Moisture-resistant for kitchens & bathrooms', 'Available in 25mm & 50mm slat widths'],
        cta: 'Enquire about Wooden Blinds',
        images: ['/assets/service/vertical blinds/images (2).jpg', '/assets/service/vertical blinds/beige-signature-pvc-vertical-blinds-cozy.webp', '/assets/service/vertical blinds/images (5).jpg'],
      },
      {
        title: 'Office & Commercial Blinds',
        description: 'Heavy-duty vertical and roller blind installations for corporate offices, hospitals, schools, and commercial buildings — fire-retardant fabrics with UV-resistant coatings for long-lasting performance.',
        bullets: ['Fire-retardant & UV-resistant commercial fabrics', 'Bulk installation for multi-floor buildings', 'Branded & custom-printed fabric options'],
        cta: 'Enquire about Commercial Blinds',
        images: ['/assets/service/vertical blinds/images (5).jpg', '/assets/service/vertical blinds/images (3).jpg', '/assets/service/vertical blinds/download.jpg'],
      },
    ],
    ctaHeading: 'Need blinds, roller shades, or motorised window coverings?',
  },

  'mirrors-glass-repair-page': {
    title: 'Mirrors & 24/7 Glass Repair',
    heroDescription: 'Emergency cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes — available 24/7 across Lahore.',
    heroLabel: 'Emergency & Custom Solutions',
    heroImage: '/assets/images/aluminum_installation_craftsmen_1793184890381.jpg',
    sectionLabel: 'Repair & Mirror Solutions',
    sectionHeading: 'Glass Repair & Custom Mirror Systems',
    sectionDescription: 'When a window breaks or a glass door jams, our emergency crew arrives promptly. We also craft custom beveled, LED, and gym mirrors to exact specifications.',
    sections: [
      {
        title: '24/7 Emergency Glass Repair',
        description: 'When a window breaks, a shopfront cracks, or a glass door jams off its track — our emergency crew arrives promptly across Lahore. We provide same-day cracked glass replacement, temporary boarding, and full restoration to get your property secure again.',
        bullets: ['24/7 emergency dispatch hotline', 'Same-day broken glass removal & replacement', 'Temporary boarding for immediate security'],
        cta: 'Call for Emergency Repair',
        images: ['/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg', '/assets/service/Curtain-wall/archg-20261010-193156-66aa8b.jpg', '/assets/images/fabrication.jpg', '/assets/service/page1/archg-20261010-193253-1779ec.jpg'],
      },
      {
        title: 'Window Glass Replacement',
        description: 'Complete single and double-pane window glass replacement for homes, offices, and commercial buildings — using certified tempered or laminated safety glass cut to exact frame dimensions on-site.',
        bullets: ['Single & double-pane glass replacement', 'Tempered, laminated & tinted glass options', 'On-site cutting & precision fitting'],
        cta: 'Enquire about Glass Replacement',
        images: ['/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp', '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg', '/assets/service/page1/archg-20261010-163114-517d63.jpg'],
      },
      {
        title: 'Door & Roller Track Repairs',
        description: 'Sliding door track realignment, roller hinge replacement, floor spring repair, and patch fitting adjustments — restoring smooth operation to jammed, sagging, or misaligned glass and aluminium doors.',
        bullets: ['Track & roller hinge realignment', 'Floor spring & patch fitting replacement', 'Heavy-duty German brass roller upgrades'],
        cta: 'Enquire about Door Repairs',
        images: ['/assets/service/Curtain-wall/arch-louvers-2.jpg', '/assets/service/Curtain-wall/archg-20261010-165450-8af689.jpg', '/assets/service/page1/archg-20261010-165444-5de1e7.webp'],
      },
      {
        title: 'Custom Wall Mirrors',
        description: 'Made-to-measure wall-to-wall mirrors for living rooms, bedrooms, and hallways — available in beveled, frameless, and decorative framed styles that add depth and elegance to any interior space.',
        bullets: ['Custom-cut to exact wall dimensions', 'Beveled, frameless & framed mirror styles', 'Safety-backed mirrors with anti-shatter film'],
        cta: 'Enquire about Wall Mirrors',
        images: ['/assets/service/Curtain-wall/arch-louvers-3.jpg', '/assets/service/Curtain-wall/arch-louvers-3 (1).jpg', '/assets/service/Curtain-wall/archg-20261010-165034-ba92b6.jpg'],
      },
      {
        title: 'Gym & Salon Mirrors',
        description: 'Full-height shatter-proof mirrors for gyms, fitness studios, dance academies, and beauty salons — wall-mounted with concealed bracket systems for a clean, seamless finish across large areas.',
        bullets: ['Full-height floor-to-ceiling installations', 'Shatter-proof safety glass with backing film', 'Concealed bracket & adhesive mounting systems'],
        cta: 'Enquire about Gym Mirrors',
        images: ['/assets/service/Curtain-wall/archg-20261010-163654-5a70c6.webp', '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg', '/assets/service/page1/archg-20261010-170816-baa272.jpg', '/assets/service/page1/archg-20261010-170759-7ff538.jpg'],
      },
      {
        title: 'LED & Vanity Mirrors',
        description: 'Backlit LED vanity mirrors and illuminated bathroom mirrors with integrated lighting, anti-fog coating, and touch-sensor controls — designed for modern bathrooms, dressing rooms, and salon stations.',
        bullets: ['Warm & cool LED backlight options', 'Anti-fog coating for bathroom use', 'Touch-sensor on/off & dimmer controls'],
        cta: 'Enquire about LED Mirrors',
        images: ['/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg', '/assets/service/Curtain-wall/arch-louvers-2.jpg', '/assets/service/page1/archg-20261010-165050-2ad4d6.jpg', '/assets/service/page1/archg-20261010-165026-e6683a.jpg'],
      },
    ],
    ctaHeading: 'Broken glass? Need a custom mirror? Call us 24/7!',
  },

  // ── Dual-group pages ──

  'glass-doors-partitions-page': {
    title: 'Glass Doors & Partitions',
    heroDescription: 'Premium tempered glass doors and partition systems — from frameless patch-fitting entrances to acoustic office dividers, engineered and installed across Lahore.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/page1/archg-20261010-170759-7ff538.jpg',
    group1Label: 'Glass Doors',
    group1Heading: 'Elegant & Secure Glass Door Systems',
    group1Description: 'Experience the elegance of frameless and slimline glass doors — creating seamless, contemporary entrances for modern offices, showrooms, and residences.',
    group1Sections: [
      {
        title: 'Frameless Glass Doors',
        description: 'Elegant frameless tempered glass doors with hydraulic patch fittings and concealed floor springs — delivering a sleek, contemporary entrance for offices, showrooms, and luxury residences across Lahore.',
        bullets: ['10mm & 12mm certified toughened safety glass', 'Dorma/Ozone-grade hydraulic floor springs', 'Premium stainless steel pull handles & patch fittings'],
        cta: 'Enquire about Frameless Glass Doors',
        images: ['/assets/service/page1/archg-20261010-193253-1779ec.jpg', '/assets/service/page1/archg-20261010-165450-8af689.jpg', '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg'],
      },
      {
        title: 'Sliding Glass Doors',
        description: 'Space-efficient sliding glass door systems engineered for smooth, silent operation — ideal for living rooms, patios, balconies, and commercial storefronts where maximum natural light and unobstructed views are essential.',
        bullets: ['Heavy-duty track systems with German brass rollers', 'Single, double & multi-panel sliding configurations', 'Slim aluminum frames for panoramic glass views'],
        cta: 'Enquire about Sliding Glass Doors',
        images: ['/assets/service/page1/archg-20261010-193156-66aa8b.jpg', '/assets/service/page1/project_12.jpg', '/assets/service/page1/archg-20261010-193156-66aa8b (1).jpg'],
      },
      {
        title: 'Bi-Fold & Folding Glass Doors',
        description: 'Panoramic bi-fold glass door systems that fold open completely — merging indoor and outdoor spaces seamlessly for terraces, garden rooms, restaurants, and modern open-plan living areas.',
        bullets: ['Full-width opening for seamless indoor-outdoor flow', 'Top-hung & bottom-rolling track options', 'Powder-coated matte black, champagne & bronze finishes'],
        cta: 'Enquire about Bi-Fold Glass Doors',
        images: ['/assets/service/page1/archg-20261010-165444-5de1e7.webp', '/assets/service/page1/archg-20261010-163654-5a70c6.webp', '/assets/service/page1/archg-20261010-193253-1779ec.jpg'],
      },
    ],
    group2Label: 'Glass Partitions',
    group2Heading: 'Modern Glass Partition & Wall Systems',
    group2Description: 'Professional glass partition walls and structural glazing systems that optimize natural light while maintaining acoustic privacy — ideal for offices, showrooms, and commercial buildings.',
    group2Sections: [
      {
        title: 'Office Glass Partitions',
        description: 'Professional acoustic glass partition walls for corporate offices, executive cabins, and meeting rooms — maximizing natural light flow while maintaining privacy and sound insulation for productive workspaces.',
        bullets: ['Acoustic STC rating 38\u201342 dB for sound privacy', 'Slimline black or silver aluminum framing profiles', 'Frosted vinyl graphics for branding & privacy'],
        cta: 'Enquire about Office Partitions',
        images: ['/assets/service/page1/archg-20261010-170457-0d784f.webp', '/assets/service/page1/archg-20261010-170759-7ff538.jpg', '/assets/service/page1/archg-20261010-170457-0d784f (1).webp'],
      },
      {
        title: 'Frameless Glass Walls',
        description: 'Floor-to-ceiling frameless glass walls that create open, airy interiors with uninterrupted sightlines — perfect for showrooms, reception areas, conference halls, and high-end residential spaces.',
        bullets: ['10mm & 12mm tempered safety glass panels', 'Point-fixed or channel-mounted installations', 'Available in clear, tinted, frosted & patterned glass'],
        cta: 'Enquire about Glass Walls',
        images: ['/assets/service/page1/archg-20261010-163055-e7f084.webp', '/assets/service/page1/archg-20261010-163114-517d63.jpg', '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp'],
      },
      {
        title: 'Curtain Wall & Structural Glazing',
        description: 'Full exterior glass envelope systems for commercial plazas, corporate headquarters, and high-rise buildings — engineered for exceptional structural integrity, weather tightness, and stunning architectural impact.',
        bullets: ['Heavy architectural structural glazing systems', 'Double-glazed Low-E insulated glass units', 'Seismic and wind pressure certified to international standards'],
        cta: 'Enquire about Curtain Walls',
        images: ['/assets/service/page1/archg-20261010-170816-baa272.jpg', '/assets/service/page1/archg-20261010-170039-b19946.png', '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg'],
      },
    ],
    ctaHeading: 'Planning glass doors, partitions, or a custom glazing system?',
  },

  'shower-cabins-page': {
    title: 'Bathroom Glass Shower Cabins',
    heroDescription: 'Custom frameless and sliding glass shower enclosures — from corner cabins to walk-in wet rooms, expertly measured and installed across Lahore.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/bathroom-shower-cabins/images (1).jpg',
    group1Label: 'Shower Enclosures',
    group1Heading: 'Premium Glass Shower Systems',
    group1Description: 'Transform your bathroom into a luxury retreat with expertly crafted frameless and sliding glass shower enclosures featuring anti-lime scale safety glass and rustproof stainless steel hardware.',
    group1Sections: [
      {
        title: 'Frameless Glass Shower Enclosures',
        description: 'Transform your bathroom into a luxury retreat with our expertly crafted frameless tempered glass shower enclosures — delivering a clean, open aesthetic with maximum light flow and easy maintenance.',
        bullets: ['8mm & 10mm certified toughened safety glass', 'Anti-lime scale coating for effortless cleaning', '304-grade rustproof stainless steel hinges & clamps'],
        cta: 'Enquire about Frameless Showers',
        images: ['/assets/service/bathroom-shower-cabins/images (1).jpg', '/assets/service/bathroom-shower-cabins/images (5).jpg', '/assets/service/bathroom-shower-cabins/images (4).jpg'],
      },
      {
        title: 'Sliding Glass Shower Doors',
        description: 'Space-saving sliding glass shower doors built for compact and standard bathrooms — featuring smooth roller mechanisms, watertight magnetic seals, and sleek modern hardware.',
        bullets: ['Smooth-gliding top & bottom roller systems', 'Magnetic waterproof sealing strips', 'Available in chrome, matt black & gold finishes'],
        cta: 'Enquire about Sliding Shower Doors',
        images: ['/assets/service/bathroom-shower-cabins/images (4).jpg', '/assets/service/bathroom-shower-cabins/images (6).jpg', '/assets/service/bathroom-shower-cabins/images (2).jpg'],
      },
      {
        title: 'Corner & L-Shaped Shower Cabins',
        description: 'Custom-measured corner and L-shaped glass shower cabins designed to maximize space in any bathroom layout — from compact powder rooms to spacious master baths.',
        bullets: ['Custom measured to the millimeter for perfect fit', '90\u00b0 and custom angle glass-to-glass joints', 'Frameless or semi-frameless configurations'],
        cta: 'Enquire about Corner Showers',
        images: ['/assets/service/bathroom-shower-cabins/images (3).jpg', '/assets/service/bathroom-shower-cabins/images (1).jpg', '/assets/service/bathroom-shower-cabins/images (5).jpg'],
      },
    ],
    group2Label: 'Accessories & Extras',
    group2Heading: 'Complete Your Bathroom',
    group2Description: 'Walk-in wet room panels, premium shower hardware, and custom glass mirrors — everything you need to create the perfect bathroom experience.',
    group2Sections: [
      {
        title: 'Walk-In Wet Room Panels',
        description: 'Minimalist fixed glass panels for open walk-in wet rooms — creating a spacious, doorless shower experience with premium tempered glass and stainless steel wall brackets.',
        bullets: ['Fixed panel with stabilizer bar for rigidity', '10mm tempered safety glass standard', 'No door tracks or hinges to maintain'],
        cta: 'Enquire about Walk-In Panels',
        images: ['/assets/service/bathroom-shower-cabins/images (2).jpg', '/assets/service/bathroom-shower-cabins/images (5).jpg', '/assets/service/bathroom-shower-cabins/images (6).jpg'],
      },
      {
        title: 'Shower Hardware & Fittings',
        description: 'Premium shower cabin hardware — hydraulic hinges, towel bars, glass-to-glass connectors, and wall-mount brackets in chrome, matt black, brushed nickel, and gold PVD finishes.',
        bullets: ['Hydraulic self-closing glass door hinges', '304-grade stainless steel towel bars & handles', 'Anti-corrosion finishes for humid environments'],
        cta: 'Enquire about Shower Hardware',
        images: ['/assets/service/bathroom-shower-cabins/images (6).jpg', '/assets/service/bathroom-shower-cabins/images (3).jpg', '/assets/service/bathroom-shower-cabins/images (1).jpg'],
      },
      {
        title: 'Custom Glass Mirrors & Vanity Panels',
        description: 'Bespoke beveled and LED-backlit bathroom mirrors, vanity glass panels, and decorative glass shelving — designed to complement your shower cabin and elevate the entire bathroom aesthetic.',
        bullets: ['Custom beveled edge & frameless mirror designs', 'LED backlit mirrors with anti-fog heating pads', 'Tempered glass shelving for shower niches'],
        cta: 'Enquire about Mirrors & Vanity Glass',
        images: ['/assets/service/bathroom-shower-cabins/images (4).jpg', '/assets/service/bathroom-shower-cabins/images (2).jpg', '/assets/service/bathroom-shower-cabins/images (3).jpg'],
      },
    ],
    ctaHeading: 'Planning a glass shower cabin or bathroom upgrade?',
  },

  'tempered-glass-page': {
    title: 'Tempered Glass Installation',
    heroDescription: 'Certified heat-treated safety glass — 5x stronger than standard glass — available in clear, tinted, frosted, and laminated options for every construction need across Lahore.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/page1/archg-20261010-170457-0d784f.webp',
    group1Label: 'Glass Types',
    group1Heading: 'Certified Tempered Safety Glass',
    group1Description: 'Heat-treated safety glass meeting all local Lahore construction standards — available in multiple thicknesses, tints, and finishes with polished edges and precision processing.',
    group1Sections: [
      {
        title: 'Clear Tempered Safety Glass',
        description: 'Certified heat-treated clear tempered glass panels — 5x stronger than standard annealed glass — ideal for doors, windows, partitions, balustrades, and shopfronts across residential and commercial projects in Lahore.',
        bullets: ['Available in 8mm, 10mm & 12mm thickness', 'Shatter-safe: fractures into blunt pebble fragments', 'Polished beveled edges with CNC precision cut-outs'],
        cta: 'Enquire about Clear Tempered Glass',
        images: ['/assets/service/page1/archg-20261010-163055-e7f084.webp', '/assets/service/page1/archg-20261010-193253-1779ec.jpg', '/assets/service/page1/archg-20261010-163114-517d63.jpg'],
      },
      {
        title: 'Tinted & Reflective Tempered Glass',
        description: 'Heat-strengthened tinted and reflective tempered glass offering superior solar control, glare reduction, and privacy — perfect for building facades, office partitions, and exterior cladding applications.',
        bullets: ['Available in bronze, grey, green & blue tints', 'Reflective coatings for solar heat rejection', 'UV fade-resistant for long-term colour stability'],
        cta: 'Enquire about Tinted Glass',
        images: ['/assets/service/page1/archg-20261010-170759-7ff538.jpg', '/assets/service/page1/archg-20261010-170816-baa272.jpg', '/assets/service/page1/archg-20261010-170457-0d784f.webp'],
      },
      {
        title: 'Frosted & Patterned Tempered Glass',
        description: 'Acid-etched frosted and textured tempered glass providing elegant privacy without sacrificing natural light — widely used for bathroom doors, office cabins, conference room partitions, and decorative installations.',
        bullets: ['Acid-etched satin finish for uniform diffusion', 'Custom frosted logos & privacy patterns available', 'Finger-print resistant coating options'],
        cta: 'Enquire about Frosted Glass',
        images: ['/assets/service/page1/archg-20261010-165050-2ad4d6.jpg', '/assets/service/page1/archg-20261010-165026-e6683a.jpg', '/assets/service/page1/archg-20261010-165151-dd4a36.jpg'],
      },
    ],
    group2Label: 'Applications & Processing',
    group2Heading: 'Advanced Glass Solutions',
    group2Description: 'Laminated units, balustrade-grade panels, and CNC-processed custom shapes — engineered to exact specifications with certified compliance test certificates.',
    group2Sections: [
      {
        title: 'Laminated & Double-Glazed Units',
        description: 'Multi-layer laminated tempered glass and insulated double-glazed units (IGU) engineered for maximum safety, sound insulation, and thermal efficiency — meeting international construction and safety standards.',
        bullets: ['PVB interlayer lamination for impact resistance', 'Double-glazed Low-E units for thermal insulation', 'Acoustic dampening up to STC 38\u201342 dB'],
        cta: 'Enquire about Laminated Glass',
        images: ['/assets/service/page1/archg-20261010-170039-b19946.png', '/assets/service/page1/archg-20261010-170457-0d784f (1).webp', '/assets/service/page1/archg-20261010-163055-e7f084 (1).webp'],
      },
      {
        title: 'Tempered Glass for Balustrades & Railings',
        description: 'High-strength tempered and laminated glass panels specifically engineered for staircase balustrades, balcony railings, pool barriers, and terrace enclosures — combining safety with unobstructed views.',
        bullets: ['12mm toughened glass standard for balustrades', 'Compliant with structural load & impact testing', 'Compatible with spigot, channel & standoff systems'],
        cta: 'Enquire about Glass Balustrades',
        images: ['/assets/service/page1/archg-20261010-165444-5de1e7.webp', '/assets/service/page1/project_12.jpg', '/assets/service/page1/archg-20261010-165450-8af689.jpg'],
      },
      {
        title: 'Custom Cut & CNC Processed Glass',
        description: 'Precision CNC-processed tempered glass with custom shapes, drilled holes, notches, and countersunk cut-outs for handles, hinges, and hardware — fabricated in-house to exact architectural specifications.',
        bullets: ['CNC drilling, notching & countersinking', 'Custom shapes: arched, circular & trapezoid panels', 'Certified compliance test certificates provided'],
        cta: 'Enquire about Custom Glass Processing',
        images: ['/assets/service/page1/archg-20261010-203458-b5ce20.jpg', '/assets/service/page1/archg-20261010-193156-66aa8b.jpg', '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg'],
      },
    ],
    ctaHeading: 'Need tempered glass for your project?',
  },

  'curtain-wall-page': {
    title: 'Curtain Wall & Spider Glass Systems',
    heroDescription: 'Striking building facades and spider glass installations engineered with exceptional structural integrity, weather tightness, and architectural impact — for commercial landmarks across Lahore.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp',
    group1Label: 'Curtain Wall Systems',
    group1Heading: 'Architectural Glass Facade Solutions',
    group1Description: 'Full exterior glass envelope systems for commercial plazas, auto dealerships, and corporate headquarters — stick-built, unitized, and semi-structural glazing options.',
    group1Sections: [
      {
        title: 'Stick-Built Curtain Wall Systems',
        description: 'Precision-assembled stick-built aluminum curtain wall facades where mullions and transoms are installed piece by piece on-site — offering maximum design flexibility for towers, plazas, and commercial buildings across Lahore.',
        bullets: ['Custom mullion & transom profile configurations', 'Structural silicone glazing for seamless aesthetics', 'Engineered for wind load & seismic compliance'],
        cta: 'Enquire about Stick-Built Systems',
        images: ['/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp', '/assets/service/Curtain-wall/archg-20261010-165034-ba92b6.jpg', '/assets/service/Curtain-wall/archg-20261010-193156-66aa8b.jpg'],
      },
      {
        title: 'Unitized Curtain Wall Systems',
        description: 'Factory-assembled unitized curtain wall panels delivered ready to install — dramatically reducing on-site labour time and ensuring consistent quality for high-rise commercial towers and corporate headquarters.',
        bullets: ['Pre-fabricated panels for rapid installation', 'Factory-controlled quality & weather sealing', 'Ideal for high-rise buildings above 10 storeys'],
        cta: 'Enquire about Unitized Systems',
        images: ['/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg', '/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg', '/assets/service/Curtain-wall/archg-20261010-163654-5a70c6.webp'],
      },
      {
        title: 'Semi-Structural Glazing Facades',
        description: 'Semi-structural silicone-bonded glass facades that eliminate visible aluminum caps on the exterior — creating a smooth, flush glass surface for modern architectural projects demanding clean sightlines.',
        bullets: ['Flush exterior glass with hidden aluminum framing', 'Structural silicone bonding for weather-tight seal', 'Compatible with tinted, reflective & Low-E glass'],
        cta: 'Enquire about Structural Glazing',
        images: ['/assets/service/Curtain-wall/archg-20261010-165450-8af689.jpg', '/assets/service/Curtain-wall/arch-louvers-2.jpg', '/assets/service/Curtain-wall/arch-louvers-3.jpg'],
      },
    ],
    group2Label: 'Spider Glass Systems',
    group2Heading: 'Point-Fixed & Cable-Supported Glass',
    group2Description: 'Minimalist point-fixed spider fittings and cable-supported glass walls for maximum transparency — engineered for atriums, showrooms, hotel lobbies, and landmark entrances.',
    group2Sections: [
      {
        title: 'Point-Fixed Spider Glass Systems',
        description: 'Minimalist point-fixed spider glass systems using precision-machined stainless steel spider arms and routel fittings — creating transparent, floating glass facades for showrooms, atriums, and building lobbies.',
        bullets: ['Grade 316 stainless steel spider arms & routels', 'Countersunk bolt fittings for flush glass surface', '12mm tempered or laminated safety glass panels'],
        cta: 'Enquire about Spider Glass',
        images: ['/assets/service/Curtain-wall/archg-20261010-165034-ba92b6.jpg', '/assets/service/Curtain-wall/archg-20261010-163055-e7f084.webp', '/assets/service/Curtain-wall/archg-20261010-202431-54967d.jpg'],
      },
      {
        title: 'Cable-Supported Glass Walls',
        description: 'Ultra-transparent cable-supported glass wall systems where stainless steel tension cables replace traditional frames — delivering maximum transparency for grand atriums, hotel lobbies, and landmark entrances.',
        bullets: ['High-tensile stainless steel cable rigging', 'Maximum transparency with minimal structure', 'Engineered for large-span glass installations'],
        cta: 'Enquire about Cable Glass Walls',
        images: ['/assets/service/Curtain-wall/archg-20261010-193015-7462db.jpg', '/assets/service/Curtain-wall/arch-louvers-3.jpg', '/assets/service/Curtain-wall/archg-20261010-193156-66aa8b.jpg'],
      },
      {
        title: 'Double-Glazed Insulated Curtain Walls',
        description: 'Energy-efficient double-glazed insulated curtain wall units combining Low-E coated glass with argon-filled cavities — providing superior thermal insulation, UV protection, and acoustic performance for commercial buildings.',
        bullets: ['Low-E coated glass for solar heat rejection', 'Argon-filled cavity for thermal insulation', 'Acoustic dampening up to STC 38\u201345 dB'],
        cta: 'Enquire about Insulated Curtain Walls',
        images: ['/assets/service/Curtain-wall/arch-louvers-2.jpg', '/assets/service/Curtain-wall/archg-20261010-165450-8af689.jpg', '/assets/service/Curtain-wall/archg-20261010-163654-5a70c6.webp'],
      },
    ],
    ctaHeading: 'Planning a curtain wall facade or spider glass installation?',
  },

  'custom-aluminum-fabrication-page': {
    title: 'Custom Aluminum Fabrication',
    heroDescription: 'Customized aluminum louvers, pergolas, skylights, railings, and architectural cladding — built to exact blueprints with precision miter joints and baked powder coatings in any RAL shade.',
    heroLabel: 'Our Product Range',
    heroImage: '/assets/service/page1/archg-20261010-203458-b5ce20.jpg',
    group1Label: 'Fabrication Solutions',
    group1Heading: 'Architectural Aluminum Products',
    group1Description: 'In-house fabricated aluminum louvers, pergolas, and skylights — engineered for durability, weather resistance, and stunning architectural impact.',
    group1Sections: [
      {
        title: 'Aluminum Louvers & Sun Shading',
        description: 'Custom-fabricated aluminum louver systems for ventilation, sun shading, and decorative facade screening — controlling light, rain, and glare while enhancing building exteriors for commercial and residential projects across Lahore.',
        bullets: ['Fixed & adjustable blade configurations', 'Elliptical, flat & aerofoil blade profiles', 'Powder-coated in any RAL colour or wood-grain finish'],
        cta: 'Enquire about Aluminum Louvers',
        images: ['/assets/service/page1/archg-20261010-203458-b5ce20.jpg', '/assets/service/page1/archg-20261010-170759-7ff538.jpg', '/assets/service/page1/archg-20261010-170816-baa272.jpg'],
      },
      {
        title: 'Aluminum Pergolas & Canopies',
        description: 'Structural aluminum pergolas, terrace canopies, and car porch covers engineered for durability and weather resistance — featuring clean geometric lines and optional polycarbonate or glass roofing panels.',
        bullets: ['Heavy-gauge structural aluminum framework', 'Polycarbonate, glass & louvered roof options', 'Rust-free & maintenance-free for outdoor use'],
        cta: 'Enquire about Pergolas & Canopies',
        images: ['/assets/service/page1/archg-20261010-165444-5de1e7.webp', '/assets/service/page1/project_12.jpg', '/assets/service/page1/archg-20261010-193015-7462db.jpg'],
      },
      {
        title: 'Skylights & Roof Glazing',
        description: 'Custom aluminum-framed skylights and roof glazing systems that flood interiors with natural daylight — engineered with watertight sealing, safety glass, and optional motorized ventilation for atriums and living spaces.',
        bullets: ['Laminated safety glass for overhead applications', 'Thermally broken frames to prevent condensation', 'Motorized opening vents for natural ventilation'],
        cta: 'Enquire about Skylights',
        images: ['/assets/service/page1/archg-20261010-163055-e7f084.webp', '/assets/service/page1/archg-20261010-170457-0d784f.webp', '/assets/service/page1/archg-20261010-163114-517d63.jpg'],
      },
    ],
    group2Label: 'Metalwork & Cladding',
    group2Heading: 'Railings, Cladding & Custom Profiles',
    group2Description: 'Custom aluminum railings, ACP cladding panels, and precision profile bending — fabricated in our workshop to exact architectural specifications.',
    group2Sections: [
      {
        title: 'Aluminum Railings & Balustrades',
        description: 'Custom-designed aluminum railings for staircases, balconies, terraces, and mezzanines — lightweight yet structurally strong with precision miter joints and premium baked powder-coat finishes in any colour.',
        bullets: ['Precision miter joints for seamless corners', 'Glass-infill, cable-infill & horizontal bar designs', 'Baked powder-coat finish in any RAL shade'],
        cta: 'Enquire about Railings',
        images: ['/assets/service/page1/archg-20261010-165450-8af689.jpg', '/assets/service/page1/archg-20261010-193253-1779ec.jpg', '/assets/service/page1/archg-20261010-165450-8af689 (1).jpg'],
      },
      {
        title: 'Architectural Cladding & Panels',
        description: 'Aluminum composite panel (ACP) cladding and custom sheet metal facades for building exteriors, column covers, and fascia trims — delivering clean modern aesthetics with weather-resistant durability.',
        bullets: ['ACP & solid aluminum panel options', 'Custom folding, bending & CNC routing', 'Fire-rated & non-combustible panel grades available'],
        cta: 'Enquire about Cladding',
        images: ['/assets/service/page1/archg-20261010-170816-baa272.jpg', '/assets/service/page1/archg-20261010-170457-0d784f (1).webp', '/assets/service/page1/archg-20261010-170759-7ff538.jpg'],
      },
      {
        title: 'Custom Profile Bending & Extrusion Work',
        description: 'In-house aluminum profile bending, cutting, and custom extrusion fabrication to exact architectural blueprints — from curved curtain wall mullions to decorative trim sections and specialized structural members.',
        bullets: ['CNC precision cutting & profile bending', 'Stainless steel concealed fasteners & brackets', 'Architectural drawings consultation included'],
        cta: 'Enquire about Custom Fabrication',
        images: ['/assets/service/page1/archg-20261010-170039-b19946.png', '/assets/service/page1/archg-20261010-203458-b5ce20.jpg', '/assets/service/page1/archg-20261010-163114-517d63 (1).jpg'],
      },
    ],
    ctaHeading: 'Need custom aluminum fabrication for your project?',
  },
  // ═══════════════ CONTACT ═══════════════
  contact: {
    heading: "Let's Build Something Together",
    description:
      'Contact us for a free consultation and quotation. We serve all areas of Lahore.',
    address: '196-A Main Multan Road, Lahore, Punjab 54000',
    phone: '0320-2740066',
    email: 'basitalialuminumandglassworks@gmail.com',
    whatsapp: '0320-2740066',
    workingHours: 'Mon - Sun: 8:00 AM - 10:00 PM (Emergency 24/7)',
    mapEmbedUrl:
      'https://www.google.com/maps?q=196-A+Main+Multan+Rd,+Lahore,+54000,+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },

  // ═══════════════ NAVIGATION ═══════════════
  navigation: {
    logo: '/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png',
    logoText: 'Basit Ali',
    ctaLabel: 'Free Measurement',
    ctaLink: '/contact',
  },

  // ═══════════════ FOOTER ═══════════════
  footer: {
    businessName: 'Basit Ali Aluminum & Glass Work',
    description:
      'Professional architectural aluminum and glass solutions across Lahore. Specializing in sliding windows, frameless glass partitions, shower cabins, shop fronts, and 24/7 emergency repairs throughout the week.',
    phone: '0320-2740066',
    email: 'basitalialuminumandglassworks@gmail.com',
    address: '196-A Main Multan Road, Lahore, Punjab 54000',
    copyrightText:
      'Basit Ali Aluminum & Glass Work. All rights reserved.',
  },

  // ═══════════════ SITEMAP PAGE ═══════════════
  'sitemap-page': {
    heading: 'Sitemap',
    description:
      'Browse all pages on the Basit Ali Aluminum & Glass Work website.',
  },

  // ═══════════════ SETTINGS ═══════════════
  settings: {
    businessName: 'Basit Ali Aluminum & Glass Work',
    tagline: 'Professional Architectural Aluminum & Glass Solutions in Lahore',
    logo: '/assets/aistudio/ChatGPT_Image_Sep_30__2026__03_47_25_PM_f9e8138f.png',
    favicon: '/icon.png',
    siteTitle:
      'Basit Ali Aluminum & Glass Work | Lahore Professional Services',
    brandColor: '#E31E27',
    accentColor: '#171717',
    metaDescription:
      'Premier aluminum windows, doors, glass partitions, shower cabins, shop fronts, tempered glass, and 24/7 emergency repair services across Lahore. Call 0320-2740066 for free measurement.',
    siteUrl: 'https://basitali-template1.vercel.app',
  },

  // ═══════════════ TERMS PAGE ═══════════════
  'terms-page': {
    title: 'Terms & Conditions',
    effectiveDate: '2024-01-01',
    intro:
      'These terms and conditions govern your use of the Basit Ali Aluminum & Glass Work website and services.',
    sections: [],
  },

  // ═══════════════ PRIVACY PAGE ═══════════════
  'privacy-page': {
    title: 'Privacy Policy',
    effectiveDate: '2024-01-01',
    intro:
      'This privacy policy explains how Basit Ali Aluminum & Glass Work collects, uses, and protects your personal information.',
    sections: [],
  },
};

// ── Upsert all sections ──

async function seed() {
  console.log('\n🔄 Seeding website content into Supabase...\n');

  let success = 0;
  let failed = 0;

  for (const [section, content] of Object.entries(sections)) {
    try {
      await upsertSection(section, content);
      console.log(`  ✓ ${section}`);
      success++;
    } catch (err) {
      console.error(`  ✗ ${section}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done! ${success} sections saved, ${failed} failed.\n`);
}

seed().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
