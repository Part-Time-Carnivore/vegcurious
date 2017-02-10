// update counts


$(document).ready(function () {

  // update counts
  $("select").on("change", function (e) {
    // count items
    var count = $("+ .selectize-control .item", this).length;

    // update count html
    $("+ .selectize-control + i", this)
      .html(count);
  })

});