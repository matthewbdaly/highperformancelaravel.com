---
title: Don't forget deployment optimisations
description: If you're not deploying your application correctly, its performance will suffer.
date: "2024-07-15T21:00:00.837Z"
series: Server configuration
featured_image_id: GqJIdD476nM
---

When deploying a Laravel application to a production environment, there are certain steps you should take which optimise the performance of your application in several different ways. If you don't run these, the performance of your application will be noticeably impaired.

In general, running the following command is sufficient:

```bash
php artisan optimize
```

This runs all of the recommended optimisation steps, and is usually the most convenient way to do this. However, it's useful to understand the underlying steps this runs. I'll therefore go through these in detail.

## Cache

You can cache the configuration values with the following command:

```bash
php artisan config:cache
```

This evaluates all values in the `config/` folder and caches them in `bootstrap/cache/config.php`, so that rather than re-fetching them from places like environment variables via DotEnv, they're already stored in the cache.

Please note that you can't use the `env()` command outside of the `config/` folder if you do this. It's possible to use a tool like PHP Codesniffer with the forbidden functions rule to prevent that function being used in the specificied folders.

This also enables you to make certain quality of life improvements to your application by allowing you to calculate configuration values in a way that makes them easier to understand, and cache the results, rather than expressing them as a figure. For instance, today I worked on an application where I needed to change the time before a password reset expires to two weeks. It had the following set for the expiry time:

```php
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 10080 // Expires in 7 days
            'throttle' => 60,
        ],
    ],
```

This value is right, but it's not clear what it's meant to represent. Now, contrast it with this:

```php
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60 * 24 * 14 // Expires in 14 days
            'throttle' => 60,
        ],
    ],
```

This is much more readable and makes it easier to understand and debug, since we can clearly see it's 60 minutes, times 24 hours, times 14 days. Now, if we run `php artisan config:cache` then we can see the following in `bootstrap/cache/config.php`:

```php
    array (
      'users' => 
      array (
        'provider' => 'users',
        'table' => 'password_resets',
        'expire' => 20160,
        'throttle' => 60,
      ),
    ),
```

So the value has been calculated once and cached until such time as the next deployment. This trick is a convenient way of making many configuration values more readable and easier to understand, and as long as your deployment process carries out all the right steps, it won't be detrimental to your application's performance.

## Events

These days Laravel will generally auto-discover your events and listeners as long as they're in the right folders. However, in production you'll want to optimise that rather than rely on auto-discovery. You can do this with the following command:

```bash
php artisan event:cache
```

This will precompile the mapping of events and listeners for you.

## Routes

To precompile all of your application's routes into a single method call in a cached file, you can run the following command:

```bash
php artisan route:cache
```

This may seem trivial for a small application, but it becomes more and more significant as your application gets larger.

## Views

To precompile all of your application's views from Blade templates into PHP files, you can run the following command:

```bash
php artisan view:cache
```

### Summary

You don't really need to worry about the lower level commands for the most part. Just be sure to run `php artisan optimize` during your deployment process, and you're on the right track. Sometimes it's useful to be able to understand the lower level commands, though.
