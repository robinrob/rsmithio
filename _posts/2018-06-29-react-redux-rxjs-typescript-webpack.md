---
layout: blog_post
title: React + Redux + RxJS + Typescript + Webpack
subtitle: Example React frontend demonstrating use of some really nice popular technologies
description: Example quiz application using React 16 (with hot loading), Redux 4, RxJS 6, Typescript 2.8 and Webpack 4
date: 2018-06-29
type: blog_post
published: false
---

I made a [Quiz app](https://github.com/robinrob/quiz-react/) using react for the frontend, with a [Rails backend](https://github.com/robinrob/quiz-rails/).

If there's one thing that learning React and building an application with it reminds you as a developer - is that it *always* pays to read the docs *properly* before you start something

Developers are lazy, and sometimes perhaps impatient especially when seized with a creative vision, so sometimes slowing down to read the documentation when integrating a new library or framework is into your code can be really hard.

With this single personal project, I've learned all the technologies mentioned in the title (but not all at once!) with the exception of Typescript, which I had already used before.

## Learning React
Before I first started using React, I actually watched a few of the [React conf videos](https://www.youtube.com/user/FacebookDevelopers/playlists/). I like to do this before learning any new major framework or language, as I find that the first intellectual hurdle and big win is just fully understanding the philosophy and motivation behind it. If you can understand these two things, you'll get along way towards learning it and making the process more enjoyable. It helps that Facebook's developer videos are pretty comprehensive, and mostly entertaining.

## Learning Webpack
My quiz app started off with just React and Webpack. I learned Webpack *just enough* to get the hello world going. My plan was always to go back and read up on Webpack and maybe watch another couple of videos, but I admit I did leave it a little too late. Nevertheless I did it, and that process really helped me to make additions to my Webpack flow - such as adding SASS and Typescript post-processing. [This is essential watching](https://www.youtube.com/watch?v=bm7RlNEcQM0&t=6s).

## Learning Redux
Within a couple of hours of coding in React I knew something was up - I was passing all these props and callback functions down to child components. Even one level deep, doing this all the time feels wrong and is just frustrating. I had read/seen or overhead just enough about Redux to realise that it could help with this problem, and guessed that this probably had something to do with its popularity. So with sufficient technical motivation for needing it I decided to look up Redux and add it to my app.

[This](https://www.youtube.com/watch?v=xsSnOQynTHs/) was maybe the most useful video I saw in this React-Redux journey. It perfectly explains how powerful Redux can be, how plain elegant a solution it is, and how hot-loading in React becomes so easy when using Redux. If you love functional programming concepts and hate managing state, you'll probably enjoy using Redux and frameworks like it.

The [Redux documentation](https://redux.js.org/introduction/) is some of the nicest I've seen. The documentation actually reminds me of the elegance and simplicity of its implementation. With my general knowledge of the Redux mechanics and this documentation, I had it working in my app within 30 minutes.

## Learning RxJS
I wanted to add keyboard shortcuts into my Quiz app so that I could make it developer-friendly and avoid touching the mouse. This led to me needing some sort of observer-subscriber model in my code. On my initial React video journey I had actually already partly-watched [this video](https://www.youtube.com/watch?v=ei7FsoXKPl0/) covering RxJS observables, so I returned to it and watched the rest.

RxJS was a great solution to allow me to implement the keyboard shortcuts. Actually it led to me needing to do a much-needed refactor on my codebase, which made me look up some more React-Redux best-practices. Once I had done this, adding an RxJS observable was easy. I simply stored a reference to the observable - `keyPressedObservable` - in my Redux store, like this:

<pre><code class="javascript">export const initialState = {
  name: "",
  questions: [],
  answered_questions: [],
  quiz: {id: null, name: null},
  keyPressedObservable: fromEvent(document, 'keydown', null, null)
}</code></pre>

In Redux-connected components that need to know the currently-pressed key, I have:

<pre><code class="javascript">constructor(props) {
    super(props)
    
    var keyPressedObserver = {
      next: x => this.onKeyPressed(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    }
    this.props.keyPressedObservable.subscribe(keyPressedObserver)
  }

  onKeyPressed(event) {
    if (event.key == this.props.index) {
      this.props.updateAnswer(this.props.answer)
    }
  }
</code></pre>

I'm not sure that this is a best practice, and I may change it to use 