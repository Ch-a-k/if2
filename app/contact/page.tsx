'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import styles from './page.module.css';
import { collectTrackingData, trackPageVisit } from '@/lib/tracking';

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    trackPageVisit('/contact');
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    window.onTurnstileSuccess = (token: string) => setTurnstileToken(token);
    window.onTurnstileExpired = () => setTurnstileToken('');

    return () => {
      delete window.onTurnstileSuccess;
      delete window.onTurnstileExpired;
    };
  }, [turnstileSiteKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Собираем tracking данные
      const tracking = collectTrackingData();

      // Отправляем в Telegram через API
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
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setHoneypot('');
        setTurnstileToken('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.contact}>
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Let's Build</h1>
          <p className={styles.description}>Do you have a project in mind or are you experiencing problems with your projects? We'd love to solve it.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.formSection}>
              <form className={styles.form} onSubmit={handleSubmit}>
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
                  <label className={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    name="message"
                    className={styles.textarea}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
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
                  <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {status === 'success' && (
                  <p className={styles.successMessage}>
                    ✅ Thank you! We'll get back to you within 2 hours.
                  </p>
                )}

                {status === 'error' && (
                  <p className={styles.errorMessage}>
                    ❌ Failed to send. Please try again or contact us via Telegram.
                  </p>
                )}
              </form>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className={styles.infoLabel}>Email</div>
                <a href="mailto:info@in-fomo.com" className={styles.infoValue}>
                  info@in-fomo.com
                </a>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className={styles.infoLabel}>Telegram</div>
                <a href="https://t.me/in_fomo" className={styles.infoValue}>
                  @in_fomo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.offices}>
        <div className={styles.container}>
          <div className={styles.officesHeader}>
            <h2 className={styles.officesTitle}>Our Offices</h2>
            <p className={styles.officesDescription}>
              We operate across multiple time zones to serve our global clients
            </p>
          </div>
          <div className={styles.officesGrid}>
            <div className={styles.officeCard}>
              <div className={styles.officeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.officeCity}>Scottsdale, USA</h3>
              <p className={styles.officeAddress}>15169 N Scottsdale Rd Suite 205, Scottsdale, AZ 85254, USA</p>
            </div>
            
            <div className={styles.officeCard}>
              <div className={styles.officeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.officeCity}>Warsaw, Poland</h3>
              <p className={styles.officeAddress}>Stawki 2A, 00-193 Warszawa</p>
            </div>
            
            <div className={styles.officeCard}>
              <div className={styles.officeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.officeCity}>Kyiv, Ukraine</h3>
              <p className={styles.officeAddress}>Antonovicha St., 44, Kyiv, Ukraine, 03186</p>
            </div>
            
            <div className={styles.officeCard}>
              <div className={styles.officeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.officeCity}>Tallinn, Estonia</h3>
              <p className={styles.officeAddress}>Lõõtsa tn 12, 11415 Tallinn, Estonia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
