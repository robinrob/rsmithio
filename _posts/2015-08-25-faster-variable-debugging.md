---
layout:     post
title:      Faster Variable Debugging
subtitle:   Useful code snippets to help with faster debugging
description: "A straightforward technique to add a bit of automation into a common debugging step"
date:       2015-08-25
type:       blog_post
---

Sometimes (pretty often) when debugging code you just want to quickly print the contents of a variable to the standard output. In full-on dev mode you may have additional debugging tools available, e.g. the web browser dev console when debugging front-end code, or a debug tool built into your IDE for server-side debugging (like IntelliJ IDEs). You should definitely be more sophisicated with your debugging approach when possible.

However sometimes you are just writing some quick Bash or ZSH code, or you're not using a full-on IDE because you just wanted to quickly open a lightweight editor. In these cases you might find yourself typing too many print statements in whatever language you are using, the typing of which all adds up in time lost.

I use my terminal extensively for little time-saving pieces of automation, that over the course of a day can have a big impact on your efficiency. I once wrote a set of ZSH functions to automate typing out print statements, for a few different languages. The functions take a variable name as an argument and output the code required to print out some information about that variable.

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

You get the idea. Usage is simple, like this (here using an alias `logpo` for `log_python_object`)

<pre><code class="zsh">⚡ logpo my_var
import simplejson as simplejson; print 'my_var: {json}'.format(json=simplejson.dumps(my_var, indent=4))%
</code></pre>

The above printed snippet is then in the clipboard and you can just paste it into the code where you want it, which of course
prints when run:

<pre><code class="python">my_var: {
    "age": 28,
    "name": "Robin"
}</code></pre>

This is not very sophisticated but can serve as a reminder that some things are worth automating, and can be a fun little side-task. It's also a nice way to help with learning ZSH
and with discovering command-line tools.