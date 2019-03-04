---
layout: blog_post
title: Keeping Editors In Sync
subtitle: A tip for keeping editor settings in sync across devices
description: 'Discussion of using symlinks and install scripts to help keep editor settings in sync across devices'
date: 2018-06-22
type: blog_post
published: true
---

If you're a developer with multiple devices, you may have experienced the infuriating situation of opening your editor or IDE on a different device — maybe you've taken your laptop to the library — and realising that all your optimised settings are non-existent, because you've never set them on that computer or you've not exported/imported the configuration from your main device somehow.

I have two Macs and I've experienced the above scenario too many times, so I now like to get on top of this straight away with new IDEs — the latest one I've been getting up to speed to since switching from IntelliJ Idea is Visual Studio Code (or VS Code amongst normal people).

These instructions will be Mac-specific but the general technique will definitely apply to any unix-based machine and probably Windows too.

One of the cool things about OS X is that it has a bunch of standard places where all installed applications should store things. One of these locations that you really want to be familiar with is `~/Library/Application Support/`. This is where applications store user-specific things like settings or caches.

VS Code stores its user settings at: `~/Library/Application Support/Code/User/settings.json`.

What I like to do is *copy* this file into [my dotfiles Git repository](https://github.com/robinrob/dotfiles-base). I then create a ZSH [install script](https://github.com/robinrob/dotfiles-base/blob/master/zsh/vscode.zsh) in the same repository, which I call from my [master system install script](https://github.com/robinrob/dotfiles-base/tree/master/install.zsh).

The install script simply does the following:

<pre><code class="zsh">#!/usr/bin/env zsh

VSCODE_SETTINGS_PATH="$HOME/Library/Application Support/Code/User/settings.json"
MY_SETTINGS_PATH=$DOTFILES_BASE_HOME/config/files/vscode_settings.json

# Delete any existing VS Code settings file
rm -f $VSCODE_SETTINGS_PATH

# Symlink dotfiles settings file to VS Code settings location
ln -s $MY_SETTINGS_PATH $VSCODE_SETTINGS_PATH</code></pre>

Maintaining the install scripts means this stuff will get done automatically if you ever have to setup a machine from scratch.

The really nice thing is that whenever you modify the VS Code settings through the usual app UI, the file in the dotfiles repository will get updated, since VS Code is just following the symlink when looking up the settings file. This is a common technique that will work for most IDEs/editors. On all devices where you are using VS Code, you just need to commit the updated settings file every now and again, and pull from the other devices when you need the updated settings.

## Syncing using Dropbox etc.
You could instead point the symlink into a Dropbox folder so that changes are automatically synced instantly between all devices. You could even place the Git repository in Dropbox and have the best of both worlds of instant syncing and version-controlling your settings.

I'm happy just using Git for now and avoiding the extra dependency on Dropbox. This works for me because I am regularly updating my dotfiles repository anyway, so I am acting as a sort of human Dropbox.

But in general it's great to have some standard solution like this set up for all configurable applications on your machine, and the symlinking-from-dotfiles-repo technique is quite common amongst developers. I got into this habit myself a few years ago.

The final cool thing about storing all your settings in a Git repository is you can easily share them with other developers :).