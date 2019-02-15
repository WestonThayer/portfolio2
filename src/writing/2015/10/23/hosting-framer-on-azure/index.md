---
template: post.hbs

section:
    writing: true
title: Hosting Framer Prototypes on Azure
showSubscribe: true

asideLabel1: published
asideList1:
    - October 23, 2015
---

While Framer Studio makes it [extremely easy](http://framerjs.tumblr.com/post/108550864712/sharing-projects) to get a sharable link to your prototype, your company might not be too happy to find their work on a public (although obscure) URL. Here's how you can use Azure to lock things down.

1. Create an Azure [Web App](https://azure.microsoft.com/en-us/services/app-service/web/). It's free, but you have to hand over your credit card number
2. Follow the [FramerAzureBoilerplate instructions](https://github.com/WestonThayer/FramerAzureBoilerplate#usage) to enable simple username/password authentication, as shown below:

{{> post-figure--img
    alt="Logging in"
    src="login.png"
}}

Of course there are obvious security issues with sharing the username and password to everyone you want to share the prototype with, so keep that in mind. It's also possible that your company has an internal Azure instance, which is even more secure.
