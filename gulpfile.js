import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass)
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import browserSync from 'browser-sync';


// Компиляция SASS
gulp.task('sass-compile', function(){
    return gulp.src('site/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) 
    .pipe(sourcemaps.write('site/'))
    .pipe(gulp.dest('site/css/'))
    .pipe(browserSync.stream())
})
// Auto-reload
gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: 'site/'
        },
    notify: false
    });
  watch('site/scss/**/*.scss', gulp.series('sass-compile'));
  watch('site/*.html').on('change', browserSync.reload);
})
