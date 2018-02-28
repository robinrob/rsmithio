---
layout:     post
title:      Getting started with OCaml
subtitle:   Learning a fully-functional language
date:       2018-02-28
type:       Blog Post
published:  true
---

After much persuasion from a friend (who has a PhD in this stuff) over several years, I've started learning [OCaml](https://ocaml.org/learn/description.html). I
recommend reading the [wikipedia article](https://en.wikipedia.org/wiki/OCaml) on OCaml for a good background on it.
I'm only going to draw outlines in this article - covering the aspects of OCaml that convinced me to try learning
it, as well as show some basic code examples of the sorts of things that also attracted me to the language.

I'll clarify some things which confused me whilst learning OCaml, and caused some initial pain, so hopefully that is lessened for others
in the future.

At the end I will summarise my experiences of learning OCaml so far, some pros and cons and what my plans with OCaml
are for the future.

## Functional programming
The first thing that drew me towards learning OCaml is its very strong orientation towards [functional programming](https://en.wikipedia.org/wiki/Functional_programming).
I've been noticing and taking advantage of functional programming techniques more and more over time.
For me so far, this has essentially been: composing expressions out of pure functions to program in a more declerative
style - thus helping to reduce mutibility, increase predictability and improve testability of code.
There is more to functional programming than that, but that has been one of my main takeaways in terms of what I actually use in my code, so far.

Functional programming does not replace other programming paradigms like [object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming)
programming. Just as with programming languages, one technique or aspect of functional programming me be most-suited to certain scenarios,
whereas object-oriented or some other style is better in another scenario. An application can use a happy combination of different techniques to achieve its goals
in an elegant and reliable way.

## Functional programming languages
What is a functional programming language? No single factor goes into deciding whether a programming language is 'functional'.
Most languages are 'multi-paradigm' - they support a variety of different [paradigms](https://en.wikipedia.org/wiki/Programming_paradigm).
It's interesting to compare the paradigms supported by some well-known languages:

<table class="programming-languages">
    <tr><th>Language</th><th>Imperative</th><th>Functional</th><th>Object-oriented</th><th>Procedural</th><th>Reflective</th><th>Event-driven</th><th>Structured</th><th>Generic</th><th>Concurrent</th></tr>
    <tr><td>C</td><td><span class="fa fa-check"></span></td><td></td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td></tr>
    <tr><td>Coq</td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>C#</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td></tr>
    <tr><td>C++</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td><span class="fa fa-check"></span></td><td></td></tr>
    <tr><td>F#</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td><span class="fa fa-check"></span></td></tr>
    <tr><td>Go</td><td><span class="fa fa-check"></span></td><td></td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td><span class="fa fa-check"></span></td><td></td><td><span class="fa fa-check"></span></td></tr>
    <tr><td>Haskell</td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Java</td><td><span class="fa fa-check"></span></td><td></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td></tr>
    <tr><td>Javascript</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td></tr>
    <tr class="ocaml"><td>OCaml</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>PHP</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Python</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Ruby</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Swift</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Typescript</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td></tr>
</table>

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

Thankfully in OCaml the Hello World remains self-explanatory as all Hello Worlds should be.
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
understand this it's necessary to understand `let ... in`. The above example is actually equivalent to:

<pre><code class="ocaml">let age = 30 in (
    Printf.printf "age: %d\n" age ;
    let age = 31 in (
        Printf.printf "age: %d\n" age ;
    )
)
</code></pre>

This makes it clearer what is actually happening. When the `in ...` is not specified in a `let` statement, the scope
of the variable is just everything following the `let` within that scope. TODO: read ocaml coding conventions


### Double-semicolons! ';..;'
Some key points on double-semicolons in OCaml:

* Double-semicolons separate statements at the *top level* of an OCaml program. That is, the highest scope of the program,
where the first expression is written (e.g. the definition of the main function). In a normal program, there is only *one*
highest-level of scope, therefore we virtually never need to use a double-semicolon in OCaml programs.
* The double-semicolon in OCaml is absolutely necessary when typing commands into `utop`, because (hence the name),
subsequent typed-in expressions are being evaluated side-by-side at the top-level.
* Anything typed into Utop will also work in an OCaml program, but not vice-versa, because of the points above.

The full understanding of how OCaml programs are structured so as to avoid the necessity of double-semicolons is more
detailed, but for now this should be enough. These reasons are why the examples here which can be conveniently pasted
into Utop have alternative standard forms which avoid the double-semicolons.


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

### Easter egg - literal number formatting
To take a mental rest - an unexpected feature of OCaml is the ability to add underscores to long number literals
*to improve readability*:

<pre><code class="ocaml">let big_num = 123_456_789 ;;</code></pre>

output in `utop`:

```plaintext
val x : int = 123456789
```

Also works with floats (also note that the underscores can go wherever you want, not just every 3 digits):
<pre><code class="ocaml">let big_num = 123_456.65_43_21 ;;</code></pre>

output in `utop`:

```plaintext
val big_num : float = 123456.654321
```

Arguably not that useful at first sight, but interesting nonetheless and it demonstrates OCaml's commitment to reducing human errors in code, and
prioritising expressiveness. Not even the Rouge-powered syntax-highlighting in this blog can deal with it.


### Type Inference
Last one for now, but so far in all of the examples, OCaml has been able to infer the types of things based on their usages.
So if you try to re-assign an int to a float, OCaml will shout at you:

<pre><code class="ocaml">let my_int = 123 ;;
my_int = 123.456 ;;
</code></pre>

```plaintext
Error: This expression has type float but an expression was expected of type
         int
```

So what happens when OCaml *can't* figure out the type of something from the code? Here is a definition for a function
which evaluates `test` and returns `x` if the result is `true` and `y` otherwise.

<pre><code class="ocaml">let first_if_true test x y = if test x then x else y ;;</code></pre>

```plaintext
Error: This expression has type float but an expression was expected of type
         int

let first_if_true test x y = if test x then x else y ;;
```

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
