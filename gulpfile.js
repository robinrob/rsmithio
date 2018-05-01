var root = require('path').resolve('./')

var buildDir = '_site'
var config = {
    paths: {
        build: buildDir + '/**',
        img: {
            src: ['img/**/*']
        },
        markdown: {
            src: ['_posts/*.md', '_drafts/*.md'],
        },
        html: {
            src: ['**/*/*.html', '!_site/**/*'],
            build: [buildDir + '/**/*.html'],
            dest: './'
        },
        sass: {
            main: '_sass/main.sass',
            src: ['_sass/*.sass'],
            dest: 'css/'
        },
        css: {
            main: 'styles.css',
            src: ['css/*.css'],
            dest: buildDir + '/css/'
        },
        js: {
            main: 'scripts.js',
            headerMain: 'header_scripts.js',
            src: ['_js/*.js'],
            headerSrc: ['_js_header/*.js'],
            dest: '_site/js/'
        },
        cv: 'robin_smiths_cv.pdf'
    },
    siteUrl: "https://rsmith.io",
    sitemapUrl: "https://rsmith.io/sitemap.xml",
}
config.paths.watch = [
    ...['_config.yml'],
    ...['admin/config.yml'],
    ...config.paths.img.src,
    ...config.paths.markdown.src,
    ...config.paths.html.src,
    ...config.paths.sass.src,
    ...config.paths.js.src,
    ...['orbiter/**/*']
]
config = require('./_secret-config.js')(config)

var argv = require('yargs').argv
var browserSync = require('browser-sync')
var combiner = require('stream-combiner2')
var concat = require('gulp-concat')
var cp = require('child_process')
var gulp = require('gulp')
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html')
var ngmin = require('gulp-ngmin')
var path = require('path')
var plumber = require('gulp-plumber')
var prefix = require('gulp-autoprefixer')
var task = require('gulp-task')
var run = require('gulp-run')
var sass = require('gulp-sass')
var shell = require('shelljs/global')
var sitemap = require('gulp-sitemap')
var submitSitemap = require('submit-sitemap')
var watch = require('gulp-watch')

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
}

var ERROR_LEVELS = ['error', 'warning'];

// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf('error');
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
    console.log('error: ' + JSON.stringify(error.message, null, '\t'))

    gutil.log(error.message);
    if (isFatal(level)) {
        //process.exit(0);
    }
}

// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}
// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);}


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
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'}).on('close', done)
})

gulp.task('reload', function (done) {
    browserSync.reload()
    done()
})

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: '_site'
        },
        browser: 'Google\ Chrome'
    })
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
 * Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
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

gulp.task('css-copy', function (done) {
    return gulp.src(config.paths.css.dest + config.paths.css.main)
        .pipe(gulp.dest('_includes/'))
})

gulp.task('css-dev', gulp.series('css-concat', 'css-copy'))

gulp.task('css', gulp.series('css-concat', 'css-copy'))

gulp.task('cv-to-pdf', function(done) {
    //run("wkhtmltopdf --page-size A4 --margin-top 5mm --margin-right 5mm --margin-bottom 5mm --margin-left 5mm --encoding UTF-8 --quiet _site/cv/print/index.html _site/robin_smiths_cv.pdf").exec(done)
    return gulp.src(config.paths.cv).pipe(gulp.dest('_site/'))
})

gulp.task('js-concat', function () {
    return gulp.src(config.paths.js.src)
        .pipe(concat(config.paths.js.main))
        .pipe(gulp.dest(config.paths.js.dest))
})

gulp.task('js-concat-header', function () {
    return gulp.src(config.paths.js.headerSrc)
        .pipe(concat(config.paths.js.headerMain))
        .pipe(gulp.dest(config.paths.js.dest))
})

gulp.task('js-dev', gulp.series('js-concat'))

gulp.task('js', gulp.parallel(gulp.series('js-concat'), gulp.series('js-concat-header')))

gulp.task('sitemap', function () {
    return gulp.src(config.paths.html.build)
        .pipe(sitemap({
            siteUrl: config.siteUrl
        })) // Returns sitemap.xml
        .pipe(gulp.dest(root))
})

gulp.task('submit-sitemap', function (done) {
    return submitSitemap.submitSitemap(config.sitemapUrl, function (err) {
        if (err) {
            console.warn(err)
        }
        done()
    })
})

gulp.task('save', function (done) {
    var msg = argv.msg || 'Quick-deploy'
    return require('child_process', done).exec('rake base:save[' + msg + ']', {
        stdio: 'inherit'
    }, done)
})

gulp.task('watch', function () {
    return watch(config.paths.watch, gulp.series('fast-build'))
})

gulp.task('dev-watch', function () {
    return watch(config.paths.watch, gulp.series('fast-dev-build'))
})

// Build
gulp.task('build', gulp.series('jekyll', 'sass', gulp.parallel('css', 'js'), 'cv-to-pdf', 'reload'))

gulp.task('fast-build', gulp.series('jekyll', 'html', 'sass', gulp.parallel('css', 'js'), 'reload'))

gulp.task('dev-build', gulp.series('jekyll', 'sass', gulp.parallel('css-dev', 'js-dev'), 'cv-to-pdf', 'reload'))

gulp.task('fast-dev-build', gulp.series('jekyll', 'sass', gulp.parallel('css-dev', 'js'), 'reload'))

// Deploy
gulp.task('deploy', gulp.series('save', 'build', 'sitemap', 'submit-sitemap'))

// Build/watch
gulp.task('full', gulp.series('build', gulp.parallel('watch', 'browser-sync')))

gulp.task('default', gulp.series('dev-build', gulp.parallel('dev-watch', 'browser-sync')))