import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        title,
        description,
        gtmId,
        cloudflareToken,
        hotjarId,
        "ogImage": ogImage.asset->url,
        "favicon": favicon.asset->url
      }`,
      {},
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!settings) {
      return NextResponse.json(
        { error: 'Settings not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

