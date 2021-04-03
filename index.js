$('body').on('keydown', configureGame);

// Variables to which needed access in several functions
let level;
let sequenceOfSquares;
let squares;
let startGameSound;
let currentPostionInSequence;


function configureGame() {
    squares = $('.square'); // alternative: document.querySelectorAll('.square')

    // Sound configuration
    startGameSound = new Audio('sounds/crash.mp3');

    let squareSounds = [];
    for (let i = 1; i < 5; i++) {
        squareSounds.push(new Audio(`sounds/tom-${i}.mp3`));
    }

    squares.click(event => { // alternative: squares.forEach(square => sqaure.addEventListener ...)
        let element = $(event.target);
        let clickSound;

        if (element.hasClass('red')) {
            clickSound = squareSounds[0];
        } else if (element.hasClass('orange')) {
            clickSound = squareSounds[1];
        } else if (element.hasClass('yellow')) {
            clickSound = squareSounds[2];
        } else if (element.hasClass('lime')) {
            clickSound = squareSounds[3];
        }

        clickSound.play();

        // Stop playing sound, because in case of clicking fair fast, the audio won't be played
        setTimeout(() => {
            clickSound.pause();
            clickSound.currentTime = 0;
        }, 500);
    });

    startGame();
}


function startGame() {
    level = 0;
    sequenceOfSquares = [];
    $('h2').removeClass('visible');

    startNewLevel();
}


function startNewLevel() {
    squares.off('click', checkSequence);

    startGameSound.play();

    //Defining the square, which will be highlighted
    let squareNumber = Math.floor(Math.random() * 4);
    level++;
    $('h1').text(`Current level is ${level}`);
    sequenceOfSquares.push(squares[squareNumber]);

    // Highlighting the square
    let currentSquare = $(squares[squareNumber]);
    currentSquare.addClass('highligted');
    setTimeout(() => currentSquare.removeClass('highligted'), 500);

    // Start checking the sequence
    currentPostionInSequence = 0;
    squares.on('click', checkSequence);
}


function checkSequence(event) {
    if (event.target === sequenceOfSquares[currentPostionInSequence]) {
        currentPostionInSequence++;
    } else {
        endGame(level);
    }

    if (currentPostionInSequence === sequenceOfSquares.length) {
        startNewLevel();
    }
}


function endGame(level) {
    $('h1').html(`You lost at level ${level}!`);
    $('h2').addClass('visible');
}
