function setCookie(name, value) {
	var date = new Date();
	// cookie expires in 1 day
	date.setTime(date.getTime()+(1000*60*60*24));
	var expires = "; expires="+date.toGMTString();

	document.cookie = name + "=" + value + expires + "; path=/";
}


function redirectToPlayback() {
	window.location.href = './playback.html';
}


questions = ["Would you like lyrics in your music?",
"What genre of music do you listen to to study (we may need to provide genres given by spotify)",
"Would you like your music to be lively, quiet, or brown noise (add categories this is just what I use)",
"Would you like your music to be slow, moderate, or fast?"
]
questionNumber = 0

function onloadFunc() {
	console.log("questionNumber", questionNumber)
	document.getElementById("quiz-button-left").addEventListener("click", function() {
		quizButtonClicked(0)
		console.log("left clicked")
	});
	
	document.getElementById("quiz-button-right").addEventListener("click", function() {
		quizButtonClicked(1)
		console.log("right clicked")
	});
}

// side = 0 means left / yes
// side = 1 means right / no
function quizButtonClicked(side) {
	// set cookieName to question number
	let cookieName = "question_" + questionNumber + "_answer"
	// ex: question_number_0_answer
	let cookieVal = side;
	// set the cookie to whatever answer the user gave
	setCookie(cookieName, cookieVal)
	// increment questionNumber
	questionNumber += 1
	if (questionNumber === questions.length) {
		redirectToPlayback()
	} else {
		newContent = questions[questionNumber]
		document.getElementById("quiz-question").textContent=newContent
	}
}
