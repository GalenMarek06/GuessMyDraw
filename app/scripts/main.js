$(document).ready(function() {

  $("#btn_GenerateWord").on("click",generateWord);
  $("btn_Submit").on("click",testWordToGuess);
  $("#drawWordScreen").hide();
  $("#guessWordScreen").hide();


  function initGame()
  {
      $("#mainScreen").show();
      $("#playersRoomScreen").hide();
      $("#gameScreen").hide();
  }

  function generateWord()
  {
    $('.card').css("transform","rotateY(180deg)" );
    $.get( "./word", function( data ) {
      $( "#wordToDraw" ).text( data );
      $(".sideBackIn").text(data);
      saveWordToGuess();
    });
  }


  function addUser(User){
    console.log($('#'+User.id).length);
    if($('#'+User.id).length==0)
    {
      console.log("creationUSER");
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
      console.log(labStatus);
      div.id = User.id;
      div.append(labName);
      div.append(labStatus);
      $('#playersList').append(div);
    }
  }


  function saveWordToGuess()
  {
     if($("#wordToDraw").text())
            {
              console.log("MOT ENREGISTRE");
              socket.emit('wordRequest',$("#wordToDraw").val());
            }
  }


  function testWordToGuess()
  {
    if($("input[name='inputResponse']").val())
    {
      socket.emit('wordGuessTest',$("input[name='inputResponse']").val().trim().toLowerCase());
    }
  }


  // invitation de joueur pour la partie
  $('#playersList').on('click','[name="user"]',function(e){
    if(this.parentNode.id !== socket.id){
      socket.emit('hey',this.parentNode.id);
    }
    else {
      console.log('same id');
    }
  });

  // reception d'invitation
  socket.on('hey',function(data){
    console.log('hey');
    let c = confirm($('#'+data+' > .playerName').text()+" , vous invité à commener la partie.");
    if(c === true){
      socket.emit('pairing',data);
       $("#playersRoomScreen").hide();
              $("#gameScreen").show();
              $("#findWordScreen").show();

              $("#drawWordScreen").hide();
              $("#guessWordScreen").hide();

    }
  })

  socket.on('wordToGuessDrawer', function ()
  {
      $("#drawWordScreen").show();
      $("#findWordScreen").hide();
      $("#guessWordScreen").hide();
      console.log("DESSINATEUR");
 });


  socket.on('wordToGuessPlayer', function (test)
  {
     alert('yolo');
    $("#playersRoomScreen").hide();
    $("#gameScreen").show();
    $("#drawWordScreen").hide();
    $("#findWordScreen").hide();
    console.log("DEVINEUR");
    $("#guessWordScreen").show();
  });


  // ajout de nouveau utilisateur dans la list
  socket.on('inscription',function(data){
    addUser(data);
  });

  // suppression d'utilisateur de la liste en deconnexion
  socket.on('desincription',function(id){
    $('#'+id).remove();
  })

  // changement de status d'utilisateurs qui font la partie ensemble
  socket.on('pairing',function(data){
    if (data[0]===socket.id||data[1]===socket.id){

    }
    $('#' + data[0] + ' > .playerConnection').text(data[2].name);
    $('#' + data[1] + ' > .playerConnection').text(data[2].name);
  })

   initGame();

});




  // méthode d'envoie de nom à tout le monde
  function send()
  {
    console.log("send()");
    if($('#playerName').val())
    {
      console.log("nomjoueur");
      socket.emit('inscription',$('#playerName').val());
      $('#playerName').val('');
    }
  }

  // form binding
  $('#playerInfo').submit(function(e){
    e.preventDefault();
    console.log('lkjlkjlkjlkjlkjljlkj');
    send();
    $("#mainScreen").hide();
    $("#playersRoomScreen").show();
    return;
  });


  $('#btn_findGame').on('click',function(e){
    console.log('on click funciton ');
    $('form').submit();
  });
