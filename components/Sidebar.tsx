import { ReactElement } from "react";

export default function Sidebar(): ReactElement {
  return (
    <aside>
      <section>
        <p>Do you struggle to make your Laravel applications perform well?</p>
        <p>Do you find it hard to figure out what advice is and isn&apos;t helpful when optimising the performance of your applications?</p>
        <p>Are you unsure where to begin analysing performance bottlenecks?</p>
        <p>High Performance Laravel is here to help.</p>
        <h4>Hello, I&apos;m Matthew Daly</h4>
        <p>I&apos;m a professional web developer with over ten years of experience building high performance web applications with numerous frameworks and programming languages.</p>
        <p>I&apos;ll teach you about the <em>real</em> reasons your web application is slow, and provide straightforward tips to resolve them. With my help youI&apos;ll be able to:</p>
        <ul>
          <li>Avoid common misconceptions about web application performance</li>
          <li>Understand the real reasons for performance bottlenecks in most applications</li>
          <li>Learn to apply profiling techniques to find performance issues</li>
          <li>Resolve common performance issues</li>
          <li>Optimise your server configuration to improve performance</li>
          <li>Write more efficient code</li>
        </ul>
          <div>
            <a href="https://matthewdaly.co.uk" target="_blank" rel="noopener noreferrer" title="Homepage"><i className="fa fa-solid fa-house"></i></a>
            <a href="https://github.com/matthewbdaly" target="_blank" rel="noopener noreferrer" title="Github"><i className="fa fa-brands fa-github"></i></a>
            <a href="https://mstdn.social/@matthewbdaly" target="_blank" rel="noopener noreferrer" title="Mastodon"><i className="fa fa-brands fa-mastodon"></i></a>
            <a href="https://stackoverflow.com/users/63717/matthew-daly" target="_blank" rel="noopener noreferrer" title="Stack Overflow"><i className="fa fa-brands fa-stack-overflow"></i></a>
            <a href="https://dev.to/matthewbdaly" target="_blank" rel="noopener noreferrer" title="Dev.to"><i className="fa fa-brands fa-dev"></i></a>
          </div>
      </section>
    </aside>
  );
}
