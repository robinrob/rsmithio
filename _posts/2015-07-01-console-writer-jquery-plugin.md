---
layout:         blog_post
title:          ConsoleWriter jQuery Plugin
subtitle:       Console-style inline element editing using jQuery
description:    "A jQuery plugin for adding a typewriter effect to HTML elements and interactively editing element text"
date:           2015-07-01
type:           blog_post
---

<h2 class="console-writer" cw-sound="true" cw-animation="true">Edit Me!</h2>
I wanted to create a console-like typing effect on a heading element, with the heading firstly 
appearing character by character as if being typed in at a developer's console. This sort of thing has already been done
as in <a href="http://www.mattboldt.com/demos/typed-js/">Typed.js</a>,
<a href="http://codepen.io/voronianski/pen/aicwk">typeWriter.js</a> or
<a href="https://github.com/fardjad/realistic-typewriter.js">realistic-typewriter.js</a>. As with most ideas in the JS
world or software world, it is fair to say that this idea has been done before.

My main motivation for the project was to gain familiarity with using jQuery and I believe that embarking on a pet
project is the most fun and productive way to learn a new programming language or tool. 

The main feature that I wanted to implemented with the project was to allow the site visitor to modify the heading element by focusing it,
deleting existing characters and typing whatever they wanted into the element, complete with a blinking cursor at the end
of the line, as if they were typing on a command line. I added keyboard typing sounds to try to heighten the effect. Try it now by clicking any of
the headings within this blog article.

<h2 class="console-writer" cw-typing-sound="true">ConsoleWriter</h2>
I packaged the project up as a jQuery plugin: <a href="https://github.com/robinrob/console-writer.git">ConsoleWriter</a>,
designed with a focus on user-friendliness and configurability using options.

The project can be installed through Bower using the following command:

<pre><code class="bash">bower install console-writer</code></pre>

The heading above this paragraph displays the default method of usage which requires
just adding the `console-writer` class to the element. Reload the page again to see the typewriter effect. The `README`
file included in the repo describes the options and how to set them. There is also a `demo.html` file which shows
example usages.