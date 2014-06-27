(function() {
  "use strict";

  angular.module('ChatApp.services', []);
  angular.module('ChatApp.controllers', []);
  var app = window.ChatApp = angular.module('ChatApp', [
    'ChatApp.services',
    'ChatApp.controllers'
  ]);
})();
