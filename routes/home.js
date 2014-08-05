"use strict";

var glob = require('glob'),
    _ = require('underscore');

module.exports = function(app, assetDir) {
  app.get('/', function(req, res) {
    res.render('index', {
      assetDir: assetDir,
      scripts: req.scripts,
      stylesheets: req.stylesheets,
      templates: _(req.ngTemplates)
    });
  });
};
