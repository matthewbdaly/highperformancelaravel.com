---
title: "Myth: PHP is slower than language X"
description: There are languages where the runtime is faster than PHP. However,
  that's often irrelevant since the language runtime isn't usually a significant
  bottleneck.
date: "2023-08-26T14:21:04.837Z"
series: Myth Busters
featured_image_id: fiq0tet6llw
---

You'll often hear criticism of PHP as being slower than Node.js, Golang, or various other programming languages. However, these criticisms are nearly always neither here not there.

The actual programming language runtime used when building a web application isn't actually that big a factor in the response times of any sizeable web application. The PHP language isn't as fast as some other languages, but it's fast enough for most use cases. The biggest bottlenecks in applications tend to be:

* Badly designed database queries, or missing indexes on database tables
* N+1 queries
* Failure to move functionality that need not run in the request context to a message queue
* Failure to cache data that doesn't need to be fetched over and over
* Inadequate HTTP caching, such as failure to set long enough expiry dates or ETags, and failure to return 304 Not Modified responses when appropriate to avoid the need to re-send data

These issues affect *every* language runtime, so if you rewrite your application from scratch into, say, Node.js in order to improve performance, but leave the implementation as similar as possible, you're wasting your time - the new application will have similar issues

These criticisms also typically make no allowance for the server configuration, only for the underlying application itself. A typical web application can be optimised significantly by proper use of caching in the Apache or Nginx configuration. For applications which have a high proportion of reads to writes, such as primarily content-based applications, placing an HTTP caching server such as Varnish in front of the web server can make a significant difference too, since many requests will be served directly from the cache, without ever reaching the underlying web server.

In short, if you already have a working web application whose performance isn't adequate, it's very unlikely rewriting it in a faster language runtime is going to resolve the issue. It's likely you can resolve the issue more quickly, cheaply and with less effort by looking for slow database queries, jobs that can be pushed to a message queue, data that can be cached, and potential improvements to HTTP caching.
