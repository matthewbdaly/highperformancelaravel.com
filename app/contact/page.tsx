import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";
import Link from 'next/link'
import { ReactElement } from "react";

export const metadata: Metadata ={
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `Contact me | High Performance Laravel`,
  openGraph: {
    title: `Contact me | High Performance Laravel`,
  }
}

export default function Page(): ReactElement {
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
          <p>If you need to contact me about this site, please use this form</p>
          <ContactForm />
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
