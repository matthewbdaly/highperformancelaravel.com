import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <section className="content-wrapper">
      <div className="content">
        <h2>Are you struggling with the performance of your Laravel application?</h2>
        <p>Do you see consistent performance issues you don&apos;t understand?</p>
        <p>Are you unsure how to resolve them?</p>
        <p>Not sure if choosing Laravel for a new project is the right choice?</p>
        <p><strong>High Performance Laravel</strong> is here to help</p>
        <blockquote>
          <h3>Unlock the full potential of your Laravel code.</h3>
          <p>When you first start working with Laravel, it can be hard to understand the real reasons for slow application performance. There&apos;s a lot of misinformation around, and claims that Laravel or PHP are inherently slow, which just isn&apos;t the case, but are hard to debunk when you first start out.</p>
          <p>As a web developer for well over a decade, and having used Laravel on many different projects over the last eight years, I know the <strong>real</strong> pain points and common issues that can slow down your Laravel application. With High Performance Laravel, I&apos;ll share my best practices and insights to help you resolve common performance bottlenecks in your application.</p>
        </blockquote>
        <h3>Performance is a process, not a product</h3>
        <p>There&apos;s no one off-the-shelf solution (whether that&apos;s a new language, a new framework, or something else entirely) that will prevent an application from being slow. Rewriting something ostensibly for performance reasons is a <em>very</em> dangerous road to go down if you don&apos;t understand the real reason for performance - you could easily spend months rebuilding something and end up with little or no improvement to show for it.</p>
        <p>I&apos;ll help you identify some of the misleading myths about application performance, the actual bottlenecks you can expect to encounter and how to deal with them. I&apos;ll also provide high level strategies for better performance, and tips on how to optimise performance further.</p>
        <h4>Current series of articles...</h4>
        <h5>
          <Link href="/tutorials/series/myth-busters"><em>Avoid falling for performance myths</em></Link>
        </h5>
        <p>Don&apos;t waste time on dealing with performance myths that won&apos;t help you make your site faster and more efficient</p>
        <h5>
          <Link href="/tutorials/series/server-configuration"><em>Configure your server for better performance</em></Link>
        </h5>
        <p>Learn how to configure your production server to get the best performance from your Laravel application</p>
        <h5>
          <Link href="/tutorials/series/writing-efficient-applications"><em>Write efficient applications</em></Link>
        </h5>
        <p>Make sure your Laravel application is performant and efficient by learning what the most likely bottlenecks are and avoiding them</p>
      </div>
      <Sidebar />
    </section>
  )
}
