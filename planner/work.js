$(document).ready(function () {
    // Variables declaration
    let $currentDayEl = $("#currentDay");
    $currentDayEl.text(moment().format("dddd, MMMM Do YYYY, hh:mm:ss a"));
    let containerEl = $(".container");
    let hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    let hoursDisplay = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "12AM"];
    let currentHour = parseInt(moment().format("HH"));
    console.log(currentHour);

    function updateTimeBlocks() {
        currentHour = parseInt(moment().format("HH"));
        $(".row").each(function () {
            const hour = $(this).find("button").attr("data-hour");
            let cssClass = "";
            if (hour > currentHour) {
                cssClass = "future";
            } else if (hour < currentHour) {
                cssClass = "past";
            } else {
                cssClass = "present";
            }
            $(this).find("textarea").removeClass("past present future").addClass(cssClass);
        });
    }

    // Loop to create the HTML for the planner
    for (let i = 0; i < hoursArray.length; i++) {
        const hour = hoursArray[i];
        const hourDisplay = hoursDisplay[i];
        let cssClass = "";
        if (hour > currentHour) {
            cssClass = "future";
        } else if (hour < currentHour) {
            cssClass = "past";
        } else {
            cssClass = "present";
            console.log(hour);
            console.log(hourDisplay);
            console.log(cssClass);
        }
        // Get the Local Storage if already set
        let getLocalStorage = localStorage.getItem(hour) || "";
        let row = `<div class="row">
        <div class="col-2 time-block hour">${hourDisplay}</div>
        <textarea class="col-8 ${cssClass}">${getLocalStorage}</textarea>
        <button class="col-2 saveBtn" data-hour="${hour}">☕</button>
      </div>`;
        containerEl.append(row);
    }

    // Function to update the current day and time
    function tick() {
        var now = moment().format("dddd, MMMM Do YYYY, hh:mm:ss a");
        $currentDayEl.text(now);
        updateTimeBlocks();
    }
    setInterval(tick, 1000);

    // Event listener onClick to save and set the Local Storage item
    $("button").on("click", (event) => {
        let key = $(event.target).attr("data-hour");
        let value = $(event.target).siblings("textarea").val();
        localStorage.setItem(key, value);
    });

    updateTimeBlocks();
});
