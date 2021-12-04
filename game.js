var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

function nextSequence(){
  level++;
  $("h1").text("level " + level);
  randomNumber = Math.floor(Math.random()* 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(document).keypress(function(){
  if(!gameStart){
    nextSequence();
    gameStart = true;
  }
});


$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress("#" + this.id);
  checkAnswer(userClickedPattern.length-1);

});


function playSound(name){

  var audioColor = new Audio("sounds/" + name + ".mp3");
  audioColor.play();

}


function animatePress(currentColor){

  $(currentColor).addClass("pressed");
  setTimeout(function(){$(currentColor).removeClass("pressed");},100);

}



function checkAnswer(currentLevel){


if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
          userClickedPattern = [];
        }, 1000);
    }
    }else{
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();

      $("body").addClass("game-over");
      setTimeout(function () {$("body").removeClass("game-over");}, 200);

      $("h1").text("Game Over, Press any key to restart.");

      startOver();
    }

}

function startOver(){

  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];

}
