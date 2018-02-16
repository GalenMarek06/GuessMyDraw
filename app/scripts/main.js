$( document ).ready(function() {
 
          var socket = io();

          $("#btn_GenerateWord").on("click",generateWord);
          


          function initGame()
          {
            $("#mainScreen").show();
            $("#playersRoomScreen").hide();
            $("#gameScreen").hide();
            
          }


          function generateWord()
          {
            console.log("click");
          /*  if (  $( '.card' ).css( "transform" ) == 'none' ){
              $('.card').css("transform","rotateY(360deg)");
            } else {*/
              $('.card').css("transform","rotateY(180deg)" );

            /*}*/
            $.get( "./word", function( data ) {
              $( "#wordToDraw" ).text( data );
              $(".sideBackIn").text(data)
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
            if($("#wordToDraw").val())
            {
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

          $('#playerInfo').submit(function(e){

            e.preventDefault();
            send();
            return;
          });


          $('#btn_findGame').on('click',function(e){
            console.log("Submit");
            //send();
            $('form').submit();
            $("#mainScreen").hide();
            $("#playersRoomScreen").show();
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
            let c = confirm($('#'+data+' > .playerName').text()+" , vous invite à commencer une partie.");
            console.log(c);
            if(c === true){
              socket.emit('pairing',data);
              $('#' + data + ' > .playerConnection').text('en jeu');
              $('#' + socket.id + ' > .playerConnection').text('en jeu');
              $("#playersRoomScreen").hide();
              $("#gameScreen").show();
              $("#findWordScreen").show();

              $("#drawWordScreen").hide();
              $("#guessWordScreen").hide();
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





       var mouse = { 
          click: false,
          move: false,
          pos: {x:0, y:0},
          pos_prev: false
       };
       // get canvas element and create context
       var canvasToDraw  = $('#canvasWordToDraw');
       var canvasToGuess  = $('#canvasWordToGuess');
       var contextToDraw = canvasToDraw[0].getContext('2d');
       var contextToGuess = canvasToGuess[0].getContext('2d');
       var width   = $(canvasToDraw).width();
       var height  = $(canvasToDraw).height();
       

       // register mouse event handlers
       canvasToDraw.mousedown(function() { mouse.click = true;
     });
       canvasToDraw.mouseup(function() { mouse.click = false; 
      });

       canvasToDraw.mousemove(function( event ) {
          // normalize mouse position to range 0.0 - 1.0
          var rect =canvasToDraw[0].getBoundingClientRect();
          mouse.pos.x = event.clientX - rect.left;
          mouse.pos.y = event.clientY - rect.top;
          mouse.move = true;
       });

       // draw line received from server
      socket.on('draw_line', function (data) {
          var line = data.line;
          console.log("dataLine Recupere PROJECT: " , line);
           
          contextToGuess.strokeStyle =data.color;
          contextToGuess.lineWidth =data.width;
          contextToGuess.beginPath();
          contextToGuess.moveTo(line[0].x , line[0].y );
          contextToGuess.lineTo(line[1].x , line[1].y );
          contextToGuess.stroke();
       });
       
       // main loop, running every 25ms
       function mainLoop() {
          // check if the user is drawing
          if (mouse.click && mouse.move && mouse.pos_prev) {
             // send line to to the server
              console.log("COULEUR TRAIT: " , canvasToDraw[0].strokeStyle);
             socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] , color:contextToDraw.strokeStyle, width: contextToDraw.lineWidth });
             mouse.move = false;
          }
          mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
          setTimeout(mainLoop, 25);
       }
       mainLoop();
       initGame();





});




