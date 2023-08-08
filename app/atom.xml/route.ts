import { getFeed } from "@/lib/functions"

export async function GET(): Promise<Response> {
  const feed = getFeed();
  return new Response(feed.atom1(), { headers: { "content-type": "application/atom+xml" } })
}
