import Image from "next/image";
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch
});

interface Props {
  imageId: string;
  type: "raw" | "full" | "regular" | "small" | "thumb" | "small_s3";
  classes?: string;
  fill: boolean;
  priority: boolean;
  sizes: string
};

const UnsplashImage = async ({ imageId, type, classes, fill, priority, sizes }: Props) => {
  const result = await unsplashApi.photos.get({ photoId: imageId });
  if (result.type !== "success") {
    throw new Error(result.message);
  }

  return (
    <Image
      src={result.response.urls[type]}
      alt={result.response.alt_description}
      blurDataURL={result.response.blur_hash}
      className={classes}
      fill={fill}
      priority={priority}
      sizes={sizes}
    />
  );
}

export default UnsplashImage;
