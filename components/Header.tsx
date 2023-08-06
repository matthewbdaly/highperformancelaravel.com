import { ReactElement } from "react";
import Link from 'next/link'

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
        <form action="/search" method="GET">
          <input type="search" name="q" placeholder="Search for..." className="p-2 rounded-lg ring-2 ring-gray-500 ring-inset" />
          <button type="submit" className="bg-caribbean-green-600 hover:bg-caribbean-green-700 active:bg-caribbean-green-800 text-white rounded-lg p-2 ml-2">Search</button>
        </form>
      </nav>
    </header>
  );
}
