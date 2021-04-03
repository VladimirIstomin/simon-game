$(document).on('keydown click', startGame);

// Variables to which needed access in several functions
let squareColors = ['red', 'orange', 'yellow', 'lime']
let level;
let gameStarted = false;
let sequenceOfColors;
let userSequenceOfColors;


function startGame(event) {
	if (event.type === 'click' && gameStarted === true) {}
	else {
		gameStarted = true;
		level = 0;
	    sequenceOfColors = [];

	    $('body').removeClass('red-background');
	    $('h2').removeClass('visible');

	    generateSequence();
	}	    
}


function generateSequence() {
    level++;
    $('h1').text(`Currently you are at level ${level}`);
    userSequenceOfColors = [];

    // Define next color
    let nextColorNumber = Math.floor(Math.random() * 4);
    let nextColor = squareColors[nextColorNumber];
    sequenceOfColors.push(nextColor);

    // Highlight the next color
    $(`#${nextColor}`).fadeOut(100).fadeIn(100);
    playSound(nextColor);
}


$('.square').click(event => {
	// Handle click from the point of view of sequence of colors
    let currentPickedColor = $(event.target).attr('id');
    userSequenceOfColors.push(currentPickedColor);

    //Highlight picked color
    $(`#${currentPickedColor}`).addClass('opacity');
    setTimeout(() => $(`#${currentPickedColor}`).removeClass('opacity'), 100);

    checkSequence();
})


function checkSequence() {
    let lastPickedColorIndex = userSequenceOfColors.length - 1;
    if (userSequenceOfColors[lastPickedColorIndex] !== sequenceOfColors[lastPickedColorIndex]) {
        endGame();
    } else if (userSequenceOfColors.length === sequenceOfColors.length) {
        setTimeout(() => generateSequence(), 1000);
    }

}


function playSound(name) {
    let sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}


function endGame() {
    $('body').addClass('red-background');
    $('h1').text(`You lost at level ${level}!`);
    $('h2').addClass('visible');
  	playSound('level');
  	setTimeout(() => gameStarted = false);
}
