import fs from "fs";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify";

export interface PostFileProps {
  title: string;
  description: string;
  date: string;
  series: string;
  featured_image?: string;
  featured_image_username?: string;
  slug: string;
};

const seriesDirectory = path.join(process.cwd(), "content/series")
const tutorialsDirectory = path.join(process.cwd(), "content/tutorials")

export const getAllSeries = (): Array<{
  title: string;
  slug: string;
  description: string;
  featured_image?: string;
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

