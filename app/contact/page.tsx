import ContactForm from "@/components/ContactForm";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ReactElement } from "react";
import logo from "@/public/img/logo.png";

const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: `Contact me`,
  openGraph: {
    title: `Contact me | High Performance Laravel`,
    type: 'website',
    url: `${baseUrl}contact`,
    images: [
      {
        url: logo.src,
        width: logo.width,
        height: logo.height
      }
    ]
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
