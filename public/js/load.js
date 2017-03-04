$(document).ready(function () {
  stuffType = $('main').attr('id');

  // get stuffLog
  getStuffLog();

  //loop and load days up to today
  loadDays();

  // load options
  loadOptions();

  // load stuff from stuffLog
  loadStuff();

  // init selectize
  initSelectize();

  // initial average 
  average();
});