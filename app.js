"use strict";

var ChatManager = require('./lib/chat_manager'),
    express = require('express'),
    http = require('http'),
    socketIO = require('socket.io');

var app = express(),
    server = http.Server(app),
    router = express.Router();

var io = socketIO(server),
    chatManager = ChatManager.create(io);

var port = process.argv[2] || 8080;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(router);

server.listen(port);
