---
title: Replace DATEDIFF with CURDATE - INTERVAL
description: The DATEDIFF function in SQL can be slow. Replacing it with CURDATE can often help performance on complex queries.
featured_image: img/michael-dziedzic-D6FMtY6XCyM-unsplash.jpg
featured_image_username: Michael Dziedzic
date: "2023-08-26T14:21:04.837Z"
series: Faster database queries
featured_image_id: D6FMtY6XCyM
---

Suppose you have to get all the items in a database table where the `created_at` date is within the last `$days` days. You might write the following query using Eloquent:

```php
$pages = Page::whereRaw('DATEDIFF(CURDATE(), created_at) < ?', $days)->get();
```

The performance might be acceptable if you only retrieve a handful of items, but once you have many items, you may well find it gets very slow. The problem is that this query calculates `DATEDIFF(CURDATE(), created_at)` on *every* row in the table, before it can even make the decision about whether to include it in the results or not. Adding an index won't help because you're generating the value dynamically.

You can instead use `CURDATE - INTERVAL`:

```php
$pages = Page::whereRaw('created_at > (CURDATE() - INTERVAL ? DAY)', $days)->get();
```

This helps resolve the issue because it calculates `CURDATE() - INTERVAL $days DAY` once, and then applies the calculated date to every row. This means this will *usually* perform faster than the previous version of the query. In addition, if you have an index defined on `created_at`, it can be used on this query.

Please note that for some queries that are simpler, or with smaller datasets, you may find that the first query *can* still be faster. If you have a performance issue with a query that contains a `DATEDIFF` (and you should be using a profiler to verify that that's *really* where the problem is...), you should benchmark both versions of the query and see which is faster with your database.
