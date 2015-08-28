var root = require('path').resolve('./')

var buildDir = '_site'
var config = {
    paths: {
        build: buildDir + '/**',
        img: ['img/**/*'],
        markdown: ['_posts/*.md'],
        haml: {
            src: ['**/_haml/*.haml']
        },
        html: {
            src: ['**/*.html'],
            build: [buildDir + '/**/*.html'],
            dest: './'
        },
        sass: {
            main: '_scss/main.scss',
            src: '_scss/*.scss',
            dest: 'css/'
        },
        css: {
            main: 'styles.css',
            src: 'css/*.css',
            dest: buildDir + '/css/'
        },
        js: {
            main: 'scripts.js',
            src: ['_js/*.js'],
            dest: '_site/js/'
        }
    },
    siteUrl: "https://rsmith.io",
    sitemapUrl: "https://rsmith.io/sitemap.xml"
}
config.paths.watch = [
    '_config.yml',
    '_posts/*.md',
    config.paths.img,
    config.paths.markdown,
    config.paths.html.src,
    config.paths.sass.src,
    config.paths.js.src,

    'orbiter/**/*'
]
//config = require('./_secret-config.js')(config)

var argv = require('yargs').argv
var browserSync = require('browser-sync')
var cloudflare = require('gulp-cloudflare')
var combiner = require('stream-combiner2')
var concat = require('gulp-concat')
var cp = require('child_process')
var ghPages = require('gulp-gh-pages')
var gulp = require('gulp')
var haml = require('gulp-ruby-haml')
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css')
var minifyHTML = require('gulp-minify-html')
var ngmin = require('gulp-ngmin')
var path = require('path')
var plumber = require('gulp-plumber')
var prefix = require('gulp-autoprefixer')
var task = require('gulp-task')
var rename = require('gulp-rename')
var runSequence = require('run-sequence')
var sass = require('gulp-sass')
var shell = require('shelljs/global')
var sitemap = require('gulp-sitemap')
var submitSitemap = require('submit-sitemap')
var uglify = require('gulp-uglifyjs')
var watch = require('gulp-watch')

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
}

/* This alerts us audibly when a Gulp task errors out and Gulp stops, otherwise we may not notice and continue editing
files and expecting to see changes. */
function onError(err) {
    shell.exec('say gulp has stopped')
}

gulp.task('imagemin', function() {
    return gulp.src(config.paths.img, {
        base: './'
    })
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('jekyll', function (done) {
    browserSync.notify(messages.jekyllBuild)
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done)
})

gulp.task('reload', function () {
    browserSync.reload()
})

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: '_site'
        },
        browser: 'safari'
    })
})

/* hamlBuild() contains the shared build logic used by haml-watch and haml-build */
function hamlBuild() {
    return combiner(
        haml(),
        rename(function (path) {
            path.dirname += '/../'
        })
    )
}

gulp.task('haml-watch', function () {
    gulp.src(config.paths.haml.src, {read: false})
        .pipe(plumber({
            onError: onError
        }))
        .pipe(watch(config.paths.haml.src))
        .pipe(hamlBuild())
        .pipe(gulp.dest('./'))
})

gulp.task('haml-build', function () {
    return gulp.src(config.paths.haml.src)
        .pipe(plumber({
            onError: onError
        }))
        .pipe(hamlBuild())
        .pipe(gulp.dest('./'))
})

gulp.task('html', function () {
    // Overwrite original files
    return gulp.src(config.paths.html.build, {
        base: './'
    })
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest))
})

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
})

gulp.task('css-concat', function () {
    return gulp.src(config.paths.css.src)
        .pipe(concat(config.paths.css.main))
        .pipe(gulp.dest(config.paths.css.dest))
})

gulp.task('css-minify', function () {
    return gulp.src(config.paths.css.dest + '/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.paths.css.dest))
})

gulp.task('css-dev', function (done) {
    runSequence('css-concat', done)
})

gulp.task('css', function (done) {
    runSequence('css-concat', 'css-minify', done)
})

gulp.task('js-concat', function () {
    return gulp.src(config.paths.js.src)
        .pipe(concat(config.paths.js.main))
        .pipe(gulp.dest(config.paths.js.dest))
})

gulp.task('js-minify', function () {
    return gulp.src(config.paths.js.dest + '/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js.dest))
})

gulp.task('js-dev', function (done) {
    runSequence('js-concat', done)
})

gulp.task('js', function (done) {
    runSequence('js-concat', 'js-minify', done)
})

gulp.task('build', function (done) {
    runSequence('haml-build', 'jekyll', 'html', 'sass', ['css', 'js'], 'reload', done)
})

gulp.task('fast-build', function (done) {
    runSequence('jekyll', 'html', 'sass', ['css', 'js'], 'reload', done)
})

gulp.task('dev-build', function (done) {
    runSequence('haml-build', 'jekyll', 'sass', ['css-dev', 'js-dev'], 'reload', done)
})

gulp.task('fast-dev-build', function (done) {
    runSequence('jekyll', 'sass', ['css-dev', 'js-dev'], 'reload', done)
})

gulp.task('upload', function () {
    return gulp.src(config.paths.build)
        .pipe(ghPages({
            branch: 'master'
        }))
})

// Purges website cache so updates are shown
gulp.task('purge-online-cache', function () {
    cloudflare(config.cloudflare)
})

gulp.task('sitemap', function () {
    gulp.src(config.paths.html.build)
        .pipe(sitemap({
            siteUrl: config.siteUrl
        })) // Returns sitemap.xml
        .pipe(gulp.dest(root))
})

gulp.task('submit-sitemap', function (done) {
    submitSitemap.submitSitemap(config.sitemapUrl, function (err) {
        if (err) {
            console.warn(err)
        }
        done()
    })
})

gulp.task('save', function (done) {
    var msg = argv.msg || ''
    return require('child_process', done).exec('rake base:save[' + msg + ']', {
        stdio: 'inherit'
    }, done)
})

gulp.task('deploy', function (done) {
    return runSequence('build', 'sitemap', 'submit-sitemap', 'save', 'upload', 'purge-online-cache', done)
})

gulp.task('watch', ['haml-watch'], function () {
    gulp.watch(config.paths.watch, ['fast-build'])
})

gulp.task('dev-watch', ['haml-watch'], function () {
    gulp.watch(config.paths.watch, ['fast-dev-build'])
})

gulp.task('full', function (done) {
    runSequence('build', 'watch', 'browser-sync', done)
})

gulp.task('default', function (done) {
    runSequence('fast-dev-build', 'dev-watch', 'browser-sync', done)
})