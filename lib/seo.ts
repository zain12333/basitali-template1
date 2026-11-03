import { getSiteConfig } from './site-config';

export function localBusinessJsonLd() {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.businessName,
    url: config.siteUrl,
    logo: `${config.siteUrl}${config.logo}`,
    description: config.metaDescription,
    telephone: `+92${config.phoneTel}`,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.streetAddress,
      addressLocality: config.address.addressLocality,
      addressRegion: config.address.addressRegion,
      postalCode: config.address.postalCode,
      addressCountry: config.address.addressCountry,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '22:00',
    },
    areaServed: {
      '@type': 'City',
      name: 'Lahore',
    },
    priceRange: '$$',
  };
}

export function serviceJsonLd(service: {
  name: string;
  description: string;
  url: string;
}) {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${config.siteUrl}${service.url}`,
    provider: {
      '@type': 'Organization',
      name: config.businessName,
      url: config.siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: 'Lahore',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${config.siteUrl}${item.url}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
