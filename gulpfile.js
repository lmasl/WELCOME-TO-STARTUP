var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        assets: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/sass/main.scss',
        js: 'src/js/main.js',
        assets: 'src/img/**/*'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/sass/**/*.scss',
        js: 'src/js/**/*.js'
    },

    clean: './build'
};

gulp.task('webserver', function() {
    browserSync({
        server: {
            baseDir: './build'
        },
        host: 'localhost',
        port: 3000,
        tunnel: true
    });
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function (cb) {
    pump([
          gulp.src(path.src.js),
          jshint(),
          jshint.reporter('default'),
          uglify(),
          gulp.dest(path.build.js),
          reload({stream: true})
      ],
      cb
    );
  });

gulp.task('style:build', function () {
return gulp.src(path.src.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
            'last 2 versions',
        ],
        cascade: false
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('assets:build', function() {
    return gulp.src(path.src.assets)
        .pipe(gulp.dest(path.build.assets));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'assets:build'
]);

gulp.task('watch', function() {
    watch([path.watch.js], function(ev, callback) {
        gulp.start('js:build');
    });
    watch([path.watch.html], function(ev, callback) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(ev, callback) {
        gulp.start('style:build');
    });
});

gulp.task('clean', function(callback) {
    rimraf(path.clean, callback);
});

gulp.task('default', ['build', 'webserver', 'watch']);