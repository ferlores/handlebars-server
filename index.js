var hb = require('handlebars'),
  fs = require('fs'),
  path = require('path'),
  templates = {};

// Sync walk in order to have all loaded before starting the service
function walk(dirname, fn) {
  fs.readdirSync(dirname).forEach(function(fileName) {
    fs.stat(dirname + '/' + fileName, function(err, stat) {
      if (stat && stat.isDirectory()) {
        walk(dirname + '/' + fileName, fn);
      } else {
        fn(null, dirname + '/' + fileName);
      }
    });
  });
}

module.exports = function(dirname) {
  if (!dirname) throw new Error('handlebars() templates directory required');

  
  var partials = path.resolve(path.join(dirname,'partials')),
      helpers = path.resolve(path.join(dirname, 'helpers.js'));
  
  // Loads all the .html from the partials directory
  walk(partials, function(err, fileName) {
    var ext = path.extname(fileName),
      base = fileName.replace(partials + '/', '') // removes the partial dir
                     .replace(ext, '')            // removes the extension
                     .replace('/', '.');          // Handlebars doesnt support partial names with slashes

    if (ext === '.html') {
      // register as partials
      hb.registerPartial(base, fs.readFileSync(fileName, 'ascii'));
    }

  });

  // register the helpers - it must be a nodejs module
  path.existsSync(helpers) && require(helpers)(hb);

  // excecutes the template
  var app = function(data) {

    // Lazy load for templates
    if (!templates[data.template]) {
      templates[data.template] = hb.compile(
          fs.readFileSync(path.join(dirname, data.template + '.html'), 'ascii'));
    }

    return templates[data.template](data.context);
  }

  // middleware for handling POST request
  app.middleware = function(req, res, next) {
    res.end(app(req.body));
  }

  return app;
};