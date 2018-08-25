var timeRemaining = 0; inputTime = 0;
var timer;
var timesupAlarm = new Audio('https://freesound.org/data/previews/249/249950_4305912-lq.mp3');

function setTimer() {
	timeRemaining = timeStringToSec(document.getElementById("settimer").value);
	showTime();
}

function timeStringToSec(time) {
	var hoursMinutes = time.split(/[.:]/);
	var hours = parseInt(hoursMinutes[0], 10);
	var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
	return (hours *60 + minutes)*60;
}

function showTime() {
	var displaySeconds = timeRemaining;
	var hours = 0;
	while(displaySeconds >= 3600) {hours = hours + 1; displaySeconds = displaySeconds - 3600;}
	if(hours < 10) {hours = '0' + hours;}
	var minutes = 0;
	while(displaySeconds >= 60) {minutes = minutes + 1; displaySeconds = displaySeconds - 60;}
	if(minutes < 10) {minutes = '0' + minutes;}
	if(displaySeconds < 10) {displaySeconds = '0' + displaySeconds;}
	themsg = hours + ":" + minutes + ":" + displaySeconds;
	showMsg(themsg);
}

function showMsg(themsg) {
	var countdown = document.getElementById('countdown');
	countdown.innerText = themsg;
}
function checkTimeup() {
	var displaySeconds = timeRemaining;
	showTime();
	if( ! displaySeconds ) {timesupAlert();}
}

function timesupAlert() {
	clearInterval(timer); 
	showMsg("Times Up!");
	timesupAlarm.play(); 
}

function start() {
	clearInterval(timer); 
	setTimer();
	timer = setInterval(function() {timeRemaining = timeRemaining - 1; checkTimeup();}, 1000); 
}

