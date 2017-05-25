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

Typography is the bedrock of the web. In my opinion, good typography is one of the easiest ways to set your work apart. Yet I've always been dismayed at the amount of effort required to achieve beautiful typography on the web (and for that matter, many native platforms). The [webfont debate](http://mrmrs.io/writing/2016/03/17/webfonts/) aside, I'm often frustrated while trying to achieve beautiful alignment and vertical rhythm in the browser.

{{> post-figure--img
    alt="Design with an 8px grid in Sketch"
    src="comparison-a.png"
    caption="😊 Sketch's [layout grid](https://www.sketchapp.com/learn/documentation/canvas/rulers-guides-grids/#layout-grid) feature makes it easy to align everything on an 8px grid, a common visual design technique."
}}

{{> post-figure--img
    alt="Design with an 8px grid with CSS"
    src="comparison-b.png"
    caption="☹️ Once we translate the design to CSS, things get confusing. Where did those boxes come from? Why do the margins seem random? 29, 13... The code lost our design intent."
}}

When it comes to typesetting, our design tools and the browser are not equal. Sketch's [smart guides](https://www.sketchapp.com/learn/documentation/canvas/measuring/) automatically snap text to our grid based on typographic features like the [baseline](https://en.wikipedia.org/wiki/Baseline_%28typography%29), as does Illustrator, InDesign, and many others. CSS seems to be less smart. Can it be smarter?

To answer that, we have to study the anatomy of a font. What else goes into it, besides a bunch of vectors shapes? In this article, we'll learn about leveraging *font metrics* to stop using random margins. We'll start positioning type precisely with CSS, bringing some of Sketch's magic to the browser.

## A font file

We'll start with a simplified depiction of a font as a massive set of artboards, one for each glyph (commonly called a character).

{{> post-figure--img
    alt="4 artboards for A, b, c, d. Horizontal guidelines are overlaid in red"
    src="font-artboards.png"
}}

There are rules every font follows. Each artboard must be the same size and the guides are always in the same position. On a global level, the type designer chooses the artboard's dimensions and where the guides are positioned. For each glyph, they draw the actual vector shape and position it within the artboard, snapping various features to the guides as necessary to ensure consistency.

To render a string (like "Hello"), your computer follows a process (taking some liberties here for the sake of simplicity, bear with me):

1. Find the correct font
2. Look up the artboard for each glyph in the word
3. Assemble the artboards in the correct order, side-by-side
4. Hide the artboard itself, leaving the glyphs to stand alone

Unless the font is monospace, the glyphs are then squished together horizontally according to detailed kerning rules that we won't cover here. But it's important to understand that while they're squished together horizontally, the vertical placement of each glyph doesn't change.

GIF here

It's also important to understand that although the artboards are hidden, they define the box that *contains* the string. You can see the box by selecting text in Sketch, or giving it a `background-color` in CSS.

{{> post-figure--img
    alt="Some text selected in Sketch"
    src="sketch-box.png"
    caption="Ever wondered how Sketch decided where to draw text's selection handles?"
}}

The hidden artboards also explain an odd behavior that you may have noticed when pairing different fonts.

{{> post-figure--img
    alt="Two bits of text selected in Sketch, each a different font"
    src="sketch-box2.png"
    caption="Open Sans next to Andale Mono, both set at 92px. Why is Andale Mono's box so much shorter?"
}}

## Font metrics

Until now, I've been using the terms "artboard" and "guides" to help describe the surface on which glyphs are drawn. However, real fonts use different terms, like **ascent**, **descent**, **baseline**, and **cap height**. Together, these terms comprise a font's *metrics*, often called font metrics.

There are many different font metrics, but this article will focus on those common to Latin characters.

{{> post-figure--img
    alt="jEh with font metrics and labels calling out where various font metrics are located. Baseline, line height, ascent, descent, advancement, bounding rectangle, italic angle, line gap (leading), x-height, cap height"
    src="font-metrics.png"
    caption="Various font metrics as they relate to different Latin glyphs. Image credit: [Apple](https://developer.apple.com/library/mac/documentation/TextFonts/Conceptual/CocoaTextArchitecture/FontHandling/FontHandling.html)."
}}

Here's the good part; **font metrics are embedded in the font file**. All the helpful guides the typeface creator used to design the typeface are available to those of us using it.

How can we view a font's metrics? It could be more straightforward. A few will eventually be available in JavaScript via the [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) API, but as of this writing, only Chrome has support behind a flag. I haven't found a design tool that exposes them either. Luckily, there are some solutions out there:

* [FontForge for Mac and PC](http://fontforge.github.io/) - UI is a bit confusing
* [Font Metrics for Windows 10](https://www.microsoft.com/store/apps/9NBLGGH5LP1X) - 💯 but PC only
* [opentype.js](http://opentype.js.org) - A bit confusing, but works in any browser!

I'll show you how to use opentype.js. Head over to their [Font Inspector](http://opentype.js.org/font-inspector.html) page.

{{> post-figure--img
    alt="Screenshot of opentype.js's font inspector"
    src="opentype-1.png"
    caption="The Font Inspector loads up Roboto-Black.ttf by default, but use the Choose File button to upload your own."
}}

The font metrics are listed in the **OS/2 and Windows Metrics table** section, except for *unitsPerEm*, which is in the first **Font Header table** section.

ID | Common name | Definition
--- | --- | ---
*unitsPerEm* | design units per em | The size of the [em square](http://designwithfontforge.com/en-US/The_EM_Square.html) (what we've been calling an artboard), all other measurements are relative to this
*sTypoAscender* | ascent | Distance from the baseline to the top of the em square (often higher than that)
*sTypoDescender* | descent | Distance from the baseline to the bottom of the em square
*sxHeight* | x-height | Distance from the baseline to the top of a lowercase *x*
*sCapHeight* | cap height | Distance from the baseline to the top of a capital letter

Let's continue to work with Roboto Black as an example. Here are its metrics:

Common name | Value
--- | ---
design units per em | 2048
ascent | 1536
descent | -512
x-height | 1082
cap height | 1456

Those numbers probably don't carry much meaning for you. For one thing, there's no unit! Since fonts these days are 100% vector-based, there's really no point in working in pixels, points, inches, or centimeters. All values are simply relative to one another.

However, fonts in the browser have a `font-size` with some unit. That means we can use some simple math to convert the font metrics into real measurements. The formula works like this:

> metricInPx = (metric / designUnitsPerEm) × fontSizeInPx

For example, if Robot Black is set with `font-size: 2048px`, it cancels out `designUnitsPerEm`, so a metric like cap height (which remember is the distance between the baseline and the top of a capital letter) would be `1456px`, a simple 1:1 relationship.

That's rather large though, let's try it with `font-size: 128px`. `(1456 / 2048) * 128px = 91px`, so the height of a capital *H* would be 91px tall:

<figure class="post-figure post-figure--nocaption">
    <p data-height="290" data-theme-id="0" data-slug-hash="ammmQN" data-default-tab="result" data-user="WestonThayer" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/WestonThayer/pen/ammmQN/">font-metrics--1</a> by Weston Thayer (<a href="http://codepen.io/WestonThayer">@WestonThayer</a>) on <a href="http://codepen.io">CodePen</a>.</p>
    <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</figure>

It works! We can use the font metrics to reverse engineer font rendering,


The baseline refers to the invisible ledge that Latin characters "sit upon". Cap height traces the top edge of capital letters. From a visual design perspective, baseline and cap height are important. While type is irregularly shaped, your eye is always searching for patterns and shapes. If you squint, each line in this paragraph resembles a long, thin rectangle. Through careful alignment of these perceived shapes, you can help guide the reader through your design.

A frequent use of the baseline is aligning two differently sized pieces of type on the same line. Twitter's feed sets Arial Bold, 14px ("Michael Scharnagl") next to Arial 13px ("@justmarkup 3h") to establish hierarchy, without damaging readability.

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

I love how the studio [Helms Workshop](http://helmsworkshop.com/) designed the page header on their [clients page](http://helmsworkshop.com/clients). "Clients" rules the hierarchy, with the description neatly contained within the cap height of *C*.

{{> post-figure--img
    alt="Screenshot of Helms Workshop"
    src="ex-baseline-3--full.png"
}}

Here's a close up highlighting the actual boxes we position with CSS. Note how the edges of the boxes are not aligned in the least. That's not important. The type is what your eye sees. The type is important, *not the box*.

{{> post-figure--img
    alt="Screenshot of Helms Workshop with redlines"
    src="ex-baseline-3--rl.png"
}}

In another example, cap height is used to align imagery with type. Airbnb aligns the top of the *A* in "Airbnb" with the top of the feature image. Your eye glides from the top of the image to the top of the *A*.

{{> post-figure--img
    alt="Promotion from AirBnb with a circular image on the left and some text on the right"
    src="ex-cap-height.png"
}}

The Twitter example from earlier contains a similar alignment. Here it is once more, but showing the red box. Again, the type's box is not aligned to the image. It's the top of the *M* that matters.

{{> post-figure--img
    alt="Twitter, redlined"
    src="ex-cap-height--rl.png"
}}

Finally, baseline is essential to creating [vertical rhythm](https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/). This topic has been covered at length by others. Take a break and read through the linked article if you're unfamiliar.

## Use the guides Luke

Here's the good part. Remember we mentioned font rendering earlier? It's the process by which your browser converts text into a bitmap image, ready to be displayed on your screen. To do this, your browser considers things like font-family, font-size, *and the font's guides*.

Consider the guides shown earlier. Note the *ascent* and *descent* metrics.

{{> post-figure--img
    alt="jEh with guidelines and labels calling out where various font metrics are located"
    src="font-metrics-zoom.png"
}}

To calculate the height of the red box it would place the *j* in, your browser does a simple calculation:

> boxHeight = ((ascent + descent) / emHeight) · fontSize

Where *ascent*, *descent*, and *emHeight* are all some distance.

Guides are the hidden blueprint that will let us conquer the red box. If we knew each guide's vertical position within the em-square (or artboard if you prefer), Luckily for us, the guides are embedded in the font file (`.ttf .otf .woff` etc) as **font metrics**. As long as the type designer was using guides, they'll be there. This is always the case for any quality typeface.

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





Until now, I haven't used CSS line-height

Note that this doesn't work perfectly in Chrome on Windows LINK TO BUG. It can be off by 1px.





CSS has built-in support for baseline alignment as long as both are inline level elements sharing the same container, via [vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align). Unfortunately, that's not always practical.

## Vertical rhythm


## Prelude

To set the scene, here are some confounding font rendering examples. We'll soon learn *why* these things happen, but for now take a minute to observe.

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
