---
title: "Myth: Performance is a matter of choosing the right framework"
description: Performance benchmarks may seem a useful guide when picking a
  framework to develop your application in, but they need to be taken with a
  pinch of salt.
date: "2023-08-26T14:21:04.837Z"
series: Myth Busters
featured_image_id: hpjSkU2UYSU
---

Oh dear, this is a biggie. Go through the PHP or Laravel subreddits on any given day and it's only a matter of time before you come across one claiming you shouldn't use Laravel because it's too slow. Often it'll cite a set of benchmarks that show Laravel as being the slowest.

The trouble is that benchmarks aren't actually representative of how your application is likely to perform in a production environment. Performance is a highly nuanced topic, and a naive approach can lead to you spending a lot of time trying to optimize the performance of something that doesn't help much anyway. Here are some things to bear in mind:

## You're not building a Hello World application

A relatively simple application that does nothing more than render a simple flat HTML message on one route doesn't exactly use much of the application. A full-stack framework like Laravel loads a number of additional requirements by default such as:

* A database connection
* A cache instance
* An authentication system
* Multiple layers of middleware

Even if these aren't being used in a Hello World application, they still add weight unless explicitly removed. As such, it's not surprising that a full-stack framework like Laravel is slower out of the box than a smaller one like Slim. And if you use a lighter framework, you'll likely need to add these things anyway, slowing the site down again.

## The framework is only a starting point

Unless your application genuinely is a Hello World application, you're probably going to be adding functionality to it. You may be adding new functionality via additional packages, or writing your own functionality, and all of that adds weight too.

Once your application is feature complete, it's likely the actual bottlenecks that occur are in the following places:

* The database, eg slow, badly written queries, bad structure, poorly designed or missing indexes
* Longer running operations that should be pushed to a message queue, eg sending emails
* Inadequately cached HTTP responses

## Most benchmarks don't optimize every framework correctly

When the maintainers of a given framework benchmark that framework against its competitors, they'll inevitably have a good idea of how to optimize their framework for production, but they won't necessarily know how to do the same thing for the other frameworks they're benchmarking. As such, those benchmarks may be misleading.

## A framework isn't an application

A PHP framework like Laravel is a very different beast from an off-the-shelf application such as WordPress. Rather than giving you an existing application you can customize, it gives you the components to build an application. It's less opinionated about how that application works, so there are many different ways different developers might build the same application. As such, the performance of the resulting application is highly dependent on the skill and experience of the developer - a skilled, experienced developer might produce a highly performant application for a brief, while a less experienced developer might produce one which performs poorly, even if they're using the same framework. I myself maintain a large legacy application that was originally built by an inexperienced developer and has some serious performance issues due to a suboptimal database schema which I haven't yet been able to refactor away.

## "High performance" frameworks don't necessarily optimize the actual bottlenecks in your application

Some frameworks, like Phalcon, make a big deal of their strong performance in benchmarks. However, those figures aren't always helpful, because they don't *necessarily* optimize the right thing for your application.

Phalcon (and to a lesser extent something like Octane) epitomizes what I call *the tyranny of benchmarks*. Because the optimizations are in the language runtime itself, they improve the response time of a relatively simple "Hello world" application in which no database queries are actually carried out and the only significant bottlenecks are in the language runtime itself. However, they don't improve the performance of the actual bottlenecks in real-world applications, such as slow, inefficient queries, missing indexes, or inadequately cached HTTP responses. As such, making these changes may have only a minimal effect on performance, whereas fixing the *real* bottlenecks would make a much bigger difference, and doing so is likely to be much easier.

Phalcon (at least at the time of writing) is delivered as a C extension with a PHP API, rather than as PHP files. This means that the framework components themselves are implemented in Zephir (a language that compiles to C), rather than PHP. In production, this optimizes the speed of those components, so, for instance, the ORM will process the query and pass it to MySQL quicker than an equivalent ORM written in PHP. However, it won't make the query itself any faster. As such, if your query is suboptimal in the first place, rewriting your application in Phalcon won't help with the response time of the query itself, and if that's the bottleneck in your application, then you'll have put in a lot of effort for nothing. Similarly, if your application is returning large responses without making good use of HTTP caching while using Phalcon will optimize the speed of the response, it won't help with the fact that if you made better use of HTTP caching, you wouldn't necessarily need to return anything at all in the response body, since a 304 Not Modified response would tell the browser that nothing had changed. And if you have a read-heavy application where the response doesn't change too often, placing an HTTP caching server like Varnish in front of your web server would probably result in a larger performance improvement anyway, for *far* less work.
