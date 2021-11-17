$(document).ready(function() {
	$(".letter-input").focus();
});



$(".letter-input").on("propertychange input", function() {
	var $this = $(this);

	var upper = $(this).val().toUpperCase().replace(/[^A-Z]/g, "");
	$(this).val(upper);

	if ($(this).val().length == 3) {
		var letter1 = $this.val().charAt(0).toLowerCase();
		var letter2 = $this.val().charAt(1).toLowerCase();
		var letter3 = $this.val().charAt(2).toLowerCase();

		// Filter words from letters
		function filters(word) {
			var cond1 = word.charAt(0) == letter1;
			var cond2 = (word.slice(1, -1)).includes(letter2);
			var cond3 = word.slice(-1) == letter3;
			if (cond1 && cond2 && cond3) return true;
		}
		var filtered = wordList.filter(filters);

		// All words in HTML format
		var filteredAllHtml = "";
		for (word in filtered) filteredAllHtml += ("<div class=\"filtered-word\">" + filtered[word] + "</div>");

		// Sample list of words in HTML format
		var sampleNum = 10;
		var filteredSampleHtml = "";
		for (word in filtered.slice(0, sampleNum)) filteredSampleHtml += ("<div class=\"filtered-word\">" + filtered[word] + "</div>");

		// Calculate word with most characters in filtered array
		var longest = filtered.reduce(function(a, b) {
			return a.length > b.length ? a : b;
		});

		// Calculate word with average amount of characters in filtered array
		var middleLength = Math.floor(filtered.length / 2);
		var filteredSorted = filtered.sort(function(a, b) {
			return a.length - b.length
		});
		var middlest = filteredSorted[middleLength];

		// Calculate worst with least characters in filtered array
		var shortest = filtered.reduce(function(a, b) {
			return a.length <= b.length ? a : b;
		});

		$(".actual-count").html(filtered.length);
		var sampleList = $(".sample-word-list");
		sampleList.html(filteredAllHtml);
		if (sampleList[0].offsetHeight < sampleList[0].scrollHeight) $(".show-all-btn").css("visibility", "visible");
		$(".actual-longest").html(longest);
		$(".actual-middlest").html(middlest);
		$(".actual-shortest").html(shortest);
		$(".all-word-list").html(filteredAllHtml);
	} else {
		$(".actual-count").html("?");
		$(".sample-word-list").html("");
		$(".show-all-btn").css("visibility", "hidden");
		$(".actual-longest").html("?");
		$(".actual-middlest").html("?");
		$(".actual-shortest").html("?");
	}
});



$(".show-all-btn").click(function() {
	$("body").addClass("show-dialogue");
});

$(".close-all-btn").click(function() {
	$("body").removeClass("show-dialogue");
});