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
  id: string;
  type: "raw" | "full" | "regular" | "small" | "thumb" | "small_s3";
};

const UnsplashImage = async ({ id, type }: Props) => {
  const photo: UnsplashPhoto = await unsplashApi.photos.getPhoto(id);
  return (
    <Image
      src={photo.urls[type]}
      alt={photo.alt_description}
      blurDataURL={photo.blur_hash}
      width={400}
      height={400}
    />
  );
}

export default UnsplashImage;
