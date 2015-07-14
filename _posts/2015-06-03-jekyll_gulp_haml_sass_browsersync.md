---
layout:     post
title:      "Jekyll Gulp HAML SASS BrowserSync"
subtitle:   "My own particular flavour of Jekyll site template."
date:       2014-06-04
---

Whilst building this site using Github's Jekyll framework, I noticed a lack of built-in HAML support. Apart from this, I enjoy using Jekyll. I initially tried using the <a href="https://www.npmjs.com/package/gulp-haml">gulp-haml</a> module inside my HAML gulp task, but I have found <a href="https://github.com/moneypenny/gulp-ruby-haml">gulp-ruby-haml</a> to be a bit more reliable.

I noticed few other kind developers sharing their particular flavours of Jekyll setup, but didn't come across any complete template sites using HAML. Here is my own <a href="https://github.com/robinrob/jekyll-gulp-haml-sass-browsersync.git">jekyll-gulp-haml-sass-browsersync</a> template.

<h2 class="section-heading">HAML Processing</h2>
HAML is organised in the project template like this:
<pre>
    project-root
        index
            _haml
                index.haml
            index.html
</pre>


{% highlight javascript %}
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
{% endhighlight %}