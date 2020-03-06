flatpickr("#dateRange", {
    mode: "range",
    minDate: "today",
    weekNumbers: true,
    altInput: true,
    altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
    dateFormat: "Y-m-d"
});

flatpickr("#startTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
});

flatpickr("#endTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
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
    flatpickr(".customDate", {
        weekNumbers: true,
        altInput: true,
        altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
        dateFormat: "Y-m-d"
    });

    flatpickr(".customStartTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
    });

    flatpickr(".customEndTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
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
    details.push(document.getElementsByTagName('select')[0].selectedOptions[0].label);
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