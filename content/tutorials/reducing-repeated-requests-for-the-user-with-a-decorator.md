---
title: Reducing repeated requests for the user with a decorator
featured_image: img/ilya-pavlov-oqtafyt5ktw-unsplash.jpg
featured_image_username: Ilya Pavlov
description: If you're logged into your application, it may be making
  unnecessary repeated requests to fetch the user. Learn how to cache the user
  to eliminate this.
date: "2023-08-20T14:21:04.837Z"
series: Writing efficient applications
---

If your Laravel application requires login, then the auth middleware will typically be making a hidden query to get the user object for every request, which can slip under the radar unless you use a profiler to check what queries are running. This *can* be excessive, since the user object doesn't actually change that often, and if you're also frequently loading some related data, it may result in additional queries that need not happen on every request. If that's the case, it can be worth caching the user, and optionally any related data that also doesn't change often.

By using the decorator pattern, you can wrap the existing implementation of your user provider to cache the response. Because this implements the same interface as the user providers, it can work happily with the Eloquent or database providers, or a custom provider.

Assuming we only want to cache the `retrieveById()` method, the decorator class might look something like this:

```php
<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Cache\Repository;

final class UserProviderDecorator implements UserProvider
{
    /**
     * @var UserProvider
     */
    private $provider;

    /**
     * @var Repository
     */
    private $cache;

    public function __construct(UserProvider $provider, Repository $cache)
    {
        $this->provider = $provider;
        $this->cache = $cache;
    }

    /**
     * {@inheritDoc}
     */
    public function retrieveById($identifier)
    {
        return $this->cache->remember('id-' . $identifier, 60, function () use ($identifier) {
            return $this->provider->retrieveById($identifier);
        });
    }

    /**
     * {@inheritDoc}
     */
    public function retrieveByToken($identifier, $token)
    {
        return $this->provider->retrieveById($identifier, $token);
    }

    /**
     * {@inheritDoc}
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
        return $this->provider->updateRememberToken($user, $token);
    }

    /**
     * {@inheritDoc}
     */
    public function retrieveByCredentials(array $credentials)
    {
        return $this->provider->retrieveByCredentials($credentials);
    }

    /**
     * {@inheritDoc}
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        return $this->provider->validateCredentials($user, $credentials);
    }
}
```

It implements the same interface as the user providers, but accepts two arguments in the constructor, which are injected and stored as properties:

* Another instance of `Illuminate\Contracts\Auth\UserProvider`
* An instance of the cache repository `Illuminate\Contracts\Cache\Repository`

Most of the methods just defer to their counterparts on the wrapped instance - in this example I have cached the response to `retrieveById()` only, but you can add caching to the other methods easily enough if need be. You do of course still need to flush the cache at appropriate times, which is out of scope for this example, but that can be handled by model events as appropriate - you can flush the user's data from the cache when the `updated` event on the user model is triggered.

Please note that the exact method you use to cache the user may differ based on the cache backend you're using. If you're using a backend which supports tags, you may want to use those to implement caching, but that's not an option if you're using something like the file driver.

Then, you need to decorate the existing user provider with your decorator class, as follows:

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Contracts\Auth\UserProvider;
use Auth;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Cache\Repository;
use App\Auth\UserProviderDecorator;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::provider('cached', function ($app, array $config) {
            $provider = new EloquentUserProvider($app['hash'], $config['model']);
            $cache = $app->make(Repository::class);
            return new UserProviderDecorator($provider, $cache);
        });
    }
}
```

Finally, set up the config to use the caching provider:

```php
    'providers' => [
        'users' => [
            'driver' => 'cached',
            'model' => App\Eloquent\Models\User::class,
        ],
    ],
```

And now your application will be caching the user.
