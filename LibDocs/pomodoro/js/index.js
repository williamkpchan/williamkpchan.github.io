$(document).ready(function () {
	var clockText = $('#clock-text');
	var clockBody = clockText.closest('.clock');
	var breakMinus = $('#break-minus');
	var breakPlus = $('#break-plus');
	var breakCount = $('#break-count');
	var sessionMinus = $('#session-minus');
	var sessionPlus = $('#session-plus');
	var sessionCount = $('#session-count');
	var reset = $('#reset');
	var status = $('#status');
	var configureSessionTime;
	var configureBreakTime;
	var isBreakDue;
	var isPaused;
	var hasStarted;
	var alarmSound = new Audio('https://freesound.org/data/previews/459/459145_6142149-lq.mp3');


	function makeTime(minutes, seconds) {
		return minutes + ':' + seconds;
	}

	function zeroFill(num) {
		return num < 10 ? '0' + num : num;
	}

	function displayTime(minutes, seconds) {
		clockText.text(makeTime(minutes, zeroFill(seconds)));
	}

	function alarm() {
		alarmSound.play();
		clockBody.
		addClass('animated shake').
		one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			clockBody.removeClass('animated shake');
		});
		showDateAndTime();
	}

	function makeRed() {
		status.removeClass('green');
		status.addClass('red');
	}

	function makeGreen() {
		status.removeClass('red');
		status.addClass('green');
	}

	var timer;

	function startCountDown(minutes, seconds, ticks) {
		var maxTicks = minutes * 60 + seconds;
		hasStarted = true;
		isPaused = false;
		clearInterval(timer);
		makeGreen();
		timer = setInterval(function () {
			clockBody.one('click', pauseClock);

			function pauseClock() {
				clearInterval(timer);
				makeRed();
				isPaused = true;
				clockBody.one('click', resumeClock);
			}
			function resumeClock() {
				isPaused = false;
				startCountDown(minutes, seconds, 0);
			}

			if (ticks == maxTicks) {
				clearInterval(timer);
				alarm();
				if (isBreakDue) {
					startCountDown(configureBreakTime, 0, 0);
					isBreakDue = false;
				} else
				{
					startCountDown(configureSessionTime, 0, 0);
					isBreakDue = true;
				}
			} else
			if (seconds == 0) {
				minutes--;
				seconds = 59;
			} else {
				seconds--;
			}
			ticks++;
			displayTime(minutes, seconds);
		}, 1000);
	}

	sessionMinus.on('click', function () {
		if (configureSessionTime > 1)
		configureSessionTime--;
		sessionCount.text(configureSessionTime);
		if (!hasStarted)
		displayTime(configureSessionTime, 0);
	});

	sessionPlus.on('click', function () {
		if (configureSessionTime < 99)
		configureSessionTime++;
		sessionCount.text(configureSessionTime);
		if (!hasStarted)
		displayTime(configureSessionTime, 0);
	});

	breakMinus.on('click', function () {
		if (configureBreakTime > 1)
		configureBreakTime--;
		breakCount.text(configureBreakTime);
	});

	breakPlus.on('click', function () {
		if (configureBreakTime < 99)
		configureBreakTime++;
		breakCount.text(configureBreakTime);
	});

	reset.on('click', initialise);

	function initialise() {
		clearTimeout(timer);
		configureSessionTime = 4;
		configureBreakTime = 1;
		isBreakDue = true;
		isPaused = true;
		hasStarted = false;
		clockBody.off('click');

		makeRed();
		breakCount.text(configureBreakTime);
		sessionCount.text(configureSessionTime);
		displayTime(configureSessionTime, 0);

		clockBody.one('click', function () {
			startCountDown(configureSessionTime, 0, 0);
		});
	}
	initialise();
});