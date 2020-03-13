var update = document.querySelector('button.is-link');
var table = document.getElementById('consultation-booking');
var dateConsult = document.getElementById('dateConsult');
var testArr = [];
var attached = false;

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 6);
};


// --- Code for checking which dates are booked ---

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type == "attributes") {
            // configs = [dateConfigs, timingConfigs], bookedSlots, blocked are global variables from booking-consult.html
            timeRange = findDate(configs[0], configs[1], dateConsult.value);
            if(dateConsult.value!=''){
                if(timeRange==-1){
                    alert("Date not within range!");
                    var tbody = document.getElementById("consultation-tbody");
                    if (tbody) tbody.remove();
                    var submit = document.getElementsByClassName("button is-link")[0];
                    if (submit) submit.style="display: none;";
                }
                else{
                    var submit = document.getElementsByClassName("button is-link")[0];
                    if (submit) submit.style = "";
                    generateTimings(timeRange);
                    // reset all slots
                    for (var i = 0, row; row = table.rows[i]; i++) table.rows[i].cells[1].className = '';

                    // set slots to booked or blocked
                    var bookedTimings = bookedSlots[dateConsult.value];
                    var blockedTimings = blocked[dateConsult.value];
                    for (var i = 0, row; row = table.rows[i]; i++) {
                        for (j in bookedTimings) {
                            if (bookedTimings[j] == table.rows[i].cells[0].textContent.split(' - ')[0])
                                table.rows[i].cells[1].className = 'is-booked';
                        }
                        for (j in blockedTimings) {
                            if (blockedTimings[j] == table.rows[i].cells[0].textContent.split(' - ')[0])
                                table.rows[i].cells[1].className = 'is-blocked';
                        }
                    }

                    for (var i = 0, row; row = table.rows[i]; i++) {
                        // iterate through rows
                        // rows would be accessed using the "row" variable assigned in the for loop
                        for (var j = 1, col; col = row.cells[j]; j++) { // i = 1 instead of 0 to not count the first col aka timings
                            // iterate through columns
                            // columns would be accessed using the "col" variable assigned in the for loop
                            table.rows[i].cells[j].addEventListener('click', function (event) {
                                bookSlot(this);
                            })
                        }
                    }
                    // End of else block
                }
            }
            
        }
    });
});

observer.observe(dateConsult, {
    attributes: true //configure it to listen to attribute changes
});

// --- Code for updating bookings ---

update.addEventListener('click', function(event) {
    var newBookings = [];
    var cancelledBookings = [];
    update.classList.add('is-loading');
    newBookings.push(dateConsult.value);
    cancelledBookings.push(dateConsult.value);
    for (var i = 0, row; row = table.rows[i]; i++) {
    // iterate through rows
    // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].cells[1].className == 'is-selected') {
            newBookings.push(table.rows[i].cells[0].textContent.split(" - "));
        }
        else if (table.rows[i].cells[1].className == 'is-cancelled') {
            cancelledBookings.push(table.rows[i].cells[0].textContent.split(" - "));
        }
    }
    document.getElementsByName("newBookings")[0].value = JSON.stringify(newBookings);
    document.getElementsByName("cancelledBookings")[0].value = JSON.stringify(cancelledBookings);
    //alert(JSON.stringify(selects));
});

function bookSlot(tableCell) {
    for (var i = 0; i < table.rows.length; i++) {
        // if other cells in same col except itself is booked - so that can still cancel a booked slot
        if (tableCell.className == 'is-booked') {
            tableCell.classList.replace('is-booked', 'is-cancelled');
            return;
        } else if (tableCell.className == 'is-cancelled') {
            tableCell.classList.replace('is-cancelled', 'is-booked');
            return;
        }
    }
    if (tableCell.classList.contains('is-blocked')){
        alert("Slot already booked.");
    }
    else {
        tableCell.classList.toggle('is-selected');
    }
}

// --- Set min and max date for date picker ---

flatpickr("#dateConsult", {
    mode: "single",
    weekNumbers: true,
    altInput: true,
    altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
    dateFormat: "Y-m-d"
});

/*
function bookConflict(tableCell) {
    alert("Cannot book multiple slots at once.");
}
*/