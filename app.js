// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let sequenceNumberByClient = new Map();

app.use(express.static(__dirname + '/app'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/paint.html');
});



io.on('connection', function(socket){
  console.log('a user connected');
  console.info(`Client connected [id=${socket.id}]`);
  sequenceNumberByClient.set(socket, 1);

  socket.on('canvas', function(msg){
    console.log('canvas sending');
    io.emit('canvas', msg);
  });
  socket.on("disconnect", () => {
          sequenceNumberByClient.delete(socket);
          console.info(`Client gone [id=${socket.id}]`);
      });
});

server.listen(4200, function(){
  console.log('listening on *:4200');
});
