var root = require('path').resolve('./')

var config = {paths: {}}
config.paths.build = "./_site/**"
config.paths.buildDir = '_site'
config.paths.img = ["./img/**/*"]
config.paths.haml = {
    src: ['**/_haml/*.haml']
}
config.paths.html = {
    watchSrc: ["**/*.html"],
    src: [config.paths.buildDir + '**/*.html']
}
config.paths.sass = {
    main: '_scss/main.scss',
    src: '_scss/*.scss',
    dest: '_css/'
}
config.paths.css = {
    main: 'styles.css',
    src: '_css/*.css',
    dest: config.paths.buildDir + '/css/'
}
config.paths.js = {
    main: 'scripts.js',
    src: ["./_js/*.js"],
    dest: '_site/js/'
}
config.paths.watch = ['_config.yml', '_posts/*', config.paths.img, config.paths.html.watchSrc, config.paths.sass.src, config.paths.js.src, 'orbiter/**/*']
config = require('./_secret-config.js')(config)

var argv = require('yargs').argv
var browserSync = require('browser-sync')
var reload = browserSync.reload
var cloudflare = require('gulp-cloudflare')
var concat = require('gulp-concat')
var cp = require('child_process')
var ghPages = require('gulp-gh-pages')
var gulp = require('gulp')
var haml = require('gulp-ruby-haml');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require("gulp-minify-html");
var ngmin = require('gulp-ngmin')
var path = require('path')
var plumber = require('gulp-plumber')
var prefix = require('gulp-autoprefixer');
var task = require('gulp-task')
var rename = require('gulp-rename')
var runSequence = require('run-sequence')
var sass = require('gulp-sass');
var shell = require('shelljs/global')
var sitemap = require('gulp-sitemap');
var uglify = require('gulp-uglifyjs');
var watch = require('gulp-watch')

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

function onError(err) {
    shell.exec("say wanker")
}

gulp.task('jekyll', function (done) {
    browserSync.notify(messages.jekyllBuild)
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
})

gulp.task('reload', function () {
    reload()
})

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: '_site'
        },
        browser: "safari"
    });
});

gulp.task('haml-watch', function () {
    gulp.src(config.paths.haml.src, {read: false}).
        pipe(plumber({
            onError: onError
        })).
        pipe(watch(config.paths.haml.src)).
        pipe(haml()).
        pipe(rename(function (path) {
            path.dirname += "/../"
        })).
        pipe(gulp.dest('./'))
});

gulp.task('haml-build', function () {
    return gulp.src(config.paths.haml.src).
        pipe(plumber({
            onError: onError
        })).
        pipe(haml()).
        pipe(rename(function (path) {
            path.dirname += "/../"
        })).
        pipe(gulp.dest('./'))
})

gulp.task("html", function () {
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

gulp.task("css", function () {
    return gulp.src(config.paths.css.src, {
        base: './'
    })
        .pipe(minifyCSS())
        .pipe(concat(config.paths.css.main))
        .pipe(gulp.dest(config.paths.css.dest));
});

gulp.task("css-concat", function () {
    return gulp.src(config.paths.css.src, {
        base: './'
    })
        .pipe(concat(config.paths.css.main))
        .pipe(gulp.dest(config.paths.css.dest));
});

gulp.task('js', function () {
    return gulp.src(config.paths.js.src)
        .pipe(uglify())
        .pipe(concat(config.paths.js.main))
        .pipe(gulp.dest(config.paths.js.dest));
});

gulp.task('js-concat', function () {
    return gulp.src(config.paths.js.src)
        .pipe(concat(config.paths.js.main))
        .pipe(gulp.dest(config.paths.js.dest));
});

gulp.task('build', function (done) {
    runSequence('haml-build', 'html', 'jekyll', 'sass', ['css', 'js'], 'reload', done);
})

gulp.task('fast-build', function (done) {
    runSequence('html', 'jekyll', 'sass', ['css', 'js'], 'reload', done);
})

gulp.task('dev-build', function (done) {
    runSequence('haml-build', 'jekyll', 'sass', ['css-concat', 'js-concat'], 'reload', done);
})

gulp.task('fast-dev-build', function (done) {
    runSequence('jekyll', 'sass', ['css-concat', 'js-concat'], 'reload', done);
})

gulp.task('upload', function () {
    return gulp.src(config.paths.build)
        .pipe(ghPages({
            branch: "master"
        }));
});

// Purges website cache so updates are shown
gulp.task('purge-online-cache', function () {
    cloudflare(config.cloudflare)
});

gulp.task('sitemap', function () {
    gulp.src(config.paths.html.src)
        .pipe(sitemap({
            siteUrl: config.siteUrl
        })) // Returns sitemap.xml
        .pipe(gulp.dest(root))
});

gulp.task('submit-sitemap', function (done) {
    require('submit-sitemap').submitSitemap(config.sitemapUrl, function (err) {
        if (err) {
            console.warn(err);
        }
        done()
    });
});

gulp.task('save', function (done) {
    var msg = argv.msg || ""
    return require('child_process', done).exec('rake base:save[' + msg + ']', {
        stdio: 'inherit'
    }, done);
});

gulp.task('deploy', ['save'], function () {
    return runSequence('build', 'upload', 'purge-online-cache');
});

gulp.task('watch', ['haml-watch'], function () {
    gulp.watch(config.paths.watch, ['fast-build'])
})

gulp.task('dev-watch', ['haml-watch'], function () {
    gulp.watch(config.paths.watch, ['fast-dev-build'])
})

gulp.task('full', function () {
    runSequence('build', 'watch', 'browser-sync')
})

gulp.task('default', function () {
    runSequence('dev-build', 'dev-watch', 'browser-sync')
})