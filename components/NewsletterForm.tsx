import { ReactElement } from "react";

export default function NewsletterForm(): ReactElement {
  return (
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
  );
}
