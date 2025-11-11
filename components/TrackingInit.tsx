'use client';

import { useEffect } from 'react';
import { updateLastActivity } from '@/lib/tracking';

/**
 * Компонент для инициализации трекинга сессии
 * Устанавливает время начала сессии при первой загрузке сайта
 * и отслеживает активность пользователя
 */
export default function TrackingInit() {
  useEffect(() => {
    // Инициализируем время начала сессии
    if (typeof window !== 'undefined') {
      try {
        // Проверяем, есть ли уже время начала сессии
        const existingStartTime = sessionStorage.getItem('sessionStartTime');
        const now = Date.now();
        
        if (!existingStartTime) {
          // Устанавливаем время начала сессии
          sessionStorage.setItem('sessionStartTime', now.toString());
          console.log('🕐 Session tracking initialized at:', new Date(now).toISOString());
        } else {
          console.log('🕐 Session tracking already initialized at:', new Date(parseInt(existingStartTime, 10)).toISOString());
        }

        // Устанавливаем последнее время активности
        sessionStorage.setItem('lastActivity', now.toString());

        // Инициализируем landing page
        const existingLandingPage = sessionStorage.getItem('landingPage');
        if (!existingLandingPage) {
          const landingPage = window.location.pathname;
          sessionStorage.setItem('landingPage', landingPage);
          console.log('🚀 Landing page set to:', landingPage);
        }

        // Инициализируем список посещенных страниц
        const visitedPages = localStorage.getItem('visitedPages');
        if (!visitedPages) {
          localStorage.setItem('visitedPages', JSON.stringify([window.location.pathname]));
        }

        // Отслеживание активности пользователя
        const activityEvents = ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'];
        
        // Используем throttle для mousemove, чтобы не вызывать слишком часто
        let lastMouseMoveUpdate = 0;
        const throttleDelay = 5000; // Обновляем не чаще раза в 5 секунд для mousemove
        
        const handleActivity = (event: Event) => {
          const now = Date.now();
          
          // Для mousemove применяем throttle
          if (event.type === 'mousemove') {
            if (now - lastMouseMoveUpdate < throttleDelay) {
              return;
            }
            lastMouseMoveUpdate = now;
          }
          
          updateLastActivity();
        };
        
        // Добавляем слушатели событий
        activityEvents.forEach(event => {
          window.addEventListener(event, handleActivity, { passive: true });
        });
        
        console.log('👂 Activity tracking enabled');

        // Очистка при размонтировании
        return () => {
          activityEvents.forEach(event => {
            window.removeEventListener(event, handleActivity);
          });
        };
      } catch (error) {
        console.error('❌ Error initializing tracking:', error);
      }
    }
  }, []); // Выполняется только один раз при монтировании

  return null; // Компонент не рендерит ничего
}

