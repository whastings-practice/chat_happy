"use strict";

var async = require('async'),
    fs = require('fs');

module.exports = function(reload, templateDir) {
  var templates = null;

  var readTemplates = function(callback) {
    if (!reload && templates) {
      callback(templates);
      return;
    }
    templates = {};
    fs.readdir(templateDir, function(error, files) {
      if (error) throw error;
      async.each(files, function(file, fileCallback) {
        fs.readFile(templateDir + '/' + file, function(error, contents) {
          if (error) throw error;
          templates[file] = contents.toString();
          fileCallback();
        });
      },
      function(finishCallback) {
        if (error) throw error;
        callback(templates);
      });
    });
  };

  return function ngTemplateMiddleware(req, res, next) {
    readTemplates(function(templates) {
      req.ngTemplates = templates;
      next();
    });
  };
};
