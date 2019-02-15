---
template: post.hbs

section:
    writing: true
title: Framer on Windows with framer-cli
showSubscribe: true

asideLabel1: published
asideList1:
    - October 9, 2015
---

[Framer](https://github.com/koenbok/Framer), the fantastically fast JavaScript prototyping library, is primarily used through [Framer Studio](http://framerjs.com/), a paid (but well worth it) IDE for OSX. While it's been possible to use Framer on Windows for quite a while (it is just JavaScript after all), that required a lot of [setup](http://www.prototypingwithframer.com/framer-on-windows-with-atom/) (If you do follow this article, beware that the Getting Started link is out of date). I recently discovered a much easier way, courtesy of Pete Schaffner's [framer-cli](https://github.com/peteschaffner/framer-cli).

{{> post-figure--img
    alt="My workspace"
    src="workspace.png"
}}

1. [Download Node.js](https://nodejs.org/) and install
2. From Start, open the **Node.js command prompt** and enter `npm install -g framer-cli`
3. `cd C:\Users\yourname\Desktop\`, or to some other folder
4. `framer new MyProto.framer`
5. `framer preview MyProto.framer`

If you now take your browser to `http://localhost:3000/`, you'll see your work! To make changes:

1. Navigate to `C:\Users\yourname\Desktop\MyProto.framer\`
2. Rename `index.js` to `index.coffee`
3. Open `index.coffee` and make changes

If you make edits while `framer preview` is still running, you'll see your browser automatically perform a live refresh whenever you save. Step 2 is optional ([working on it](https://github.com/peteschaffner/framer-cli/issues/16)), you could write in JavaScript if you wanted. That's the basics, but here are a few more tips:

* Emulate Framer Studio's **Mirror** feature by typing `ipconfig` in the command prompt. You should see an `IPV4 Address` line with a set of four digits separated by periods. For example: `192.168.0.214`. This is your IP address. If you have a device or phone on the same local network, type that number, plus :3000 into your browser. For example `192.168.0.214:3000`. Now you can test your work on a phone or tablet. We're working [to make this easier](https://github.com/peteschaffner/framer-cli/issues/14).
* You can change the mouse cursor to a touch point by integrating this outstanding [pull request](https://github.com/peteschaffner/framer-cli/pull/12).
* If you're including code from a Framer Studio project and it doesn't immediately work, you may want to integrate [this pull request](https://github.com/peteschaffner/framer-cli/pull/13).
* If the preview isn't showing anymore, check the command window where you ran `framer preview`. Compilation errors are displayed here.

The two major features that I miss most from Framer Studio are PSD and Sketch import as well as the editor's intelligent autocomplete. You can play around with plugins for editors like Sublime Text to get better autocompletion (framer-cli is working on support for [Tern](http://ternjs.net/)), but it still won't be great. And of course designs can be manually imported, but that's fairly painful.
