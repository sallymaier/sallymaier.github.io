 $(document).ready(function() {

//mustache for nav

  $.getJSON('https://sheetlabs.com/SALL/whitespace2', function(data) {
    var template = $('#publist').html();
    var info = Mustache.to_html(template, data);
    $('#pubfilter').html(info);

    var template = $('#bracketlist').html();
    var info = Mustache.to_html(template, data);
    $('#bracketfilter').html(info);


//mustache for images

    var template = $('#whitespace').html();
    var info = Mustache.to_html(template, data);
    $('#whitespacediv').html(info);

  });


});



