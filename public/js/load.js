$(document).ready(function () {
  stuffType = $('main').attr('id');
  getStuffLog();
  loadDays();
  loadOptions();
  loadStuff();
  initSelectize();
  colors();
  stats();
  $("select").on("change", function (e) {
    update();
    storeStuffLog();
    colors();
    stats();
    // recount selected options for this select
    var count = $("+ .selectize-control .item", this).length;
    $("+ .selectize-control + i", this).html(count);
  });
});