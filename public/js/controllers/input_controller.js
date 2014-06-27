window.ChatApp.controller('InputController', function(chatRoom, $scope, socket) {
  this.message = '';

  this.sendMessage = function() {
    chatRoom.addMessage(this.message);
    socket.emit('message', {message: this.message});
  };
});
