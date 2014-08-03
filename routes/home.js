"use strict";

var glob = require('glob'),
    _ = require('underscore');

module.exports = function(app, rootDir) {
  glob('**/*.js', {cwd: rootDir + '/public/js'}, function(error, files) {
    if (error) {
      throw error;
    }
    app.get('/', function(req, res) {
      res.render('index', {scripts: files, templates: _(req.ngTemplates)});
    });
  });

};
