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

var selectElem = document.querySelector("select");

selectElem.addEventListener('change', function() {
    var selectTeachIndex = selectElem.selectedIndex;
    var newSelect = document.querySelector("#Option"+selectTeachIndex);
    var oldSelect = document.getElementsByClassName("shown")[0];
    if (oldSelect != newSelect) { // to prevent accidental hiding of all tables
        newSelect.classList.replace("hidden","shown");
        oldSelect.classList.replace("shown","hidden");
    };
});