---
title: "Improve apparent performance by deferring the response"
description: Sometimes it's as useful to get back to the user quickly as it is to actually make something performant.
date: "2025-02-18T12:00:00.837Z"
series: Writing efficient applications
featured_image_id: WCUQImjKO1s
---

For some use cases, dealing with a particular request doesn't actually require everything to be completed by the time you return a response. You can in theory defer those actions which don't absolutely need to be completed in the context of that request, and handle them through other means. For instance, if you receive a request to register with a service, it's often perfectly acceptable to just validate the input to make sure the provided details are valid, and then defer creating the new user and sending a confirmation email until after the response has been sent.

[Using the message queue](/tutorials/series/writing-efficient-applications/queue-what-you-can/) is generally the best way to handle these sorts of situations. However, this can be overkill for some use cases, and if your application is running in an environment where you aren't able to use one of the supported queue drivers, you may have no choice but to look elsewhere.

Fortunately Laravel 11 introduced the [Concurrency facade](https://laravel.com/docs/11.x/concurrency). This provides a way for you to call an action, while deferring its actual execution until after a response has been sent.

Consider this example for a form to allow users to register for an event:

```php
use App\Http\Requests\CreateRegistrationRequest;
use App\Mail\SendRegistrationEmail;
use App\Models\Registration;

public function __invoke(CreateRegistrationRequest $request)
{
    Registration::create($request->input('email'));
    Mail::to($request->input('email'))->send(new SendRegistrationEmail());
    return response()->json([], 200);
}
```

Note here that we don't actually need to wait for anything to be created before we send a response. We don't do anything with the `Registration` instance, nor do we need to wait for the email to have been sent (assume here we're using a third party mail service like Mailgun which will retry failed send attempts for us). As such, we can instead do the following:

```php
use App\Http\Requests\CreateRegistrationRequest;
use App\Mail\SendRegistrationEmail;
use App\Models\Registration;
use Illuminate\Support\Facades\Concurrency;

public function __invoke(CreateRegistrationRequest $request)
{
    Concurrency::defer([
        fn () => Registration::create($request->input('email')),
        fn () => Mail::to($request->input('email'))->send(new SendRegistrationEmail()),
    ]);
    return response()->json([], 202);
}
```

Here we use the `Concurrency` facade's `defer()` method to defer these actions until after the response has been sent. That way, the user isn't kept waiting around for these actions to complete - instead, they get an HTTP response sent first, then the deferred actions are carried out. This works by using a hidden Artisan command which actually executes the deferred closures.

<Info>
  If a particular route accepts some data, but doesn't immediately process it, it's a really good practice to return an HTTP status code of `202`, or `Accepted`, as shown here. This tells the client that the data has been accepted and will be processed asynchronously, so it won't necessarily have been processed yet.
</Info>

There are three drivers for this:

* `process` is the default, and you probably want to stick with this most of the time
* `fork` offers improved performance, but needs `spatie/fork` to be installed, and can only be used in the CLI context
* `sync` is primarily useful for testing purposes where concurrency would be problematic, and disables all concurrency, simply executing the deferred closures in sequence

Potential use cases for this include:

* Writing data that has already been validated to the database
* Recording metrics data
* Sending emails, push notifications or other asynchronous message formats
* Making requests to third party APIs where the user doesn't need to wait around for a response, such as a CRM

This approach isn't as robust as using a queue, since it doesn't allow for retrying failed jobs in the same way, but it can be a useful alternative in some cases. Also, if you're using a third party provider to send messages, you may not necessarily benefit from using a queue since these often implement some form of retry functionality themselves.

Bear in mind, however, that if you're going to process some data after you've already finished handling the request, you need to make sure you've validated it *really* thoroughly. If you send a response before processing the data, and it turns out there's a problem with it, you've got no easy way to inform the client that there's a problem.
