'use client'

import { useEffect, useRef, useState } from 'react'

export type ServiceItem = {
  label: string; short: string; title: string; titleGrad: string; desc: string; desc2: string; back: string
  reverse?: boolean; demoHref?: string; demoLabel?: string
  features: { icon: string; title: string; desc: string }[]
}

export type AgentContent = {
  short: string; label: string; title: string; titleGrad: string
  whatIs: string; definition: string; provider: string; cta: string
  exampleTitle: string; steps: { title: string; desc: string }[]
}

// Recorrido del scroll en unidades de vh. El CSS recibe el total por --svc-run,
// así la altura queda reservada desde el HTML del servidor, sin medir nada.
const HOLD = 60     // el primer panel se queda quieto mientras avanza el ejemplo
const TRAVEL = 100  // scroll necesario para pasar de un panel al siguiente
const TAIL = 20     // pausa en el último panel antes de soltar la página

// Debe coincidir con la media query "Escritorio" de globals.css.
const PIN_QUERY =
  '(min-width: 1024px) and (min-height: 620px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

// Frena cerca de cada panel para que el texto se pueda leer quieto.
const dwell = (f: number) => 0.3 * f + 0.7 * f * f * (3 - 2 * f)

export default function ServicesShowcase({ agent, services, railLabel, demoLabel }: {
  agent: AgentContent
  services: ServiceItem[]
  railLabel: string
  demoLabel: string
}) {
  const beats = services.length + 1
  const run = HOLD + TRAVEL * (beats - 1) + TAIL

  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const goToRef = useRef<(beat: number) => void>(() => {})
  const [active, setActive] = useState(0)

  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    const bar = barRef.current
    const stepList = stepsRef.current
    if (!pin || !track || !bar || !stepList) return

    const steps = Array.from(stepList.children) as HTMLElement[]
    const media = window.matchMedia(PIN_QUERY)
    let detach: (() => void) | null = null

    function attach() {
      let shownBeat = -1
      let shownSteps = -1
      let frame = 0
      let lastTime = 0
      let target = readProgress()
      let current = target

      function readProgress() {
        const box = pin!.getBoundingClientRect()
        return clamp01(-box.top / (box.height - window.innerHeight))
      }

      function paint(progress: number) {
        const travelled = progress * run
        const trace = clamp01(travelled / HOLD)
        const position = clamp01((travelled - HOLD) / (TRAVEL * (beats - 1))) * (beats - 1)
        const from = Math.min(Math.floor(position), beats - 2)
        const x = from + dwell(position - from)

        track!.style.transform = `translate3d(${(-x * 100) / beats}%,0,0)`
        bar!.style.transform = `scaleX(${(x + 1) / beats})`

        // El margen evita que un redondeo de scroll deje apagado el último paso.
        const lit = 1 + Math.floor(trace * (steps.length - 1) + 0.05)
        if (lit !== shownSteps) {
          shownSteps = lit
          steps.forEach((el, i) => el.toggleAttribute('data-dim', i >= lit))
        }

        const nearest = Math.round(x)
        if (nearest !== shownBeat) {
          shownBeat = nearest
          setActive(nearest)
        }
      }

      function tick(now: number) {
        const elapsed = Math.min(now - lastTime, 64)
        lastTime = now
        current += (target - current) * (1 - Math.exp(-elapsed / 110))
        if (Math.abs(target - current) < 0.00005) current = target
        paint(current)
        frame = current === target ? 0 : requestAnimationFrame(tick)
      }

      function onScroll() {
        target = readProgress()
        if (!frame) {
          lastTime = performance.now()
          frame = requestAnimationFrame(tick)
        }
      }

      goToRef.current = (beat) => {
        const box = pin!.getBoundingClientRect()
        const stop = (HOLD + TRAVEL * beat) / run
        window.scrollTo({ top: window.scrollY + box.top + stop * (box.height - window.innerHeight), behavior: 'smooth' })
      }

      // Con teclado, un enlace puede recibir foco en un panel que aún está fuera de vista.
      function onFocusIn(e: FocusEvent) {
        const beat = (e.target as HTMLElement).closest<HTMLElement>('[data-beat]')
        if (beat && Number(beat.dataset.beat) !== shownBeat) goToRef.current(Number(beat.dataset.beat))
      }

      paint(current)
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      pin!.addEventListener('focusin', onFocusIn)

      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        pin!.removeEventListener('focusin', onFocusIn)
        track!.style.transform = ''
        bar!.style.transform = ''
        steps.forEach(el => el.removeAttribute('data-dim'))
        goToRef.current = () => {}
      }
    }

    function sync() {
      detach?.()
      detach = media.matches ? attach() : null
    }

    sync()
    media.addEventListener('change', sync)
    return () => {
      media.removeEventListener('change', sync)
      detach?.()
    }
  }, [beats, run])

  const stops = [agent.short, ...services.map(s => s.short)]

  return (
    <div ref={pinRef} className="svc-pin" style={{ '--svc-run': run, '--svc-beats': beats } as React.CSSProperties}>
      <div className="svc-stage">
        <nav className="svc-rail" aria-label={railLabel}>
          <div className="svc-rail-inner">
            <div className="svc-rail-tabs">
              {stops.map((name, i) => (
                <button key={i} type="button" aria-current={active === i ? 'true' : undefined} onClick={() => goToRef.current(i)}>{name}</button>
              ))}
            </div>
            <div className="svc-rail-line"><div ref={barRef} className="svc-rail-bar" /></div>
          </div>
        </nav>

        <div ref={trackRef} className="svc-track">
          <article className="svc-beat" data-beat={0}>
            <div className="svc-beat-inner">
              <div className="svc-copy">
                <p className="svc-label">{agent.label}</p>
                <h3 className="svc-title">{agent.title}<br /><span className="gradient-text">{agent.titleGrad}</span></h3>
                <h4 className="svc-whatis">{agent.whatIs}</h4>
                <p className="svc-lead">{agent.definition}</p>
                <p className="svc-note">{agent.provider}</p>
                <a href="#contacto" className="btn-primary svc-cta">{agent.cta}</a>
              </div>
              <div className="feature-card svc-trace">
                <div className="card-glow" />
                <p className="svc-trace-title">{agent.exampleTitle}</p>
                <ol ref={stepsRef} className="svc-steps">
                  {agent.steps.map((step, i) => (
                    <li key={i} className="svc-step">
                      <p className="svc-step-title">{step.title}</p>
                      <p className="svc-step-desc">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>

          {services.map((svc, i) => (
            <article key={i} className={`svc-beat svc-beat--service${svc.reverse ? ' is-reverse' : ''}`} data-beat={i + 1}>
              <div className="svc-beat-inner">
                <div className="svc-copy">
                  <p className="svc-label">{svc.label}</p>
                  <h3 className="svc-title">{svc.title}<br /><span className="gradient-text">{svc.titleGrad}</span></h3>
                  <p className="svc-lead">{svc.desc}</p>
                  <p className="svc-note">{svc.desc2}</p>
                  {svc.demoHref && (
                    <a href={svc.demoHref} target="_blank" rel="noopener" className="svc-demo">{svc.demoLabel ?? demoLabel}</a>
                  )}
                </div>
                <div className="feature-card svc-features">
                  <div className="card-glow" />
                  <div className="svc-feature-list">
                    {svc.features.map((f, fi) => (
                      <div key={fi} className="svc-feature">
                        <div className="svc-feature-icon">
                          <svg width="16" height="16" fill="none" stroke="#00d4ff" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
                        </div>
                        <div>
                          <p className="svc-feature-title">{f.title}</p>
                          <p className="svc-feature-desc">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
