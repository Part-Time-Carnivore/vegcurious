// global variables
day = 24*60*60*1000;
today = new Date();
vegDays = [];

// set previous date function
function getPrevDate(currentDate) {
var prevDate = $('select:first-of-type').attr('id');
// if no days added yet set prev to current
if (prevDate == null) prevDate = currentDate;
var prevDateFull = new Date(prevDate);
return prevDateFull;
}

// load days function
function loadDays(date, count) {
$('main')
    .prepend('<label for="' + date + '"><time>' + date + '</time> <select id="' + date + '" multiple="multiple"><option value="" disabled selected style="display: none;">Add veg</option></select> <i>' + count + '</i></label>');
}

// add missing days function
function missingDays(prevDateFull) {
var dateFull = new Date(prevDateFull.getTime() + day);
var date = dateFull.toISOString().split('T')[0];
var count = "0";
loadDays(date, count);
return dateFull;
}

// loop through days function
function loopDays() {
vegDays.forEach(function(d) {
    var currentDate = d.date;
    var currentDateFull = new Date(currentDate);
    var prevDateFull = getPrevDate(currentDate);
    // check if there's a gap between days
    while (currentDateFull - prevDateFull > day) {
    prevDateFull = missingDays(prevDateFull);
    }
    // generate current day
    var date = currentDate;
    var count = d.veg.length;
    loadDays(date, count);
});
}