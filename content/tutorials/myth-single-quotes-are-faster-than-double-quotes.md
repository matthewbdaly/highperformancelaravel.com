---
title: "Myth: Single quotes are faster than double quotes"
description: A persistent myth holds that the choice of single quotes is more performant than double quotes. This is nonsense.
date: "2023-10-17T20:00:00.837Z"
series: Myth Busters
featured_image_id: rrfdqjJWwmU
---

This is probably the very worst myth of the lot. It's been roundly disproved over and over again, yet it still gets parroted all the time. A more thorough understanding of how the PHP runtime works demonstrates that this is patently nonsensical.

## How does the PHP runtime work?

When a PHP script runs, there are two main phases. First of all, the PHP compiler compiles the script to bytecode. This is broken into three sub-phases:

* Tokenization
* Parsing
* Compilation into bytecode

Next, the PHP interpreter executes the compiled bytecode. So, what gets executed by the PHP interpreter itself isn't actually the PHP code itself, but rather the bytecode created by the compiler.

As such, by the time the bytecode gets executed, it's already been through the tokenization step, which is the *only* place where there is any difference at all between single and double quotes. Any actual difference in the execution speed of the tokenization step is only going to become apparent in artificial benchmarks that work with absurdly large strings. 

Over a decade ago, Nikita Popov [wrote an article dispelling this idea](https://www.npopov.com/2012/01/09/Disproving-the-Single-Quotes-Performance-Myth.html). Nikita has done more work on the internals of PHP than just about anyone else on the planet, so he's better placed than anyone else alive to say conclusively whether this matters or not. And that was written *before* the opcode cache became available by default in PHP 5.5.

Just for fun, I tried running Nikita's benchmark script for the compile step from the above link, with the following results:

```bash
php benchmark.php 
Single quotes: 0.036855936050415 seconds
Double quotes: 0.029114961624146 seconds
```

As you can see, the figure for double quotes was actually *slightly* faster than the figure for single quotes. Now, bear in mind that the performance of the PHP runtime has changed a *lot* in the decade and a bit since that post was written, and many things are far more performant than they were, not to mention the improvements in the hardware I'm using (in addition to the usual improvements in hardware of over a decade, my Mac Mini uses Apple silicon, which is noticeably faster at some tasks). However, this benchmark is very artificial and doesn't reflect real-world performance, and the numbers are marginal enough that they really don't make enough difference to be worth worrying about. And running the benchmark as a command line script means that the opcode cache won't be a factor.

## What was that about the opcode cache?

The opcode cache, when enabled, means that the compiled bytecode is cached for future use. Since, as noted above, the only place strings created using single and double quotes differ at all is in the tokenization step, then once the bytecode has been cached, there is no *possible* difference in performance after a file has been compiled to bytecode, since two otherwise identical strings that use single and double quotes end up as identical bytecode.

The only times where it may not make sense to use the opcode cache (apart from when executing commands directly from the CLI) is in a shared hosting environment where it's typically not available. This, along with other issues, including the [support for .htaccess](/tutorials/series/server-configuration/disable-htaccess-for-faster-performance), is a good reason to give shared hosting a wide berth if you care about application performance.

In short, the choice of single or double quotes almost certainly isn't a factor in the speed of your application, and can't possibly be if you're using the opcode cache (which you should be).
