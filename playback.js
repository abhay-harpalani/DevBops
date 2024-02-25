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

function delete_cookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function get_playlist_id(playlist_number) {
	console.log("getting playlist ", playlist_number)
	// TODO: get playlist id from cookies here
}

function switch_playlist(playlist_num) {
	// TODO: write switch_playlist function
}

/*
0 - chill
1 - focused
2 - high energy
*/
currentPlaylist = 0

function onloadFunc() {
	document.getElementById("playback-button-left").addEventListener("click", function() {
		playbackButtonClicked(0)
		console.log("left clicked")
	});
	
	document.getElementById("playback-button-mid").addEventListener("click", function() {
		playbackButtonClicked(1)
		console.log("mid clicked")
	});
	
	document.getElementById("playback-button-right").addEventListener("click", function() {
		playbackButtonClicked(2)
		console.log("right clicked")
	});
}

// buttonNumber = 0 means left  (Documenting/Chill)
// buttonNumber = 1 means mid   (Ideating/Focused)
// buttonNumber = 2 means right (Coding/High Energy)
function playbackButtonClicked(buttonNumber) {
	get_playlist_id(buttonNumber)
	switch_playlist(buttonNumber)
}
