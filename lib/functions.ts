import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
