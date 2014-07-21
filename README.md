gulp-dustin
===========

## Install

    npm i gulp-dustin --save

## Usage

### .compile(options)

Options are the same as for dustin.


### .render(options, context)

Options are the same as for dustin.
`context` will be passed to `adapter.render` under the hood.
It can be either an object, or a function with a callback.

```js
var gulp = require("gulp")
var concat = require("gulp-concat")
var dustin = require("gulp-dustin")

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
```

## Licence

MIT