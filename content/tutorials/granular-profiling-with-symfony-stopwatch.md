---
title: "Granular profiling with Symfony Stopwatch"
description: It's not always easy to profile each step of a loop for long running tasks, but Symfony Stopwatch provides a way to do so fairly easily.
date: "2024-09-01T19:00:00.837Z"
series: Writing efficient applications
featured_image_id: VwqMTcsb0Tg
---

Sometimes, existing profiling tools may not provide enough granularity out of the box. Tools like Clockwork or Laravel Debug Bar are great at giving details about how long a database query takes, but they're less good at profiling, say, how long each loop in a `foreach` statement takes, at least without some help.

For this use case, I've found Symfony Stopwatch to be the best option. It allows you to start a timer and report the time elapsed so far at any point in a way that's simple and intuitive. Using it gives you concrete figures for how long something takes, so you can see clearly when a change you make improves performance.

## How do I use it?

You can add it to your project as a `dev` dependency as follows:

```bash
$ composer require --dev symfony/stopwatch
```

Then, you can create a `Stopwatch` instance like so:

```php
<?php

use Symfony\Component\Stopwatch\Stopwatch;

$stopwatch = new Stopwatch();
```

Now, say you're using it to test the performance of an Artisan console task that loops through items in a CSV file. You might do something like this:

```php
$stopwatch->start('Data import');
$reader = Reader::createFromPath('file.csv', 'r');
$records = $reader->getRecords();
foreach ($records as $offset => $record) {
  // Do thing with record...
  $event = $stopwatch->lap('Record ' . $offset);
  $this->info($event->getDuration() . ' ms');
}
$this->info('Finished after ' . $stopwatch->stop('Data import')->getDuration() . ' ms');
```

Here we're using the `lap()` method to report the time elapsed so far in each iteration of the loop, and then the `stop()` method to stop the timer at the end of the loop. Then we're using the Artisan `info()` method to print the total time elapsed.

This approach works well for Artisan tasks where you're interested in seeing how long each iteration takes, but for tasks triggered by HTTP requests you'd need to take a slightly different approach. One possibility is to use your existing profiler's helper to report the time elapsed provided by Symfony Stopwatch, as in this example using the `clock()` helper for Clockwork:

```php
$stopwatch->start('Data import');
$reader = Reader::createFromPath('file.csv', 'r');
$records = $reader->getRecords();
foreach ($records as $offset => $record) {
  // Do thing with record...
  $event = $stopwatch->lap('Record ' . $offset);
  clock($event->getDuration() . ' ms');
}
clock('Finished after ' . $stopwatch->stop('Data import')->getDuration() . ' ms');
```

Alternatively, you can use the logger to record this data. If you had a bottleneck you're struggling to reproduce in development and have no choice but to leave the profiling on in production in order to see it there, that may be a good way to do it, particularly if you configure it to log to a chat service like Slack or Microsoft Teams. As for this use case you probably want all the information in one place, an approach like this, where we get all the loops at once, is probably better:

```php
$stopwatch->start('Data import');
$reader = Reader::createFromPath('file.csv', 'r');
$records = $reader->getRecords();
foreach ($records as $offset => $record) {
  // Do thing with record...
  $stopwatch->lap('Record ' . $offset);
}
$event = $stopwatch->stop('Data import');
Log::critical('Import completed', [
  'data' => Arr::map($event->getPeriods(), fn ($period) => $period->getDuration()),
]);
```

Whichever approach you choose, the Symfony Stopwatch component is a powerful tool for examining the performance of specific parts of your application that isn't dependent on any specific profiling tool, but can be easily integrated with them.
