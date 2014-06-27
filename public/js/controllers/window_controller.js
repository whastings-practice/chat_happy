angular.module('ChatApp.controllers').
controller('WindowController', function(chatRoom, $scope, socket) {
  var self = this;
  this.messages = chatRoom.messages;

  socket.on('new_message', function(data) {
    $scope.$apply(function() {
      chatRoom.addMessage(data.message);
    });
  });
});
