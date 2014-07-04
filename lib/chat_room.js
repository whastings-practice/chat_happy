"use strict";

var Protomatter = require('protomatter'),
    User = require('./user');

var ChatRoom = {};

ChatRoom.addUser = function(newUser) {
  this.users.push(newUser);
  newUser.joinRoom(this);
  this.sendUserList(newUser.socket);
};

ChatRoom.initialize = function(name) {
  this.name = name;
  this.users = [];
};

ChatRoom.removeUser = function(user) {
  this.users.splice(this.users.indexOf(user), 1);
};

ChatRoom.sendUserList = function(socket) {
  var users = this.users.map(function(user) {
    return user.name;
  });
  socket.emit('user_list_update', users);
};


module.exports = Protomatter.create(ChatRoom);
