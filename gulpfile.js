var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var less    = require('gulp-less');
var watch   = require('gulp-watch');
var clean   = require('gulp-clean');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var cssmin  = require('gulp-cssmin');
var rename  = require('gulp-rename');

var PATHS = {
    'js': './public/js/',
    'lib': './public/lib/',
    'css': './public/css/',
    'dest': './build/'
};

var globs = [
        '.jshintrc',
        '*.js',
        'public/js/*.js',
        'router/**/*.js',
        'model/**/*.js',
        '!gulpfile.js'
    ];

gulp.task('jshint', ['clean'], function() {
    return gulp.src(globs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

gulp.task('watch', function() {
    var lessFils = PATHS.css + '*.less';
    gulp.watch(lessFils, ['less']);
});

gulp.task('less', function () {
    var lessFiles = PATHS.css + '*.less';
    return gulp.src(lessFiles)
        .pipe(less())
        .pipe(gulp.dest(PATHS.css));
});

gulp.task('copyCss', ['less'], function() {
    var cssFiles = PATHS.css + '**/*.css';
    return gulp.src(cssFiles)
        .pipe(gulp.dest(PATHS.dest + 'css/'));
});

// 所有css文件合并为一个叫`tuanzll.css`文件
gulp.task('concat', ['copyCss'], function() {
    return gulp.src(PATHS.dest + 'css/*.css')
        .pipe(concat('tuanzll.css'))
        .pipe(gulp.dest(PATHS.dest + 'css/'));
});

gulp.task('css', ['concat'], function() {
    gulp.src(PATHS.dest + '**/*.css')
        .pipe(rename(function(path) {
            path.basename += '-min';
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('js', ['jshint'], function() {
    gulp.src(PATHS.lib + '*.*').pipe(gulp.dest(PATHS.dest + 'lib/'));

    gulp.src(['./public/**/*.js','!./public/lib/*.js'])
        .pipe(gulp.dest(PATHS.dest))
        .pipe(rename(function (path) {
            path.basename += "-min";
        }))
        .pipe(uglify({
            output:{ascii_only:true}
        }))
        .pipe(gulp.dest(PATHS.dest));;

});

gulp.task('clean', function() {
    return gulp.src([PATHS.dest], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('develop', function () {
    nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: ['node_modules/*'],
        nodeArgs: ['--harmony'],
        env: { 'NODE_ENV': 'development' }
    })
    .on('restart', function () {
        console.log('restarted!')
    });
});

// 本地开发模式
gulp.task('default', [
    'develop',
    'watch'
]);

// 打包压缩
gulp.task('build', ['css', 'js']);


