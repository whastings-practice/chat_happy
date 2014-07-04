angular.module('ChatApp.services')
.factory('user', function(socket) {
  var user = {
    room: 'Lobby',
    username: null
  };

  user.save = function() {
    socket.emit('user_save', {
      room: this.room,
      username: this.username
    });
  };

  user.updateInfo = function(data) {
    this.room = data.room;
    this.username = data.username;
  };

  return user;
});
