---
title: "Myth: You need to use Octane to get acceptable performance from Laravel"
featured_image: img/brenton-pearce-0iCCK42toA4-unsplash.jpg
featured_image_username: Brenton Pearce
description: Laravel Octane is a useful way of improving application
  performance. However, it can't help with everything and you shouldn't use it
  as a crutch.
date: "19-08-2023 10:41:01"
series: Myth Busters
---

[Laravel Octane](https://laravel.com/docs/9.x/octane) can be useful for improving your Laravel application's performance. However, it's not a magic wand and won't resolve existing performance issues with your application. In many cases, migrating to Octane may not be effective at improving application performance, or may come with too many complications, and you may be better off looking at alternative solutions.

In common with most other conventional PHP frameworks, a typical Laravel application works by starting the entire application up on each request and tearing it down at the end. This means that some of the overhead of the framework comes from that initial startup and teardown.

Laravel Octane optimizes performance by creating multiple "worker" instances, which are retained in memory and handle multiple requests. As a result, while the first request handled by a worker still bootstraps the application, as usual, it stores the application in RAM, removing the need to bootstrap it again on subsequent requests handled by that worker.

This has a number of consequences:

* Laravel Octane isn't a simple drop-in solution for speeding up your application. The `register()` and `boot()` methods of the application's service providers are only executed once when the request worker initially boots. On subsequent requests handled by that worker, the same application instance is reused. As such, while when working with PHP resetting global state is usually not an issue, it can be when using Octane, and your application needs to be built to allow for that, or your application will experience problems. Refer to [the documentation](https://laravel.com/docs/9.x/octane#dependency-injection-and-octane) for more details.
* If a memory leak occurs, it's more likely to be a problem than with a more conventional setup because it will affect a worker process that serves multiple requests, instead of a single request.
* The default configuration starts a worker for each CPU core your server has (so if you have 2 cores, it creates 2 workers), with each worker handling requests separately. Each individual worker can only handle a single request at once, and further concurrent requests will be queued. If there's a blocking operation taking place on a worker, such as a slow query, then that will hold up that worker from handling any further requests until it's completed. This is worse than, say, PHP-FPM and Nginx, where the scheduler will manage processes whilst blocking operations happen. As such, under certain specific circumstances, Octane can negatively affect application performance, particularly if more conventional performance bottlenecks don't get resolved first. 

As a result, in a real-world Laravel application, a naive migration to Octane *can* actually cause a performance hit, especially when combined with a failure to optimize other performance bottlenecks, as well as potentially introducing other issues. Of course, starting more workers can help, but each worker brings its own overhead, and you're limited in the number you can create by the amount of RAM available.

For that reason, you shouldn't just automatically reach for Octane if your application isn't performing as well as hoped. Instead, you should carefully examine and profile your application to figure out where the real bottlenecks are, and resolve those first. If your application is particularly read-heavy or primarily content-based, you *may* get a better improvement in application performance by setting up Varnish in front of the application, since that will cache the entire response in memory, so that a significant number of requests never even reach the PHP runtime.
