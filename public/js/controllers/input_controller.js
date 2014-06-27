window.ChatApp.controller('InputController', function($scope, socket) {
  this.message = '';

  this.sendMessage = function() {
    socket.emit('message', {message: this.message});
  };
});
