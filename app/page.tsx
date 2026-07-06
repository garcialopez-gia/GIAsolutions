'use client'

import { useState, useEffect, useRef } from 'react'
import ChatCard from './components/ChatCard'

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'

type Lang = 'es' | 'en'

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { services: 'Servicios', catalog: 'Catálogo', clients: 'Clientes', faq: 'FAQ', cta: 'Contáctanos' },
    hero: {
      badge: 'ECOSISTEMAS DIGITALES',
      h1a: 'Tu negocio', h1b: 'Trabajando sin ti',
      p1: 'Analizamos tu audiencia y los cuellos de botella en tu negocio, optimizamos tu presencia digital e incrementamos tu exposición en el mercado ecuatoriano y latinoamericano.',
      p2: 'Agencia de Automatizaciones, con sede en Quito, Ecuador, especializada en hacer crecer tu negocio con tecnología de vanguardia.',
      cta1: 'Agenda tu diagnóstico gratuito con nosotros', cta2: 'Ver servicios',
    },
    svc: {
      badge: 'Nuestros Servicios',
      h2a: 'Conoce la Nueva Experiencia', h2b: 'de Crecimiento Digital',
      desc: 'Combinamos automatizaciones con estrategia digital para llevar tu negocio al siguiente nivel.',
      tapFwd: 'Toca para ver detalles', tapBack: 'Toca para volver',
    },
    proc: {
      badge: 'Nuestro Proceso', h2a: 'Supera a todos.', h2b: 'Empieza ahora.',
      desc: 'En menos de 48 horas tendrás un diagnóstico completo y un plan de acción personalizado.',
      cta1: 'Solicitar diagnóstico gratuito', cta2: 'Explorar más',
      trust: 'Sin tarjeta de crédito · Respuesta en 24h',
    },
    test: { badge: 'Testimonios', h2: 'Lo que dicen nuestros clientes' },
    faqSec: { badge: 'Preguntas frecuentes', h2: 'Todo lo que necesitas saber' },
    contact: {
      badge: 'Diagnóstico gratuito',
      h2a: 'Cuéntanos sobre tu negocio.', h2b: 'Nosotros hacemos el resto.',
      desc: 'En 30 minutos analizamos tu situación y te decimos exactamente qué necesitas para escalar.',
      successTitle: '¡Mensaje recibido!',
      successDesc: 'Nos pondremos en contacto contigo en menos de 24 horas para agendar tu diagnóstico gratuito.',
      f1: 'Nombre', p1: 'Tu nombre completo',
      f2: 'Nombre de la empresa', p2: 'Nombre de tu empresa u organización',
      f3: 'URL sitio web / redes sociales', p3: 'https://tuempresa.com o @tuempresa',
      f4: 'Contacto', p4: 'Email o número de WhatsApp',
      f5: '¿Cuál es tu mayor desafío para incrementar tu audiencia?',
      p5: 'Cuéntanos qué obstáculos has encontrado para hacer crecer tu presencia digital…',
      submit: 'Solicitar diagnóstico gratuito', submitting: 'Analizando tu empresa…',
      trust: 'Sin compromiso · Sin tarjeta de crédito · Respuesta en 24h',
      badges: ['Empresa ecuatoriana', 'Respuesta en 24 horas', 'Garantía de resultados'],
      errorMsg: 'Hubo un problema al enviar el formulario. Por favor inténtalo de nuevo.',
    },
    footer: {
      services: 'Servicios', company: 'Empresa', legal: 'Legal',
      copyright: '©2026 G.I.A. Solutions. Todos los derechos reservados.',
      svcLinks: ['Creación de páginas web', 'Menús digitales inteligentes', 'Auditoría digital de tu negocio', 'Asistentes de auditoría bajo normas ISO'],
      compLinks: [{ l: 'Nosotros', h: '#' }, { l: 'Casos de éxito', h: '#testimonios' }, { l: 'FAQ', h: '#faq' }, { l: 'Contacto', h: '#contacto' }],
    },
  },
  en: {
    nav: { services: 'Services', catalog: 'Portfolio', clients: 'Clients', faq: 'FAQ', cta: 'Get in Touch' },
    hero: {
      badge: 'AI-POWERED AUTOMATION',
      h1a: 'Your business,', h1b: 'running on autopilot',
      p1: 'We identify what\'s holding your growth back, build automated systems that attract and convert customers, and give your digital presence the edge it needs — so you can focus on running your business.',
      p2: 'Automation agency based in Quito, Ecuador, helping businesses across Latin America scale smarter with AI-driven strategy and cutting-edge digital tools.',
      cta1: 'Book your free strategy session', cta2: 'Explore our services',
    },
    svc: {
      badge: 'What We Do',
      h2a: 'The smarter path', h2b: 'to sustainable growth',
      desc: 'We pair intelligent automation with proven digital strategy — so your business scales without the overhead.',
      tapFwd: 'Tap to see details', tapBack: 'Tap to go back',
    },
    proc: {
      badge: 'How It Works', h2a: 'Leave competitors behind.', h2b: 'Start today.',
      desc: 'Within 48 hours, you\'ll have a full growth audit and a custom action plan ready to execute.',
      cta1: 'Book your free strategy call', cta2: 'See our work',
      trust: 'No credit card required · Response within 24h',
    },
    test: { badge: 'Client Stories', h2: 'What our clients are saying' },
    faqSec: { badge: 'Got questions?', h2: 'Everything you need to know' },
    contact: {
      badge: 'Free Growth Audit',
      h2a: 'Tell us where you want to go.', h2b: "We'll handle the rest.",
      desc: 'In 30 minutes, we map out exactly what it takes to scale your business — no fluff, no generic advice.',
      successTitle: "You're all set!",
      successDesc: "We'll reach out within 24 hours to confirm your free strategy session.",
      f1: 'Full name', p1: 'Your full name',
      f2: 'Company', p2: 'Your company or organization',
      f3: 'Website / Social media', p3: 'https://yourcompany.com or @yourhandle',
      f4: 'Best way to reach you', p4: 'Email or WhatsApp number',
      f5: "What's your biggest bottleneck right now?",
      p5: "Tell us what's holding your growth back — we'll come prepared…",
      submit: 'Book your free audit', submitting: 'Reviewing your business…',
      trust: 'No commitment · No credit card · Response within 24h',
      badges: ['Based in Ecuador', 'Response within 24 hours', 'Results guaranteed'],
      errorMsg: 'Something went wrong. Please try again.',
    },
    footer: {
      services: 'Services', company: 'Company', legal: 'Legal',
      copyright: '©2026 G.I.A. Solutions. All rights reserved.',
      svcLinks: ['Website development', 'Smart digital menus', 'Digital business audit', 'ISO-compliant audit assistants'],
      compLinks: [{ l: 'About', h: '#' }, { l: 'Case studies', h: '#testimonios' }, { l: 'FAQ', h: '#faq' }, { l: 'Contact', h: '#contacto' }],
    },
  },
}

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQ_DATA: Record<Lang, { q: string; a: string }[]> = {
  es: [
    { q: '¿Para qué tipo de empresas son sus servicios?', a: 'Nos especializamos en pequeñas y medianas empresas (PyMEs) y emprendedores que buscan escalar sus ingresos sin complicaciones técnicas.\n\nSi sientes que tu negocio ha llegado a un techo o que tus procesos manuales te quitan tiempo valioso, nuestra Inteligencia Aplicada está diseñada para ti.' },
    { q: '¿Cómo funciona la auditoría de Meta Ads?', a: 'Realizamos un escaneo técnico profundo de tu ecosistema publicitario utilizando herramientas avanzadas de IA.\n\nAnalizamos dónde se está fugando tu presupuesto, la efectividad de tus artes y la calidad de tus prospectos.\n\nEl resultado es un plan de acción directo para dejar de gastar y empezar a invertir con precisión.' },
    { q: '¿Cuánto tiempo toma implementar un chatbot?', a: 'La eficiencia es nuestra prioridad. Una implementación estándar toma entre 7 a 15 días laborables.\n\nEsto incluye la fase de entrenamiento de la IA con la información de tu negocio, pruebas de flujo y la integración final con tu WhatsApp o sitio web para que empieces a atender clientes en piloto automático de inmediato.' },
    { q: '¿Qué incluye la creación de una página web?', a: 'No solo entregamos un sitio, construimos tu oficina digital 24/7. Incluye:\n\nDiseño Estratégico: Basado en la psicología del consumidor y tu nueva identidad de marca.\n\nOptimización SEO: Para que tus clientes te encuentren en Google.\n\nConversión Directa: Integración con botones de WhatsApp y formularios de captación para asegurar que cada visita tenga el potencial de convertirse en una venta.' },
    { q: '¿Trabajan con empresas fuera de Quito?', a: '¡Absolutamente! Aunque nuestra base de operaciones está enfocada en el mercado ecuatoriano, la tecnología no tiene fronteras.\n\nBrindamos consultoría y servicios de forma remota a todo el territorio nacional e internacional, asegurando la misma calidad y precisión en cada proceso, sin importar la ubicación geográfica de tu empresa.' },
  ],
  en: [
    { q: 'What kinds of businesses do you work with?', a: 'We work with small and medium-sized businesses and entrepreneurs who are ready to scale — but want to do it smarter, not just harder.\n\nIf your growth has stalled or you\'re losing hours every week to repetitive manual work, our automation systems are built exactly for that.' },
    { q: 'How does a Meta Ads audit work?', a: 'We run a deep technical scan of your entire ad account using advanced AI tooling.\n\nWe identify where your budget is bleeding out, assess creative performance across campaigns, and evaluate lead quality from first click to close.\n\nWhat you get: a clear, no-fluff action plan to turn ad spend into measurable, scalable returns.' },
    { q: 'How long does chatbot implementation take?', a: 'Fast turnaround is a core part of what we do. A standard build is delivered in 7–15 business days.\n\nThat covers AI training on your business knowledge base, full conversation flow testing, and deployment to your WhatsApp, website, or both — so you\'re live and qualifying leads on autopilot from day one.' },
    { q: "What's included in website development?", a: "We don't just ship a site — we build your always-on digital storefront. Here's what's included:\n\nStrategic design: Built around how your customers think and what drives them to act.\n\nSEO from day one: So the right people find you on Google — not just your existing contacts.\n\nConversion-focused: WhatsApp quick-reply buttons and lead capture forms ensure every visitor has a clear path to becoming a paying client." },
    { q: 'Do you work with businesses outside Ecuador?', a: "Absolutely. We're based in Quito, but our work is fully remote — and our results travel just as well.\n\nWe serve clients across Latin America and beyond, delivering the same level of quality and precision regardless of where you're located." },
  ],
}

// ─── SERVICE DATA ─────────────────────────────────────────────────────────────
type ServiceItem = {
  label: string; title: string; titleGrad: string; desc: string; desc2: string; back: string;
  reverse?: boolean;
  features: { icon: string; title: string; desc: string }[]
}

const SERVICES_DATA: Record<Lang, ServiceItem[]> = {
  es: [
    {
      label: 'Creación de Páginas Web', title: 'Tu presencia digital,', titleGrad: 'rediseñada',
      desc: 'Creamos páginas web de alto impacto que convierten visitantes en clientes. Cada sitio está diseñado estratégicamente para maximizar tu ROI.',
      desc2: 'Desde landing pages hasta e-commerce completos, analizamos qué funciona mejor en tu industria y lo aplicamos en tu sitio.',
      back: '01 — Páginas Web',
      features: [
        { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Diseño personalizado', desc: 'Páginas únicas optimizadas para conversión, adaptadas a tu marca.' },
        { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Velocidad y SEO optimizados', desc: 'Carga en menos de 2 segundos y posicionamiento en Google.' },
        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Entrega en 7 días hábiles', desc: 'Proceso ágil desde el brief hasta el sitio live en tiempo récord.' },
      ],
    },
    {
      label: 'Menús Digitales Inteligentes', title: 'Tu menú, tu marca,', titleGrad: 'pedidos sin fricción',
      desc: 'Pedido por QR en la mesa: tus clientes arman su pedido y lo envían directo a cocina, sin descargar ninguna app.',
      desc2: 'Categorías, fotos y disponibilidad configurable, con facturación electrónica al SRI integrada.',
      back: '02 — Menús Digitales', reverse: true,
      features: [
        { icon: 'M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z', title: 'Pedido por QR en la mesa', desc: 'El cliente escanea, arma su pedido y lo envía sin instalar nada.' },
        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Cocina en tiempo real', desc: 'Cada orden llega al instante a la pantalla de cocina, sin papeles.' },
        { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Gestión completa del menú', desc: 'Edita precios, fotos y disponibilidad al instante, sin soporte técnico.' },
      ],
    },
    {
      label: 'Auditoría digital de tu negocio', title: 'Haz que cada dólar', titleGrad: 'trabaje más duro',
      desc: 'Analizamos tu presencia digital completa, identificamos qué está frenando tu crecimiento y te damos el plan exacto para escalar tu negocio.',
      desc2: 'Revisamos tu sitio web, redes sociales, campañas de pauta y posicionamiento en buscadores.',
      back: '03 — Auditoría digital',
      features: [
        { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Análisis profundo de campañas', desc: 'Detectamos qué está desperdiciando tu presupuesto.' },
        { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Reducción de costo por resultado', desc: 'Clientes reducen su CPR hasta un 42% en 30 días.' },
        { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Informe detallado + hoja de ruta', desc: 'Reporte accionable con pasos para escalar tu inversión.' },
      ],
    },
  ],
  en: [
    {
      label: 'Website Development', title: 'A site that actually', titleGrad: 'converts',
      desc: 'We build high-converting websites grounded in strategy — not just aesthetics. Every design decision is backed by data, user behavior, and what drives people to act.',
      desc2: 'From lean landing pages to full-scale e-commerce, we study your market, identify what works in your niche, and ship it fast.',
      back: '01 — Web Development',
      features: [
        { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Built for conversion', desc: 'Custom layouts engineered to turn visitors into leads — and leads into clients.' },
        { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Fast, SEO-ready from day one', desc: 'Sub-2-second load times with on-page SEO built in so Google notices you.' },
        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Live in 7 business days', desc: 'From kickoff to launch — no endless revisions, no delays.' },
      ],
    },
    {
      label: 'Smart Digital Menus', title: 'Your menu, your brand,', titleGrad: 'zero-friction ordering',
      desc: 'QR ordering at the table: customers build their order and send it straight to the kitchen, no app download required.',
      desc2: 'Categories, photos, and configurable availability, with built-in electronic invoicing.',
      back: '02 — Digital Menus', reverse: true,
      features: [
        { icon: 'M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z', title: 'QR ordering at the table', desc: 'Customers scan, order, and send — no app install, works on any device.' },
        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Kitchen connected in real time', desc: 'Every order hits the kitchen display instantly — no paper tickets, no transcription errors.' },
        { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Full menu control, no dev needed', desc: 'Update prices, photos, and availability instantly — no reprinted menus, no third parties.' },
      ],
    },
    {
      label: 'Digital Business Audit', title: 'Stop guessing.', titleGrad: 'Start scaling.',
      desc: 'We audit your entire digital footprint — website, social, paid ads, and organic search — then hand you a clear roadmap to cut waste and double down on what actually works.',
      desc2: 'We dig into your campaigns, content, positioning, and tech stack to give you the full picture.',
      back: '03 — Digital Audit',
      features: [
        { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'In-depth campaign analysis', desc: 'We pinpoint exactly where your budget is leaking — and why.' },
        { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Lower cost per result', desc: 'Our clients cut their CPR by up to 42% within the first 30 days.' },
        { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Actionable report + growth roadmap', desc: 'No fluff — just a concrete, step-by-step plan to scale your ROI.' },
      ],
    },
  ],
}

// ─── PROCESS DATA ─────────────────────────────────────────────────────────────
const PROCESS_DATA: Record<Lang, { n: string; icon: string; title: string; desc: string; highlight: boolean }[]> = {
  es: [
    { n: '01', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Diagnóstico', desc: 'Analizamos tu situación digital actual: competidores, audiencias, campañas y oportunidades de crecimiento.', highlight: false },
    { n: '02', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'Estrategia personalizada', desc: 'Diseñamos un plan a medida según tus objetivos, presupuesto y mercado. Sin soluciones genéricas: todo para tu negocio.', highlight: true },
    { n: '03', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Ejecución y escalado', desc: 'Implementamos, medimos y optimizamos en tiempo real. Tú te enfocas en tu negocio; nosotros hacemos crecer tu audiencia.', highlight: false },
  ],
  en: [
    { n: '01', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Discovery', desc: 'We dig into your digital landscape — competitors, audience behavior, active campaigns, and the growth opportunities you\'re currently missing.', highlight: false },
    { n: '02', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'Custom strategy', desc: 'We build a tailored growth plan around your goals, budget, and market. No templates, no guesswork — everything specific to your business.', highlight: true },
    { n: '03', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Launch & optimize', desc: 'We execute, track every metric, and iterate in real time. You run your business — we grow your pipeline.', highlight: false },
  ],
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const t = T[lang]
  const faqItems = FAQ_DATA[lang]
  const services = SERVICES_DATA[lang]
  const processSteps = PROCESS_DATA[lang]

  useEffect(() => {
    setOpenFaq(null)
    setFlippedCard(null)
    setFormStatus('idle')
  }, [lang])

  // ── Neural canvas ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0, height = 0
    let nodes: NNode[] = []
    const LAYERS = 6, NPL = 20, MAX_DIST = 180
    const mouse = { x: null as number | null, y: null as number | null }
    let rafId: number

    class NNode {
      layer: number; baseX: number; baseY: number
      x: number; y: number; vx: number; vy: number
      offTimer = 0
      constructor(l: number, i: number) {
        this.layer = l
        const jx = (Math.random() - 0.5) * 80
        const jy = (Math.random() - 0.5) * 80
        this.baseX = (l + 1) * (width / (LAYERS + 1)) + jx
        this.baseY = (i + 1) * (height / (NPL + 1)) + jy
        this.x = this.baseX; this.y = this.baseY
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
      }
      update() {
        this.x += this.vx; this.y += this.vy
        this.x += (this.baseX - this.x) * 0.01
        this.y += (this.baseY - this.y) * 0.01
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) { this.x -= dx * 0.01; this.y -= dy * 0.01 }
        }
        if (this.offTimer > 0) this.offTimer--
      }
      draw() {
        if (this.offTimer > 0) return
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(0,212,255,0.6)'
        ctx!.fill()
      }
    }

    function init() {
      nodes = []
      for (let l = 0; l < LAYERS; l++)
        for (let i = 0; i < NPL; i++) nodes.push(new NNode(l, i))
    }

    function resize() {
      width = canvas!.width = canvas!.offsetWidth
      height = canvas!.height = canvas!.offsetHeight
      init()
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height)
      nodes.forEach(n => n.update())
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          if (Math.abs(a.layer - b.layer) !== 1) continue
          if (a.offTimer > 0 || b.offTimer > 0) continue
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const op = (1 - d / MAX_DIST) * 0.25
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(0,212,255,${op})`
            ctx!.lineWidth = 1; ctx!.stroke()
          }
        }
      }
      ctx!.save(); ctx!.globalCompositeOperation = 'lighter'
      nodes.forEach(n => {
        if (n.offTimer > 0) return
        const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, 20)
        g.addColorStop(0, 'rgba(0,212,255,0.15)'); g.addColorStop(1, 'rgba(0,212,255,0)')
        ctx!.beginPath(); ctx!.arc(n.x, n.y, 20, 0, Math.PI * 2)
        ctx!.fillStyle = g; ctx!.fill()
      })
      ctx!.restore()
      nodes.forEach(n => n.draw())
      rafId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const hero = document.getElementById('hero-section')
    const onMove = (e: Event) => {
      const me = e as MouseEvent
      const rect = canvas!.getBoundingClientRect()
      mouse.x = me.clientX - rect.left; mouse.y = me.clientY - rect.top
      nodes.forEach(n => { if (Math.random() < 0.08) n.offTimer = 20 + Math.random() * 40 })
    }
    const onLeave = () => { mouse.x = null; mouse.y = null }
    hero?.addEventListener('mousemove', onMove)
    hero?.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      hero?.removeEventListener('mousemove', onMove)
      hero?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // ── Card glow mouse tracking ─────────────────────────────────────────────
  useEffect(() => {
    function injectGlow() {
      document.querySelectorAll<HTMLElement>('.feature-card').forEach(card => {
        if (!card.querySelector('.card-glow')) {
          const g = document.createElement('div')
          g.className = 'card-glow'
          card.insertBefore(g, card.firstChild)
        }
        card.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r = card.getBoundingClientRect()
          card.style.setProperty('--mouse-x', ((me.clientX - r.left) / r.width * 100).toFixed(1) + '%')
          card.style.setProperty('--mouse-y', ((me.clientY - r.top) / r.height * 100).toFixed(1) + '%')
        })
        card.addEventListener('mouseleave', () => {
          card.style.setProperty('--mouse-x', '50%')
          card.style.setProperty('--mouse-y', '50%')
        })
      })
    }
    injectGlow()
  }, [])

  // ── Scroll reveal ────────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('section').forEach(sec => {
      sec.querySelectorAll<HTMLElement>('.feature-card').forEach((card, ci) => {
        card.classList.add('reveal', ci % 2 === 0 ? 'fade-left' : 'fade-right')
        observer.observe(card)
      })
      sec.querySelectorAll('.metric-card').forEach((card, ci) => {
        card.classList.add('reveal', 'fade-up');
        (card as HTMLElement).style.transitionDelay = ci * 0.1 + 's'
        observer.observe(card)
      })
    })
    return () => observer.disconnect()
  }, [])

  // ── Navbar scroll compact ────────────────────────────────────────────────
  useEffect(() => {
    const nb = document.querySelector('.navbar') as HTMLElement | null
    const onScroll = () => nb?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Ripple effect ────────────────────────────────────────────────────────
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>('.btn-primary, .btn-ghost')
    const handlers: Array<[HTMLElement, (e: Event) => void]> = []
    buttons.forEach(btn => {
      const handler = (e: Event) => {
        const me = e as MouseEvent
        const r = btn.getBoundingClientRect()
        const size = Math.max(r.width, r.height) * 1.4
        const ripple = document.createElement('span')
        ripple.className = 'ripple'
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${me.clientX - r.left - size / 2}px;top:${me.clientY - r.top - size / 2}px;`
        btn.appendChild(ripple)
        ripple.addEventListener('animationend', () => ripple.remove())
      }
      btn.addEventListener('click', handler)
      handlers.push([btn, handler])
    })
    return () => handlers.forEach(([btn, h]) => btn.removeEventListener('click', h))
  }, [])

  // ── Badge shimmer ────────────────────────────────────────────────────────
  useEffect(() => {
    document.querySelector('#hero-section .badge')?.classList.add('badge-shimmer')
  }, [])

  // ── Form submission ──────────────────────────────────────────────────────
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('loading')
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setFormStatus('success')
    } catch {
      setFormStatus('idle')
      alert(t.contact.errorMsg)
    }
  }

  function inputStyle(base?: React.CSSProperties): React.CSSProperties {
    return {
      width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.15)',
      borderRadius: 12, padding: '14px 16px 14px 42px', color: '#fff', fontSize: 15, outline: 'none',
      transition: 'border-color 0.2s,box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'inherit', ...base,
    }
  }

  // ── Language toggle ──────────────────────────────────────────────────────
  function LangToggle() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
        {(['es', 'en'] as Lang[]).map((l, i) => (
          <button key={l} onClick={() => setLang(l)} style={{ padding: '6px 10px', background: lang === l ? 'rgba(0,212,255,0.15)' : 'transparent', color: lang === l ? '#00d4ff' : 'rgba(154,175,199,0.45)', fontSize: 11, fontWeight: 700, border: 'none', borderLeft: i > 0 ? '1px solid rgba(0,212,255,0.15)' : 'none', cursor: 'pointer', letterSpacing: '0.06em', transition: 'background 0.2s, color 0.2s' }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="navbar fixed top-0 left-0 right-0 z-50">
        <nav style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="nav-inner">
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-gia.jpeg" alt="G.I.A. Solutions" className="navbar-logo-img" style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 8 }} />
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.02em' }}>
              <span className="silver-text">G.I.A.</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 5px', fontWeight: 300 }}>|</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>Solutions</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div style={{ alignItems: 'center', gap: 32 }} className="hidden md:flex">
            <a href="#servicios" className="nav-link">{t.nav.services}</a>
            <a href="https://gia-portafolio.vercel.app/" className="nav-link" target="_blank" rel="noopener">{t.nav.catalog}</a>
            <a href="#testimonios" className="nav-link">{t.nav.clients}</a>
            <a href="#faq" className="nav-link">{t.nav.faq}</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LangToggle />
            <a href="#contacto" className="btn-primary hidden md:inline-flex" style={{ fontSize: 13, padding: '10px 20px', borderRadius: 8, textDecoration: 'none' }}>
              {t.nav.cta}
            </a>
            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#9aafc7' }} aria-label={lang === 'en' ? 'Menu' : 'Menú'}>
              {menuOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div style={{ display: menuOpen ? 'flex' : 'none', background: 'rgba(6,14,26,0.97)', borderTop: '1px solid rgba(0,212,255,0.1)', padding: '16px 20px', flexDirection: 'column', gap: 4, width: '100%', boxSizing: 'border-box' }}>
          {[
            { href: '#servicios', label: t.nav.services },
            { href: '#testimonios', label: t.nav.clients },
            { href: '#faq', label: t.nav.faq },
          ].map(item => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ color: '#9aafc7', fontSize: 15, textDecoration: 'none', padding: '12px 0', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{item.label}</a>
          ))}
          <a href="https://gia-portafolio.vercel.app/" target="_blank" rel="noopener" onClick={() => setMenuOpen(false)} style={{ color: '#9aafc7', fontSize: 15, textDecoration: 'none', padding: '12px 0', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {t.nav.catalog}
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <a href="#contacto" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ marginTop: 12, fontSize: 14, padding: '12px 20px', borderRadius: 10, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {t.nav.cta}
          </a>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 64, overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(16px,4vw,32px) 80px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="hero-grid">
            <div className="fade-up">
              <div className="badge" style={{ marginBottom: 32 }}>
                <span className="dot pulse-dot" />
                <span className="badge-text">{t.hero.badge}</span>
              </div>
              <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
                {t.hero.h1a}<br />{t.hero.h1b}
              </h1>
              <p style={{ color: '#9aafc7', fontSize: 18, lineHeight: 1.7, marginBottom: 16, maxWidth: 480 }}>{t.hero.p1}</p>
              <p style={{ color: 'rgba(154,175,199,0.65)', fontSize: 15, lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>{t.hero.p2}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
                <a href="#contacto" className="btn-primary" style={{ padding: '16px 32px', borderRadius: 12, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  {t.hero.cta1}
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a href="#servicios" className="btn-ghost" style={{ padding: '16px 32px', borderRadius: 12, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  {t.hero.cta2}
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </a>
              </div>
            </div>

            <div className="fade-up delay-2" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,212,255,0.04)', borderRadius: 24, filter: 'blur(32px)' }} />
              <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto', paddingTop: 20 }}>
                <div className="feature-card" style={{ position: 'absolute', top: 0, right: 0, borderRadius: 12, padding: '10px 16px', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} className="pulse-dot" />
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>IA activa</span>
                  </div>
                </div>
                <ChatCard key={lang} lang={lang} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, #0a1628, transparent)', pointerEvents: 'none', zIndex: 3 }} />
      </section>

      {/* ── SERVICIOS ──────────────────────────────────────────────────────── */}
      <section id="servicios" style={{ padding: '96px 0', position: 'relative' }} className="grid-bg">
        <div className="radial-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="badge" style={{ marginBottom: 24 }}><span className="badge-text">{t.svc.badge}</span></div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>
              {t.svc.h2a}<br /><span className="gradient-text">{t.svc.h2b}</span>
            </h2>
            <p style={{ color: '#9aafc7', fontSize: 17, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>{t.svc.desc}</p>
          </div>

          {/* Mobile flip cards */}
          <div className="service-flip-container">
            {services.map((svc, i) => (
              <div key={i} className={`flip-card${flippedCard === i ? ' flipped' : ''}`} onClick={() => setFlippedCard(flippedCard === i ? null : i)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front" style={{ background: 'linear-gradient(135deg,rgba(14,31,58,0.95) 0%,rgba(10,22,40,0.98) 100%)', border: '1px solid rgba(0,212,255,0.15)', padding: '26px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ display: 'inline-block', fontSize: 11, color: '#00d4ff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{svc.label}</span>
                      <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 14, lineHeight: 1.2 }}>{svc.title}<br /><span className="gradient-text">{svc.titleGrad}</span></h3>
                      <p style={{ color: '#9aafc7', fontSize: 14, lineHeight: 1.65, marginBottom: 10 }}>{svc.desc}</p>
                      <p style={{ color: 'rgba(154,175,199,0.6)', fontSize: 13, lineHeight: 1.65 }}>{svc.desc2}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, paddingTop: 14, borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                      <span style={{ fontSize: 12, color: 'rgba(0,212,255,0.6)' }}>{t.svc.tapFwd}</span>
                      <svg width="13" height="13" fill="none" stroke="rgba(0,212,255,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                  <div className="flip-card-back" style={{ background: 'linear-gradient(135deg,rgba(14,31,58,0.95) 0%,rgba(10,22,40,0.98) 100%)', border: '1px solid rgba(0,212,255,0.25)', padding: '22px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: 11, color: 'rgba(154,175,199,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 10 }}>{svc.back}</p>
                      <div className="divider-cyan" style={{ marginBottom: 16 }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {svc.features.map((f, fi) => (
                          <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <div style={{ width: 30, height: 30, minWidth: 30, borderRadius: 9, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="14" height="14" fill="none" stroke="#00d4ff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
                            </div>
                            <div>
                              <p style={{ color: '#fff', fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{f.title}</p>
                              <p style={{ color: 'rgba(154,175,199,0.7)', fontSize: 12, lineHeight: 1.55 }}>{f.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, paddingTop: 14, borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                      <svg width="13" height="13" fill="none" stroke="rgba(0,212,255,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      <span style={{ fontSize: 12, color: 'rgba(0,212,255,0.6)' }}>{t.svc.tapBack}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop service grids */}
          {services.map((svc, si) => (
            <div key={si}>
              {si > 0 && <div className="divider-cyan service-sep" style={{ marginBottom: 80 }} />}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: si < 2 ? 80 : 0 }} className="service-grid">
                <div style={{ order: svc.reverse ? 1 : 2 }}>
                  <div className="feature-card" style={{ borderRadius: 20, padding: 36 }}>
                    <p style={{ fontSize: 11, color: 'rgba(154,175,199,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 12 }}>{svc.back}</p>
                    <div className="divider-cyan" style={{ marginBottom: 24 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {svc.features.map((f, fi) => (
                        <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                          <div style={{ width: 34, height: 34, minWidth: 34, borderRadius: 10, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="16" height="16" fill="none" stroke="#00d4ff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
                          </div>
                          <div>
                            <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{f.title}</p>
                            <p style={{ color: 'rgba(154,175,199,0.7)', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ order: svc.reverse ? 2 : 1 }}>
                  <span style={{ display: 'inline-block', fontSize: 11, color: '#00d4ff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{svc.label}</span>
                  <h3 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>{svc.title}<br /><span className="gradient-text">{svc.titleGrad}</span></h3>
                  <p style={{ color: '#9aafc7', fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>{svc.desc}</p>
                  <p style={{ color: 'rgba(154,175,199,0.6)', fontSize: 14, lineHeight: 1.75 }}>{svc.desc2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESO ────────────────────────────────────────────────────────── */}
      <section id="proceso" style={{ padding: '96px 0', position: 'relative' }} className="grid-bg">
        <div className="radial-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge" style={{ marginBottom: 24 }}><span className="badge-text">{t.proc.badge}</span></div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>
              {t.proc.h2a}<br /><span className="gradient-text">{t.proc.h2b}</span>
            </h2>
            <p style={{ color: '#9aafc7', fontSize: 17, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>{t.proc.desc}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 64 }} className="process-grid">
            {processSteps.map(p => (
              <div key={p.n} className="feature-card" style={{ borderRadius: 20, padding: 32, position: 'relative', ...(p.highlight ? { borderColor: 'rgba(0,212,255,0.25)' } : {}) }}>
                <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 64, fontWeight: 900, color: 'rgba(0,212,255,0.08)', lineHeight: 1, userSelect: 'none' }}>{p.n}</div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: p.highlight ? 'rgba(0,212,255,0.15)' : 'rgba(0,212,255,0.1)', border: `1px solid rgba(0,212,255,${p.highlight ? 0.35 : 0.25})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <svg width="24" height="24" fill="none" stroke="#00d4ff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={p.icon} /></svg>
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 19, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: 'rgba(154,175,199,0.7)', fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 16 }}>
              <a href="#contacto" className="btn-primary" style={{ padding: '16px 40px', borderRadius: 12, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                {t.proc.cta1}
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="https://gia-portafolio.vercel.app/" target="_blank" rel="noopener" className="btn-ghost" style={{ padding: '16px 40px', borderRadius: 12, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                {t.proc.cta2}
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            <p style={{ color: 'rgba(154,175,199,0.5)', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="14" height="14" fill="none" stroke="#9aafc7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              {t.proc.trust}
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ────────────────────────────────────────────────────── */}
      <section id="testimonios" style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 24 }}><span className="badge-text">{t.test.badge}</span></div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900 }}>{t.test.h2}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="testimonials-grid">
            {[
              { stars: '★★★★★', text: '"G.I.A. Solutions transformó nuestra presencia digital. La página web convierte el doble que la anterior, y el chatbot maneja el 80% de nuestras consultas."', initials: 'GE', color: '0e1f3a/00d4ff', name: 'Dra. Gabriela Escobar', href: 'https://dragabrielaescobar.com/' },
              { stars: '★★★★★', text: '"Gracias GIA Solutions por ayudarme a crear mi página web y además optimizar mi campaña de marketing; me ha ayudado a llegar a clientes de otros países."', initials: 'DS', color: '0e1f3a/00fff7', name: 'Diego Silva', href: 'https://diegofitcoach.vercel.app/', highlight: true },
              { stars: '★★★★★', text: '"La página web que GIA Solutions hizo para mi consultorio me permitió agendar más citas de manera online y así pude dejar de hacerlo yo misma, lo cual me ha ahorrado mucho tiempo; además me la entregaron súper rápido."', initials: 'NG', color: '132540/00d4ff', name: 'Abg. Nicole García', href: 'https://webng-eight.vercel.app/' },
            ].map((t2, i) => (
              <div key={i} className="feature-card" style={{ borderRadius: 20, padding: 28, ...(t2.highlight ? { borderColor: 'rgba(0,212,255,0.25)' } : {}) }}>
                <div style={{ color: '#00d4ff', fontSize: 13, marginBottom: 16 }}>{t2.stars}</div>
                <p style={{ color: 'rgba(154,175,199,0.85)', fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>{t2.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://placehold.co/40x40/${t2.color}?text=${t2.initials}`} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(0,212,255,0.2)' }} alt={t2.name} />
                  <div>
                    <a href={t2.href} target="_blank" rel="noopener" style={{ color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none', borderBottom: '1px solid rgba(0,212,255,0.4)' }}>{t2.name}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ padding: '96px 0', position: 'relative' }} className="grid-bg">
        <div className="radial-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 24 }}><span className="badge-text">{t.faqSec.badge}</span></div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900 }}>{t.faqSec.h2}</h2>
          </div>
          <div>
            {faqItems.map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`} style={{ padding: '24px 0', cursor: 'pointer', borderBottom: i < faqItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 16, lineHeight: 1.4 }}>{item.q}</h3>
                  <span className="faq-icon" style={{ color: '#00d4ff', fontSize: 24, lineHeight: 1, flexShrink: 0, fontWeight: 300, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>+</span>
                </div>
                <div className="faq-answer" style={{ display: openFaq === i ? 'block' : 'none', marginTop: 16, color: 'rgba(154,175,199,0.8)', fontSize: 14, lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ───────────────────────────────────────────────────────── */}
      <section id="contacto" style={{ padding: '96px 0 128px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(14,31,58,0.5),#0a1628,rgba(6,14,26,0.8))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'rgba(0,212,255,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge" style={{ marginBottom: 24 }}><span className="badge-text">{t.contact.badge}</span></div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.15 }}>
              {t.contact.h2a}<br />
              <span className="gradient-text text-glow">{t.contact.h2b}</span>
            </h2>
            <p style={{ color: '#9aafc7', fontSize: 16, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>{t.contact.desc}</p>
          </div>

          <div className="form-card" style={{ background: 'linear-gradient(135deg,rgba(14,31,58,0.92) 0%,rgba(10,22,40,0.97) 100%)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 20, padding: '40px 40px 44px', boxShadow: '0 24px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(0,212,255,0.05)' }}>
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,153,204,0.1))', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="28" height="28" fill="none" stroke="#00d4ff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }} className="gradient-text">{t.contact.successTitle}</h3>
                <p style={{ color: '#9aafc7', fontSize: 15, lineHeight: 1.7 }}>{t.contact.successDesc}</p>
              </div>
            ) : (
              <form id="diagnostico-form" onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <input type="hidden" name="access_key" value="8f3e5fb7-4f79-4926-93bf-a89060ad072f" />
                <input type="hidden" name="subject" value="Nuevo diagnóstico gratuito — G.I.A. Solutions" />
                <input type="hidden" name="from_name" value="G.I.A. Solutions Web" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                {[
                  { label: t.contact.f1, name: 'nombre', type: 'text', placeholder: t.contact.p1, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', required: true },
                  { label: t.contact.f2, name: 'empresa', type: 'text', placeholder: t.contact.p2, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', required: true },
                  { label: t.contact.f3, name: 'url', type: 'url', placeholder: t.contact.p3, icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', required: false },
                  { label: t.contact.f4, name: 'contacto', type: 'text', placeholder: t.contact.p4, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', required: true },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(154,175,199,0.8)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{f.label}</label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" fill="none" stroke="rgba(0,212,255,0.5)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
                      <input type={f.type} name={f.name} placeholder={f.placeholder} required={f.required} style={inputStyle()}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.boxShadow = 'none' }} />
                    </div>
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(154,175,199,0.8)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{t.contact.f5}</label>
                  <div style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', left: 14, top: 18, pointerEvents: 'none' }} width="16" height="16" fill="none" stroke="rgba(0,212,255,0.5)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <textarea name="desafio" rows={4} placeholder={t.contact.p5} required
                      style={{ ...inputStyle(), resize: 'vertical', minHeight: 120 }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.boxShadow = 'none' }} />
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={formStatus === 'loading'} style={{ width: '100%', padding: '17px 32px', borderRadius: 12, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 4 }}>
                  {formStatus === 'loading' ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <svg style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      {t.contact.submitting}
                    </span>
                  ) : (
                    <>
                      {t.contact.submit}
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </>
                  )}
                </button>
                <p style={{ textAlign: 'center', color: 'rgba(154,175,199,0.4)', fontSize: 12, marginTop: -8 }}>{t.contact.trust}</p>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 36 }}>
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: t.contact.badges[0] },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: t.contact.badges[1] },
              { icon: 'M5 13l4 4L19 7', label: t.contact.badges[2] },
            ].map(b => (
              <span key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(154,175,199,0.45)', fontSize: 12 }}>
                <svg width="14" height="14" fill="none" stroke="#9aafc7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={b.icon} /></svg>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ position: 'relative', padding: '64px 0 32px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent 0%,rgba(0,212,255,0.08) 15%,rgba(0,212,255,0.9) 50%,rgba(0,212,255,0.08) 85%,transparent 100%)', backgroundSize: '200% 100%', animation: 'navBorderShimmer 3.5s linear infinite' }} />
        {[
          { t: '18%', l: '8%', s: 2, a: 'fp1 9s' }, { t: '55%', l: '22%', s: 3, a: 'fp2 12s' },
          { t: '30%', l: '50%', s: 2, a: 'fp3 8s' }, { t: '70%', l: '68%', s: 3, a: 'fp1 11s ease-in-out infinite reverse' },
          { t: '20%', l: '80%', s: 2, a: 'fp2 10s ease-in-out infinite reverse' }, { t: '80%', l: '92%', s: 3, a: 'fp3 13s' },
        ].map((p, i) => (
          <span key={i} style={{ position: 'absolute', top: p.t, left: p.l, width: p.s, height: p.s, borderRadius: '50%', background: '#00d4ff', opacity: 0.2, animation: `${p.a} ease-in-out infinite`, pointerEvents: 'none' }} />
        ))}

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }} className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-gia.jpeg" alt="G.I.A. Solutions" style={{ width: 34, height: 34, objectFit: 'contain', borderRadius: 6 }} />
                <span style={{ fontWeight: 700, fontSize: 15 }}><span className="silver-text">G.I.A.</span> <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span> <span>Solutions</span></span>
              </div>
              <div style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { e: '📍', c: 'Quito, Ecuador' },
                  { e: '📧', c: 'giasolutions.ec@outlook.com', href: 'mailto:giasolutions.ec@outlook.com' },
                  { e: '📱', c: '+593 995 002 996' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, minWidth: 18 }}>{row.e}</span>
                    {row.href
                      ? <a href={row.href} className="footer-link" style={{ color: 'rgba(154,175,199,0.55)', fontSize: 12 }}>{row.c}</a>
                      : <span style={{ color: 'rgba(154,175,199,0.55)', fontSize: 12 }}>{row.c}</span>}
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ minWidth: 15, opacity: 0.7 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#9aafc7" strokeWidth="2" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="#9aafc7" strokeWidth="2" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#9aafc7" strokeWidth="2" strokeLinecap="round" /></svg>
                  <a href="https://www.instagram.com/giasolutions.ec/" target="_blank" rel="noopener" className="footer-link" style={{ color: 'rgba(154,175,199,0.55)', fontSize: 12 }}>@giasolutions.ec</a>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>{t.footer.services}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.footer.svcLinks.map(s => (
                  <li key={s}><a href="#servicios" className="footer-link" style={{ color: 'rgba(154,175,199,0.55)', fontSize: 13 }}>{s}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>{t.footer.company}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.footer.compLinks.map(i => (
                  <li key={i.l}><a href={i.h} className="footer-link" style={{ color: 'rgba(154,175,199,0.55)', fontSize: 13 }}>{i.l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>{t.footer.legal}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(lang === 'en'
                  ? [{ l: 'Privacy Policy', h: '/politica-de-privacidad.html' }, { l: 'Terms of Service', h: '/terminos-de-servicio.html' }, { l: 'Cookies', h: '/politica-de-cookies.html' }]
                  : [{ l: 'Política de privacidad', h: '/politica-de-privacidad.html' }, { l: 'Términos de servicio', h: '/terminos-de-servicio.html' }, { l: 'Cookies', h: '/politica-de-cookies.html' }]
                ).map(i => (
                  <li key={i.l}><a href={i.h} className="footer-link" style={{ color: 'rgba(154,175,199,0.55)', fontSize: 13 }}>{i.l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="divider-cyan" style={{ marginBottom: 28 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <p style={{ color: 'rgba(154,175,199,0.35)', fontSize: 12 }}>{t.footer.copyright}</p>
            <p style={{ color: 'rgba(154,175,199,0.35)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#00d4ff', opacity: 0.6 }}>✦</span>
              G.I.A. Solutions · Quito, Ecuador
            </p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ────────────────────────────────────────── */}
      <a
        href="https://wa.me/593995002996"
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        style={{
          position: 'fixed', bottom: 32, right: 32, width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(37,211,102,0.45)', zIndex: 999, textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(37,211,102,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.45)' }}
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
      </a>
    </>
  )
}
