import slugify from "slugify";
import { ReactElement } from "react";
import { Metadata } from "next";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { PostFileProps } from "@/lib/functions";
import Card from "@/components/Card";
import { getAllSeries, getAllTutorials } from "@/lib/functions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const getSeriesBySlug = async (slug: string): Promise<{
  data: {
    featured_image?: string,
    featured_image_username?: string;
    title: string;
    description: string;
  },
}> => {
  const filePath = path.join(process.cwd(), "content/series/", `${slug}.md`);
  const source = fs.readFileSync(filePath);
  const { data } = matter(source);
  data.slug = slug;
  const filePropsData = data as PostFileProps;
  return {
    data: filePropsData,
  };
};

export async function generateMetadata({
  params,
}: {
  params: { series: string };
}): Promise<Metadata> {
  const { data } = await getSeriesBySlug(params.series);
  return {
    title: `${data.title} | High Performance Laravel`,
    description: data.description,
    openGraph: {
      title: `${data.title} | High Performance Laravel`,
      description: data.description
    }
  }
}

export default async function Page({
  params,
}: {
  params: { series: string };
}): Promise<ReactElement> {
  const entries = getAllTutorials().filter(data => data.series && slugify(data.series.toLowerCase()) === params.series);
  const { data } = await getSeriesBySlug(params.series);

  return (
    <main>
      <Header />
      <hr />
      <section className="w-full flex flex-row flex-wrap pt-8">
        {entries.map(entry => {
          const { series, ...entryWithoutSeries } = entry;
          return (
            <Card key={entry.slug} href={`/tutorials/series/${entry.slug}`} {...entryWithoutSeries} />
          );
        })}
      </section>
      <hr />
      <Footer />
    </main>
  );
}

export function generateStaticParams(): Array<{series: string}> {
  return getAllSeries().map(item => {
    return { series: item.slug};
  });
}

export const dynamicParams = false;
