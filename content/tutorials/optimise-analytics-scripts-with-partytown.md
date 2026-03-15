---
title: Optimise analytics scripts with Partytown
description: Analytics scripts can be detrimental to the performance of your site, but there are sometimes ways you can improve this.
date: "2023-12-26T14:45:04.837Z"
series: Front end
featured_image_id: tAH2cA_BL5g
---

If you've built a few websites in the past on a professional basis, you might have experienced the following situation. The site works great, it scores well on Lighthouse or a similar speed test, and it's ready to go live. Then the time comes to start adding analytics scripts, and suddenly the performance score drops off a cliff. It's a frustrating situation to be in.

The trouble is that analytics aren't really a core part of the site's functionality. If they mysteriously stopped working, it wouldn't be a disaster - your users would likely never notice. You'd notice the suspicious gaps in the site usage, which would likely be an inconvenience when planning strategies and gauging the effectiveness of the site, but that is very much secondary to the end user's usage of the site. As such, if your analytics solution is actively making your end user's experience working with the site worse, that's putting analytics ahead of the primary purpose of your site. That's not to say analytics aren't useful, but they're not what your site is about.

## Using web workers

It used to be the case that there was nothing much we could do about that. The main browser thread was the only place we could run Javascript, so the core application functionality and subsidiary functionality like analytics were running in the same place, competing for resources, and if one had problems it could slow the other down. However, in these post-Internet Explorer days, we now have the option of using web workers. This is the obvious place for an analytics solution to run - it's separate from the main thread, and allows analytics to run in a way that won't interfere with the main application code. However, at least for now, client side analytics solutions still use the main thread, at least by default.

[Partytown](https://partytown.qwik.dev/) exists to solve this problem. It's intended to be used with third party scripts to offload them into a web worker, taking them out of the main thread and negating their impact on your website. As such, it's a particularly good fit for analytics scripts, which don't form a part of a site's core functionality.

Be warned, Partytown is at time of writing still in beta, and while it seems to be solid for Google Tag Manager, it may not necessarily work for all analytics solutions. The developers have documented several popular analytics solutions, and actively encourage new submissions for known good services. For the same reason, I'm not going to document how to implement any of those solutions with Partytown - they could change at any time, so please refer to the link above for full details of how to implement it for your tracking solution.

Going forward it wouldn't surprise me if at some point analytics solutions will all begin using web workers natively. Edge computing seems to be consolidating around the idea of using standard web APIs, making it practical to run the same Javascript code both in a web worker and a CDN that sits between the client and server, and making it possible to run analytics in both those contexts would be comparatively straightforward. But I wouldn't hold my breath, and for now Partytown is the simplest way to achieve that.

## How else can we do it?

Other solutions for this problem could include:

* **Using a server side analytics service that doesn't affect the end user's experience** - this may limit what data you can collect, but it may be you don't need to provide all that data anyway.
* **Using an off the shelf server side analytics package** - if the existing services don't really work for you, this may be a good solution that offers easy integration with minimal work on your part.
* **Roll your own bespoke server side analytics solution** - if none of the existing solutions work for you, this may be the best option. It allows deeper integration with your own project. In theory, this can be quite easy, and if implemented well it won't have any noticeable effect on performance. I'd be inclined to implement this as a middleware that's applied to all the routes I wanted to monitor, and might consider using the message queue to ensure the work of storing the analytics data was done asynchronously
* **Go without** - if you have a project where the sort of user stats provided by analytics aren't strictly required, there's no reason why you need to include it. It may be you can get similar stats through other means, such as user sessions or signups, or it may be that it has a captive audience, such as an intranet system. In cases like these, it's worth considering if you actually need any analytics at all.
