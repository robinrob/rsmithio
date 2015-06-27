var root = require('path').resolve('./')
var config = {
    paths: {
        build: "./_site/**",
        img: ["./img/**/*"],
        haml: {
            src: [root, '_includes', '_layouts', 'cv']
        },
        html: {
            src: ["./_site/**/*.html"],
            dest: "./"
        },
        sass: {
            main: '_scss/main.scss',
            src: '_scss/*.scss',
            dest: '_css/'
        },
        css: {
            main: 'styles.css',
            src: '_css/*.css',
            dest: '_site/css/'
        },
        js: {
            main: 'scripts.js',
            src: ["./_js/*.js"],
            dest: '_site/js/'
        }
    }
};

var browserSync = require('browser-sync');
var changed = require('gulp-changed')
var concat = require('gulp-concat');
var cp = require('child_process');
var gcallback = require('gulp-callback')
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require("gulp-minify-html");
var ngmin = require('gulp-ngmin')
var path = require('path')
var plumber = require('gulp-plumber')
var prefix = require('gulp-autoprefixer');
var task = require('gulp-task')
var reload = browserSync.reload
var runsequence = require('run-sequence')
var shell = require('shelljs/global')
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var watch = require('gulp-watch')


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

function onError(err) {
    console.log(err)
    shell.exec("say wanker")
}

gulp.task('jekyll', function (done) {
    browserSync.notify(messages.jekyllBuild)
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
})

gulp.task('reload', function () {
    reload()
})
/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: '_site'
        },
        browser: "safari"
    });
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
            pipe(gcallback(function() {
                console.log("HAML DONE")
                runsequence('build')
            }))
    })
})

gulp.task("html", function() {
    // Overwrite original files
    return gulp.src(config.paths.html.src, {
        base: './'
    })
        .pipe(minifyHTML())
        .pipe(gulp.dest('./'));
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
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest(config.paths.sass.dest))
});

//return gulp.src('_scss/main.scss')
//    .pipe(sass({
//        includePaths: ['scss'],
//        onError: onError
//    }))
//    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//    .pipe(gulp.dest('_site/css'))
//    .pipe(gulp.dest('css'));

gulp.task("css", function () {
    return gulp.src(config.paths.css.src, {
        base: './'
    })
        .pipe(minifyCSS())
        .pipe(concat(config.paths.css.main))
        .pipe(gulp.dest(config.paths.css.dest));
});

gulp.task('js', function() {
    return gulp.src(config.paths.js.src)
        .pipe(uglify())
        .pipe(concat(config.paths.js.main))
        .pipe(gulp.dest(config.paths.js.dest));
});

gulp.task('upload', function() {
    return gulp.src(config.paths.build)
        .pipe(ghPages({
            branch: "master"
        }));
});

// Purges website cache so updates are shown
gulp.task('purge-online-cache', function() {
    cloudflare.clearCache(config.siteDomain, 1, function() {});
});

gulp.task('deploy', function() {
    return runsequence(['html', 'css'], 'upload');
});

gulp.task('save', function(done) {
    return require('child_process', done).exec('rake base:save && gulp deploy', {
        stdio: 'inherit'
    }, done);
});

gulp.task('build', function(done) {
    runsequence('jekyll', 'sass', ['css', 'js'], 'reload', done);
})
/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['haml-watch', 'build', 'browser-sync'], function() {
    gulp.watch(['_config.yml', '_posts/*', config.paths.img, config.paths.sass.src, config.paths.js.src, 'orbiter/**/*'], ['build']);
})
