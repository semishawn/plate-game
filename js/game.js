// Function to start and setup game
function startGame() {
	// Choose a random word from word list
	var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
	var middleWord = randomWord.slice(1, -1);

	// Randomly generated letters
	letter1 = randomWord.slice(0, 1);
	letter2 = middleWord.charAt(Math.floor(Math.random() * middleWord.length));
	letter3 = randomWord.slice(-1);
	var letString = (letter1 + letter2 + letter3).toUpperCase();

	// Randomly generated numbers
	function makeNumString() {
		var string = "";
		var digits = "0123456789";
		for (var i = 0; i < 4; i++)
			string += digits.charAt(Math.floor(Math.random() * digits.length));
		return string;
	}
	var numString = makeNumString();

	// Display license plate number
	$(".plate-chars1").html(letString);
	$(".plate-chars2").html(numString);
}

$(document).ready(function() {
	startGame();
});



// submit word with play button
$(".submit-btn").click(function() {
	var wordInput = $(".submit-box").val()

	// Check if word entered exists in English
	if (wordList.includes(wordInput)) {
		var firstCheck = wordInput.slice(0, 1) == letter1;
		var middleCheck = (wordInput.slice(1, -1)).includes(letter2);
		var lastCheck = wordInput.slice(-1) == letter3;

		if (firstCheck && middleCheck && lastCheck) {
			// "+" + wordInput.length + " points!"
			var currentScore = $(".score-amount").html();
			var newScore = parseFloat(currentScore) + wordInput.length;
			$(".score-amount").html(newScore);
		}

		startGame();
		$(".submit-box").val("");
	}
	else $(".score").html("That's not a word!");
});



// If press enter
$(document).keyup(function(e) {
	if (e.keyCode === 13) $(".submit-btn").click();
});



// Skip function
$(".skip-btn").click(function() {
	startGame();
});



// Skip function
$(".stop-btn").click(function() {
	startGame();
	$(".score-amount").html("0");
});