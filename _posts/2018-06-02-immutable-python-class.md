---
layout: blog_post
title: Immutable Python Class
subtitle: An implementation of an Immutable Python class
description: "A somewhat esoteric implementation of a Python class overloads Python magic methods and creates immutable instances."
date: 2018-06-02
type: blog_post
published: true
---

As a fun experiement one day I decided to try and see if I could implement a Python class whose attributes, once set, were immutable. Knowing that Python [magic methods](https://rszalski.github.io/magicmethods/) can be overloaded, I thought it should be possible.

The result is contained in [this gist](https://gist.github.com/robinrob/0947770700cfe09707917fd677af07ba). I made life a little bit easier by starting with the test class so that I could build up the functionality gradually and see that I was making progress.

The resulting `Immutable.py` class was pretty fiddly to get right, 