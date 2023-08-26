---
title: Reducing unnecessary dependencies in controllers
featured_image: "img/hal-gatewood-tZc3vjPCk-Q-unsplash.jpg"
featured_image_username: Hal Gatewood
description: Any dependencies in a controller can potentially slow down the
  response time. By managing them effectively, you can reduce their impact.
date: "2023-08-26T14:21:04.837Z"
series: Writing efficient applications
---

Suppose you have a Laravel controller that looks something like this:

```php
<?php

namespace App\Http\Controllers;

use App\Contracts\Services\FooService;
use Illuminate\Http\Request;

class FooController extends Controller
{
    public function __construct(private FooService $service)
    {
    }

    public function show()
    {
        return view('show');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
        $this->service->process($request);
        return view('confirm');
    }
}
```

This is a fairly typical example of a partial resource-based controller that defines two routes, one for rendering the form for something, and the other for handling the submission to that form. One potential performance hit, however, is that the `show()` route doesn't require the dependency, but it still gets resolved each time it's loaded, increasing the response time.

There are multiple ways we can resolve this. We can extract the `update()` method into a separate controller, possibly a single-action invokable controller, as in this example:

```php 
<?php

namespace App\Http\Controllers;

use App\Contracts\Services\FooService;
use Illuminate\Http\Request;

class FooUpdateController extends Controller
{
    public function __construct(private FooService $service)
    {
    }

    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
        $this->service->process($request);
        return view('confirm');
    }
}
```

Then, we can simplify the original controller to remove the unnecessary dependency:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FooController extends Controller
{
    public function __invoke()
    {
        return view('show');
    }
}
```

This resolves the issue, but has the disadvantage that two related routes are no longer grouped together in the same controller. For this reason, it may be better suited to cases where the functionality of the two methods is less closely related.

Alternatively, we can replace constructor injection with method injection to ensure that it's only injected for the method that needs it:

```php
<?php

namespace App\Http\Controllers;

use App\Contracts\Services\FooService;
use Illuminate\Http\Request;

class FooController extends Controller
{
    public function show()
    {
        return view('show');
    }

    public function update(Request $request, FooService $service)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
        $service->process($request);
        return view('confirm');
    }
}
```

For some dependencies, there's another option - [deferred providers](https://laravel.com/docs/9.x/providers#deferred-providers). By having the service provider which defines the dependency implement the interface `DeferredProvider` and the `provides()` method, you can ensure that the service in question is only resolved when it's actually called on. You might do so as follows:

```php
<?php
 
namespace App\Providers;
 
use App\Contracts\Services\FooService;
use App\Services\Foo;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;
 
class FooServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(FooService:::class, function ($app) {
            return new Foo();
        });
    }
 
    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [FooService::class];
    }
}
```

Many of Laravel's existing services already implement `DeferrableProvider`, and so you don't need to worry about optimising them. For instance, you can resolve `Illuminate\Contracts\Mail\Mailer` and will get a deferred instance, so you can write something like this without worrying about the overhead of pulling in the mailer dependency:

```php
<?php

namespace App\Http\Controllers;

use App\Mail\UpdateReceived;
use Illuminate\Http\Request;
use App\Contracts\Services\FooService;

class FooController extends Controller
{
    public function __construct(private MailerContract $mailer)
    {
    }

    public function show()
    {
        return view('show');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
        $this->mailer->to($request->user())
            ->queue(new UpdateReceived($request->user()));
        return view('confirm');
    }
}
```
