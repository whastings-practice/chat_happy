(function() {
  "use strict";

  angular.module('ChatApp.services', []);
  angular.module('ChatApp.controllers', []);
  angular.module('ChatApp.directives', []);
  var app = window.ChatApp = angular.module('ChatApp', [
    'ChatApp.services',
    'ChatApp.controllers',
    'ChatApp.directives'
  ]);
})();
