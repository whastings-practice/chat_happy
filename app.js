"use strict";

var ChatManager = require('./lib/chat_manager'),
    express = require('express'),
    homeRoutes = require('./routes/home'),
    http = require('http'),
    ngTemplates = require('./middleware/ng_templates'),
    socketIO = require('socket.io');

var environment = process.env.NODE_ENV || 'development';

var app = express(),
    server = http.Server(app);

var io = socketIO(server),
    chatManager = ChatManager.create(io);

var port = process.argv[2] || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('connect-assets')({
  compress: false,
  paths: [
    'public',
    'public/css',
    'bower_components/angular',
    'node_modules/protomatter',
    'node_modules/underscore'
  ]
}));
app.use('/assets/css/fonts', express.static(__dirname + '/vendor/css/icomoon/fonts'));
app.use('/assets/fonts', express.static(__dirname + '/vendor/css/icomoon/fonts'));
app.use(ngTemplates((environment === 'development'), __dirname + '/public/views'));

homeRoutes(app, environment);

server.listen(port);
console.log('Listening on ' + port);
