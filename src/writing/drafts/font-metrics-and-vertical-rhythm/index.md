---
template: post.hbs

section:
    writing: true
title: Precision typesetting on the web
enableComments: true

asideLabel1: published
asideList1:
    - September 5, 2016
---

Typography is the bedrock of the web. In my opinion, good typography is one of the easiest ways to set your work apart. Yet I've always been dismayed at the amount of effort required to achieve good typography on the web (and many native platforms). The [webfont debate](http://mrmrs.io/writing/2016/03/17/webfonts/) aside, it's frustrating to predictably [measure](https://medium.engineering/typography-is-impossible-5872b0c7f891/) and [align](/writing/2014/10/08/introducing-textline/) type on the web.

Typesetting with HTML and CSS is harder than it is with Illustrator or Sketch, but does it have to be? In this post I'll dive deep into how we can use font metrics, metadata embedded in every font file, to typeset with confidence in the browser. We'll stop guessing at margins while positioning type in a box and start positioning type precisely in terms of its *baseline* and *cap height*.

To set the scene, here are some examples that show just how random the browser's treatment of type can seem.

{{> post-figure--img
    alt="Hjello in a box"
    src="hjello-box.png"
    caption="Lato Black set at font-size: 192px and line-height: normal. A browser will render it inside the (normally invisible) red box, which surprisingly is not 192px tall 🤔"
}}

{{> post-figure--img
    alt="World in a box"
    src="art_world-box.png"
    caption="Adobe Garamond Pro (blue) over Calibri (red), both set at font-size: 192px. What determines how much whitespace goes above or below the type?"
}}

## Guides

When a type designer sets out to create a font, they add a set of guides to the [em](https://en.wikipedia.org/wiki/Em_%28typography%29) square. It might be helpful to visualize a font as a set of artboards, one for each glyph (commonly called a character). Every artboard is the same size (the size of the em square) and every artboard shares the same guides. Like most guide lines, they help the type designer be consistent as they sculpt each glyph in the font (for example, making sure that *c* and *e* are the same height and share the same vertical placement).

{{> post-figure--img
    alt="jEh with guidelines and labels calling out where various font metrics are located"
    src="font-metrics.png"
    caption="Various guides as they relate to different glyphs. Image credit: [Apple](https://developer.apple.com/library/mac/documentation/TextFonts/Conceptual/CocoaTextArchitecture/FontHandling/FontHandling.html)."
}}

Commonly used guides have names. My favorite guides are the **baseline**, which is the invisible ledge that Latin characters sit upon, and the **cap height**, which is the top edge of Latin capital letters. Why? While type is irregularly shaped, your eye is always searching for patterns. Look at this very paragraph as an example -- can you visualize each line's invisible ledge?

A frequent use of the baseline is aligning two differently sized pieces of type on the same line. Twitter's feed sets Arial Bold, 14px ("Michael Scharnagl") next to Arial 13px ("@justmarkup 3h") to establish hierarchy.

{{> post-figure--img
    alt="A tweet from Twitter's website shows how they aligned the tweet-er's name to their handle and time stamp"
    src="ex-baseline.png"
}}

Another example from Google Maps, Roboto 13px set next to 12px.

{{> post-figure--img
    alt="Screenshot of Google Maps"
    src="ex-baseline-maps.png"
    caption="P.S. Dough Zone is delicious 🍜"
}}

I love how the studio [Helms Workshop](http://helmsworkshop.com/) designed the page header on their [clients page](http://helmsworkshop.com/clients). "Clients" rules the hierarchy, with the description neatly matching its optical height. Everything in the header is baseline aligned. Neat.

{{> post-figure--img
    alt="Screenshot of Helms Workshop"
    src="ex-baseline-3--full.png"
}}

Here is the same image, but showing the browser's boxes. Note how the edges of the boxes are not aligned in the least. That's not important. The type is what users see. The type is what's important.

{{> post-figure--img
    alt="Screenshot of Helms Workshop with redlines"
    src="ex-baseline-3--rl.png"
}}

Cap height is often used to align imagery with type. In this example, Airbnb aligned the top of the *A* in "Airbnb" with the top of the feature image. Since we read right-to-left, top-to-bottom, it flows nicely.

{{> post-figure--img
    alt="Promotion from AirBnb with a circular image on the left and some text on the right"
    src="ex-cap-height.png"
}}

The Twitter example from earlier also aligns the user profile picture to the cap height. Here it is once more, but showing the red box. Again, the type's red box is not aligned to the image. It's the top of the *M* that's optically aligned to the top of the image.

{{> post-figure--img
    alt="Twitter, redlined"
    src="ex-cap-height--rl.png"
}}

## Finding a font's guides

The type designer's guides are a hidden blueprint that can tell us *where* a glyph sits inside the em square. As it turns out, the guides are what's used by the browser to calculate the red box! We can use this knowledge to discover how much whitespace is above or below a glyph, or how many pixels tall the letter *H* is for a given font and font-size, or maybe the height of an *x*. We can measure a large number of things using those guides and use those measurements to create meaningful alignments in our designs. Exciting, right?

Luckily for us, the guides are embedded in the font file (`.ttf .otf .woff` etc) as **font metrics**. As long as the type designer was using guides, they'll be there. This is always the case for any quality typeface.

The first step is to select a font and access its embedded font metrics data. If you use Windows, you can download the [Font Metrics app](https://www.microsoft.com/store/apps/9NBLGGH5LP1X) and browse from the fonts installed on your computer.

{{> post-figure--img
    alt="Screenshot of the Font Metrics app for Windows"
    src="font-metrics-app.png"
    caption="Various font metrics are overlaid as guides. Their numeric representations are located in the lower right."
}}

Alternatively, you can use [FontForge](http://fontforge.github.io/), a free and open source font editor for Mac and PC.

For the rest of this post, I'll be using [Space Mono](https://fonts.google.com/specimen/Space+Mono) from Google Fonts to show how font metrics can be used in a few examples.

{{> post-figure--img
    alt="Screenshot Space Mono's metrics"
    src="space-mono-metrics.png"
}}

The first number of interest is *design units per em*. Font metrics use a unitless system instead of px, in, or cm. All metrics are relative to the design units per em, which is often set to 1,000, but can be any number.

## Measuring in the browser

Space Mono has the following metrics (copied from the Font Metrics app):

Metric     | Value | Definition
---------- | ----- | ----------
ascent     | 1120  | Distance from baseline to top of em square
cap height | 700   | Distance from baseline to the top of a capital letter
x height   | 496   | Distance from baseline to the top of a lowercase *x*
descent    | 361   | Distance from baseline to the bottom of em square
line gap   | 0     | Distance between lines (if wrapping)

Since there are 1,000 design units per em, Space Mono set at font-size: 1000px will make the height of an *H* (cap height) exactly 700px tall. A simple 1:1 relationship. You can find the cap height for more realistic font-sizes with a simple formula:

> (metric / designUnitsPerEm) × fontSizeInPx = metricInPx

Here's a live example of Space Mono at 120px. `(700 / 1000) × 120px = 84px`, so the *H* is 84px tall:

<figure class="post-figure post-figure--nocaption">
    <p data-height="290" data-theme-id="0" data-slug-hash="ammmQN" data-default-tab="result" data-user="WestonThayer" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/WestonThayer/pen/ammmQN/">font-metrics--1</a> by Weston Thayer (<a href="http://codepen.io/WestonThayer">@WestonThayer</a>) on <a href="http://codepen.io">CodePen</a>.</p>
    <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</figure>



Until now, I haven't used CSS line-height

Note that this doesn't work perfectly in Chrome on Windows LINK TO BUG. It can be off by 1px.





CSS has built-in support for baseline alignment as long as both are inline level elements sharing the same container, via [vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align). Unfortunately, that's not always practical.

## Vertical rhythm
