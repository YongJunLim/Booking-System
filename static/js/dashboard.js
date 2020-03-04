var currHours = new Date();
var update = document.querySelector('button.is-link');
var table = document.getElementById('consultation-booking');
var selects = [];


var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 6);
};

update.addEventListener('click', function(event) {
    update.classList.add('is-loading');
    for (var i = 0, row; row = table.rows[i]; i++) {
    // iterate through rows
    // rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 1, col; col = row.cells[j]; j++) { // i = 1 instead of 0 to not count the first col aka timings
        // iterate through columns
        // columns would be accessed using the "col" variable assigned in the for loop
            if (table.rows[i].cells[j].className == 'is-selected' || table.rows[i].cells[j].className == 'is-booked') {
                selects.push(table.rows[i].cells[0].querySelector("#teacher").textContent)
                selects.push(table.rows[0].cells[j].id)
            }
        }
    }
    document.querySelector('.button.is-link').value = selects
});

for (var i = 0, row; row = table.rows[i]; i++) {
    // iterate through rows
    // rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 1, col; col = row.cells[j]; j++) { // i = 1 instead of 0 to not count the first col aka timings
        // iterate through columns
        // columns would be accessed using the "col" variable assigned in the for loop
        if (table.rows[i].cells[j].classList.contains('is-blocked')) {
            table.rows[i].cells[j].addEventListener('click', function (event) {
                alrBooked(this)
            })
        } else {
            table.rows[i].cells[j].addEventListener('click', function (event) {
                bookSlot(this)
            })
        }
    }
}

function bookSlot(tableCell) {
    for (var i = 0; i < table.rows.length; i++) {
        // if other cells in same col except itself is booked - so that can still cancel a booked slot
        if (tableCell.className == 'is-booked') {
            tableCell.classList.replace('is-booked','is-cancelled');
            return;
        } else if (tableCell.className == 'is-cancelled') {
            tableCell.classList.replace('is-cancelled','is-booked');
            return;
        }
    }
    tableCell.classList.toggle('is-selected');
}

function alrBooked(tableCell) {
    alert("Slot already booked.");
}

/*
function bookConflict(tableCell) {
    alert("Cannot book multiple slots at once.");
}
*/