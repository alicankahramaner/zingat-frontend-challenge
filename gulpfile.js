const gulp = require('gulp');
const config = require('./src/helpers/config');
const fs = require('fs');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const gulp_sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcsso = require('postcss-csso');
const gulpminify = require('gulp-minify');

const taskPaths = {
    style: {
        src: path.join(config.source, 'styles'),
        dest: path.join(config.destination, 'styles')
    },
    script: {
        src: path.join(config.source, 'scripts', 'app.js'),
        dest: path.join(config.destination, 'scripts')
    }
}

// Cleaner
gulp.task('cleaner', (cb) => {
    fs.rmdirSync(config.destination, {
        recursive: true
    });
    cb();
});

//#region Style
const style = (cb) => {

    gulp.src(path.join(taskPaths.style.src, 'style.scss'))
        .pipe(gulp_sass().on('error', gulp_sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer(),
            postcsso()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(taskPaths.style.dest))
    cb();
};

gulp.task('style', style);
//#endregion Style

//#region Script
const script = (cb) => {
    gulp.src(taskPaths.script.src)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulpminify({
            ext: {
                min: '.min.js',
            },
            noSource: true
        }))
        .pipe(gulp.dest(taskPaths.script.dest))
    cb();
};

gulp.task('script', script);
//#endregion Script

// Init watch task for development mode
if (config.env === 'dev') {
    gulp.watch([path.join(taskPaths.style.src, '**', '*.scss')], style);
    gulp.watch([taskPaths.script.src], script);
}

exports.default = gulp.series('cleaner', 'style', 'script');