angular.module('ChatApp.services').
factory('socket', function() {
  return io();
});
