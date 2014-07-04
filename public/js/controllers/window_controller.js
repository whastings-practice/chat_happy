angular.module('ChatApp.controllers').
controller('WindowController', function(chatRoom, $scope, socket) {
  var self = this;
  this.messages = chatRoom.messages;

  socket.on('name_change', $scope, function(data) {
    chatRoom.addNotice(
      'User ' + data.oldName + ' has changed name to ' + data.newName
    );
  });

  socket.on('new_message', $scope, function(data) {
    chatRoom.addMessage(data);
  });

  socket.on('user_connect', $scope, function(data) {
    chatRoom.addNotice('User ' + data.user + ' has joined.');
  });

  socket.on('user_disconnect', $scope, function(data) {
    chatRoom.addNotice('User ' + data.user + ' has left.');
  });
});
