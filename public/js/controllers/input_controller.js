angular.module('ChatApp.controllers').
controller('InputController', function($scope, socket, user) {
  this.message = '';

  this.sendMessage = function() {
    socket.emit('message', {
      message: this.message,
      room: user.currentRoom().name
    });
    this.message = '';
  };
});
