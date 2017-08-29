	
$(document).ready(function() {
	const buzzer = $('#buzzer')[0]
	var sessionTime = 5;
	var breakTime = 5;



	$('#start').on('click', () => {
		var count = sessionTime;
		var breakCount = breakTime;	
		var counter = setInterval(timer, 1000);
			
		function timer() {
			$('#heading').show()
			$('#heading').text('Session');
			$('h3').addClass('session-color')
			count = count - 1			
			$('#time').text(`${count}`)
			$('#start, #s-min, #s-plus, #b-min, #b-plus, #reset').hide()
			
			if (count == 0) {
				clearInterval(counter)
				// buzzer.play();
				$('#heading').empty()
				$('h3').removeClass('session-color')
			
				
				var startBreak = setInterval(breakTimer,1000)		
			}

			function breakTimer() {
				$('#heading').show();		
				$('#heading').text('Break')
				$('h3').addClass('break-color')
				$('button').addClass('break-color')
				breakCount = breakCount - 1;
				$('#time').text(breakCount)				
				if (breakCount === 0) {
					clearInterval(startBreak)
					$('#reset').show();
				// buzzer.play();
				$('#time').hide();					
				}
			}
		}
	})

	$('#reset').on('click', () => {
		sessionTime = 5;
		breakTime = 5
		updateSession();
		updateBreak();
		updateClock();
		$('#time').show();	
		$('#heading').empty();
		$('#heading').hide();
		$('h3, button').removeClass('session-color break-color')
		$('#start, #s-min, #s-plus, #b-min, #b-plus, #reset').show()
	})

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
})

