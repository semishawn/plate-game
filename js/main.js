function showDialogue(dialogue) {
	$("body").addClass("show-dialogue");
	$(".body-block > *").removeClass("flex-show");
	$(dialogue).addClass("flex-show");
}

function hideDialogue() {
	$("body").removeClass("show-dialogue");
}