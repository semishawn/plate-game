// Store user's correct guesses==
correctGuesses = [];



// Initialize timer settings
timeLimit = 60;
$(".time-left").html(timeLimit);



// Function to start and setup game
function startGame(seed) {
	// Choose word from seed
	var wordIndex = Math.floor(seed * wordList.length);
	var word = wordList[wordIndex];


	// Choose plate background from seed
	var plateIndex = Math.floor(seed * plateList.length);
	var plate = plateList[plateIndex];
	$(".plate-background").attr("src", "img/plates/" + plate.state + ".svg");


	// Apply CSS styles to plate
	$(".plate-number").css({
		"font-size": plate.text.size + "rem",
		"margin-top": plate.text.offset + "rem",
		"color": plate.text.color,
	});


	// If plate has specified divider
	if (plate.divider.name) {
		$(".plate-divider").load("img/dividers/" + plate.divider.name + ".svg", function() {
			$(this).contents().unwrap();
	
			$(".plate-number svg").attr("style", `
				height: ${plate.divider.width}rem !important;
				margin-left: ${plate.divider.margin}rem;
				margin-right: ${plate.divider.margin}rem;
			`);
	
			$(".plate-number svg > *").css("fill", plate.text.color);
		});
	} else {
		$(".plate-divider").css({
			"margin-left": plate.divider.width / 2 + "rem",
			"margin-right": plate.divider.width / 2 + "rem"
		});
	}


	// Randomly tilt license plate on game start
	var tiltExtreme = 1.5;
	var tilt = Math.floor(Math.random() * tiltExtreme) + 1;
		tilt *= Math.round(Math.random()) ? 1 : -1;
	$(".license-plate").css("transform", "rotate(" + tilt + "deg)")


	// Extract first, middle, and last letters from seeded word
		letter1 = word.slice(0, 1);
	var wordMiddle = word.slice(1, -1);
		letter2 = wordMiddle.charAt(Math.floor(seed * wordMiddle.length));
		letter3 = word.slice(-1);
	var letString = (letter1 + letter2 + letter3).toUpperCase();


	// Randomly generate numbers
	function generateNumString(num) {
		var string = "";
		var digits = "0123456789";
		for (var i = 0; i < num; i++) string += digits.charAt(Math.floor(Math.random() * digits.length));
		return string;
	}
	var numString = generateNumString(4);


	// Display letters and numbers onto plate
	$(".plate-chars1").html(letString);
	$(".plate-chars2").html(numString);


	// Timer functionality
	if (typeof timer !== "undefined") clearInterval(timer);
	timeLeft = timeLimit;
	$(".time-left").html(timeLeft);
	timer = setInterval(function() {
		if (timeLeft > 0) {
			timeLeft--;
			$(".time-left").html(timeLeft);
		} else {
			$(".word-input").blur();
			showDialogue(".end-container");
			
		}
	}, 1000);


	$(".word-input").focus();
}



// Start game on play today button click
$(".play-today-btn").click(function() {
	var now = new Date();
	var daysSinceEpoch = Math.floor(now / 86400000);
	var seed = new Math.seedrandom(daysSinceEpoch);
	startGame(seed());
	hideDialogue();
});

// Start game on play from seed button click
$(".play-seed-btn").click(function() {
	if ($(".seed-input").val().length > 0) {
		var seedInput = $(".seed-input").val();
		var seed = new Math.seedrandom(seedInput);
		startGame(seed());
		hideDialogue();
	}
});



// Submit word
function submit() {
	var wordInput = $(".word-input").val();

	// Check if entered word matches letters
	var realWordCheck = wordList.includes(wordInput);
	var alreadyGuessedCheck = correctGuesses.includes(wordInput);
	var firstLetterCheck = wordInput.slice(0, 1) == letter1;
	var middleLetterCheck = (wordInput.slice(1, -1)).includes(letter2);
	var lastLetterCheck = wordInput.slice(-1) == letter3;

	if (realWordCheck && !alreadyGuessedCheck && firstLetterCheck && middleLetterCheck && lastLetterCheck) {
		correctGuesses.push(wordInput);
		
		var currentScore = $(".score-amount").html();
		var newScore = parseFloat(currentScore) + wordInput.length;
		$(".score-amount").html(newScore);

		var pointsDiv = $(`<div class="points-message">+${wordInput.length} points!</div>`);
		addScore(pointsDiv);

		$(".word-input").val("");
		$(".word-input").focus();
	} else {
		var wrongDiv = $(`<div class="wrong-message">Invalid word!</div>`);
		addScore(wrongDiv);
	}
}
$(".submit-btn").click(() => submit());



// Keyboard controls
$(document).keydown(function(e) {
	if (e.keyCode === 13) submit();
	if (e.keyCode === 9) {
		e.preventDefault();
		$(".plate-number svg").replaceWith(`<div class="plate-divider"></div>`);
		startGame(Math.random());
	}
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