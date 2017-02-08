// load days
// load options
// load veg
// initialize select2
// update count


$(document).ready(function () {

  // load days
  days.forEach(function(d) {
    $('main').append('<label for="' + d.id + '"><time>' + d.date + '</time> <select id="' + d.id + '" multiple="multiple"><option value="" disabled selected style="display: none;">Add veg</option></select> <i>' + d.veg.length + '</i></label>');
  });

  // load options
  veg.forEach(function(v) {
    $('select').append('<option value="' + v.id + '">' + v.text + '</option>')
  });

  // load veg for each day
  days.forEach(function(d) {
    d.veg.forEach(function(v) {
      $('#' + d.id + ' option[value="' + v + '"]').attr("selected", "selected");
    });
  });

  // initiate selectize
  $('select').selectize({
    plugins: ['remove_button']
  });

  // update count
  $("select").on("change", function (e) {
    var count = $("+ .selectize-control .item", this).length;
    $("+ .selectize-control + i", this).html(count);
  })

});