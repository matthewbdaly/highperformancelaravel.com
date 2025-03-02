import Link from 'next/link';
import { ReactElement } from 'react';

export default function NotFound(): ReactElement<any> {
  return (
    <section className="content-wrapper">
      <div className="content">
        <p>Sorry, that page doesn&apos;t exist.</p>
        <p>You may want to try one of the following instead:</p>
        <ul className="fallback-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/all-tutorials/1">Tutorials</Link></li>
        </ul>
      </div>
    </section>
  );
}
