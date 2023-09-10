import fs from "fs";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify";
import { Feed } from 'feed';
import { createApi } from "unsplash-js";

export interface PostFileProps {
  title: string;
  description: string;
  date: string;
  series: string;
  featured_image_id: string;
  slug: string;
};

const seriesDirectory = path.join(process.cwd(), "content/series")
const tutorialsDirectory = path.join(process.cwd(), "content/tutorials")

export const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch
});

export const getAllSeries = (): Array<{
  title: string;
  slug: string;
  description: string;
  featured_image_id: string;
}> => {
  return fs.readdirSync(seriesDirectory)
    .map((filePath: string) => {
      const fullPath = path.join(process.cwd(), `content/series/${filePath}`);
      const source = fs.readFileSync(fullPath);
      const { data } = matter(source)
      data.slug = filePath.replace(/.md$/, "")
      return ((data as unknown) as PostFileProps);
    });
};

export const getAllTutorials = (): Array<PostFileProps> => {
  return fs.readdirSync(tutorialsDirectory)
  .map((filePath: string): PostFileProps => {
    const fullPath = path.join(process.cwd(), `content/tutorials/${filePath}`);
    const source = fs.readFileSync(fullPath);
    const { data } = matter(source)
    data.slug = `${slugify(data.series.toLowerCase())}/${slugify(filePath.split('.')[0].toLowerCase())}`;
    return ((data as unknown) as PostFileProps);
    }).sort((a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    })
};

export const getTutorialFilenames = () : Array<{params: {series: string, slug: string}}> => {
  const fileNames = fs.readdirSync(tutorialsDirectory)
  return fileNames.map(fileName => {
    const fullPath = path.join(process.cwd(), `content/tutorials/${fileName}`);
    const source = fs.readFileSync(fullPath);
    const { data } = matter(source);
    return {
      params: {
        series: slugify(data.series.toLowerCase()),
        slug: fileName.replace(/.md$/, "")
      }
    };
  });
};

export const getFeed = async () => {
  const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);
  const feed = new Feed({
    title: "High Performance Laravel",
    description: `Learn how to optimize your Laravel application for high performance, and avoid wasting time on pointless performance myths`,
    id: baseUrl.href,
    link: baseUrl.href,
    language: "en",
    copyright: `All rights reserved Matthew Daly ${new Date().getFullYear()}`,
    generator: "NextJS",
    author: {
      name: "Matthew Daly",
      email: "hello@highperformance.laravel.com",
      link: baseUrl.href
    },
    favicon: `${baseUrl.href}favicon-32x32.png`,
    feedLinks: {
      json: `${baseUrl.href}feed.json`,
      rss: `${baseUrl.href}rss.xml`,
      atom: `${baseUrl.href}atom.xml`
    },
  })
  feed.addContributor({
    name: "Matthew Daly",
    email: "hello@highperformance.laravel.com",
    link: baseUrl.href
  })

  getAllTutorials()
  .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
  .forEach(async (tutorial: PostFileProps) => {
    const result = await unsplashApi.photos.get({ photoId: tutorial.featured_image_id });
    if (result.type !== "success") {
      throw new Error(result.message);
    }
    feed.addItem({
      title: tutorial.title,
      id: `${baseUrl.href}tutorials/series/${tutorial.slug}`,
      link: `${baseUrl.href}tutorials/series/${tutorial.slug}`,
      date: new Date(tutorial.date),
      content: tutorial.description,
      image: result.response.urls.regular
    });
  });
  return feed;
};
