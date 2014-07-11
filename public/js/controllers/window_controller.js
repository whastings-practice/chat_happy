angular.module('ChatApp.controllers').
controller('WindowController', function($scope, ChatRoom, socket, user) {
  var self = this;
  this.rooms = user.rooms;

  socket.on('name_change', $scope, function(data) {
    user.rooms[data.roomName].addNotice(
      'User ' + data.oldName + ' has changed name to ' + data.newName
    );
  });

  socket.on('new_message', $scope, function(data) {
    user.rooms[data.roomName].addMessage(data);
  });

  socket.on('room_join', $scope, function(data) {
    var room = ChatRoom.create(data.name, data.userList);
    user.addRoom(room);
  });

  socket.on('user_connect', $scope, function(data) {
    user.rooms[data.roomName].addNotice('User ' + data.user + ' has joined.');
  });

  socket.on('user_disconnect', $scope, function(data) {
    user.rooms[data.roomName].addNotice('User ' + data.user + ' has left.');
  });
});
