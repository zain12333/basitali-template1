export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  details: string;
  specs: string[];
  thumbnail: string;
  popular?: boolean;
  category: 'residential' | 'commercial' | 'emergency';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Glass Solutions' | 'Metal Work' | 'Aluminum Work' | 'Custom Fabrication';
  location: string;
  image: string;
  specs: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  quote: string;
  avatarBg: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CLIENT_INFO = {
  businessName: 'Basit Ali Aluminum & Glass Work',
  shortName: 'Basit Ali',
  phone: '0320-2740066',
  phoneTel: '03202740066',
  whatsApp: '0320-2740066',
  whatsAppUrl: 'https://wa.me/923202740066',
  email: 'basitalialuminumandglassworks@gmail.com',
  serviceArea: 'All Over Lahore, Punjab, Pakistan',
  emergencyAvailability: '24/7 Emergency Repairs Throughout the Week',
  workingHours: 'Mon - Sun: 8:00 AM - 10:00 PM (Emergency 24/7)',
  promises: [
    'Quality Workmanship',
    'Affordable Direct-Factory Prices',
    'Guaranteed On-Time Service',
    'Free Measurement & Free Quotation at Site'
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'aluminum-windows-doors',
    name: 'Aluminum Windows & Doors',
    description: 'We provide precision-engineered sliding, casement, and tilt-and-turn aluminum windows and doors ensuring effortless operation and long-lasting durability.',
    details: 'Custom fabricated using high-gauge aluminum sections (1.2mm, 1.6mm, 2.0mm) with thermal break and multi-point lock options. Available in matte black, champagne anodized, bronze, and architectural powder-coated finishes.',
    specs: ['Sliding & Casement systems', 'Sound & dust weather-stripping', 'Heavy-duty German brass rollers', 'Double glazing option for thermal insulation'],
    thumbnail: '/assets/images/aluminum_installation_craftsmen_1793184890381.jpg',
    popular: true,
    category: 'residential'
  },
  {
    id: 'glass-doors-partitions',
    name: 'Glass Doors & Partitions',
    description: 'Experience the elegance of frameless and slimline glass doors and wall partitions, creating a seamless, contemporary look for modern spaces.',
    details: 'Heavy 10mm or 12mm certified tempered safety glass with hydraulic patch fittings, concealed floor springs, and premium stainless steel pull handles.',
    specs: ['10mm & 12mm Toughened Glass', 'Dorma/Ozone grade patch fittings', 'Acoustic sound dampening', 'Frosted logos & privacy patterns'],
    thumbnail: '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
    popular: true,
    category: 'commercial'
  },
  {
    id: 'shower-cabins',
    name: 'Bathroom Glass Shower Cabins',
    description: 'Transform your bathroom into a luxury retreat with our expertly crafted frameless and sliding glass shower enclosures.',
    details: 'Custom measured to the millimeter for corner cabins, walk-in wet rooms, and sliding cubicles. Featuring anti-lime scale safety glass and 304-grade rustproof stainless steel hardware.',
    specs: ['Frameless 8mm / 10mm Tempered Glass', 'Anti-leak magnetic waterproof seals', 'Matt black, chrome or gold fittings', 'Custom corner & sliding configurations'],
    thumbnail: '/assets/images/luxury_glass_shower_cabin_1793184890693.jpg',
    popular: true,
    category: 'residential'
  },
  {
    id: 'shop-fronts',
    name: 'Shop Fronts & Commercial Entrances',
    description: 'Striking commercial glass facades and high-visibility shopfronts that captivate retail customers while providing maximum security.',
    details: 'Engineered for retail plazas, boutiques, and restaurants across Lahore shopping hubs. Built with heavy-duty aluminum perimeter frames and shatter-resistant safety glass.',
    specs: ['12mm Clear Tempered Glass', 'Security locking bars & panic exit hardware', 'High wind-load engineered frames', 'Automatic sensor door compatibility'],
    thumbnail: '/assets/aistudio/image_93949657.png',
    popular: true,
    category: 'commercial'
  },
  {
    id: 'office-glass-work',
    name: 'Office Glass Work & Cabins',
    description: 'Professional acoustic meeting pods, executive cabin partitions, and frosted glass branding tailored for corporate environments.',
    details: 'Sleek acoustic glass walls that optimize natural ambient light while keeping corporate meetings private and sound-insulated.',
    specs: ['Acoustic STC rating 38-42 dB', 'Custom frosted privacy vinyl graphics', 'Slimline black aluminum profiles', 'Integrated cable pass-throughs'],
    thumbnail: '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
    category: 'commercial'
  },
  {
    id: 'tempered-glass-installation',
    name: 'Tempered Glass Installation',
    description: 'Certified heat-treated safety glass installation 5x stronger than standard glass, meeting all local Lahore construction standards.',
    details: 'Available in 8mm, 10mm, and 12mm thickness with polished beveled edges, countersunk holes, and CNC cut-outs for handles and hinges.',
    specs: ['Thermal shock & impact resistant', 'Shatter-safe blunt pebble fracturing', 'Available in ultra-clear, bronze, & grey tints', 'Certified compliance test certificates'],
    thumbnail: '/assets/aistudio/image_68f2d2fe.png',
    category: 'residential'
  },
  {
    id: 'vertical-blinds',
    name: 'Vertical Blinds & Roller Shades',
    description: 'Functional, elegant vertical blinds, zebra blinds, and sunscreen roller shades providing superior solar control and privacy.',
    details: 'Smooth operating track systems engineered for wide aluminum windows, sliding patio doors, and executive glass offices.',
    specs: ['Blackout and solar-screen fabric choices', 'UV fade-resistant polyester vanes', 'Motorized remote control options', 'Custom made to exact window frame sizes'],
    thumbnail: '/assets/aistudio/image_4e455762.png',
    category: 'residential'
  },
  {
    id: 'curtain-wall',
    name: 'Curtain Wall & Spider Glass Systems',
    description: 'Striking building facades and spider glass system installations engineered with exceptional structural integrity and weather tightness.',
    details: 'Full exterior glass envelope systems for commercial plazas, auto dealerships, and corporate headquarters across Lahore.',
    specs: ['Heavy architectural structural glazing', 'Grade 316 stainless steel spider arms', 'Double glazed Low-E units', 'Seismic and wind pressure certified'],
    thumbnail: '/assets/aistudio/image_3fd3ab96.png',
    popular: true,
    category: 'commercial'
  },
  {
    id: 'mirrors-glass-repair',
    name: 'Mirrors & 24/7 Glass Repair Services',
    description: 'Emergency 24/7 cracked glass replacement, roller repairs, and custom wall-to-wall LED beveled mirrors for gyms, salons, and homes.',
    details: 'When a window breaks, a shopfront cracks, or a glass door jams off its track, our emergency crew arrives promptly across Lahore.',
    specs: ['24/7 emergency dispatch hotline', 'Broken glass removal & temporary boarding', 'Track & roller hinge realignment', 'Custom beveled vanity & gym mirrors'],
    thumbnail: '/assets/images/aluminum_installation_craftsmen_1793184890381.jpg',
    popular: true,
    category: 'emergency'
  },
  {
    id: 'custom-aluminum-fabrication',
    name: 'Custom Aluminum Fabrication',
    description: 'Customized aluminum louvers, pergolas, skylights, railings, and architectural cladding built to exact architectural blueprints.',
    details: 'Our in-house fabrication workshop builds custom aluminum sections with precision miter joints and baked powder coatings in any RAL shade.',
    specs: ['Custom profile extrusion bending', 'Weatherproof baked powder-coat finish', 'Stainless steel concealed fasteners', 'Architectural drawings consultation'],
    thumbnail: '/assets/images/hero_aluminum_glass_facade_1793184890767.jpg',
    category: 'commercial'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Architectural Stainless Steel Glass Stair Balustrade',
    category: 'Metal Work',
    location: 'DHA Phase 6, Lahore',
    image: '/assets/projects/project_1.png',
    specs: 'Grade 316 Stainless Steel Handrail · 12mm Toughened Safety Glass',
    description: 'Custom fabricated stainless steel balustrade with beveled tempered glass panels on floating marble staircase.'
  },
  {
    id: 'proj-2',
    title: 'Modern Black Aluminum Frame Glass Staircase Enclosure',
    category: 'Aluminum Work',
    location: 'Gulberg III, Lahore',
    image: '/assets/projects/project_2.png',
    specs: 'Matte Black Thermal Powder-Coated Aluminum · 10mm Clear Tempered Glass',
    description: 'Sleek floor-to-ceiling glass partition wall with integrated acoustic dampening along interior wooden staircase.'
  },
  {
    id: 'proj-3',
    title: 'Modern Glass Pergola & Aluminum Terrace Room',
    category: 'Custom Fabrication',
    location: 'Model Town, Lahore',
    image: '/assets/projects/project_3.png',
    specs: 'Heavy Structural Aluminum Beams · 12mm Heat-Reflective Laminated Glass',
    description: 'Four-season luxury garden conservatory with bi-folding aluminum doors overlooking skyline and lawn.'
  },
  {
    id: 'proj-4',
    title: 'Luxury Bathroom Glass Shower & Arched Backlit Mirror',
    category: 'Glass Solutions',
    location: 'Bahria Town Sector C, Lahore',
    image: '/assets/projects/project_4.png',
    specs: '10mm Anti-Lime Scale Tempered Glass · Matt Black 304 Hinges · Custom LED Mirror',
    description: 'Frameless walk-in glass shower cabin with magnetic watertight seals and bespoke beveled vanity mirror.'
  },
  {
    id: 'proj-5',
    title: 'Architectural Patio Sliding Glass Doors with Garden View',
    category: 'Aluminum Work',
    location: 'DHA Phase 5, Lahore',
    image: '/assets/projects/project_5.png',
    specs: 'Heavy 2.0mm Multi-Track Sliding Aluminum · Double Glazed Low-E Glass',
    description: 'Expansive multi-panel patio sliding system connecting luxury lounge seamlessly to outdoor terrace courtyard.'
  },
  {
    id: 'proj-6',
    title: 'Commercial Tempered Glass Entrance Doors with Stainless Trim',
    category: 'Glass Solutions',
    location: 'MM Alam Road, Gulberg, Lahore',
    image: '/assets/projects/project_6.png',
    specs: '12mm Clear Safety Glass · Heavy-Duty Concealed Floor Springs · Gold PVD Trim',
    description: 'Double swing commercial entrance doors with high-security locks for upscale boutique storefront.'
  },
  {
    id: 'proj-7',
    title: 'Modern Glass Balustrade Staircase with Dark Treads',
    category: 'Glass Solutions',
    location: 'Johar Town, Lahore',
    image: '/assets/projects/project_7.png',
    specs: '12mm Tempered Laminated Glass · Black Anodized Slim Capping Rail',
    description: 'Minimalist glass side-mounted balustrade providing open aesthetic and tested impact protection.'
  },
  {
    id: 'proj-8',
    title: 'Glass Elevator Shaft & Double Height Atrium Glazing',
    category: 'Custom Fabrication',
    location: 'Lahore Cantt, Lahore',
    image: '/assets/projects/project_8.png',
    specs: 'Point-Fixed Spider Glazing · 12mm Laminated Clear Safety Glass',
    description: 'Panoramic glass elevator enclosure and mezzanine atrium railings in private multi-storey residence.'
  },
  {
    id: 'proj-9',
    title: 'Frameless Glass Swimming Pool Safety Balustrade',
    category: 'Metal Work',
    location: 'Lake City, Lahore',
    image: '/assets/projects/project_9.png',
    specs: 'Duplex 2205 Stainless Steel Spigots · 12mm Toughened Clear Glass',
    description: 'Corrosion-proof pool perimeter glass barrier ensuring unhindered views with maximum safety.'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    name: 'Ammar Malik',
    role: 'Lead Interior Designer',
    location: 'DHA Phase 5, Lahore',
    quote: 'Basit Ali Aluminum & Glass has been our go-to contractor for premium residential projects in Lahore. Their team is punctual, the miter joints on aluminum doors are razor sharp, and their 10mm tempered glass shower cabins are flawless. Highly recommended!',
    avatarBg: 'bg-amber-600'
  },
  {
    name: 'Fatima Ali',
    role: 'Operations & Facility Manager',
    location: 'Gulberg Corporate Towers, Lahore',
    quote: 'We contracted Basit Ali for full-floor office glass partitions and emergency door repair. Their on-time completion, safety standards, and immediate WhatsApp responsiveness sets them far apart from ordinary vendors. True professionals.',
    avatarBg: 'bg-emerald-600'
  },
  {
    name: 'Engr. Sarah Ahmed',
    role: 'Principal Architectural Consultant',
    location: 'Bahria Town, Lahore',
    quote: 'As an architect, structural precision and glass clarity are paramount. Basit Ali’s team executed complex curtain walling and frameless glass balustrades exactly to our CAD drawings. Their free measurement and rapid quotation were incredibly transparent.',
    avatarBg: 'bg-rose-600'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'What areas across Lahore does Basit Ali Aluminum & Glass serve?',
    answer: 'We serve all residential and commercial sectors across Lahore, including DHA (Phases 1-9), Gulberg, Bahria Town, Model Town, Johar Town, Cantt, Wapda Town, Garden Town, Faisal Town, Allama Iqbal Town, Lake City, Askari, and Raiwind Road. Our mobile measurement van covers the entire city.'
  },
  {
    question: 'Do you provide free on-site measurement and quotation?',
    answer: 'Yes! We provide 100% free on-site visits, measurements, and formal written quotations anywhere in Lahore with zero obligation. Call or WhatsApp us at 0320-2740066 to schedule a convenient appointment.'
  },
  {
    question: 'How does your 24/7 Emergency Glass Repair service work?',
    answer: 'Accidents and storm damage happen at any hour. Our emergency team is on standby 24/7 throughout the week for broken shopfront glass, shattered patio doors, detached sliding rollers, and urgent safety boarding across Lahore. Call 0320-2740066 immediately for priority dispatch.'
  },
  {
    question: 'What types of aluminum profiles and glass thickness do you use?',
    answer: 'We utilize prime architectural-grade aluminum profiles (1.2mm, 1.6mm, and 2.0mm heavy gauge) in powder-coated matte black, champagne anodized, silver, and wood-grain finishes. Glass options range from 8mm, 10mm, and 12mm certified tempered safety glass to acoustic double-glazed insulated units.'
  },
  {
    question: 'What warranty or guarantee do you provide on your installations?',
    answer: 'We offer an extensive 5-year guarantee on our aluminum fabrication and structural seals, along with manufacturer warranties on imported hardware, rollers, hydraulic floor hinges, and stainless steel fittings.'
  },
  {
    question: 'How quickly can a typical project like windows or a shower cabin be completed?',
    answer: 'Standard shower cabins and glass doors are typically fabricated and installed within 3 to 5 business days after final site measurement. Complete home aluminum window packages usually take 7 to 10 working days.'
  }
];

export const LAHORE_AREAS = [
  'DHA Lahore (Phases 1-9)',
  'Gulberg (I, II, III, IV, V)',
  'Model Town',
  'Johar Town',
  'Bahria Town & Bahria Orchard',
  'Lahore Cantt & Cavalry Ground',
  'Wapda Town & PIA Housing',
  'Faisal Town & Garden Town',
  'Allama Iqbal Town & Sabzazar',
  'Lake City & Valencia Town',
  'Askari (1 through 11)',
  'Shadman & Jail Road',
  'Mall Road & Gulshan-e-Ravi',
  'Raiwind Road & Pine Avenue'
];
