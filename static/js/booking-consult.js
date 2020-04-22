function processTimings(strDates) {
    var items = strDates.split("&#39;")
    var arrOfDates = [];
    for (var i = 1; i < items.length; i += 2) {
        if ((i - 1) % 12 == 0) {
            var dates = [];
        }
        dates.push(items[i])
        if ((i + 1) % 12 == 0) {
            arrOfDates.push(dates);
        }
    }

    var dateConfigs = [];
    for (i in arrOfDates){
        var startDate = new Date(arrOfDates[i][0]);
        var endDate = new Date(arrOfDates[i][1]);
        var numDays = Math.round(Math.abs((endDate - startDate) / (24 * 60 * 60 * 1000) ) ) + 1;
        var dateConfig = [];
        var tomorrow = startDate;
        tomorrow.setDate(tomorrow.getDate() - 2);
        for (var j=0; j<numDays; ++j){
            tomorrow.setDate(tomorrow.getDate() + 1);
            var y = tomorrow.getFullYear().toString();
            var m = tomorrow.getMonth()+1;
            m = m < 10 ? '0' + m.toString() : m.toString();
            var d = tomorrow.getDate()+1;
            d = d < 10 ? '0' + d.toString() : d.toString();
            dateConfig.push(y+'-'+m+'-'+d);
        }
        dateConfigs.push(dateConfig);
    }

    var timingConfigs = [];
    for (i in arrOfDates){
        timingConfigs.push([arrOfDates[i][2], arrOfDates[i][3], arrOfDates[i][4], arrOfDates[i][5]]);
    }
    console.log(dateConfigs);
    console.log(timingConfigs);

    var allowedDates = [];
    for (i in dateConfigs){
        var last = dateConfigs[i].length-1
        var allowed = {from : dateConfigs[i][0], to : dateConfigs[i][last]}
        allowedDates.push(allowed)
    }
    return [dateConfigs, timingConfigs, allowedDates];
}

function findDate(dateConfigs, timingConfigs, date){
    for (i in dateConfigs){
        for (j in dateConfigs[i]){
            if (date==dateConfigs[i][j]) return timingConfigs[i];
        }
    }
    return -1
}

function generateTimings(timeRange) {
    var table = document.getElementById('consultation-booking');
    var tbody = document.getElementById("consultation-tbody");
    if (tbody) tbody.remove();
    var tbody = document.createElement('tbody');
    tbody.id = "consultation-tbody";
    table.appendChild(tbody);

    var event = document.getElementById("eventName");
    if(event) event.innerHTML = timeRange[3];

    var start = timeRange[0];
    var end = timeRange[1];

    var startTime = new Date('2020-03-02 ' + start);
    var endTime = new Date('2020-03-02 ' + end);
    var timeDiff = Math.round(Math.abs((endTime - startTime) / (60 * 1000))); /// in minutes

    var slotDuration = parseInt(timeRange[2].slice(0, -3));
    var slotsPerDay = timeDiff / slotDuration;

    var timings = [];
    for (var i = 0; i < slotsPerDay; ++i) {
        if (timings.length == 0) {
            var newTime = new Date(startTime.getTime());
            var h = (Math.floor(newTime.getTime() % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) + 8) % 24;
            var m = Math.floor(newTime.getTime() % (1000 * 60 * 60) / (1000 * 60));
            var ampm = h < 12 ? "am" : "pm";
            h %= 12;
            h = h == 0 ? h = '12' : h = h.toString();
            m = m < 10 ? '0' + m.toString() : m.toString();
            var time = h.toString() + ':' + m.toString() + ampm;
            timings.push(time);
        }
        var newTime = new Date(startTime.getTime() + slotDuration * 1000 * 60 * (i + 1));
        var h = (Math.floor(newTime.getTime() % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) + 8) % 24;
        var m = Math.floor(newTime.getTime() % (1000 * 60 * 60) / (1000 * 60));
        var ampm = h < 12 ? "am" : "pm";
        h %= 12;
        h = h == 0 ? h = '12' : h = h.toString();
        m = m < 10 ? '0' + m.toString() : m.toString();
        var time = h.toString() + ':' + m.toString() + ampm;
        timings.push(time);

        var newTr = document.createElement('tr');   //create a div
        var newTd = document.createElement('td');
        newTd.id = (i + 1).toString();
        newTd.className = "has-text-weight-bold has-text-centered";
        newTd.innerHTML = timings[i] + ' - ' + time;
        newTr.appendChild(newTd);
        var newTd2 = document.createElement('td');
        newTd2.setAttribute("value", timings[i] + ' - ' + time);
        newTr.appendChild(newTd2);
        tbody.appendChild(newTr);
    }
}

function processCollison(collison){
    if (collison == "" || collison == "False") return false;
    items = collison.split("&#39;")
    var data = [];
    for (var i = 1; i < items.length; i += 2) data.push(items[i]);
    if (data[0]=="you") alert("Unable to book slot on " + data[1] + " from " + data[2] + " to " + data[3] + ". You already have booked another slot elsewhere.");
    else alert("Unable to book slot on " + data[1] + " from " + data[2] + " to " + data[3] + ". The creator has booked another slot elsewhere.");
    return true;
}

function formatSlots(strBookedSlots){
    items = strBookedSlots.split("&#39;")
    var data = [];
    for (var i = 1; i < items.length; i += 2) data.push(items[i]);
    var kvp = {}; // key-value pairs of dates: slot timings
    for (var i = 0; i < data.length; i += 2){
        if (!(data[i] in kvp)) kvp[data[i]] = []; // if does not exist, create empty array for each date
        // --- "08:00 AM" --> "8:00am"
        var arr = data[i+1].split(':');
        var h = parseInt(arr[0]);
        var m = arr[1];
        var tag = h>=12 ? "pm" : "am";
        if (h%12==0) h=12;
        else h %= 12;

        data[i + 1] = h.toString()+':'+m+tag;
        
        kvp[data[i]].push(data[i + 1]); // append to array
    }
    return kvp;
}

function displayDates(arrOfDates){
    datesToDisplay = "Available dates: "
    for (i in arrOfDates){
        var last = arrOfDates[i].length - 1;
        if (arrOfDates[i][0]==arrOfDates[i][last]) datesToDisplay+=arrOfDates[i][0];
        else datesToDisplay+=arrOfDates[i][0] + ' to ' + arrOfDates[i][last];

        if (i+1!=arrOfDates.length) datesToDisplay+=', ';
        else datesToDisplay+='.';
    }
    document.getElementById("dates-to-display").innerHTML = datesToDisplay;
}