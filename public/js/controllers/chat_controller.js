angular.module('ChatApp.controllers').
controller('ChatController', function($scope, ChatRoom, socket, user) {
  var self = this;
  this.roomList = [];
  this.roomsShowing = false;
  this.user = user;

  this.hideRooms = function() {
    self.roomsShowing = false;
  };

  this.showRooms = function() {
    self.roomsShowing = true;
  };

  socket.on('name_change', $scope, function(data) {
    var chatRoom = user.rooms[data.roomName];
    chatRoom.addNotice(
      'User ' + data.oldName + ' has changed name to ' + data.newName
    );
    chatRoom.removeUser(data.oldName);
    chatRoom.addUser(data.newName);
  });

  socket.on('new_room', $scope, function(data) {
    this.roomList.push(data.name);
  }.bind(this));

  socket.on('room_join', $scope, function(data) {
    var room = ChatRoom.create(data.name, data.userList);
    user.addRoom(room);
  });

  socket.on('user_connect', $scope, function(data) {
    user.rooms[data.roomName].addNotice('User ' + data.user + ' has joined.');
    user.rooms[data.roomName].addUser(data.user);
  });

  socket.on('user_disconnect', $scope, function(data) {
    user.rooms[data.roomName].addNotice('User ' + data.user + ' has left.');
    user.rooms[data.roomName].removeUser(data.user);
  });
});
