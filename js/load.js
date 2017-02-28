$(document).ready(function () {

  // check localstorage to set vegDays
  if (window.localStorage && localStorage.vegDays) {
    vegDays = JSON.parse(localStorage['vegDays']);
  }

  // if there is data in vegDays
  if (vegDays.length) {
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
  function compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  veg.sort(compare);

  // load veg options
  veg.forEach(function(v) {
    $('select')
      .append('<option value="' + v.id + '">' + v.name + '</option>')
  });

  // load veg from vegDays
  vegDays.forEach(function(d) {
    d.veg.forEach(function(v) {
      $('#' + d.date + ' option[value="' + v + '"]')
        .attr("selected", "selected");
    });
  });

  // init selectize
  $('select')
    .selectize({
      plugins: ['remove_button']
    });

});