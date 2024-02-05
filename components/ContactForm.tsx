"use client";

import { FormEvent, ReactElement } from "react";
import { useForm, ValidationError } from "@formspree/react";


export default function ContactForm(): ReactElement {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);

  if (state.succeeded) {
      return (<p className="bg-purple-200 p-2 my-2">Thank you for your submission</p>);
  }

  return (
    <form name="contact" method="POST" className="my-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Your Name
        </label>
        <input className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Your Name" disabled={state.submitting} />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Your Email
        </label>
        <input className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Your Email" disabled={state.submitting} />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" id="message" name="message" placeholder="Your Message" rows={3} disabled={state.submitting} />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <p>
        <button type="submit" className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg shadow-lg p-2 px-4 w-full md:w-1/2"  disabled={state.submitting}>Send</button>
      </p>
      <ValidationError errors={state.errors} />
    </form>
  );
}
