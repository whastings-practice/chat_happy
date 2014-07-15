"use strict";

var Protomatter = require('protomatter'),
    User = require('./user');

var ChatRoom = {};

ChatRoom.addUser = function(newUser) {
  this.users.push(newUser);
  this.broadcast('user_connect', {user: newUser.name});
  newUser.joinRoom(this);
  sendInfo.call(this, newUser.socket);
};

ChatRoom.broadcast = function(eventName, data) {
  data.roomName = this.name;
  this.io.to(this.name).emit(eventName, data);
};

ChatRoom.initialize = function(name, io) {
  this.io = io;
  this.name = name;
  this.users = [];
};

ChatRoom.removeUser = function(user) {
  this.broadcast('user_disconnect', {user: user.name});
  this.users.splice(this.users.indexOf(user), 1);
};

ChatRoom.sendMessage = function(data) {
  this.broadcast('new_message', data);
};

module.exports = Protomatter.create(ChatRoom);

var sendInfo = function(socket) {
  var users = this.users.map(function(user) {
    return user.name;
  });
  socket.emit('room_join', {name: this.name, userList: users});
};
