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
      <section>
        <h3>Struggling to make your application performant?</h3>
        <p>Never miss a tutorial! Sign up for the newsletter below.</p>
        <form action="/subscribe" method="POST">
          <input type="text" name="first_name" autoComplete="given-name" placeholder="Your given (or first) name" />
          <input type="email" name="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
      <hr />
      <footer>
        <div>
          <p>Made with ❤️ by <a href="https://github.com/matthewbdaly">Matthew Daly</a></p>
        </div>
        <p>Copyright &copy; Matthew Daly {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}
