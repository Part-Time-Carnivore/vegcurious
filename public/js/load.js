$(document).ready(function () {
  stuffType = $('main').attr('id');
  getStuffLog();
  loadDays();
  loadOptions();
  loadStuff();
  initSelectize();
  average();
  $("select").on("change", function (e) {
    update();
    storeStuffLog();
    average();
    // recount selected options for this select
    var count = $("+ .selectize-control .item", this).length;
    $("+ .selectize-control + i", this).html(count);
  });
});