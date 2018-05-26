---
layout: blog_post
title: CLI Tetris
subtitle: Command-line Tetris game implemented in Python
date: '2018-05-16T19:11:53+01:00'
type: blog_post
published: true
---
As a one-day project, I've created an implementation of Tetris in Python 3 ([cli-tetris](https://github.com/robinrob/cli-tetris/tree/master)) that can be played from the command-line.

Here is a screenshot of a game in-progress:

<img src="/img/cli_tetris.png"></img>

It's not a full tetris implementation - for example completed rows are not destroyed.

These sorts of projects can be great for learning and trying out ideas, and very satisfying to get something concrete made quickly. I planned most of the code design up-front - it evolved only a bit - as I encountered a couple of cases I hadn't considered upfront.

## The code
The codebase is written in an object-oriented style. Having recently been [learning OCaml]({{ site.url }}/getting-started-with-ocaml/) and thinking about functional programming styles, I decided that I didn't want any mutable state where I could avoid it. To achieve this in *principle*, I've made functions on objects that would otherwise mutate them return new versions of themselves with the updated state.

It turns out that having the ability to know the *form* of an object's state at any given moment is really useful. For example, at any point in the code where I had hold of a `TetrisPiece` object, I knew that it would always have its `layout`, `position` and `elements` properties initialised. Therefore this pattern reduces null checks. `OCaml` doesn't even have a null value, so eliminates that class of potential bug entirely. I think coding without depending on null is a good practice.



* `console_interface` (`ConsoleInterface`)
* `element` (`Element`)
* `element_type` (Element Type)
* errors (ElementConflictException, ElementOutOfBoundsException, InvalidMoveException, GameOverException)
* grid_square (GridSquare)
* immutable (Immutable)
* layout (Layout)
* layouts (Layouts)
* matrix_layout (MatrixLayout)
* movement_type (MovementType)
* position (Position)
* tetris (Tetris)
* tetris_grid (TetrisGrid)
* tetris_piece (TetrisPiece)
* tetris_piece_factory (TetrisPieceFactory)

The real important workhorse logic for the game is contained within `Tetris`, `TetrisGrid`, `TetrisPiece` and `Position` - and I started off with unit tests for these classes.

I've tried to minimise mutable state of objects - I am coming to appreciate immutable objects more and more. I wish there was an inbuilt way to create immutable objects in Python.
