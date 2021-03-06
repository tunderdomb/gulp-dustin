var gulp = require("gulp")
var concat = require("gulp-concat")
var dustin = require("./index")

gulp.task("compile", function(  ){
  gulp
    .src("test/view/*.dust")
    .pipe(dustin.compile({
      "views": "test/view/",
      "whiteSpace": false
    }))
    .pipe(gulp.dest("test/template"))
    .pipe(concat("inputs.js"))
    .pipe(gulp.dest("test/template"))
})

gulp.task("render", function(  ){
  gulp
    .src("test/view/*.dust")
    .pipe(dustin.render({
      "views": "test/view/",
      "whiteSpace": false
    }, {
      title: "hello"
    }))
    .pipe(gulp.dest("test/renders"))
    .pipe(concat("inputs.html"))
    .pipe(gulp.dest("test/renders"))
})

dustin.client("test", "/view/", {
  custom: true,
  dust: true,
  user: "test/helpers/*.js"
})

gulp.task("default", ["compile", "render"])