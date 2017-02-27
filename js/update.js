// update counts


$(document).ready(function () {

  // selection change event
  $("select").on("change", function (e) {
    // count items
    var count = $("+ .selectize-control .item", this).length;

    // update count html
    $("+ .selectize-control + i", this).html(count);

    // generate vegDays
    vegDays = []
    $('select').each(function() {
      // add values to thisVeg array
      var thisVeg = []
      $('option:selected', this).each(function() {
        var veg = parseInt(this.value)
        thisVeg.push(veg);
      });

      //only get date and add to vegDays if there is thisVeg contains values
      if (thisVeg.length != 0) {
        // get date
        var thisDate = $(this).attr('id');
        // day object
        var vegDay = {};
        vegDay.date = thisDate;
        vegDay.veg = thisVeg;
        vegDays.unshift(vegDay);
      }
    });

    // update localStorage
    if (window.localStorage) {
      localStorage.setItem('vegDays', JSON.stringify(vegDays));
    }

  })

});