// app.js
var status = {
  CONNECTED : {value: 1, name: "Connecté"},
  INGAME: {value: 2, name: "Joue"},
};

class User {
  constructor(id) {
    this.id=id;
    this.status=status.CONNECTED;
  }
}

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let sequenceNumberByClient = new Map();
let wordToGuess;
let listOfUsers = []


app.use('/',express.static(__dirname + '/app'));
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/paint.html');
});
console.log(__dirname);
console.log(process.cwd());


// traitement de requete GET en "/word" : choix de mot au hazard pour le jeu
app.get('/word', function (req, res) {
  let fs = require("fs");
  var text = fs.readFileSync(__dirname+"/dico.txt").toString('utf-8');
  var textByLine = text.split("\n")
  let rand = Math.floor(Math.random() * (textByLine.length - 1));
  wordToGuess = textByLine[rand];
  res.send(wordToGuess);
});

//quand l'utilisateur se connect on l'ajoute dans la liste et
// on envoie la notification à tout le monde pour l'ajouter dans la table
io.on('connection', function(socket){
  console.log('a user connected');
  listOfUsers.push(new User(socket.id))
  for (var i = 0; i < listOfUsers.length; i++) {
    if(listOfUsers[i].name){
      io.emit('inscription',listOfUsers[i]);
    }
  }

  //quand l'utilisatuer ajout son nome on l'joute dans la liste des utilisatuers
  socket.on('inscription',function(msg){
    console.log('inscription');
    let obj = listOfUsers.find(o => o.id === socket.id);
    obj.name = msg;
    console.log(obj);
    io.emit('inscription',obj);
  })
  //quand l'utilisateur demande un nouveau mot on l'ajoute dans la liste pour
  //la paire de joueurs
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

// envoie de l'invitation de jeu à l'utilisateur choisi
  socket.on('hey',function(msg){
    console.log('hey reception');
    console.log(socket.id);
    console.log(msg);
    socket.broadcast.to(msg).emit('hey',socket.id);
  })

// couplage de deux utilisatuers qui vont jouer ensemble
  socket.on('pairing',(msg)=>{
    console.log('pairing');
    let room = Math.random();
    
    let obj = listOfUsers.find(o => o.id === socket.id);
    listOfUsers[listOfUsers.indexOf(obj)].nemesis = room;
    listOfUsers[listOfUsers.indexOf(obj)].status = status.INGAME;
    let obj2 = listOfUsers.find(o => o.id === msg);
    listOfUsers[listOfUsers.indexOf(obj2)].nemesis = room;
    listOfUsers[listOfUsers.indexOf(obj2)].status = status.INGAME;
    // ajout de room pour les deux utilisateurs
    io.sockets.connected[obj.id].join(obj.nemesis);
    io.sockets.connected[obj2.id].join(obj.nemesis);

    io.sockets.emit('pairing', [msg,socket.id,status.INGAME])

    console.log(listOfUsers);
  })

  socket.on('canvas',function(msg){
    let room = listOfUsers.find(o => o.id === socket.id).nemesis;
    console.log('canvas on server');
    if(room)
    {
      console.log('sending');
      // send to all users in the room but sender
      socket.broadcast.to(room).emit('canvasToDraw', msg );
      // send to all users in room
      //io.sockets.in(room).emit('canvasToDraw', msg );

    }
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


console.log("Server running on http://localhost:4200");
