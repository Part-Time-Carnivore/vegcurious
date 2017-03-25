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
  // only show options when text is entered
  $('main input').on('input change focus blur', function(){
    input($(this));
  });
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