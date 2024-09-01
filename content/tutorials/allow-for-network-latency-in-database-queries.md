---
title: "Allow for network latency in database queries"
description: Network latency can be more of an issue in production than in development, and your queries should allow for that.
date: "2024-09-01T18:00:00.837Z"
series: Faster database queries
featured_image_id: JyRTi3LoQnc
---

Depending on how you're developing your sites locally, the network latency from the application server to the database isn't likely to be too much of an issue. For instance, at work I use Lando, which typically runs one Docker container per service, so Apache or Nginx will be running in one container, while MySQL will be running in another. This usually means the network latency between the two containers in neglible. Other solutions may differ slightly, but the chances are the PHP runtime and the database will be running on the same host, so network latency is unlikely to be an issue.

However, in a production environment that may not be the case. While it's quite common to run the web server and the database on the same host, migrating the database to its own host is generally one of the quickest and easiest steps in the early stages of scaling your application as it grows. When this happens, you're potentially increasing the network latency of your application. That's not a reason not to do it (as if you're doing it, it's probably because it's necessary), but you need to allow for these changes.

Therefore, with MySQL or PostgreSQL (and other similar databases), it's generally a good rule of thumb to aim to write fewer, more complex queries rather than more, simpler ones. That way, the increased network latency when you move the database to a separate host will be less of an issue, since it will affect a smaller number of queries overall. Strategies for doing this include:

* Resolving N+1 queries
* Using subqueries to resolve additional requirements, such as adding a count to some existing results
* Use joins to pull in additional data where required

These strategies aren't without their downsides, and if misused can cause their own problems. This is yet another case of naive use of an ORM being problematic - you can't just treat it as a black box and assume the database queries are all going to be fine. You still need to know your database and write queries that are performant. However, when used well, these techniques often have a bigger impact in a production environment than in development.

If you're using SQLite for local development only, the difference is even more pronounced, and profiling your queries may give misleading results which don't match what you might see in production. SQLite queries are typically extremely fast for simple queries because they're connecting to a simple file, but more complex queries tend to be slower, and so the above rule of thumb is often completely reversed. For that reason, and the potential difference in behaviour and features between SQLite and other databases, I would always recommend that you use the same database engine in local development as you use in production.
