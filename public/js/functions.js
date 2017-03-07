// variables
day = 24*60*60*1000;
today = new Date();
stuffType = '';
stuffLog = [];
totalDays = 0;
counts = [];
totalStuff = 0;

// get stuffLog from localstorage
function getStuffLog() {
  switch(stuffType) {
    case 'veg':
      if (window.localStorage && localStorage.vegLog) {
        stuffLog = JSON.parse(localStorage['vegLog']);
      }
      break;
    default:
      console.log('stuffType "' + stuffType + '" not available');
  }
}

// update localstorage
function storeStuffLog() {
  switch(stuffType) {
    case 'veg':
      if (window.localStorage) {
        localStorage.setItem('vegLog', JSON.stringify(stuffLog));
      }
      break;
    default:
      console.log('stuffType "' + stuffType + '" not available');
  }
}

// set previous date function
function getPrevDate(currentDate) {
  var prevDate = $('select:first-of-type').attr('id');
  // if no days added yet set prev to current
  if (prevDate == null) prevDate = currentDate;
  var prevDateFull = new Date(prevDate);
  return prevDateFull;
}

// load days function
function loadDay(date, count) {
  $('main').prepend('<label for="' + date + '"><time>' + date + '</time> <select id="' + date + '" multiple="multiple"><option value="" disabled selected style="display: none;">+</option></select> <i>' + count + '</i></label>');
  counts.push(count);
  totalDays = totalDays + 1;
}

// add missing days function
function missingDays(prevDateFull) {
  var dateFull = new Date(prevDateFull.getTime() + day);
  var date = dateFull.toISOString().split('T')[0];
  var count = 0;
  loadDay(date, count);
  return dateFull;
}

// loop through days function
function loopDays() {
  stuffLog.forEach(function(d) {
    var currentDate = d.date;
    var currentDateFull = new Date(currentDate);
    var prevDateFull = getPrevDate(currentDate);
    // check if there's a gap between days
    while (currentDateFull - prevDateFull > day) {
    prevDateFull = missingDays(prevDateFull);
    }
    // generate current day
    var date = currentDate;
    var count = d.stuff.length;
    counts.push(count);
    totalStuff = totalStuff + count;
    loadDay(date, count);
  });
}

// loop days and load up to today
function loadDays() {
  // if there is data in stuffLog
  if (stuffLog.length) {
      // load all days
      loopDays();
  } else {
      // just load today
      loadDay(today.toISOString().split('T')[0], 0);
  }

  // after loading days, add days up to today
  var prevDateFull = getPrevDate(Date());
  while (today - prevDateFull > day) {
      prevDateFull = missingDays(prevDateFull);
  }
}

// sort and load stuff options from data
function loadOptions() {
  switch(stuffType) {
    case 'veg':
      // sort veg
      veg.sort(compare);
      // load veg options
      veg.forEach(function(v) {
        $('select').append('<option value="' + v.id + '">' + v.name + '</option>')
      });
      break;
    default:
      console.log('stuffType "' + stuffType + '" not available');
  }
}

// load stuff from stuffLog
function loadStuff() {
  stuffLog.forEach(function(d) {
    d.stuff.forEach(function(s) {
      $('#' + d.date + ' option[value="' + s + '"]').attr('selected', 'selected');
    });
  });
}

// sort array of objects alphabetically by comparing item names
function compare(a,b) {
if (a.name < b.name)
  return -1;
if (a.name > b.name)
  return 1;
return 0;
}

function initSelectize() {
  $('select').selectize({
    plugins: ['remove_button']
  });
}

function colors(){
  switch(stuffType) {
    case 'veg':
      $.each(veg, function(i, v){
        $('.item[data-value="' + v.id + '"').css({
          'background-color':'#' + v.color, 
          'border-color':'#' + v.color
        });
      })
      break;
    default:
      console.log('stuffType "' + stuffType + '" not available');
  }
}

function stats() {
  var average = (totalStuff / totalDays).toPrecision(3);
  $('#average').html(average);
  var best = Math.max.apply(null, counts);
  $('#best').html(best);
}

function update() {
  // generate stuffLog
  stuffLog = [];
  counts = [];
  totalStuff = 0;
  $('select').each(function() {
    // add selected values to thisStuff array
    var thisStuff = []
    $('option:selected', this).each(function() {
      var stuff = parseInt(this.value)
      thisStuff.push(stuff);
    });
    // only get date and add to stuffLog if there is thisStuff contains values
    var count = thisStuff.length;
    if (count != 0) {
      // get date
      var thisDate = $(this).attr('id');
      // create entry object
      var entry = {};
      entry.date = thisDate;
      entry.stuff = thisStuff;
      // prepend entry to stuffLog
      stuffLog.unshift(entry);
    }
    // keep running total
    counts.push(count);
    totalStuff = totalStuff + count;
  });
}