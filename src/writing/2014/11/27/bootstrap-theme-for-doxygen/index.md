---
template: post.hbs

section:
    writing: true
title: A Bootstrap Theme for Doxygen
description: A practical guide to High Contrast mode in Windows.
showSubscribe: true

asideLabel1: published
asideList1:
    - November 27, 2014
---

At work, I started a C++/Cx repository in [Visual Studio Online](http://www.visualstudio.com/en-us/products/what-is-visual-studio-online-vs.aspx). I needed an easy way for consumers to read about the public APIs.

[Doxygen](http://www.stack.nl/~dimitri/doxygen/) turns out to be the de facto solution for this. It was super easy to hook up, I could document both in code and in separate files and I could document in markdown! I've found markdown to be the absolutely quickest way to write well structured comments. C# style Document XML is great, but not if you have to type it by hand. I might be swayed back to DocXML if [Intellisense supported it for C++](http://stackoverflow.com/questions/3371205/c-intellisense-with-descriptions) and I could get a good comment generator going.

In any case, the website Doxygen creates is wonderful, but ugly:

{{> post-figure--img
    alt="Screenshot before"
    src="before.png"
}}

Luckily I found [doxygen-bootstrapped](https://github.com/Velron/doxygen-bootstrapped) which applies the goodness of [Bootstrap](http://getbootstrap.com/). The original repo was a bit sparse on documentation, but I managed to figure things out and contributed an [example site](https://github.com/Velron/doxygen-bootstrapped/tree/master/example-site) to get your project up and going quickly.

{{> post-figure--img
    alt="Screenshot after"
    src="after.png"
}}

Very pleased with the result. It's even fairly responsive to screen width changes!

## Side note

For anybody else needing to document C++ projects, you might have noticed that VS has a compiler option to generate DocXML. You could plug the XML output into [Sandcastle](http://shfb.codeplex.com/) and get a very nice looking site. The problem is that the DocXML compiler for C++ treats links in comments like code. What you're linking to *must be forward declared!* This is incredibly impractical for comments where you want to link between different classes in your code base. Doxygen does not have this restriction.
