import ContactForm from "@/components/ContactForm";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ReactElement } from "react";

export const metadata: Metadata = {
  metadataBase: process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: `Contact me | High Performance Laravel`,
  openGraph: {
    title: `Contact me | High Performance Laravel`,
  }
}

export default function Page(): ReactElement {
  return (
    <section className="content-wrapper">
      <div className="content">
        <p>If you need to contact me about this site, please use this form</p>
        <ContactForm />
      </div>
      <Sidebar />
    </section>
  )
}
