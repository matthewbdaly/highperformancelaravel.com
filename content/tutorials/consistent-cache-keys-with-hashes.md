---
title: Consistent cache keys with hashing
description: It can be difficult to come up with consistent cache keys for some use cases, but using hashes for this can be helpful.
date: "2023-10-17T18:00:04.837Z"
series: Effective caching
featured_image_id: 7BhTfoKsheQ
---

One of the biggest challenges of caching is that it can be difficult to come up with consistent cache keys for many use cases. This is unsurprising as it's the intersection of the following two problems:

> There are only two hard things in Computer Science: cache invalidation and naming things.
> 
> -- Phil Karlton

The best strategy to use is highly dependent on the specific situation, with possible factors including:

* Whether the cached data is user-specific
* Whether it's specific to a given part of the application
* What the application is doing
* Whether there are parameters involved
* Whether the data is time-sensitive

So there's not often one single strategy that can cover most cases. However, one strategy I sometimes use which can be fairly easily applied to multiple situations is to create a string that includes all of the parameters involved in retrieving that particular set of data, and then convert that string to a hash and include it as part of the cache key (or more rarely use it in its entirety as a cache key). This provides consistency between calls with the same parameters, with the response time still being negligible, and the risk of collision is, while not zero, unlikley to be worth worrying about (though this depends on the hashing algorithm used).

For instance, take this example:

```php
$key = sprintf('search-results-%s-%s', $type, hash('sha256', $query));
Cache::remember($key, 3600, function () use ($type, $query) {
    // Return search results
}
```

This might be used for caching results from a search service of some kind where multiple different types of content, represented by `$type`, are being searched with different search queries, represented by `$query`. By converting the string of the query to a hash, we'll get back a string which will be consistent when the same two values are passed to the two parameters.

Along similar lines, suppose you had a database query that took multiple numeric ID's as parameters. You could create a string containing the ID's, hash it, and then include it as part of the cache key:

```php
$key = sprintf('user-content-%s', hash('sha256', sprintf('%d-%d', $userId, $typeId)));
Cache::remember($key, 3600, function () use ($userId, $typeId) {
    // Return query results
}
```

In both these cases, we're only hashing the latter part of the key which contains one or more parameters. This approach makes for keys which have at least some part which is human-readable, which can be useful if you're using a cache backend which doesn't support tags, but you still need to be able to invalidate entire groups under certain circumstances. While the `Cache` service doesn't directly support doing so, it's still possible to work directly with the cache backend to invalidate matching keys. For instance, if you were using the `database` backend, you could write a relatively simple query that deleted all rows where the key matched an appropriate regular expression, eg `DELETE FROM cache WHERE key REGEXP '^user-content-'`. This isn't necessarily a great approach to cache invalidation as it means you're now making your implementation specific to that cache backend, but if you can't use a cache backend that supports tags, it might be the least worst option.

The actual algorithm used for the hashing is entirely up to you. This is a *very* different scenario from using a hash for passwords, and while many older hashing algorithms are nowadays considered too weak to be used for hashing passwords, that is a complete non-issue when generating cache keys, so you don't want to use something like bcrypt. The likelihood of cache collisions could *potentially* be an issue with some older hashing algorithms. MD5 or SHA-1 *might* be adequate for many use cases, but SHA-256 or SHA-512 are safer options that provide a reasonable balance between collision likelihood and performance.
