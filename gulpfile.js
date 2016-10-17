const gulp = require('gulp');
const browserify = require('gulp-browserify');
const webpack = require('gulp-webpack');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const webpackConfig = require('./webpack.config.js');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

// gulp default to test if it works.
gulp.task('default', function() {
  console.log('GULP works!');
});

// gulp babel to compile components.
gulp.task('babel', function() {
	return gulp.src('./src/*.jsx')
    // .pipe(jsx())
		.pipe(babel({
			presets: ['react']
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('browserify', function() {

  gulp.src(['dist/app.js'], {read: false})

    // Browserify, and add source maps if this isn't a production build
    .pipe(browserify())
    .on('prebundle', function(bundler) {
      // Make React available externally for dev tools
      bundler.require('react');
    })

    // Rename the destination file
    .pipe(rename('bundle.js'))

    // Output to the build directory
    .pipe(gulp.dest('dist/'));
});
// gulp watch to monitor changes in any jsx file.
// If there is a file change, use babel task.
gulp.task('watch', function() {
  gulp.watch('./src/*.jsx', ['babel', 'browserify']);
});

// gulp heroku for Heroku shell commands.
// Be sure to login to Heroku, clone repo, create, add, commit
// before calling this task.
gulp.task('heroku', shell.task([
  'git push heroku master',
  'heroku open'
]));

// gulp webpack to minify, watch, and pipe compiled js files to dist.
gulp.task('webpack', function() {
  return gulp.src('./compiled/components/*.js')
  .pipe(webpack({
    watch: true,
    webpackConfig
  }))
  .pipe(gulp.dest('./dist'));
});
