"use strict";

var ChatRoom = require('./chat_room'),
    Protomatter = require('protomatter'),
    User = require('./user');

var ChatManager = {};

ChatManager.createRoom = function(name) {
  var newRoom = ChatRoom.create(name, this.io);
  this.rooms.push(newRoom);
  return newRoom;
};

ChatManager.createUser = function(socket) {
  var newUser = User.create(socket);
  newUser.on('room_change', changeUserRoom.bind(this));
  this.defaultRoom.addUser(newUser);
};

ChatManager.initialize = function(io) {
  this.io = io;
  this.rooms = [];
  this.defaultRoom = this.createRoom('Lobby');
  io.sockets.on('connection', this.createUser.bind(this));
};

module.exports = Protomatter.create(ChatManager);

var changeUserRoom = function(user, roomName) {
  var room = findRoom(this.rooms, roomName);
  if (!room) {
    room = this.createRoom(roomName);
  }
  room.addUser(user);
};

var findRoom = function(rooms, roomName) {
  for (var i = 0, length = rooms.length; i < length; i++) {
    if (rooms[i].name === roomName) {
      return rooms[i];
    }
  }
  return null;
};
