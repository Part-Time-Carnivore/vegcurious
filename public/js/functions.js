function highlight() {
}

function colorContrast(primary) {
  //default black secondary
  secondary = '000';
  //get primary start values for RGB
  red = Number(primary[0]);
  green = Number(primary[2]);
  blue = Number(primary[4]);
  //if color is very light, set dark secondary
  if (isNaN(red) && isNaN(blue) && isNaN(green)) {
    secondary = '222';
  // else if colour is very dark, set light secondary
  } else if (!isNaN(red) && !isNaN(blue) && !isNaN(green))  {
    secondary = 'eee';
  //else if colour is quite dark, set white secondary
  } else if ( (!isNaN(red) && !isNaN(green)) || (!isNaN(red) && !isNaN(blue)) || (!isNaN(green) && !isNaN(blue)) ) {
    secondary = 'fff';
  }
  return(secondary);
}

function colors(){
  switch(stuffType) {
    case 'veg':
      $.each(veg, function(i, v){
        var textColor = colorContrast(v.color);
        $('.item[data-value="' + v.id + '"').css({
          'background-color':'#' + v.color, 
          'border-color':'#' + v.color,
          'color' : '#' + textColor
        });
      })
      break;
    default:
      console.log('stuffType "' + stuffType + '" not available');
  }
}

function forget() {
  forgottenDays = 0;
  $('main label:nth-of-type(n+3) i').each(function() {
    var count = $(this).html();
    if (count == '0') {
      $(this).html('&nbsp')
      $(this).prev().children('.items').prepend('<span class="forgotten">Forgotten</span>');
      forgottenDays++;
    } else if (isNaN(count)) {
      forgottenDays++;
    } else {
      $(this).prev().find('.forgotten').remove();
    }
  });
}

function stats() {
  var average = (totalStuff / (totalDays - forgottenDays)).toPrecision(3);
  $('#average').html(average);
  var best = Math.max.apply(null, counts);
  $('#best').html(best);
}

function input(thisInput) {

}

function recount(thisSelect) {
    // recount selected options for this select
    var count = $('+ .selectize-control .item', thisSelect).length;
    $('+ .selectize-control + i', thisSelect).html(count);
}

function update() {
  // generate stuffLog
  stuffLog = [];
  counts = [];
  totalStuff = 0;
  dayNum = 0;
  $('main select').each(function() {
    dayNum++;
    // add selected values to thisStuff array
    var thisStuff = []
    $('option:selected', this).each(function() {
      var stuff = parseInt(this.value)
      thisStuff.push(stuff);
    });
    // only get date and add to stuffLog if count is not 0 for today and tomorrow, or forgotten
    var count = Number($(this).parent().find('i').html());
    if (count > 0 || (dayNum > 2 && !isNaN(count))) {
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
    if (!isNaN(count)) {
      counts.push(count);
      totalStuff += count;
    }
  });
}