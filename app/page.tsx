import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <header>
        <h1>High Performance Laravel</h1>
        <h2>Find and fix the <strong>real</strong> causes of performance issues with your Laravel applications</h2>
        <ul>
          <li>
            <a href="/docs">Home</a>
          </li>
          <li>
            <a href="/tutorials">All tutorials</a>
          </li>
          <li>
            <a href="/series">Series</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <form action="/search" method="GET">
          <input type="search" name="q" />
          <button type="submit">Search</button>
        </form>
      </header>
      <hr />
    </main>
  )
}
