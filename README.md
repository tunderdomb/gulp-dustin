gulp-dustin
===========

## Install

    npm i gulp-dustin --save

## Usage

### .copy(dest, resolvePath, options)

Copy browser scripts to the dest folder.
Set the template base path to `resolvePath`.
This path will be used in the browser to include templates like so:

    resolvePath+template+".js"

where `template` is a template name like `"layout/page"`,
so this option should be something like `/templates/`
or an absolute dir where templates are compiled to.

#### options.dustinHelpers

Bundle built in dustin helpers.

#### options.dustHelpers

Bundle linkedin's [dustjs-helpers](https://github.com/linkedin/dustjs-helpers).

#### options.userHelpers

Bundle user defined helpers matched by a glob pattern.

### .compile(options)

Options are the same as for dustin.

### .render(options, context)

Options are the same as for dustin.
`context` will be passed to `adapter.render` under the hood.

```js
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
```

## Licence

MIT