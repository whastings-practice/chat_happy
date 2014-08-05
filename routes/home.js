"use strict";

var _ = require('underscore');

module.exports = function(app, environment) {
  app.get('/', function(req, res) {
    res.render('index', {
      environment: environment,
      templates: _(req.ngTemplates)
    });
  });
};
