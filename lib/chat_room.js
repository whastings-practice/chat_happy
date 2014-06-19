"use strict";

var Protomatter = require('protomatter'),
    User = require('./user');

var ChatRoom = {};

ChatRoom.addUser = function(socket) {
  this.users.push(User.create(socket));
};

ChatRoom.initialize = function(io) {
  this.io = io;
  this.users = [];

  io.sockets.on('connection', this.addUser.bind(this));
};


module.exports = Protomatter.create(ChatRoom);
