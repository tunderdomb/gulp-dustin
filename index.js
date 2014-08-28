var dustin = require("dustin")

var gutil = require("gulp-util")
var File = gutil.File;
var through = require("through2")
var PluginError = gutil.PluginError

module.exports.compile = compile
module.exports.render = render
module.exports.client = client

function compile( options ){
  var adapter = dustin(options)

  return through.obj(function( file, enc, done ){
    if ( file.isNull() ) return // ignore
    if ( file.isStream() ) return this.emit("error", new PluginError("gulp-concat", "Streaming not supported"))

    var stream = this
    var templateName = adapter.getTemplateNameFromPath(file.path)
    var compiled = adapter.compile(file.contents.toString(), templateName)
    var compiledFile = new File({
      cwd: file.cwd,
      base: file.base,
      path: gutil.replaceExtension(file.path, ".js"),
      contents: new Buffer(compiled)
    })
    stream.push(compiledFile)
    done()
  })
}

function render( options, context ){
  var adapter = dustin(options)
  return through.obj(function( file, enc, done ){
    if ( file.isNull() ) return // ignore
    if ( file.isStream() ) return this.emit("error", new PluginError("gulp-concat", "Streaming not supported"))

    var stream = this
    adapter.renderSource(file.contents.toString(), context, function( err, rendered ){
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

function client( dest, resolvePath, options ){
  dustin.client(dest, resolvePath, options)
}