// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let sequenceNumberByClient = new Map();
let wordToGuess;
let listOfUsers = []
var status = {
  CONNECTED : {value: 1, name: "Connecté"},
  INGAME: {value: 2, name: "Joue"},
};


app.use('/',express.static(__dirname + '/app'));
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/paint.html');
});
console.log(__dirname);
console.log(process.cwd());

app.get('/word', function (req, res) {
  let fs = require("fs");
  var text = fs.readFileSync(__dirname+"/dico.txt").toString('utf-8');
  var textByLine = text.split("\n")
  let rand = Math.floor(Math.random() * (textByLine.length - 1));
  wordToGuess = textByLine[rand];
  res.send(wordToGuess);
});

class User {
  constructor(id) {
    this.id=id;
    this.status=status.CONNECTED;
  }

}

io.on('connection', function(socket){
  console.log('a user connected');
  listOfUsers.push(new User(socket.id))

  for (var i = 0; i < listOfUsers.length; i++) {
    if(listOfUsers[i].name){
      io.emit('inscription',listOfUsers[i]);
    }
  }

 /* socket.on('canvas', function(msg){
    io.emit('canvas', msg);
  });*/

  socket.on('inscription',function(msg){
    console.log('inscription');
    let obj = listOfUsers.find(o => o.id === socket.id);
    obj.name = msg;
    console.log(obj);
    io.emit('inscription',obj);
  })


  socket.on('wordRequest',function(msg){
    console.log('wordRequest');
    let obj = listOfUsers.find(o => o.id === socket.id);
    obj.word= msg;
    let obj2 =listOfUsers.find(o => o.id === socket.id).nemesis;
    obj2.word = msg;
    console.log(obj);
    io.emit('wordToGuess',obj);
  })



  socket.on('wordGuessTest',function(msg){
    console.log('wordGuessTest');
    let wordToGuess = listOfUsers.find(o => o.id === socket.id).word;
    if(wordGuessTest==msg)
    {
      console.log("MOT TROUVE!!!!!!!!!!!!!");
    }
    console.log(obj);
    io.emit('wordToGuess',obj);
  })

  



  socket.on('hey',function(msg){
  console.log('hey reception');
  console.log(socket.id);
  console.log(msg);
  socket.broadcast.to(msg).emit('hey',socket.id);

})



socket.on('pairing',(msg)=>{
console.log('pairing');
  let obj = listOfUsers.find(o => o.id === socket.id);
  listOfUsers[listOfUsers.indexOf(obj)].nemesis = msg;
  let obj2 = listOfUsers.find(o => o.id === msg);
  listOfUsers[listOfUsers.indexOf(obj2)].nemesis = socket.id;
  console.log(listOfUsers);
})




  socket.on("disconnect", () => {
    io.emit('desincription',socket.id);
    console.log('desincription');
    let obj = listOfUsers.find(o => o.id === socket.id);
    remove(listOfUsers,obj);
    sequenceNumberByClient.delete(socket);

    console.info(`Client gone [id=${socket.id}]`);
  });
});

server.listen(4200);



function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}



// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:4200");

// array of all lines drawn
var line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }

   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history 
      line_history.push(data.line);
      // send line to all clients
      console.log("SENDLine")
      io.emit('draw_line', { line: data.line, color: data.color, width: data.width });
         console.log("SENTLine")
   });
});