angular.module('ChatApp.services').
factory('ChatRoom', function() {
  var ChatRoom = {};

  ChatRoom.addMessage = function(messageData) {
    this.messages.push(messageData);
  };

  ChatRoom.addNotice = function(notice) {
    this.addMessage({author: 'NOTICE', message: notice});
  };

  ChatRoom.addUser = function(user) {
    this.addUsers([user]);
  };

  ChatRoom.addUsers = function(users) {
    var allUsers = this.users;
    users.forEach(function(user) {
      allUsers.push(user);
    });
  };

  ChatRoom.emptyUsers = function() {
    this.users.splice(0, this.users.length);
  };

  ChatRoom.initialize = function(name, users) {
    this.messages = [];
    this.name = name;
    this.users = users;
  };

  ChatRoom.removeUser = function(user) {
    this.users.splice(this.users.indexOf(user), 1);
  };

  return Protomatter.create(ChatRoom);
});
