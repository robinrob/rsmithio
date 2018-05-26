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

These sorts of projects can be great for learning, and very satisfying to get something concrete made quickly. I planned most of the code design up-front - it evolved only a little bit - as I encountered a couple of problems I hadn't considered upfront.

The codebase is organised using an object-oriented style. Here is a list of the Python modules and associated classes:

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
