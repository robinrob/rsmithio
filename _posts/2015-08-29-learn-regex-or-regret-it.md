---
layout:     post
title:      "Learn Regex or Regret It"
subtitle:   "My view on the fun of learning how to use Regular Expressions"
date:       2015-08-29
---

Do you like challenging logic puzzles? Games that give you a set of root principles then offer up increasingly hard
problems that require ever-more creative ways of using the root principles to solve?

I do and, once I actually sat down to dedicate some time to the pure learning of the subject of regular expressions, the
above viewpoint is the way in which I came to view this learning process. Learning how to use regular expressions is an exercise of
applying the known rules of the game to situations that require your creativity, logical thinking and intuition to solve.

Like all things that are difficult to do well, if you can make the process of doing something into a game you will perform
much better. The task of solving regex problems is a <em>perfect</em> candidate for game-making!

If you only reach this stage in your appreciation of regular expressions then you may already find great value in them. But they
are also among one of the few truly powerful tools available to programmers that transcend programming language, framework
or project that you are working on. If you find Javascript to be a language worth learning because of it's popularity
and relevance - a mere programming language, or AngularJS a framework worth learning because it's popular at the
moment - then you should logically view a tool like regular expressions as being of great importance and relevance in your profession.

Regular expressions have been around for decades and have changed little in their basic philosophy and syntax. Yes there
may be several varying syntaxes around, but these variations are much less than those between programming languages and the root philosophy
does not change with syntax, unlike between programming languages such as Python or Ruby.

More important than any of the above great reasons for learning regular expressions, the fact remains that they
are an incredibly powerful and efficient way of solving certain types of text-reading and text-manipulation problems.
To take a simple example let's say that you want to read in some user input to specify an IPv4 address such as: '123.255.0.10'.
You would like to ensure that the value that they have entered is valid before they submit it. It is not obvious how you would solve this elegantly
without using a regular expression. How much code would it take? Let's spell out the details of the puzzle by specifying
what sort of input we would accept as an IPv4 address:

1. It must consist of four groups of numerical digits separated by a period
2. Each group of digits must consist of 1-3 numbers
3. Each group of numbers must represent a decimal integer with a value within the range 0 to 255 (octet)

I'm not sure how much code that would take using whatever useful string manipulation functions you have available in
your programming language of choice, but here is a regular expression solution to solve the problem, using the Ruby
programming language:

<pre><code class="ruby">#!/usr/bin/env ruby

# Match a single octet component of the address ('0' to '255')
octect = /
# Single digit from 0-9 OR ...
\d |

# ('0' or '1') (optional) followed by any two digits from 0-9 OR ...
[01]?\d\d |

# '2' followed by single character from 0-4 OR ...
2[0-4]\d |

# '25' followed by any character from 0-5
25[0-5]
 /x

# Match a complete IPv4 address ('octect.octect.octet.octet')
ipv4 = /
# Beginning of line followed by ((`octect` followed by period) three times)
^(#{octect}.){3}

# Single occurence of `octect` followed by end of line
#{octect}$
/x

puts '123.255.0.10'.match(ipv4)
</code></pre>

We could have been negligent and instead written this as the solution:

<pre><code class="ruby">#!/usr/bin/env ruby

octect = /\d|[01]?\d\d|2[0-4]\d|25[0-5]/

puts '123.255.0.10'.match(/^(#{octect}\.){3}#{octect}$/)
</code></pre>

Or stupendously negligent and written this:

<pre><code class="ruby">#!/usr/bin/env ruby

puts '123.255.0.10'.match(/^((\d|[01]?\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[01]?\d\d|2[0-4]\d|25[0-5])$/)
</code></pre>

But part of the art of writing regular expressions - as with regular programming code - is in the presentation!

I feel that regular expressions only appear difficult and unwieldy because of prior experience of badly-presented
or poorly-written regular expressions. As with any code, regular expressions may be composed of manageable pieces that can separately be understood without
too much difficulty by most people.

Regular expression composition is not hard to learn if you are capable of learning a programming language - there are not
many rules to learn in order to become useful with them.

Build your own personal library of regular expressions, and paste them into your code where needed. Mastery of this
elegant approach to this type of programming problem is one way to stand out from the crowd.