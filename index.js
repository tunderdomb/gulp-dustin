var dustin = require("dustin")

var gutil = require("gulp-util")
var File = gutil.File;
var through = require("through2")
var PluginError = gutil.PluginError

module.exports.compile = compile
module.exports.render = render
module.exports.copy = copy

function compile( options ){
  var adapter = dustin(options)
  return through.obj(function( file, enc, done ){
    if ( file.isNull() ) return // ignore
    if ( file.isStream() ) return this.emit("error", new PluginError("gulp-concat", "Streaming not supported"))

    var stream = this
    adapter.compile(file.path, file.contents.toString(), function( err, compiled ){
      if( err ) return done(err)
      var compiledFile = new File({
        cwd: file.cwd,
        base: file.base,
        path: gutil.replaceExtension(file.path, ".js"),
        contents: new Buffer(compiled)
      })
      stream.push(compiledFile)
      done(err)
    })
  })
}

function render( options, context ){
  var adapter = dustin(options)
  return through.obj(function( file, enc, done ){
    if ( file.isNull() ) return // ignore
    if ( file.isStream() ) return this.emit("error", new PluginError("gulp-concat", "Streaming not supported"))

    var stream = this
    adapter.render(file.path, file.contents.toString(), context, function( err, rendered ){
      if( err ) return done(err)
      var renderedFile = new File({
        cwd: file.cwd,
        base: file.base,
        path: gutil.replaceExtension(file.path, ".html"),
        contents: new Buffer(rendered)
      })
      stream.push(renderedFile)
      done(err)
    })
  })
}

function copy( dest, resolvePath, options ){
  options = options || {}
  var dustinHelpers = options.dustinHelpers
    , dustHelpers = options.dustHelpers
    , userHelpers = options.userHelpers
  dustin.copyClientLibs(dest, resolvePath, dustinHelpers, dustHelpers, userHelpers)
}