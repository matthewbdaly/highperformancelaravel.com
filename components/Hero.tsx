import Image from "next/image";
import { FC, ReactElement } from "react";
import { getUnsplashPhoto } from "@/lib/functions";

interface Props {
  featured_image_id: string,
  title: string,
  description: string
};

const Hero: FC<Props> = async ({ featured_image_id, title, description }): Promise<ReactElement<any>> => {
  const featuredImage = await getUnsplashPhoto(featured_image_id);

  return (
    <div className="heroWrapper">
      {featuredImage &&
      <Image
        src={featuredImage.urls.regular}
        alt={featuredImage.alt_description || ""}
        blurDataURL={featuredImage.blur_hash || undefined}
        className="object-cover object-center"
        fill={true}
        priority={true}
        sizes="800px"
        unoptimized
      />
      }
      <div className="heroContent">
        <h2 className="text-2xl font-bold py-2 px-16 my-2">{title}</h2>
        <h3 className="text-xl py-2 px-16 my-2">{description}</h3>
        <p className="block absolute bottom-2 text-xs font-light">Photo by <a href={`https://unsplash.com/@${featuredImage.user.username}?utm_source=highperformancelaravel&utm_medium=referral`}>{featuredImage.user.name}</a> on <a href="https://unsplash.com/?utm_source=highperformancelaravel&utm_medium=referral">Unsplash</a></p>
      </div>
    </div>
  );
};

export default Hero;
