import { NextRequest } from 'next/server';
import { fetchNews } from '../../../data/news';

// Force dynamic for this endpoint (SSR per request)
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') ?? '10');
    const offset = Number(searchParams.get('offset') ?? '0');

    // Always fetch fresh slices for interactive pagination
    const data = await fetchNews(limit, offset, { cache: 'no-store' });

    return Response.json(data, { status: 200 });
  } catch (err) {
    console.error('API /api/news error:', err);
    return Response.json(
      { articles: [], total: 0, hasMore: false, error: 'Failed to load news' },
      { status: 500 }
    );
  }
}
