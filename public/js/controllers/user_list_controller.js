angular.module('ChatApp.controllers')
.controller('UserListController', function($scope, socket, user) {
  this.userList = user.currentRoom().users;
  this.user = user;

  socket.on('info_update', $scope, function(data) {
    user.updateInfo(data);
  });

  //socket.on('name_change', $scope, function(data) {
    //chatRoom.removeUser(data.oldName);
    //chatRoom.addUser(data.newName);
  //});

  //socket.on('user_list_update', $scope, function(data) {
    //chatRoom.emptyUsers();
    //chatRoom.addUsers(data);
  //});

  socket.on('user_connect', $scope, function(data) {
    user.rooms[data.roomName].addUser(data.user);
  });

  socket.on('user_disconnect', $scope, function(data) {
    user.rooms[data.roomName].removeUser(data.user);
  });
});
