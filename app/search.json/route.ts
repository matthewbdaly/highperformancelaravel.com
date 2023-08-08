import { getAllTutorials } from "@/lib/functions"

export async function GET(): Promise<Response> {
  const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);
  const index = getAllTutorials().map(tutorial => {
    return {
      title: tutorial.title,
      description: tutorial.description,
      series: tutorial.series,
      link: `${baseUrl.href}tutorials/series/${tutorial.slug}`,
    }
  })
  return new Response(JSON.stringify(index), { headers: { "content-type": "application/json" } })
}
