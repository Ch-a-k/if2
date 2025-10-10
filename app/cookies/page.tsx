import styles from '../privacy/legal.module.css';

export const metadata = {
  title: 'Cookie Policy | IN-FOMO.',
  description: 'Learn about how IN-FOMO. uses cookies and similar technologies.',
};

export default function CookiePolicy() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: January 9, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website. They help us provide 
              a better user experience by remembering your preferences and understanding how you interact with our site.
            </p>
            <p className={styles.disclaimer}>
              <strong>Disclaimer:</strong> This cookie policy is provided for informational purposes only. 
              We make no warranties regarding its legal sufficiency or compliance.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Types of Cookies We Use</h2>
            
            <h3>2.1 Strictly Necessary Cookies</h3>
            <p>
              These cookies are essential for the website to function properly. They enable core functionality 
              such as security, network management, and accessibility. You may disable these by changing your 
              browser settings, but this may affect website functionality.
            </p>

            <h3>2.2 Performance Cookies</h3>
            <p>
              These cookies collect information about how visitors use our website, such as which pages are 
              visited most often. This helps us improve website performance and user experience.
            </p>

            <h3>2.3 Functionality Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make and provide enhanced features. 
              They may track your preferences for language, region, or theme.
            </p>

            <h3>2.4 Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand visitor behavior and improve our services. 
              This data is aggregated and anonymous.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages. We do not control 
              the use of these cookies. Please review the respective privacy policies of these third parties:
            </p>
            <ul>
              <li>Google Analytics</li>
              <li>Social media platforms (Twitter, LinkedIn, Instagram)</li>
              <li>Content delivery networks</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways:
            </p>
            <ul>
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies</li>
              <li><strong>Cookie Banner:</strong> Use our cookie consent banner to manage preferences</li>
              <li><strong>Opt-Out Tools:</strong> Use browser extensions or privacy tools</li>
            </ul>
            <p>
              Please note that disabling cookies may affect website functionality and your user experience.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. GDPR Compliance</h2>
            <p>
              In compliance with GDPR, we:
            </p>
            <ul>
              <li>Obtain consent before placing non-essential cookies</li>
              <li>Provide clear information about cookie usage</li>
              <li>Allow users to withdraw consent at any time</li>
              <li>Minimize data collection and retention</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Cookie Retention</h2>
            <p>
              Different cookies have different retention periods:
            </p>
            <ul>
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 1-12 months)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Changes will be posted on this page with 
              an updated revision date. Continued use of our website constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Disclaimer of Liability</h2>
            <p className={styles.disclaimer}>
              <strong>IMPORTANT:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, we disclaim all liability 
              for any issues arising from cookie usage, including but not limited to: data breaches, privacy 
              violations, functionality issues, or third-party actions. This policy is provided "as is" without 
              any warranties.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Contact Us</h2>
            <p>
              If you have questions about our Cookie Policy, please contact us:
            </p>
            <p>
              Email: privacy@in-fomo.com<br />
              Telegram: <a href="https://t.me/in_fomo" target="_blank" rel="noopener noreferrer">@in_fomo</a><br />
              Clutch: <a href="https://clutch.co/profile/fomo-0" target="_blank" rel="noopener noreferrer">Our Profile</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

