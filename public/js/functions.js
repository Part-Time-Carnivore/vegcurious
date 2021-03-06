// variables
day = 24*60*60*1000;
today = new Date();
stuffType = '';
stuffLog = [];
totalDays = 0;
forgottenDays = 0;
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
  $('main').prepend('<label for="' + date + '"><time>' + date + '</time> <select id="' + date + '" multiple="multiple"><option value="" disabled selected style="display: none;"></option></select> <i>' + count + '</i></label>');
  counts.push(count);
  totalDays++;
}

// add missing days function
function missingDays(prevDateFull) {
  var dateFull = new Date(prevDateFull.getTime() + day);
  var date = dateFull.toISOString().split('T')[0];
  loadDay(date, 0);
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
    totalStuff += count;
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
  // replace date for today and yesterday
  $('main label:first-of-type time').html('Today');
  $('main label:nth-of-type(2) time').html('Yesterday');
  $('main label:nth-of-type(n+3):nth-of-type(-n+7) time').each(function(){
    var d = new Date($(this).html());
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    var dayName = weekday[d.getDay()];
    $(this).html(dayName);
  });
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

function highlight() {
  $('.selectize-control').addClass('fade');
  $('main input:focus').closest('.selectize-control').removeClass('fade');
}

function initSelectize() {
  $('select').selectize({
    closeAfterSelect: true,
    plugins: ['remove_button'],
    onItemAdd:function() {
      $('.selectize-dropdown').addClass('hidden');
    }
  });
  $('.selectize-dropdown').addClass('hidden');
  $('main input').first().focus();
  highlight();
}

function colorContrast(primary) {
  //default black secondary
  secondary = '000';
  //get primary start values for RGB
  red = Number(primary[0]);
  green = Number(primary[2]);
  blue = Number(primary[4]);
  //if color is very light, set dark secondary
  if (isNaN(red) && isNaN(blue) && isNaN(green)) {
    secondary = '222';
  // else if colour is very dark, set light secondary
  } else if (!isNaN(red) && !isNaN(blue) && !isNaN(green))  {
    secondary = 'eee';
  //else if colour is quite dark, set white secondary
  } else if ( (!isNaN(red) && !isNaN(green)) || (!isNaN(red) && !isNaN(blue)) || (!isNaN(green) && !isNaN(blue)) ) {
    secondary = 'fff';
  }
  return(secondary);
}

function colors(){
  switch(stuffType) {
    case 'veg':
      $.each(veg, function(i, v){
        var textColor = colorContrast(v.color);
        $('.item[data-value="' + v.id + '"').css({
          'background-color':'#' + v.color, 
          'border-color':'#' + v.color,
          'color' : '#' + textColor
        });
      })
      break;
    default:
      console.log('stuffType "' + stuffType + '" not available');
  }
}

function forget() {
  forgottenDays = 0;
  $('main label:nth-of-type(n+3) i').each(function() {
    var count = $(this).html();
    if (count == '0') {
      $(this).html('&nbsp')
      $(this).prev().children('.items').prepend('<span class="forgotten">Forgotten</span>');
      forgottenDays++;
    } else if (isNaN(count)) {
      forgottenDays++;
    } else {
      $(this).prev().find('.forgotten').remove();
    }
  });
}

function stats() {
  var average = (totalStuff / (totalDays - forgottenDays)).toPrecision(3);
  $('#average').html(average);
  var best = Math.max.apply(null, counts);
  $('#best').html(best);
}

function input(thisInput) {
  highlight();
  // show dropdown if there is text in input
  if (thisInput.val().length > 0) {
    $('.selectize-dropdown').removeClass('hidden');
  } else {
    $('.selectize-dropdown').addClass('hidden');
  }
}

function recount(thisSelect) {
    // recount selected options for this select
    var count = $('+ .selectize-control .item', thisSelect).length;
    $('+ .selectize-control + i', thisSelect).html(count);
}

function update() {
  // generate stuffLog
  stuffLog = [];
  counts = [];
  totalStuff = 0;
  dayNum = 0;
  $('main select').each(function() {
    dayNum++;
    // add selected values to thisStuff array
    var thisStuff = []
    $('option:selected', this).each(function() {
      var stuff = parseInt(this.value)
      thisStuff.push(stuff);
    });
    // only get date and add to stuffLog if count is not 0 for today and tomorrow, or forgotten
    var count = Number($(this).parent().find('i').html());
    if (count > 0 || (dayNum > 2 && !isNaN(count))) {
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
    if (!isNaN(count)) {
      counts.push(count);
      totalStuff += count;
    }
  });
}