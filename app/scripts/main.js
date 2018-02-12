
$( document ).ready(function() 
{
    $("#btn_GenerateWord").on("click",generateWord);

<<<<<<< HEAD

var canvas = document.getElementById("canvasWordToDraw"),
context = canvas.getContext("2d"),
w = canvas.width,
h = canvas.height;

var mouse = { x:0, y:0};
var draw = false;

canvas.addEventListener("mousedown", function(e){

  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
  draw = true;
  context.beginPath();
  context.moveTo(mouse.x, mouse.y);
});
canvas.addEventListener("mousemove", function(e){

  if(draw==true){

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
  }
});
canvas.addEventListener("mouseup", function(e){

  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
  context.lineTo(mouse.x, mouse.y);
  context.stroke();
  context.closePath();
  draw = false;
});
=======
    function generateWord()
    {
        console.log("click");
       $('.card').css('transform', 'rotateY(180deg)');
    }

});
>>>>>>> 4ce9cfcc5cba86194dbe833c3cbf8df42255c5d4
