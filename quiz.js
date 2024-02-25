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


questions = ["Do you like lyrics in your music?",
"Do you like songs with or without lyrics for documenting?",
"Do you like songs with or without lyrics for ideating?",
"Do you like songs with or without lyrics for coding?",
"Do you like listening to loud music when documenting?",
"Do you like listening to loud music when ideating?",
"Do you like listening to loud music when coding?"]
answers = [["Yes", "No"],
["With", "Without"],
["With", "Without"],
["With", "Without"],
["Yes", "No"],
["Yes", "No"],
["Yes", "No"]]

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
	// ex: question_0_answer
	let cookieVal = side;
	// set the cookie to whatever answer the user gave
	setCookie(cookieName, cookieVal)
	// increment questionNumber
	questionNumber += 1
	if (questionNumber === questions.length) {
		redirectToPlayback()
	} else {
		newContent = questions[questionNumber]
		newAnswer1 = answers[questionNumber][0]
		newAnswer2 = answers[questionNumber][1]
		
		document.getElementById("quiz-question").textContent=newContent
		document.getElementById("quiz-button-left-text").textContent=newAnswer1
		document.getElementById("quiz-button-right-text").textContent=newAnswer2
	}
}
