angular.module('ChatApp.services')
.factory('user', function(ChatRoom, socket) {
  var user = {
    rooms: {},
    username: null
  };

  user.addRoom = function(room) {
    var existingRoom = this.rooms[room.name];
    if (existingRoom) {
      existingRoom.users = room.users;
      return;
    }
    this.rooms[room.name] = room;
    room.current = true;
  };

  user.currentRoom = function() {
    return _.findWhere(this.rooms, {current: true});
  };

  user.joinRoom = function(newRoom) {
    if (!this.rooms[newRoom]) {
      _.each(this.rooms, function(room) {
        room.current = false;
      });
      socket.emit('room_request', newRoom);
    }
  };

  user.leaveRoom = function(room) {
    socket.emit('room_exit', room.name);
    delete this.rooms[room.name];
  };

  user.save = function(newRoom) {
    socket.emit('user_save', {
      username: this.username
    });
  };

  user.updateInfo = function(data) {
    this.username = data.username;
  };

  var firstRoom = ChatRoom.create('Lobby', []);
  firstRoom.current = true;
  user.rooms[firstRoom.name] = firstRoom;

  return user;
});
