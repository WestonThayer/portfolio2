---
template: post.hbs

section:
    writing: true
title: Layout experiments in Adobe Illustrator
enableComments: true

asideLabel1: published
asideList1:
    - July 27, 2016
---

One year ago at Microsoft, we were wrapping up Windows 10. It was a big year for the Windows design studio. Windows 10 was really the first time the same app could be run on devices in multiple categories - native experiences spanning phones, tablets, and PCs.

Supporting that many devices comes with a set of challenges not unlike those faced by web designers in the late 2000's. No longer can we draw a pixel-perfect comp for a single screen size and just build it. I'm sure many can relate, the screens come marching on. Too many to draw.

> "Samsung shits out a different-sized black rectangle every 30 seconds" - [Brad Frost](http://bradfrost.com/blog/post/i-have-no-idea-what-the-hell-i-am-doing/)

## Examination

We're not starting from scratch here; [responsive web design](https://en.wikipedia.org/wiki/Responsive_web_design) has grown with us for the better half of a decade. The concept of a layout system is far older. Nonetheless, this was a good opportunity to dive deep into the problem space (you can see my research notes TBD).

I realized that layout has become an important pillar of design, alongside giants like typography, color, and motion. When your work is floating in a sea of screens, preserving the layout intent is critical. As designers, we need tools that expose us to layout, that let us test and explore layout variations, and most importantly make design decisions.

## Experiments

There are some interesting design tools with layout features available like [Antetype](http://www.antetype.com/), [Figma](https://www.youtube.com/watch?v=mTPJBB3f0mg), [Adobe XD](https://www.youtube.com/watch?v=42VCB42TKp4), and [Affinity Designer](https://vimeo.com/169816724?utm_source=designernews). However, we haven't yet reached an industry standard. Each takes a slightly different approach and adoption is limited.

Unfortunately, none of these tools are available for Windows. My team largely prefers Adobe Illustrator, so I set out to see if I couldn't get something working. I was also curious if I could design a UX that made layout easier to learn.

{{> post-figure--img
    alt="shapes that stick together"
    src="1.gif"
    caption="Shapes that stick together."
}}

Bloks is an Illustrator extension that exposes you to stack-based layout in a very basic way. When you put objects into a BlokGroup and give them an orientation (vertical or horizontal), they simply remain stacked in that direction, one after the other, no matter what you do.

Basic, but combined with a few extra features you can create just about any layout. Perhaps the most powerful feature is the ability to place symbols in BlokGroups. Resize a symbol once and all the BlokGroups it's used in move to make room for it.

{{> post-figure--img
    alt="updating symbols"
    src="2.gif"
    caption="0% opacity symbols are any easy way to make a simple list."
}}

Access to such a primitive layout mechanism has the benefit of allowing designs that other tools do not.

{{> post-figure--img
    alt="multi-height list items"
    src="3.gif"
    caption="You can keep variable-sized items with a fixed distance between them easily."
}}

You can also give objects **flexibility**, which allows them to fluidly resize.

{{> post-figure--img
    alt="fluid layouts"
    src="4.gif"
    caption="The flexibility property is hard to understand at first. Experiment with values of 1 and 2 to get a feel for how it works."
}}

These features come together to enable powerfully complex layouts, all within Illustrator.

## Results

I've been able to try this out with several other designers for a few months, learning a few interesting things about the UX:

* Stacks are easy to learn initially, but can quickly grow in complexity
* Only use it when you need it
* Without support for dynamic symbols (similar to [symbol overrides in Sketch](https://www.sketchapp.com/learn/documentation/07-symbols/2-editing-symbols.html)), certain changes are still annoying and time consuming to make
* Instant feedback while resizing is critical

Despite the drawbacks, everyone agrees that it remains *useful*. Making our layout decisions in the same tool where we make our type and color decisions feels *right*. We don't have to wait until it's been coded or leave it to our imagination - with the right tools we can take charge.

## Conclusion

You can give Bloks a try too if you have Illustrator, use the installer for PC or Mac.

Under the hood, it's all powered by [flexbox](https://github.com/facebook/css-layout) (thanks for the [tip](https://medium.com/facebook-design/exploring-dynamic-layout-in-sketch-fdf0e825d1cf#.2jcauvrh3) Matej), so just about anything is possible.
