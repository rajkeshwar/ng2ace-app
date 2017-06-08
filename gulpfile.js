
var gulp = require('gulp');
var gulpFileTree = require('gulp-file-tree');


gulp.task('treeview', function() {
    return gulp.src('src/**/*.*')
        .pipe(gulpFileTree())
        .pipe(gulp.dest('./src/assets/data'));
});

gulp.task('copysrc', function() {
    return gulp.src('src/app/*')
        .pipe(gulp.dest('./src/assets/code/app'));
});