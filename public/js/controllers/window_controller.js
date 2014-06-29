angular.module('ChatApp.controllers').
controller('WindowController', function(chatRoom, $scope, socket) {
  var self = this;
  this.messages = chatRoom.messages;

  socket.on('new_message', $scope, function(data) {
    chatRoom.addMessage(data.message);
  });

  socket.on('user_connect', $scope, function(data) {
    chatRoom.addMessage('User ' + data.user + ' has joined.');
  });

  socket.on('user_disconnect', $scope, function(data) {
    chatRoom.addMessage('User ' + data.user + ' has left.');
  });
});
