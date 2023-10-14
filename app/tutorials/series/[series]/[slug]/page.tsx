import TextSection from "@/components/TextSection";
import { getTutorialFilenames, getUnsplashPhoto, PostFileProps } from "@/lib/functions";
import matter from "gray-matter";
import fs from "fs";
import { Metadata } from "next";
import path from "path";
import { ReactElement } from "react";
import slugify from "slugify";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Hero from "@/components/Hero";

const getPostBySlug = async (slug: string): Promise<{
  data: PostFileProps,
  content: string
}> => {
  const filePath = path.join(process.cwd(), "content/tutorials/", `${slug}.md`);
  const source = fs.readFileSync(filePath);
  const { content, data } = matter(source);
  data.slug = slug;
  const filePropsData = data as PostFileProps;
  return {
    content,
    data: filePropsData
  };
};

export async function generateMetadata({
  params,
}: {
  params: { series: string, slug: string };
}): Promise<Metadata> {
  const { data } = await getPostBySlug(params.slug);
  const featuredImage = await getUnsplashPhoto(data.featured_image_id);
  return {
    title: {
      absolute: data.title
    },
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      locale: `en`,
      type: 'website',
      images: [
        {
          url: featuredImage.urls.thumb,
          width: 400,
          height: 400,
        }
      ]
    }
  }
}

export default async function Page({
  params,
}: {
  params: { series: string, slug: string };
}): Promise<ReactElement> {
  const { content, data } = await getPostBySlug(params.slug);
  return (
    <section className="content-wrapper">
      <Hero {...data} />
      <article className="content">
        {data.series && <h3 className="text-2xl pb-4">From the series <span className="text-purple-700 dark:text-purple-800 font-bold"><Link href={`/tutorials/series/${slugify(data.series.toLowerCase())}`}>{data.series}</Link></span></h3>}
        <TextSection data={data}>
          {content}
        </TextSection>
      </article>
      <Sidebar />
    </section>
  );
}

export function generateStaticParams(): Array<{series: string, slug: string}> {
  return getTutorialFilenames().map(item => {
    return {
      series: item.params.series,
      slug: item.params.slug
    };
  });
}

export const dynamicParams = false;
