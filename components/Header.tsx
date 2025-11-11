'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="IN-FOMO." className={styles.logoImage} width="120" height="40" />
          </Link>
        </div>

        <div className={styles.rightSection}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              <span>Home</span>
            </Link>
            <Link href="/about" className={styles.navLink}>
              <span>About Us</span>
            </Link>
            <Link href="/works" className={styles.navLink}>
              <span>Examples</span>
            </Link>
            <Link href="/blog" className={styles.navLink}>
              <span>Blog</span>
            </Link>
            <Link href="/contact" className={styles.navLink}>
              <span>Contact</span>
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaButton}>
              <span>Start a Project</span>
            </Link>
          </div>

          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/works" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Examples
          </Link>
          <Link href="/blog" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/contact" className={styles.mobileCtaButton} onClick={() => setIsMenuOpen(false)}>
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}