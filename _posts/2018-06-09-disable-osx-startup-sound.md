---
layout: blog_post
title: Finally Disable The OS X Startup Sound
subtitle: A better solution for disabling the OS X startup sound final version final copy 2 final (this one)
description: "A solution for disabling the OS X startup sound using a launchd daemon which works on iMac as well as Macbook pro, on OS X El Capitan"
date: 2018-06-09
type: blog_post
published: false
---

[Tee-ell-dee-arghhh](https://gist.github.com/robinrob/2ccacd2d5358bcd8fc38a46f5e44228e), because I know you're frustrated.

Disabling the [startup sound](https://support.apple.com/en-gb/HT202768) on a mac has been quite a common wish for a lot of people owning macs, especially portable macbooks. It's pretty embarrassing and obnoxious-looking to be in a public place, especially somewhere quiet like a library, and force everybody to hear the harsh startup sound. Or just to wake up everybody in the house when you turn your iMac on because you just happened to leave the volume at maximum the last time you used it!

Thankfully at least Apple has now decided against the startup sound altogether, since late 2016. However the older versions are still going to be around for quite a while annoying people who feel the same.

I own a 2013 Macbook Pro and a 2015 iMac and both make the startup sound by default. I had already disabled it on the laptop some years ago using the oft-quoted command: `sudo nvram SystemAudioVolume=" "`, which I have included in my standard install scripts that I use on new OS X computers, and thought nothing of it again until I bought the iMac.

The above command apparently didn't work on the iMac, nor any of its variations like: `sudo nvram SystemAudioVolume="%80"`, `sudo nvram SystemAudioVolume="%00"` or `sudo nvram SystemAudioVolume=0`. God knows what syntax that is supposed to be. Nor does leaving headphones plugged in work anymore, nor is it a good solution.

I finally got around to properly fixing this yesterday, and I wasn't going to rest until it was done.

I managed to disable the OS X startup sound by creating a [launchd](http://www.launchd.info/) daemon. The daemon runs a script on startup, which listens for the `SIGTERM` signal which is sent by the OS on shutdown. When the script receives the `SIGTERM` signal, it sets the audio volume to 0 using the command: `osascript -e "set Volume 0"`.

I've created a [Github gist](https://gist.github.com/robinrob/2ccacd2d5358bcd8fc38a46f5e44228e) with the code, install script and a README file which documents the setup process and some useful debugging commands in case it goes wrong. It's extremely simple to setup - the install script should take care of everything.
