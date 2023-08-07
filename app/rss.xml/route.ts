import { getAllTutorials } from '@/lib/functions';
import { Feed } from 'feed';

export async function GET(req: Request): Promise<Response> {
  const feed = new Feed({
    title: "High Performance Laravel",
    description: `Learn how to optimize your Laravel application for high performance, and avoid wasting time on pointless performance myths`,
    id: "https://highperformance.laravel.com",
    link: "https://highperformance.laravel.com",
    language: "en",
    copyright: `All rights reserved Matthew Daly ${new Date().getFullYear()}`,
    generator: "NextJS",
    author: {
      name: "Matthew Daly",
      email: "hello@highperformance.laravel.com",
      link: "https://highperformance.laravel.com"
    },
    favicon: `https://highperformancelaravel.com/favicon-32x32.png`,
      feedLinks: {
      json: "https://highperformancelaravel.com/feed.json",
      rss: "https://highperformancelaravel.com/rss.xml",
      atom: "https://highperformancelaravel.com/atom.xml"
    },
  })
  feed.addContributor({
    name: "Matthew Daly",
    email: "hello@highperformance.laravel.com",
    link: "https://highperformance.laravel.com"
  })

  getAllTutorials().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(tutorial => {
    feed.addItem({
      title: tutorial.title,
      id: `https://highperformance.laravel.com/tutorials/series/${tutorial.slug}`,
        link: `https://highperformance.laravel.com/tutorials/series/${tutorial.slug}`,
        date: new Date(tutorial.date),
      content: tutorial.description,
      author: {
        name: "Matthew Daly",
        email: "hello@highperformance.laravel.com",
        link: "https://highperformance.laravel.com"
      }
    })
  })

  return new Response(feed.rss2(), { headers: { "content-type": "application/rss+xml" } })
}
