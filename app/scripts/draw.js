/* © 2009 ROBO Design
* http://www.robodesign.ro
*/

// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
  window.addEventListener('load', function () {
    var canvas, canvasToGuess, context, tool;
    var socket = io();

    function init () {
      // Find the canvas element.

      canvas = document.getElementById('canvasWordToDraw');
      canvasToGuess = document.getElementById('canvasWordToGuess');
      if (!canvas) {
        alert('Error: I cannot find the canvas element!');
        return;
      }

      if (!canvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
      }

      // Get the 2D canvas context.
      context = canvas.getContext('2d');
      if (!context) {
        alert('Error: failed to getContext!');
        return;
      }


      // Pencil tool instance.
      tool = new tool_pencil();
      /*tool.strokeStyle  = "#FF0000";*/
      // Attach the mousedown, mousemove and mouseup event listeners.
      canvas.addEventListener('mousedown', ev_canvas, false);
      canvas.addEventListener('mousemove', ev_canvas, false);
      canvas.addEventListener('mouseup',   ev_canvas, false);
      socket.on('canvas',function(msg){
        deserialize(msg,canvasToGuess);
      })

      function deserialize(data, canvas) {
        var img = new Image();
        img.onload = function() {

          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);
        };

        img.src = data;
      }
    }


    $('#clear').click(function(e){
      context.clearRect(0, 0, canvas.width, canvas.height);
      socket.emit('canvas', canvas.toDataURL());
    })
    // This painting tool works like a drawing pencil which tracks the mouse
    // movements.
    function tool_pencil () {
      var tool = this;
      this.started = false;

      // This is called when you start holding down the mouse button.
      // This starts the pencil drawing.
      this.mousedown = function (ev) {


        if (ev._x > canvas.width&&ev._y>canvas.height){
          context.moveTo(ev.offsetX, ev.offsetY);
          context.beginPath();
          tool.started = true;
        }
        else {
          context.moveTo(ev._x, ev._y);
          context.beginPath();
          tool.started = true;
        }


      };

      // This function is called every time you move the mouse. Obviously, it only
      // draws if the tool.started state is set to true (when you are holding down
      // the mouse button).
      this.mousemove = function (ev) {

        if (tool.started) {
          // context.fillStyle  = "#FF0000";
          context.strokeStyle  = $( "input[type=color]" ).val();
          context.lineWidth = "3";
          if (ev._x < canvas.width && ev._y < canvas.height) {
            context.lineTo(ev._x, ev._y);

            context.stroke();
          }
          else {
            context.lineTo(ev.offsetX, ev.offsetY);
            context.stroke();

          }

        }
      };

      // This is called when you release the mouse button.
      this.mouseup = function (ev) {

        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
          socket.emit('canvas', canvas.toDataURL());
        }
      };
    }

    // The general-purpose event handler. This function just determines the mouse
    // position relative to the canvas element.
    function ev_canvas (ev) {
      if (ev.layerX || ev.layerX == 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
      }

      // Call the event handler of the tool.
      var func = tool[ev.type];
      if (func) {
        func(ev);
      }
    }






    init();

  }, false); }

  // vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:
