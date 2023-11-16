const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const gulppug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const { version } = require('gulp-cli/lib/shared/cli-options');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

function fonts {
    return src('app/fonts/src/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    .pipe(newer('app/images/build'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images/build'))
    .pipe(webp())

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images/build'))
    .pipe(imagemin())

    .pipe(dest('app/images/build'))
}

function sprite() {
    return src('app/images/build/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg',
                example: true
            }
        }
    }))
    .pipe(dest('app/images/build'))
}

function styles() {
    return src('app/styles/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version']}))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function pug() {
    return src('app/*.pug')
    .pipe(gulppug())
    .pipe(dest("app/html"))
    .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/styles/style.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/*.pug'], pug)
}

function cleanBuild() {
    return src('build')
    .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/images/build/*.*',
        'app/**/*.html'
    ], {base : 'app'})
    .pipe(dest('build'))
}

exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.sprite = sprite;
exports.pug = pug;
exports.watching = watching;
exports.build = series(cleanBuild, building)

exports.default = parallel(styles, images, pug, watching);