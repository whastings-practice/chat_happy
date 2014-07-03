angular.module('ChatApp.services')
.factory('user', function(socket) {
  var user = {
    username: null
  };

  user.save = function() {
    socket.emit('user_save', {
      username: user.username
    });
  };

  return user;
});
