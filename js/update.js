$(document).ready(function () {

  // selection change event
  $("select").on("change", function (e) {

    // generate vegDays
    vegDays = [];
    totalVeg = 0;
    $('select').each(function() {
      // add selected values to thisVeg array
      var thisVeg = []
      $('option:selected', this).each(function() {
        var veg = parseInt(this.value)
        thisVeg.push(veg);
      });
      // only get date and add to vegDays if there is thisVeg contains values
      var count = thisVeg.length;
      if (count != 0) {
        // get date
        var thisDate = $(this).attr('id');
        // create vegDay object
        var vegDay = {};
        vegDay.date = thisDate;
        vegDay.veg = thisVeg;
        // prepend vegDay to vegDays
        vegDays.unshift(vegDay);
      }
      // keep running total
      totalVeg = totalVeg + count;
    });

    // update localStorage
    if (window.localStorage) {
      localStorage.setItem('vegDays', JSON.stringify(vegDays));
    }

    // update count html
    var count = $("+ .selectize-control .item", this).length;
    $("+ .selectize-control + i", this).html(count);

    // update average veg per day
    average();

  })

});