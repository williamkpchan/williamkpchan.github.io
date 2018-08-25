let timeRemaining = 0;

function increaseTime(secondsToAdd) {
  // Add some time to the timer
  timeRemaining = timeRemaining + secondsToAdd;
  
  displayTime();
}

function displayTime() {
  let countdown = document.getElementById('countdown');
  
  let displaySeconds = timeRemaining;
  
  let hours = 0;
  while(displaySeconds >= 3600) {
    hours = hours + 1;
    displaySeconds = displaySeconds - 3600;
  }
  
  if(hours < 10) {
    hours = '0' + hours;
  }
  
  let minutes = 0;
  while(displaySeconds >= 60) {
    minutes = minutes + 1;
    displaySeconds = displaySeconds - 60;
  }
  
  if(minutes < 10) {
    minutes = '0' + minutes;
  }
  
  if(displaySeconds < 10) {
    displaySeconds = '0' + displaySeconds;
  }
  
  countdown.innerText = `${hours}:${minutes}:${displaySeconds}`;
}

let timer;

function start() {
  if( ! timer) {
  // Start the timer
    timer = setInterval(function() {
      timeRemaining = timeRemaining - 1;
      displayTime();
    }, 1000); 
  }
}