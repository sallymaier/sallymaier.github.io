 $(document).ready(function() {
  if (_.isUndefined(sessionStorage.activefilter) == false) {
    delete(sessionStorage.activefilter);
  }

  var captions = {};

  // Show a random header image
  // $('header img.backgroundfill:nth-of-type('+_.random(1,$('header img.backgroundfill').length)+')').show();

  $.getJSON('http://sallymaier.github.io/thesis/json/whitespace2.json', function(data) {
    var template = $('#whitespace-template').html();
    var info = Mustache.to_html(template, data);
    $('#pub-filter').html(info);

  });
});



