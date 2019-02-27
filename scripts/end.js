function getScore(){
	var score = window.location.href.split("?")[1].split("=")[1];
    document.getElementById("endscore").innerHTML = score;
}