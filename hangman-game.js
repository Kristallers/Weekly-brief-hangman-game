let userWord = "";
let userGuess = "";
let wronglyGuessedLetters = [];
let guess = "";
let lives = 10;
let indices = [];
let guessingArray = [];
let userWordArray = [];

// asking the user for the word which will play the game
function askWord() {
  userWord = prompt(
    "What word or sentence would you like to use for this game? (1-20 characters)"
  ).toUpperCase();
  if (userWord.length >= 20 || userWord.length < 1) {
    alert("word/sentence must be between 1-20 charachter");
    askWord();
  }

  //creates an array out of the inputted word
  userWordArray = userWord.split("");
  console.log(userWordArray);

  //Make an array out of the userWordArray where all of the characters are replaced by _ except for blank spaces
  // guessingArray = [];
  for (i = 0; i < userWordArray.length; i++) {
    guessingArray.push("_");
  }
  console.log(guessingArray);
}

// asking the user to input a letter they want to guess
function askLetter() {
  alert(guessingArray.join(" "));
  guess = prompt(
    "What letter are you guessing? \n \nThese are your currently wrongly guessed letters:\n" +
      wronglyGuessedLetters.join(" ") +
      "\n \ncurrent lives left: " +
      lives +
      "\n\n" +
      guessingArray.join(" ")
  ).toUpperCase();
  console.log(guess);
}

// starting the game, outside of the loop
askWord();

// replace _ with the correctly guessed letter in the guessingArray
function replaceGuesses() {
  for (let i = 0; i < indices.length; i++) {
    let newIndex = indices[i];
    console.log(newIndex);
    guessingArray.splice(newIndex, 1, guess);
    console.log(guessingArray);
  }
}

//function to restart game
function restartGame() {
  wronglyGuessedLetters = [];
  userWordArray = [];
  guessingArray = [];
  lives = 10;
  askWord();
}

// function containging the game
function runGame() {
  while (true) {
    console.log(guessingArray);
    console.log(userWordArray);
    if (guessingArray.join("") === userWordArray.join("")) {
      if (
        confirm("Congratulations, you win!\nWould you like to play again?") ===
        true
      ) {
        restartGame();
      } else {
        break;
      }
    }
    if (lives === 0) {
      if (confirm("Oh no, you lose!\nWould you like to play again?") === true) {
        restartGame();
      } else {
        break;
      }
    }
    askLetter();
    if (userWordArray.includes(guess)) {
      indices = [];
      let guessedLetterIndex = userWordArray.indexOf(guess);
      while (guessedLetterIndex != -1) {
        //get array of all the indices of the guessed letter in the userWordArray
        indices.push(guessedLetterIndex);
        guessedLetterIndex = userWordArray.indexOf(
          guess,
          guessedLetterIndex + 1
        );
        console.log(indices);
      }
      replaceGuesses();
    } else if (wronglyGuessedLetters.includes(guess)) {
      alert(
        "Wee Woo! You already guessed that word wrongly. No extra lives lost."
      );
    } else if (guess === "" || guess.length > 1) {
      alert("You need to type one letter.");
    } else if (userWordArray.includes(guess) === false) {
      alert("That letter is not in the word. Try again.");
      lives -= 1;
      wronglyGuessedLetters.push(guess);
    }
  }
}

// calling the function to run the game
runGame();
