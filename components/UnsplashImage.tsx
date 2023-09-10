import Image from "next/image";
import { getUnsplashPhoto } from '@/lib/functions';

interface Props {
  imageId: string;
  type: "raw" | "full" | "regular" | "small" | "thumb";
  classes?: string;
  fill: boolean;
  priority: boolean;
  sizes: string
};

const UnsplashImage = async ({ imageId, type, classes, fill, priority, sizes }: Props) => {
  const response = await getUnsplashPhoto(imageId);

  return (
    <Image
      src={response.urls[type]}
      alt={response.alt_description || ""}
      blurDataURL={response.blur_hash || undefined}
      className={classes}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized
    />
  );
}

export default UnsplashImage;
