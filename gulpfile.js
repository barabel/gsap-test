const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('sass');

function buildSass() {
  let condition = false;
  if(process.env.ENVVAR === 'production') {
    condition = true;
  }

  return gulp.src('./styles/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulpIf(condition, autoprefixer({ cascade:false })))
    .pipe(gulp.dest('./styles/css/'));
}

function buildPug() {
  let condition = false;
  if(process.env.ENVVAR === 'production') {
    condition = true;
  }

  return gulp.src('./templates/index.pug')
    .pipe(gulpIf(condition, pug({ pretty: false }), pug({ pretty: true })))
    .pipe(gulp.dest('./'));
}

function addPrefix() {
  return gulp.src('./styles/css/main.css')
    .pipe(autoprefixer({ cascade:false }))
    .pipe(gulp.dest('./styles/css/'));
}

function watchSass() {
  gulp.watch('./styles/sass/**/*.scss', { ignoreInitial: false }, buildSass);
}

function watchPug() {
  gulp.watch('./templates/**/*.pug', { ignoreInitial: false }, buildPug);
}

exports.buildSass = buildSass;
exports.buildPug = buildPug;

exports.watchSass = watchSass;
exports.watchPug = watchPug;

exports.addPrefix = addPrefix;

exports.build = gulp.series(buildPug, buildSass);
exports.watch = gulp.parallel(watchPug, watchSass);