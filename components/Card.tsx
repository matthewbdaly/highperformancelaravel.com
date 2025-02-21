import Link from "next/link";
import React, { FC, ReactElement } from "react"
import { Route } from "next";
import UnsplashImage from "./UnsplashImage";

interface Props {
  title: string;
  description: string;
  slug: string;
  series?: string;
  href: string;
  featured_image_id: string;
};

const Card: FC<Props> = ({ title, description, href, slug, series, featured_image_id }): ReactElement => {
  return (
    <div className="w-full shrink-0 xl:w-1/4 lg:w-1/2 md:pr-4 mb-4">
      <Link key={slug} href={href as Route}>
        <section className="w-full rounded-lg shadow-lg border-2 overflow-hidden mb-2 bg-gradient-to-b from-slate-50 to-slate-100 dark:text-gray-600 hover:-translate-y-1 motion-reduce:hover:transform-none transition-transform duration-200 delay-200">
          <div className="w-full h-72 overflow-hidden relative">
            <UnsplashImage
              type="small"
              imageId={featured_image_id}
              classes="w-full h-64 object-cover object-center"
              fill={true}
              priority={true}
              sizes="400px"
            />
          </div>
          <div className="p-2 h-80 md:h-96">
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
