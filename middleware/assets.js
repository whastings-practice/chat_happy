"use strict";

var glob = require('glob');

module.exports = function(assetDir) {
  var cssFiles = [],
      jsFiles = [];

  glob('**/*.js', {cwd: assetDir + '/js'}, function(error, files) {
    if (error) throw error;
    jsFiles = files;
    glob('**/*.css', {cwd: assetDir + '/css'}, function(error, files) {
      if (error) throw error;
      cssFiles = files;
    });
  });

  return function assetsMiddleware(req, res, next) {
    req.stylesheets = cssFiles;
    req.scripts = jsFiles;
    next();
  };
};
