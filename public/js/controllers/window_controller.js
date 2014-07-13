angular.module('ChatApp.controllers').
controller('WindowController', function($scope, socket, user) {
  this.rooms = user.rooms;

  socket.on('new_message', $scope, function(data) {
    user.rooms[data.roomName].addMessage(data);
  });
});
