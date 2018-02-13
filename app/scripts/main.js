var socket = io();



$("#btn_GenerateWord").on("click",generateWord);



function generateWord()
{
  console.log("click");
  if (  $( '.card' ).css( "transform" ) == 'none' ){
    $('.card').css("transform","rotateY(360deg)");
  } else {
    $('.card').css("transform","" );
  }
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
    labName.setAttribute('name','user');
    labName.textContent = User.name;
    console.log(labName);
    let labStatus = document.createElement('label');
    labStatus.className = 'playerConnection';
    labStatus.setAttribute('name','user');
    labStatus.textContent = User.status.name;
    div.id = User.id;
    div.append(labName);
    div.append(labStatus);
    $('#playersList').append(div);
  }
}



function saveWordToGuess()
{
  if($("#wordToDraw").val())
  {
    socket.emit('wordRequest',$("#wordToDraw").val());
  }
}


function send()
{
  if($('#playerName').val())
  {
    socket.emit('inscription',$('#playerName').val());
    $('#playerName').val('');
  }
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

$('#playersList').on('click','[name="user"]',function(e){
  if(this.parentNode.id !== socket.id){
    console.log('emmit hey');
    console.log(socket);
    socket.emit('hey',this.parentNode.id);


  }
  else {
    console.log('same id');
  }

});


socket.on('hey',function(data){
console.log('hey');
  let c = confirm($('#'+data+' > .playerName').text()+" , vous invité à commener la partie.");
  console.log(c);
  if(c === true){
    socket.emit('pairing',data);
    $('#' + data + ' > .playerConnection').text('en jeu');
    $('#' + socket.id + ' > .playerConnection').text('en jeu');
  }



})

socket.on('inscription',function(data){
  console.log(data);
  addUser(data);
});


socket.on('desincription',function(id){
  console.log('desinscription');
  $('#'+id).remove();

})
