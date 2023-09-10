import Image from "next/image";
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch
});

interface UnsplashPhoto {
    id: string;
    slug: string;
    created_at: string;
    updated_at: string;
    promoted_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: [];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    }
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    }
};

interface Props {
  imageId: string;
  type: "raw" | "full" | "regular" | "small" | "thumb" | "small_s3";
  classes?: string;
  fill: boolean;
  priority: boolean;
  sizes: string
};

const UnsplashImage = async ({ imageId, type, classes, fill, priority, sizes }: Props) => {
  const photo: UnsplashPhoto = await unsplashApi.photos.get(imageId);

  return (
    <div>
    </div>
    // <Image
    //   src={photo.urls[type]}
    //   alt={photo.alt_description}
    //   blurDataURL={photo.blur_hash}
    //   className={classes}
    //   fill={fill}
    //   priority={priority}
    //   sizes={sizes}
    // />
  );
}

export default UnsplashImage;
