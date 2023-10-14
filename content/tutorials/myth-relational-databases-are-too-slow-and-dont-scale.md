---
title: "Myth: Relational databases are too slow and don't scale"
description: Relational databases are a good fit for most use cases, but there are some gotchas to be aware of when using them.
date: 2023-09-19T21:30:00.837Z
series: Myth Busters
featured_image_id: GNyjCePVRs8
---

There seems to be a persistent belief that relational databases (and often MySQL in particular) are too slow for most use cases, and don't scale. However, this is a huge misconception. In reality, MySQL is fast enough for the overwhelming majority of applications you may want to build, and it's unlikely scalability will be an issue.

## Your application probably isn't big enough for database scalability to be an issue

A lot of this misconception comes from the large number of articles, blog posts and other content that has been written by or about developers working on high profile applications with *extremely* large datasets that are too big to easily fit into a relational database, and talk about the hoops they have to jump through to work with this data. This might be by partitioning the data, or moving it to some other kind of data store that sacrifices one of the advantages of a relational database to make it easier to distribute the data in some way. This gives the impression that this is a very common problem that crops up in many, many cases, leading inexperienced developers wondering whether a relational database is the right way to go.

The trouble is that these applications are *very* much in the minority, and the needs of those applications are very different from the needs of most applications. As a result, the kind of tradeoffs that make sense for these applications are very often different too. For an organisation the size of, say, Facebook, the dataset involved is truly colossal, and it requires the data to be spread across a huge number of servers. As such, the ability to more easily spread that dataset across multiple servers is more important than the ability to ensure the integrity of that data at database level. Facebook can afford to add additional checks at application level to ensure the integrity of the data, as a tradeoff to enable moving to a non-relational data store that has fewer inherent checks on the data.

By contrast, the overwhelming majority of applications will never get *anywhere* near the sort of scale where they need to worry about this kind of issue. It's likely the dataset is small enough that you can still get a server with enough RAM to hold the entire dataset in memory, and so with some relatively straightforward adjustments to your database schema and some tweaks to the database configuration, you should be able to maintain good performance without issue for a good long while yet. Usually, the kind of steps involved in scaling a web application are as follows (and not necessarily in any particular order):

* Move the database from the application server to its own server
* Increase the specifications of the database server (vertical scaling)
* Optimizing the existing application queries as far as possible. This might include adding appropriate indexes, or adjusting the settings
* Add a load balancer, and one or more additional web servers

It's only once you've exhausted these options that you need to start thinking about scaling the database, and this is very much a "nice problem to have". At that point, by definition, you have a lot of users, and probably a reliable income to fund the work. As such, it's going to be a worthwhile proposition to explore other options, such as denormalizing the database, partitioning the data, or moving some of the data to a different data store. However, the tradeoffs that make sense at that point are very, very different to those in the early stages of your application's lifetime. In addition, every application that gets to this stage will have slightly different requirements, and the issues that prove to be the biggest blocker to scaling the application will be different for every application, and it's very hard to judge ahead of time which parts of it will cause issues. Avoiding a relational database for reasons of scalability is therefore usually a *very* premature optimization, and one that necessitates a lot of additional work that will likely never pay for itself.

## Relational databases are a good fit for most use cases

You may sometimes get the impression from articles and other sources that relational databases aren't a very good fit for a lot of use cases. However, the fact is that the relational model is widely applicable, and a good fit for most use cases, once you know how to design the database structure appropriately.

In addition, the tools and other resources for working with and optimizing relational databases are extremely mature, and the support for them at framework and language level is generally very strong. As such, a relational database is a solid, reliable choice most of the time.

There are some use cases where a non-relational database might be a better fit, but this is generally for quite specific use cases where the tradeoffs that make sense are different. For instance:

* Logging data, where the integrity of the data is less critical
* Short-term storage of data for caching purposes, where key-value stores such as Redis or Memcached are a better fit
* Searching data, where a data store optimized for full-text search, such as Elasticsearch, is a better fit

However, it's still likely in these cases that only a small part of the data will be a good fit for a non-relational database. For that reason, it's quite common to see a polyglot approach where the majority of the data is stored in a relational database, with other data stores used for other data. Perhaps MySQL might be used for the majority of the data, but with Redis used for caching, and Elasticsearch used to log analytics and store data for search purposes.

I personally have struggled to find very many use cases where a relational database doesn't make sense during my career. So far, this has generally been limited to:

* Sites where the real storage is done by a third-party API, and at most only a simple key-value store is required to store data temporarily
* Sites where the content is fairly static and it makes sense to record it as Markdown documents rather than implement some kind of CMS
* Search indexes in Elasticsearch
* Before JSON fields became commonplace in relational databases, I worked on an application which used MongoDB to store logged data with an inconsistent schema

The last of these is no longer an issue, and the second from last is dependent on whether your application needs search functionality at all, and whether MySQL's native full text search capabilities would be sufficient.

## Many of the reasons for the belief that MySQL is slow are no longer valid

In its earlier years, the default storage engine for MySQL was MyISAM, which lacks features like transactions and foreign keys. These features can make a significant difference to application performance when used correctly - wrapping writes in a transaction can significantly improve performance, and the absence of foreign keys made `JOIN` operations slower.

Nowadays, the default storage engine is InnoDB, which does have these features. As such, any new applications that use MySQL will not suffer from these issues to the same extent, unless you explicitly use MyISAM instead of InnoDB. There are some use cases where MyISAM will be a better choice than InnoDB, but these are very firmly in the minority, and tend to be quite particular.

In addition, I suspect that much of this comes from developers who learned MySQL first being less likely to have a formal education in relational database design. The LAMP stack is generally a good choice for self-taught developers who figured out relational databases on a fairly ad-hoc basis, meaning there may be gaps in their theoretical knowledge. By contrast, those who came up through a more academic route may well have had at least some exposure to other databases, and may also have a stronger background in such formal concepts as normal form. If you're a developer who has never had any formal training in relational database design, it can be very worthwhile to consider whether you would benefit from this kind of training. Certification might be excessive, but getting a book or video course is an inexpensive way of fixing knowledge gaps that may lead to performance issues in your applications.

In general, as long as you can plan out a solid database design, and add appropriate indexes, MySQL will be a good choice for most use cases, and it's unlikely that scalability will be an issue.
