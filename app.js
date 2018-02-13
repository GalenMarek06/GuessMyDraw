// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let sequenceNumberByClient = new Map();
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
  res.send(textByLine[rand]);
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

  socket.on('canvas', function(msg){
    io.emit('canvas', msg);
  });

  socket.on('inscription',function(msg){
    console.log('inscription');
    let obj = listOfUsers.find(o => o.id === socket.id);
    obj.name = msg;
    console.log(obj);
    io.emit('inscription',obj);
  })


  socket.on('hey',function(msg){
  console.log('hey reception');
  console.log(socket.id);
  console.log(msg);
  socket.broadcast.to(msg).emit('hey',socket.id);

})



socket.on('pairfing',(msg)=>{
console.log('pairing');
  let obj = listOfUsers.find(o => o.id === socket.id);
  listOfUsers[listOfUsers.indexOf(obj)].nemesis = msg;
  let obj2 = listOfUsers.find(o => o.id === msg);
  listOfUsers[listOfUsers.indexOf(obj)].nemesis = socket.id;
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

server.listen(4200, function(){
  console.log('listening on *:4200');
});



function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}
