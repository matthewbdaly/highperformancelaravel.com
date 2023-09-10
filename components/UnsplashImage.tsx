import Image from "next/image";
import { unsplashApi } from '@/lib/functions';

interface Props {
  imageId: string;
  type: "raw" | "full" | "regular" | "small" | "thumb";
  classes?: string;
  fill: boolean;
  priority: boolean;
  sizes: string
};

const UnsplashImage = async ({ imageId, type, classes, fill, priority, sizes }: Props) => {
  const result = await unsplashApi.photos.get({ photoId: imageId });
  if (result.errors) {
    throw new Error(result.errors[0]);
  }

  return (
    <Image
      src={result.response.urls[type]}
      alt={result.response.alt_description || ""}
      blurDataURL={result.response.blur_hash || undefined}
      className={classes}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized
    />
  );
}

export default UnsplashImage;
