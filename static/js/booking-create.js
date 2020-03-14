var selectName = document.getElementById('eventName')
var selectDate = document.getElementById('dateRange')
var selectStart = document.getElementById('startTime')
var selectEnd = document.getElementById('endTime')
var selectDuration = document.getElementById('slotDuration')
var createBooking = document.getElementsByClassName('button is-link')[0]
var addConfig = document.querySelector('.button.is-primary');

var customBookingData = []

let pickerDateRange = flatpickr("#dateRange", {
    mode: "range",
    minDate: "today",
    weekNumbers: true,
    altInput: true,
    altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
    dateFormat: "Y-m-d",
    onReady: function() {
        validate()
        console.log('working')
    },
    onChange: function() {
        validate()
        console.log('working')
    }
});
let pickerStart = flatpickr("#startTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    defaultDate: "12:00",
    onReady: function() {
        validate()
        console.log('working')
    },
    onChange: function() {
        validate()
        console.log('working')
    }
});
let pickerEnd = flatpickr("#endTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    minTime: "00:00",
    defaultDate: "23:00",
    onReady: function() {
        validate()
        console.log('working')
    },
    onChange: function() {
        validate()
        console.log('working')
    }
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

setEnd()
selectStart.addEventListener('change', function() {
    setEnd()
    validate()
});
selectDuration.addEventListener('click', function() {
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

selectName.addEventListener('click', function() {
    validate()
});
selectName.addEventListener('change', function() {
    validate()
});

var addConfigHTML = `
<div class="field">
    <label class="label">Custom Date Range</label>
    <div class="control">
        <input id="customDate" class="input customDate" type="text">
    </div>
</div>
<div class="field">
    <label class="label">Start Time</label>
    <div class="control">
        <input id="customStartTime" class="input customStartTime" type="text">
    </div>
</div>
<div class="field">
    <label class="label">End Time</label>
    <div class="control">
        <input id="customEndTime" class="input customEndTime" type="text">
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

addConfig.addEventListener('click', function() {
    document.getElementById("addConfigField").insertAdjacentHTML("afterend", addConfigHTML);
    // This particular customLength is counted b4 adding new fields
    var customLength = document.getElementsByClassName('customDate flatpickr-input').length
    var customDateIndex = "customDate" + String(customLength)
    var customStartTimeIndex = "customStartTime" + String(customLength)
    var customEndTimeIndex = "customEndTime" + String(customLength)
    if (pickerDateRange.selectedDates.length != 0) {
        var selectStartDate = pickerDateRange.selectedDates[0]
        var selectStartDate = selectStartDate.getFullYear() + '-'
        + String(parseInt(selectStartDate.getMonth()) + 1) + '-'
        + selectStartDate.getDate()
        var selectEndDate = pickerDateRange.selectedDates[pickerDateRange.selectedDates.length - 1]
        var selectEndDate = selectEndDate.getFullYear() + '-'
        + String(parseInt(selectEndDate.getMonth()) + 1) + '-'
        + selectEndDate.getDate()
    }

    document.getElementById("customDate").setAttribute("id", customDateIndex);
    document.getElementById("customStartTime").setAttribute("id", customStartTimeIndex);
    document.getElementById("customEndTime").setAttribute("id", customEndTimeIndex);

    flatpickr("#"+customDateIndex, {
        mode: "range",
        minDate: "today",
        weekNumbers: true,
        altInput: true,
        altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
        dateFormat: "Y-m-d",
        disable: [{
            from: selectStartDate,
            to: selectEndDate
        }],
        onReady: function() {
            validate()
            console.log('working')
        },
        onChange: function() {
            validate()
            console.log('working')
        }
    });
    flatpickr("#"+customStartTimeIndex, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        defaultDate: "12:00",
        onReady: function() {
            validate()
            console.log('working')
        },
        onChange: function() {
            validate()
            console.log('working')
        }
    });
    flatpickr("#"+customEndTimeIndex, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        minTime: "00:00",
        defaultDate: "23:00",
        onReady: function() {
            validate()
            console.log('working')
        },
        onChange: function() {
            validate()
            console.log('working')
        }
    });

    var newSelectCustomDuration = document.getElementsByClassName('customSlotDuration')[0]
    var customDurationIndex = "customDuration" + String(document.getElementsByClassName('customSlotDuration').length - 1)
    newSelectCustomDuration.setAttribute("id", customDurationIndex)
    setCustomEnd(newSelectCustomDuration.id)
    newSelectCustomDuration.addEventListener('click', function() {
        setCustomEnd(newSelectCustomDuration.id)
        validate()
    });
    var newSelectCustomStart = document.getElementsByClassName('customStartTime')[0]
    newSelectCustomStart.addEventListener('change', function() {
        setCustomEnd(newSelectCustomStart.id)
        validate()
    });
});

function setCustomEnd(id) {
    var id = id.replace("customDuration","")
    var selectCustomStart = document.getElementById('customStartTime'+id)
    var selectCustomDuration = document.getElementById('customDuration'+id)
    var selectCustomEnd = document.getElementById('customEndTime'+id)
    var minCustomEnd = timeConvertor(selectCustomStart.value);
    if (selectCustomDuration.value != "") {
        var customMins = parseInt(selectCustomDuration.value) + parseInt(minCustomEnd.slice(3,5))
        if (customMins >= 60) {
            var customHrs = (customMins - (customMins % 60)) / 60
            var minCustomEnd = String(parseInt(minCustomEnd.split(':')[0]) + customHrs) + ':' + String(customMins - 60)
        } else {
            var minCustomEnd = minCustomEnd.split(':')[0] + ':' + String(customMins)
        }
    }
    var pickerCustomEnd = document.querySelector("#customEndTime"+id)._flatpickr
    pickerCustomEnd.set('minTime', minCustomEnd);
    if (timeConvertor(selectCustomStart.value) > timeConvertor(selectCustomEnd.value) || minCustomEnd > timeConvertor(selectCustomEnd.value)) {
        pickerCustomEnd.setDate(minCustomEnd);
    }
}

function validate() {
    if (selectName.value == "" || selectDate.value == "" ||
    selectStart.value == "" || selectEnd.value  == "" ||
    selectDuration.value == "") {
        createBooking.disabled = true;
        return false
    }
    var customLength = document.getElementsByClassName('customDate flatpickr-input').length
    for (let i = 0; i < customLength; i++) {
        if (document.getElementsByClassName('customDate flatpickr-input')[i].value == "" ||
        document.getElementsByClassName('customStartTime flatpickr-input')[i].value == "" ||
        document.getElementsByClassName('customEndTime flatpickr-input')[i].value == "" ||
        document.getElementsByClassName('customSlotDuration')[i].selectedOptions[0].value == "") {
            createBooking.disabled = true;
            return false
        }
    };
    createBooking.disabled = false;
    return true
}

createBooking.addEventListener('click', function() {
    createBooking.classList.add('is-loading');
    customBookingData.push(selectName.value);
    var details = []
    if (selectDate.value.length == 10) {
        details.push(selectDate.value + " to " + selectDate.value);
    } else {
        details.push(selectDate.value);
    }
    details.push(selectStart.value);
    details.push(selectEnd.value);
    details.push(selectDuration.selectedOptions[0].label);
    customBookingData.push(details);
    var customLength = document.getElementsByClassName('customDate flatpickr-input').length
    for (let i = 0; i < customLength; i++) {
        var addConfigArray = [];
        if (document.getElementsByClassName('customDate flatpickr-input')[i].value.length == 10) {
            addConfigArray.push(document.getElementsByClassName('customDate flatpickr-input')[i].value + " to "
            + document.getElementsByClassName('customDate flatpickr-input')[i].value);
        } else {
            addConfigArray.push(document.getElementsByClassName('customDate flatpickr-input')[i].value);
        }
        addConfigArray.push(document.getElementsByClassName('customStartTime flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customEndTime flatpickr-input')[i].value);
        addConfigArray.push(document.getElementsByClassName('customSlotDuration')[i].selectedOptions[0].label);
        customBookingData.push(addConfigArray);
    };
    console.log(customBookingData);
    createBooking.value = JSON.stringify(customBookingData);
});