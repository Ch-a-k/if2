'use client'

import { useState } from 'react'
import styles from './CacheRefreshButton.module.css'

export default function CacheRefreshButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRefresh = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/refresh-cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setMessage('✅ Кеш обновлен!')
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage('❌ Ошибка обновления')
      }
    } catch (error) {
      setMessage('❌ Ошибка сети')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={handleRefresh}
        disabled={isLoading}
        title="Обновить данные с Sanity"
      >
        {isLoading ? (
          <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 12c0-4.9-4-9-9-9-2.5 0-4.8 1.1-6.4 2.8M3 12c0 4.9 4 9 9 9 2.5 0 4.8-1.1 6.4-2.8M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  )
}

