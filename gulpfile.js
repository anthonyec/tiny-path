//  Dependencies

var fs = require('fs'),
    gulp = require('gulp'),
    ftp = require('gulp-ftp'),                                                // Doesnt work well on Windows due to backward slashes
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulputil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    browsersync = require('browser-sync');


//  Config Import

var package = require('./package.json'),
    globs = package.globs,
    config = package.config,
    output = package.output,
    credentials;


// Init Config Check and Setup

if (fs.existsSync('./credentials.json')) {                                    // Need to create some kind of wrapper function for all file includes
  credentials = require('./credentials.json');
} else {                                                                      // checkFile (src, ) // USE WORK CODE IN PACKAGE NAME YE
  console.log("\033[31m'credentials.json' is missing. Create this file if you want to use the FTP module");
}


// Tasks

gulp.task('sync', function() {                                                // Havent really got this working nicely yet
  browsersync.init(['**/*.css', '**/*.js', '**/*.html'], {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('scripts', function () {
  return gulp.src(globs.task.js)
    .pipe(concat(output.js.name))
    .pipe(uglify({ mangle: true }))
    .pipe(gulp.dest(output.js.dest));
});

gulp.task('sass', function () {
  return gulp.src(globs.task.sass)
    .pipe(sass(config.sass)).on('error', gulputil.log)
    .pipe(gulp.dest(output.sass.dest));
});

gulp.task('ftp', function () {
    gulp.run('default');

    gulp.src(globs.build.ftp)
        .pipe(ftp(credentials.ftp));
});

gulp.task('default', function() {
    gulp.start('scripts', 'sass');
});


// Watch Tasks

gulp.task('watch', function () {
  gulp.watch(globs.watch.sass, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('sass');
  });

  gulp.watch(globs.watch.js, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
  });
});