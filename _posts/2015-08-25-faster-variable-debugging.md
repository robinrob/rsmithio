---
layout:     blog_post
title:      Faster Variable Debugging
subtitle:   Useful code snippets to help with faster debugging
description: Blog Post: Faster Variable Debugging - Straightforward technique to add a bit of automation into a common debugging step
date:       2015-08-25
type:       Blog Post
---

Almost inevitably whilst debugging code, regardless of any additional tools that you may have available (e.g.
browser development tools when debugging front-end code), it can be desirable to quickly print the contents of a
variable to the program output. Maybe you don't have the time to learn how to use a more comprehensive tool in that moment,
or doing so would actually take more time. You can find yourself repetitively typing the same mundane set of characters
out that results in printing something in the language that you happen to be using.

I use my terminal extensively for little time-saving pieces of automation, that over the course of a day can have a big
impact on your efficiency. One example is a set of short commands for printing things out in various languages:

## Javascript

### `js_log`
<pre><code class="javascript">copy_print "console.log('$(upper $*)')"</code></pre>

### `copy_print` (ZSH function)
<pre><code class="zsh">copy_print () {
	printf $@ | pbcopy && pbpaste
}</code></pre>

### `upper` (ZSH function)
<pre><code class="zsh">upper () {
	print $@:u
}</code></pre>

### `js_log_object`
<pre><code class="javascript">console.log('myVar: ' + JSON.stringify(myVar, null, '\t'))</code></pre>


## Python

### `python_log`
<pre><code class="python">python_log () {
	copy_print "print '$(upper $*)'"
}</code></pre>

### `python_log_var`
<pre><code class="python">python_log_var () {
	copy_print "print '$1: {var}'.format(var=$1)"
}</code></pre>

### `python_log_object`
<pre><code class="python">python_log_object () {
	copy_print "import simplejson as simplejson; print '$1: {json}'.format(json=simplejson.dumps($1, indent=4))"
}</code></pre>

You get the idea. Usage is simple, like this (after hot-keying to your terminal window and here using an alias `logpo` for `log_python_object`)

<pre><code class="zsh">⚡ logpo my_var
import simplejson as simplejson; print 'my_var: {json}'.format(json=simplejson.dumps(my_var, indent=4))%
</code></pre>

The above printed snippet is then in the clipboard and you can just paste it into the code where you want it, which of course
prints when run:

<pre><code class="python">my_var: {
    "age": 28,
    "name": "Robin"
}</code></pre>

There is fun in automating out repetitive actions that really bring down your day. It's also a handy way to learn ZSH
and discover command-line tools.