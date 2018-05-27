---
layout: blog_post
title: CLI Tetris
subtitle: Command-line Tetris game implemented in Python
date: '2018-05-16T19:11:53+01:00'
type: blog_post
published: false
---
As a one-day project, I've created an implementation of Tetris in Python 3 ([cli-tetris](https://github.com/robinrob/cli-tetris/tree/master)) that can be played from the command-line. I've since done a bit of tidying and added some nice-to-haves like linting, but 95% of it was done in that first day. The code design may have some rough edges, but overall I'm pleased with the end result.

Here is a screenshot of a game in-progress:

<img src="/img/cli_tetris.png"></img>

It's not quite a full Tetris implementation - for example completed rows are not destroyed.

Small personal projects like this can be great for learning and trying out ideas, and very satisfying to get something concrete made quickly, especially something that's just for fun. I planned most of the code design up-front - it evolved only a bit - as I encountered a couple of cases I hadn't considered upfront.

## The code
Here are the source classes used:

### Main game objects
* [Position](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [Layout](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [Element](https://github.com/robinrob/cli-tetris/blob/master/src/element.py)
* [TetrisPiece](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [GridSquare](https://github.com/robinrob/cli-tetris/blob/master/src/grid_square.py)
* [TetrisGrid](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [ConsoleInterface](https://github.com/robinrob/cli-tetris/blob/master/src/console_interface.py)
* [Tetris](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)

### Other classes

* [Errors](https://github.com/robinrob/cli-tetris/blob/master/src/errors.py)
* [Immutable](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [Layouts](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)

* [TetrisPieceFactory](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)


### Enums
* [MovementType](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [ElementType](https://github.com/robinrob/cli-tetris/blob/master/src/element_type.py)

Test classes:
* [TestGridSquare](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestImmutable](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestPosition](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestTetrisGrid](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestTetrisPiece](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)

## Code design
The codebase is written in an object-oriented style. Having recently been [learning OCaml]({{ site.url }}/getting-started-with-ocaml/) and thinking more about functional programming styles, I decided that I didn't want any mutable state where I could avoid it. To achieve this in *principle*, I've made the instance methods like Position.rotate() return a new instance with the updated state. I've applied this pattern to `TetrisPiece`, `Layout` and `Position`. The classes `TetrisGrid` and `GridSquare` do contain mutable state and are persistent across a Tetris game. The

It turns out that having the ability to know the *form* of an object's state at any given moment is really useful. For example, at any point in the code where I had hold of a `TetrisPiece` object, I knew that it would always have its `layout`, `position` and `elements` properties initialised. Therefore this pattern reduces null checks. `OCaml` doesn't even have a null value, so eliminates that class of potential bug entirely. I think coding without depending on null is a good practice.

The real important workhorse logic for the game is contained within `Tetris`, `TetrisGrid`, `TetrisPiece` and `Position` - and I started off with unit tests for these classes.

I've tried to minimise mutable state of objects - I am coming to appreciate immutable objects more and more. I wish there was an inbuilt way to create immutable objects in Python.
