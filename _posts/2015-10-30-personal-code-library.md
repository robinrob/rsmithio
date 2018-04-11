---
layout:         blog_post
title:          Maintaining a personal code library
subtitle:       Record and hold on to your precious code snippets
description:    "Discussion of why I think it&#39;ss important to retain all of your code as a software developer, and the method that I use to organise mine"
date:           2015-10-30
type:           blog_post
---

These days rapid Google searches are an invaluable tool for developers who are constantly getting to grips with a
new language, framework or technique, where reading lengthy documentation would be a waste of time when the problem
is simply a matter of finding the correct syntax.

Very very often I find the answer is much more valuable to me when shown in a way in which it is best understood by
myself. And there are certain things that when you are switching between languages on varying timescales, you find
yourself repeatedly needing to look up. They can often be unique to your particular style of coding - for example
it may be that you want to remind yourself of a particular pattern for implementing a decorator method in Python, or of
implementing a Class and inheritance structure in Javascript. The questions and answers are not always trivial.

For this reason I am very careful to record in short scripts all such useful examples and commit and push these into
source code repositories that I maintain for myself. I have structured the repositories in a way (one repository per language,
split into `practice` and `projects` directories), that they are highly
amenable to searching by automated tool (usually ZSH function), so that usually to find the answer to a problem it is
a matter of running one command from wherever I happen to be, and I am instantly reminded of the code that I need.

Holding onto your precious code is also a matter of pride in craft. Code does not often come cheap and can require
significant expenditure of your time to find good solutions. I do not want that time to go to waste by having to repeat
the process in future.
