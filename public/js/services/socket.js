// Inspiration:
// http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
angular.module('ChatApp.services').
factory('socket', function() {
  var socket = io();

  return {
    emit: socket.emit.bind(socket),
    on: function(eventName, scope, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        scope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    }
  };
});
