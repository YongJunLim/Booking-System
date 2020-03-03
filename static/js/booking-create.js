flatpickr("#dateRange", {
    mode: "range",
    minDate: "today",
    weekNumbers: true,
    altInput: true,
    altFormat: "F j, Y", // https://flatpickr.js.org/formatting/
    dateFormat: "Y-m-d"
});

flatpickr(".startTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
});

flatpickr(".endTime", {
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
        minDate: "today",
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


