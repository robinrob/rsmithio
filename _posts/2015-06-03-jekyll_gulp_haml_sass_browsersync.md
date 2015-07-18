---
layout:     post
title:      "Jekyll Gulp HAML SASS BrowserSync"
subtitle:   "My custom flavour of Jekyll site template."
date:       2015-06-04
---

Whilst using Github's Jekyll framework to build a static website, I noticed a lack of built-in HAML support. I am a big fan of using HAML to produce HTML. Apart from this lack of support for HAML, I enjoy using Jekyll.

Since I was using Gulp to manage the build process, I needed a Gulp task to handle the HAML preprocessing. I initially tried using the <a href="https://www.npmjs.com/package/gulp-haml">gulp-haml</a> module in my HAML task, but it produced incorrect results a few times. Luckily, I came across this module that defers to the Ruby <a href="https://rubygems.org/gems/haml">haml</a> Gem, which is perhaps a bit more refined from popular usage in the Ruby on Rails community: <a href="https://github.com/moneypenny/gulp-ruby-haml">gulp-ruby-haml</a> to be a bit more reliable.

I noticed few other kind developers sharing their particular flavours of Jekyll setup, but didn't come across any complete template sites using HAML. Here is my own <a href="https://github.com/robinrob/jekyll-gulp-haml-sass-browsersync.git">jekyll-gulp-haml-sass-browsersync</a> template.

<h2 class="section-heading">HAML Processing</h2>
<p>HAML is organised in the project template like this:</p>
<pre><code class="bash">
    project-root
        index
            _haml
                index.haml
            index.html
</code></pre>


<pre><code class="javascript">
    /* hamlBuild() contains the logic used by haml-watch and haml-build */
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