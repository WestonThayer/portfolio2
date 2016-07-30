---
template: post.hbs

section:
    work: true
title: Welcome experience
description: Final touches on Cortana's entrance.

featureImgBase: "/assets/features/cortana-assets/cortana"
featureImgExt: ".png"
featureImgSrc: "/assets/features/cortana-assets/cortana.750w.jpg"

asideLabel1: role
asideList1:
    - Frontend development
asideLabel2: product
asideList2:
    - Cortana
---

In Windows 10, Cortana makes her debut in the taskbar. I coded the final polish for the setup experience.

{{> post-figure--video
    src="lift.mp4"
    poster="lift.png"
    loop="true"
    caption="Press and hold with your finger to lift an item, release to drop it."
}}

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
