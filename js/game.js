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
		for (var i = 0; i < num; i++)
			string += digits.charAt(Math.floor(Math.random() * digits.length));
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
$(".submit-btn").click(function() {
	var wordInput = $(".submit-box").val()

	// Check if entered word matches letters
	var firstCheck = wordInput.slice(0, 1) == letter1;
	var middleCheck = (wordInput.slice(1, -1)).includes(letter2);
	var lastCheck = wordInput.slice(-1) == letter3;

	if (firstCheck && middleCheck && lastCheck && wordList.includes(wordInput)) {
		var currentScore = $(".score-amount").html();
		var newScore = parseFloat(currentScore) + wordInput.length;
		var pointsDiv = $(`<div class="points-message">+${wordInput.length} points!</div>`);
		pointsDiv.appendTo($(".score-container")).animate({
			"display": "none",
			"opacity": 0,
			"margin-top": "7rem"
		}, 500);
		$(".score-amount").html(newScore);

		startGame();
		$(".submit-box").val("");
	}

	else {
		var wrongDiv = $(`<div class="wrong-message">Hmm...</div>`);
		wrongDiv.appendTo($(".score-container")).animate({
			"display": "none",
			"opacity": 0,
			"margin-top": "7rem"
		}, 500);
	}
});



// Run submit function on enter press
$(document).keyup(function(e) {
	if (e.keyCode === 13) $(".submit-btn").click();
});



// Skip round with detour button
$(".skip-btn").click(function() {
	startGame();
	$(".submit-box").val("");
});



// Stop game with crash button
$(".stop-btn").click(function() {
	startGame();
	$(".score-amount").html("0");
});