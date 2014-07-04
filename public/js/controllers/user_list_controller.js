angular.module('ChatApp.controllers')
.controller('UserListController', function(chatRoom, $scope, socket, user) {
  this.userList = chatRoom.users;
  this.user = user;

  socket.on('info_update', $scope, function(data) {
    user.updateInfo(data);
  });

  socket.on('name_change', $scope, function(data) {
    chatRoom.removeUser(data.oldName);
    chatRoom.addUser(data.newName);
  });

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
