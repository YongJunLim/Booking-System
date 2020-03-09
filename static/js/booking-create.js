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
    if (time == "12:00 AM") {
        time = "00:00"
    } else {
        var PM = time.match('PM') ? true : false
        time = time.split(':')
        var min = time[1].slice(0,2)
        if (PM && time[0] != 12) {
            var hour = 12 + parseInt(time[0],10)
        } else {
            var hour = time[0]
        }
        var time = hour + ':' + min
    }
    return time
}

var selectName = document.getElementById('eventName')
var selectDate = document.getElementById('dateRange')
var selectStart = document.getElementById('startTime')
var selectEnd = document.getElementById('endTime')
var selectDuration = document.getElementById('slotDuration')

setEnd()
selectStart.addEventListener('change', function(event) {
    setEnd()
    validate()
});
selectDuration.addEventListener('click', function(event) {
    setEnd()
    validate()
});

function setEnd() {
    var minEnd = timeConvertor(selectStart.value);
    if (selectDuration.value != "") {
        var mins = parseInt(selectDuration.value) + parseInt(minEnd.slice(3,5))
        if (mins >= 60) {
            var hrs = (mins - (mins % 60)) / 60
            var minEnd = String(parseInt(minEnd.split(':')[0]) + hrs) + ':' + String(mins - 60)
        } else {
            var minEnd = minEnd.split(':')[0] + ':' + String(mins)
        }
    }
    pickerEnd.set('minTime', minEnd);
    if (timeConvertor(selectStart.value) > timeConvertor(selectEnd.value) || minEnd > timeConvertor(selectEnd.value)) {
        pickerEnd.setDate(minEnd);
    }
}

selectName.addEventListener('change', function(event) {
    validate()
});
selectDate.addEventListener('change', function(event) {
    validate()
});
selectEnd.addEventListener('change', function(event) {
    validate()
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
        <select class="customSlotDuration">
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
var pickerCustomDates = [];
var pickerCustomStarts = [];
var pickerCustomEnds = [];
addConfig.addEventListener('click', function(event) {
    document.getElementById("addConfigField").insertAdjacentHTML("afterend", addConfigHTML);
    let pickerCustomDates =  flatpickr(".customDate", {
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
    pickerCustomDates.push(pickerCustomDate);
    pickerCustomStarts.push(pickerCustomStart);
    pickerCustomEnds.push(pickerCustomEnd);
    console.log(document.getElementsByClassName('customStartTime'));
    // checkTiming();
});

var createBooking = document.querySelector('.button.is-link');
var customBookingData = []
function validate() {
    if (selectName.value == "" || selectDate.value == "" ||
    selectStart.value == "" || selectEnd.value  == "" ||
    selectDuration.value == "") {
        return false
    }
    var customLength = document.getElementsByClassName('customDate flatpickr-input').length - 1;
    for (let i = 0; i <= customLength; i++) {
        if (document.getElementsByClassName('customDate flatpickr-input')[i].value == "" ||
        document.getElementsByClassName('customStartTime flatpickr-input')[i].value == "" ||
        document.getElementsByClassName('customEndTime flatpickr-input')[i].value == "" ||
        document.getElementsByClassName('customSlotDuration')[0].selectedOptions[0].value == "") {
            return false
        }
    };
    createBooking.disabled = false;
    return true
}

createBooking.addEventListener('click', function(event) {
    createBooking.classList.add('is-loading');
    customBookingData.push(selectName.value);
    var details = []
    details.push(selectDate.value);
    details.push(selectStart.value);
    details.push(selectEnd.value);
    details.push(selectDuration.selectedOptions[0].label);
    customBookingData.push(details);
    for (let i = 0; i <= customLength; i++) {
        var addConfigArray = [];
        addConfigArray.push(document.getElementsByClassName('customDate flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customStartTime flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customEndTime flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customSlotDuration')[0].selectedOptions[0].label);
        customBookingData.push(addConfigArray);
    };
    console.log(customBookingData);
    createBooking.value = JSON.stringify(customBookingData);
});

/* function checkTiming() {
    var selectCustomDurations = document.getElementsByClassName('customSlotDuration');
    var selectCustomStarts = document.getElementsByClassName('customStartTime');
    setCustomMinEnd()
    for (var i = 0; i <= selectCustomDurations.length - 1; i++) {
        selectCustomDurations[i].addEventListener('change', function(event) {
            console.log(i)
            setCustomMinEnd(i)
        });
        selectCustomStarts[i].addEventListener('click', function(event) {
            setCustomMinEnd(i)
        });
    }
}

function setCustomMinEnd(i) {
    console.log(i)
    if (selectCustomStarts[i].value != "") {
        var minCustomEnd = timeConvertor(selectCustomStarts[i].value);
        if (selectCustomDurations[i].value != "") {
            var minCustomEnd = timeConvertor(selectCustomStarts[i].value);
            var customMins = parseInt(selectCustomDurations[i].value) + parseInt(minCustomEnd.slice(3,5))
            if (customMins >= 60) {
                var customHrs = (customMins - (customMins % 60)) / 60
                var minCustomEnd = String(parseInt(minCustomEnd.slice(0,3)) + customHrs) + String(customMins - 60)
            } else {
                var minCustomEnd = minCustomEnd.slice(0,3) + String(customMins)
                console.log(minCustomEnd)
            }
        }
        pickerCustomEnds[i].set('minTime', minCustomEnd);
    }
} */