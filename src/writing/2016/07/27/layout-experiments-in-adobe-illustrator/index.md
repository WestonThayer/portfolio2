---
template: post.hbs

section:
    writing: true
title: Layout Experiments in Adobe Illustrator
enableComments: true
showSubscribe: true

asideLabel1: published
asideList1:
    - July 27, 2016
---

As designers, we need [tools that expose us to layout](https://medium.com/bridge-collection/modern-design-tools-adaptive-layouts-e236070856e3#.7ky86uult), that let us test and explore layout variations, and most importantly make the best decisions. Today, tools like [Antetype](http://www.antetype.com/), [Figma](https://www.figma.com/), [Adobe XD](http://www.adobe.com/products/experience-design.html), and [Affinity Designer](https://vimeo.com/169816724) are leading the way with innovative layout features that can save us from tedious tasks like updating the [same margin 20 times](https://www.youtube.com/watch?v=42VCB42TKp4) or the pain of scaling one design to different device sizes.

Unfortunately, these tools are mostly unavailable on Windows. My teammates at Microsoft largely prefer to work in Adobe Illustrator because it's cross-platform. Not wanting to be left out, I started researching potential solutions. I ended up creating an Illustrator extension called [**Bloks**](https://github.com/WestonThayer/Bloks) which takes a new approach to layout.

{{> post-figure--img
    alt="shapes that stick together"
    src="1.gif"
    caption="Shapes that stick together."
}}

Bloks uses [stack-based layout](http://www.michaellucassmith.com/20080525%20User%20Interface%20Layout.html). When art is placed in a BlokGroup with an orientation (vertical or horizontal), the BlokGroup keeps them stacked in that direction, edge to edge, no matter what you do.

Basic, but combined with a few extra features you can create just about any layout. Perhaps the most powerful feature is the ability to place [symbols](https://helpx.adobe.com/illustrator/using/symbols.html) in BlokGroups. Resize a symbol once and all the BlokGroups it's used in move to make room for it.

{{> post-figure--img
    alt="updating symbols"
    src="2.gif"
    caption="0% opacity symbols form the spacing between each list item. An update to the root symbol cascades to every BlokGroup its used in. The result is that the height of a single symbol controls the list's density."
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
    caption="The same design can quickly be fit to different sized artboards. Strings expand to fit their new containers."
}}

I've been able to try Bloks out with several designers for a few months. It turns out that stack-based layout is extremely easy to learn, easier than the [constraints](https://vimeo.com/146967392) Figma uses or the [box model](http://www.antetype.com/tutorial1.html) used by Antetype.

Stack-based layout is also extremely powerful. However, certain scenarios (like pinning an object 12px from the artboard's right edge) are not intuitive (constraints make more sense in that case). Using symbols within stack-based layout is a huge time saver. You can change 20 margins in a few clicks. It would be even better with support for dynamic symbols (similar to [symbol overrides in Sketch](https://www.sketchapp.com/learn/documentation/07-symbols/2-editing-symbols.html)) as entire components could be turned into symbols.

## Conclusion

I'm convinced that layout is a growing pillar of design, alongside giants like typography, color, and motion. As our industry's tools evolve, I hope they add options for stack-based layout, maybe in conjunction with constraints so that everyone can explore this space.

You can [**try Bloks**](https://github.com/WestonThayer/Bloks#installation) if you have Illustrator. Let me know if you have a problem by creating a new [issue](https://github.com/WestonThayer/Bloks/issues). Share your experience, frustration, or delight with me in the comments or [on Twitter](https://twitter.com/WestonThayer5).

Under the hood, it's all powered by [flexbox](https://github.com/facebook/css-layout) (thanks for the [tip Matej](https://medium.com/facebook-design/exploring-dynamic-layout-in-sketch-fdf0e825d1cf#.2jcauvrh3)) and lot of long nights.
