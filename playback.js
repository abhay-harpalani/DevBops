function setCookie(name, value) {
	var date = new Date();
	// cookie expires in 1 day
	date.setTime(date.getTime()+(1000*60*60*24));
	var expires = "; expires="+date.toGMTString();

	document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function delete_cookie( name, path, domain ) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function switch_playlist(playlist_num) {
	// TODO: write switch_playlist function
}

function get_playlist_name(playlist_number) {
	
}

/*
0 - chill
1 - focused
2 - high energy
*/
currentPlaylist = 0

function onloadFunc() {
	document.getElementById("quiz-button-left").addEventListener("click", function() {
		quizButtonClicked(0)
		console.log("left clicked")
	});
	
	document.getElementById("quiz-button-right").addEventListener("click", function() {
		quizButtonClicked(1)
		console.log("right clicked")
	});
}

// buttonNumber = 0 means left  (chill)
// buttonNumber = 1 means mid   ()
// buttonNumber = 2 means right ()
function playbackButtonClicked(buttonNumber) {

}
