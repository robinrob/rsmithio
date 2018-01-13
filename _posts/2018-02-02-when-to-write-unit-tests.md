---
layout:     post
title:      When to write unit tests
subtitle:   Choosing when to write unit tests is not always so obvious
date:       2018-01-19
type:       Blog Post
published:  false
---


We've all heard of TDD (Test-Driven-Development) by now, with the idea behind TDD being to write your unit tests before you
write the code which implements the functionality that you are testing. As with all programming ideas, you will find
people with a whole range of opinions about it. These kind of debates usually limited value, because at some point
you have to make a decision on what you're doing to do in a given scenario. Regarding unit tests, the value of having
good automated tests *at all* far outstrips potential differences between writing them *before* or *after*.

It's very hard to argue against the use of a good set of automated tests. Just to recap, some
of the benefits are:
* **They save you time**. Imagine if after every time you made a change to your code, you had to manually execute some
commands or load things in a browser to check every thing still works correctly. This would be ridiculous. With automated tests, you can
make many incremental changes without worrying about all that. You'll still want to do some manual tests at the end, but
you will never be able to rely on manually testing everything, for every change. Cutting out even a small percentage
 of this brutally-menial work amounts to a huge time-saving. For complex code, I find writing an automated test suite relatively early on
 to save me huge amounts of time even initially, without including the on-going time-saving.
**They increase reliability**. Automated tests are *automated*, so they never not run.
**They help you to understand the code**. Whenever I need to remind myself what a particular piece of code does, or are
learning it for the first time, I always find reading the tests to be extremely helpful.
**They make refactoring much much easier**. I can't imagine having to refactor complex code that doesn't have tests, as
I've never done it nor had to.

Besides the benefits of *having* unit tests I *writing* them to be extremely useful in helping me design the actual
code, and the process of making them pass to also be very rewarding. 