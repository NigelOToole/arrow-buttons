const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;



gulp.task('styles', () => {
  return gulp.src('styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('styles'))
    .pipe(reload({stream: true}));
});



gulp.task('serve', ['styles'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.']
    }
  });

  gulp.watch(['*.html']).on('change', reload);
  gulp.watch('styles/**/*.scss', ['styles']);
});

gulp.task('default', ['serve']);
