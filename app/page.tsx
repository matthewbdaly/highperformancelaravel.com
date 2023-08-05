import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <header>
        <h1><em>High Performance</em> Laravel</h1>
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
      <section className="content-wrapper">
        <div className="content">
          <h2>Welcome to High Performance Laravel!</h2>
          <h3>Supercharge your Laravel applications with expert performance optimization tips and strategies.</h3>
          <h4>Is your Laravel application running slower than you&apos;d like?</h4>
          <p>I understand how frustrating it can be to deal with a sluggish Laravel application. That&apos;s why I&apos;ve created High Performance Laravel – a resource dedicated to providing you with practical, informative, and approachable tips that will help you optimize your Laravel applications for maximum performance.</p>
          <h4>Unlock the full potential of your Laravel code.</h4>
          <p>As a fellow developer, I know the pain points and common issues that can slow down your Laravel application. Through High Performance Laravel, I offer clear solutions and actionable advice to help you optimize your code, boost performance, and leave your competition behind.</p>
          <h4>Stay ahead of the game with performance optimization tips.</h4>
          <p>In today&apos;s fast-paced digital world, performance matters. Slow-loading websites and applications can drive users away and harm your clients&apos; business. That&apos;s why I&apos;ve created a wide range of articles and tutorials on performance optimization, including database optimization, caching strategies, query optimization, and more. By breaking down complex concepts into digestible steps, I make it easy for you to implement these optimizations and improve your app&apos;s speed and efficiency.</p>
          <h4>Level up your skills and optimize your Laravel applications.</h4>
          <p>My goal is to empower you to become a performance optimization expert. Whether you&apos;re a beginner or an experienced Laravel developer, High Performance Laravel offers valuable insights, best practices, and real-world examples that will help you unlock the full potential of your Laravel code. From optimizing your database queries to implementing caching mechanisms, you&apos;ll find actionable steps to improve your application&apos;s performance.</p>
          <h4>Ready to supercharge your Laravel application?</h4>
          <p>Take the first step towards optimizing your Laravel application today. Explore my blog and discover practical tips, expert insights, and actionable advice to unlock the true potential of your Laravel code. With High Performance Laravel as your guide, you&apos;ll be well-equipped to build lightning-fast Laravel applications that will impress your users and give your clients&apos; websites a competitive edge.</p>
          <h3>Optimize your Laravel applications&apos; performance today. Explore High Performance Laravel now.</h3>
        </div>
        <aside>
          <p>Do you struggle to make your Laravel applications perform well?</p>
          <p>Do you find it hard to figure out what advice is and isn&apos;t helpful when optimising the performance of your applications?</p>
          <p>Are you unsure where to begin analysing performance bottlenecks?</p>
          <p>High Performance Laravel is here to help.</p>
          <h4>Hello, I&apos;m Matthew Daly</h4>
          <p>I&apos;m a professional web developer with over ten years of experience building high performance web applications with numerous frameworks and programming languages.</p>
          <p>I&apos;ll teach you about the real reasons your web application is slow, and provide straightforward tips to resolve them. I&apos;ll help you to:</p>
          <ul>
            <li>Avoid common misconceptions about web application performance</li>
            <li>Understand the real reasons for performance bottlenecks in most applications</li>
            <li>Learn to apply profiling techniques to find performance issues</li>
            <li>Resolve common performance issues</li>
            <li>Optimise your server configuration to improve performance</li>
            <li>Write more efficient code</li>
            <li>Make your front end more efficient</li>
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
