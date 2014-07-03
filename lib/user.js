"use strict";

var EventEmitter = require('events').EventEmitter,
    Protomatter = require('protomatter');

var User = {};

User.totalUsers = 0;

User.broadcastMessage = function(data) {
  this.socket.broadcast.emit('new_message', {message: data.message});
};

User.disconnect = function() {
  this.socket.broadcast.emit('user_disconnect', {user: this.name});
  this.emit('disconnect', this);
};

User.initialize = function(socket) {
  this.socket = socket;
  User.totalUsers += 1;
  this.name = 'guest' + User.totalUsers;
  socket.broadcast.emit('user_connect', {user: this.name});
  socket.on('message', this.broadcastMessage.bind(this));
  socket.on('disconnect', this.disconnect.bind(this));
  socket.on('user_save', this.save.bind(this));
};

User.save = function(data) {
  var eventData = {
    oldName: this.name,
    newName: data.username
  };
  this.name = data.username;
  this.socket.broadcast.emit('name_change', eventData);
  this.socket.emit('name_change', eventData);
};

module.exports = Protomatter.create(User, EventEmitter.prototype);
