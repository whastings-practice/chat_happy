angular.module('ChatApp.controllers')
.controller('UserController', function($scope, socket, user) {
  this.rooms = user.rooms;
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
});
