---
layout: blog_post
title: CLI Tetris
subtitle: Command-line Tetris game implemented in Python
description: "A Command-line Tetris game implemented in a day in Python, as a fun personal project and challenge"
date: 2018-05-25
type: blog_post
published: true
---
As a one-day project, I've created an implementation of Tetris in Python 3 ([cli-tetris](https://github.com/robinrob/cli-tetris/tree/master)) that can be played from the command-line. I've since done a bit of tidying and added some nice-to-haves like linting, but 95% of it was done in that first day. The precise design may have some rough edges, but overall I'm pleased with the end result.

I'll describe the thought process that went into the code design and how the implementation works, and also what I'd improve on if I was to spend more time on it. The process of describing it is beneficial to me as a good way of self-documenting my thoughts, and maybe for other people too.

Here is a screenshot of a game in-progress:

<img src="/img/cli_tetris.png" alt="In-game screenshot of CLI Tetris" />

It's not quite a full Tetris implementation - for example completed rows are not destroyed.

Small personal projects like this can be great for learning and trying out ideas, and very satisfying to get something concrete made quickly, especially something that's just for fun. I planned most of the code design up-front - it evolved only a bit - as I encountered a couple of cases I hadn't considered upfront.

## The code
I've [docstring](https://www.python.org/dev/peps/pep-0257/)'ed up all of the classes, so they are mostly self-documenting. Here are the classes, which can be viewed in Github:

### Main game objects
* [Position](https://github.com/robinrob/cli-tetris/blob/master/src/position.py)
* [Layout](https://github.com/robinrob/cli-tetris/blob/master/src/layout.py)
* [Element](https://github.com/robinrob/cli-tetris/blob/master/src/element.py)
* [TetrisPiece](https://github.com/robinrob/cli-tetris/blob/master/src/tetris_piece.py)
* [GridSquare](https://github.com/robinrob/cli-tetris/blob/master/src/grid_square.py)
* [TetrisGrid](https://github.com/robinrob/cli-tetris/blob/master/src/tetris_grid.py)
* [ConsoleInterface](https://github.com/robinrob/cli-tetris/blob/master/src/console_interface.py)
* [Tetris](https://github.com/robinrob/cli-tetris/blob/master/src/tetris.py)

### Other classes
* [Errors](https://github.com/robinrob/cli-tetris/blob/master/src/errors.py)
* [Immutable](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py)
* [Layouts](https://github.com/robinrob/cli-tetris/blob/master/src/layouts.py)
* [TetrisPieceFactory](https://github.com/robinrob/cli-tetris/blob/master/src/tetris_piece_factory.py)

### Enum classes
* [MovementType](https://github.com/robinrob/cli-tetris/blob/master/src/movement_type.py)
* [ElementType](https://github.com/robinrob/cli-tetris/blob/master/src/element_type.py)

### Test classes:
I followed test-driven development with the following classes, which contain the meat of the logic in CLI Tetris:

* [TestGridSquare](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestImmutable](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestPosition](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestTetrisGrid](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)
* [TestTetrisPiece](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py)

### Code design goals and philosophy
The codebase is written in an object-oriented style. Having recently been [learning OCaml](/blog/getting-started-with-ocaml/) and thinking more about functional programming styles, I decided that I didn't want any mutable state where I could avoid it.

With the goal of designing the codebase towards immutability (more on this below), I've made the object instance methods like `Position.rotate()` return a new instance with the updated state. I've applied this pattern to `TetrisPiece`, `Layout` and `Position`, which are the other objects that are created and destroyed during the life-cycle of the game. The only class with mutable state is actually `GridSquare`. This makes sense, since the `GridSquare` instances store information about what they are being occupied by, and grid squares represent the underlying substrate of the game. Instances of `Element` are placed into and removed from grid squares.

It turns out that having the ability to know that object instances always have all fields populated at any given moment is really useful. For one thing, it removes null checks throughout the code, and removes one class of bug as well as making the code a lot cleaner and nicer to look at. So anywhere in the code where I have hold of a `TetrisPiece` object, I know that its `layout`, `position` and `elements` properties are initialised.

When I was learning OCaml, I was getting used to programming without null checks, so this was part of my motivation for this strategy. `OCaml` doesn't even have a null value, so eliminates null-value bugs at the language level. I think coding without depending on null is a good practice.

### TetrisPiece
`TetrisPiece` is one of the most interesting classes since it contains some important logic and also demonstrates the use of the `Layout`, `Element` and `Position` classes, which are designed to be generic components of game entities.

### Position
This is perhaps the most fundamental of all the classes. `Position` simply holds and x, y value pair and has methods for creating new `Position` instances which modified in some way to the original `Position` (e.g. translated, rotated or added to the original `Position`). Several of the other classes depend on this class.

### Layout
`Layout` describes the layout of a generic game entity. It is constructed from a list of `Position` instances, where each `Position` describes the location of a point in the `Layout`, each relative to the origin (0, 0) of the `Layout`. The `Layout` is therefore just a list of relative positions. The `Layout` class has methods for performing operations such as rotation and flipping (about its origin).

### Element
`Element` represents a single element of a larger game entity (e.g. `TetrisPiece`). It is constructed from an `ElementType` enum value and a `Position` instance, where the `Position` is the location of the `Element` relative to the origin of its parent entity.

### API of TetrisPiece
`TetrisPiece` is constructed from a `Layout` instance and a `Position` instance. On initialisation, `TetrisPiece` creates an instance of `Element` corresponding to each position of its `Layout`.

When a `TetrisPiece` needs to be manipulated in some way, such as applying a rotation to it, the `TetrisPiece` instance calls the relevant method on its `Layout` to generate a new, modified `Layout` which is rotated relative to the original. A new `TetrisPiece` instance is then returned using the new `Layout` and the original `Position` instance.

When a `TetrisPiece` is translated (e.g. moved downwards), then the relevant method on `Position` is called, (e.g. `Position.translate()`), then a new `TetrisPiece` created with the new `Position` and the original `Layout`.

This API fulfils the two design goals of being object-oriented, yet providing 'pure', immutable objects to work with. I think object-oriented style is a great choice for game logic, and in this project the 'pureness' of the objects made the code feel simple to write and test.

## Immutability
I mentioned above that I was striving for immutability, but that it's not possible in Python at the language level. However some time ago as a fun challenge, I decided to see if I could use the power of [overloading](https://en.wikipedia.org/wiki/Function_overloading) Python's [magic methods](https://www.python-course.eu/python3_magic_methods.php), to see if I could create a class whose properties could be set once on initialisation and be made read-only thereafter. The result was the [Immutable](https://github.com/robinrob/cli-tetris/blob/master/src/immutable.py) class used in this project.

The test class [TestImmutable](https://github.com/robinrob/cli-tetris/blob/master/tests/test_grid_square.py) demonstrates how `Immutable` is used. I'll describe `Immutable` in another post, so won't go into detail here. It works for my purposes in this fairly esoteric project, but I'd probably not trust using it in production.

## Testing
I'm a big fan of test-driven development (TDD), and from experience find that its biggest benefits are gained when the shape of the code is known beforehand, through upfront design.

The largest gains from TDD also come from testing the most complex logic, so if there is a necessary trade-off to be made, then it pays to have a good sense for where the most complex and important logic in the application is. The listing of test classes above illustrates where the real workhorse logic of the application lies (`Tetris`, `TetrisGrid`, `TetrisPiece` and `Position`).

## Linting
Admittedly I've not made much use of Python docstrings before, but another really nice gain from these personal projects is in finding additional best practices along the way.

In this project, as well as [flake8](http://flake8.pycqa.org/) to lint the code, I've also used [flake8-docstrings](https://pypi.org/project/flake8-docstrings/). Adding a linting tool can be a great way to find many best practices in a language, and you can end up learning a surprising amount. `flake8-docstrings` really forced me to be thorough with documenting the code, and it's nice to know that in Python the docstrings are [more than just normal comments](https://stackoverflow.com/questions/19074745/docstrings-vs-comments).

## Further improvements
On first glance at the `TetrisPiece` class, it may be surprising that it contains no methods like `rotate` or `translate`, which you may expect it to have, even if they delegate to the corresponding methods on `Layout` and `Position`.

Instead, `TetrisPiece` has really just one method `moved`:

<pre><code class="python">def moved(self, movement_type):
    """Return a new version of this TetrisPiece moved according to the given MovementType."""
    new_position = self.position
    new_layout = self.layout

    if movement_type == MovementType.NONE:
        pass
    elif movement_type == MovementType.DOWN:
        new_position = self.position.translated(0, -MOVE_UNITS)
    elif movement_type == MovementType.LEFT:
        new_position = self.position.translated(-MOVE_UNITS, 0)
    elif movement_type == MovementType.RIGHT:
        new_position = self.position.translated(MOVE_UNITS, 0)
    elif movement_type == MovementType.ROTATE_CLOCKWISE:
        new_layout = self.layout.rotated(-90)
    elif movement_type == MovementType.ROTATE_ANTICLOCKWISE:
        new_layout = self.layout.rotated(90)
    else:
        raise InvalidMoveException(f"Invalid movement type: {movement_type}")

    return TetrisPiece(new_layout, new_position)
</code></pre>

`TetrisPiece.moved()` does the job of mapping enum values of `MovementType` into actual movement operations. On the one hand, this simplifies the API of `TetrisPiece`, and you can imagine a more general case with other types of game entity which can be manipulated in similar ways. This API gives the control of precisely how an entity moves to that entity.

However the limitation of mapping simple `MovementType` values into actual movement means that you cannot tell an entity *how much* it should move by, so this only works where each entity has a very standard, fixed way of moving. This caused me problems when I tried as an experiment, doubling the number of squares moved by tetris pieces in each go. I had to use a setting (`MOVE_UNITS`) in `settings.py` to determine this, then reference the `MOVE_UNITS` setting in in the `TetrisPiece` class.

However, having a variable movement distance was adding complexity to the logic determining whether a given `TetrisPiece` has a valid move from its current location (`TetrisGrid.object_has_valid_move()`), since possible downward moves could be either 1 or 2 squares, once the `TetrisPiece` is near the bottom of the board (or `TetrisGrid`).

Without adding the above extra logic, I was ending up with tetris pieces stopping 1 square away from the bottom of the board, instead of exactly at the bottom, because a valid fixed move of 2 squares downwards was not possible. This bug could also be avoided by always placing the tetris pieces an integer number of movement units from the bottom of the board at the start, but that would be a weak and there error-prone system.

So an improvement to the interface for telling entities how to move could be to send `Action` objects, which could combine a `MovementType` with a `units` value. This would allow the game to tell a `TetrisPiece` how much it should move by in any given movement, whilst still encapsulating exactly how e.g. a `TetrisPiece` is rotated within its own class. Therefore references to `settings.MOVE_UNITS` could be confined to just the `TetrisGrid` class, and the logic in `TetrisGrid.object_has_valid_move()` could enumerate possible moves as a list of more flexible `Action` instances as opposed to `MovementType`.
