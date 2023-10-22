function defaultTask(cb) {
    // place code for your default task here
    cb();
}

const sass = require('gulp-sass')(require('sass'));

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);


const { src, dest } = require('gulp');
const pug = require('gulp-pug');

exports.views = () => {
  return src('./src/*.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(dest('./dist'));
};


const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');

gulp.src('path/to/assets/*.svg')
  .pipe(svgSprite(/* ... Insert your configuration here ... */))
  .pipe(gulp.dest('out'));


var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

exports.default = defaultTask