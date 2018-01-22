---
layout:     post
title:      When should you write unit tests?
subtitle:   Choosing when to write unit tests is not always a simple question
date:       2018-01-02
type:       Blog Post
published:  false
---


## Test-driven development?
We've all heard of [TDD](https://en.wikipedia.org/wiki/Test-driven_development) (Test-Driven-Development), with the idea
behind TDD being to write your unit tests before your production code.

As with all software development practices, you'll find
people with a whole range of opinions about the pros and cons of different approaches. These kind of debates usually
have limited value, because there is no one solution,. The debate can go round and round in circles and at some point
you have to make a decision on what you're doing to do in a given scenario. I will describe the main principles I follow
in deciding when to write tests.

## The value of writing tests
Side-stepping the potential virtues of TDD, the value of having
good automated tests *at all* far outstrips potential differences between writing them *before* or *after*.
It's difficult to argue against the use of a good set of automated tests. Some of the benefits are:

* **Tests save you time**. Imagine if after every time you made a change to your code, you had to manually execute many
commands or manually load the app to check every thing still works correctly. This would be ridiculous.

    With automated tests, you can make many incremental changes and quickly validate them to ensure that you are not
    breaking fundamental functionality. You'll still want to do some manual tests at the end, but
    knowing core logic is still working as you develop allows you to get on with changes quicker. Cutting out even a small percentage
    of this brutally-menial work amounts to a huge time-saving. Automating things is a natural programmer's instinct.
    
    For complex code, I find writing an automated test suite relatively early on
    to save me a lot of overall development time upfront, [never mind](https://english.stackexchange.com/questions/12752/what-is-the-difference-between-nevermind-and-never-mind)
    on-going maintenance time.
* **Tests increase reliability**. Automated tests are *automated*, so they always do their job properly.
* **Tests help you to understand the code**. Whenever I need to remind myself what a particular piece of code does, or am
learning it for the first time, I always find reading the tests to be extremely helpful.
* **Tests make refactoring much easier**. Refactoring complex code that doesn't have tests is a *nightmare*.
* **Writing tests helps your code design**. Besides the benefits of having unit tests I find the process of writing
them to be extremely useful in helping me design the actual code, and the process of making them pass to also be very rewarding.

## When *not* to write tests before code
I've found there is one obvious situation where you don't want to write the unit tests before you write the code:
before the architecture of the code you're writing is fully defined.

Automated tests add inertia to change, and this
is part of their value when used wisely, as it makes it harder for yourself or other developers to break things down
the line. Therefore if you've written a lot of tests and *then* change the design of the code being tested, you're going
to experience a lot of pain. Experiencing this can give you added motivation to design the code upfront properly next time
- which is a good practice anyway.

There are still some situations where the design will need to evolve as you start to
actually implement it - it's hard to foresee everything at the start of writing a new codebase, especially if you are
working in a new language or framework for example - in these cases be sparing about the tests that you write first,
then fill them in later.

## When to write tests before code
Writing tests first works best in codebases where the overall architecture is already settled-down and robust, and you are
just expanding the app horizontally - adding new features, and testing new algorithms. Everything is predictable on a
large scale, and the only unknown is the correctness of the new function you are adding.

## Write tests whilst the knowledge is fresh!
I'd say the second-most important factor in deciding when to write tests is - write them whilst the domain and codebase
knowledge are fresh in your head - you, the developer who authored the code, or finds yourself working on code that is
lacking in tests.

Not only does not writing tests for complex code leave a huge maintenance risk, but when other
developers come to maintain your code later on, they will require extra time to understand the codebase and the
ramifications of changing it. Being asked to modify complex code written by another developer, that is lacking in automated
tests, is *scary* to me, and it should be. Whenever I find myself in that situation, I fill in the missing tests as soon as my
domain and codebase knowledge have become complete enough. My professional pride and sense of duty demand it.

Fully understanding a business domain and the implications for the code are a *huge* overhead when the functionality and
code are complex. Especially when the cost of a mistake is high - for example the code is dealing with costs or pricing.
Being able to read a set of unit tests that build up in a logical progression from simple to complex cases, I personally
find to speed up the process greatly. Not only does the familiarisation become quicker, but you have much more
confidence in avoiding unexpectedly breaking things when making changes.

## Conclusion
Coding is a technical and creative discipline, usually done in a business context. Decisions should be tailored
to each scenario you find yourself in - and these can be highly varied in the career of a programmer - rather than driven
by absolutist principles.

One thing is for sure - complex code *needs* tests, and seeing these tests passing is one of the thrills
of being a developer.