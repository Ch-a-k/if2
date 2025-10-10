import { revalidatePath } from 'next/cache'
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

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Cache refreshed successfully'
    })
  } catch (err) {
    console.error('Error refreshing cache:', err)
    return NextResponse.json(
      { message: 'Error refreshing cache', error: err },
      { status: 500 }
    )
  }
}

