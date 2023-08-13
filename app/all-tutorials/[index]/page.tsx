import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getAllTutorials } from '@/lib/functions';
import { Metadata } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

const PageSize = 8;

export const metadata: Metadata ={
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `Tutorials | High Performance Laravel`,
  openGraph: {
    title: `Tutorials | High Performance Laravel`,
  }
}

export default async function Page({ params }: { params: { index?: number }}): Promise<ReactElement> {
  const page = (Number)(params.index);
  const total = getAllTutorials();
  const entries = total.slice((page - 1) * PageSize, page * PageSize);
  const pages = Math.ceil(total.length / PageSize);

  return (
    <main>
      <Header />
      <hr />
      <section className="w-full flex flex-row flex-wrap pt-8">
        {entries.map(entry => (
          <Card key={entry.slug} href={`/tutorials/series/${entry.slug}`} {...entry} />
        ))}
      </section>
      <section className="pagination">
        {pages > 1 && page > 1 && (
          <Link href={`/all-tutorials/${page - 1}`}>&lsaquo;Previous &nbsp;</Link>
        )}
        {pages > 1 && (
          <p>Page {page} of {pages}</p>
        )}
        {pages > 1 && page < pages && (
          <Link href={`/all-tutorials/${page + 1}`}>&nbsp;Next &rsaquo;</Link>
        )}
      </section>
      <hr />
      <Footer />
    </main>
  );
}

export async function generateStaticParams(): Promise<Array<number>> {
    const tutorials = getAllTutorials();
    const totalPages = Math.ceil(tutorials.length / PageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export const dynamicParams = false;
