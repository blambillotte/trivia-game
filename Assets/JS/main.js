

var game = {
  ///// Constants
  QUESTIONS: [
    {
      tite: 'What is your fav color?',
      options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
      correctOptionIndex: 0,
      imgSrc: 'asdf;lksdjf'
    },
    {
      tite: 'What is your fav Planet?',
      options: ['Mars', 'Earth', 'Saturn', 'Neptune'],
      correctOptionIndex: 1,
      imgSrc: 'asdf;lksdjf'
    },
    {
      tite: 'What is your fav color3?',
      options: ['Whattt', 'Green', 'Blue', 'Yellow', 'Purple'],
      correctOptionIndex: 0,
      imgSrc: 'asdf;lksdjf'
    },
    {
      tite: 'What is your fav color4?',
      options: ['Yep', 'Green', 'Blue', 'Yellow', 'Purple'],
      correctOptionIndex: 0,
      imgSrc: 'asdf;lksdjf'
    }
  ],
  CONFIG: {
    questionTimeout: (30 * 1000)
  },
  ///// General Game Variables
  roundAttributes: {
    currentQ: 0,
    wins: 0,
    losses: 0,
  },
  ///// DOM Queries
  domElements: {
    btnContainer: $('#button-container'),
    startBtn: $('#start-btn')
  },
  /////////////
  /// Main Functions
  init: function() {
    //Add start game Listener
    this.domElements.startBtn.click(game.gameStart);
  },

  gameStart: function() {
    console.log('Game Starting! 🚀');
    game.createButtons();
  },

  createButtons: function() {
    for (var i = 0; i < this.QUESTIONS[this.roundAttributes.currentQ].options.length; i++) {
      //Create new button Div with attributes
      var $newBtn = $('<input/>').attr(
        {
          type: 'button',
          id: i,
          value: this.QUESTIONS[this.roundAttributes.currentQ].options[i]
        });

      //Attach Click Listener and call buttonClicked function
      $newBtn.click(this.buttonClicked)

      //Append new element to DOM
      this.domElements.btnContainer.append($newBtn);

    }
  },

  buttonClicked: function() {
    //Check if the button clicked was correct
    if (parseInt(this.id) === game.QUESTIONS[game.roundAttributes.currentQ].correctOptionIndex) {

      //If Correct, increment Wins
      game.roundAttributes.wins++;

      //Display result
      game.displayResult('You Guessed Correct!');

    } else {
      //If Wrong, increment Losses
      game.roundAttributes.losses++;

      //Display result
      game.displayResult('Oh no! You guessed wrong!!');
    }
    console.log(game.roundAttributes);
  },

  displayResult: function(result) {
    console.log(result);
    //Remove buttons
    this.domElements.btnContainer.empty();

    //Check if last question
    this.checkGameComplete();
  },

  checkGameComplete: function() {
    if (parseInt(this.roundAttributes.currentQ) === (this.QUESTIONS.length) -1) {
      console.log('Game Over');
    } else {
      //If the game isn't complete, move to next quesiton
      this.nextQuestion();
    }
  },

  nextQuestion: function() {
    //Increment currentQ
    this.roundAttributes.currentQ++;

    //Render new Questions
    this.createButtons();
  }

}

console.log(game);


game.init();
