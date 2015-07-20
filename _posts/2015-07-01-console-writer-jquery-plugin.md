---
layout:     post
title:      "ConsoleWriter JQuery Plugin"
subtitle:   "Console-style inline element editing using JQuery"
date:       2015-07-01
---

<h2 class="console-writer" cw-sound="true" cw-animation="true">Edit Me!</h2>
I wanted to create a console-like typing effect on a heading element, with the heading firstly 
appearing character by character as if being typed in at a developer's console. This sort of thing has already been done
as in <a href="http://www.mattboldt.com/demos/typed-js/">Typed.js</a>,
<a href="http://codepen.io/voronianski/pen/aicwk">typeWriter.js</a> or
<a href="https://github.com/fardjad/realistic-typewriter.js">realistic-typewriter.js</a>. As with most ideas in the JS
world or software world, it is fair to say that this idea has been done before.

My main motivation for the project was to gain familiarity with using JQuery and I believe that embarking on a pet
project is the best, most fun and most productive way to learn a new programming language or framework. 

<p>The main thing I wanted to achieve was actually to allow the site visitor to modify the heading element by focusing it,
deleting existing characters and typing whatever they wanted into the element, complete with a blinking cursor at the end
of the line as in a terminal. I also added keyboard typing sounds to heighten the effect. Try it now by clicking any of
the headings within this blog article.</p>

<h2 class="console-writer" cw-typing-sound="true">ConsoleWriter</h2>
I packaged the code up into a JQuery plugin:
<a href="https://github.com/robinrob/consolewriter.jquery.js">Inline-Editor</a>, designed with a focus on user-friendliness
and configurability using options. The heading "ConsoleWriter" above this paragraph shows the idea, using the default
method of usage which requires just adding the `console-writer` class to the element. Reload the page
again to see the typewriter effect. You can modify the heading's contents by focusing the heading and typing.
Other demos can be viewed in the demo HTML file included with the project.

