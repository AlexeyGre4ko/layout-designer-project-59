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
const cached = require('gulp-cached');

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
    watch(['app/*.pug'], pug)
}

function cleanBuild() {
    return src('build')
    .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/**/*.html'
    ], {base : 'app'})
    .pipe(dest('build'))
}

exports.styles = styles;
exports.pug = pug;
exports.watching = watching;
exports.build = series(cleanBuild, building)

exports.default = parallel(styles, pug, watching);