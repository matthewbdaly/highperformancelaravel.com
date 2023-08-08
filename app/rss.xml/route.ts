import { getFeed } from "@/lib/functions"

export async function GET(): Promise<Response> {
  const feed = getFeed();
  return new Response(feed.rss2(), { headers: { "content-type": "application/rss+xml" } })
}
