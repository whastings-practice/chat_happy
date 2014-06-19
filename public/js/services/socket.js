angular.module('ChatApp', [])
.factory('socket', function() {
  return io.connect();
});
