'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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

                <button type="submit" className={styles.submitButton}>
                  <span>Send Message</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
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
