---
layout:     blog_post
title:      Python 3.6 String Interpolation
subtitle:   Python 3.6 introduces a new Ruby-style string interpolation
date:       2018-01-14
type:       blog_post
published:  true
---

If you're one of those Ruby/Python purists look away now.

I first learned about this new Python 3 syntax for string interpolation around six months ago, and since then I've barely used it because I hadn't used it enough to remember the syntax — isn't that frustrating? And since it's recent, Googling for it wasn't returning much either — I hadn't actually realised this feature was unique to versions 3.6 onward, so I wasn't looking in the correct documentation versions.

Essentially Python 3.6 introduces a new form of string interpolation that is similar to the way one can embed the values of variables into strings in Ruby. I've always enjoyed using that feature in Ruby so it's great that Python 3 has adopted it.

This is the feature in Ruby I'm talking about:
<pre><code class="ruby">msg = "Hello at last!"
puts "#{msg}"
</code></pre>

And this is the same example using the new syntax in Python 3.6:
<pre><code class="python">msg = "Hello at last!"
print(f"{msg}")
</code></pre>

Output:
<pre><code class="bash">>> Hello at last!
</code></pre>

Which I find to be a lot nicer than my previously-preferred method in Python:
<pre><code class="python">"{msg}".format(msg=msg)
</code></pre>

In most situations at least.