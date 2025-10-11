import { definePlugin, DocumentActionComponent } from 'sanity'

const CacheRefreshAction: DocumentActionComponent = (props) => {
  return {
    label: '🔄 Обновить кеш',
    onHandle: async () => {
      try {
        const siteUrl = 'https://in-fomo.com'
        const response = await fetch(`${siteUrl}/api/refresh-cache`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          props.onComplete()
          alert('✅ Кеш успешно обновлен!')
        } else {
          alert('❌ Ошибка обновления кеша')
        }
      } catch (error) {
        alert('❌ Ошибка подключения к сайту')
      }
    },
  }
}

export const cacheRefreshAction = definePlugin({
  name: 'cache-refresh-action',
  document: {
    actions: (prev) => [...prev, CacheRefreshAction],
  },
})

