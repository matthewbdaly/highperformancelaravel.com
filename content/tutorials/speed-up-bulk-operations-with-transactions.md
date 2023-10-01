---
title: Speed up bulk operations with transactions
description: Transactions are intended primarily to improve data integrity, but they can also improve performance when used appropriately
date: 2023-10-01 12:30:00
series: Faster database queries
featured_image_id: dBI_My696Rk
---

Using database transactions is a great idea when you have to perform a large number of operations on a database that form a logical unit. For instance, consider the following generic example of an e-commerce store that sells products:

```php
$order = Order::create([
    'user_id' => $user->id,
])
$cart->products->each(function ($product) use ($order) {
    $orderProduct = OrderProduct::create([
        'product_id' => $product->id,
        'quantity' => $product->quantity,
    ]);
    $order->products()->attach($orderProduct);
}
```

Here we assume that `$cart` is a collection containing data about the user's cart, and that `OrderProduct` is a model that represents a product within an order, mapping the product to the order and including a quantity field. This might be used at the checkout stage, when a user is purchasing the items in their shopping cart. If something were to go wrong at any point in this code, it might only add some of the products to the order, leaving the database in an inconsistent state. This would be a nightmare to deal with - the order might be dispatched with the failed items missing, leading to a messy complaint and the need to correct the data in the database. It might also necessitate arranging a refund through the payment gateway.

Far better to do something like this:

```php
DB::beginTransaction();
try {
    $order = Order::create([
        'user_id' => $user->id,
    ])
    $cart->products->each(function ($product) use ($order) {
        $orderProduct = OrderProduct::create([
            'product_id' => $product->id,
            'quantity' => $product->quantity,
        ]);
        $order->products()->attach($orderProduct);
    }
} catch (\Throwable $e) {
    DB::rollBack();
    throw $e;
}
DB::commit();
```

Now, if any error occurs, the transaction is rolled back and the database is left in a consistent state. The customer can be notified of the error, the order is not dispatched, and the payment can be refunded if necessary.

However, there's an additional advantage in terms of speed. At least by default, MySQL implicitly wraps any operation that amends the database in a transaction, and this inevitably adds considerable overhead to each of these operations, since it's at that point that the database checks the data is valid before committing it. In the above examples, we might create one row in `orders` and ten rows in `order_product`, resulting in a total of eleven transactions. By explicitly wrapping the whole thing in a single transaction, we remove those implicit transactions and replace them with a single one, significantly reducing the overhead.

The same applies in many other situations. For instance, I've worked on many applications which have a regular scheduled job (often daily or weekly) that runs a large bulk update operation. This typically pulls in some data from a source such as a third party API or some text files, and carries out a large number of `INSERT`, `UPDATE`, or `DELETE` operations in sequence. This is another situation where if something went wrong, we would want to abandon the operation, roll back the changes to leave the application in the last known working state, and notify someone (typically the site maintainer), but also one where using transactions offers a significant performance improvement. For particularly large operations, the difference can be significant too - I maintain an application with an overnight importer like this that takes a couple of hours to run, and without using transactions it would take considerably longer. I've also noticed significant improvements when populating a database during tests - in one case going from taking about 30 seconds to below 10 seconds, just by wrapping it in a transaction.
