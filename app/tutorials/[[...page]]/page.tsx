import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllTutorials } from '@/lib/functions';
import { Metadata } from 'next';
import { ReactElement } from 'react';

const PageSize = 8;

export const metadata: Metadata ={
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `Tutorials | High Performance Laravel`,
  openGraph: {
    title: `Tutorials | High Performance Laravel`,
  }
}

export default function Page({ params }: { params: { page?: number }}): ReactElement {
  const entries = getAllTutorials().slice(((params.page || 1) - 1) * PageSize, (params.page || 1) * PageSize);

  return (
    <main>
      <Header />
      <hr />
      <section className="w-full flex flex-row flex-wrap pt-8">
        {entries.map(entry => (
          <Card key={entry.slug} href={`/tutorials/series/${entry.slug}`} {...entry} />
        ))}
      </section>
      <hr />
      <NewsletterForm />
      <hr />
      <Footer />
    </main>
  );
}

export async function generateStaticParams() {
    const tutorials = getAllTutorials();
    const totalPages = Math.ceil(tutorials.length / PageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
}
