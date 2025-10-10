'use client';

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Cookie preferences state
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    marketing: true,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Here you would initialize your analytics/marketing scripts
    initializeScripts(consent);
  };

  const acceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Initialize only approved scripts
    initializeScripts(consent);
  };

  const rejectNonEssential = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const initializeScripts = (consent: any) => {
    // Initialize analytics if approved
    if (consent.analytics && typeof window !== 'undefined') {
      // Example: Initialize Google Analytics
      // window.gtag('consent', 'update', {
      //   'analytics_storage': 'granted'
      // });
    }

    // Initialize marketing scripts if approved
    if (consent.marketing && typeof window !== 'undefined') {
      // Example: Initialize marketing pixels
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsVisible(false)} />
      <div className={styles.banner}>
        <div className={styles.content}>
          {!showSettings ? (
            <>
              <div className={styles.mainContent}>
                <div className={styles.textSection}>
                  <div className={styles.iconInline}>🍪</div>
                  <div className={styles.text}>
                    <h3 className={styles.title}>Cookies & Privacy</h3>
                    <p className={styles.description}>
                      We use cookies to enhance your experience.{' '}
                      <a href="/cookies" target="_blank">Cookie Policy</a>
                    </p>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button 
                    className={styles.buttonPrimary} 
                    onClick={acceptAll}
                  >
                    Accept All
                  </button>
                  <button 
                    className={styles.buttonSecondary} 
                    onClick={rejectNonEssential}
                  >
                    Reject
                  </button>
                  <button 
                    className={styles.buttonLink} 
                    onClick={() => setShowSettings(true)}
                    title="Cookie Settings"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.settingsHeader}>
                <button 
                  className={styles.backButton} 
                  onClick={() => setShowSettings(false)}
                >
                  ← Back
                </button>
                <h3 className={styles.title}>Cookie Settings</h3>
              </div>

              <div className={styles.preferences}>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceHeader}>
                    <label className={styles.preferenceLabel}>
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                      />
                      <span className={styles.checkbox}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <div>
                        <strong>Strictly Necessary</strong>
                        <p>Required for the website to function.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceHeader}>
                    <label className={styles.preferenceLabel}>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                      />
                      <span className={styles.checkbox}>
                        {preferences.analytics && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <div>
                        <strong>Analytics</strong>
                        <p>Help us understand visitor behavior.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceHeader}>
                    <label className={styles.preferenceLabel}>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                      />
                      <span className={styles.checkbox}>
                        {preferences.marketing && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <div>
                        <strong>Marketing</strong>
                        <p>Track visitors for marketing purposes.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceHeader}>
                    <label className={styles.preferenceLabel}>
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                      />
                      <span className={styles.checkbox}>
                        {preferences.functional && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <div>
                        <strong>Functional</strong>
                        <p>Remember preferences and settings.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.buttons}>
                <button 
                  className={styles.buttonPrimary} 
                  onClick={acceptSelected}
                >
                  Save Preferences
                </button>
                <button 
                  className={styles.buttonSecondary} 
                  onClick={acceptAll}
                >
                  Accept All
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

