import Image from "next/image";
import { FC, ReactElement } from "react";

interface Props {
  featured_image?: string,
  featured_image_username?: string,
  title: string,
  description: string
};

const Hero: FC<Props> = ({ featured_image, featured_image_username, title, description }): ReactElement => {
  return (
    <div className="heroWrapper">
      {featured_image &&
      <div className="imageWrapper">
        <Image
          src={`/${featured_image}`}
          alt={`Photo by ${featured_image_username} on Unsplash`}
          title={`Photo by ${featured_image_username} on Unsplash`}
          fill={true}
          priority={true}
          className="object-cover object-center"
          quality={30}
        />
      </div>
      }
      <div className="heroContent">
        <h2 className="text-2xl font-bold py-2 px-16 my-2">{title}</h2>
        <h3 className="text-xl py-2 px-16 my-2">{description}</h3>
      </div>
    </div>
  );
};

export default Hero;
