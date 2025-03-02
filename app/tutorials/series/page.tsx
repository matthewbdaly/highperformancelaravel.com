import Card from "@/components/Card";
import { getAllSeries } from "@/lib/functions";
import { Metadata } from "next";
import { ReactElement } from "react";
import logo from "@/public/img/logo.png";

const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);

export const metadata: Metadata ={
  metadataBase: baseUrl,
  title: `Series`,
  openGraph: {
    title: `Series | High Performance Laravel`,
    type: 'website',
    url: `${baseUrl}tutorials/series`,
    images: [
      {
        url: logo.src,
        width: logo.width,
        height: logo.height
      }
    ]
  }
}

export default function Page(): ReactElement<any> {
  const series = getAllSeries();

  return (
    <section className="w-full flex flex-row flex-wrap pt-8">
      {series.map(entry => (
        <Card key={entry.slug} href={`/tutorials/series/${entry.slug}`} {...entry} />
      ))}
    </section>
  );
};
