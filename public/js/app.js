$(document).ready(function () {
  stuffType = $('main').attr('id');
  getStuffLog();
  loadDays();
  //loadOptions();
  //loadStuff();
  initSelectize();
  colors();
  forget();
  stats();
  // update when options have been selected or deselected
  $("main select").on("change", function () {
    recount($(this));
    forget();
    update();
    storeStuffLog();
    colors();
    stats();
  });
});