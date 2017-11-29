var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var del = require('del');
var ejs = require('gulp-ejs');
var eslint = require('gulp-eslint');
var glob = require('glob');
var gulpicon = require('gulpicon/tasks/gulpicon');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var styleLint = require('gulp-stylelint');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

// ---------- TASKS FOR MAIN APPLICATION-------

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('cache:clear', function(cb) {
  return cache.clearAll(cb);
});

gulp.task('clean:build', function() {
  return del.sync('build');
});

gulp.task('clean:js', function() {
  return del.sync('js/build');
});

gulp.task('clean:ejs', function() {
  del.sync('app/*.html');
});

gulp.task('build:vendor', function() {
  return gulp.src('app/vendor/**/*.js')
    .pipe(gulp.dest('build/vendor'));
});

gulp.task('move:icons', function() {
  return gulp.src('app/scss/icons/*.css')
    .pipe(gulp.dest('app/images/icons'));
});

gulp.task('build:icons', function() {
  return gulp.src('app/images/icons/icons.**.css')
    .pipe(gulp.dest('build/images/icons/'));
});

gulp.task('build:images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('ejs', ['clean:ejs'], function() {
  return gulp.src('app/views/pages/**/*.ejs')
    .pipe(ejs(
      {
        data: require('./app/js/data.json')
      },
      { ext:'.html' }))
    .on('error', gutil.log)
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src(['app/js/*.js', '!app/js/*-polyfill.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('app/js/build/'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
});

gulp.task('validations', ['lint', 'js'], function() {
  return gulp.src('app/js/validation/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('validation.js'))
    .pipe(gulp.dest('app/js/build/'))
});

gulp.task('move:polyfills', function() {
  return gulp.src('app/js/*-polyfill.js')
    .pipe(gulp.dest('app/js/build/'))
});

gulp.task('lint', function () {
  return gulp.src(['app/js/**/*.js', '!app/js/*-polyfill.js', '!app/js/build', '!app/js/build/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:sass', function () {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(styleLint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('sass', ['lint:sass'], function() {
  return gulp.src('app/scss/+(*.scss|*.css)')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('serve:build', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'));
});

gulp.task('build', function(cb) {
  runSequence('cache:clear', 'clean:build', ['sass', 'validations', 'build:vendor'], 'move:icons', 'build:icons', 'ejs', 'useref', cb)
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/images/icons/preview.html', ['move:icons']);
  gulp.watch('app/views/**/*.ejs', ['ejs']);
  gulp.watch(['app/js/**/*.js', '!app/js/build', '!app/js/build/**'], ['clean:js', 'validations']);
  gulp.watch('app/js/**/*.json', ['ejs']);
});

gulp.task('default', function(cb) {
  runSequence('ejs', ['sass', 'validations', 'browserSync', 'watch'], cb);
});

// ---------- GULPICON -------

// grab the config, tack on the output destination
var config = require('./icon-config.js');
config.dest = './app/images/icons';
// grab the file paths
var files = glob.sync('./app/images/icons/svg/*.svg');

// set up the gulp task
gulp.task('icons', gulpicon(files, config));
