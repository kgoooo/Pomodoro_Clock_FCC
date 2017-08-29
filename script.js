// DONE --let - + change the stored time values, and update on DOM
// DONE -- make sure values can not go below 1 or above 99
// start button starts counter
// stop button pauses counter
// reset button stops clock and resets counters to 25 and 5
// when session timer gets to 0 reset clock with break timer. PLAY SOUND.  change colors etc
// when break finishes PLAY SOUND reset clock to break timer and repeat...

let sessionTime = 25;
let breakTime = 5;
let state = 'break';


let updateSession = ()=> {
	$('#session-value').text(`${sessionTime}`);
} 
let updateBreak = () => {
	$('#break-value').text(`${breakTime}`);
}
let updateClock = () => {
	$('#time').text(`${sessionTime}:00`)
}
// Session + & - functionality
$('#s-plus').on('click', () =>{
	if (sessionTime < 99){
		sessionTime ++
		updateSession();
		updateClock();
	}
})
$('#s-min').on('click', () => {
	if (sessionTime > 1){
		sessionTime --
		updateSession();
		updateClock();
		
	}
})
// Break + & - functionality
	$('#b-plus').on('click', () => {
		if(breakTime < 99) {
			breakTime ++
			updateBreak();
		}
	});
	$('#b-min').on('click', () => {
		if (breakTime > 1) {
			breakTime --
			updateBreak();
		}
	});

// 	startBreak = (breakTime) => {
// 		breakMins = breakTime *60
// 		display = $('#time');
// 		startTimer(breakMins, display)
// 	}

// 	function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.text(minutes + ":" + seconds);

//         if (--timer < 0) {
// 					timer = duration
// 				}
// 		}, 1000).then();
// 		startBreak(breakTime)		
// }





// 	for (var i = sessionTime; i >= 1; i --) {
// 		for (var j = 60; j > 1; j --) {
// 			setInterval(function() {
// 				$('#seconds').text(j)
// 				console.log(j);
// 			}, 1000);		
// 		}
// 	$('#minutes').text(`${i}`)
// }

// 	var canvas = document.getElementById('canvas');
// 	var ctx = canvas.getContext('2d');

// renderTime = () => {
// 	var now = new Date();
// 	var today = now.toDateString();
// 	var time = now.toLocaleTimeString();
// 	var hours = now.getHours();
// 	var minutes = now.getMinutes();
// 	var seconds = now.getSeconds();



// 	ctx.arc(150, 150, 100, 0)
// }

// -1 every 1000ms and update dom  60 down to 1 and then -1 on minutes


function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};
//////
clockBreak = (breakTime) =>{
	console.log('BREAKTIME');
	var display = document.querySelector('#time'),
			timer = new CountDownTimer(breakTime * 60),
			timeObj = CountDownTimer.parse(breakTime * 60);

	format(timeObj.minutes, timeObj.seconds);
	
	timer.onTick(format);
	timer.start();

	
	function format(minutes, seconds) {
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.textContent = minutes + ':' + seconds;
	}
};

clockSession = (sessionTime, callBack) =>{
	var display = document.querySelector('#time'),
			timer = new CountDownTimer(sessionTime * 60),
			timeObj = CountDownTimer.parse(sessionTime * 60);

	format(timeObj.minutes, timeObj.seconds);
	
	timer.onTick(format);
	timer.start();

	function format(minutes, seconds) {
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.textContent = minutes + ':' + seconds;
	}
	callBack();
};



$('#start').on('click', () => {
	// var seshTime = 60 * sessionTime,
	// display = $('#time');
	// startTimer(seshTime, display);
	// CountDownTimer(sessionTime)
	clockSession(sessionTime, clockBreak)
});