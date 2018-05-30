---
layout:     blog_post
title:      Visualising a Git module tree
subtitle:   A Ruby library for manipulating a tree of Git modules including visualisation
description: A Ruby library for recursively manipulating a tree of Git modules including, visualisation, sorting and saving code
date:       2015-04-03
type:       blog_post
published:  true
---

All of my source code lives in a tree of Git submodules, extending downwards from my 'master' source repository, which is simply named `robin`. This giant tree of code includes everything I have ever written - both practice and project code.

I recently became frustrated with the command `git submodule foreach --recursive`, which allows one to execute a given shell command for each submodule, recursing down the submodule tree. My frustration was with the inability to recurse *upwards* using this command. The reason I wanted this functionality was so that I could save all of my code changes using a single command - adding, committing and pushing changes in each repo, from the lowest submodule to the topmost parent.

I had devised a system for the repositories that I commonly used, which involved creating a `submodules.csv` file in each of these directories. It was simple to use some Ruby code inside of a Rake task to parse these files, but in the end I never ended up using the 'save all' functionality - it just wasn't practical, and my `submodules.csv` files quickly became neglected.

Whilst doing a fresh clone of my code on another laptop, I decided that I wanted to be able to do `git checkout master` on each cloned repository directly after cloning, since on a few occasions I ended up making, committing and pushing changes on a `detached` commit from the previous recursive clone.

More recently, just for fun I started wondering 'just how many submodules do I have in my tree?' And 'what would this tree look like?' - if I were to make a graphical representation of it. I realised that I actually wanted the power to do any action for each submodule, whether or not I was recursing upwards or downwards. Since I am also currently enjoying learning the Ruby language, I finally found a justification for writing my own `.gitconfig`-style parser, in order to parse the `.gitmodules` files which are an actual source of truth and necessarily maintained.

Once this was complete, I could work on code for manipulating submodules and `.gitconfig` files. It was a fun project for a Sunday afternoon, followed by minor tweaks and a few feature additions over the next week. Although this whole project was quite frivolous, it was pretty enjoyable as I wanted to apply my test-driven-development technique in Ruby, as well as learn some more advanced features of Ruby along the way. It was also a nice code design exercise.

## What it looks like

### Visualisation
Here is an example of drawing a git module tree, using the command `rake git:foreach nil`:

<div class="thumbnail">
  <a href="{{ site.baseurl }}/img/rake_each_sub.png"><img src="{{ site.baseurl }}/img/rake_each_sub.png" alt="Screenshot showing drawn code tree" /></a>
</div>

The 'drawing' of my code tree is simply a special case usage of the `rake git:for_each` task, where I am passing no action, and it defaults to pretty-printing each module.

### Sorting .gitmodules
I found it useful to be able to sort my .gitmodules file. I can do this using the command `rake git:sort_sub`:

<a href="/img/rake_sort_sub.png"><img src="/img/rake_sort_sub.png" alt="Screenshot showing drawn code tree" /></a>

It was really simple to add a `sort!` method to my `GitConfigFile` class, which delegates to a `GitConfigBlockCollection` class to perform the sort. Using the `foreach` task, this sorting task could be executed for all modules in a tree if you wanted.

## The code
Below is a list of classes that I used to implement this functionality:

### Main classes
* `GitRepoTree` - represents a tree of Git modules
* `GitSubDoer` - class that implements recursion over a tree of Git modules and executes a given task
* `GitConfigBlock` - represents a block of .gitconfig or .gitmodules file
* `GitConfigBlockCollection` - represents a collection of blocks of .gitconfig file
* `GitConfigFile` - represents a .gitconfig file
* `GitConfigReader` - reads a .gitconfig file into a `GitConfigFile`

### Other classes
* `AppConfig` - holds configuration variables
* `AppLogger` - logger
* `Assert` - helper class for doing assertions with pretty-printed output in unit tests
* `Console` - helper class for logging output from unit tests
* `Exceptions` - domain-specific exceptions
* `GitConfigBlockBuilder` - helper class for building .gitconfig blocks for use in unit tests

### Test classes
* `TestGitConfigBlock`
* `TestGitConfigBlockBuilder`
* `TestGitConfigBlockCollection` - since this class was of high importance in tests, I decided to test it
* `TestGitConfigFile`
* `TestGitConfigReader`

## Conclusion
As a fun project, this definitely fulfilled the goal of speeding up my learning of Ruby, as well as helping me get to sleep on a few nights. And as a bonus I do actually use some of the rake tasks quite regularly.