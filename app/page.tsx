import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
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
              <Link href="/series">Series</Link>
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
      <hr />
      <section className="content-wrapper">
        <div className="content">
          <h2>Welcome to High Performance Laravel!</h2>
          <h3>Supercharge your Laravel applications with expert performance optimization tips and strategies.</h3>
          <blockquote>
            <h4>Is your Laravel application running slower than you&apos;d like?</h4>
            <p>I understand how frustrating it can be to deal with a sluggish Laravel application. That&apos;s why I&apos;ve created High Performance Laravel – a resource dedicated to providing you with practical, informative, and approachable tips that will help you optimize your Laravel applications for maximum performance.</p>
            <h4>Unlock the full potential of your Laravel code.</h4>
            <p>As a fellow developer, I know the pain points and common issues that can slow down your Laravel application. Through High Performance Laravel, I offer clear solutions and actionable advice to help you optimize your code, boost performance, and leave your competition behind.</p>
          </blockquote>
          <h4>Stay ahead of the game with performance optimization tips.</h4>
          <p>In today&apos;s fast-paced digital world, performance matters. Slow-loading websites and applications can drive users away and harm your clients&apos; business. That&apos;s why I&apos;ve created a wide range of articles and tutorials on performance optimization, including database optimization, caching strategies, query optimization, and more. By breaking down complex concepts into digestible steps, I make it easy for you to implement these optimizations and improve your app&apos;s speed and efficiency.</p>
          <h4>Level up your skills and optimize your Laravel applications.</h4>
          <p>My goal is to empower you to become a performance optimization expert. Whether you&apos;re a beginner or an experienced Laravel developer, High Performance Laravel offers valuable insights, best practices, and real-world examples that will help you unlock the full potential of your Laravel code. From optimizing your database queries to implementing caching mechanisms, you&apos;ll find actionable steps to improve your application&apos;s performance.</p>
          <h4>Ready to supercharge your Laravel application?</h4>
          <p>Take the first step towards optimizing your Laravel application today. Explore my blog and discover practical tips, expert insights, and actionable advice to unlock the true potential of your Laravel code. With High Performance Laravel as your guide, you&apos;ll be well-equipped to build lightning-fast Laravel applications that will impress your users and give your clients&apos; websites a competitive edge.</p>
          <h3>Optimize your Laravel applications&apos; performance today. Explore High Performance Laravel now.</h3>
        </div>
        <Sidebar />
      </section>
      <hr />
      <section className="newsletter">
        <h3>Struggling to make your application performant?</h3>
        <p>Never miss a tutorial! Sign up for the newsletter below.</p>
        <form action="/subscribe" method="POST">
          <input type="text" name="first_name" autoComplete="given-name" placeholder="Your given (or first) name" />
          <input type="email" name="email" placeholder="Your email address" />
          <button type="submit">Sign me up!</button>
        </form>
        <p>You can unsubscribe at any time, and your information will not be shared.</p>
      </section>
      <hr />
      <footer>
        <section>
        </section>
        <div>
          <p>Made with ❤️ by <a href="https://matthewdaly.co.uk">Matthew Daly</a></p>
        </div>
        <p>Copyright &copy; Matthew Daly {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}
