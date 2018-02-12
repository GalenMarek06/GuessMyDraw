var socket = io();



$("#btn_GenerateWord").on("click",generateWord);



function generateWord()
{
  console.log("click");
  $('.card').css('transform', 'rotateY(360deg)');
}


function addUser(User){
  let div = document.createElement('div')
  div.className = 'playerGame';
  let labName = document.createElement('label');
  labName.className = 'playerName';
  labName.textContent = User.name;
  let labStatus = document.createElement('label');
  labStatus.className = 'playerConnection';
  labStatus.textContent = User.status.name;
  div.id = User.id;
  div.append(labName);
  div.append(labStatus);
  $('#playersList').append(div);

}

$('#playerInfo').submit(function(e){
  e.preventDefault();
  console.log($('#playerName').val());
  socket.emit('inscription',$('#playerName').val());
  return;

} )
;

socket.on('inscription',function(data){
  console.log(data);
  addUser(data);
})


socket.on('desincription',function(id){
console.log('desinscription');
  $('#'+id).remove();

})
