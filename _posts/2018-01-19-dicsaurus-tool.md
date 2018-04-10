---
layout:     post
title:      Dicsaurus Dictionary & Thesaurus
subtitle:   A Command-Line Dictionary & Thesaurus Tool
description: "Blog Post: Dicsaurus Dictionary & Thesaurus - Starter code for implementing a Command-Line Dictionary & Thesaurus Tool"
date:       2018-01-19
type:       Blog Post
published:  true
---


I've created a small tool named [Dicsaurus](https://github.com/robinrob/dicsaurus), out of a need to quickly look up
 words and synonyms for words, and out of a desire to make it as painless as possible.

Previously I was using the command-line `dict` tool in OS X, and for thesaurus just a ZSH function opening [thesaurus.com](http://www.thesaurus.com/)
 in a browser, with the search term encoded into a URL parameter.

Dicsaurus is a simple python script that makes HTTP callouts to [Oxford Dictionaries API](https://developer.oxforddictionaries.com/).
It currently works in two modes: dictionary and thesaurus. The [readme](https://github.com/robinrob/dicsaurus/blob/master/README.md)
explains how to set it up, including registering a developer account at [developer.oxforddictionaries.com](https://developer.oxforddictionaries.com).

## Example usage in dictionary mode
The word 'blue' turns out to be a good test word for both dictionary and thesaurus modes.

Command: `./dicsaurus.py -t blue`

Output:

```plaintext
Results from Oxford University Press:

Definition(s) for 'blue'

   blue (Adjective)

      Example(s):
         a blue silk shirt
         the clear blue sky
         deep blue eyes
         he's feeling blue
         a blue movie
         the successful blue candidate

      Etomologie(s):
         Middle English: from Old French bleu, ultimately of Germanic origin and related to Old English blǣwen ‘blue’ and Old Norse blár ‘dark blue’ (see also blaeberry)


   blue (Noun)

      Example(s):
         she was dressed in blue
         armchairs in pastel blues and greens
         the dark blue of his eyes
         a flyweight boxing blue
         did you have a blue or what?
         his tactical blue in saying the opposition wasn't ready to govern
         only an Aussie could make a red-headed man ‘Blue.’


   blue (Verb)

      Example(s):
         blued paper
         the day would haze, the air bluing with afternoon
         the light dims, bluing the retina
         they blued the shirts and starched the uniforms

      Etomologie(s):
         mid 19th century: perhaps a variant of blow</code></pre>
```

## Example usage in thesaurus mode
Command: `./dicsaurus.py -t blue`

Output:

```plaintext
Results from Oxford University Press:

Synonym(s) for 'blue'

   blue (Adjective)

      Snynoym(s):
         sky-blue
         azure
         cobalt
         cobalt blue
         sapphire
         cerulean
         navy
         navy blue
         saxe
         saxe blue
         Oxford blue
         Cambridge blue
         ultramarine
         lapis lazuli
         indigo
         aquamarine
         turquoise
         teal
         teal blue
         cyan
         of the colour of the sky
         of the colour of the sea

      Example(s):
         she had bright blue eyes

      Snynoym(s):
         depressed
         down
         sad
         saddened
         unhappy
         melancholy
         miserable
         sorrowful
         gloomy
         dejected
         downhearted
         disheartened
         despondent
         dispirited
         low
         in low spirits
         low-spirited
         heavy-hearted
         glum
         morose
         dismal
         downcast
         cast down
         tearful

      Example(s):
         Dad had died that year and Mum was feeling a bit blue

      Snynoym(s):
         indecent
         dirty
         rude
         coarse
         vulgar
         bawdy
         lewd
         racy
         risqué
         salacious
         naughty
         wicked
         improper
         unseemly
         smutty
         spicy
         raw
         off colour
         ribald
         Rabelaisian

      Example(s):
         a blue movie

```
