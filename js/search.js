$(".letter-input").on("propertychange input", function() {
	var numsOnly = $(this).val().replace(/[^a-z]/g, "");
	$(this).val(numsOnly);

	var count = parseInt($(this).attr("class").slice(-1));
	if (count < 3) {
		nextInt = (count + 1).toString();
		$(".letter-input" + nextInt).focus();
	}
});