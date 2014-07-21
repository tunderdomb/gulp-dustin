var gulp = require("gulp")
var concat = require("gulp-concat")
var dustin = require("./index")

gulp.task("compile", function(  ){
  gulp
    .src("test/view/*.dust")
    .pipe(dustin.compile({
      "resolve": "test/view/",
      "preserveWhiteSpace": false
    }))
    .pipe(gulp.dest("test/template"))
    .pipe(concat("inputs.js"))
    .pipe(gulp.dest("test/template"))
})

gulp.task("render", function(  ){
  gulp
    .src("test/view/*.dust")
    .pipe(dustin.render({
      "resolve": "test/view/",
      "preserveWhiteSpace": false
    }, {
      title: "hello"
    }))
    .pipe(gulp.dest("test/renders"))
    .pipe(concat("inputs.html"))
    .pipe(gulp.dest("test/renders"))
})

gulp.task("default", ["compile", "render"])