---
layout:     post
title:      "Jekyll Gulp HAML SASS BrowserSync"
subtitle:   "My custom flavour of Jekyll site template."
date:       2015-06-04
---

Whilst using Github's Jekyll framework to build a static website, I noticed a lack of built-in HAML support. I am a big fan of using HAML to produce HTML. Apart from this lack of support for HAML, I enjoy using Jekyll.

Since I was using Gulp to manage the build process, I needed a Gulp task to handle the HAML preprocessing. I initially tried using the <a href="https://www.npmjs.com/package/gulp-haml">gulp-haml</a> module in my HAML task, but it produced incorrect results a few times. I came across the node module <a href="https://github.com/moneypenny/gulp-ruby-haml">gulp-ruby-haml</a>, which is a wrapper on the Ruby gem <a href="https://rubygems.org/gems/haml">haml</a>, and which gives accurate results.

<h2 class="section-heading">HAML Processing</h2>
HAML files reside inside a `_haml` folder which sits at the location of the resultant HTML files. For example:
<pre><code class="bash">project-root
        index
                _haml
                        index.haml
                index.html
        _includes
                _haml
                        footer.haml
                        head.haml
                        nav.haml
                footer.html
                head.html
                nav.html
</code></pre>

<p>The HAML build task is actually fairly slow compared to the CSS or Javascript processing tasks. It can take up to 10 seconds to process all of the HAML in the project. This is unacceptable when rebuilding on-the-fly while making changes.</p>

To avoid slow build times, I use a separate `haml-watch` task that watches the HAML files for changes, then only processes the files that changed. The stream is then piped into the code for compiling the HAML, which is contained in the function `hamlBuild()`. This stream-piping step makes use of <a href="https://www.npmjs.com/package/stream-combiner2">stream-combiner2</a>. Below is the code for both HAML tasks:

<pre><code class="javascript">var haml = require('gulp-ruby-haml')
var combiner = require('stream-combiner2')

...

var config = {
    paths: {
        ...
        haml: {
            src: ['**/_haml/*.haml']
        },
        ...
    }
}

...

/* hamlBuild() contains the shared build logic used by haml-watch and haml-build */
function hamlBuild() {
    return combiner(
        haml(),
        rename(function (path) {
            path.dirname += '/../'
        })
    )
}

/* Watch and compile only changed HAML files to HTML.
 * haml-watch has its own task to avoid doing a full HAML build on each .haml file change, since a full HAML build
 * can be quite slow.
 */
gulp.task('haml-watch', function () {
    gulp.src(config.paths.haml.src, {read: false})
        .pipe(watch(config.paths.haml.src))
        .pipe(hamlBuild())
        .pipe(gulp.dest('./'))
})

/* Compile all HAML files to HTML. */
gulp.task('haml-build', function () {
    return gulp.src(config.paths.haml.src)
        .pipe(hamlBuild())
        .pipe(gulp.dest('./'))
})
</code></pre>

<h2 class="section-heading">Full Site Template</h2>
Whilst researching Jekyll, I noticed a few other people sharing their Jekyll setups as site templates. Here is my own <a href="https://github.com/robinrob/jekyll-gulp-haml-sass-browsersync.git">jekyll-gulp-haml-sass-browsersync</a> template which includes my full <a href="https://github.com/robinrob/jekyll-gulp-haml-sass-browsersync/blob/master/gulpfile.js">Gulpfile</a>.