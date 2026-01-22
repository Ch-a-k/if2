'use client'

import {useState, useEffect} from 'react'
import Script from 'next/script'
import styles from './ContactForm.module.css'
import { collectTrackingData, trackPageVisit } from '@/lib/tracking'

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    trackPageVisit(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) return
    window.onTurnstileSuccess = (token: string) => setTurnstileToken(token)
    window.onTurnstileExpired = () => setTurnstileToken('')

    return () => {
      delete window.onTurnstileSuccess
      delete window.onTurnstileExpired
    }
  }, [turnstileSiteKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Собираем tracking данные
      const tracking = collectTrackingData()

      // Отправляем через API
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tracking,
          website: honeypot,
          turnstileToken,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({name: '', email: '', message: ''})
        setHoneypot('')
        setTurnstileToken('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      console.error('Error sending form:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className={styles.contactSection}>
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <div className={styles.badge}>Start Your Project</div>
            <h2 className={styles.title}>Ready to Build Something Amazing?</h2>
            <p className={styles.description}>
              Turn your ideas into reality with our expert team. We've helped 70+ companies launch successful digital products.
            </p>
            
            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.benefitIcon}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className={styles.benefitTitle}>Free Consultation</div>
                  <div className={styles.benefitText}>30-minute strategy session</div>
                </div>
              </div>
              
              <div className={styles.benefit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.benefitIcon}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className={styles.benefitTitle}>Fast Response</div>
                  <div className={styles.benefitText}>We reply within 2 hours</div>
                </div>
              </div>
              
              <div className={styles.benefit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.benefitIcon}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className={styles.benefitTitle}>No Commitment</div>
                  <div className={styles.benefitText}>Just a friendly conversation</div>
                </div>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>150+</div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>50+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>5★</div>
                <div className={styles.statLabel}>Clutch Rating</div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <form onSubmit={handleSubmit} className={styles.form}>
          {/* Honeypot (anti-bot). Hidden from users via CSS */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className={styles.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className={styles.textarea}
              required
            />
          </div>

              {turnstileSiteKey && (
                <div
                  className={`${styles.turnstile} cf-turnstile`}
                  data-sitekey={turnstileSiteKey}
                  data-callback="onTurnstileSuccess"
                  data-expired-callback="onTurnstileExpired"
                />
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'sending' || (!!turnstileSiteKey && !turnstileToken)}
              >
                {status === 'sending' ? 'Sending...' : 'Start Your Project →'}
              </button>

              {status === 'success' && (
                <p className={styles.successMessage}>
                  🎉 Thank you! We'll get back to you within 2 hours.
                </p>
              )}

              {status === 'error' && (
                <p className={styles.errorMessage}>
                  Failed to send. Please try again or email us directly.
                </p>
              )}
            </form>

            <p className={styles.privacy}>
              🔒 Your information is secure. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
