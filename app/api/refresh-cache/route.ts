import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Ревалидируем все основные пути
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/works')
    revalidatePath('/works/[slug]', 'page')
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    revalidatePath('/contact')

    // Ревалидируем теги для более гранулярного контроля
    revalidateTag('siteSettings')
    revalidateTag('home-seo')
    revalidateTag('about-seo')
    revalidateTag('works-seo')
    revalidateTag('blog-seo')
    revalidateTag('contact-seo')

    const response = NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Cache refreshed successfully'
    })

    // CORS заголовки для Sanity Studio
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return response
  } catch (err) {
    console.error('Error refreshing cache:', err)
    
    const errorResponse = NextResponse.json(
      { message: 'Error refreshing cache', error: err },
      { status: 500 }
    )

    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}

