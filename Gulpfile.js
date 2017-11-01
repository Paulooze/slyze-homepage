const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => gulp
  .src('./src/scss/main.scss')
  .pipe(sass({
    errorLogToConsole: true,
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(postcss([autoprefixer()]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream())
);

gulp.task('babel', () => gulp
  .src('./src/js/main.js')
  .pipe(babel({
    presets: ['env'],
  }))
  .pipe(gulp.dest('./dist/js'))
);

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch(['./src/scss/*.scss', './src/scss/partials/*.scss'], ['sass']);
  gulp.watch(['./src/js/*.js'], ['babel']);
  gulp.watch(['./index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'babel']);
