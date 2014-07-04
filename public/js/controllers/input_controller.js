angular.module('ChatApp.controllers').
controller('InputController', function(chatRoom, $scope, socket) {
  this.message = '';

  this.sendMessage = function() {
    socket.emit('message', {message: this.message});
    this.message = '';
  };
});
