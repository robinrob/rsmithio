---
layout:     post
title:      Opening web URLs from the command-line
subtitle:   A ZSH function for quickly opening URLs
date:       2018-03-16
type:       Blog Post
published:  true
---


Peter Stephenson's [*A User's Guide to the Z-Shell*](http://zsh.sourceforge.net/Guide/zshguide.html) is a great way to learn about the Z-Shell in detail. I went through most of it a few years ago, interested to see what I would find through this exploratory method of learning - as opposed to looking something up specifically to achieve a certain task.

Having never studied the features of any shell environment in detail, I learned about many interesting and useful features of the Z-Shell, some specific to Z-Shell and some not.

I [mentioned before](blog/personal-automation-as-code-practice) that through learning about ZSH and a desire for automation I have used it extensively to automate lots of things, and really use the command-line as a multi-purpose tool in general life for digital tasks as well as in work.

Because I was resorting to the command-line so habitually for everything, I'd sometimes find myself pasting web URLs onto the command-line in the hope of opening them up in a web browser! Of course I'd get the "command not found" message and feel silly. But one day I thought it would be a cool challenge to see if I could find a way to reliably open up URLs like this, whilst not messing up ordinary command-line functionality.

The thought was partially inspired by the fact that I'd already customised the error message that is printed when a bad command is printed. When I type a wrong command I see:

<pre><code class="plaintext">robin@mercury ~/ ⚡  i_am_an_idiot
zsh: command not found you nutter!: i_am_an_idiot</code></pre>

This response is customised by implementing the `command_not_found_handler` function in Z-Shell.

Mine is:

<pre><code class="shell">command_not_found_handler () {
	local +r Command=$1
	if $(is_http_url $Command)
	then
		safari $Command
	else
		print "zsh: command not found you nutter!: $@"
	fi
}</code></pre>

Where the `is_http_url` function is just:

<pre><code class="shell">is_http_url () {
	local +r String=$1
	[[ $String[1,4] == 'http' ]] && return 0 || return 1
}</code></pre>

And the `safari` function:

<pre><code class="shell">safari () {
	open -a Safari $1
}</code></pre>

I am specifically using Safari for these URLs just because I found I am most of the time wanting to open an article with lots of text to read, and I love using the Reader feature of Safari for that.

It's a simple enough solution but one that works reliably and that I use all the time.
