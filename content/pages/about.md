---
title: About this site
description: We help you identify and resolve performance issues with your Laravel project
---

### What is this site about?

Everyone wants their web application to be performant. But there's a lot of myths, misconceptions, outdated advice and general misinformation around about this, and it's only once you have some experience under your belt that you can sort what really works from what doesn't.

I've therefore created this site to provide a resource for learning about what works, and what doesn't, when building a web application.

### I'm not using Laravel/PHP. Is this site still of use to me?

Yes. The dedicated subject of this site is website performance, and it's a *very* broad topic.

* Some articles cover the subject of server configuration, and how it can affect performance. In many cases, these are framework agnostic, and possibly language agnostic - for instance, tips on speeding up PHP-FPM with Nginx would apply to an application built with any other PHP framework, and tips on speeding up Nginx would apply to a Django application.
* Other articles cover a technical concept, and how it relates to performance. In these cases, it should be possible to apply it to a different framework. For instance, using eager loading to avoid N+1 queries is a generic solution that isn't tied to any one framework.
* Some articles also covers writing more efficient relational database queries. In these cases, the underlying concept is applicable to any application using that relational database, though the syntax for the query builder might differ.
* Front end techniques aren't really dependent on Laravel itself (though the articles might be *somewhat* biased towards build tools and libraries that are popular within the Laravel community).

In short, then, this site will still be of use to you. It's just written *from the perspective of a Laravel developer*, and so applying some of the techniques demonstrated on this site to a different framework or language might require some additional work.

### Some of the advice I've seen on here is really simplistic...

Yes, *some* of it is simplistic, but it has to cater to developers with differing levels of experience, and a big part of it is disspelling myths about performance that more experienced developers know about.

Be assured, there will likely be some other articles that will be of use to you.

### I've seen something that I think is incorrect...

Send me a message via the [contact form](/contact).
