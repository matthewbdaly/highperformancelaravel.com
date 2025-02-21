"use client";

import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Search from "./Search";

export default function Header(): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header>
      <div>
        <h1><Link href="/"><em>High Performance</em> Laravel</Link></h1>
        <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <div>
        <nav className={`${isMenuOpen ? "block md:flex" : "hidden md:flex"}`}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/all-tutorials/1">All tutorials</Link>
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
            <li>
              <Link href="/rss.xml" prefetch={false}><i className="icon-rss"></i> RSS</Link>
            </li>
          </ul>
          <Search />
        </nav>
      </div>
    </header>
  );
}
