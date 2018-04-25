---
layout:     blog
title:      When Should You Write Unit Tests?
subtitle:   Choosing when to write unit tests may not always be a simple question
date:       2018-01-25
type:       blog_post
published:  true
---


## Test-driven development?
We've probably all heard of [TDD](https://en.wikipedia.org/wiki/Test-driven_development) (Test-Driven-Development) by now,
with the idea behind TDD being to write your automated tests before the production code.

As with all software development practices, you'll find
people with a whole range of opinions about the pros and cons of different approaches. These kind of debates usually
have limited value after a certain point, because there is no single general solution. The debate can go round and round
in circles but at some point you have to make a decision on what you're doing to do in a given scenario. I will describe
the main principles I follow in deciding when to write tests.

## The value of writing automated tests
Leaving aside the potential virtues of TDD for now, the value of having
good automated tests *at all* far outstrips potential differences between writing them *before* or *after*.
It's difficult to argue against the use of a good set of automated tests. The benefits are something I have
thought about a lot; here are the main ones that come to mind:

* **Automated tests save you time**. Manual testing is extremely time-consuming, and when you don't have automated tests,
it's difficult to make any kind of incremental changes to your code and be confident that it still works. If you are
doing lots of manual testing as you go, this will waste lots of precious time. If you make a lot of code changes and *then*
manually test everything all at once, things might be too broken to recover quickly.

With automated tests, you can make many incremental changes and quickly validate them to ensure that you are not
breaking fundamental functionality. You'll still want to do manual tests at the end of course, but
knowing core logic is still working as you develop allows you to get on with changes quicker. Cutting out even a small percentage
of the brutally-menial work of manual testing amounts to a huge time-saving.

Particularly for complex code, I find writing an automated test suite up-front to save me a lot of *initial* development time,
before I begin counting on-going maintenance time. By the time the automated tests are passing and it comes
to manual testing, it often turns out that things are *just working*. This is a great thing to experience.

* **Automated tests increase reliability**. Since automated tests are *automated*, they always do their job properly. So if you are
happy with your tests, and they pass, then you can be confident that in the worst case, your application is only minimally broken
before you begin manual testing. The application will increase in reliability over time as bugs become known and tested for.

* **Automated tests help you to understand the code**. Whenever I need to remind myself of what a particular piece of code does, or I am
familiarising myself with a new codebase, I always find reading the tests to be extremely helpful, especially if they are
written such that they build up in a progression from simple to complex cases.
* **Automated tests make refactoring much easier**. Refactoring complex code that doesn't have tests is a *nightmare*! On a large,
complex codebase, a good automated test suite will make refactoring vastly easier. If I was asked to refactor a complex
codebase that lacked automated tests, I would consider writing those tests first. This would have the added benefit of
forcing me to *really* understand how the code works, as well as the business domain.
* **Writing tests helps with code design**. I find the process of writing tests to be extremely useful in helping to
resolve some design questions I may still have, when producing new code.
* **Watching a test suite pass is extremely satisfying**. Watching automated tests go from failing to passing is a great
feeling. This can give you a very tangible feeling of momentum and confidence.

## When *not* to write tests before code
I've found there is one obvious situation where you don't want to write the unit tests before you write the code:
before the architecture of the code you're writing is fully defined.

Automated tests add inertia to change, and this
is part of their value when used wisely, as it makes it harder for yourself or other developers to break things down
the line. Therefore if you've written a lot of tests and *then* change the design of the code being tested, you're going
to experience a lot of pain, and the pain will damage your creative process.

There will still be some situations where the design will need to evolve at least a little as you start to
actually implement it - it's hard to foresee everything at the start of writing a new codebase, especially if you are
working in a new language or framework for example - in these cases it can be good to be sparing about the tests that
you write first, then fill them in later.

## When to write tests before code

### When the overall architecture is well-defined
TDD works best in codebases where the overall architecture is already settled and robust, and you are
just expanding the application horizontally - adding new features, and testing new algorithms. Everything is predictable on a
large scale, and the only unknown is the correctness of the new code you are adding. So for example, you may be adding a new function
to an existing service, adding a new service, or adding a new data model and associated DAO class.

In the above scenario, the overall structure to the tests you need to write will be obvious and predictable. Once you
reach this point, you can be blindingly fast at adding new features, *and* having them well-tested. It is a win-win-win,
and very enjoyable.

### Write tests whilst the domain and codebase knowledge are fresh
I believe it is an important responsibility of the authors and modifiers of complex code, to be writing up automated tests
that are needed as soon as the necessary knowledge of the domain or codebase has been gained. The overhead required of
a developer later on to attain enough knowledge to write the tests themselves and start gaining the benefits of those tests,
is very high. Even a small change to complex code would require a lot of time spent to fully understand the implications,
if these are not made obvious by failing tests.

It can be a very stressful experience for a developer to have to make modifications to complex code that is
not well-tested. If a great automated test suite is already there, the process becomes much easier and more enjoyable.

## Conclusion
Software development is a technical and creative discipline, usually done in a business context. Decisions should be tailored
to each scenario, and these can be highly varied in the life of a programmer.

The overall goal is to produce working code in the shortest time possible. The effort should go into fully understanding
how each decision will affect the overall development time, possibly in non-obvious ways.