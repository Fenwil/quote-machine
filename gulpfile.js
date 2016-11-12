const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

gulp.task('minify-html', () => {
    gulp.src('src/html/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(""));
});

gulp.task('minify-css', () => {
    gulp.src('src/css/styles.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('babelify', () => {
    gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-js', () => {
    gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-images', () =>
    gulp.src('src/img/paper.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);

gulp.task('default', ['minify-html', 'minify-css', 'babelify', 'minify-js', 'minify-images'], () => {
    gulp.watch('src/html/index.html', ['minify-html']);
    gulp.watch('src/css/styles.css', ['minify-css']);
    gulp.watch('src/js/app.js', ['babelify']);
    gulp.watch('dist/js/app.js', ['minify-js']);
    gulp.watch('src/img/paper.jpg', ['minify-images']);
})