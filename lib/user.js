"use strict";

var Protomatter = require('protomatter');

var User = {};

User.broadcastMessage = function(data) {
  this.socket.broadcast.emit({message: data.message});
};

User.initialize = function(socket) {
  this.socket = socket;
  socket.on('message', this.broadcastMessage.bind(this));
};

module.exports = Protomatter.create(User);
