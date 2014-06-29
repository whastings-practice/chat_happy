angular.module('ChatApp.controllers')
.controller('UserListController', function(chatRoom, $scope, socket) {
  this.users = chatRoom.users;
  socket.on('user_list_update', $scope, function(data) {
    chatRoom.addUsers(data);
  });
  socket.on('user_connect', $scope, function(data) {
    chatRoom.addUser(data.user);
  });
  socket.on('user_disconnect', $scope, function(data) {
    chatRoom.removeUser(data.user);
  });
});
