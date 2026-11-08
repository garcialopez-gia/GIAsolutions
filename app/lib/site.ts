// ─── SITE CONSTANTS ───────────────────────────────────────────────────────────
// Fuente única de verdad para SEO, sitemap, robots y datos estructurados.

export const SITE_URL = 'https://www.giasolutionsec.com'

export const SITE = {
  name: 'G.I.A. Solutions',
  legalName: 'G.I.A. Solutions',
  url: SITE_URL,
  locale: 'es_EC',
  email: 'giasolutions.ec@outlook.com',
  phone: '+593983667449',
  phoneDisplay: '+593 983 667 449',
  city: 'Quito',
  region: 'Pichincha',
  country: 'EC',
  instagram: 'https://www.instagram.com/giasolutions.ec/',
  whatsapp: 'https://wa.me/593983667449',
  googleMaps: 'https://www.google.com/maps?cid=16827031957187122497',
  googleReview: 'https://g.page/r/CUHVSGBpoIXpECE/review',
  foundingDate: '2024',
} as const

export const SEO = {
  title: 'Agentes IA y Páginas Web en Quito, Ecuador | G.I.A. Solutions',
  titleTemplate: '%s | G.I.A. Solutions',
  description:
    'Proveedores de agentes IA en Ecuador: los creamos e integramos en WhatsApp, CRM y tus sistemas. También páginas web y e-commerce. Diagnóstico gratuito.',
  keywords: [
    'agentes IA',
    'agentes de inteligencia artificial',
    'qué es un agente IA',
    'cómo crear un agente IA',
    'dónde contratar agentes IA',
    'proveedor de agentes IA',
    'empresa de agentes IA Ecuador',
    'agentes IA para empresas',
    'agentes IA Quito',
    'agentes IA WhatsApp',
    'implementación de agentes IA',
    'creación de páginas web',
    'diseño web Quito',
    'páginas web Ecuador',
    'desarrollo web Quito',
    'e-commerce Ecuador',
    'tienda online Quito',
    'crear tienda virtual Ecuador',
    'menús digitales QR',
    'menú digital restaurante Ecuador',
    'GIA Foods',
    'giafoods',
    'carta digital QR Quito',
    'tarjetas de presentación digitales',
    'tarjeta digital NFC Quito',
    'G.I.A. Cards',
    'agencia de automatizaciones Quito',
    'agencia marketing digital Ecuador',
    'automatización con inteligencia artificial',
    'G.I.A. Solutions',
  ],
} as const

// Servicios ofertados — usados en el catálogo de datos estructurados (schema.org)
export const SERVICES_SEO = [
  {
    name: 'Agentes IA para empresas',
    alternateName: [
      'Agentes de inteligencia artificial',
      'Creación de agentes IA',
      'Implementación de agentes IA',
    ],
    serviceType: 'Desarrollo e implementación de agentes de inteligencia artificial',
    description:
      'Proveedores de agentes IA en Ecuador. Un agente IA es un programa de inteligencia artificial que recibe un objetivo, decide qué pasos seguir y los ejecuta por sí solo. Los creamos a la medida de cada empresa y los integramos con WhatsApp, sitio web, CRM y otros sistemas.',
  },
  {
    name: 'Creación de páginas web y e-commerce',
    description:
      'Diseño y desarrollo de páginas web de alto impacto y tiendas e-commerce optimizadas para conversión, velocidad y posicionamiento SEO. Entrega en 7 días hábiles.',
  },
  {
    name: 'Menús digitales inteligentes (GIA Foods)',
    description:
      'Plataforma de menús digitales con pedido por QR en la mesa: el cliente escanea, arma su pedido y lo envía directo a cocina, sin descargar ninguna app. Incluye facturación electrónica SRI.',
    url: 'https://giafoods.vercel.app',
  },
  {
    name: 'Tarjetas de presentación digitales (G.I.A. Cards)',
    description:
      'Tarjetas de presentación digitales con QR y NFC: tus clientes guardan tu contacto, redes sociales y reseñas de Google con un toque, sin apps ni tarjetas de papel. Diseño a medida desde $15 al año.',
    url: 'https://gia-cards.vercel.app',
  },
  {
    name: 'Asistentes de auditoría bajo normas ISO',
    description:
      'Asistentes inteligentes que apoyan procesos de auditoría y cumplimiento bajo normas ISO.',
  },
] as const
