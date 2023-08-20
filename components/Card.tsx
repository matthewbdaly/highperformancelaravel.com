import Link from "next/link";
import Image from "next/image";
import React, { FC, ReactElement } from "react"
import { Route } from "next";

interface Props {
  title: string;
  description: string;
  slug: string;
  series?: string;
  href: string;
  featured_image?: string;
  featured_image_username?: string;
};

const Card: FC<Props> = ({ title, description, href, slug, series, featured_image, featured_image_username }): ReactElement => {
  return (
    <div className="w-full shrink-0 xl:w-1/4 lg:w-1/3 md:w-1/2 md:pr-4 mb-4">
      <Link key={slug} href={href as Route}>
        <section className="w-full rounded-lg shadow-lg border-2 overflow-hidden mb-2 bg-gradient-to-b from-slate-50 to-slate-100 dark:text-gray-600">
          <div className="w-full h-72 overflow-hidden relative">
            <Image 
              src={`/${featured_image}`} 
              alt={featured_image_username ? `Photo by ${featured_image_username} on Unsplash` : ''} 
              title={featured_image_username ? `Photo by ${featured_image_username} on Unsplash` : ''} 
              className="w-full h-64 object-cover object-center"
              fill={true}
              quality={30}
              priority={true}
              sizes="400px"
            />
          </div>
          <div className="p-2 h-96">
            <h2 className="text-xl font-bold mb-2 py-4">{title}</h2>
            {series && <h3 className="text-lg font-bold">From the series <span className="text-sky-700">{series}</span></h3>}
            <p className="text-lg">{description}</p>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default Card;
