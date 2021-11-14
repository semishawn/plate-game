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

		function filters(word) {
			var cond1 = word.charAt(0) == letter1;
			var cond2 = (word.slice(1, -1)).includes(letter2);
			var cond3 = word.slice(-1) == letter3;
			if (cond1 && cond2 && cond3) return true;
		}

		var filtered = wordList.filter(filters);

		var sampleNum = 10;
		var filteredHtml = "";
		for (word in filtered.slice(0, sampleNum)) filteredHtml += ("<div class=\"filtered-word\">" + filtered[word] + "</div>");

		var longest = filtered.reduce(function(a, b) {
			return a.length > b.length ? a : b;
		});

		var middleLength = Math.floor(filtered.length / 2);
		var filteredSorted = filtered.sort(function(a, b) {
			return a.length - b.length
		});
		var middlest = filteredSorted[middleLength];

		var shortest = filtered.reduce(function(a, b) {
			return a.length <= b.length ? a : b;
		});

		$(".actual-count").html(filtered.length + " words");
		$(".word-list").html(filteredHtml);
		if (filtered.length > sampleNum) $(".show-all-btn").show();
		$(".actual-longest").html(longest);
		$(".actual-middlest").html(middlest);
		$(".actual-shortest").html(shortest);
		$(".all-container").html(filteredHtml);
	} else {
		$(".actual-count").html("? words");
		$(".word-list").html("");
		$(".show-all-btn").hide();
		$(".actual-longest").html("...");
		$(".actual-middlest").html("...");
		$(".actual-shortest").html("...");
	}
});



$(".show-all-btn").click(function() {
	$(".body-block").addClass("show-block");
	$(".all-container").addClass("show-grid");
});