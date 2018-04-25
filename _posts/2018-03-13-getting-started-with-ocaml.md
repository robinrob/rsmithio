---
layout:         blog_post
title:          Getting started with OCaml
subtitle:       Learning a functional programming language
description:    "A quick intro showing how to get started with OCaml and some of its core features."
date:           2018-03-13
type:           blog_post
published:      true
---

After much persuasion from a friend over the last few years, I've started learning [OCaml](https://ocaml.org/learn/description.html). So far I am
really enjoying it and it has been a valuable experience and process of learning. For a good quick background on OCaml, I recommend reading its [wikipedia article](https://en.wikipedia.org/wiki/OCaml).

Writing this has turned out to be fairly time-consuming, since it is diffult to write about something
which is still relatively new to myself whilst aiming for accuracy, so I will be fairly brief on the different aspects that I will touch on. The overall goal is to present all the aspects of OCaml that motivated me to really get into and continue learning it.

I will show some basic code examples of the sorts of things that attracted me to the language.

I'll try to clarify some things which confused me when just starting to learn OCaml, and caused some initial pain, so hopefully that is lessened for others
in the future.

At the end I will summarise my experiences of learning OCaml so far, where OCaml fits in in the real world, and where I plan to go from here.

## Functional programming
The first thing that drew me towards learning OCaml is its very strong orientation towards [functional programming](https://en.wikipedia.org/wiki/Functional_programming).
I've been thinking about and taking advantage of functional programming techniques more and more over time.

For me so far, this has essentially been: composing certain sections of code using calls to pure functions, thus to program in a more declerative
style, helping to reduce mutibility, increase predictability and improve testability of my code. For example: using a map function instead of a for
loop, or a reduce function when needing to sum something over a collection.

Whilst doing front-end development, the [Lodash](https://lodash.com) library has allowed me to write some really expressive, concise logic for reading, computing from and manipulating data structures. Continuing on like this, I have written my own functions in this way where possible or appropriate. There is more to functional programming than this, and OCaml really puts it at your fingertips.

Functional programming does not replace other programming paradigms like [object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming)
programming. Just as with programming languages, one aspect of functional programming might be best-suited to some scenarios,
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
    <tr><td>Scala</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Swift</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Typescript</td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td><td></td><td></td><td><span class="fa fa-check"></span></td><td><span class="fa fa-check"></span></td><td></td></tr>
</table>

Languages have differing amounts of functional programming features, and depending on their initial design considerations, some languages are just easier than others to program functionally with,
and therefore are more often used in that way. I'd consider these things to make a functional programming language:

* It has language features that support programming in a functional style, most importantly: first-class functions, i.e. functions that can be used as a basic unit of abstraction, can be passed around like data, and use function scope (i.e. closures). Besides this, support for immutability and partial application of functions I consider important.
* Programming in a functional way is natural, concise and readable in the language. There is less value in having functional language features in a language with the intention of making it functional, if there is a large amount of syntax required for this style, or the constructs are somehow awkward, or readability is seriously compromised, compared to programming imperatively in that language.

If a language *only* supports programming in a functional way, we can say that it is a 'pure functional' language. Examples of these in the above table are [Coq](https://en.wikipedia.org/wiki/Coq) and [Haskell](https://en.wikipedia.org/wiki/Haskell).

One of the goals of all functional programming languages is to increase predictability and therefore robustness of code. In some ways the pattern of thinking required to understand algorithms coded functionally can feel less intuitive than considering the imperative equivalents. For example, when counting things in real-life, say a handful of coins, we are physically iterating over the collection with our eyes, and maintaining a variable with the count in our heads, which is incremented as we count. The functional equivalent doesn't even make sense in that way in the real-world, but instead is a more abstract, mathematical way of thinking about a process. This certainly appeals to mathematicians and programmers.

## Why should we learn functional programming?
The more abstract methods of thinking required when doing functional programming can make it seem harder than say object-oriented programming. However in principle you could perhaps imagine
that given similar levels of practice and habituation, you may become equally proficient at any method of programming.

The biggest 'barriers' to functional programming may be as much cultural popularity and general understanding of it. For example it is easy to imagine the objections of a business to using a language like OCaml currently - it would be immediately much harder to find employees for one thing. So naturally there's a large inertia to change once particular systems of thought or tools become established. These changes must come gradually, and we are seeing lots of signs of functional programming becoming more and more established, which to me is exciting.

A big motivating reason for functional programming uptake increasing is the need for making use of parallelisation through cloud computing. Parallelisation of processes requires the elimination of state from core processing logic, pushing it to the boundaries of an application. This is one of the goals of [MapReduce](https://en.wikipedia.org/wiki/MapReduce), a programming model important in the realm of [big data](https://en.wikipedia.org/wiki/Big_data).

With the creation of the [React](https://reactjs.org/) framework, its popular use in combination with the [Redux](https://github.com/reactjs/redux) library, and its massive explosion in popularity, functional programming ideas have been thrust firmly into the mainstream. Functional programming is now more important than ever to the average developer, and this is why it's important to develop a good grounding in it.


## What is OCaml
[OCaml](https://ocaml.org) is a [mostly pure](https://ocaml.org/learn/tutorials/functional_programming.html) functional programming language with a concise, clean syntax, specifically designed for ease-of-use in real world situations.

OCaml is strongly-typed, but without all of the syntactical overhead we are used to with other strongly-typed languages like Java, by making use of [type inference](https://en.wikipedia.org/wiki/Type_inference). This is a standout feature for me, and I've illustrated it below in the code examples.

## Basic Code Examples

### Installation, Utop and semicolons ';..;'
All the code examples here are meant to be paste-able into [utop](https://opam.ocaml.org/blog/about-utop/). Utop is OCaml's interactive shell. I can recommend going through [these steps](https://github.com/realworldocaml/book/wiki/Installation-Instructions)
to get OCaml and Utop set up.

The code examples feature double-semicolons at the ends of expressions. These are necessary when the expressions in are pasted directly into Utop. However in normal programming in OCaml they are not necessary. The full understanding of this distinction is not trivial at first. I'm planning to write another post to really clear the issue up in a thorough way, as I did find it a bit of a struggle to gather all of the necessary information early on.

For each code example, I give code that can be pasted into Utop, then the output that's displayed in Utop. Because I prefer to write code examples in actual files when I am learning a language, so that I can save them for later, I've also put all of the [code examples in a file](https://github.com/robinrob/ocaml-code-examples/blob/master/ocaml_post_examples.ml) that can be executed with the OCaml interpeter. This file demonstrates how double-semicolons are totally unnecessary in an OCaml program.


### Hello World
<pre><code class="ocaml">Printf.printf "Hello World!\n" ;;</code></pre>

Thankfully in OCaml the Hello World remains self-explanatory. This example shows us the use of the built-in `Printf` module to print output, and also the simple syntax for passing arguments into functions - we don't
need parentheses around the arguments.

### Variables
In OCaml, all *values* are immutable. We're familiar with this already in another languages - for example in most popular languages strings are immutable. This means that appending one string to another actually results in a totally new string. But usually things like numbers are not immutable, and this allows them to be used as a 'counter' in loops for example. In OCaml, the values of *all* types are treated in this way.

The word 'variable' in most languages actually has dual meaning - it refers both to a value which we hold a reference to, and that can vary, *and* it has meaning in the mathematical sense of representing a variable in an equation. In OCaml, it is only the mathematical meaning of 'variable' that is implied when we're using the word.

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

This may *look* like mutation, but it's not. The second `let` statement actually defines a new variable that happens to have the same name, and from that point on the reference to the previous `age` variable is no longer in scope. To fully understand this it's necessary to understand `let ... in`. The above example is actually equivalent to:

<pre><code class="ocaml">let age = 30 in (
    Printf.printf "age: %d\n" age ;
    let age = 31 in (
        Printf.printf "age: %d\n" age ;
    )
)
</code></pre>

This makes it clearer what is actually happening. In OCaml programs, `let ... in` constructs are used to
both initialise and define the scopes of variables. `let ... in` blocks are to OCaml programs something like what axioms are to mathematical proofs.


### Functions
Defining a function (that checks whether a given integer is even or odd):
<pre><code class="ocaml">let even x = x mod 2 = 0 ;;</code></pre>

output in `utop`:

```plaintext
val even : int -&gt; bool = <fun>
```


Calling a function:
<pre><code class="ocaml">even 4 ;;</code></pre>

output in `utop`:

```plaintext
- : bool = true
```


### Pattern-matching, case analysis and nulls
Let's try a more complicated function. Compare these two example definitions of a `sum` function written in Python (avoiding use of built-in functions) and OCaml:

<pre><code class="python">def sum(list):
    sum = 0
    for num in list:
        sum += num
    return sum
</code></pre>

<pre><code class="ocaml">let rec sum list =
    match list with
    | [] -&gt; 0
    | first :: rest -&gt; first + sum rest
;;
</code></pre>

In English, the OCaml example is saying:

*  `sum` is a recursive function that takes one argument `list`
*  Match the input argument `list` with the following cases:
    *  When `list` is an empty list, return 0
    *  In all other cases, sum the first element with the remainder of the list

Since null values [do not even exist](https://ocaml.org/learn/tutorials/null_pointers_asserts_and_warnings.html) in OCaml, we have explicitly handled all cases. This example illustrates OCaml's use of
[pattern matching](https://en.wikipedia.org/wiki/Pattern_matching)
to do [case analysis](http://www2.lib.uchicago.edu/keith/ocaml-class/pattern-matching.html). I think this code example is really cool, for the amount that's being expressed in such a small amount of code, and in a clear way. And for the realisation that OCaml effectively designs out a lot of potential program bugs.

### Easter egg - literal number formatting
To take a mental rest - an unexpected feature of OCaml is the ability to add underscores to long number literals to improve readability:

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

Arguably not that useful at first sight, but interesting nonetheless and it demonstrates OCaml's commitment to reducing human errors in code, and prioritising expressiveness. I noticed that the syntax-highlighting library used in this blog couldn't deal with such eccentric syntax.


### Type Inference
I used to be under the impression that static typing necessarily came along with a lot of extra syntax, but OCaml's use of type inference along with its minimalist syntax combine to allow you to write terse code even whilst gaining the benefits of static type checking, plus more.

So far in all of the examples, OCaml has been able to infer the types of things based on their usages.
So for example if you try to pass an Int value to something expecting a Float, OCaml will shout at you:

<pre><code class="ocaml">Printf.printf "%f" 4 ;;</code></pre>

```plaintext
Error: This expression has type float but an expression was expected of type
         int
```

This doesn't seem surprising when demonstrated by running commands in Utop, but OCaml does this type analysis at *compile time*, as demonstrated by uncommenting my code example [here]({{ site.url }}/blog/getting-started-with-ocaml).

Type inference feels almost magical at first, but once you realise that all of the information required to infer types is right there in the program, and appreciate the extra work being done by the compiler, it makes total sense. Other languages that make use of type inference are Typescript and Swift.

## OCaml editor support
What is the tooling support for OCaml like? It's actually pretty good. For an editing environment, I'm using [VS Code](https://code.visualstudio.com) with this [ReasonML](https://github.com/reasonml-editor/vscode-reasonml)
 plugin. The Atom editor also appears to have a popular [OCaml package](https://atom.io/packages/language-ocaml).

The vscode-reasonml plugin gives some cute-looking camel icons to the `.ml` files:

<img src="/img/vscode_ocaml.png" alt="Screenshot of Visual Studio Code OCaml plugin" />

I was pleased to see that [Rouge](https://github.com/jneen/rouge), the syntax-highlighting plugin used in this blog, supports OCaml syntax, hence the nicely-looking code snippets in this post.

It's always re-assuring to know that a language or framework is not so niche as to not have tools supporting it, when setting out to learn it.

## Are companies using OCaml?
Your pragmatic side should also be interested in the direct value of learning OCaml to your career.

This is a really nice [presentation](https://www.youtube.com/watch?v=v1CmGbOGb2I) on OCaml by an employee of Jane Street, which includes a discussion of the practicalities of using OCaml in the real world. Entrance into the OCaml community is not recommended without some familiarity of Jane Street - they are a quantitative trading firm who have made exentensive use of OCaml. They have been a big contributor to OCaml - they wrote the [Core](https://github.com/janestreet/core) library, which is effectively Lodash for Ocaml! 

It's easy to see why OCaml would be desirable in automated trading - where speed and accuracy of code are critical. Here is a list of [companies](https://ocaml.org/learn/companies.html) using OCaml - there's a few entries for financial companies. In general, the domains of companies using OCaml tend to be more technical than average, but the list shows a good amount of diversity.

Then you only have to look to [Reason](https://reasonml.github.io), a language which effectively brings OCaml to Javascript, to be further convinced that OCaml is something worth learning.
