"use strict";

var Protomatter = require('protomatter'),
    User = require('./user');

var ChatRoom = {};

ChatRoom.addUser = function(newUser) {
  this.users.push(newUser);
  newUser.joinRoom(this);
  this.broadcast('user_connect', {user: newUser.name});
  this.sendUserList(newUser.socket);
};

ChatRoom.broadcast = function(eventName, data) {
  this.io.to(this.name).emit(eventName, data);
};

ChatRoom.initialize = function(name, io) {
  this.io = io;
  this.name = name;
  this.users = [];
};

ChatRoom.removeUser = function(user) {
  this.users.splice(this.users.indexOf(user), 1);
};

ChatRoom.sendMessage = function(data) {
  this.broadcast('new_message', data);
};

ChatRoom.sendUserList = function(socket) {
  var users = this.users.map(function(user) {
    return user.name;
  });
  socket.emit('user_list_update', users);
};


module.exports = Protomatter.create(ChatRoom);
