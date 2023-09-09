---
title: Pick your Javascript libraries carefully
description: You can't just assume you need jQuery all the time, and if you
  don't, you can save a lot of bandwidth.
date: "2023-08-26T14:21:04.837Z"
series: Front end
featured_image: "img/greg-rakozy-vw3Ahg4x1tY-unsplash.jpg"
featured_image_username: 'Greg Rakozy'
featured_image_id: vw3Ahg4x1tY
---

Javascript assets are an often-overlooked source of slow websites. Because these days our connections are generally faster, our web browsers are noticeable more efficient at executing Javascript, and we expect more from our websites, we're often more tolerant of large blobs of Javascript code than we should be. But we should bear in mind that that's not always the case for our users - some may be on their phones, possibly using shaky mobile connections while travelling, while others may be using shared connections in libraries, or from a rural village with a very poor broadband connection. As such, we need to think hard before we start pulling in additional Javascript libraries, particularly if they might not be absolutely necessary.

jQuery is a good example of something that was once almost mandatory, but is now largely redundant. Now that Internet Explorer is a relic of the past, and all the currently maintained browsers are updated frequently, manipulating the DOM without the need for a library like jQuery is a much more viable prospect. But if you're maintaining a project that still uses jQuery, it can be troublesome to deal with. Plenty of older code still uses the deprecated methods from older versions, meaning you can't update without also pulling in jQuery Migrate to provide those methods, making your Javascript bundle significantly larger.

This is further complicated by the whole jQuery plugin ecosystem. It's sorely tempting to keep pulling in an off-the-shelf plugin every time you add some new functionality, but doing that can cause your bundle size to snowball, far more than implementing the functionality yourself. The quality of jQuery plugins can be highly variable, with plenty being bloated messes that cause a lot of problems. Some may still be using legacy methods, making them reliant on not just jQuery, but jQuery Migrate too, further bloating the bundle. And if you're using React or Vue alongside jQuery in your project (often the case for legacy applications), trying to integrate the plugin with them can be a nightmare - plenty of plugins don't clear up after themselves properly, messing up the DOM in the process.

If you need something to manipulate the DOM, but the project isn't complex enough to merit considering something like React.js or Vue.js, consider using Alpine.js, which has a similar declarative style to Vue, but is a fraction of the size and can be more easily applied when you only need a little interactivity. If you need a way to make AJAX requests and can't rely on the presence of the `fetch()` function, consider using Axios. These two libraries, together, are only a *fifth* the size of jQuery, but can do the overwhelming majority of what it can.

Yes, concatenating and minifying the assets using something like Vite or Laravel Mix helps, as does caching and gzipping them (and you should be doing all of those as a matter of course), but if you don't absolutely need a particular library, it's still better not to have it. As well as the bandwidth required to download it, it also takes time to run, and it's another asset you have to keep updating, with all the work that entails when breaking changes inevitably happen. Sometimes you *will* come under pressure to add all manner of third-party Javascript widgets to your application, or to compromise between development time and performance, and when that happens you may want to push back, or make sure that the other stakeholders understand the tradeoffs involved.
