///////// Compile SASS
gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: [
              'last 2 versions',
          ],
          cascade: false
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
  });
  
  // create a task that ensures the `less` task is complete before
  // reloading browsers
  gulp.task('sass-watch', ['sass'], function (done) {
      browserSync.reload();
      done();
  });
  
  
  //// JavaScript
  
  //jslint and uglify
  gulp.task('js', function (cb) {
      pump([
            gulp.src('./src/js/*.js'),
            jshint(),
            jshint.reporter('default'),
            uglify(),
            gulp.dest('./dist/js'),
            browserSync.stream()
        ],
        cb
      );
    });
  
  // create a task that ensures the `js` task is complete before
  // reloading browsers
  gulp.task('js-watch', ['js'], function (done) {
      browserSync.reload();
      done();
  });
  
  
  
  // Live Server with Browser Sync
  // Static Server + watching less/js/html files
  gulp.task('serve', ['sass-watch'], function() {
  
      browserSync.init({
          server: "./"
      });
  
      gulp.watch(["./src/sass/*.scss", "./src/sass/**/*.scss"], ['sass-watch']);
      gulp.watch("./src/js/*.js", ["js-watch"]);
      gulp.watch("./*.html").on('change', browserSync.reload);
  });
  
  // Default task
  gulp.task('default', ['serve']);