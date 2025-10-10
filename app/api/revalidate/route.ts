import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Проверка секретного токена для безопасности
  const secret = request.nextUrl.searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { type } = body

    console.log('🔄 Revalidation triggered for:', type)

    // Ревалидируем разные пути в зависимости от типа контента
    switch (type) {
      case 'testimonial':
      case 'testimonialNew':
        revalidatePath('/')
        console.log('✅ Revalidated: Home (testimonials)')
        break

      case 'clutchBadge':
        revalidatePath('/')
        console.log('✅ Revalidated: Home (clutch badges)')
        break

      case 'teamMember':
      case 'specialist':
        revalidatePath('/about')
        console.log('✅ Revalidated: About page')
        break

      case 'project':
        revalidatePath('/')
        revalidatePath('/works')
        revalidatePath('/works/[slug]', 'page')
        console.log('✅ Revalidated: Projects')
        break

      case 'blogPost':
        revalidatePath('/blog')
        revalidatePath('/blog/[slug]', 'page')
        console.log('✅ Revalidated: Blog')
        break

      case 'partner':
        revalidatePath('/')
        revalidatePath('/blog/[slug]', 'page')
        revalidatePath('/works/[slug]', 'page')
        console.log('✅ Revalidated: Partners sections')
        break

      case 'siteSettings':
        revalidatePath('/', 'layout')
        console.log('✅ Revalidated: Site settings')
        break

      default:
        // Если тип неизвестен - обновляем всё
        revalidatePath('/')
        revalidatePath('/about')
        revalidatePath('/works')
        revalidatePath('/blog')
        console.log('✅ Revalidated: All pages')
    }

    return NextResponse.json({
      revalidated: true,
      type,
      now: Date.now(),
    })
  } catch (err) {
    console.error('❌ Error revalidating:', err)
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    )
  }
}

