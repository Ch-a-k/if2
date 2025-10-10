import styles from './legal.module.css';

export const metadata = {
  title: 'Privacy Policy | IN-FOMO.',
  description: 'Learn how IN-FOMO. collects, uses, and protects your personal data in compliance with GDPR.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: January 9, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
              IN-FOMO. ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information in accordance with the 
              General Data Protection Regulation (GDPR) and other applicable data protection laws.
            </p>
            <p className={styles.disclaimer}>
              <strong>Important:</strong> This privacy policy is provided for informational purposes only and does not 
              constitute legal advice. We make no warranties or guarantees regarding the legal compliance or sufficiency of 
              this policy. We recommend consulting with a qualified legal professional for specific guidance.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Data Controller</h2>
            <p>
              IN-FOMO. is the data controller responsible for your personal data. For any privacy-related inquiries, 
              please contact us at:
            </p>
            <p>
              Email: privacy@in-fomo.com<br />
              Telegram: <a href="https://t.me/in_fomo" target="_blank" rel="noopener noreferrer">@in_fomo</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Information We Collect</h2>
            <h3>3.1 Information You Provide</h3>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Company information (company name, position)</li>
              <li>Project details and requirements</li>
              <li>Communication content (messages, inquiries)</li>
            </ul>

            <h3>3.2 Automatically Collected Information</h3>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, referral sources)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Legal Basis for Processing</h2>
            <p>We process your personal data under the following legal bases:</p>
            <ul>
              <li><strong>Consent:</strong> When you voluntarily provide information through forms</li>
              <li><strong>Contract:</strong> To fulfill our contractual obligations</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and communicate with you</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. How We Use Your Information</h2>
            <ul>
              <li>Respond to your inquiries and provide requested services</li>
              <li>Process and fulfill project requests</li>
              <li>Send administrative information and updates</li>
              <li>Improve our website and services</li>
              <li>Conduct analytics and research</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Your Rights Under GDPR</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at privacy@in-fomo.com
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className={styles.disclaimer}>
              <strong>Disclaimer:</strong> While we strive to protect your data, we cannot guarantee absolute security. 
              To the maximum extent permitted by law, we disclaim all liability for any security breaches beyond our 
              reasonable control.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience. For detailed information, 
              please see our <a href="/cookies">Cookie Policy</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Disclaimer of Liability</h2>
            <p className={styles.disclaimer}>
              <strong>IMPORTANT NOTICE:</strong> This privacy policy is provided "as is" without any warranties, 
              express or implied. TO THE MAXIMUM EXTENT PERMITTED BY LAW, we disclaim all liability for any damages 
              arising from the use or reliance on this policy or our data practices. Users are advised to seek 
              independent legal counsel for specific privacy concerns.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this privacy policy, please contact us:
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

