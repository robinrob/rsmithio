---
layout: blog_post
title: Syntax Highlighting when editing extension-less ZSH Function Files
subtitle: 
description: 'ZSH Code Editors - This is my list of the best text editors/environments for ZSH. ZSH-compatible editors or plugins '
date: 2019-02-22
type: blog_post
published: true
---

I am often writing or editing ZSH functions which I store in [my dotfiles repo](https://github.com/robinrob/dotfiles-base/tree/master) in a folder named [`functions`](https://github.com/robinrob/dotfiles-base/tree/master/zsh/functions).

[This section](http://zsh.sourceforge.net/Guide/zshguide03.html#l49) of the ZSH user guide describes how functions can be loaded from such function files, where the name of the file matches the name of the function to be loaded.

An annoyance arises when editing or creating these extension-less function files because the language may not be detected by the text editor or IDE - as they usually rely on the file extension to determine the language - and thus to set the syntax highlighting or autocompletion.

It can be frustratingly difficult to get an editor or IDE to simply associate extension-less files with a particular language - which is the desired behaviour for me since the only extension-less files I am usually editing are ZSH functions. In the worst case I can just manually change the file type detected in the editor for any rare cases where this isn't true.

For many people they really want to default to ZSH or Shell Script syntax for extension-less files, usually for the same or very similar reason!

I have managed to achieve this in several editors over time. Others I have not been successful with.

## Editors that successfully default extension-less files to ZSH/Shell language
### Vim/MacVim
[MacVim](https://macvim-dev.github.io/macvim/) is a great text editor for OS X which wraps Vim. The solution involves adding 2 lines to ~/.vimrc, so this works for both Vim and MacVim:

<pre><code class="viml">" Set the default filetype for files with no extension"
autocmd BufNewFile,BufRead * if expand('%:t') !~ '\.' | set filetype=zsh | endif
"Set the default syntax for files with no extension"
autocmd BufNewFile,BufRead * if expand('%:t') !~ '\.' | set syntax=zsh | endif
</code></pre>

### VSCode
Technically this it not actually supported by VSCode's syntax for file associations. Setting a wildcard  character (`*`) simply overrode settings for all other languages, regardless of order in the `file.associations` array in `config.json`.

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

### TextMate
In TextMate you can set the file type for an 'Unknown' document type. Setting this to shellscript works for my purposes.

<img src="/img/textmate_default_filetype_setting.png" alt="TextMate Configuration Screenshot">

### TextWrangler
In TextWrangler, setting a wildcard character (`*`) worked, as it did not override other default or custom file associations.

<img src="/img/textwrangler_default_filetype_setting.png" alt="TextWrangler Configuration Screenshot">

<!-- ### IntelliJ IDEA (Community Edition) -->

## Editors that didn't work
### Atom
Following the [Atom documentation](https://atom.io/packages/file-types) to try to associate files with no extension to a specific language type (e.g. shell) did not work. It was also a fairly frustrating experience as the changes to config.cson were not picked up immediately and it was not obvious whether restarting the editor was required or not. After 20 minutes of this I declared this a rabbit hole!