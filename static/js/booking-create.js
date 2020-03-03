// Initialize all input of type date
var calendars = bulmaCalendar.attach("[type='date']", {
    dateFormat: "DD MMM YYYY",
    type: 'date',
    showClearButton: true,
    showHeader: false,
    weekStart: 1,
    color: 'info',
    minDate: new Date,
    isRange: true
   });

/*    document.getElementsByClassName('input#event-event_start_datetime').val(incomingDate);
   document.getElementsByClassName('.datetimepicker-dummy-input.is-datetimepicker-range').val(incomingStartDate);
   document.getElementsByClassName('.timepicker-start .timepicker-hours .timepicker-input-number').text(incomingStartHours);
   document.getElementsByClassName('.datetimepicker-selection-start .datetimepicker-selection-hour').text(incomingStartHours + ':' + incomingStartMinutes);
   document.getElementsByClassName('.timepicker-start .timepicker-minutes .timepicker-input-number').text(incomingStartMinutes);
 */
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

// Initialize all input of type time
var timeRanges = bulmaCalendar.attach("[type='time']", {
    type: 'time',
    showClearButton: true,
    color: 'info',
    isRange: true,
    minuteSteps: 5
   });

// Loop on each calendar initialized
for(var i = 0; i < timeRanges.length; i++) {
	// Add listener to date:selected event
	timeRanges[i].on('select', time => {
		console.log(time);
	});
}

// To access to bulmaCalendar instance of an element
var timeElement = document.querySelector("input[type='time']");
if (timeElement) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	timeElement.bulmaCalendar.on('select', function(timepicker) {
		console.log(timepicker.data.value());
	});
}

var addConfig = document.querySelector('#add-config');

