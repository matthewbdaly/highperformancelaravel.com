---
title: Finding N+1 queries with profilers
description: N+1 queries are among the most common performance bottlenecks around. Learn how to find them with profiling tools.
date: "2023-10-24T14:21:04.837Z"
series: Writing efficient applications
featured_image_id: lRoX0shwjUQ
---

N+1 queries are one of the easiest performance issues to inadvertently introduce into a code base. Because they generally don't come about through writing an explicit query, they can easily slip through without being noticed, particularly if you're not used to working with an ORM or you're not habitually profiling your queries. They may not also start to really bite until the application has acquired sufficient content, making it easy for them to get through during initial development.

Fortunately, with experience, it's easy to track them down. Laravel also has a powerful method of resolving them through eager loading.

## What is an N+1 query?

Suppose we have a blog application built in Laravel that has a `Post` model, and it renders the ten latest posts on the home page. The query for this might look like the following:

```php
Post::orderBy('created_at', 'desc')
  ->take(10)
  ->get();
```

So that's one query on the home page that returns 10 results. Now, imagine we want to add a count of the number of comments on each post, so we retrieve that in the Blade template:

```html
@foreach ($posts as $post)
    <li>{{ $post->title }} - {{ $post->comments->count() }} comments</li>
@endforeach
```

This adds an implicit query to each post that would return the number of comments on each post. No-one explicitly wrote that query, so it's easy to miss it if it becomes a performance issue. However, by using a profiler, it's relatively easy to find. The example application I put together for this has Clockwork installed, and if we look at the Database tab when viewing the home page, we see the following:

```
Post	
SELECT * FROM "posts" ORDER BY "created_at" DESC LIMIT 10
web.php:18
0.35 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 1 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.15 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 2 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.08 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 3 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.11 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 4 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.09 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 5 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.08 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 6 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.07 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 7 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.08 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 8 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.08 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 9 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.07 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" = 10 and "comments"."post_id" IS not NULL
welcome.blade.php:21
0.09 ms
```

We now have a total of 11 queries, with the existing query for the posts, and one additional query for each result. This is a typical signature for an N+1 query, with repeated queries on the same table that differ only in the foreign key, and with practice it's easy to find them using a profiler.

Now, these kinds of queries might not be *immediately* problematic. During initial development, or in the early stages after your application goes live, you might not have any particular issues with them. However, over time you may find they become more and more troublesome as:

* You add additional relations to the query, creating additional N+1 queries.
* You switch from one database to another. For these examples I used SQLite, which is actually very fast indeed for the kind of small queries created by this example since the connection overhead is limited and network latency is a non-issue, and so resolving N+1 queries can actually make the application slower. This isn't the case for full database servers like MySQL or PostgreSQL, so if you started out either developing using SQLite or using it in production, and then migrated to MySQL, the N+1 queries may start to bite at this point.
* You move the database to a separate server. At that point, network latency becomes more of an issue.

A good rule of thumb when optimising for production is therefore that fewer, more complex queries are usually (though not always) more efficient than more, simple queries. Resolving N+1 queries is consistent with this rule.

## How can I resolve N+1 queries?

Laravel has a simple mechanism to resolve N+1 queries in the shape of [eager loading](https://laravel.com/docs/master/eloquent-relationships#eager-loading). I won't reiterate the entire of that section of the Laravel documentation as it explains it very well. Instead I'll demonstrate using it to improve this example. Let's update the query to eager load the `comments` table:

```php
Post::orderBy('created_at', 'desc')
  ->take(10)
  ->with('comments')
  ->get();
```

Now, if we reload that page, Clockwork will show something like this in the Database tab:

```
Post	
SELECT * FROM "posts" ORDER BY "created_at" DESC LIMIT 10
web.php:18
1.07 ms
Comment	
SELECT * FROM "comments" WHERE "comments"."post_id" in (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
web.php:18
0.73 ms
```

Instead of a query for each post, it instead retrieves all the comments for which the post ID is in the returned comments. This is actually slightly slower in my example application using SQLite, with the application as a whole coming back in 36ms, but as mentioned above, this won't be the case when using something like MySQL in a production environment.

This is a significant improvement with only a single clause in the query. However, in this case, because we're only getting a count of the items, we can do better. There's a `withCount()` method on the query builder that can get just a count of the items, rather than retrieving the items. This is significantly more efficient because rather than returning an array of the items, we're getting back just a single numeric value. If we change the query as follows:

```php
Post::orderBy('created_at', 'desc')
  ->take(10)
  ->withCount('comments')
  ->get();
```

And adjust the view to retrieve the numeric value:

```html
@foreach ($posts as $post)
    <li>{{ $post->title }} - {{ $post->comments_count }} comments</li>
@endforeach
```

I'm now seeing a response time of 22ms, and only a single query shows in the Database tab in Clockwork:

```
Post	
SELECT "posts".*, (SELECT count(*) FROM "comments" WHERE "posts"."id" = "comments"."post_id") AS "comments_count" FROM "posts" ORDER BY "created_at" DESC LIMIT 10
web.php:18
1.29 ms
```

Much better! This single query now returns both the posts and the number of comments for each post, without the need for additional queries. This query will also scale much better as the application grows.

N+1 queries are very common performance bottlenecks in any application built using an ORM, but it's really not hard to find them with a profiler, and resolve them with eager loading. Don't feel like you need to use Clockwork as your profiler just because I used it - there are plenty of options around, and you should try a few out and see which one you like the best.

More complex scenarios sometimes occur, with multiple levels of eager loading, and constrained eager loading, but those are much rarer, and the techniques for handling them are more advanced. If you're interested in learning more, I suggest reading through the documenation linked to above.
