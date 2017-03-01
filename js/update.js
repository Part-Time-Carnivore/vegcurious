$(document).ready(function () {

  // selection change event
  $("select").on("change", function (e) {

    // generate vegDays
    vegDays = [];
    var totalVeg = 0;
    var totalDays = 0;
    var average = 0;
    $('select').each(function() {
      // add values to thisVeg array
      var thisVeg = []
      $('option:selected', this).each(function() {
        var veg = parseInt(this.value)
        thisVeg.push(veg);
      });

      // running totals for average
      totalDays = totalDays + 1;
      totalVeg = totalVeg + thisVeg.length;

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

    // average veg per day
    average = (totalVeg / totalDays).toPrecision(3);
    $('#average').html(average);

    // update localStorage
    if (window.localStorage) {
      localStorage.setItem('vegDays', JSON.stringify(vegDays));
    }

    // count items
    var count = $("+ .selectize-control .item", this).length;

    // update count html
    $("+ .selectize-control + i", this).html(count);

  })

});