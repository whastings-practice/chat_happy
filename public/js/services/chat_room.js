angular.module('ChatApp.services').
factory('chatRoom', function() {
  var chatRoom = {};

  chatRoom.messages = [];

  chatRoom.addMessage = function(message) {
    this.messages.push(message);
  };

  return chatRoom;
});
