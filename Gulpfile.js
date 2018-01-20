/* eslint-disable */
const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const critical = require('critical').stream;
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();
const baseDir = './static/dist';

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log(`Building for environment ${environment}`);

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
  .pipe(gulp.dest(`${baseDir}/css`))
});

gulp.task('imagemin', () => {
  gulp.src('./src/img/*')
  .pipe(webp())
  .pipe(imagemin())
  .pipe(gulp.dest(`${baseDir}/img`));
});

gulp.task('webpack', () => gulp
  .src('./src/js/main.js')
  .pipe(gulpWebpack(Object.create(require('./webpack.config')), webpack))
  .pipe(gulp.dest(`${baseDir}/js`)));

gulp.task('critical', () => {
  const criticalOpts = {
    base: '/static',
    inline: true,
    css: [`${baseDir}/css/main.css`],
    include: ['.webp', '.no-webp'],
    dimensions: [{
      width: 400,
      height: 700,
    }, {
      width: 768,
      height: 1024,
    }, {
      width: 1024,
      height: 768,
    }, {
      width: 1440,
      height: 900,
    }, {
      width: 1920,
      height: 1080,
    }],
  };
  gulp.src('./index.html')
  .pipe(critical({ ...criticalOpts }))
  .on('error', err => gutil.log(gutil.colors.red(err.message)))
  .pipe(gulp.dest('./static'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './static',
    },
  });
  gulp.watch(['./src/scss/*.scss', './src/scss/partials/*.scss'], ['sass']);
  gulp.watch(['./src/js/*.js'], ['webpack']);
  gulp.watch(['./index.html'], ['critical']);
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'webpack']);
gulp.task('postbuild', ['critical', 'imagemin']);
