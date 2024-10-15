var gulp = require('gulp');
var connect = require('gulp-connect');  // connect 모듈 대신 gulp-connect 사용

gulp.task('connect', function() {
  connect.server();
});

// Gulp 4에서는 series나 parallel을 사용하여 의존성 작업을 설정
gulp.task('default', gulp.series('connect'));
