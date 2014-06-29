"use strict";

var Protomatter = require('protomatter'),
    User = require('./user');

var ChatRoom = {};

ChatRoom.addUser = function(socket) {
  var newUser = User.create(socket);
  this.users.push(newUser);
  this.sendUserList(socket);
  newUser.on('disconnect', this.removeUser.bind(this));
};

ChatRoom.initialize = function(io) {
  this.io = io;
  this.users = [];

  io.sockets.on('connection', this.addUser.bind(this));
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
