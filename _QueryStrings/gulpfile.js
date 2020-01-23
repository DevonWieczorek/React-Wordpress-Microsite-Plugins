// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-multiple-destination.md

const gulp = require('gulp');
const browserify = require('browserify');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

// Use this entrypoint to bundle all js files in src
// const allJS = 'src/**/*.js';

// For this plugin we only need to bundle our main file
const mainEntry = 'src/execute-querystrings.js';

gulp.task('js', () => {

  return gulp.src(mainEntry, {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      log.info('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-uglify does not support streaming contents)
    .pipe(buffer())

    // minify our code
    .pipe(uglify())

    // save it as a different name
    .pipe(rename({ extname: '.bundle.js' }))

    // save to public folder
    .pipe(gulp.dest('public'));

});

// Allow running the below by just calling 'gulp'
gulp.task('default',  gulp.series('js'));
