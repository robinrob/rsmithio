---
layout:     post
title:      "Fast Javascript Variable Debugging"
subtitle:   "Useful code snippet to help with fast debugging"
date:       2015-08-25
---

Note: when debugging Javascript in the browser, it's usually best to just use the Chrome dev tools for this!

Besides using a browser's dev tools whilst debugging Javascript, you still may find yourself needing to quickly print
the contents of an object out to the console. You may be writing a short Node script in a text editor for example.
Printing out the contents of an object involves typing something like the following - for example to display the
contents of the object referenced by variable `myVar`:

<pre><code class="javascript">console.log('myVar: ' + JSON.stringify(myVar, null, '\t'))</code></pre>

This is a pretty unwieldy line and when debugging an unfamiliar piece of code you could waste a lot of time typing or even
copy-pasting this and subsequently modifying it.

Since I use the command-line and my ZSH environment as a swiss-army knife in all that I do, I
wrote a quick little shell function to do the work of constructing the above useful snippet:

<pre><code class="zsh">function console_log_json () {
	local +r Variable=$1
	
	copy_print "console.log('$Variable: ' + JSON.stringify($Variable, null, '\	'))"
}
</code></pre>

Where `copy_print` is the following shell function (requires `pbcopy` and `pbpaste` programs):

<pre><code class="zsh">function copy_print () {
	# printf is necessary here because print does not print a string containing only
	# the character '-', no matter how many times the string contains it.
	printf $@ | pbcopy && pbpaste
}
</code></pre>

The workflow goes like this:

1. See a variable that you'd really like to check the contents of when you run your app, e.g. `myVar`
2. Switch focus to the terminal (I use a hot-key: cmd + caps-lock)
3. Type `console_log_json` (or alias of - i use `logj` for example) then name of variable: `logj myVar`
4. Switch focus back to the editor and paste the snippet which should be in the clipboard: `console.log('myvar: ' + JSON.stringify(myvar, null, '\t'))`

This is pretty snappy when you need it! And can be made arbitrarily complex or 'pretty' of course.

The point of this post is to demonstrate the fun of automating out repetetive actions that you may find yourself making,
and the usefulness of the command-line plus shell environment in this.
