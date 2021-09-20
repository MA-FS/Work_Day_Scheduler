// Define HTML elements
const currentDayEl = $('#currentDay')
const hourEL = $('.hour')
const subjectEl = $('.subject')
const rowEL = $('.row')



// Display the current day with Moment.js
currentDayEl.text(moment().format("dddd, MMMM Do"))

// Each loop for every .hour class to determine whether or not it is past/present/future
// Add classes depending on current time
hourEL.each(function(e, value) {
    var timeBlocks = moment($(value).text(), 'hhA').hours()
    var currentTime = moment().hours()

    if(timeBlocks > currentTime) {
        $(this).next().addClass('future'),
        $(this).next().children().addClass('future')
    } else if(timeBlocks < currentTime) {
        $(this).next().addClass('past'),
        $(this).next().children().addClass('past')
    } else {
        $(this).next().addClass('present'),
        $(this).next().children().addClass('present')
    }
});

// Each loop for every .subject class to see if a local storage key exists according to time
// Ensure each event is populated if it exists in local storage
subjectEl.each(function(e, value) {
    var timeStamp = $(value).parent().prev().text()
    var savedText = localStorage.getItem(timeStamp)
    
    if(timeStamp in localStorage) {
        $(value).text(savedText)
    } 
})

// Set save button event listeners
// Select the previous sibling's text area and save to local storage according to time
rowEL.on('click', '.saveBtn', function (event) {
    var saveBtn = $(event.target)
    var timeText = saveBtn.parent().children().first().text()
    var scheduleText = saveBtn.prev().find('textarea').val()

    localStorage.setItem(timeText, scheduleText)
    // Change icon to indicate save function
    saveBtn.addClass("fas")

    setTimeout(() => {
        saveBtn.removeClass("fas")        
    }, 500);
})

// Clear local storage and refresh the page when delete button is pressed
rowEL.on('click', '.deleteBtn', function () {

    localStorage.clear()
    location.reload()

})

