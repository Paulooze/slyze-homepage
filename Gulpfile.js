/* eslint-disable */
const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

gulp.task('sass', () => {
  const plugins = [
    autoprefixer(),
  ];
  environment === 'production' && plugins.push(cssnano());
  gulp
  .src('./src/scss/main.scss')
  .pipe(sass({
    errorLogToConsole: true,
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(postcss(plugins))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream())
});

gulp.task('webpack', () => gulp
  .src('./src/js/main.js')
  .pipe(gulpWebpack(Object.create(require('./webpack.config')), webpack))
  .pipe(gulp.dest('./dist/js')));

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch(['./src/scss/*.scss', './src/scss/partials/*.scss'], ['sass']);
  gulp.watch(['./src/js/*.js'], ['webpack']);
  gulp.watch(['./index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'webpack']);
