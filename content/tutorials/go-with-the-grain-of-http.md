---
title: Go with the grain of HTTP
description: HTTP has multiple different verbs, and understanding the right ones to use can make it easier to cache the responses.
date: 2023-10-01T16:30:04.837Z
series: Writing efficient applications
featured_image_id: kl4D1SWui5g
---

HTTP isn't a terribly complex protocol, but using the verbs in a naive way can potentially hurt the performance of your application, particularly if there's a cache of some sort in between your application and the client.

For instance, the `GET` verb is used to fetch data, and so most caching proxies will cache the response of a `GET` request, unless otherwise specified. Other HTTP verbs, such as `POST`, `PUT`, `PATCH` and `DELETE`, denote a change in the data, and so won't be cached. As a result, if you're fetching data from your application via anything other than a `GET` request, your application could be performing suboptimally. By contrast, if you get your data via a `GET` request, then if it's coupled with a well thought out caching strategy, it can improve performance substantially.

Appropriate HTTP verbs, headers and status codes can also affect the experience of any HTTP client, not just web browsers. Some visitors to your site might be behind a caching proxy such as Squid, particularly if they're in an educational or corporate environment where many web pages might be requested frequently, and using an appropriate HTTP method and headers will tell a proxy whether a particular page can be cached or not. This is extremely beneficial as the proxy will do the job of caching your pages, so that many users can potentially view a page without actually having to fetch it from your server at all.

Similarly, a reverse caching proxy such as Varnish can also make use of the HTTP verbs to determine whether a particular request can be cached or not. It's possible to override this if absolutely necessary in the Varnish configuration, but by using appropriate HTTP verbs throughout, you're making it as easy as possible for Varnish to speed your site up without specific configuration changes, and lightening the load on your future self if you suddenly have a huge influx of users and need to get Varnish up and running at short notice.
