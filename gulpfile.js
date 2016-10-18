const gulp = require('gulp'),
      browserify = require('gulp-browserify'),
      webpack = require('gulp-webpack'),
      gutil = require('gulp-util'),
      rename = require('gulp-rename'),
      shell = require('gulp-shell'),
      babel = require('gulp-babel'),
      watch = require('gulp-watch'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      webpackConfig = require('./webpack.config.js');

// gulp default to test if it works.
gulp.task('default', shell.task([
  'gulp babel browserify watch'])
);

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

gulp.task('compress', function (cb) {
  pump([
        gulp.src('dist/bundle.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

// gulp heroku for Heroku shell commands.
// Be sure to login to Heroku, clone repo, create, add, commit
// before calling this task.
gulp.task('deploy', shell.task([
  'gulp babel browserify compress',
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
