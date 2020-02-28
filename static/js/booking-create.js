// Initialize all input of type time
var calendars = bulmaCalendar.attach("[type='time']", {
    type: 'time',
    showClearButton: true,
    isRange: true,
    allowSameDayRange: true,
    color: 'info',
   });

// Loop on each calendar initialized
for(var i = 0; i < calendars.length; i++) {
	// Add listener to time:selected event
	calendars[i].on('select', time => {
		console.log(time);
	});
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector("input[type='time']");
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function(timepicker) {
		console.log(timepicker.data.value());
	});
}