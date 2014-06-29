angular.module('ChatApp.controllers').
controller('WindowController', function(chatRoom, $scope, socket) {
  var self = this;
  this.messages = chatRoom.messages;

  socket.on('new_message', function(data) {
    $scope.$apply(function() {
      chatRoom.addMessage(data.message);
    });
  });

  socket.on('user_connect', function(data) {
    $scope.$apply(function() {
      chatRoom.addMessage('User ' + data.user + ' has joined.');
    });
  });

  socket.on('user_disconnect', function(data) {
    $scope.$apply(function() {
      chatRoom.addMessage('User ' + data.user + ' has left.');
    });
  });
});
