---
layout:         blog_post
title:          RSS Reader Script
subtitle:       Short Ruby script to open RSS links using terminal interface
description:    "I have written a Ruby script to create a command-line interface for browsing articles from an RSS feed"
date:           2015-05-24
type:           blog_post
---

I was looking at RSS feeds recently, thinking it would be cool to make a tool that I could use as a central place to read about lots of stuff I'm interested in. Tools like this obviously exist already but I wanted to read them from the command-line, and create the interface I wanted.

My requirements were: I wanted a quick, lightweight way to browse and open articles from RSS feeds from within the terminal. I wrote a <a href="https://github.com/robinrob/rss-opener.git">Ruby script</a> that presents a numbered list of articles in the specified RSS feed, and opens selected the article in your default web browser.

## Screenshot
<img src="/img/rss-opener.png" alt="RSS Reader Usage Screenshot">

Further details on its usage are given in the README file in the project.