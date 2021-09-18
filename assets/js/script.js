// Define HTML elements
var currentDayEl = $('#currentDay')



// Display the current day with Moment.js
currentDayEl.text(moment().format("dddd, MMMM Do"))
