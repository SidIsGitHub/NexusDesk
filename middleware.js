import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
});

export const config = {
  matcher: '/api/demo',
};

export default async function middleware(request) {
  // Use Vercel's standard request.headers for IP resolution at the Edge
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({ error: 'RATE_LIMIT_EXCEEDED' }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  // Returning undefined tells Vercel Edge Middleware to proceed to the destination
}
