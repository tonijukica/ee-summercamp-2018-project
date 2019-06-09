var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('client/static/styles/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/static/styles/css'));
});

gulp.task('watch', function () {
  gulp.watch('client/static/styles/scss/**/*.scss', ['sass']);
});
