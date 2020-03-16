var table = document.getElementById('consultation-booking');

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

function bookSlot(tableCell) {
    for (var i = 0; i < table.rows.length; i++) {
        // if other cells in same col except itself is booked - so that can still cancel a booked slot
        if (tableCell.className == 'is-booked') {
            tableCell.classList.remove('is-booked');
            tableCell.classList.add('is-cancelled')
            return;
        } else if (tableCell.className == 'is-cancelled') {
            tableCell.classList.remove('is-cancelled');
            tableCell.classList.add('is-booked')
            return;
        }
    }
    if (tableCell.classList.contains('is-blocked')) {
        tableCell.classList.add('is-blocked-selected');
        setTimeout(function () {
            tableCell.offsetHeight;
            tableCell.classList.remove('is-blocked-selected')
        },300)
    }
    else {
        tableCell.classList.toggle('is-selected');
    }
}
