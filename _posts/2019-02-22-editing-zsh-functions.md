---
layout: blog_post
title: better title
subtitle: better subtitle
description: 'ZSH Code Editors - This is my list of the best text editors/environments for ZSH. ZSH-compatible editors or plugins '
date: 2019-02-22
type: blog_post
published: false
---

## Editors that successfully edit extension-less files as ZSH/Shell language
### Vim/MacVim
[MacVim](https://macvim-dev.github.io/macvim/) is a great text editor.

<pre><code class="viml">" Set the default filetype for files with no extension"
autocmd BufNewFile,BufRead * if expand('%:t') !~ '\.' | set filetype=zsh | endif
"Set the default syntax for files with no extension"
autocmd BufNewFile,BufRead * if expand('%:t') !~ '\.' | set syntax=zsh | endif
</code></pre>

### VSCode
Technically this it not actually supported by VSCode's syntax for file associations. Setting a wildcard `*` character simply overrode settings for all other languages, regardless of order in the `file.associations` array in `config.json`.

However I did find [this hacky solution](https://stackoverflow.com/questions/49410524/assign-file-with-no-extension-to-a-language-on-vs-code-as-default) on Stack Overflow, posted by somebody who also wanted to edit extension-less files as shell script.

<pre><code class="json">files.associations": {
    "*.jsx": "javascriptreact",
    "[!.]": "shellscript",
    "[!.][!.]": "shellscript",
    "[!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript",
    "[!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.][!.]": "shellscript"
  },
</code></pre>

So if you really want to do it in VSCode, there's a way to do it for now.

## Editors that didn't work
### Atom
Following the [Atom documentation](https://atom.io/packages/file-types) to try to associate files with no extension to a specific language type (e.g. shell) did not work. It was also a fairly frustrating experience as the changes to config.cson were not picked up immediately and it was not obvious whether restarting the editor was required or not. After 20 minutes of this I declared this a rabbit hole!