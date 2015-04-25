 $(document).ready(function() {
  if (_.isUndefined(sessionStorage.activefilter) == false) {
    delete(sessionStorage.activefilter);
  }

  var captions = {};

  // Show a random header image
  // $('header img.backgroundfill:nth-of-type('+_.random(1,$('header img.backgroundfill').length)+')').show();

  $.getJSON('https://sheetlabs.com/SALL/whitespace2', function(data) {
    var template = $('#publist').html();
    var info = Mustache.to_html(template, data);
    $('#pubfilter').html(info);

  });
});



