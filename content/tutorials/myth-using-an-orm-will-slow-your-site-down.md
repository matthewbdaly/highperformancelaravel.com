---
title: "Myth: Using an ORM will slow your site down"
description: You'll often hear claims that using an ORM makes for slower database queries. This is misleading, and a more nuanced understanding will help you to understand how to best optimise your queries.
date: "2023-08-27T18:00:00.837Z"
series: Myth Busters
featured_image_id: 11KDtiUWRq4
---

Another myth you'll often hear being parroted is that using an ORM like Eloquent will inevitably slow down your queries. This is simply not true, and is caused almost entirely by naive usage.

Any ORM is essentially just a layer of abstraction on top of SQL. It provides objects that represent rows in a particular database table, and that allow you to interact with that data in a consistent manner. This means you are at least somewhat isolated from writing raw SQL. However, it's still using SQL, even if you're not writing it directly, and the SQL created by an ORM may not always be optimal if you don't take care to write it properly. Treating the ORM like a black box, without thinking about the performance of the underlying queries, is a sure way to end up with poor query performance.

For instance, the `User` model would return all fields in the `users` table by default, and if you only needed a handful of fields for a given query, that would make for a slower query than if you specified only the fields you needed. It would still be beneficial in most cases to use the `select()` method to specify the actual fields you wanted. Similarly, if you carry out a join, it will return all the fields across the original and joined tables, and returning *only* those you need could potentially improve performance significantly.

Using an ORM also doesn't absolve you of the need to optimise your database structure and indexes. You'll still get far better performance out of a database that's well designed, and has well-chosen indexes on its columns.

There are also some potential performance bottlenecks that are made more likely by not using an ORM. Chief among these is the so-called N+1 query, where you may make one query to get all items of a type (eg blog posts), and then have another query that repeats for each item in the results of the first query (eg comments on those posts), resulting in a large number of repetitive queries to the same table. Most ORMs, including Eloquent, allow you to avoid the child queries using eager loading, a technique whereby all the child items are fetched with a single query and then matched up with the appropriate parent items automatically. For relatively simple queries, such as when there's only two levels of queries, it's *sometimes* possible to use a `JOIN` to do this in a single query, but when you start getting into queries with multiple levels this becomes impractical, and eager loading is usually the easiest way to make the queries as efficient as possible.

ORM's also have a lot of other advantages:

* By representing a row in the database as an object, we can more easily make certain assertions about the data they contain and their functionality. This is a very powerful feature of ORM's, and allows you to make your code much more type-safe. A class name is more informative to static analysis tools like Psalm, and if you set proper `@property` annotations on your models, Psalm will know what fields will exist on those models, and be able to find attempts to access non-existent ones. While not impossible, representing the same fields as an array is much more of a chore, and harder to ensure.
* ORM's can also express some more complicated queries in ways that are much more difficult to do manually. The `whereHas()` method is a good example of this - writing something to do the same thing as this with only raw SQL can be downright painful.
* Repeated sections of queries can be extracted to a scope, making it easy to reuse them and keeping your code cleaner and more consistent.
* A reduction in context switching. It's *very* hard, mentally, to keep switching context from PHP to SQL. Raw SQL in a PHP file can also be hard to read - not every text editor necessarily handles it very well. By avoiding it where possible, you make it easier to understand your code.
* Every ORM I have ever encountered has an "escape hatch" for using raw SQL where it's absolutely necessary. So you're not actually giving up on the flexibility of using raw SQL, just reserving it for when it's really necessary.

There is *some* overhead from populating the models when using an ORM, instead of returning an array, but for queries that return a relatively small number of results, this is usually negligible enough that it's not worth worrying about. It only becomes significant enough to be an issue when you have hundreds or thousands of results. Given this is typically for use cases where we're only interested in the raw data, such as report generation, it's acceptable to return an array instead of model instances under these circumstances.

Profiling your database queries so that you can see what SQL gets run is a great way to help you find performance bottlenecks in your application. There are a number of profiling tools available for Laravel, including:

* [Laravel Telescope](https://laravel.com/docs/10.x/telescope)
* [Ray](https://spatie.be/products/ray)
* [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)
* [Clockwork](https://underground.works/clockwork/) - this is my own preferred solution

Any of these tools, and no doubt some others, will be very helpful when you're trying to optimise your database queries. By seeing the actual SQL that's being executed, you can more easily pick up on slow queries, or large numbers of queries, and figure out how to resolve them.
