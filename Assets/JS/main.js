
$(document).ready(function() {
  var game = {
    ///// Constants
    QUESTIONS: [
      {
        title: 'How many symphonies did Beethoven write?',
        options: ['Two', 'Six', 'Nine', 'Thirteen', 'None'],
        correctOptionIndex: 2,
        imgSrc: './Assets/Images/beethoven.gif'
      },
      {
        title: 'At what age did Mozart start composing?',
        options: ['Sixteen', 'Twenty', 'Six', 'Eleven'],
        correctOptionIndex: 2,
        imgSrc: './Assets/Images/mozart.gif'
      },
      {
        title: 'Which composer wrote in the "Romantic" era?',
        options: ['Shostakovich', 'Brahms', 'Vivaldi', 'Mozart', 'Bach'],
        correctOptionIndex: 1,
        imgSrc: './Assets/Images/brahms.gif'
      }
    ],
    CONFIG: {
      questionTimeout: 10,
      aftrQuestionPause: (4 * 1000),
      directions: 'Ready to play some Trivia? Click the Start button below and try to answer the questions before time runs out!'
    },
    ///// General Game Variables
    roundAttributes: {
      currentQ: 0,
      wins: 0,
      losses: 0,
      timeElapsed: 0,
      intervalId: ''
    },
    ///// DOM Queries
    domElements: {
      btnContainer: $('#button-container'),
      startBtn: $('#start-btn'),
      resetBtn: $('#reset-btn'),
      qPrompt: $('#question-prompt'),
      correctAnswr: $('#correct-answer'),
      answerImg: $('#img-container'),
      container: $('#container'),
      countDown: $('#time-remaining'),
      infoDiv: $('#info')
    },
    /////////////
    /// Main Functions
    init: function() {
      //Add start and reset game Listener
      this.domElements.startBtn.click(game.gameStart);
      this.domElements.resetBtn.click(game.resetGame);

      //Write direcitons to the Dom
      this.domElements.infoDiv.html(this.CONFIG.directions);
    },

    gameStart: function() {
      console.log('Game Starting! 🚀');
      //Remove start elements
      game.domElements.startBtn.addClass('hidden');
      game.domElements.infoDiv.empty();

      //Resize window
      game.domElements.container.removeClass('small-size');

      //Create first buttons
      game.displayNewQuestion();
    },

    displayNewQuestion: function() {
      //Clear previous DOM elements
      this.domElements.correctAnswr.empty();
      this.domElements.answerImg.empty();
      this.domElements.countDown.empty();

      //Reset countDownClock
      game.roundAttributes.timeElapsed = 0;

      //Write new question prompt
      this.domElements.qPrompt.html(this.QUESTIONS[this.roundAttributes.currentQ].title);
      //Load buttons
      this.createButtons();
      //Set timeout
      this.roundAttributes.intervalId = setInterval(this.countDownClock, 1000);
    },

    countDownClock: function() {
      //This gets called every second what a question is displayed.
      game.roundAttributes.timeElapsed++;
      var timeRemaining = game.CONFIG.questionTimeout - game.roundAttributes.timeElapsed;

      //Write remaining time to DOM
      game.domElements.countDown.html('Time Remaining: ' + timeRemaining);
      console.log(timeRemaining);

      if (timeRemaining < 1) {
        //Record Loss
        game.roundAttributes.losses++;

        //Stop clock
        clearInterval(game.roundAttributes.intervalId);

        //Display result
        game.displayResult('Oh no! You ran out of time!!');
      }
    },

    createButtons: function() {
      for (var i = 0; i < this.QUESTIONS[this.roundAttributes.currentQ].options.length; i++) {
        //Create new button Div with attributes
        var $newBtn = $('<input/>').attr(
          {
            type: 'button',
            id: i,
            value: this.QUESTIONS[this.roundAttributes.currentQ].options[i],
            class: 'btn options-btn'
          });

        //Attach Click Listener and call buttonClicked function
        $newBtn.click(this.buttonClicked)

        //Append new element to DOM
        this.domElements.btnContainer.append($newBtn);

      }
    },

    buttonClicked: function() {
      //Stop countDownClock
      clearInterval(game.roundAttributes.intervalId);

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

      //Show Correct Answer Message
      // TODO: Traversing the object is getting really messy - is there a better way?
      var currentQ = this.roundAttributes.currentQ;
      var currentQObject = this.QUESTIONS[currentQ];
      var currentAnswer = currentQObject.options[currentQObject.correctOptionIndex];
      this.domElements.correctAnswr.html(result + ' The Answer Was "' + currentAnswer + '"');

      //Show Question's Image
      var $imgDiv = $('<img/>').attr(
        {
        src: currentQObject.imgSrc
        });
      console.log($imgDiv);
      this.domElements.answerImg.append($imgDiv);


      //Check if last question after pausing
      var _this = this;
      setTimeout(function() {
        _this.checkGameComplete();
      }, this.CONFIG.aftrQuestionPause);
    },

    checkGameComplete: function() {
      if (parseInt(this.roundAttributes.currentQ) === (this.QUESTIONS.length) -1) {
        this.gameOver();
      } else {
        //If the game isn't complete, move to next quesiton
        this.roundAttributes.currentQ++;
        this.displayNewQuestion();
      }
    },

    gameOver: function() {
      console.log('Game Over');
      //Resize window
      game.domElements.container.addClass('small-size');

      //Rest DOM
      this.domElements.resetBtn.removeClass('hidden');
      this.domElements.qPrompt.addClass('hidden');
      this.domElements.answerImg.addClass('hidden');
      this.domElements.countDown.addClass('hidden');
      this.domElements.answerImg.empty();
      this.domElements.correctAnswr.empty();

      // TODO: Show results of the game (wins and losses)
      var $gameOver = $('<div/>').attr({id: 'game-over',}).html('Game Over! Here\'s How you did:');
      var $wins = $('<div/>').attr({id: 'wins',}).html('Wins: ' + this.roundAttributes.wins);
      var $losses = $('<div/>').attr({id: 'losses',}).html('Losses: ' + this.roundAttributes.losses);
      this.domElements.infoDiv.append($gameOver, $wins, $losses);
    },

    resetGame: function() {
      //Clear Scores
      game.roundAttributes.currentQ = 0;
      game.roundAttributes.wins = 0;
      game.roundAttributes.losses = 0;

      //Hide Reset button
      game.domElements.resetBtn.addClass('hidden');

      //Clear Results Div
      game.domElements.infoDiv.empty();

      //Resize window
      game.domElements.container.removeClass('small-size');

      //Show Question prompt
      game.domElements.qPrompt.removeClass('hidden');
      game.domElements.countDown.removeClass('hidden');
      game.domElements.answerImg.removeClass('hidden');

      //Display a new question
      game.displayNewQuestion();
    }

  }

  // console.log(game);


  game.init();
});
