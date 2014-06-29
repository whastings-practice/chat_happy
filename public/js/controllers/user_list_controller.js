angular.module('ChatApp.controllers')
.controller('UserListController', function(chatRoom, $scope, socket) {
  this.users = chatRoom.users;
  socket.on('user_list_update', function(data) {
    $scope.$apply(function() {
      chatRoom.addUsers(data);
    });
  });
  socket.on('user_connect', function(data) {
    $scope.$apply(function() {
      chatRoom.addUser(data.user);
    });
  });
  socket.on('user_disconnect', function(data) {
    $scope.$apply(function() {
      chatRoom.removeUser(data.user);
    });
  });
});
