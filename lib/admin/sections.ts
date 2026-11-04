// ──────────────────────────────────────────────
// CMS Section Type System
// ──────────────────────────────────────────────

// ── Field-definition types ──

export interface BaseFieldDef {
  name: string;
  label: string;
  help?: string;
  optional?: boolean;
  span?: 1 | 2;
}

export interface TextFieldDef extends BaseFieldDef {
  type: 'text';
  placeholder?: string;
}

export interface TextareaFieldDef extends BaseFieldDef {
  type: 'textarea';
  rows?: number;
  placeholder?: string;
}

export interface NumberFieldDef extends BaseFieldDef {
  type: 'number';
}

export interface ImageFieldDef extends BaseFieldDef {
  type: 'image';
  fit?: 'cover' | 'contain' | 'avatar';
}

export interface IconFieldDef extends BaseFieldDef {
  type: 'icon';
}

export interface ColorFieldDef extends BaseFieldDef {
  type: 'color';
}

export type ItemFieldDef =
  | TextFieldDef
  | TextareaFieldDef
  | NumberFieldDef
  | ImageFieldDef
  | IconFieldDef
  | ColorFieldDef
  | StringListFieldDef;

export interface StringListFieldDef extends BaseFieldDef {
  type: 'stringList';
  placeholder?: string;
  addLabel?: string;
  min?: number;
  max?: number;
  variant?: 'image';
}

export interface ObjectListFieldDef extends BaseFieldDef {
  type: 'objectList';
  itemLabel: string;
  fields: ItemFieldDef[];
  addLabel?: string;
  min?: number;
  max?: number;
}

export interface HeadingFieldDef {
  type: 'heading';
  label: string;
  help?: string;
}

export type FieldDef =
  | ItemFieldDef
  | StringListFieldDef
  | ObjectListFieldDef
  | HeadingFieldDef;

export type ListItem = Record<string, string | number | string[]>;
export type SectionValues = Record<
  string,
  string | number | string[] | ListItem[]
>;

export interface SectionDef {
  slug: string;
  title: string;
  description: string;
  group:
    | 'homepage'
    | 'about'
    | 'service-pages'
    | 'contact'
    | 'legal'
    | 'sitewide'
    | 'site';
  icon: string;
  href: string;
  fields: FieldDef[];
  defaults: SectionValues;
}

// ── Helper for service pages ──

function servicePageDef(
  slug: string,
  title: string,
  defaultDescription: string,
  href: string,
): SectionDef {
  return {
    slug,
    title,
    description: `Manage content for the ${title} service page.`,
    group: 'service-pages',
    icon: 'wrench',
    href,
    fields: [
      { type: 'heading', label: 'Hero Banner' },
      { type: 'text', name: 'title', label: 'Page Title' },
      {
        type: 'textarea',
        name: 'heroDescription',
        label: 'Hero Description',
        rows: 2,
        optional: true,
      },
      { type: 'text', name: 'heroLabel', label: 'Hero Label', optional: true },
      {
        type: 'image',
        name: 'heroImage',
        label: 'Hero Background Image',
        fit: 'cover',
      },
      { type: 'heading', label: 'Product Sections' },
      { type: 'text', name: 'sectionLabel', label: 'Section Label', optional: true },
      { type: 'text', name: 'sectionHeading', label: 'Section Heading', optional: true },
      {
        type: 'textarea',
        name: 'sectionDescription',
        label: 'Section Description',
        rows: 2,
        optional: true,
      },
      {
        type: 'objectList',
        name: 'sections',
        label: 'Service Sections',
        itemLabel: 'Section',
        addLabel: 'Add section',
        min: 1,
        max: 15,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            rows: 3,
          },
          {
            type: 'stringList',
            name: 'bullets',
            label: 'Bullet Points',
            addLabel: 'Add bullet',
            placeholder: 'Enter a feature point',
            min: 1,
            max: 8,
          },
          { type: 'text', name: 'cta', label: 'CTA Button Text' },
          {
            type: 'stringList',
            name: 'images',
            label: 'Slider Images',
            addLabel: 'Add image',
            placeholder: '/assets/service/...',
            min: 1,
            max: 10,
            variant: 'image',
          },
        ],
      },
      { type: 'heading', label: 'Bottom CTA' },
      { type: 'text', name: 'ctaHeading', label: 'CTA Heading', optional: true },
    ],
    defaults: {
      title,
      heroDescription: defaultDescription,
      heroLabel: '',
      heroImage: '',
      sectionLabel: '',
      sectionHeading: '',
      sectionDescription: '',
      sections: [],
      ctaHeading: '',
    },
  };
}

function servicePageDualGroupDef(
  slug: string,
  title: string,
  defaultDescription: string,
  href: string,
): SectionDef {
  const sectionFields: ItemFieldDef[] = [
    { type: 'text', name: 'title', label: 'Title' },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      rows: 3,
    },
    {
      type: 'stringList',
      name: 'bullets',
      label: 'Bullet Points',
      addLabel: 'Add bullet',
      placeholder: 'Enter a feature point',
      min: 1,
      max: 8,
    },
    { type: 'text', name: 'cta', label: 'CTA Button Text' },
    {
      type: 'stringList',
      name: 'images',
      label: 'Slider Images',
      addLabel: 'Add image',
      placeholder: '/assets/service/...',
      min: 1,
      max: 10,
      variant: 'image',
    },
  ];

  return {
    slug,
    title,
    description: `Manage content for the ${title} service page.`,
    group: 'service-pages',
    icon: 'wrench',
    href,
    fields: [
      { type: 'heading', label: 'Hero Banner' },
      { type: 'text', name: 'title', label: 'Page Title' },
      {
        type: 'textarea',
        name: 'heroDescription',
        label: 'Hero Description',
        rows: 2,
        optional: true,
      },
      { type: 'text', name: 'heroLabel', label: 'Hero Label', optional: true },
      {
        type: 'image',
        name: 'heroImage',
        label: 'Hero Background Image',
        fit: 'cover',
      },
      { type: 'heading', label: 'Section Group 1' },
      { type: 'text', name: 'group1Label', label: 'Group 1 Label', optional: true },
      { type: 'text', name: 'group1Heading', label: 'Group 1 Heading', optional: true },
      {
        type: 'textarea',
        name: 'group1Description',
        label: 'Group 1 Description',
        rows: 2,
        optional: true,
      },
      {
        type: 'objectList',
        name: 'group1Sections',
        label: 'Group 1 Sections',
        itemLabel: 'Section',
        addLabel: 'Add section',
        min: 1,
        max: 10,
        fields: sectionFields,
      },
      { type: 'heading', label: 'Section Group 2' },
      { type: 'text', name: 'group2Label', label: 'Group 2 Label', optional: true },
      { type: 'text', name: 'group2Heading', label: 'Group 2 Heading', optional: true },
      {
        type: 'textarea',
        name: 'group2Description',
        label: 'Group 2 Description',
        rows: 2,
        optional: true,
      },
      {
        type: 'objectList',
        name: 'group2Sections',
        label: 'Group 2 Sections',
        itemLabel: 'Section',
        addLabel: 'Add section',
        min: 1,
        max: 10,
        fields: sectionFields,
      },
      { type: 'heading', label: 'Bottom CTA' },
      { type: 'text', name: 'ctaHeading', label: 'CTA Heading', optional: true },
    ],
    defaults: {
      title,
      heroDescription: defaultDescription,
      heroLabel: '',
      heroImage: '',
      group1Label: '',
      group1Heading: '',
      group1Description: '',
      group1Sections: [],
      group2Label: '',
      group2Heading: '',
      group2Description: '',
      group2Sections: [],
      ctaHeading: '',
    },
  };
}

// ── Section definitions ──

export const SECTIONS: SectionDef[] = [
  // ───────────── HOMEPAGE ─────────────

  {
    slug: 'hero',
    title: 'Main Banner',
    description:
      'The headline, carousel images, and buttons visitors see first on the homepage.',
    group: 'homepage',
    icon: 'layout',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Headline' },
      {
        type: 'text',
        name: 'highlightedPhrase',
        label: 'Highlighted Phrase',
        help: 'Must appear in the headline. Shown in brand colour.',
        optional: true,
      },
      {
        type: 'textarea',
        name: 'subheadline',
        label: 'Subheadline',
        rows: 3,
      },
      { type: 'heading', label: 'Carousel Images' },
      {
        type: 'objectList',
        name: 'heroImages',
        label: 'Hero Carousel Images',
        itemLabel: 'Slide',
        addLabel: 'Add slide',
        min: 1,
        max: 10,
        fields: [
          { type: 'image', name: 'src', label: 'Image', fit: 'cover' },
          { type: 'text', name: 'alt', label: 'Alt Text' },
        ],
      },
      { type: 'heading', label: 'Buttons' },
      {
        type: 'text',
        name: 'primaryButtonLabel',
        label: 'Primary Button Label',
        span: 1,
      },
      {
        type: 'text',
        name: 'primaryButtonLink',
        label: 'Primary Button Link',
        span: 1,
      },
      {
        type: 'text',
        name: 'secondaryButtonLabel',
        label: 'Secondary Button Label',
        span: 1,
        optional: true,
      },
      {
        type: 'text',
        name: 'secondaryButtonLink',
        label: 'Secondary Button Link',
        span: 1,
        optional: true,
      },
    ],
    defaults: {
      heading: 'Aluminum & Glass Solutions In Lahore',
      highlightedPhrase: 'Aluminum & Glass',
      subheadline:
        'Basit Ali is emerging as a top choice, offering superior aluminum windows, doors, and custom railings for homes and businesses throughout Lahore.',
      heroImages: [
        { src: '/assets/images/hero_bedroom_glass_doors.webp', alt: 'Luxury bedroom with sliding aluminum and glass doors' },
        { src: '/assets/images/herosection1.jpg', alt: 'Professional glass installation work' },
        { src: '/assets/images/herosection2.jpg', alt: 'Premium aluminum window frames' },
        { src: '/assets/images/herosection3.jpg', alt: 'Commercial glass facade installation' },
        { src: '/assets/images/herosection4.jpg', alt: 'Modern aluminum and glass door installation' },
      ],
      primaryButtonLabel: 'OUR SERVICES',
      primaryButtonLink: '/services',
      secondaryButtonLabel: '',
      secondaryButtonLink: '',
    },
  },

  {
    slug: 'about-homepage',
    title: 'About Basit Ali',
    description: 'The about preview section on the homepage.',
    group: 'homepage',
    icon: 'building',
    href: '/#about',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'text', name: 'tagline', label: 'Tagline', optional: true },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 4,
      },
      { type: 'image', name: 'image', label: 'Foreground Image', fit: 'cover' },
      { type: 'image', name: 'backgroundImage', label: 'Background Image', fit: 'cover', optional: true },
      {
        type: 'objectList',
        name: 'stats',
        label: 'Statistics',
        itemLabel: 'Stat',
        addLabel: 'Add stat',
        min: 1,
        max: 6,
        fields: [
          { type: 'text', name: 'label', label: 'Label' },
          { type: 'text', name: 'value', label: 'Value' },
        ],
      },
    ],
    defaults: {
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
  },

  {
    slug: 'facilities',
    title: 'Core Facilities',
    description: 'Facility highlights with images shown below the about section.',
    group: 'homepage',
    icon: 'briefcase',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'subtitle',
        label: 'Subtitle',
        rows: 2,
        optional: true,
      },
      {
        type: 'objectList',
        name: 'items',
        label: 'Facilities',
        itemLabel: 'Facility',
        addLabel: 'Add facility',
        min: 1,
        max: 8,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          {
            type: 'textarea',
            name: 'description',
            label: 'Short Description',
            rows: 2,
          },
          { type: 'image', name: 'image', label: 'Image', fit: 'cover' },
          { type: 'text', name: 'badge', label: 'Badge Text' },
          {
            type: 'textarea',
            name: 'details',
            label: 'Detailed Description',
            rows: 3,
          },
        ],
      },
    ],
    defaults: {
      heading: 'Our Core Facilities & Specialties',
      subtitle: 'A complete, integrated aluminium processing operation — from molten metal to finished, coated profiles.',
      items: [
        {
          title: 'Billets Plant',
          description: 'Superior alloy 6063 billets produced in-house, homogenized and 100% ultrasonically inspected.',
          image: '/assets/images/billets.jpg',
          badge: 'In-House',
          details: 'Our state-of-the-art billets plant produces premium 6063 alloy billets with precise chemical composition control.',
        },
        {
          title: 'Extrusion Plant',
          description: 'A comprehensive range of aluminium sections for commercial, residential & industrial use.',
          image: '/assets/images/extrusion-plant.jpg',
          badge: 'Since 2023',
          details: 'Our modern extrusion plant delivers a wide variety of aluminum profiles for windows, doors, curtain walls.',
        },
        {
          title: 'Dies Facility',
          description: 'Dies designed with the latest CAD software and manufactured using modern CNC technology.',
          image: '/assets/images/dies.jpg',
          badge: 'CNC',
          details: 'Our in-house die facility uses cutting-edge CAD/CAM software and CNC machining centers.',
        },
      ],
    },
  },

  {
    slug: 'services-homepage',
    title: 'Services Section',
    description: 'Services grid on the homepage with images and descriptions.',
    group: 'homepage',
    icon: 'list',
    href: '/#services',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 2,
        optional: true,
      },
      {
        type: 'objectList',
        name: 'services',
        label: 'Featured Services',
        itemLabel: 'Service',
        addLabel: 'Add service',
        min: 1,
        max: 12,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            rows: 2,
          },
          { type: 'image', name: 'image', label: 'Image', fit: 'cover' },
          { type: 'text', name: 'category', label: 'Category', optional: true },
        ],
      },
    ],
    defaults: {
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
          description: 'Our expertise includes the design and installation of curtain wall systems and spider systems.',
          image: '/assets/images/curtain_wall_office_glass_1793184891246.jpg',
          category: 'Commercial Facades',
        },
      ],
    },
  },

  {
    slug: 'projects-homepage',
    title: 'Projects Section',
    description: 'Manage the projects gallery with images, categories, and details.',
    group: 'homepage',
    icon: 'photo',
    href: '/#projects',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 2,
      },
      { type: 'heading', label: 'Projects' },
      {
        type: 'objectList',
        name: 'projects',
        label: 'Projects',
        itemLabel: 'Project',
        addLabel: 'Add project',
        min: 1,
        max: 30,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'text', name: 'category', label: 'Category', span: 1 },
          { type: 'text', name: 'location', label: 'Location', span: 1 },
          { type: 'image', name: 'image', label: 'Image', fit: 'cover' },
          { type: 'text', name: 'specs', label: 'Specs', optional: true },
          {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            rows: 2,
          },
        ],
      },
    ],
    defaults: {
      heading: 'Basit Ali Recent Projects',
      description: 'See our latest aluminum and glass installations across Lahore.',
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
      ],
    },
  },

  {
    slug: 'safety-banner',
    title: 'Safety Banner',
    description: 'Safety & HSE standards banner on the homepage.',
    group: 'homepage',
    icon: 'shield',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 2,
      },
    ],
    defaults: {
      heading: 'Safety & Quality First',
      description:
        'We adhere to the highest health, safety, and environmental standards on every project.',
    },
  },

  {
    slug: 'vision',
    title: 'Vision & Craftsmanship',
    description: 'Vision statement section on the homepage.',
    group: 'homepage',
    icon: 'eye',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 4,
      },
      { type: 'image', name: 'image', label: 'Image', fit: 'cover' },
    ],
    defaults: {
      heading: 'Basit Ali Vision',
      description:
        'Our vision is to be Lahore\'s most trusted provider of exceptional aluminum and glass solutions. We are dedicated to delivering unmatched craftsmanship, clean modern designs, and attentive customer service on every single installation.',
      image: '/assets/images/aluminum_installation_craftsmen_1793184890381.jpg',
    },
  },

  {
    slug: 'why-choose',
    title: 'Why Choose Us',
    description: 'Competitive advantages section on the homepage.',
    group: 'homepage',
    icon: 'star',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'objectList',
        name: 'reasons',
        label: 'Reasons',
        itemLabel: 'Reason',
        addLabel: 'Add reason',
        min: 1,
        max: 8,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            rows: 2,
          },
          { type: 'icon', name: 'icon', label: 'Icon' },
        ],
      },
    ],
    defaults: {
      heading: 'Why Choose Basit Ali',
      reasons: [
        {
          title: 'Quality Workmanship',
          description:
            'Precision engineering and premium materials for lasting results.',
          icon: 'star',
        },
        {
          title: 'Affordable Prices',
          description:
            'Direct factory prices without middlemen markup.',
          icon: 'chart',
        },
        {
          title: 'On-Time Service',
          description:
            'Guaranteed project completion within agreed timelines.',
          icon: 'clock',
        },
        {
          title: 'Free Quotation',
          description:
            'Free measurement and quotation at your site.',
          icon: 'clipboard',
        },
      ],
    },
  },

  {
    slug: 'testimonials',
    title: 'Client Reviews',
    description: 'Client testimonials displayed on the homepage.',
    group: 'homepage',
    icon: 'star',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'objectList',
        name: 'items',
        label: 'Reviews',
        itemLabel: 'Review',
        addLabel: 'Add a client review',
        min: 1,
        max: 12,
        fields: [
          { type: 'text', name: 'name', label: 'Client Name' },
          { type: 'text', name: 'role', label: 'Role / Title' },
          { type: 'text', name: 'location', label: 'Location' },
          {
            type: 'textarea',
            name: 'quote',
            label: 'Testimonial',
            rows: 3,
          },
          {
            type: 'color',
            name: 'avatarBg',
            label: 'Avatar Colour',
          },
        ],
      },
    ],
    defaults: {
      heading: 'What Our Clients Say',
      items: [
        {
          name: 'Ahmed Raza',
          role: 'Homeowner',
          location: 'DHA, Lahore',
          quote:
            'Basit Ali team installed beautiful aluminum windows in our new home. Excellent quality and finish. Highly recommended!',
          avatarBg: '#4F46E5',
        },
        {
          name: 'Fatima Sheikh',
          role: 'Business Owner',
          location: 'Gulberg, Lahore',
          quote:
            'The glass partition for our office was done perfectly. Professional team, on time and within budget.',
          avatarBg: '#059669',
        },
        {
          name: 'Usman Ali',
          role: 'Restaurant Owner',
          location: 'Mall Road, Lahore',
          quote:
            'Beautiful shop front glass work. Our restaurant looks amazing now. Great attention to detail.',
          avatarBg: '#DC2626',
        },
      ],
    },
  },

  {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    description: 'FAQ section displayed on the homepage.',
    group: 'homepage',
    icon: 'question',
    href: '/',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'objectList',
        name: 'items',
        label: 'Questions',
        itemLabel: 'Question',
        addLabel: 'Add a question',
        min: 1,
        max: 20,
        fields: [
          { type: 'text', name: 'question', label: 'Question' },
          {
            type: 'textarea',
            name: 'answer',
            label: 'Answer',
            rows: 3,
          },
        ],
      },
    ],
    defaults: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'Do you provide free measurement and quotation?',
          answer:
            'Yes, we offer completely free site measurement and quotation for all aluminum and glass projects in Lahore.',
        },
        {
          question: 'What areas do you serve?',
          answer:
            'We serve all areas of Lahore, Punjab, Pakistan. Our teams are available across DHA, Gulberg, Bahria Town, Model Town, and beyond.',
        },
        {
          question: 'Do you offer 24/7 emergency glass repair?',
          answer:
            'Yes, we provide round-the-clock emergency glass repair services throughout Lahore. Call 0320-2740066 any time.',
        },
      ],
    },
  },

  // ───────────── ABOUT ─────────────

  {
    slug: 'about-page',
    title: 'About Us Page',
    description: 'Full content for the About Us page with all sections and images.',
    group: 'about',
    icon: 'building',
    href: '/about-us',
    fields: [
      { type: 'heading', label: 'Hero Banner' },
      { type: 'image', name: 'heroBgImage', label: 'Hero Background Image', fit: 'cover' },
      { type: 'text', name: 'heroSubtitle', label: 'Hero Subtitle' },
      { type: 'text', name: 'heroTitle', label: 'Hero Title' },

      { type: 'heading', label: 'Our Journey Section' },
      { type: 'text', name: 'journeyLabel', label: 'Section Label' },
      { type: 'text', name: 'journeyHeading', label: 'Heading' },
      { type: 'text', name: 'journeySubheading', label: 'Subheading' },
      {
        type: 'textarea',
        name: 'journeyDescription',
        label: 'Description',
        rows: 4,
      },
      { type: 'image', name: 'journeyImage', label: 'Main Image (right side)', fit: 'cover' },
      { type: 'image', name: 'logoImage', label: 'Logo Badge Image', fit: 'contain', optional: true },

      { type: 'heading', label: 'Expertise & Customer Section' },
      { type: 'text', name: 'expertiseHeading', label: 'Expertise Heading' },
      {
        type: 'textarea',
        name: 'expertiseDescription',
        label: 'Expertise Description',
        rows: 3,
      },
      { type: 'text', name: 'customerHeading', label: 'Customer Satisfaction Heading' },
      {
        type: 'textarea',
        name: 'customerDescription',
        label: 'Customer Satisfaction Description',
        rows: 3,
      },
      { type: 'image', name: 'expertiseImage', label: 'Section Image (right side)', fit: 'cover' },

      { type: 'heading', label: 'International Standards' },
      { type: 'text', name: 'standardsHeading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'standardsDescription',
        label: 'Description',
        rows: 3,
      },

      { type: 'heading', label: 'Conclusion' },
      { type: 'text', name: 'conclusionHeading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'conclusionDescription',
        label: 'Description',
        rows: 3,
      },

      { type: 'heading', label: 'HSE Banner' },
      { type: 'text', name: 'hseHeading', label: 'HSE Heading' },
      {
        type: 'textarea',
        name: 'hseDescription',
        label: 'HSE Description',
        rows: 3,
      },

      { type: 'heading', label: 'Vision Section' },
      { type: 'text', name: 'visionHeading', label: 'Vision Heading' },
      {
        type: 'textarea',
        name: 'visionDescription',
        label: 'Vision Description',
        rows: 4,
      },
      { type: 'image', name: 'visionImage', label: 'Vision Image', fit: 'cover' },
      { type: 'text', name: 'visionBadgeText', label: 'Badge Text (e.g. 10+)', optional: true },
      { type: 'text', name: 'visionBadgeLabel', label: 'Badge Label (e.g. Years of Excellence)', optional: true },

      { type: 'heading', label: 'Why Choose Us Section' },
      { type: 'text', name: 'whyChooseLabel', label: 'Section Label' },
      { type: 'text', name: 'whyChooseHeading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'whyChooseDescription',
        label: 'Description',
        rows: 3,
      },
      { type: 'image', name: 'whyChooseBgLeft', label: 'Left Background Image', fit: 'cover' },
      { type: 'image', name: 'whyChooseBgRight', label: 'Right Background Image', fit: 'cover' },
      {
        type: 'objectList',
        name: 'advantages',
        label: 'Advantages',
        itemLabel: 'Advantage',
        addLabel: 'Add advantage',
        min: 1,
        max: 10,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'icon', name: 'icon', label: 'Icon' },
        ],
      },

      { type: 'heading', label: 'Blog Section' },
      { type: 'text', name: 'blogLabel', label: 'Section Label' },
      { type: 'text', name: 'blogHeading', label: 'Heading' },
      {
        type: 'objectList',
        name: 'blogPosts',
        label: 'Blog Posts',
        itemLabel: 'Post',
        addLabel: 'Add post',
        min: 1,
        max: 6,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'text', name: 'author', label: 'Author' },
          {
            type: 'textarea',
            name: 'excerpt',
            label: 'Excerpt',
            rows: 2,
          },
        ],
      },

      { type: 'heading', label: 'CTA Banner' },
      { type: 'image', name: 'ctaBgImage', label: 'CTA Background Image', fit: 'cover' },
      { type: 'text', name: 'ctaLabel', label: 'CTA Label' },
      { type: 'text', name: 'ctaHeading', label: 'CTA Heading' },
      { type: 'text', name: 'ctaSubtext', label: 'CTA Subtext', optional: true },
    ],
    defaults: {
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
            'Imagine a material abundant in nature, effortlessly shaping our world from towering skyscrapers to sleek cars. It\'s not magic; it\'s aluminum, the versatile metal transforming modern construction with its lightweight strength and corrosion resistance.',
        },
        {
          title: 'The Ultimate Guide to Custom Aluminum Fabrication in Lahore',
          author: 'Basit Ali Team · 2024',
          excerpt:
            'Welcome to the ultimate guide on custom aluminum fabrication. Aluminum\'s durability, versatility, and sleek appearance make it a popular choice for both residential and commercial projects across Lahore and Pakistan.',
        },
      ],

      ctaBgImage: '/assets/aboutus/image-1-min.jpg',
      ctaLabel: 'Upgrade to Premium Aluminum & Glass',
      ctaHeading: 'Experience Unmatched Quality with Basit Ali',
      ctaSubtext: 'and Enjoy Exceptional Craftsmanship and a Wide Range of Customizable Options.',
    },
  },

  // ───────────── SERVICE PAGES ─────────────

  servicePageDef(
    'aluminum-windows-doors-page',
    'Aluminum Windows & Doors',
    'Precision-engineered sliding, casement, and tilt-and-turn aluminum windows and doors ensuring effortless operation and long-lasting durability.',
    '/services/aluminum-windows-doors',
  ),

  servicePageDualGroupDef(
    'glass-doors-partitions-page',
    'Glass Doors & Partitions',
    'Premium tempered glass doors and partition systems — from frameless patch-fitting entrances to acoustic office dividers, engineered and installed across Lahore.',
    '/services/glass-doors-partitions',
  ),

  servicePageDualGroupDef(
    'shower-cabins-page',
    'Bathroom Glass Shower Cabins',
    'Custom frameless and sliding glass shower enclosures — from corner cabins to walk-in wet rooms, expertly measured and installed across Lahore.',
    '/services/shower-cabins',
  ),

  servicePageDef(
    'shop-fronts-page',
    'Shop Fronts & Commercial Entrances',
    'High-visibility commercial glass facades and shopfronts with maximum security for retail and commercial spaces.',
    '/services/shop-fronts',
  ),

  servicePageDef(
    'office-glass-work-page',
    'Office Glass Work & Cabins',
    'Professional acoustic meeting pods, executive cabin partitions, and frosted glass branding for corporate environments.',
    '/services/office-glass-work',
  ),

  servicePageDualGroupDef(
    'tempered-glass-page',
    'Tempered Glass Installation',
    'Certified heat-treated safety glass — 5x stronger than standard glass — available in clear, tinted, frosted, and laminated options for every construction need across Lahore.',
    '/services/tempered-glass-installation',
  ),

  servicePageDef(
    'vertical-blinds-page',
    'Vertical Blinds',
    'Premium vertical blinds in PVC, fabric, and aluminum for offices, homes, and commercial spaces.',
    '/services/vertical-blinds',
  ),

  servicePageDualGroupDef(
    'curtain-wall-page',
    'Curtain Wall & Spider Glass Systems',
    'Striking building facades and spider glass installations engineered with exceptional structural integrity, weather tightness, and architectural impact — for commercial landmarks across Lahore.',
    '/services/curtain-wall',
  ),

  servicePageDef(
    'mirrors-glass-repair-page',
    'Mirrors & Glass Repair',
    'Custom mirror design, installation, and 24/7 emergency glass repair services across Lahore.',
    '/services/mirrors-glass-repair',
  ),

  servicePageDualGroupDef(
    'custom-aluminum-fabrication-page',
    'Custom Aluminum Fabrication',
    'Customized aluminum louvers, pergolas, skylights, railings, and architectural cladding — built to exact blueprints with precision miter joints and baked powder coatings in any RAL shade.',
    '/services/custom-aluminum-fabrication',
  ),

  // ───────────── CONTACT ─────────────

  {
    slug: 'contact',
    title: 'Contact Us',
    description: 'Contact information and form settings.',
    group: 'contact',
    icon: 'phone',
    href: '/contact',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 2,
      },
      { type: 'heading', label: 'Contact Details' },
      { type: 'text', name: 'address', label: 'Address' },
      { type: 'text', name: 'phone', label: 'Phone Number', span: 1 },
      { type: 'text', name: 'email', label: 'Email', span: 1 },
      { type: 'text', name: 'whatsapp', label: 'WhatsApp Number', span: 1 },
      {
        type: 'text',
        name: 'workingHours',
        label: 'Working Hours',
        span: 1,
      },
      {
        type: 'textarea',
        name: 'mapEmbedUrl',
        label: 'Google Maps Embed URL',
        help: 'Paste the full iframe src URL from Google Maps embed.',
        rows: 2,
        optional: true,
      },
    ],
    defaults: {
      heading: 'Get in Touch',
      description:
        'Contact us for a free consultation and quotation. We serve all areas of Lahore.',
      address: '196-A Main Multan Road, Lahore, Punjab 54000',
      phone: '0320-2740066',
      email: 'basitalialuminumandglassworks@gmail.com',
      whatsapp: '0320-2740066',
      workingHours: 'Mon - Sun: 8:00 AM - 10:00 PM (Emergency 24/7)',
      mapEmbedUrl: '',
    },
  },

  // ───────────── LEGAL ─────────────

  {
    slug: 'terms-page',
    title: 'Terms & Conditions',
    description: 'Terms and conditions page content.',
    group: 'legal',
    icon: 'document',
    href: '/terms',
    fields: [
      { type: 'text', name: 'title', label: 'Page Title' },
      { type: 'text', name: 'effectiveDate', label: 'Effective Date' },
      {
        type: 'textarea',
        name: 'intro',
        label: 'Introduction',
        rows: 3,
      },
      {
        type: 'objectList',
        name: 'sections',
        label: 'Sections',
        itemLabel: 'Section',
        addLabel: 'Add section',
        min: 1,
        max: 20,
        fields: [
          { type: 'text', name: 'title', label: 'Section Title' },
          {
            type: 'textarea',
            name: 'body',
            label: 'Section Body',
            rows: 5,
          },
        ],
      },
    ],
    defaults: {
      title: 'Terms & Conditions',
      effectiveDate: '2024-01-01',
      intro:
        'These terms and conditions govern your use of the Basit Ali Aluminum & Glass Work website and services.',
      sections: [],
    },
  },

  {
    slug: 'privacy-page',
    title: 'Privacy Policy',
    description: 'Privacy policy page content.',
    group: 'legal',
    icon: 'shield',
    href: '/privacy',
    fields: [
      { type: 'text', name: 'title', label: 'Page Title' },
      { type: 'text', name: 'effectiveDate', label: 'Effective Date' },
      {
        type: 'textarea',
        name: 'intro',
        label: 'Introduction',
        rows: 3,
      },
      {
        type: 'objectList',
        name: 'sections',
        label: 'Sections',
        itemLabel: 'Section',
        addLabel: 'Add section',
        min: 1,
        max: 20,
        fields: [
          { type: 'text', name: 'title', label: 'Section Title' },
          {
            type: 'textarea',
            name: 'body',
            label: 'Section Body',
            rows: 5,
          },
        ],
      },
    ],
    defaults: {
      title: 'Privacy Policy',
      effectiveDate: '2024-01-01',
      intro:
        'This privacy policy explains how Basit Ali Aluminum & Glass Work collects, uses, and protects your personal information.',
      sections: [],
    },
  },

  // ───────────── SITEWIDE ─────────────

  {
    slug: 'navigation',
    title: 'Navigation',
    description: 'Top navigation bar configuration.',
    group: 'sitewide',
    icon: 'menu',
    href: '/',
    fields: [
      { type: 'image', name: 'logo', label: 'Logo', fit: 'contain' },
      { type: 'text', name: 'logoText', label: 'Logo Text' },
      { type: 'text', name: 'ctaLabel', label: 'CTA Button Label', span: 1 },
      { type: 'text', name: 'ctaLink', label: 'CTA Button Link', span: 1 },
    ],
    defaults: {
      logo: '/logo.jpg',
      logoText: 'Basit Ali',
      ctaLabel: 'Get a Quote',
      ctaLink: '/contact',
    },
  },

  {
    slug: 'footer',
    title: 'Footer',
    description: 'Footer content and links.',
    group: 'sitewide',
    icon: 'footer',
    href: '/',
    fields: [
      { type: 'text', name: 'businessName', label: 'Business Name' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 2,
      },
      { type: 'text', name: 'phone', label: 'Phone', span: 1 },
      { type: 'text', name: 'email', label: 'Email', span: 1 },
      { type: 'text', name: 'address', label: 'Address' },
      { type: 'text', name: 'copyrightText', label: 'Copyright Text' },
    ],
    defaults: {
      businessName: 'Basit Ali Aluminum & Glass Work',
      description:
        'Professional aluminum and glass solutions in Lahore. Quality workmanship, affordable prices, guaranteed on-time service.',
      phone: '0320-2740066',
      email: 'basitalialuminumandglassworks@gmail.com',
      address: '196-A Main Multan Road, Lahore, Punjab 54000',
      copyrightText: 'Basit Ali Aluminum & Glass Work. All rights reserved.',
    },
  },

  {
    slug: 'sitemap-page',
    title: 'Sitemap Page',
    description: 'HTML sitemap page content.',
    group: 'sitewide',
    icon: 'sitemap',
    href: '/sitemap',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        rows: 2,
      },
    ],
    defaults: {
      heading: 'Sitemap',
      description:
        'Browse all pages on the Basit Ali Aluminum & Glass Work website.',
    },
  },

  // ───────────── SITE / SETTINGS ─────────────

  {
    slug: 'settings',
    title: 'Site Settings',
    description: 'Global site configuration — branding, SEO, and metadata.',
    group: 'site',
    icon: 'cog',
    href: '/',
    fields: [
      { type: 'text', name: 'businessName', label: 'Business Name' },
      { type: 'text', name: 'tagline', label: 'Tagline' },
      {
        type: 'image',
        name: 'logo',
        label: 'Logo',
        fit: 'contain',
      },
      {
        type: 'image',
        name: 'favicon',
        label: 'Favicon',
        fit: 'avatar',
      },
      { type: 'heading', label: 'SEO & Metadata' },
      { type: 'text', name: 'siteTitle', label: 'Site Title' },
      { type: 'color', name: 'brandColor', label: 'Brand Colour', span: 1 },
      { type: 'color', name: 'accentColor', label: 'Accent Colour', span: 1 },
      {
        type: 'textarea',
        name: 'metaDescription',
        label: 'Meta Description',
        rows: 3,
        help: 'Shown in search engine results. Aim for 150-160 characters.',
      },
      { type: 'text', name: 'siteUrl', label: 'Site URL' },
    ],
    defaults: {
      businessName: 'Basit Ali Aluminum & Glass Work',
      tagline: 'Professional Architectural Aluminum & Glass Solutions in Lahore',
      logo: '/logo.jpg',
      favicon: '/icon.png',
      siteTitle:
        'Basit Ali Aluminum & Glass Work | Lahore Professional Services',
      brandColor: '#E31E27',
      accentColor: '#171717',
      metaDescription:
        'Premier aluminum windows, doors, glass partitions, shower cabins, shop fronts, tempered glass, and 24/7 emergency repair services across Lahore. Call 0320-2740066 for free measurement.',
      siteUrl: 'https://basitali-template1.vercel.app',
    },
  },
];

// ── Lookup helper ──

export function getSection(slug: string): SectionDef | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}
