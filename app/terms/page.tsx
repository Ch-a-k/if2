import styles from '../privacy/legal.module.css';

export const metadata = {
  title: 'Terms of Service | IN-FOMO.',
  description: 'Terms and conditions for using IN-FOMO. services.',
};

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last Updated: January 9, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services of IN-FOMO. ("Company," "we," "our," or "us"), 
              you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
            <p className={styles.disclaimer}>
              <strong>Important:</strong> These Terms are provided for general informational purposes and do not 
              constitute legal advice. Consult a qualified attorney for legal guidance.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Description of Services</h2>
            <p>
              IN-FOMO. provides digital solutions including web development, mobile applications, UI/UX design, 
              blockchain solutions, and digital consulting services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Use of Website</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful code or malware</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Engage in any activity that interferes with website functionality</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Intellectual Property</h2>
            <p>
              All content, designs, logos, and materials on our website are owned by or licensed to IN-FOMO. 
              and are protected by intellectual property laws. You may not use, reproduce, or distribute our 
              content without explicit written permission.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Warranties and Disclaimers</h2>
            <p className={styles.disclaimer}>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul>
              <li>OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
              <li>WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED</li>
              <li>WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE SERVICES</li>
              <li>WE DO NOT GUARANTEE SPECIFIC RESULTS OR OUTCOMES</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Limitation of Liability</h2>
            <p className={styles.disclaimer}>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</strong>
            </p>
            <ul>
              <li>WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
              <li>THIS INCLUDES DAMAGES FOR LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION</li>
              <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID FOR THE SPECIFIC SERVICE</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless IN-FOMO. from any claims, damages, losses, or expenses 
              arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of Poland, without regard to conflict of law provisions. 
              Any disputes shall be subject to the exclusive jurisdiction of the courts of Poland.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Final Disclaimer</h2>
            <p className={styles.disclaimer}>
              <strong>DISCLAIMER:</strong> These Terms are provided for general guidance only and may not be legally 
              sufficient for all purposes. We expressly disclaim any responsibility arising from your reliance on these 
              Terms. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DAMAGES WHATSOEVER.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <p>
              Email: info@in-fomo.com<br />
              Telegram: <a href="https://t.me/in_fomo" target="_blank" rel="noopener noreferrer">@in_fomo</a><br />
              Clutch: <a href="https://clutch.co/profile/fomo-0" target="_blank" rel="noopener noreferrer">Our Profile</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

