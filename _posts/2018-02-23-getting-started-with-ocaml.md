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

## Functional programming languages
What is a functional programming language? No single factor goes into deciding whether a programming language is 'functional'.
Some languages have functional features that are used in combination with [imperative](https://en.wikipedia.org/wiki/Imperative_programming) features (e.g. Python, Javascript).
Languages have differing amounts of functional features, and some languages are just easier than others to program functionally with,
and therefore are more often used in that way. I'd consider these things to make a functional programming language:

* It has language features that support programming in a functional style, most importantly: first-class functions, i.e.
functions that can be used as a basic unit of abstraction, can be passed around like data, and use function scope (i.e. closures).
* The language makes it easy to program using 'pure' functions - functions that do not cause any side-effects, but take
 immutable inputs and return immutable outputs.
* Programming in a functional way is natural in the language. There is less value in having functional language features
in a language with the intention of making it functional, if there is a large amount of syntax required for this style,
 or the constructs are somehow awkward, or readability is seriously compromised, as opposed to programming imperatively
 in that language.

If a language *only* supports programming in a functional way, we can say that it is a 'pure functional' language.

One of the goals of all functional programming languages is to increase predictability and therefore robustness of code.
In some ways the pattern of thinking required to understand algorithms coded functionally can feel less intuitive
than considering the imperative equivalents. For example, when counting things in real-life, say a handful of coins,
we are physically iterating over the collection with our eyes, and maintaining a variable with the count in our heads, which
is incremented as we count. The functional equivalent doesn't even make sense in that way in the real-world, but is a
more abstract, mathematical way of thinking about a process.

This is not to say that functional programming should be seen as harder than other methods, because you could imagine
that given similar levels of practice and habituation, you may become equally proficient at any method of programming.
The biggest 'barriers' to functional programming may be cultural popularity and understanding of it. For example it is
easy to imagine the objections of a business to using a 'pure' functional language currently - it would be much harder
to find employees for one thing. So naturally there's a large inertia to change once a particular system of thought
becomes culturally dominant.


## What is OCaml
[OCaml](https://ocaml.org) is a [mostly pure](https://ocaml.org/learn/tutorials/functional_programming.html) functional
programming language with a concise, clean syntax, specifically designed for ease-of-use in real world
situations.

Uptake of functional programming ideas can be said to have been on the rise lately, as evidenced by for example the latest few updates
to both [EcmaScript](http://es6-features.org/#Constants) and [Java](http://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html),
and software development discussions and articles in general within the community.

The creation of
[ReasonML](https://reasonml.github.io), may be seen as another significant step towards uptake of functional programming.
Created by Facebook, ReasonML is essentially ... - JavaScript is increasingly becoming a compilation target for other languages.

ReasonML solves a similar need for precision in Javascript ecosystems that [TypeScript](https://www.typescriptlang.org) goes some way towards solving (by adding a strong
 typing system), but goes further. This [Stackoverflow discussion](https://stackoverflow.com/questions/46147250/reasonml-vs-typescript)
 gives a good comparison of ReasonML and TypeScript.


## OCaml Basics

### Installation and Utop and semicolons
All the code examples here are meant to be paste-able into [utop](https://opam.ocaml.org/blog/about-utop/). Utop is
OCaml's interactive shell. I recommend going through [this](https://github.com/realworldocaml/book/wiki/Installation-Instructions)
to get OCaml and Utop set up.

All of the code examples feature double-semicolons at the ends of expressions. These are necessary when the expressions
in this form are pasted into Utop. However in normal programming in OCaml they are not necessary. The full understanding
of this is not trivial, but you'll have to trust me that it is logical. I've made a few more points about
them below but I'm planning to write another article to really clear the issue up in a thorough way, as I did find it
a bit of a struggle to gather all of the necessary information early on.

For each code example, I give code that can be pasted into Utop (it can be run from within a file too), and then the
output that's displayed in Utop.


### Hello World
<pre><code class="ocaml">Printf.printf "Hello World!\n" ;;</code></pre>

It's self-explanatory as all Hello Worlds usually are, but you'll notice the presence of not just one semicolon at the end
but *two*. As a fan of *no* semicolons, this definitely surprised me. More on that later ...


### Variables
In OCaml, all *values* are immutable. We're familiar with this already in another languages - for example in most
popular languages strings are immutable. This means that appending one string to another actually results in a totally
new string. But usually things like numbers are not immutable, and this allows them to be used as a 'counter' in loops
for example. In OCaml, the values of *all* types are treated in this way.

The word 'variable' in most languages actually has dual meaning - it refers both to a value which we hold a reference to,
and that can vary, *and* it has meaning in the mathematical sense of representing a variable in an equation. In OCaml,
it is only the mathematical meaning of 'variable' that is implied when we're describing variables.

<pre><code class="ocaml">let age = 30 ;;</code></pre>

Output:
```plaintext
val age : int = 30
```

Can we re-assign a variable to another value?

<pre><code class="ocaml">let age = 30 ;;
let age = 31 ;;
</code></pre>

Output:
```plaintext
val age : int = 30
val age : int = 31
```

This may *look* like mutation, but it's not. The second `let` statement actually defines a new variable that happens
to have the same name, and from that point on the reference to the previous `age` variable is no longer in scope. To fully
understanding this it's necessary to understand `let ... in`. The above example is equivalent to:

<pre><code class="ocaml">let age = 30 in let age = 31 ;;
</code></pre>


### Double-semicolons! ';..;'
Some key points on semicolons in OCaml:

* The double-semicolon in OCaml is absolutely necessary when typing commands into `utop`.
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