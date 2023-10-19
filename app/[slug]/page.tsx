import { ReactElement } from 'react';
import TextSection from "@/components/TextSection";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import fs from "fs";
import path from 'path';
import matter from 'gray-matter';
import logo from "@/public/img/logo.png";

const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);

export interface PageFileProps {
  title: string;
  description: string;
};

const pagesDirectory = path.join(process.cwd(), "content/pages")

const getPageContent = async (slug: string): Promise<{
  content: string,
  data: PageFileProps
}> => {
  const filePath = path.join(process.cwd(), "content/pages/", `${slug}.md`);
  const source = fs.readFileSync(filePath);
  const { content, data } = matter(source);
  const filePropsData = data as PageFileProps;
  return {
    content,
    data: filePropsData
  };
}

const getPageFilenames = (): Array<string> => {
  const fileNames = fs.readdirSync(pagesDirectory)
  return fileNames.map(fileName => fileName.replace(/.md$/, ""));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await getPageContent(params.slug);
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: `${data.title} | High Performance Laravel`,
      description: data.description,
      type: 'website',
      url: baseUrl,
      images: [
        {
          url: logo.src,
          width: logo.width,
          height: logo.height
        }
      ]
    }
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<ReactElement> {
  const { content, data } = await getPageContent(params.slug);

  return (
    <section className="content-wrapper">
      <article className="content">
        <TextSection data={data}>
          {content}
        </TextSection>
      </article>
      <Sidebar />
    </section>
  );
}

export function generateStaticParams(): Array<{slug: string}> {
  return getPageFilenames().map((slug: string) => ({
    slug
  }));
}

export const dynamicParams = false;
