import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SITE } from './lib/site'

// Tarjeta 1200×630 que se muestra al compartir el link en WhatsApp,
// LinkedIn, Facebook, X o Slack.
export const alt = 'G.I.A. Solutions — Creación de páginas web y e-commerce en Quito, Ecuador'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function markDataUrl(): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), 'public', 'logo-gia-mark.png'))
    return `data:image/png;base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const mark = await markDataUrl()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 80px',
          background:
            'radial-gradient(ellipse 90% 70% at 50% 0%, #12325a 0%, #0a1628 55%, #060e1a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 44 }}>
          {mark ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mark} alt="" width={80} height={80} style={{ borderRadius: 18 }} />
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 700,
              color: '#e8f2fa',
              letterSpacing: '-0.01em',
            }}
          >
            G.I.A. Solutions
          </div>
        </div>

        {/* Titular */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          <div style={{ display: 'flex' }}>Creación de páginas web,</div>
          <div style={{ display: 'flex', color: '#4dd4f5' }}>e-commerce y menús digitales</div>
        </div>

        {/* Subtítulo */}
        <div style={{ display: 'flex', marginTop: 32, fontSize: 30, color: '#9aafc7' }}>
          Agencia de automatizaciones · {SITE.city}, Ecuador
        </div>

        {/* Línea inferior */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 52 }}>
          <div style={{ display: 'flex', width: 64, height: 4, background: '#00d4ff', borderRadius: 2 }} />
          <div style={{ display: 'flex', fontSize: 26, color: '#00d4ff', fontWeight: 600 }}>
            Diagnóstico gratuito · Entrega en 7 días
          </div>
        </div>
      </div>
    ),
    size,
  )
}
