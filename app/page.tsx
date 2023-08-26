import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <section className="content-wrapper">
      <div className="content">
        <h3>Are you struggling with the performance of your Laravel application?</h3>
        <p>Do you see consistent performance issues you don&apos;t understand?</p>
        <p>Are you unsure how to resolve them?</p>
        <p>Not sure if choosing Laravel for a new project is the right choice?</p>
        <p><strong>High Performance Laravel</strong> is here to help</p>
        <blockquote>
          <h4>Unlock the full potential of your Laravel code.</h4>
          <p>When you first start working with Laravel, it can be hard to understand the real reasons for slow application performance. There&apos;s a lot of misinformation around, and claims that Laravel or PHP are inherently slow, which just isn&apos;t the case, but are hard to debunk when you first start out.</p>
          <p>As a Laravel developer, I know the <strong>real</strong> pain points and common issues that can slow down your Laravel application. With High Performance Laravel, I&apos;ll share my best practices and insights to help you resolve common performance bottlenecks in your application.</p>
        </blockquote>
        <h2>Current articles...</h2>
        <h3>
          <Link href="/tutorials/series/myth-busters"><em>Avoid falling for performance myths</em></Link>
        </h3>
        <p>Don&apos;t waste time on dealing with performance myths that won&apos;t help you make your site faster and more efficient</p>
        <h3>
          <Link href="/tutorials/series/server-configuration"><em>Configure your server for better performance</em></Link>
        </h3>
        <p>Learn how to configure your production server to get the best performance from your Laravel application</p>
        <h3>
          <Link href="/tutorials/series/writing-efficient-applications"><em>Write efficient applications</em></Link>
        </h3>
        <p>Make sure your Laravel application is performant and efficient by learning what the most likely bottlenecks are and avoiding them</p>
      </div>
      <Sidebar />
    </section>
  )
}
