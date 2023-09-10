import Image from "next/image";
import { FC, ReactElement } from "react";
import UnsplashImage from "./UnsplashImage";

interface Props {
  featured_image_id: string,
  title: string,
  description: string
};

const Hero: FC<Props> = ({ featured_image_id, title, description }): ReactElement => {
  return (
    <div className="heroWrapper">
      {featured_image_id &&
      <UnsplashImage
        type="full"
        imageId={featured_image_id}
        classes="object-cover object-center"
        fill={true}
        priority={true}
        sizes="800px"
      />
      }
      <div className="heroContent">
        <h2 className="text-2xl font-bold py-2 px-16 my-2">{title}</h2>
        <h3 className="text-xl py-2 px-16 my-2">{description}</h3>
      </div>
    </div>
  );
};

export default Hero;
