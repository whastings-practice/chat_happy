"use strict";

var EventEmitter = require('events').EventEmitter,
    Protomatter = require('protomatter'),
    _ = require('underscore');

var User = {};

User.totalUsers = 0;

User.broadcastMessage = function(data) {
  this.rooms[data.room].sendMessage({
    author: this.name,
    message: data.message
  });
};

User.joinRoom = function(room) {
  this.rooms[room.name] = room;
  this.socket.join(room.name);
  sendUpdate.call(this);
};

User.disconnect = function() {
  _.each(this.rooms, function(room) {
    room.removeUser(this);
  }, this);
  this.emit('disconnect', this);
};

User.initialize = function(socket) {
  this.socket = socket;
  User.totalUsers += 1;
  this.name = 'guest' + User.totalUsers;
  this.rooms = {};
  socket.on('message', this.broadcastMessage.bind(this));
  socket.on('disconnect', this.disconnect.bind(this));
  socket.on('room_request', requestRoom.bind(this));
  socket.on('user_save', this.save.bind(this));
};

User.save = function(data) {
  if (data.username !== this.name) {
    changeName.call(this, data.username);
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

var requestRoom = function(data) {
  this.emit('room_change', this, data);
};

var sendUpdate = function() {
  var rooms = _.map(this.rooms, function(room) {
    return {
      name: room.name
    };
  });
  this.socket.emit('info_update', {
    rooms: rooms,
    username: this.name
  });
};
