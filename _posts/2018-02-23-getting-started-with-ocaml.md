---
layout:     post
title:      Getting started with OCaml
subtitle:   Learning a fully-functional language
date:       2018-02-12
type:       Blog Post
published:  true
---

I've started learning OCaml, so I'm sharing reasons why I think OCaml is a great language for experienced developers
to learn, and why I like it.

This is going to be brief, but it's just meant to be a quick intro to OCaml and a taster of the syntax. For me, it was
enough to get me curious about the language.

## What is OCaml
[OCaml](https://ocaml.org) is a functional programming language with a concise syntax, specifically designed for ease-of-use in real world
situations.

Uptake of functional programming ideas has definitely been on the rise lately, as evidenced by for example the latest few updates
to both [EcmaScript](http://es6-features.org/#Constants) and [Java](http://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html),
and software development discussions in general in places like Hacker News.

### ReasonML
I think another very significant development in the uptake of functional programming has been the creation of
[ReasonML](https://reasonml.github.io). Created by Facebook, ReasonML is essentially OCaml that can be compiled into
JavaScript - JavaScript is increasingly becoming a compilation target for other languages. See this [Quora thread](https://www.quora.com/What-is-ReasonML)
for more detail.

ReasonML solves a similar need for precision in Javascript ecosystems that [TypeScript](https://www.typescriptlang.org) goes some way towards solving (by adding a strong
 typing system), but goes further. This [Stackoverflow discussion](https://stackoverflow.com/questions/46147250/reasonml-vs-typescript)
 gives a good comparison of ReasonML and TypeScript.

## Ocaml code examples
First things first:

<pre><code class="ocaml">Printf.printf "Hello World!\n" ;;</code></pre>

### Double-semicolons! ';..;'
So, the above code example is self-explanatory as all Hello Worlds should be, but you'll notice the presence of not just one semicolon at the end
but *two*. As a fan of *no* semicolons, this definitely surprised me. Supposedly you don't need it at all (it was meant to
be optional), and technically
it should really go at the *beginnings* of lines. [This discussion](https://discuss.ocaml.org/t/double-semicolon-peculiarity/1261)
is helpful.

Some key points on semicolons in OCaml:

* The double-semicolon in OCaml is absolutely necessary when typing commands into
  [utop](https://opam.ocaml.org/blog/about-utop/) (OCaml's interactive shell).
* Putting the double semi-colon at the beginnings of lines puts the indentation of code out.
* Most of the time, leaving
out the double-semicolon is actually fine. But, like how JavaScript *mostly* works fine without semicolons, it's not
actually perfect and when it catches you out it's the last thing you suspect.

I therefore recommend *always* putting the
double-semicolon on the ends of lines. This [article](https://caml.inria.fr/pub/docs/tutorial-camlp4/tutorial005.html)
goes into more detail on this, but that's enough about semicolons! Let's just say that semicolons are probably not ideal
if you're like me, but not a deal-breaker for the language.


### Functions
Defining a function (that checks whether a given integer is even or odd):
<pre><code class="ocaml">let even x = x mod 2 = 0 ;;</code></pre>

output in `utop`:

```plaintext
val even : int -> bool = <fun>
```


Calling a function:
<pre><code class="ocaml">even 4 ;;</code></pre>

output in `utop`:

```plaintext
- : bool = true
```


### Pattern-matching, case analysis and nulls
OCaml is a statically-typed language with *minimal* syntax. I used to be under the impression that static typing
necessarily came along with a lot of extra syntax, but OCaml's use of '[type inference](https://en.wikipedia.org/wiki/Type_inference)
along with its minimalist syntax combine to allow you to write terse code even whilst gaining the benefits of static type
checking, plus more.

Let's try a more complicated function. Compare these two example definitions of a `sum` function written in Python
(avoiding use of built-in functions) and OCaml:

<pre><code class="python">def sum(list):
    sum = 0
    for num in list:
        sum += num
    return sum
</code></pre>

<pre><code class="ocaml">let rec sum list =
    match list with
    | [] -> 0
    | first :: rest -> first + sum rest
;;
</code></pre>

In English, the OCaml example is saying:

*  `sum` is a recursive function that takes one argument `list`
*  Match the input argument `list` with the following cases:
    *  When `list` is an empty list, return 0
    *  In all other cases, sum the first element with the remainder of the list

Since null values [do not exist](https://ocaml.org/learn/tutorials/null_pointers_asserts_and_warnings.html) in OCaml,
we have explicitly handled all cases. This example illustrates OCaml's use of
[pattern matching](https://en.wikipedia.org/wiki/Pattern_matching)
to do [case analysis](http://www2.lib.uchicago.edu/keith/ocaml-class/pattern-matching.html). I think this code example is
really cool, for the amount that's being expressed in such a small amount of code, and in a clear way.

To take a mental rest - an unexpected feature of OCaml is the ability to add underscores to long number literals
*to improve readability*:

<pre><code class="ocaml">let big_num = 123_456_789 ;;</code></pre>

output in `utop`:

```plaintext
val x : int = 123456789
```

Arguably not that useful, but quite nice and it demonstrates OCaml's commitment to reducing human errors in code, and
prioritising expressiveness. It's such exotic syntax in fact that the Rouge-powered syntax-highlighting in that example
is a bit off.

## OCaml editor support
What is the tooling support for OCaml like? Whilst I usually use IntellIJ for everything, the support for OCaml is not
great, so for OCaml I'm using [VS Code](https://code.visualstudio.com) with this [ReasonML](https://github.com/reasonml-editor/vscode-reasonml)
 plugin. The Atom editor also appears to have a popular [OCaml package](https://atom.io/packages/language-ocaml).

The vscode-reasonml plugin gives some cute-looking camel icons to the `.ml` files:

<img src="/img/vscode_ocaml.png"></img>

As an aside, I was pleased to see that [Rouge](https://github.com/jneen/rouge), the syntax-highlighting plugin used in this blog,
supports OCaml syntax, hence the nicely-looking code snippets in this post.

## Are companies using OCaml?
This is a really nice [presentation/lecture](https://www.youtube.com/watch?v=v1CmGbOGb2I) on OCaml by an employee of Jane Street
(and where I stole the `sum` example from). There's a lot of useful insights in there. He describes how choosing to use OCaml does limit the number of potential
employees to almost zero.


## Conclusion
It feels to me like a natural conclusion to the increasing uptake of functional programming and the need for horizontally-
scalable applications, is going to be that true functional languages like OCaml will become mainstream. There really is
a lot going for them, so it makes sense to start becoming familiar with them now.

At the very least, if you just enjoy learning programming languages and want to try something different to the usual
mainstream languages, and increase your awareness of functional programming styles, then OCaml is really worth spending
a bit of time on.