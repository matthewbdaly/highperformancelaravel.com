---
title: Caching responses with the cache.headers middleware
description: Out of the box, Laravel supports a simple method of adding
  appropriate caching headers to HTTP responses to prevent unnecessary HTTP requests.
date: "2023-08-26T14:21:04.837Z"
series: Writing efficient applications
featured_image_id: al1bUu7EfAQ
---
Adding appropriate caching headers to an HTTP response can significantly reduce the size of responses, and in some cases can allow your application to return a simple 304 status code to indicate the response hasn't changed since the last request. Laravel supports a simple method of caching with the `cache.headers` middleware, but to use it, you first need to understand HTTP caching headers.

## A quick primer on HTTP caching headers

The main header involved is the `Cache-Control` header. This supports multiple values, and a high-level overview of the most important of these headers is as follows:

* `private` denotes that the response is personalized to a given user, and should not be cached by an intermediate cache.
* `public` denotes that the response is not personalized to a given user, but should only be used when there is a need to store the response when the `Authorization` header is set.
* `max-age` denotes the length of time an asset is valid for once fetched
* `etag` denotes a unique identifier for that version of an asset. This allows your application to validate that the request is for the current version of the asset, and return a 304 Not Modified response if no new version is available.
* `no-cache` prevents the reuse of responses without validation. By default, even if you have set an etag, the browser won't try to revalidate the response until `max-age` has been reached. If you always want to check for a new version of an asset, leaving `max-age` out and setting `no-cache` allows you to do so while still benefiting from etags.
* `no-store` prevents the response from being stored.

This is just a very short breakdown of some of the most common headers. For a better understanding of caching headers, I highly recommend [the relevant article on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching).

## Using these in Laravel

As mentioned, these headers can all be set using one simple method - the `cache.headers` middleware. However, it needs additional parameters to be passed in when calling it, in order to set an appropriate caching policy for that specific asset.

Like any other middleware, you can call it in the constructor of a controller:

```php
<?php

...
public function __construct()
{
    $this->middleware('cache.headers:public;max_age=2628000;etag');
}
```

Or to a single route:

```php
<?php
Route::get('/foo', function () {
        //
})->middleware('cache.headers:public;max_age=2628000;etag');
```

Or to a group of routes:

```php
<?php
Route::middleware('cache.headers:public;max_age=2628000;etag')->group(function () {
    //
});
```

Whichever approach makes sense for that part of the application will be fine. Then, once that's done, you need to formulate an appropriate caching policy for the routes of your application. As shown above, you can specify whatever values you like as the value of `Cache-Control`, but need to do so in "snake case" eg convert `max-age` to `max_age`.

If you have an application with more exacting requirements, it *might* be worth writing a custom middleware to set these response headers, but this should be rare.

## Additional benefits

Adding appropriate caching headers to your application has even more benefits when accessed via any kind of caching web proxy, whether that's on your server (if you've configured Nginx to cache the responses, or perhaps you've set up Varnish), or closer to the client (such as if it's being accessed by multiple users who are on a network using a proxy like Squid). By going with the grain of HTTP and setting suitable caching headers, proxies like these will know what to cache, when, and for how long, reducing the amount of bandwidth used between the cache and the client.
