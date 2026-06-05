import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'G.I.A. Solutions – Agencia de Inteligencia Artificial | Quito, Ecuador',
  description:
    'Agencia de Automatizaciones con sede en Quito, Ecuador. Páginas web de alto impacto, chatbots con IA y auditoría digital para hacer crecer tu negocio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
