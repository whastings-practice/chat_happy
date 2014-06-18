"use strict";

var express = require('express'),
    http = require('http');

var app = express(),
    server = http.Server(app),
    router = express.Router();

var port = process.argv[2] || 8080;

app.use(express.static(__dirname + '/public'));
app.use(router);

server.listen(port);
