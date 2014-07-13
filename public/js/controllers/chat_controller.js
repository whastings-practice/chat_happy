angular.module('ChatApp.controllers').
controller('ChatController', function($scope, ChatRoom, socket, user) {
  socket.on('name_change', $scope, function(data) {
    var chatRoom = user.rooms[data.roomName];
    chatRoom.addNotice(
      'User ' + data.oldName + ' has changed name to ' + data.newName
    );
    chatRoom.removeUser(data.oldName);
    chatRoom.addUser(data.newName);
  });

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
