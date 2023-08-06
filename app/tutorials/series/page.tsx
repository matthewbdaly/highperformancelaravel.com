import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";
import Sidebar from "@/components/Sidebar";
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
    <main className="">
      <Header />
      <hr />
      <section className="content-wrapper">
        <div className="content">
          {series.map(entry => (
            <p key={entry.slug}><a href={`/tutorials/series/${entry.slug}`}>{entry.title}</a></p>
          ))}
        </div>
        <Sidebar />
      </section>
      <hr />
      <NewsletterForm />
      <hr />
      <Footer />
    </main>
  );
};
