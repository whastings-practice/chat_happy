"use strict";

var glob = require('glob');

module.exports = function(app, rootDir) {
  glob('**/*.js', {cwd: rootDir + '/public/js'}, function(error, files) {
console.log(files);
    if (error) {
      throw error;
    }
    app.get('/', function(req, res) {
      res.render('index', {scripts: files});
    });
  });

};
