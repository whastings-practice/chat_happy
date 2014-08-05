"use strict";

var assets = require('./middleware/assets'),
    ChatManager = require('./lib/chat_manager'),
    express = require('express'),
    homeRoutes = require('./routes/home'),
    http = require('http'),
    ngTemplates = require('./middleware/ng_templates'),
    socketIO = require('socket.io');

var environment = process.env.NODE_ENV || 'development',
    assetDir = (environment === 'development') ? 'public' : 'public/compiled';

var app = express(),
    server = http.Server(app);

var io = socketIO(server),
    chatManager = ChatManager.create(io);

var port = process.argv[2] || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/' + assetDir));
app.use('/css/fonts', express.static(__dirname + '/vendor/css/icomoon/fonts'));
app.use(assets(__dirname + '/' + assetDir));
app.use(ngTemplates((environment === 'development'), __dirname + '/public/views'));

homeRoutes(app, assetDir);

server.listen(port);
console.log('Listening on ' + port);
