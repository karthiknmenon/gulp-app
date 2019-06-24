var gulp = require('gulp');
var imagemin= require('gulp-imagemin-fix');
var sass= require('gulp-sass');
var rseqeuence=require('run-sequence');
var fsequence=require('run-sequence');
sassLint = require('gulp-sass-lint');
var server= require('gulp-webserver');
var autoprefixer = require('autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss')
// live-realod
var connect = require('gulp-connect');
// to copy HTML files
gulp.task('copyHTML', function(){
    return  gulp.src("./src/html/*.html")
    .pipe(gulp.dest('dist/html/'));
});
// to optimize images
gulp.task('imageMIN',function(){
    return gulp.src("./src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'))
});
// to convert scss to css
gulp.task('scssCompiler',function(){
    return gulp.src("./src/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css/"))
    // .pipe(liveReload());
});
// watch
gulp.task('watch', function(){
    // liveReload.listen();
    // gulp.watch('./sass/**/*.scss')
    gulp.watch('./sass/**/*.scss', ['sass', 'livereload']);
});
//scss linting 
gulp.task('lint', function () {
    return gulp.src('sass/**/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
});
// auto-prefixer
gulp.task('autoprefixer', function(){
    return gulp.src('./dist/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css/'))
})
//server spin-up
gulp.task('server', function(){
    gulp.src(".")
    .pipe(server({
        livereload: true,
        open: true,
        port:6000
    }));
});
//live-reload
gulp.task('livereload', function (){
    gulp.src('./dist/**/*')
    .pipe(connect.reload());
  });
//dev
gulp.task('dev-build',function(cb){
    rseqeuence(['watch', 'scssCompiler', 'livereload', 'server'], cb);

});
//production
gulp.task('prod', function(cb){
    fsequence(['scssCompiler', 'imageMIN', 'copyHTML','server'], cb);
});



