---
title: Optimise your images
description: Picking the wrong image format, or using too-large images, can hurt your site's performance significantly.
date: 2023-10-01T15:30:04.837Z
series: Front end
featured_image_id: 1weQp50r6fQ
---

Providing too-large or unnecessarily high quality images is a common mistake on many applications. Sometimes clients will provide images that are far too large, or of a quality that is simply unnecessary for that particular use case, and thus the files are significantly larger than they need to be. This can cause a noticeable difference in page loading times.

Adding an appropriate caching policy for images will be helpful, but won't eliminate the problem entirely. And while for images that form a part of the site code you can optimize the images yourself using image editing software, that's not an option for dynamic images uploaded by site users. Here are some suggestions for optimizing the images on your site.

## Make use of responsive images

Nowadays, the majority of users are likely to be visiting your site on a mobile device, and in some cases they may not have a terribly reliable connection at any one time. As such, in many cases you can save them a lot of bandwidth by serving up an appropriately sized image. For instance, if a post has a hero-style image, this will be much wider on desktop than on mobile, and there's a significant potential bandwidth saving from serving up a smaller image to mobile users.

Nowdays, [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) allow for this to be done easily as long as you have the appropriate images. By using the `<picture>` element, you can specify multiple images for different screen sizes by nesting the `<source>` and `img` elements, and the browser will choose the most appropriate one automatically. That way, mobile users aren't having to wait around for a too-large image to download, and desktop users don't have a poor quality hero image.

## Pick the right image format

While historically JPEG, PNG and GIF formats have been the primary ones used for images on the web, there are more efficient alternatives available nowadays, and they are widely supported by modern browsers. Unless you're having to deal with a lot of legacy browsers, it's worth considering whether using a newer format like WebP makes sense.

If you do need to support older browsers, it may make sense to use a `<picture>` element and specify a fallback image for older browsers using the `<img>` element that uses an older format. That way newer browsers still get a more efficient experience.

## Consider automated solutions for image optimisation

There are a number of possible solutions for optimizing images on your site as and when you need them, and by making use of them, you can specify exactly what sizes and formats you want, and have them loaded dynamically, without having to optimize the image before you upload it. For instance:

* If your application has a separate front end, many front end frameworks include the capability to automatically optimise images. For instance, Next.js has a dedicated `<Image />` component that can optimize the provided image for the required dimensions. If you're using one of these frameworks, this would be the logical place to start.
* [Glide](https://glide.thephpleague.com/) is a great option for most Laravel applications, and is included in the [Statamic](https://statamic.com/) CMS. It provides a simple HTTP-based API that allows you to crop, resize, and format images on the fly, so every reference to a given image can fetch a version of an appropriate size, format and quality. It does need to be secured correctly by signing each request, and possibly limiting the parameters accepted (if left too open, someone could perform a denial of service attack by requesting overly large versions of an image), but this isn't hard. You can specify presets for images to make things more consistent, and I've also had success before in using it with GraphQL to return URLs for secure, dynamically sized images on the fly. By using Glide together with responsive images, you can serve images of an appropriate size, quality and format, regardless of the format of the source image.
* Services such as [Cloudflare Polish](https://developers.cloudflare.com/images/polish/) may also be an option, depending on your needs, and if you're already using the service in question they're probably the easiest way to go.

Any of these removes the need for you to have to specifically optimize the image before you upload it, making them a particularly good fit for use cases where the same image will be shown at different resolutions, or when the images are submitted by users.
