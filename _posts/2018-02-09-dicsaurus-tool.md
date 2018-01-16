---
layout:     post
title:      Dicsaurus
subtitle:   A command-line dictionary & thesaurus tool
date:       2018-01-02
type:       Blog Post
published:  true
---

I may be slightly obssessed with doing everything from the command-line, but through various custom scripts and
functions I've turned my command line environment into a very general multi-purpose tool that allows me to do a lot
of things very quickly and with minimal UI.

Out of a need to quickly look up synonyms for words, and a desire to make it as painless as possible, and also have the
output customisable, I've created a small tool named [Dicsaurus](https://github.com/robinrob/dicsaurus). It's just a
Python script that makes HTTP callouts to [Oxford Dictionaries API](https://developer.oxforddictionaries.com/).

## Example usage:
Dictionary mode: `./dicsaurus.py -t blue`

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

Thesaurus mode: `./dicsaurus.py -t blue`

