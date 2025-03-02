import Link from "next/link";
import { ReactElement } from "react";

export default function Footer(): ReactElement<any> {
  return (
    <footer>
      <section>
        <div>
          <p><Link href="/privacy-policy">Privacy policy</Link></p>
        </div>
        <div>
          <div className="socialIcons">
            <a href="https://matthewdaly.co.uk" target="_blank" rel="noopener noreferrer" title="Homepage"><i className="icon-house"></i></a>
            <a href="https://github.com/matthewbdaly" target="_blank" rel="noopener noreferrer" title="Github"><i className="icon-github"></i></a>
            <a href="https://mstdn.social/@matthewbdaly" target="_blank" rel="noopener noreferrer" title="Mastodon"><i className="icon-mastodon"></i></a>
            <a href="https://stackoverflow.com/users/63717/matthew-daly" target="_blank" rel="noopener noreferrer" title="Stack Overflow"><i className="icon-stack-overflow"></i></a>
            <a href="https://dev.to/matthewbdaly" target="_blank" rel="noopener noreferrer" title="Dev.to"><i className="icon-dev"></i></a>
          </div>
        </div>
      </section>
      <div className="copyright">
        <p>Copyright &copy; Matthew Daly {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
