'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { collectTrackingData, trackPageVisit } from '@/lib/tracking';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    trackPageVisit('/contact');
  }, []);

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
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
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

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={status === 'sending'}
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
                <div className={styles.infoIcon}>✉</div>
                <div className={styles.infoLabel}>Email</div>
                <a href="mailto:info@in-fomo.com" className={styles.infoValue}>
                  info@in-fomo.com
                </a>
              </div>

             

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                ⏃
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
    </div>
  );
}
