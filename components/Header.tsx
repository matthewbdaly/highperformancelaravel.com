import { ReactElement } from "react";
import Link from 'next/link'
import Search from "./Search";

export default function Header(): ReactElement {
  return (
    <header>
      <h1><Link href="/"><em>High Performance</em> Laravel</Link></h1>
      <h2>Find, understand, and fix the <em>real</em> causes of performance issues with your Laravel applications</h2>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tutorials">All tutorials</Link>
          </li>
          <li>
            <Link href="/tutorials/series">Series</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <Search />
      </nav>
    </header>
  );
}
