import Card from "@/components/Card";
import { getAllSeries } from "@/lib/functions";
import { Metadata } from "next";
import { ReactElement } from "react";

export const metadata: Metadata ={
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `Series | High Performance Laravel`,
  openGraph: {
    title: `Series | High Performance Laravel`,
  }
}

export default function Page(): ReactElement {
  const series = getAllSeries();

  return (
    <section className="w-full flex flex-row flex-wrap pt-8">
      {series.map(entry => (
        <Card key={entry.slug} href={`/tutorials/series/${entry.slug}`} {...entry} />
      ))}
    </section>
  );
};
