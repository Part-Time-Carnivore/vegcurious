$(document).ready(function () {

  // check localstorage to set stuffLog
  if (window.localStorage && localStorage.myStuff) {
    stuffLog = JSON.parse(localStorage['myStuff']);
  }

  // if there is data in stuffLog
  if (stuffLog.length) {
    // load all days
    loopDays();
  } else {
    // just load today
    loadDays(today.toISOString().split('T')[0], 0);
  }

  // after loading days, add days up to today
  var prevDateFull = getPrevDate(Date());
  while (today - prevDateFull > day) {
    prevDateFull = missingDays(prevDateFull);
  }

  // sort veg
  veg.sort(compare);

  // load veg options
  veg.forEach(function(v) {
    $('select').append('<option value="' + v.id + '">' + v.name + '</option>')
  });

  // load stuff from stuffLog
  stuffLog.forEach(function(d) {
    d.stuff.forEach(function(s) {
      $('#' + d.date + ' option[value="' + s + '"]').attr('selected', 'selected');
    });
  });

  // init selectize
  $('select').selectize({
    plugins: ['remove_button']
  });

  // initial average 
    average();
});