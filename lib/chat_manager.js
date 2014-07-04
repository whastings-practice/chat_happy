"use strict";

var ChatRoom = require('./chat_room'),
    Protomatter = require('protomatter'),
    User = require('./user');

var ChatManager = {};

ChatManager.createRoom = function(name) {
  var newRoom = ChatRoom.create(name);
  this.rooms.push(newRoom);
  return newRoom;
};

ChatManager.createUser = function(socket) {
  var newUser = User.create(socket);
  this.defaultRoom.addUser(newUser);
};

ChatManager.initialize = function(io) {
  this.io = io;
  this.rooms = [];
  this.defaultRoom = this.createRoom('Lobby');
  io.sockets.on('connection', this.createUser.bind(this));
};

module.exports = Protomatter.create(ChatManager);
