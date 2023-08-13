import TextSection from "@/components/TextSection";
import { getTutorialFilenames, PostFileProps } from "@/lib/functions";
import matter from "gray-matter";
import fs from "fs";
import { Metadata } from "next";
import path from "path";
import { ReactElement } from "react";
import slugify from "slugify";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

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
  const page = await getPostBySlug(params.slug);
  return {
    title: `${page.data.title} | High Performance Laravel`,
    description: page.data.description,
    openGraph: {
      title: `${page.data.title} | High Performance Laravel`,
      description: page.data.description
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
    <main>
      <Header />
      <hr />
      <section className="content-wrapper">
        <article className="content">
          {data.series && <h3 className="text-2xl pb-4">From the series <span className="text-caribbean-green-600 font-bold"><Link href={`/tutorials/series/${slugify(data.series.toLowerCase())}`}>{data.series}</Link></span></h3>}
          <TextSection data={data}>
            {content}
          </TextSection>
        </article>
        <Sidebar />
      </section>
      <hr />
      <Footer />
    </main>
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
