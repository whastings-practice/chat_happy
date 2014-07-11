angular.module('ChatApp.services')
.factory('user', function(ChatRoom, socket) {
  var user = {
    rooms: {},
    username: null
  };

  user.addRoom = function(room) {
    if (this.rooms[room.name]) {
      return;
    }
    this.rooms[room.name] = room;
  };

  user.currentRoom = function() {
    return _.findWhere(this.rooms, {current: true});
  };

  user.save = function(newRoom) {
    socket.emit('user_save', {
      username: this.username
    });
    if (!this.rooms[newRoom]) {
      socket.emit('room_request', newRoom);
    }
  };

  user.updateInfo = function(data) {
    this.username = data.username;
  };

  var firstRoom = ChatRoom.create('Lobby', []);
  firstRoom.current = true;
  user.rooms[firstRoom.name] = firstRoom;

  return user;
});
