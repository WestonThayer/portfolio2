---
template: post.hbs

section:
    writing: true
title: My performance pitfall
enableComments: true

asideLabel1: published
asideList1:
    - April 20, 2015
---

The landscape of software performance, especially for UI, is complex, mysterious, and poorly understood by many. This is the story of a dark hole that I found myself in.

> Today, the developer created a list UI component.

She sought to consolidate and unify lists in her many apps, while removing duplicate code. Her users would rejoice at the level of polish and consistency she'd achieved.

Being a responsible developer, she wants to ensure that lists display just as fast as ever. Unfortunately, she only has high-end devices to test on. Everything *seems* to be fine with her changes. But, she suspects that may not be the case on low-end devices. So she writes some code to measure how long it takes for the list to render and runs some tests, effectively [benchmarking](https://en.wikipedia.org/wiki/Benchmark_(computing)). Here are some of her results:

| Test Run   | Pre-Change  | Post-Change  |
| ---------- | ----------- | ------------ |
| 1          | 80ms        | 94ms         |
| 2          | 74ms        | 81ms         |
| 3          | 81ms        | 79ms         |

Unfortunately, it appears that on average, she made things a bit slower. Sure, it's only a few ms, but what will a few ms become on a low-end device? Worse still, the 94ms result appears to be an outlier. Hmm. Maybe another process got some extra CPU time on that run. As she runs more tests, the level of variance is frustrating. ±10ms, sometimes worse!

Discouraged, she thought for a bit and came up with an idea. What if she wrote a stress test? Perhaps it tries to render 1,000 list items instead of the usual 40-50. That should take whole **seconds** to run and the mere ±10ms variance will be insignificant. Here's her next round of results:

| Test Run   | Pre-Change  | Post-Change  |
| ---------- | ----------- | ------------ |
| 1          | 1.92s       | 2.22s        |
| 2          | 1.88s       | 2.10s        |
| 3          | 1.72s       | 2.15s        |

Oh dear. Not only did that attempt fail to clamp down on the variance, her changes seem to have made things even worse!

> This is a dismal hole.

You can stay in it. Run more tests. Sometimes the variance will be less and you'll think you have concrete results. But you'll run more tests the next day and things are thrown back into chaos. To get yourself out, you must learn three things:

* Test real-world scenarios
* Test on slow, cheap devices
* Use a [performance analyzer](https://en.wikipedia.org/wiki/Profiling_(computer_programming))

## Test real-world scenarios

Measuring performance is frustrating because each time you measure, you might get a different result. This is at odds with the repeatable nature of computing. While it's tempting to write a stress test to minimize variance, unless you need to perform at the scale you're testing there's simply no value in optimizing for it. Test real-world scenarios.

## Test on slow, cheap devices

This one sucks, because you have to buy something. Good thing it's cheap, right? Alternatively, there are more than a [few](http://developer.samsung.com/remotetestlab/rtlDeviceList.action) [services](http://aws.amazon.com/device-farm/) out there that let you virtually "rent" a device for testing. While it's tempting to try and slow your machine down or use an emulator, use a real device that you want to support.

## Use a performance analyzer

These tools are often hard to use and come with a steep learning curve, but trust me they're worth it. Instead of guessing at which part of your code is at fault, it will *tell* you. Even better, it stops you from measuring time from your app code, which may result in [Heisenbugs](https://en.wikipedia.org/wiki/Heisenbug).

*Having absorbed these learnings, the developer was enlightened. After testing on a low-end device, she found that there wasn't even a performance issue! Equipped with this newfound wisdom, she set out to prevent others from the same fate.*
