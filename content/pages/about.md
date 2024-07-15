---
title: About this site
description: We help you identify and resolve performance issues with your Laravel project
---

## What is this site about?

Everyone wants their web application to be performant. But there's a lot of myths, misconceptions, outdated advice and general misinformation around about this, and it's only once you have some experience under your belt that you can sort what really works from what doesn't.

I've therefore created this site to provide a resource for learning about what works, and what doesn't, when building a web application.

## I'm not using Laravel/PHP. Is this site still of use to me?

Yes. The dedicated subject of this site is website performance, and it's a *very* broad topic.

* Some articles cover the subject of server configuration, and how it can affect performance. In many cases, these are framework agnostic, and possibly language agnostic - for instance, tips on speeding up PHP-FPM with Nginx would apply to an application built with any other PHP framework, and tips on speeding up Nginx would apply to a Django application.
* Other articles cover a technical concept, and how it relates to performance. In these cases, it should be possible to apply it to a different framework. For instance, using eager loading to avoid N+1 queries is a generic solution that isn't tied to any one framework.
* Some articles also covers writing more efficient relational database queries. In these cases, the underlying concept is applicable to any application using that relational database, though the syntax for the query builder might differ.
* Front end techniques aren't really dependent on Laravel itself (though the articles might be *somewhat* biased towards build tools and libraries that are popular within the Laravel community).

In short, then, this site will still be of use to you. It's just written *from the perspective of a Laravel developer*, and so applying some of the techniques demonstrated on this site to a different framework or language might require some additional work.

## Some of the advice I've seen on here is really simplistic...

Yes, *some* of it is simplistic, but it has to cater to developers with differing levels of experience, and a big part of it is disspelling myths about performance that more experienced developers know about.

Be assured, there will likely be some other articles that will be of use to you.

## This has been useful to me. What other resources do you recommend?

This site is intended to be a fairly high-level resource for learning how to get the best performance out of your Laravel applications. As such, it's not intended to be exhaustive, but rather a place to start.

If you've found the resources on this site to be useful and would like to know more, here are some other resources I've found useful in the past:

### [SQL For Devs](https://sqlfordevs.com/)

This is a great resource for learning a number of techniques for optimising your database queries. It covers a range of topics, including:

* Using newer database functionality to help write more efficient queries
* Creating more useful indexes on your tables

I've picked up some very useful tips from this site, and it's well worth bookmarking for future reference.

### [Visual Explain for MySQL](https://mysqlexplain.com/)

Made by the author of SQL For Devs, this is a great resource for examining your queries for potential optimisations.

### [Eloquent Performance Patterns](https://eloquent-course.reinink.ca/)

This video course is very good for helping you to do more with your database queries, while still benefiting from the power of Eloquent. If you're struggling to write more complex database queries with Eloquent, it's well worth getting your boss to pay for this. It's also available on [Laracasts](https://laracasts.com/series/eloquent-performance-patterns) if you have that.

### [Servers for Hackers](https://serversforhackers.com/)

This site is very good for learning about server configuration, and includes some great information on optimising your production servers.

### [Use the Index, Luke](https://use-the-index-luke.com/)

This is a bit old, but still a great resource for learning about how to create and use of indexes to speed up your queries.

## I've seen something that I think is incorrect...

Send me a message via the [contact form](/contact).
