var socket = io();



$("#btn_GenerateWord").on("click",generateWord);



function generateWord()
{
  console.log("click");
  $('.card').css('transform', 'rotateY(360deg)');
  $.get( "./word", function( data ) {
    $( "#wordToDraw" ).text( data );
  });
}


function addUser(User){
  console.log($('#'+User.id).length);
  if($('#'+User.id).length==0)
  {
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
}


function send(){
  socket.emit('inscription',$('#playerName').val());
  $('#playerName').val('');

}

$('#playerInfo').submit(function(e){
  e.preventDefault();
  send();
  return;
});

$('#btn_findGame').on('click',function(e){
  send();
  $('form').submit();
});


socket.on('inscription',function(data){
  console.log(data);
  addUser(data);
});


socket.on('desincription',function(id){
  console.log('desinscription');
  $('#'+id).remove();

})
