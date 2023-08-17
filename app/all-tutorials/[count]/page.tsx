import Card from '@/components/Card';
import { getAllTutorials } from '@/lib/functions';
import { Metadata } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

const PageSize = 8;

export const metadata: Metadata = {
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `Tutorials | High Performance Laravel`,
  openGraph: {
    title: `Tutorials | High Performance Laravel`,
  }
}

export default async function Page({ 
  params,
}: { 
  params: { count: string };
}): Promise<ReactElement> {
  const page = Number(params.count);
  const total = getAllTutorials();
  const entries = total.slice((page - 1) * PageSize, page * PageSize);
  const pages = Math.ceil(total.length / PageSize);

  return (
    <>
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
    </>
  );
}

export async function generateStaticParams(): Promise<Array<{ count: string }>> {
  const tutorials = getAllTutorials();
  const totalPages = Math.ceil(tutorials.length / PageSize);
  return Array.from({ length: totalPages }, (_, index) => ({ count: (index + 1).toString() }));
}

export const dynamicParams = false;
