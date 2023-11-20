import { ReactElement } from "react";
import ExportedImage from "next-image-export-optimizer";
import profilePic from "../public/img/profile.png";

export default function Sidebar(): ReactElement {
  return (
    <aside>
      <section>
        <p>Do you struggle to make your Laravel applications perform well?</p>
        <p>Do you find it hard to figure out what advice is and isn&apos;t helpful when optimising the performance of your applications?</p>
        <p>Are you unsure where to begin analysing performance bottlenecks?</p>
        <p>High Performance Laravel is here to help.</p>
        <ExportedImage src={profilePic} alt="Picture of the author" className="rounded-full border-2 border-gray-50 bg-gray-200 mx-auto" height={200} width={200} placeholder="blur" />
        <h4>Hello, I&apos;m Matthew Daly</h4>
        <p>I&apos;m a professional web developer with over ten years of experience building high performance web applications with numerous frameworks and programming languages.</p>
        <p>I&apos;ll teach you about the <em>real</em> reasons your web application is slow, and provide straightforward tips to resolve them. With my help you&apos;ll be able to:</p>
        <ul>
          <li>Avoid common misconceptions about web application performance</li>
          <li>Understand the real reasons for performance bottlenecks in most applications</li>
          <li>Learn to apply profiling techniques to find performance issues</li>
          <li>Resolve common performance issues</li>
          <li>Optimise your server configuration to improve performance</li>
          <li>Write more efficient code</li>
        </ul>
      </section>
    </aside>
  );
}
