'use strict'

const gulp = require('gulp')

gulp.task('install-patches', _ => {
    return gulp.src(['./patches/**/*'])
        .pipe(gulp.dest('node_modules'))
})