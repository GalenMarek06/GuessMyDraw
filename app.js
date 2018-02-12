// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/app'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/paint.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('canvas', function(msg){
    console.log('message: ' + msg);
    io.emit('canvas', msg);
  });

});

server.listen(4200, function(){
  console.log('listening on *:4200');
});
