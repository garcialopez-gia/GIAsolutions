'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatCardProps {
  lang?: 'es' | 'en'
}

function BotAvatar() {
  return (
    <div
      style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'rgba(0,212,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 2,
      }}
    >
      <svg width="12" height="12" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </div>
  )
}

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5, height: 5, borderRadius: '50%', background: '#00d4ff',
            animation: 'pulse-dot 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </span>
  )
}

export default function ChatCard({ lang = 'es' }: ChatCardProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: lang === 'en' ? 'Hello! How can I help you today?' : '¡Hola! ¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  async function sendMessage() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    // Optimistically add empty assistant bubble
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, lang }),
      })

      // Handle structured error responses from the API
      if (!res.ok) {
        let friendlyMsg = lang === 'en'
          ? 'Sorry, the assistant is unavailable right now. You can reach us on WhatsApp: +593 995 002 996'
          : 'Lo siento, el asistente no está disponible ahora. Puedes contactarnos por WhatsApp: +593 995 002 996'
        try {
          const errData = await res.json()
          if (errData?.error) friendlyMsg = errData.error
        } catch { /* body wasn't JSON, use default */ }
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: friendlyMsg },
        ])
        return
      }

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          return [
            ...prev.slice(0, -1),
            { ...last, content: last.content + chunk },
          ]
        })
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: lang === 'en' ? 'A connection error occurred. Please try again.' : 'Ocurrió un error de conexión. Por favor intenta de nuevo.' },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="feature-card" style={{ borderRadius: 20, padding: 28 }}>
      {/* Card glow element */}
      <div className="card-glow" />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 11, color: 'rgba(154,175,199,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
          {lang === 'en' ? 'Active chatbot' : 'Chatbot activo'}
        </p>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          <span style={{ fontSize: 10, color: 'rgba(154,175,199,0.5)' }}>{lang === 'en' ? 'Online' : 'En línea'}</span>
        </span>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          maxHeight: 300, overflowY: 'auto', marginBottom: 12,
          scrollbarWidth: 'none',
        }}
      >
        {messages.map((msg, i) =>
          msg.role === 'assistant' ? (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <BotAvatar />
              <div
                style={{
                  background: 'rgba(14,31,58,0.7)', borderRadius: 10,
                  padding: '8px 12px', fontSize: 12, color: '#9aafc7',
                  maxWidth: 260, wordBreak: 'break-word', lineHeight: 1.5,
                }}
              >
                {msg.content === '' && isLoading && i === messages.length - 1
                  ? <TypingDots />
                  : msg.content}
              </div>
            </div>
          ) : (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              <div
                style={{
                  background: 'rgba(0,212,255,0.12)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: 10, padding: '8px 12px',
                  fontSize: 12, color: '#fff',
                  maxWidth: 260, wordBreak: 'break-word', lineHeight: 1.5,
                }}
              >
                {msg.content}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'en' ? 'Type your message...' : 'Escribe tu mensaje...'}
          maxLength={500}
          disabled={isLoading}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: 10,
            padding: '8px 12px',
            color: '#fff',
            fontSize: 12,
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            width: 34, height: 34, flexShrink: 0,
            background: input.trim() && !isLoading
              ? 'rgba(0,212,255,0.2)'
              : 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s, box-shadow 0.2s',
            opacity: input.trim() && !isLoading ? 1 : 0.5,
          }}
        >
          <svg width="14" height="14" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  )
}
