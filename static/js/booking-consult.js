// Initialize all input of type date
var calendars = bulmaCalendar.attach("[type='date']", {
    dateFormat: "DD MMM YYYY",
    type: 'date',
    showClearButton: true,
    showHeader: false,
    disabledWeekDays: '0,6',
    weekStart: 1,
    color: 'info',
    minDate: new Date,
   });

// Loop on each calendar initialized
for(var i = 0; i < calendars.length; i++) {
	// Add listener to date:selected event
	calendars[i].on('select', date => {
		console.log(date);
	});
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector("input[type='date']");
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function(datepicker) {
		console.log(datepicker.data.value());
	});
}