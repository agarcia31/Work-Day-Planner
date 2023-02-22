//Date
let todayDate = moment().format('MM-DD-YYYY');
$("#currentDay").html(todayDate);

$(function() {
    // Add event listener to all elements with class "saveBtn"
    $(".saveBtn").on("click", function() {
      const description = $(this).siblings(".description").val().trim();
      const timeBlockId = $(this).closest(".time-block").attr("id");
      localStorage.setItem(timeBlockId, description);
    });
  
    // Update time block classes based on current time
    function updateTimeBlocks() {
      const currentHour = moment().hour();
      $(".time-block").each(function() {
        const timeBlockHour = parseInt($(this).attr("id").split("hour")[1]);
        $(this).removeClass("past present future");
        if (timeBlockHour < currentHour) {
          $(this).addClass("past");
        } else if (timeBlockHour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Load saved items from local storage
  // Array of hour IDs to iterate over
const hours = ["hour8", "hour9", "hour10", "hour11", "hour12", "hour13", "hour14", "hour15", "hour16", "hour17"];

// Loop over the hours and set the textarea values from local storage
hours.forEach(hour => {
  $(`#${hour} .description`).val(localStorage.getItem(hour));
});

  
    // Call updateTimeBlocks on page load and every minute thereafter
    updateTimeBlocks();
    setInterval(updateTimeBlocks, 60000);
  });
  