"use client";
import { FormEvent, ReactElement, useState } from "react";

export default function ContactForm(): ReactElement {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const validateSubmit = (event: FormEvent) => {
    event.preventDefault();

    const myForm = event.target as HTMLFormElement;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
    .then(() => setSubmitted(true))
    .catch(() => setError("Sorry, something went wrong"));
  };

  return (
    <form name="contact" method="POST" netlify-honeypot="employer-name" data-netlify="true" data-netlify-recaptcha="true" className="my-4" onSubmit={validateSubmit}>
      <p className="hidden">
        <label>Employer Name: <input type="text" name="employer-name" /></label>
      </p>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Your Name
        </label>
        <input className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Your Name" disabled={submitted} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Your Email
        </label>
        <input className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Your Email" disabled={submitted} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" id="message" name="message" placeholder="Your Message" rows={3} disabled={submitted} />
      </div>
      <div data-netlify-recaptcha="true"></div>
      <p>
        <button type="submit" className="bg-gradient-to-r from-caribbean-green-400 to-caribbean-green-600 text-white rounded-lg shadow-lg p-2 px-4 w-full md:w-1/2"  disabled={submitted}>Send</button>
      </p>
      {error && <p>{error}</p>}
    </form>
  );
}
