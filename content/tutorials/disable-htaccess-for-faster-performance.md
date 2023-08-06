---
title: Disable htaccess for faster performance
featured_image: img/charlesdeluvio-lks7vei-eag-unsplash.jpg
featured_image_username: charlesdeluvio
description: If you're using Apache as your web server, the htaccess file can be
  a significant performance bottleneck, and often an unnecessary one.
date: "29-10-2022 11:25:28"
series: Server configuration
---

If you have a Laravel application in production that either has an `.htaccess` file in the `public/` folder, or is even just running with `.htaccess` enabled, your site is not only performing suboptimally, but is likely to be more vulnerable to security issues than it would be otherwise. You should seriously consider disabling it, particularly if your site is experiencing any kind of issues with performance, and move any configuration into your Apache virtualhost configuration file.

The ability to override Apache virtualhost configuration is redundant if your application is hosted on a virtual private server, and comes with serious downsides in terms of both application performance and security. Leaving it active when not absolutely necessary is a downright sloppy practice. Do yourself and your website a favour, and disable it now.

## Why htaccess is still widely used

In the early days of the web, most web hosting environments were shared hosting where one server hosted a number of sites, and the hosting company needed to provide a way for different customers to allow individual users to override the server settings without affecting other sites. As such, `.htaccess` became a popular way to do this, and many of the frameworks and applications that date from this time period, such as WordPress and CodeIgniter, expected this by default. Similarly, developers got used to having this option available by default.

Now, things have changed. The easy availability of virtual private servers means you can easily spin up a server with the exact setup you need, with root access freely available. In an environment like this, it doesn't make sense to use `.htaccess`, because every single setting it makes available can also be placed in a `<Directory>` directive inside an Apache virtualhost configuration file. Unfortunately, many of us developers have picked up bad habits, either from the early days of the web, or from working with platforms like WordPress which are still often used in a shared hosting environment, and continue to use them, even with a site hosted on a VPS.

## Why should I disable htaccess?

Enabling `.htaccess` has a serious effect on performance. When a request is made to a web server that has `.htaccess` enabled, it must check for an `.htaccess` file **at every directory** leading to that request. So, if you request the image `/foo/bar/baz.jpg`, it must check for `.htaccess` files in `/`, `/foo`, and `/foo/bar`, making that request take longer. The absence of an equivalent of `.htaccess` is a significant part of why Nginx often performs better than Apache.

Also, editing an Apache virtualhost configuration file requires root access, while editing `.htaccess` does not, making it more likely that if the site is compromised in some fashion, the attacker can do something horrible to your website, such as redirecting requests to something unsavoury.

Don't believe me? Here's what [the Apache documentation says on the subject](https://httpd.apache.org/docs/2.4/howto/htaccess.html#when):

> In general, you should only use .htaccess files when you don't have access to the main server configuration file. There is, for example, a common misconception that user authentication should always be done in .htaccess files, and, in more recent years, another misconception that mod_rewrite directives must go in .htaccess files. This is simply not the case. You can put user authentication configurations in the main server configuration, and this is, in fact, the preferred way to do things. Likewise, mod_rewrite directives work better, in many respects, in the main server configuration.
>
> .htaccess files should be used in a case where the content providers need to make configuration changes to the server on a per-directory basis, but do not have root access on the server system. In the event that the server administrator is not willing to make frequent configuration changes, it might be desirable to permit individual users to make these changes in .htaccess files for themselves. This is particularly true, for example, in cases where ISPs are hosting multiple user sites on a single machine, and want their users to be able to alter their configuration.
>
> However, in general, use of .htaccess files should be avoided when possible. Any configuration that you would consider putting in a .htaccess file, can just as effectively be made in a `<Directory>` section in your main server configuration file.
>
> There are two main reasons to avoid the use of .htaccess files.
>
> The first of these is performance. When AllowOverride is set to allow the use of .htaccess files, httpd will look in every directory for .htaccess files. Thus, permitting .htaccess files causes a performance hit, whether or not you actually even use them! Also, the .htaccess file is loaded every time a document is requested.
>
> Further note that httpd must look for .htaccess files in all higher-level directories, in order to have a full complement of directives that it must apply. (See section on how directives are applied.) Thus, if a file is requested out of a directory /www/htdocs/example, httpd must look for the following files:
>
> * /.htaccess
>
> * /www/.htaccess
>
> * /www/htdocs/.htaccess
>
> * /www/htdocs/example/.htaccess
>
> And so, for each file access out of that directory, there are 4 additional file-system accesses, even if none of those files are present. (Note that this would only be the case if .htaccess files were enabled for /, which is not usually the case.)
>
> In the case of RewriteRule directives, in .htaccess context these regular expressions must be re-compiled with every request to the directory, whereas in main server configuration context they are compiled once and cached. Additionally, the rules themselves are more complicated, as one must work around the restrictions that come with per-directory context and mod_rewrite. Consult the Rewrite Guide for more detail on this subject.
>
> The second consideration is one of security. You are permitting users to modify server configuration, which may result in changes over which you have no control. Carefully consider whether you want to give your users this privilege. Note also that giving users less privileges than they need will lead to additional technical support requests. Make sure you clearly tell your users what level of privileges you have given them. Specifying exactly what you have set AllowOverride to, and pointing them to the relevant documentation, will save yourself a lot of confusion later.

The only reasons you should *ever* be using `.htaccess` is one of the following:

* Your site is being hosted in a shared hosting environment where you don't have any other way of setting up required web server functionality such as redirects
* You have a genuine need to be able to make changes to the web server configuration through a CMS of some sort and can't simply apply the changes to the virtualhost configuration file

Otherwise, you should take the configuration you have in your `.htaccess` file, move it to a `<Directory>` section in your Apache virtualhost configuration file, and set `AllowOverride None` in place of `AllowOverride All`.

There is an argument that logically things like redirects belong with the application code, and so the `.htaccess` file should be in the application repository, but since it has significant consequences for security and performance, it's a *really* bad tradeoff to have to make.
