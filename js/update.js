$(document).ready(function () {

  // selection change event
  $("select").on("change", function (e) {

    // generate stuffLog
    stuffLog = [];
    totalStuff = 0;

    $('select').each(function() {
      // add selected values to thisStuff array
      var thisStuff = []
      $('option:selected', this).each(function() {
        var stuff = parseInt(this.value)
        thisStuff.push(stuff);
      });
      // only get date and add to stuffLog if there is thisStuff contains values
      var count = thisStuff.length;
      if (count != 0) {
        // get date
        var thisDate = $(this).attr('id');
        // create entry object
        var entry = {};
        entry.date = thisDate;
        entry.stuff = thisStuff;
        // prepend entry to stuffLog
        stuffLog.unshift(entry);
      }
      // keep running total
      totalStuff = totalStuff + count;
    });

    // update localStorage
    if (window.localStorage) {
      localStorage.setItem('myStuff', JSON.stringify(stuffLog));
    }

    // update count html
    var count = $("+ .selectize-control .item", this).length;
    $("+ .selectize-control + i", this).html(count);

    // update average stuff per day
    average();

  })

});