import { getFeed } from "@/lib/functions"

export async function GET(): Promise<Response> {
  const feed = await getFeed();
  return new Response(feed.json1())
}
