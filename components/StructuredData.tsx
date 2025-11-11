export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IN-FOMO.',
    alternateName: 'IN-FOMO',
    url: 'https://in-fomo.com',
    logo: 'https://in-fomo.com/logo.png',
    description: 'Premium digital agency specializing in web development, mobile apps, UI/UX design, and digital transformation',
    sameAs: [
      'https://twitter.com/in_4omo',
      'https://linkedin.com/company/in-fomo',
      'https://github.com/infomo',
      'https://instagram.com/in_fomo',
      'https://clutch.co/profile/fomo-0'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://in-fomo.com/contact',
      availableLanguage: ['English', 'Russian']
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '50'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Global'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IN-FOMO.',
    url: 'https://in-fomo.com',
    description: 'Digital innovation agency - web development, mobile apps, UI/UX design',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://in-fomo.com/blog?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'IN-FOMO. Digital Agency',
    image: 'https://in-fomo.com/logo.png',
    '@id': 'https://in-fomo.com',
    url: 'https://in-fomo.com',
    telephone: '',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Global'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0,
      longitude: 0
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://clutch.co/profile/fomo-0',
      'https://twitter.com/in_4omo',
      'https://linkedin.com/company/in-fomo'
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 0,
        longitude: 0
      },
      geoRadius: '20000000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Modern, scalable web applications built with cutting-edge technology'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Development',
            description: 'Native and cross-platform mobile apps for iOS and Android'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description: 'Beautiful, intuitive interfaces that drive user engagement'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing',
            description: 'Strategic campaigns that amplify your brand presence online'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Blockchain Development',
            description: 'Decentralized applications and smart contracts'
          }
        }
      ]
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://in-fomo.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://in-fomo.com/about'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Works',
        item: 'https://in-fomo.com/works'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Blog',
        item: 'https://in-fomo.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://in-fomo.com/contact'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}


