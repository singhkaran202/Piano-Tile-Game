alert("Game instructions:1. Follow which tile blinks and press that tile accordingly.2.Press any button to start the game initially. After finishing the game refresh the page to start a new game ");

var buttonNumbers = ["key1", "key2", "key3", "key4", "key5", "key6", "key7", "key8", "key9", "key10", "key11", "key12", "key13", "key14", "key15", "key16"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;
var k=1000;

document.querySelector("body").addEventListener("keydown", function() {
  if (!started) {
    document.querySelector("#level-title").innerHTML = (level-1);
    nextSequence();
    setTimeout(function() {
      nextSequence();
    }, 100);  
    // setTimeout(function() {
    //   nextSequence();
    // }, 200);
    started = true;
  }

})


for (var i = 0; i < (document.querySelectorAll(".btn").length); i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
    var userChosenKey = this.getAttribute("id");
    userClickedPattern.push(userChosenKey);
    gamePattern.push(userChosenKey);
    console.log(userClickedPattern);
    playSound(userChosenKey);
    animatePress(userChosenKey);
    checkAnswer(userClickedPattern.length - 1);
  });
}

function nextSequence() {
    level++;
    document.querySelector("#level-title").innerHTML = (level-1);
    var randomNumber = Math.floor(Math.random() * 16);
    var randomChosenKey = buttonNumbers[randomNumber];
    gamePattern.push(randomChosenKey);
  
    animatePress(randomChosenKey); 
    playSound(randomChosenKey);
  }



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      // setTimeout(function() {
      //   nextSequence();
      // }, 1100);
      // setTimeout(function() {
      //   nextSequence();
      // }, 1200);
    }

  } else {

    console.log("wrong");

    playSound("wrong");
    document.querySelector("#level-title").innerHTML = ("Game Over, your score is " + (level-1));
    document.querySelector("body").ClassList.add("game-over");
    setTimeout(function() {
      document.querySelector("body").ClassList.remove("game-over");
    }, 200);



    //2. Call startOver() if the user gets the sequence wrong.
    startOver();
  }

}


// function nextSequence() {
//     level++;
//     document.querySelector("#level-title").innerHTML = (level-1);
//     var randomNumber = Math.floor(Math.random() * 16);
//     var randomChosenKey = buttonNumbers[randomNumber];
//     gamePattern.push(randomChosenKey);
  
//     animatePress(randomChosenKey); 
//     playSound(randomChosenKey);
//   }

var btn1 = randomChosenKey;
btn1.addEventListener("click", addGlow);

//the function addGlow, adds the glow class to btn2
function addGlow() {
//   var btn2 = document.getElementById("btn2");
  btn1.classList.add("glow");
}

function playSound(bruh) {
  var audio = new Audio('sounds/sounds.wav');
  audio.play();
}

function animatePress(k) {
  var activeButton = document.querySelector("." + k);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}