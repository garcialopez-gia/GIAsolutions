// ─── SITE CONSTANTS ───────────────────────────────────────────────────────────
// Fuente única de verdad para SEO, sitemap, robots y datos estructurados.
// Cuando compres un dominio propio, define NEXT_PUBLIC_SITE_URL en Vercel
// (Settings → Environment Variables) y todo lo demás se actualiza solo.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://gi-asolutions.vercel.app'

export const SITE = {
  name: 'G.I.A. Solutions',
  legalName: 'G.I.A. Solutions',
  url: SITE_URL,
  locale: 'es_EC',
  email: 'giasolutions.ec@outlook.com',
  phone: '+593995002996',
  phoneDisplay: '+593 995 002 996',
  city: 'Quito',
  region: 'Pichincha',
  country: 'EC',
  instagram: 'https://www.instagram.com/giasolutions.ec/',
  whatsapp: 'https://wa.me/593995002996',
  foundingDate: '2024',
} as const

export const SEO = {
  title: 'Creación de Páginas Web y E-commerce en Quito | G.I.A. Solutions',
  titleTemplate: '%s | G.I.A. Solutions',
  description:
    'Creación de páginas web, tiendas e-commerce y menús digitales QR para restaurantes en Quito, Ecuador. Sitio listo en 7 días hábiles. Diagnóstico gratuito.',
  keywords: [
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
    'auditoría digital',
    'agencia de automatizaciones Quito',
    'agencia marketing digital Ecuador',
    'automatización con inteligencia artificial',
    'G.I.A. Solutions',
  ],
} as const

// Servicios ofertados — usados en el catálogo de datos estructurados (schema.org)
export const SERVICES_SEO = [
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
    name: 'Auditoría digital de negocios',
    description:
      'Análisis completo de tu presencia digital: sitio web, redes sociales, campañas de pauta y posicionamiento en buscadores, con informe accionable y hoja de ruta.',
  },
  {
    name: 'Asistentes de auditoría bajo normas ISO',
    description:
      'Asistentes inteligentes que apoyan procesos de auditoría y cumplimiento bajo normas ISO.',
  },
] as const
