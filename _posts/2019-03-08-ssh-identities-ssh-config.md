---
layout: blog_post
title: SSH Identities for Github & Bitbucket on Unix Systems
subtitle: Some really useful entries to put in your ~/.ssh/config for use with Git
description: 'SSH Identities for Github & Bitbucket - Some really useful entries to put in your `~/.ssh/config` to make using Git with Github and Bitbucket easier. They can easily get lost when changing between systems or setting one up from scratch and can be fiddly to get working again from scratch. Here are some examples for future use.'
date: 2019-03-08
type: blog_post
published: true
---

When using the `git` tool from the command line to do things like pushing and pulling to and from Github or Bitbucket (which are two examples of Version Control Systems, or VCSs), there are two connection methods used for authenticating with the remote Version Control System: `HTTPS` and `SSH`.

Here are [Github's](https://help.github.com/en/articles/which-remote-url-should-i-use#cloning-with-https-urls-recommended) and [Bitbucket's](https://confluence.atlassian.com/bitbucket/ssh-keys-935365775.html) documentations on it.

The easiest way to use `Git` from the command line is using the `SSH` method combined with entries configured in your system user's `~/.ssh/config` file. Here is the [Documentation for SSH Config](https://www.ssh.com/ssh/config/).

The goal is to be able to run `git` commands from within one of your Git repositories on the command line like:

`git pull origin master`
`git push origin master`
... etc

without typing in any login details on each command, or knowing or worrying about whether the endpoint VCS is Github or Bitbucket or wherever else. Once this is set up it's so easy to take for granted that it can be a rude shock when attempting to do these commands on a 'fresh' or just different system.

The above documentation or other online sources are enough to get it figured out but sometimes you just want a straightforward example which requires changing a few variables, especially if it's because you've lost your `~/.ssh/config` file somehow - by re-installing your system for example and not backing up the file somewhere, or when changing system and you want to get it set up again quickly.

## Steps
### Create SSH Keypair for Remote VCS
Instructions for [Github](https://help.github.com/en/articles/connecting-to-github-with-ssh).
Instructions for [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html).

### Setup `~/.ssh/config` File Entries
Paste these SSH Config blocks into your `~/.ssh/config` file (create it if it does not already exist), replacing `my_github_username` with your username etc.

<pre><code class="plaintext">Host github.com
HostName ssh.github.com
User my_github_username
PreferredAuthentications publickey
IdentityFile ~/.ssh/my_github_private_key
IdentitiesOnly yes
Port 443

Host bitbucket.org
HostName altssh.bitbucket.iorg
User my_bitbucket_username
PreferredAuthentications publickey
IdentityFile ~/.ssh/my_bitbucket_private_key
IdentitiesOnly yes
Port 443
</code></pre>

That should be all you need to do.

## A nice way to keep your SSH Config file backed up
I keep my SSH Config file automatically backed up by storing it in a Git repository, similarly to my custom dotfiles. I then create a [symbolic link](https://en.wikipedia.org/wiki/Ln_(Unix)#Links) from the file within my Git repository to the path `~/.ssh/config`:

`ln -s PATH_TO_GIT_REPO/ssh_config_file ~/.ssh/config`

Then as long as you are committing changes from your local git repository to the remote VCS every now and again, your SSH Config file should remain safe.