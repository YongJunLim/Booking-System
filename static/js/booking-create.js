let pickerDateRange = flatpickr("#dateRange", {
    mode: "range",
    minDate: "today",
    weekNumbers: true,
    altInput: true,
    altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
    dateFormat: "Y-m-d"
});
let pickerStart = flatpickr("#startTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    defaultDate: "12:00"
});
let pickerEnd = flatpickr("#endTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    minTime: "00:00",
    defaultDate: "23:00"
});

function timeConvertor(time) {
    var PM = time.match('PM') ? true : false
    time = time.split(':')
    var min = time[1].slice(0,2)
    if (PM && time[0] != 12) {
        var hour = 12 + parseInt(time[0],10)
    } else {
        var hour = time[0]
    }
    var time = hour + ':' + min
    return time
}

function setMinEnd() {
    if (selectStart.value != "") {
        var minEnd = timeConvertor(selectStart.value);
        if (selectDuration.value != "") {
            var minEnd = timeConvertor(selectStart.value);
            var mins = parseInt(selectDuration.value) + parseInt(minEnd.slice(3,5))
            if (mins >= 60) {
                var hrs = (mins - (mins % 60)) / 60
                var minEnd = String(parseInt(minEnd.slice(0,3)) + hrs) + String(mins - 60)
            } else {
                var minEnd = minEnd.slice(0,3) + String(mins)
                console.log(minEnd)
            }
        }
        pickerEnd.set('minTime', minEnd);
    }
}

var selectDuration = document.getElementById('slotDuration')
var selectStart = document.getElementById('startTime')
setMinEnd()
selectStart.addEventListener('change', function(event) {
    setMinEnd()
});
selectDuration.addEventListener('click', function(event) {
    setMinEnd()
});

var addConfigHTML = `
<div class="field">
    <label class="label">Custom Date</label>
    <div class="control">
        <input class="input customDate" type="text">
    </div>
</div>
<div class="field">
    <label class="label">Start Time</label>
    <div class="control">
        <input class="input customStartTime" type="text">
    </div>
</div>
<div class="field">
    <label class="label">End Time</label>
    <div class="control">
        <input class="input customEndTime" type="text">
    </div>
</div>
<div class="field">
    <label class="label">Duration of Slots</label>
    <div class="select">
        <select>
            <option value="">Select Duration</option>
            <option value="5">5min</option>
            <option value="10">10min</option>
            <option value="15">15min</option>
            <option value="20">20min</option>
            <option value="30">30min</option>
        </select>
    </div>
</div>
`;

var addConfig = document.querySelector('.button.is-primary');

addConfig.addEventListener('click', function(event) {
    document.getElementById("addConfigField").insertAdjacentHTML("afterend", addConfigHTML);
    let pickerCustomDateRange =  flatpickr(".customDate", {
        weekNumbers: true,
        altInput: true,
        altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
        dateFormat: "Y-m-d"
    });
    let pickerCustomStart = flatpickr(".customStartTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        defaultDate: "12:00"
    });
    let pickerCustomEnd = flatpickr(".customEndTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        minTime: "00:00",
        defaultDate: "23:00"
    });
});

var createBooking = document.querySelector('.button.is-link');
var customBookingData = []

createBooking.addEventListener('click', function(event) {
    createBooking.classList.add('is-loading');
    customBookingData.push(document.getElementById('eventName').value);
    var details = []
    details.push(document.getElementById('dateRange').value);
    details.push(document.getElementById('startTime').value);
    details.push(document.getElementById('endTime').value);
    details.push(document.getElementById('slotDuration').selectedOptions[0].label);
    customBookingData.push(details);
    var customLength = document.getElementsByClassName('customDate flatpickr-input').length - 1;
    for (let i = 0; i <= customLength; i++) {
        var addConfigArray = [];
        addConfigArray.push(document.getElementsByClassName('customDate flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customStartTime flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customEndTime flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByTagName('select')[i+1].selectedOptions[0].label);
        customBookingData.push(addConfigArray);
    };
    console.log(customBookingData);
    document.querySelector('.button.is-link').value = JSON.stringify(customBookingData);
});