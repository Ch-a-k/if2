import { definePlugin } from 'sanity'
import { Button, Card, Stack, Text } from '@sanity/ui'
import { useState } from 'react'

function CacheRefreshTool() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRefresh = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const siteUrl = process.env.SANITY_STUDIO_SITE_URL || 'https://in-fomo.com'
      const response = await fetch(`${siteUrl}/api/refresh-cache`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setMessage('✅ Кеш успешно обновлен!')
      } else {
        setMessage('❌ Ошибка обновления кеша')
      }
    } catch (error) {
      setMessage('❌ Ошибка подключения к сайту')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={3} weight="bold">
          Обновление кеша сайта
        </Text>
        <Text size={1} muted>
          Нажмите кнопку, чтобы обновить данные на сайте после изменений в Sanity.
        </Text>
        <Button
          text={isLoading ? 'Обновление...' : 'Обновить кеш'}
          tone="primary"
          onClick={handleRefresh}
          disabled={isLoading}
          style={{ width: 'fit-content' }}
        />
        {message && (
          <Text size={2} style={{ color: message.includes('✅') ? 'green' : 'red' }}>
            {message}
          </Text>
        )}
      </Stack>
    </Card>
  )
}

export const cacheRefreshTool = definePlugin({
  name: 'cache-refresh',
  tools: [
    {
      name: 'cache-refresh',
      title: 'Обновить кеш',
      icon: () => '🔄',
      component: CacheRefreshTool,
    },
  ],
})

