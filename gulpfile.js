const gulp = require('gulp');
const fs = require('fs');
const runSequence = require('run-sequence');
const nib = require('nib');
const stylus = require('gulp-stylus');
const realFavicon = require('gulp-real-favicon');

const FAVICON_DATA_FILE = 'faviconData.json';

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const gifsicle = require('imagemin-gifsicle');
const jpegtran = require('imagemin-jpegtran');

const DEBUG = process.env.NODE_ENV === 'production';
const DEST_PATH = 'public/';

gulp.task('css', () => {
    gulp.src('src/css/style.styl')
        .pipe(stylus({
            use: nib(),
            compress: !DEBUG,
            import: ['nib'],
        }))
        .pipe(gulp.dest(`${DEST_PATH}css/`));
});

gulp.task('img', () => {
    gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false,
            }],
            use: [pngquant(), gifsicle(), jpegtran()],
        }))
        .pipe(gulp.dest(`${DEST_PATH}img`));
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', (done) => {
    realFavicon.generateFavicon({
        masterPicture: 'src/img/favicon.png',
        dest: `${DEST_PATH}img/favicons/`,
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
                    declareOnlyDefaultIcon: true,
                },
                appName: 'ellugar.co',
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
                        rectangle: false,
                    },
                },
                appName: 'ellugar.co',
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#000000',
                manifest: {
                    name: 'ellugar.co',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true,
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false,
                },
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 10,
                themeColor: '#000000',
            },
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
        },
        versioning: {
            paramName: 'v',
            paramValue: 'rM3xw7xzqY',
        },
        markupFile: FAVICON_DATA_FILE,
    }, () => {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', () => gulp.src(['views/favicon.ejs'])
    .pipe(realFavicon
        .injectFaviconMarkups(JSON
            .parse(fs
                .readFileSync(FAVICON_DATA_FILE))
            .favicon.html_code))
    .pipe(gulp.dest('views/')));

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', () => {
    const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, (err) => {
        if (err) {
            throw err;
        }
    });
});

gulp.task('favicon', () => {
    runSequence('generate-favicon', 'inject-favicon-markups');
});

gulp.task('init', ['css', 'img']);

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.styl', ['css']);
    gulp.watch(['src/img/**/*', '!src/img/favicon.png'], ['img']);
});

gulp.task('default', () => {
    runSequence('init', 'watch');
});
