const {src, series, watch, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');

function buildStyles() {
    return src('src/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('dist/assets/css'))
        .pipe(browserSync.stream());
}

function copyHTML() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

function copyJS() {
    return src('src/js/**/*.js')
        .pipe(dest('dist/js'));
}

function devWatch(){
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    copyHTML()
    watch(['src/assets/scss/**/*.scss'], buildStyles);
    watch(['src/*.html']).on('change', copyHTML);
    watch(['src/*.html']).on('change', browserSync.reload);
    watch(['src/js/**/*.js']).on('change', browserSync.reload);
    watch(['src/js/**/*.js']).on('change', copyJS);
}

exports.watch = devWatch;