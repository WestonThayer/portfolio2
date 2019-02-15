---
template: post.hbs

section:
    writing: true
title: A Response to Analysis Paralysis
showSubscribe: true

asideLabel1: published
asideList1:
    - February 12, 2016
---

The *[I'm a web developer and I've been stuck with the simplest app for the last 10 days](https://medium.com/@pistacchio/i-m-a-web-developer-and-i-ve-been-stuck-with-the-simplest-app-for-the-last-10-days-fb5c50917df#.embpeepov)* Medium post gained a lot of attention on HN and [/r/programming](https://www.reddit.com/r/programming/comments/458udn/im_a_web_developer_and_ive_been_stuck_with_the/) yesterday. The article is in no way unwarrented or off-base, I can sympathize. However, I want to address the two reoccuring themes from the comments:

* "Well you should try **X** framework!"
* "Bah, all these libraries are to save you 20 keystrokes. Just use raw JS!"

While neither of those comments are completely disagreeable, they forget the big picture. Using raw JS may end your paralysis, but is it *always* the best choice?

Most sucessful frameworks and tools exist and prosper not because they saved you keystrokes or they just wanted to do something different for the hell of it. They exist because the vanilla technologies used for webdev (HTML/CSS/JS) make it hard to follow some very important principals:

1. [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
2. [Avoid globals](http://c2.com/cgi/wiki?GlobalVariablesAreBad)
3. [Encapsulate](http://stackoverflow.com/questions/18300953/why-encapsulation-is-an-important-feature-of-oop-languages)

[HTML](http://stackoverflow.com/questions/7696955/how-to-create-dry-html) and [CSS](http://alistapart.com/article/why-sass) sometimes can't accomplish being DRY. [CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284#.igsnzzjbz) and [JS](http://requirejs.org/docs/why.html) are both bad at avoiding globals. CSS is [particularly horrid](https://github.com/Wolfr/css-encapsulation-today) at encapsulation.

Ignoring these principals is fool hearted. They're hard learned lessons from decades of programming experience. For example, encapsulation eliminates an *entire class of bugs*! Those bugs will bite you regardless of your project's size, and they'll only become more aggressive as it grows.

Successful frameworks and tools often got there by making it easier to follow your principals. To name a few: Sass and Handlebars keep it DRY, Webpack and Browserify keep it non-global, React and Web Components help encapsulate.

To conclude, I encourage you to make an honest list of the principals that *you* value. Ask yourself how important each is and what's the easiest way to adhere? Sometimes the easiest answer might be to use a tool. Other times, it might just be to learn how prototypical inheritance works in Javascript. The important thing is to put your principals first, tools second.

> Great minds discuss principals. Average minds discuss technologies. Small minds discuss tools. -- [Brad Frost](http://bradfrost.com/blog/post/i-have-no-idea-what-the-hell-i-am-doing/)
