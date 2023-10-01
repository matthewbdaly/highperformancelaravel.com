---
title: Queue what you can
description: Laravel's queue implementation can be very helpful for improving performance, but it's easy to miss many good use cases
date: "2023-10-01T14:21:04.837Z"
series: Writing efficient applications
featured_image_id: CrHG_ZYn1Dw
---

If you've made even a cursory exploration of the Laravel documentation, you've probably come across the message queue implementation. This is a really useful feature that allows you to move a long-running job out of the context of an HTTP request, and instead push it to a separate process. In cases where the user doesn't necessarily need to wait around for the job to finish, moving it to a message queue can make a big difference to application performance. There are also scaling advantages - as your application becomes larger, it may make sense to move as much functionality as possible off the web server, and queue jobs can often be handled by a separate server or a third-party service.

Unfortunately, there are a lot of possible use cases for the message queue that tend to get overlooked. The archetypal example of a use case for the message queue is sending an email, and in my experience many applications tend to use the queue for this and this only. Here are some other possible use cases for the message queue that may be overlooked.

## Processing uploaded files

If your application carries out any kind of processing of uploaded files, this is a great use case for the message queue. Depending on the file format, this can be a very lengthy task, and moving it out of the request context is sensible.

For instance, a legacy application that I work on runs FFMpeg on uploaded audio and video files to convert them into a consistent format, with WebM and MP3 options offered, even if the uploaded file is another format such as `.mov`. This application isn't written in Laravel, but if it were, using the message queue would make sense.

It may be that you need to notify the user when their files have finished processing, which might put you off the idea of moving the job to the queue. However, there are ways you can do it, such as web push notifications, and while these might be a bit harder than an initial failed AJAX request, it's probably worth it for speeding up the initial upload.

## Handling bulk data input

Along similar lines, if your application accepts some sort of bulk data input, such as syncing offline data, you should think about whether it's absolutely necessary to keep the sender waiting around for the data to be synced.

Instead, consider just validating the data, and then, if the validation passes, pushing the raw data to the queue and returning an HTTP 202 `Accepted` response. This tells the client that the data has been accepted, but not necessarily processed, and you can handle processing the data at an appropriate time via the queue.

Obviously this will be dependent on the particulars of your use case, but in many cases it's not vitally important that the data is updated immediately. For instance, if your application is storing some kind of log data, eventual consistency is more important than the data being received on a timely basis, and so it makes more sense to defer this kind of processing to a message queue.

## API calls and web hooks

If you're making calls to a third party API from within your application, this represents another potential use case for queues. The API might conceivably receive a lot of traffic at an inconvenient time, slowing your application down in turn. If you can defer the call to the API to a message queue, doing so can prevent that traffic from slowing down your user's experience. In addition, your request might be rate-limited, and if the job to make the API request is carried out by the queue, you can pick up on the HTTP headers that tell you when you can next make a request, and set the queue up to retry at that time. Also, if the API goes down, a queue natively has the facility to try again later, and failed queue jobs can be retried at a later time.

Along similar lines, calls to web hooks also represent a use case for message queues. If you're making a request to a web hook endpoint, you want to be able to handle failed requests in a way that allows for retrying later, as well as taking it out of the normal request flow to improve performance. The end result is not only better performance, but a more robust application that handles failures in the webhook better.

## Over to you

It's always worth making a point of considering, when working on some potentially performance-critical use case, whether it makes sense to move the job to the queue. With a bit of thought, it's often possible to move at least some of it to a message queue, and the performance improvements that are gained from this are often significant.
