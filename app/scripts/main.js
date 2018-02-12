
'use strict';

/** PART II **/
function createBlock(obj) {
    //1) create a div with document.createElement
   
    //let block = ...
    let block =  document.createElement("div");
    block.id= obj.name;
    block.className ="block";
    block.style.backgroundColor=obj.color;
    console.log(block);
    //2) set the class to "block" for example
    //set id to the object name and set style attribute of the newly-created div element (block):
    //(HINT: className, id and style.backgroundColor)
    //3) creates a new p element:
    let pSample = document.createElement("p");

    //// creates a new text-node with the value of the key.letter object property.
    let sampleText =document.createTextNode(obj.key.letter);
    
    // appends the text-node to the newly-created p element:
    pSample.appendChild(sampleText);
    // appends the p element to the block
    block.appendChild(pSample);
    //(HINT: appendChild)

    //4) instantiate a new Audio object
    let audioSample = new Audio();

    let isMp3Sup = audioSample.canPlayType('audio/mpeg');
    if(isMp3Sup)
    {
       audioSample.src= obj.url.path.concat(obj.url.filenames[0]);
    }
    else
    {
        audioSample.src= obj.url.path.concat(obj.url.filenames[1]);
    }
    audioSample.controls = false;
    block.appendChild(audioSample);
    //5) check if the browser can play mp3 file ('audio/mpeg') with the canPlayType function
        //yes: sets the src attribute of the audio object: path + the first filenames (mp3)
        //no:  sets the src attribute of the audio object: path + the second filenames (ogg)
    //6)  sets the controls attribute of the audio object to false (we do not want to see the controls)
    //7) append the audio to the block
    //8) returns the block
    return block;
}


function init() {
    let container = document.getElementById('container');
    console.log('--- Assignment 2 --- ');
    console.log('the soundsKit: ', soundsKit);
    // PART II
    // iterate over the soundsKit Array
    // for each object:
    soundsKit.forEach(function(element) {
        let sampleLine = document.createElement("div");
        let newSample = createBlock(element);
        container.appendChild(newSample);
    });
        // appends the result of the createBlock function to the container
        //PART II 1) bind the click event on the result of the createBlock
        //end of the loop
    document.addEventListener('keydown', (event) => {
        let key = event.key;
        var elements= container.querySelectorAll('div');

       Array.from(elements).forEach( (el) => {
            if(key==el.getElementsByTagName('p')[0].innerHTML)
            {
                el.getElementsByTagName("audio")[0].currentTime = 0;
                el.getElementsByTagName("audio")[0].play();
            }
});
         
     
       


    });
}

init();
