// Function to start and setup game
function startGame() {
	// Choose a random word from word list
	var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
	var middleWord = randomWord.slice(1, -1);

	// Extract first, middle, and last letters from random word
	letter1 = randomWord.slice(0, 1);
	letter2 = middleWord.charAt(Math.floor(Math.random() * middleWord.length));
	letter3 = randomWord.slice(-1);
	var letString = (letter1 + letter2 + letter3).toUpperCase();

	// Randomly generate numbers
	function makeNumString(num) {
		var string = "";
		var digits = "0123456789";
		for (var i = 0; i < num; i++) string += digits.charAt(Math.floor(Math.random() * digits.length));
		return string;
	}
	var numString = makeNumString(4);

	// Display letters and numbers onto plate
	$(".plate-chars1").html(letString);
	$(".plate-chars2").html(numString);
}

// Start game on page load
$(document).ready(function() {
	startGame();
});



// Submit word
function submit() {
	var wordInput = $(".word-input").val()

	// Check if entered word matches letters
	var firstCheck = wordInput.slice(0, 1) == letter1;
	var middleCheck = (wordInput.slice(1, -1)).includes(letter2);
	var lastCheck = wordInput.slice(-1) == letter3;

	if (wordList.includes(wordInput) && firstCheck && middleCheck && lastCheck) {
		var currentScore = $(".score-amount").html();
		var newScore = parseFloat(currentScore) + wordInput.length;
		var pointsDiv = $(`<div class="points-message">+${wordInput.length} points!</div>`);
		addScore(pointsDiv);
		$(".score-amount").html(newScore);

		startGame();
		$(".word-input").val("");

		$(".word-input").focus();
	} else {
		var wrongDiv = $(`<div class="wrong-message">Hmm...</div>`);
		addScore(wrongDiv);
	}
}
$(".submit-btn").click(() => submit());



// Skip round with detour button
function skip() {
	startGame();
	$(".word-input").val("");

	$(".word-input").focus();
}
$(".skip-btn").click(() => skip());



// Stop game with crash button
function stop() {
	startGame();
	var div = $(`<div class="wrong-message">Game reset!</div>`);
	addScore(div)
	$(".score-amount").html("0");

	timeLeft = 30;
	$(".time-left").html(timeLeft);

	$(".word-input").focus();
}
$(".stop-btn").click(() => stop());



// Keyboard controls
$(document).keydown(function(e) {
	if (e.keyCode === 13) submit();
	if (e.keyCode === 9) {
		e.preventDefault();
		skip();
	}
	if (e.keyCode === 27) stop();
});



// Function to add score message in score container
function addScore(e) {
	var fontSize = parseFloat($(".score-container").css("--font-size"));
	e.appendTo($(".score-container")).animate({
		"display": "none",
		"opacity": 0,
		"margin-top": (fontSize * 2.8).toString() + "rem"
	}, 500);
}



// Timer function
timeLeft = parseInt($(".time-left").html());
setInterval(function() {
	if (timeLeft > 0) {
		timeLeft--;
		$(".time-left").html(timeLeft);
	}
}, 1000);