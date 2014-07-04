angular.module('ChatApp.controllers').
controller('InputController', function(chatRoom, $scope, socket, user) {
  this.message = '';

  this.sendMessage = function() {
    chatRoom.addMessage({author: user.username, message: this.message});
    socket.emit('message', {message: this.message});
    this.message = '';
  };
});
