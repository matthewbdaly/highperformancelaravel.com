import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <header>
        <h1>High Performance Laravel</h1>
        <h2>Find, understand, and fix the <em>real</em> causes of performance issues with your Laravel applications</h2>
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
      <section>
        <div>
          <section>
            <p>Do you struggle to make your Laravel applications perform well?</p>
            <p>Do you find it hard to figure out what advice is and isn&apos;t helpful when optimising the performance of your applications?</p>
            <p>Are you unsure where to begin analysing performance bottlenecks?</p>
            <p>High Performance Laravel is here to help.</p>
            <p>Based on over a decade&apos;s experience building web apps, API&apos;s and mobile apps, I&apos;ll teach you about the real reasons your web application is slow, and provide straightforward tips to resolve them. I&apos;ll help you to:</p>
            <ul>
              <li>Avoid common misconceptions about web application performance</li>
              <li>Understand the real reasons for performance bottlenecks in most applications</li>
              <li>Learn to apply profiling techniques to find performance issues</li>
              <li>Resolve common performance issues</li>
              <li>Optimise your server configuration to improve performance</li>
              <li>Write more efficient code</li>
              <li>Make your front end more efficient</li>
            </ul>
          </section>
        </div>
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
      </section>
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
