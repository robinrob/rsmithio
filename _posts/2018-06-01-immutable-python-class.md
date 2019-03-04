---
layout: blog_post
title: Immutable Python Class
subtitle: An implementation of an Immutable Python class
description: "A somewhat esoteric implementation of a Python class overloads Python magic methods and creates immutable instances."
date: 2018-06-01
type: blog_post
published: true
---

As a fun experiment one day I decided to try and see if I could implement a Python class whose attributes, once set, were immutable. Knowing that Python [magic methods](https://rszalski.github.io/magicmethods/) — specifically `__getattribute__` and `__setattr____` — can be overloaded, I thought it should be possible.

The result is contained in [this gist](https://gist.github.com/robinrob/0947770700cfe09707917fd677af07ba). I made life a little bit easier by starting with the test class so that I could build up the functionality gradually and see that I was making progress, because I suspected it would be fiddly.

Indeed the resulting `Immutable.py` class was pretty fiddly to get right. Essentially it makes a lot of use of `object.__getattribute__` and `object.__setattr__`. These methods are [documented here](https://docs.python.org/3/reference/datamodel.html).

Since the `Immutable` class is storing all object attributes in a dictionary, this probably messes up auto-completion in an IDE on the object's attributes.

I probably wouldn't recommend using `Immutable` in a production project, but might be useful/fun to use in a personal project, as I do sometimes, such as in [CLI Tetris](https://github.com/robinrob/cli-tetris).
