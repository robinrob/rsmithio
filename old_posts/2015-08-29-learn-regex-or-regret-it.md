---
layout:     blog
title:      Learn Regex or Regret It
subtitle:   My view on the fun of learning how to use Regular Expressions
date:       2015-08-29
type:       blog_post
---

Do you like challenging logic puzzles? Games that give you a set of root principles then offer up increasingly hard
problems that require ever-more creative ways of using the root principles to solve?

I do, and once I actually sat down to dedicate some time to the subject of regular expressions, the
above viewpoint is the way in which I came to view this learning process. Learning how to use regular expressions is an exercise of
applying the known rules of the game to situations that require your creativity, logical thinking and intuition to solve.

With all things that are difficult to do well, if you can make the process of mastering it into a game you will perform
much better. The task of solving regex problems is a <em>perfect</em> candidate for game-making!

If you only reach this stage in your appreciation of regular expressions then you may already find great value in them. But they
are also among one of the few truly powerful tools available to programmers that transcend programming language, framework
or project that you are working on. If you find Javascript to be a language worth learning because of its popularity
and relevance - a mere programming language, or AngularJS a framework worth learning because it's popular at the
moment - then you should logically view a tool like regular expressions as being of great importance and relevance in your profession.
Regular expressions have been around for decades and have changed little in their basic philosophy and syntax.

More important than any of the above great reasons for learning how to use regular expressions, the fact remains that they
are an incredibly powerful and efficient way of solving certain types of text-reading and text-manipulation problems.
To take a (simplified) example that is well-suited to the application of a regex solution: let's say that you want
to read in some user input to specify the first line of an address, which must be a number followed by alphabetical
strings of characters, e.g. '41 Princes Street'. Furthermore, each alphabetical string must have its initial
character capitalised. So '41 123 Princes Street' would be invalid, as would '41 princes Street' or '41 Princes123 Street'. 

Let's first solve the problem without using a regex. You may write some code like this (for example in Python):

<pre><code class="python">#!/usr/bin/env python

import sys

address = sys.argv[1]

parts = address.split(' ')

try:
    house_number = int(parts[0])
    street = parts[1:-1]

    for street_part in street:
        assert street_part.istitle() and street_part.isalpha()

    print 'Valid address!'

except Exception as e:
    print 'Invalid address'
    
</code></pre>

An equivalent script using a regex method might go like this:

<pre><code class="python">#!/usr/bin/env python

import sys, re

address = sys.argv[1]

regex = re.compile('\A[0-9]+ ([A-Z][a-z]+\ ?)+\Z')
res = regex.match(address)

if hasattr(res, 'group'):
    print 'Valid address!'
    
else:
    print 'Invalid address'

</code></pre>

The regular expression says: match a string with the following properties:

- Begins with a string of one more more digits
- The initial string of digits is followed by a space character, then one or more of: (alphabetical string with capitalised initial character, optionally followed by a space character)
- The string ends on the last of the occurrence of (alphabetical string with capitalised initial character, optionally followed by a space character)

For this particular example with the given constraints on the format of the address I would prefer the regular expression
solution, as it expresses very concisely the conditions being imposed for validity of the input. For me it is a lot
easier to write and to read and therefore easier to get right and to not make mistakes. It also utilises a neat aspect
of regular expressions: recursive matching of a sub-expression (the alphabetical strings following the number in the address
line).

Not every instance of any given type of problem is best solved using any particular tool, and this is true with regular 
expressions. A judgement must be made based on many factors and constraints on which is the best method to use to solve the problem,
where 'best' is defined by a lot of factors specific to the problem and the environment and circumstances in which it is being solved.
Regular expressions are just one additional tool that you have available for consideration when making this decision.

The reason why I think that it would be regretful not to learn how to use regular expressions, is that since making the
effort to learn how to use this tool, I have personally encountered many situations where they have been a priceless tool, saving
me time and frustration, and giving a feeling of satisfaction when the correct regex for a problem is discovered! It's
not often that such a simple, short string of characters can give such power.