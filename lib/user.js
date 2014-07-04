"use strict";

var EventEmitter = require('events').EventEmitter,
    Protomatter = require('protomatter');

var User = {};

User.totalUsers = 0;

User.broadcastMessage = function(data) {
  this.room.sendMessage({
    author: this.name,
    message: data.message
  });
};

User.joinRoom = function(room) {
  if (this.room) {
    this.socket.leave(this.room.name);
    this.room.removeUser(this);
  }
  this.room = room;
  this.socket.join(room.name);
  sendUpdate.call(this);
};

User.disconnect = function() {
  this.room.removeUser(this);
  this.socket.broadcast.emit('user_disconnect', {user: this.name});
  this.emit('disconnect', this);
};

User.initialize = function(socket) {
  this.socket = socket;
  User.totalUsers += 1;
  this.name = 'guest' + User.totalUsers;
  socket.on('message', this.broadcastMessage.bind(this));
  socket.on('disconnect', this.disconnect.bind(this));
  socket.on('user_save', this.save.bind(this));
};

User.save = function(data) {
  if (data.username !== this.name) {
    changeName.call(this, data.username);
  }
  if (data.room !== this.room.name) {
    this.emit('room_change', this, data.room);
  }
};

module.exports = Protomatter.create(User, EventEmitter.prototype);

var changeName = function(newName) {
  var eventData = {
    oldName: this.name,
    newName: newName
  };
  this.name = newName;
  this.room.broadcast('name_change', eventData);
};

var sendUpdate = function() {
  this.socket.emit('info_update', {
    room: this.room.name,
    username: this.name
  });
};
