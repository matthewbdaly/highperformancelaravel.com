import { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer>
      <div>
        <p>Made with ❤️ by <a href="https://matthewdaly.co.uk">Matthew Daly</a></p>
      </div>
      <p>Copyright &copy; Matthew Daly {new Date().getFullYear()}</p>
    </footer>
  );
}
