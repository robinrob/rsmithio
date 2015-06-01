---
layout: post
author: Robin Smith
title: Visualising a Git submodule tree
subtitle: A method for organising personal repositories
date: 2014-12-11 08:53:22
categories: jekyll update
image: "/img/rake_each_sub.png"
---

All of my source code lives in a tree of Git submodules, extending downwards from my 'master' source repository, which is simply named `robin`. This giant tree of code includes everything i have ever written - both practice code and project code.

The reasons that i keep up this practice are described in this post: [Living in the cloud](htp://mrrobinsmith.com/blogposts/blah)


I recently became frustrated with the command `git submodule foreach --recursive`, which allows one to execute a given shell command for each submodule, recursing down the submodule tree. My frustration was with the inability to recurse *upwards* using this command. The reason i wanted this functionality was so that i could save all of my code changes using a single command, adding committing and pushing changes in each repo, from the lowest submodule to the topmost parent. I had devised a system for the repositories that i commonly used, which involved creating a `submodules.csv` file in each of these directories. It was simple to use some Ruby code inside of a Rake task to parse these files, but in the end i never ended up using the 'save all' functionality - it just wasn't practical, and my `submodules.csv` files quickly became neglected.


Whilst doing a fresh clone of my code on another laptop, i decided that i wanted to be able to do `git checkout master` on each cloned repository directly after cloning, since on a few occasions i ended up making, committing and pushing changes on a `detached` commit from the previous recursive clone. However this checkout ended up leaving a 'dirty-commit' message when running `git status` in parent repositories. I had some idea of resolving this which again required an upwards recurse up my repository tree.


Finally i more recently got to wondering 'just how many submodules do i have in my tree?' And 'what would this tree look like?' - if i were to make a graphical representation of it. I realised that i simply wanted the power to perform any arbitrarily-complex action for each submodule, whether or not i was recursing upwards or downwards. Since i am also currently enjoying learning the Ruby language, i finally found a justification for writing my own `.gitconfig`-style parser, in order to parse the `.gitmodules` files which are necessarily maintained in a perfect state of correctness. Once this was complete, i could work on code for manipulating those submodules and `.gitconfig` files. It was a fun project for a Sunday-afternoon, followed by minor tweaks and a few feature additions over the next week. It was highly enjoyable as i wanted to apply my test-driven-development technique in Ruby. The result was that i was able to come up with what i believe to be a nice, simple interface for `.gitconfig`-file manipulations, backed-up by robust, well-tested code.

## What it looks like

<screenshot showing code tree>
<div class="thumbnail">
  <a href="{{ site.baseurl }}/img/rake_each_sub.png"><img src="{{ site.baseurl }}/img/rake_each_sub.png" alt="Screenshot showing drawn code tree" /></a>
  <div class="caption">
    `rake each_sub['echo, quiet']`
  </div>
</div>


The 'drawing' of my code tree is simply a special case usage of my `rake each_sub` command, where i am just running the shell command `echo`, with my rake task in `quiet` mode - which suppresses terminal output from the command.


<screenshot showing rake .gitmodules sort>
<div class="thumbnail">
 <a href="/img/rake_sort_sub.png"><img src="/img/rake_sort_sub.png" alt="Screenshot showing drawn code tree" /></a>
  <div class="caption">
      `rake sort_sub`
  </div>
</div>

Using my code library, it was exceedingly simple to add a `sort!` method to my `GitConfigFile` model, which delegates to a `GitConfigBlockCollection` class to perform the sort.


## The code
Below is a list of classes that i used to implement this functionality:

-  `GitConfigBlock` - represents a single section of `.gitconfig` file

-  `GitConfigBlockCollection` - stores a list of `GitConfigBlock` instances and provides collection-manipulation methods like `sort!`, which sorts the collection alphabetically by name, where `name` would be `ruby` in the following .gitmodules block:
`[submodule "ruby"]
path = ruby
url = git@bitbucket.org:robinrob/ruby.git
branch = master`

-  `GitConfigFile` -
