import { FAQ_DATA } from './data/faq'
import { SEO, SERVICES_SEO, SITE, SITE_URL } from './lib/site'

// ─── DATOS ESTRUCTURADOS (schema.org / JSON-LD) ───────────────────────────────
// Le explican a Google qué es este negocio, dónde está, qué vende y qué
// preguntas responde. Habilita resultados enriquecidos (FAQ desplegable,
// panel de negocio local) en la página de resultados.

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

export default function StructuredData() {
  const graph = [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORG_ID,
      name: SITE.name,
      alternateName: ['GIA Solutions', 'G.I.A.'],
      legalName: SITE.legalName,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-gia-mark.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/opengraph-image`,
      description: SEO.description,
      email: SITE.email,
      telephone: SITE.phone,
      foundingDate: SITE.foundingDate,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      areaServed: [
        { '@type': 'Country', name: 'Ecuador' },
        { '@type': 'Place', name: 'América Latina' },
      ],
      knowsLanguage: ['es', 'en'],
      sameAs: [SITE.instagram],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: 'EC',
        availableLanguage: ['Spanish', 'English'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de G.I.A. Solutions',
        itemListElement: SERVICES_SEO.map(svc => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'Ecuador' },
            ...('url' in svc ? { url: svc.url } : {}),
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE_URL,
      name: SITE.name,
      description: SEO.description,
      inLanguage: 'es-EC',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      isPartOf: { '@id': SITE_ID },
      mainEntity: FAQ_DATA.es.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a.replace(/\s*\n+\s*/g, ' ').trim(),
        },
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  )
}
