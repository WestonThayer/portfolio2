---
template: post.hbs

section:
    writing: true
title: Layout experiments in Adobe Illustrator
enableComments: true

featureImgSrc: "feature.png"

asideLabel1: published
asideList1:
    - July 27, 2016
---

One year ago at Microsoft, we were wrapping up Windows 10. It was a big year for the design studio -- Windows 10 was really the first time the same native app could be run on phones, tablets, and PCs.

Supporting that many devices comes with a set of challenges not unlike those faced by web designers in the late 2000's. We can no longer draw a single pixel-perfect comp. The screens come marching on. Too many to draw.

> "Samsung shits out a different-sized black rectangle every 30 seconds." -- [Brad Frost](http://bradfrost.com/blog/post/i-have-no-idea-what-the-hell-i-am-doing/)

Luckily we can take a page from [responsive web design](https://en.wikipedia.org/wiki/Responsive_web_design) by flexing and adapting our UI. After years of designing websites myself, I'm convinced that responsive layout is now a growing pillar of design, alongside giants like typography, color, and motion. As designers, we need [tools that expose us to layout](https://medium.com/bridge-collection/modern-design-tools-adaptive-layouts-e236070856e3#.7ky86uult), that let us test and explore layout variations, and most importantly make the best design decisions.

## Experiments

Design tools like [Antetype](http://www.antetype.com/), [Figma](https://www.figma.com/), [Adobe XD](http://www.adobe.com/products/experience-design.html), and [Affinity Designer](https://vimeo.com/169816724?utm_source=designernews) all have innovative layout features. However, each takes a slightly different approach. Some use [constraints](https://www.youtube.com/watch?v=mTPJBB3f0mg), some a [box model](http://www.antetype.com/tutorial1.html), and others use clever [hybrid approaches](https://www.youtube.com/watch?v=42VCB42TKp4). An industry standard UX has yet to emerge.

Unfortunately, these tools are mostly unavailable on Windows thus far. My team largely prefers Adobe Illustrator, so I set out to see if I could get something working. I was also curious if I could design an experience that made the mechanics of layout algorithms easier to learn.

{{> post-figure--img
    alt="shapes that stick together"
    src="1.gif"
    caption="Shapes that stick together."
}}

[Bloks](https://github.com/WestonThayer/Bloks) is an Illustrator extension that exposes you to simple [**stack-based layout**](http://www.michaellucassmith.com/20080525%20User%20Interface%20Layout.html). Objects can be placed in a BlokGroup with an orientation (vertical or horizontal). The BlokGroup keeps them stacked in that direction, edge to edge, no matter what you do.

Basic, but combined with a few extra features you can create just about any layout. Perhaps the most powerful feature is the ability to place [symbols](https://helpx.adobe.com/illustrator/using/symbols.html) in BlokGroups. Resize a symbol once and all the BlokGroups it's used in move to make room for it.

{{> post-figure--img
    alt="updating symbols"
    src="2.gif"
    caption="0% opacity symbols form the spacing between each list item. An update to the root symbol cascades to every BlokGroup its used in. The result is that a single symbol controls the list's density."
}}

Access to such a primitive layout mechanism has the benefit of allowing designs that other tools do not.

{{> post-figure--img
    alt="multi-height list items"
    src="3.gif"
    caption="You can easily stack variable-height items. Tools like Adobe XD's [Repeat Grid](https://www.youtube.com/watch?v=42VCB42TKp4) require each item to be the same height."
}}

You can also give objects **flexibility**, which allows them to fluidly resize.

{{> post-figure--img
    alt="fluid layouts"
    src="4.gif"
    caption="The flexibility property applies to children of a BlokGroup. It can be hard to understand at first. Experiment with values of 1 and 2 to get a feel for how it works."
}}

These features come together to enable powerfully complex layouts, all within Illustrator.

{{> post-figure--img
    alt="responsive design"
    src="5.gif"
    caption="The same design can quickly be fit to different sized artboards."
}}

## Results

I've been able to try this out with several other designers for a few months, obtaining a few insights:

* Stacks are very easy to learn initially, but can quickly grow in complexity
* Layout isn't always helpful, sometimes it can slow you down
* Without support for dynamic symbols (similar to [symbol overrides in Sketch](https://www.sketchapp.com/learn/documentation/07-symbols/2-editing-symbols.html)), certain changes are still annoying and time consuming to make
* Instant feedback while resizing is critical. Unfortunately, Illustrator has technical constraints here

Everyone agrees that stacks are *useful*. Making our layout decisions in the same tool where we make our type and color decisions feels so right. We don't have to wait until it's been coded or leave it to our imagination - with the right tools, designers can take charge.

## Conclusion

You can [**try Bloks**](https://github.com/WestonThayer/Bloks#installation) if you have Illustrator. Let me know if you have a problem by creating a new [issue](https://github.com/WestonThayer/Bloks/issues). Share your experience, frustration, or delight with me in the comments or [on Twitter](https://twitter.com/WestonThayer5).

Under the hood, it's all powered by [flexbox](https://github.com/facebook/css-layout) (thanks for the [tip Matej](https://medium.com/facebook-design/exploring-dynamic-layout-in-sketch-fdf0e825d1cf#.2jcauvrh3)), so just about anything is possible.
