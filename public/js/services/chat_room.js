angular.module('ChatApp.services').
factory('chatRoom', function() {
  var chatRoom = {};

  chatRoom.users = [];
  chatRoom.messages = [];

  chatRoom.addMessage = function(messageData) {
    this.messages.push(messageData);
  };

  chatRoom.addNotice = function(notice) {
    this.addMessage({author: 'NOTICE', message: notice});
  };

  chatRoom.addUser = function(user) {
    this.addUsers([user]);
  };

  chatRoom.addUsers = function(users) {
    var allUsers = this.users;
    users.forEach(function(user) {
      allUsers.push(user);
    });
  };

  chatRoom.removeUser = function(user) {
    this.users.splice(this.users.indexOf(user), 1);
  };

  return chatRoom;
});
