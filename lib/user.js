"use strict";

var EventEmitter = require('events').EventEmitter,
    postal = require('postal'),
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

User.leaveRoom = function(roomName) {
  this.socket.leave(roomName);
  this.rooms[roomName].removeUser(this);
  delete this.rooms[roomName];
};

User.disconnect = function() {
  _.each(this.rooms, function(room) {
    room.removeUser(this);
  }, this);
  this.subscriptions.forEach(function(subscription) {
    subscription.unsubscribe();
  });
  this.emit('disconnect', this);
};

User.initialize = function(socket) {
  this.socket = socket;
  User.totalUsers += 1;
  this.name = 'guest' + User.totalUsers;
  this.rooms = {};
  subscribeToSocket.call(this, socket);
  subscribeToMessages.call(this);
};

User.save = function(data) {
  if (data.username !== this.name) {
    changeName.call(this, data.username);
  }
};

User.sendNewRoom = function(data) {
  this.socket.emit('new_room', {name: data.room.name});
};

module.exports = Protomatter.create(User, EventEmitter.prototype);

var changeName = function(newName) {
  var eventData = {
    oldName: this.name,
    newName: newName
  };
  this.name = newName;
  _.each(this.rooms, function(room) {
    room.broadcast('name_change', eventData);
  }, this);
};

var requestRoom = function(data) {
  if (data === '' || data === null) {
    return;
  }
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

var subscribeToMessages = function() {
  this.subscriptions = [];
  this.subscriptions.push(postal.subscribe({
    topic: 'new_room',
    callback: this.sendNewRoom.bind(this)
  }));
};

var subscribeToSocket = function(socket) {
  socket.on('message', this.broadcastMessage.bind(this));
  socket.on('disconnect', this.disconnect.bind(this));
  socket.on('room_exit', this.leaveRoom.bind(this));
  socket.on('room_request', requestRoom.bind(this));
  socket.on('user_save', this.save.bind(this));
};
