var root = require('path').resolve('./')
var config = {
    paths: {
        build: "./_site/**",
        img: ["./img/**/*"],
        js: ["./js/**/*.js"],
        sass: {
            main: '_scss/main.scss',
            src: '_scss/*.scss'
        },
        css: {
            dest: '_site/css'
        },
        haml: {
            src: [root, '_includes', '_layouts', 'cv']
        },
    },
};


var browserSync = require('browser-sync');
var changed = require('gulp-changed')
var concat = require('gulp-concat');
var cp = require('child_process');
var gcallback = require('gulp-callback')
var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var ngmin = require('gulp-ngmin')
var path = require('path')
var plumber = require('gulp-plumber')
var prefix = require('gulp-autoprefixer');
var task = require('gulp-task')
var reload = browserSync.reload
var runsequence = require('run-sequence')
var shell = require('shelljs/global')
var sass = require('gulp-sass');
var watch = require('gulp-watch')


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

function onError(err) {
    console.log(err)
    shell.exec("say wanker")
}

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild)
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
})

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    reload()
});

gulp.task('reload', function() {
    reload()
})
/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function () {
    browserSync({
        server: {
            baseDir: '_site'
        },
        browser: "safari"
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src(config.paths.sass.main)
        .pipe(sass({
            includePaths: [config.paths.sass.src],
            onError: onError
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(config.paths.css.dest))
});

gulp.task('haml-watch', function () {
    // destination of '.' in gulp.dest() means relative to src!
    var locations = config.paths.haml.src
    locations.forEach(function (location) {
        var src = location + '/_haml/*.haml'
        var dest = location
        gulp.src(src).
            pipe(plumber({
                onError: onError
            })).
            pipe(watch(src)).
            pipe(changed(dest, {extension: '.html'})).
            pipe(haml()).
            pipe(gulp.dest(dest)).
            pipe(gcallback(function () {
                console.log("HAML DONE")
                runsequence('jekyll-rebuild')
            }))
    })
})

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(config.paths.sass.src, ['sass', 'reload']);
    gulp.watch(['_config.yml', '_posts/*', config.paths.img, config.paths.js, 'orbiter/**/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'haml-watch', 'sass', 'watch']);
