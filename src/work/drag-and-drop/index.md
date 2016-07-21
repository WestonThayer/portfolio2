---
template: post.hbs

section:
    work: true
title: Drag and drop
description: A redesign of drag and drop for Windows 10.

featureImgBase: "/assets/features/drag-and-drop-assets/drag-and-drop"
featureImgExt: ".jpg"
featureImgSrc: "/assets/features/drag-and-drop-assets/drag-and-drop.750w.jpg"

asideLabel1: role
asideList1:
    - Interaction design
    - Motion
    - Prototyping
asideLabel2: product
asideList2:
    - Windows 10
---

A redesign of drag and drop for Windows 10 to bring the magic back to one of Window's original features.

{{> post-figure--video
    src="lift.mp4"
    poster="lift.png"
    loop="true"
    caption="Press and hold with your finger to lift an item, release to drop it."
}}

Elegant transitions give touch users clear indication of when they can drag. Responsive reorder animations provide clarity and a degree of delight to the interaction.

Rapidly iterating on high-fidelity prototypes was essential to discovering the best solution. Framer was my tool of choice.

{{> post-framer-btn href="http://reddit.com" }}

{{> post-figure--video
    src="folders.mp4"
    poster="folders.png"
    loop="true"
    caption="Bookmarks can be reordered or dropped into a folder."
}}

{{> post-figure--video
    src="multiple.mp4"
    poster="multiple.png"
    loop="true"
    caption="Multiple items can be dragged, even reordered"
}}
