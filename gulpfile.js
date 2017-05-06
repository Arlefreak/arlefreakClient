'use strict';

var gulp = require('gulp');
var fs = require('fs');
var runSequence = require('run-sequence');
var bower = require('main-bower-files');
var gulpif = require('gulp-if');
var lint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
// var buffer      = require('vinyl-buffer');
// var sourcemaps  = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var nib = require('nib');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gifsicle = require('imagemin-gifsicle');
var jpegtran = require('imagemin-jpegtran');
var realFavicon = require ('gulp-real-favicon');
var FAVICON_DATA_FILE = 'faviconData.json';

// var svgo = require('imagemin-svgo');

var DEBUG = process.env.NODE_ENV === 'production' ? false : true;
const DEST_PATH = 'public/';

// grab libraries files from bower_components, minify and push in /public
gulp.task('bower', function() {
    // var filter = {};
    var jsFilter = gulpFilter('**/*.js', {
        restore: true
    });
    var cssFilter = gulpFilter('*.css', {
        restore: true
    });
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
    var destPath = DEST_PATH + 'lib';

    return gulp.src(bower({
        debugging: true,
        includeDev: true
    }))

    // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe(gulp.dest(destPath + '/js/'))
        .pipe(gulpif(!DEBUG, uglify()))
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destPath + '/js/'))
        .pipe(jsFilter.restore)

    // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe(gulp.dest(destPath + '/css'))
    // .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destPath + '/css'))
        .pipe(cssFilter.restore)

    // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(destPath + '/fonts'));
});


gulp.task('browserify', function() {
    return browserify()
        .on('error', gutil.log)
        .require('./src/js/app.js', {
            entry: true,
            extensions: ['.js', 'jsx'],
            debug: true
        })
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(DEST_PATH + 'js'));
});


gulp.task('js', function() {
    return gulp.src(['src/js/**/*.js', '!src/js/templates/**/*.js'])
        .pipe(lint.format());
        // .pipe(gulpif(!DEBUG, uglify()))
        // .pipe(concat('script.js'))
        // .pipe(gulp.dest(DEST_PATH + 'js/'));
});

gulp.task('css', function() {
    gulp.src('src/css/style.styl')
        .pipe(stylus({
            use: nib(),
            compress: !DEBUG,
            import: ['nib']
        }))
        .pipe(gulp.dest(DEST_PATH + 'css/'))
        .pipe(connect.reload());
});

gulp.task('img', function() {
    gulp.src('src/img/**/*')
    // .pipe(imagemin({
    //     progressive: true,
    // svgoPlugins: [{
    //     removeViewBox: false
    // }],
    // use: [pngquant(), gifsicle(), jpegtran()]
    // }))
        .pipe(gulp.dest(DEST_PATH + 'img'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest(DEST_PATH))
        .pipe(connect.reload());
});

gulp.task('files', function() {
    gulp.src(['./src/**.*', '!./src/**.*.html', '!./src/**.*js', '!./src/img/'])
        .pipe(gulp.dest(DEST_PATH));
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true,
        debug: true,
        fallback: DEST_PATH + 'index.html'
    });
});

gulp.task('react', function() {
    runSequence('js', 'browserify');
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: 'src/img/favicon.png',
        dest: DEST_PATH + 'img/favicons/',
        iconsPath: '/img/favicons/',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#ffffff',
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                },
                appName: 'ellugar.co'
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#000000',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: true,
                    windows10Ie11EdgeTiles: {
                        small: true,
                        medium: true,
                        big: true,
                        rectangle: false
                    }
                },
                appName: 'ellugar.co'
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#000000',
                manifest: {
                    name: 'ellugar.co',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 10,
                themeColor: '#000000'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        versioning: {
            paramName: 'v',
            paramValue: 'rM3xw7xzqY'
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    return gulp.src(['views/favicon.html'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('views/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('favicon', function() {
    runSequence('generate-favicon', 'inject-favicon-markups');
});

gulp.task('init', ['css', 'bower', 'react', 'img', 'html', 'files', 'favicon']);

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.styl', ['css']);
    gulp.watch('src/js/**/*.js', ['react']);
    gulp.watch('src/js/**/*.jsx', ['react']);
    gulp.watch(['src/img/**/*', '!src/img/favicon.png'], ['img']);
    gulp.watch(['src/img/favicon.png'], ['favicon']);
    gulp.watch('src/*.html', ['html']);
});

gulp.task('default', function() {
    runSequence('init', 'watch');
});
