/* variables for the sounds (tones) */
var context;
var redGain;
var greenGain;
var yellowGain;
var blueGain;
var errorGain;
var greenFreq;
var redFreq;
var blueFreq;
var yellowFreq;
var errorFreq;

/* game variables */
var sSoundUnlocked = false;
var sPower = "OFF";
var sQueue = [];
var sTones = [];
var sColors = ["green", "red", "blue", "yellow"];
var sBackgroundsPressed = ['rgba(67,212,83,.25)','rgba(255,0,0,.25)','rgba(0,163,236,.25)','rgba(255,247,50,.25)'];
var sBackgrounds = ['rgba(67,212,83,1)','rgba(255,0,0,1)','rgba(0,163,236,1)','rgba(255,247,50,1)'];
var sTurn = "AI";
var sTurnCount = 0
var sBlockInput = false;
var sStrict = false;

$(document).ready(function(){

  $("#powerSwitch").on("click touchend", function(e){
    if (sPower == "ON"){
      sPower = "OFF";
      $("#longest").html("");
      $("#btnStrict").css("background-color","#000000");
    } else {
      sPower = "ON";
      resetGame();
    }
  });

  $("#btnStart").on("click", function(e){
    e.preventDefault();

    if (sSoundUnlocked == false){
      /* Set up the audio processing */
      context = new AudioContext() || new webkitAudioContext();
      redGain = context.createGain();
      greenGain = context.createGain();
      yellowGain = context.createGain();
      blueGain = context.createGain();
      errorGain = context.createGain();
      redGain.gain.value = 0;
      yellowGain.gain.value = 0;
      blueGain.gain.value = 0;
      greenGain.gain.value = 0;
      errorGain.gain.value = 0;
      redGain.connect(context.destination);
      blueGain.connect(context.destination);
      greenGain.connect(context.destination);
      yellowGain.connect(context.destination);
      errorGain.connect(context.destination);
      greenFreq = context.createOscillator();
      greenFreq.frequency.value = 164.81;
      greenFreq.type = "sine";
      greenFreq.connect(greenGain);
      greenFreq.start(0);
      redFreq = context.createOscillator();
      redFreq.frequency.value = 220;
      redFreq.type = "sine";
      redFreq.connect(redGain);
      redFreq.start(0);
      blueFreq = context.createOscillator();
      blueFreq.frequency.value = 277.18;
      blueFreq.type = "sine";
      blueFreq.connect(blueGain);
      blueFreq.start(0);
      yellowFreq = context.createOscillator();
      yellowFreq.frequency.value = 329.63;
      yellowFreq.type = "sine";
      yellowFreq.connect(yellowGain);
      yellowFreq.start(0);
      errorFreq = context.createOscillator();
      errorFreq.frequency.value = 110;
      errorFreq.type = "triangle";
      errorFreq.connect(errorGain);
      errorFreq.start(0);
      sTones = [greenGain, redGain, blueGain, yellowGain];
      sSoundUnlocked = true;
    }

    if (sPower == "ON"){
      resetGame();
      sQueue.push( simonNext() );
      simonGo();
    }

  });

  $("#btnStrict").on("click", function(){
    if( sPower == "ON"){
      if (sStrict == false){
        $(this).css("background-color","#f0ad4e");
        sStrict = true;
      } else {
        $(this).css("background-color","#000000");
        sStrict = false;
      }
    }
  });

  $("#red").on("mousedown touchstart", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      redGain.gain.value = 1;
      $(this).css("backgroundColor",sBackgroundsPressed[ sColors.indexOf("red")]);
      //playerGo($(this));
    }
  });
  $("#red").on("mouseup touchend", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      redGain.gain.value = 0;
      $(this).css("backgroundColor",sBackgrounds[ sColors.indexOf("red")]);

      if ($(this).attr("id") == sColors[ sQueue[sTurnCount]] ){
        sTurnCount++;
        playerEnd();
      } else {
        errorGain.gain.value = 1;
        $("#longest").html("X");
        setTimeout( function(){
          errorGain.gain.value = 0;
          if (sStrict == true){
            resetGame();
          } else {
            sBlockInput= true;
            sTurnCount = 0;
            simonGo();
          }
        }, 450);
      }
    }
  });
  $("#green").on("mousedown touchstart", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      greenGain.gain.value = 1;
      $(this).css("backgroundColor",sBackgroundsPressed[ sColors.indexOf("green")]);
      //playerGo($(this));
    }
  });
  $("#green").on("mouseup touchend", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      greenGain.gain.value = 0;
      $(this).css("backgroundColor",sBackgrounds[ sColors.indexOf("green")]);

      if ($(this).attr("id") == sColors[ sQueue[sTurnCount]] ){
        sTurnCount++;
        playerEnd();
      } else {
        errorGain.gain.value = 1;
        $("#longest").html("X");
        setTimeout( function(){
          errorGain.gain.value = 0;
          if (sStrict == true){
            resetGame();
          } else {
            sBlockInput= true;
            sTurnCount = 0;
            simonGo();
          }
        }, 450);
      }
    }
  });
  $("#blue").on("mousedown touchstart", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      blueGain.gain.value = 1;
      $(this).css("backgroundColor",sBackgroundsPressed[ sColors.indexOf("blue")]);
      //playerGo($(this));
    }
  });
  $("#blue").on("mouseup touchend", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      blueGain.gain.value = 0;
      $(this).css("backgroundColor",sBackgrounds[ sColors.indexOf("blue")]);

      if ($(this).attr("id") == sColors[ sQueue[sTurnCount]] ){
        sTurnCount++;
        playerEnd();
      } else {
        errorGain.gain.value = 1;
        $("#longest").html("X");
        setTimeout( function(){
          errorGain.gain.value = 0;
          if (sStrict == true){
            resetGame();
          } else {
            sBlockInput= true;
            sTurnCount = 0;
            simonGo();
          }
        }, 450);
      }
    }
  });
  $("#yellow").on("mousedown touchstart", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      yellowGain.gain.value = 1;
      $(this).css("backgroundColor",sBackgroundsPressed[ sColors.indexOf("yellow")]);
      //playerGo($(this));
    }
  });
  $("#yellow").on("mouseup touchend", function(btn){
    btn.preventDefault();
    if( sPower == "ON" && sTurn == "P1" && sBlockInput == false){
      yellowGain.gain.value = 0;
      $(this).css("backgroundColor",sBackgrounds[ sColors.indexOf("yellow")]);

      if ($(this).attr("id") == sColors[ sQueue[sTurnCount]] ){
        sTurnCount++;
        playerEnd();
      } else {
        errorGain.gain.value = 1;
        $("#longest").html("X");
        setTimeout( function(){
          errorGain.gain.value = 0;
          if (sStrict == true){
            resetGame();
          } else {
            sBlockInput= true;
            sTurnCount = 0;
            simonGo();
          }
        }, 450);
      }
    }
  });

});

function resetGame(){
  sQueue = [];
  sTurn = "AI";
  sTurnCount = 0;
  $("#longest").html("0");
}

function simonNext(){
  var next = Math.floor(Math.random() * (4));
  return next;
}

function simonGo(){

  if (sTurnCount==0){
    setTimeout( function(){
      sTones[ sQueue[sTurnCount]].gain.value = 1;
      $("#"+sColors[ sQueue[sTurnCount] ]).velocity({backgroundColorAlpha:.25}, {"duration": "250"})
                                 .velocity("reverse",{delay: 500, complete: simonEnd });
      }, 600);
   } else {
     sTones[ sQueue[sTurnCount]].gain.value = 1;
     $("#"+sColors[ sQueue[sTurnCount] ]).velocity({backgroundColorAlpha:.25}, {"duration": "250"})
                                .velocity("reverse",{delay: 500, complete: simonEnd });
   }
}
function simonEnd(){
  sTones[ sQueue[sTurnCount]].gain.value = 0;
  sTurnCount++;
  $("#longest").html( sQueue.length );
  if (sTurnCount < sQueue.length ){
    setTimeout( function(){
      simonGo();
    }, 100 );
  } else {
    sTurnCount = 0;
    sBlockInput = false;
    sTurn = "P1";
  }
}

function playerEnd(){
  if (sTurnCount < sQueue.length){
    //Start timer for error timeout
  } else {
    if (sQueue.length == 20){
      $("#longest").html("WIN!");
      setTimeout( function(){
        win();
      }, 150);

    } else {
      sTurnCount = 0;
      sTurn = "AI";
      sQueue.push( simonNext() );
      sBlockInput = true;
      simonGo();
    }
  }
}

function win(){
  sTones[0].gain.value=1;
  setTimeout( function(){
    sTones[0].gain.value=0;
    sTones[1].gain.value=1;
    setTimeout( function(){
      sTones[1].gain.value=0;
      sTones[2].gain.value=1;
      setTimeout( function(){
        sTones[2].gain.value=0;
        sTones[3].gain.value=1;
        setTimeout( function(){
          sTones[3].gain.value=0;
          sTones[2].gain.value=1;
          setTimeout( function(){
            sTones[2].gain.value=0;
            sTones[3].gain.value=1;
            setTimeout( function(){
              sTones[3].gain.value=0;
              resetGame();
            }, 600);
          }, 175);
        }, 375);
      }, 250);
    }, 250);
  },250);
}
