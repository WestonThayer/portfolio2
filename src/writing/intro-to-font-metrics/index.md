---
template: post.hbs

section:
    writing: true
title: Intro to Font Metrics
enableComments: true
showSubscribe: true

featureImgBgColor: "#f0f4f7"
featureImgSrc: "feature.png"
featureImgBase: "feature"
featureImgExt: ".png"

asideLabel1: published
asideList1:
    - February 11, 2019
---

*Font files contain a wealth of information about a typeface. Whether you're a designer or a developer, learning more about how fonts work can open new doors in how you work and what you create.*

## What are font metrics?

We'll start with a font. A font is a digital representation of a typeface that consists of a series of glyphs (commonly called letters or characters). Computers read a font file in order to render glyphs on your screen as pixels. To describe how all those individual glyphs should be assembled together into words, sentences, and paragraphs, typeface designers encode the font with *metrics*.

Font metrics help the computer determine things like the default spacing between lines, how high or low sub and super scripts should go, and how to align two differently sized pieces of text next to each other.

Visualizing a font's metrics, it looks a lot like guidelines in Sketch or Photoshop.

{{> post-figure--img
    alt="Screenshot of OpenType.js font inspector"
    src="font-metrics.png"
    caption="The metrics for lato.ttf, viewed with https://opentype.js.org/font-inspector.html, then visualized."
}}

Your computer is constantly using font metrics, but as a designer or developer, you probably don't think about them in your day to day. Maybe this is the first time you've heard of font metrics.

Similarly, while design and development tools use font metrics under the hood, they don’t often expose them to their users. But they could—and it could change the way you design. To understand how, we first need to talk about the anatomy of type.

## A look inside type

There’s an anatomy behind the letters that makes up this sentence. As the example below shows, the curve of an “s” is called the spine—or the white space inside an “a” or “o” is the counter. Then there’s that imaginary line that all letters “sit” on (baseline), the tops of capital letters (cap height), and the tops of lowercase letters (x-height).

{{> post-figure--img
    alt="The word 'Glossary' annotated with different anatomical features"
    src="anatomy.png"
    caption="Anatomy of a typeface. Credit: https://www.fontshop.com/glossary."
}}

When we practice typography by arranging type on a page or screen, we’re often leveraging different bits of anatomy to create readability and beauty. For example, the search suggestions in Google Maps contain both a place’s name and address.

To help you focus on the most important information (a place’s name), the typographer has set the address in a smaller type size and a lighter color. But to help with readability, both the place’s name and address share a **baseline**.

{{> post-figure--img
    alt="Screenshot of Google Maps search dropdown, showing results for Dough Zone Dumpling House"
    src="baseline-google-maps.png"
}}

The baseline is also helpful for creating vertical rhythm, which may make it [easier](https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/) for readers to jump from line to line, paragraph to paragraph, and section to section.

{{> post-figure--img
    alt="Paragraphs with their baselines snapped to a repeating vertical grid"
    src="baseline-vertical-rhythm.png"
}}

Another bit of frequently used anatomy is **cap height**, the top of capital letters. It often helps align your type with the top edge of pictures.

{{> post-figure--img
    alt="An Airbnb notification with a circular image on the left and the title on the right, its cap height aligned to the top of the image"
    src="cap-height-airbnb.png"
    caption="Notification from Airbnb."
}}

Or baseline and cap height can be combined to create a playful container for smaller type.

{{> post-figure--img
    alt="A large title to the left of a smaller descriptive paragraph, where the paragraph fits within the vertical bounds of the title's baseline and cap height"
    src="cap-height-helms-workshop.png"
    caption="Title / description from https://helmsworkshop.com/clients."
}}

Typographic anatomy plays a big part in our designs. Pieces of that anatomy are encoded in font metrics, which open the door for our tools to help in new ways.

## How do our tools use font metrics today?

Font metrics metadata is used by tools like Sketch to power features like [smart guides](https://www.sketchapp.com/docs/canvas/measuring/), which can help you snap the baseline to a layout grid.

{{> post-figure--img
    alt="GIF showing a headline being snapped by baseline to a grid in Sketch"
    src="sketch-smart-guides.gif"
}}

Similarly, CSS’s [vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) relies entirely on font metrics.

{{> post-figure--img
    alt="GIF showing CSS vertical-align toggling from top to baseline to align two pieces of text"
    src="css-vertical-align.gif"
}}

For the most part, our tools stop there—but they don’t have to.

## How could our tools use font metrics?

Good typography is hard, but it gets easier when our tools help out. Even though the raw anatomy of a typeface is essential to good design, our tools usually obscure that anatomy—hiding all the details inside type’s **bounding box**.

In Sketch, the bounding box is represented by selection handles. In CSS, you can see it by setting a `background-color`. All type positioning is in relation to the bounding box, so if you wanted 100px from the top of the screen to a paragraph, our tools yield 100px to the top of the box, not to the top of an “L” (cap height) or the bottom (baseline).

{{> post-figure--img
    alt="Left, Sketch's resize handles on a paragraph. Right, the same paragraph with CSS background-color: pink. Both are the same size"
    src="type-bounding-box.png"
}}

One way the bounding box commonly causes issues when vertically centering text to an icon. Using Sketch’s align tool, the text always looks too low. The same is true with CSS flexbox’s `align-items: center`.

{{> post-figure--img
    alt="GIF showing the effect of Sketch's center alignment on a square icon (left) and text (right)"
    src="sketch-align-center.gif"
}}

This is because even though the space above and below the text’s bounding box is equal, the space above and below the “M” is not.

{{> post-figure--img
    alt="Left, the icon with text centered, annotated to show 13px above and below the text's bounding box. Right, the icon with text centered, annotated to show 21px above the cap height and 19px below the baseline"
    src="sketch-align-center-annotated.png"
    caption="Depending on your font and font size, the alignment can often be off by much more than 1px."
}}

Similarly, top aligning text to an icon doesn’t always work out either. On the left, Sketch’s align top tool. On the right, I aligned with the top of the “L” with the icon by hand.

{{> post-figure--img
    alt="Left, a square icon next to a paragraph that has been aligned-top with Sketch. Right, the same icon and paragraph, but aligned by hand"
    src="sketch-align-top.png"
}}

Multi-column layouts are another source of pain. If two differently sized headlines are aligned to the bottom of the bounding box, the smaller inevitably looks too low.

{{> post-figure--img
    alt="GIF showing the effect of Sketch's bottom alignment on a big headline and a small headline"
    src="sketch-align-bottom.gif"
}}

In all of these examples, you could “eyeball” it, squinting your eyes or zooming in until things look *right*. Eyeballing comes with some notable downsides however:

- **Translation** - eyeballing leads to a lot of seemingly random values for spacing/margins. Say, `margin: 27px 0 18px`. If you’re not building the designs yourself, it’s easy for a developer to make a mistake when copying values from Sketch. And if you work on a team with other designers, sticking to a spacing convention (like an [8pt grid](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632)) becomes next to impossible.
- **Maintenance** - even if all the spacing values make it into code successfully, it’s easy to accidentally break them with future code changes.
- **Flexibility** - if the size, line height, or typeface ever changes, you have to carefully eyeball everything again.

Font metrics enable us to build smarter tools. They are the key to open the bounding box, exposing the beautiful typographic anatomy inside. For example, if Lato.ttf is the selected font, font metrics tell us the distance from the baseline to the cap height. Vertically center that and you’ll never need to eyeball text to an icon again.

{{> post-figure--img
    alt="A square icon (left) and text (right), annotated to show 20px above the cap height and 20px below the baseline. It looks perfectly centered to the icon"
    src="metrics-align-center.png"
}}

Our layout systems can also take advantage of font metrics. If the icon needs to increase in size or the text decreases in size (like if your users have adjusted the [base font size](https://support.mozilla.org/en-US/kb/font-size-and-zoom-increase-size-of-web-pages#w_how-to-only-change-the-size-of-the-text) in their browser), your design intent is perfectly preserved.

{{> post-figure--img
    alt="GIF showing vertical centering being perfectly preserved while the text and icon both change size"
    src="metrics-dynamic-align-center.gif"
}}

The same benefit applies if the font changes (maybe your web font failed to load, or you’re using a [system fonts strategy](https://css-tricks.com/snippets/css/system-font-stack/)).

{{> post-figure--img
    alt="GIF showing vertical centering being perfectly preserved while the text's font changes"
    src="metrics-system-font-align-center.gif"
}}

Once your typographic intent is communicated, layout systems can preserve it with font metrics. Writing code becomes easier too—no more `align-self: flex-start; margin-top: 13px;` to perfectly center the text. If CSS exposed font metrics via a property, like [leading-trim](https://github.com/w3c/csswg-drafts/issues/3240), the layout engine could take care of everything for you.

```css
.icon-label {
    align-self: center;
    /* shrink the bounding box to the cap height through the ideographic baseline */
    leading-trim: cap ideographic;
}
```

## What’s next?

It’s hard to get excited over CSS features that don’t exist and features that aren’t implemented. But don’t despair! In the next article, I’ll explore how exactly to extract and read the font metrics for your fonts. Once you have the raw data, I’ll explain the math behind using them in layout, and how they can be useful in today’s in HTML and CSS.

## Further reading

Font metrics are a low-level implementation detail, but they’re far from boring. If you’re interesting in learning more, check out some of these fantastic resources. And if `leading-trim` sounds like a compelling CSS feature, check out [CSSWG #3240](https://github.com/w3c/csswg-drafts/issues/3240).

- [Deep dive CSS: font metrics, line-height and vertical-align](http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align) by Vincent De Oliveira
- [Get Down to the Nitty-Gritty of Text Rendering in Sketch](https://journal.yummygum.com/get-down-to-the-nitty-gritty-of-text-rendering-in-sketch-cd49f0544e20) by Yakim van Zuijlen
- [fontmetrics.com](http://fontmetrics.com/)
- [Understanding the First Baseline Position of Text](https://indesignsecrets.com/understanding-the-first-baseline-position-of-text.php) by Mike Rankin
    - It’s worth noting how our design tools of old (InDesign, Illustrator) expose richer font metrics control than today’s modern tools