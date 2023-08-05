import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <header>
        <h1>High Performance Laravel</h1>
        <h2>Find and fix the <strong>real</strong> causes of performance issues with your Laravel applications</h2>
        <nav>
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
        </nav>
        <form action="/search" method="GET">
          <input type="search" name="q" />
          <button type="submit">Search</button>
        </form>
      </header>
      <hr />
      <article>
      </article>
      <aside>
        <h4>Hello, I&apos;m Matthew Daly</h4>
        <p>I&apos;m a professional web developer with over ten years of experience building high performance web applications with numerous frameworks and programming languages.</p>
        <p>On this site I&apos;ll show you how to:</p>
        <ul>
          <li>Design your Laravel application to avoid common bottlenecks and performance issues</li>
          <li>Diagnose and resolve performance issues with existing applications</li>
          <li>Write more efficient database queries, and optimise your database structure to improve performance</li>
          <li>Optimize your production servers to improve performance</li>
          <li>Sort the myths about application performance from the real issues so you don&apos;t waste time on fruitless optimization strategies</li>
        </ul>
      </aside>
      <hr />
      <section>
        <h3>Struggling to make your application performant?</h3>
        <p>Never miss a tutorial! Sign up for the newsletter below.</p>
        <form action="/subscribe" method="POST">
          <input type="text" name="first_name" autoComplete="given-name" placeholder="Your given (or first) name" />
          <input type="email" name="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
        <p>You can unsubscribe at any time, and your information will not be shared.</p>
      </section>
      <hr />
      <footer>
        <div>
          <p>Made with ❤️ by <a href="https://matthewdaly.co.uk">Matthew Daly</a></p>
        </div>
        <p>Copyright &copy; Matthew Daly {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}
