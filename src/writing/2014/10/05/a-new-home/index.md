---
template: post.hbs

section:
    writing: true
title: A new home
description: Switching blog engines.

asideLabel1: published
asideList1:
    - October 5, 2014
asideLabel2: last updated
asideList2:
    - July 16, 2016
---

*Update: Jekyll is out, hand-rolled is in! Jekyll is hard enough to install on Windows that I wrote a quick blogging engine with node.js and gulp.*

Before now, I've tended to write in many different locations. From now on, this will be the one-stop-shop for everything. It's new! It's fun! It was created using [Jekyll](http://jekyllrb.com/)! You can find my previous writings here:

* [Cryclops Wordpress](http://cryclops.com/)
* [Cryclops Quora](http://cryclops.quora.com/)

## Why the move?

I was tired of feeling out of control. Wordpress made me fret over how the database was backed up. Quora doesn't allow me to customize the look. Jekyll was the answer to both of these problems. I got started using [Poole via this guide](http://joshualande.com/jekyll-github-pages-poole/) and only had to do a handful of tweaks to the [poole master](https://github.com/poole/poole) to get up and running.

Perhaps the only neat trick is a simple batch file that renames all of the `*.html` files to `*.php` to allow for PHP execution. This means it isn't a truely static site, but it was the fastest way to pull in the existing `header.php` and `footer.php` look.
