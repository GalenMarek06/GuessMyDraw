
$( document ).ready(function() 
{
    $("#btn_GenerateWord").on("click",generateWord);
    $("#btn_findGame").on("click",accessPlayersSalon);

    $("#playersRoomScreen").on("click",accessGameScreen);

    function generateWord()
    {
        console.log("click");
       $('.card').css('transform', 'rotateY(180deg)');
       myVar = setTimeout(accessDrawWordScreen, 4000);
    }

    function accessPlayersSalon()
    {
        $("#mainScreen").hide();
        $("#playersRoomScreen").show();
    }

    function accessGameScreen()
    {
        $("#playersRoomScreen").hide();
        $("#gameScreen").show();
        
        $("#findWordScreen").show();
        $("#drawWordScreen").hide();
        $("#guessWordScreen").hide();
    }

    function accessDrawWordScreen()
    {
         $("#findWordScreen").hide();
         $("#drawWordScreen").show();
    }

    $("#playersRoomScreen").hide();
    $("#gameScreen").hide();

});
