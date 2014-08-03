"use strict";

var ChatManager = require('./lib/chat_manager'),
    express = require('express'),
    homeRoutes = require('./routes/home'),
    http = require('http'),
    socketIO = require('socket.io');

var app = express(),
    server = http.Server(app);

var io = socketIO(server),
    chatManager = ChatManager.create(io);

var port = process.argv[2] || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/css/fonts', express.static(__dirname + '/vendor/css/icomoon/fonts'));

homeRoutes(app, __dirname);

server.listen(port);
console.log('Listening on ' + port);
