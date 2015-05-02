$(document).ready(function() {

  $.getJSON('https://sheetlabs.com/SALL/dataforwhitespace', function(data) {

    //mustache for images
    var template = $('#whitespace').html();
    var info = Mustache.to_html(template, data);
    $('#whitespacediv').html(info);

    // trying the list.js here, seems to work better here... weird.
    var options = {
      valueNames: [ 'pub', 'bracket', 'pagetype' ]
    };

    var whitespacedivList = new List('analysis', options);

    $('#pub-filter li a').on('click touch', function()  {
      var selection = $(this).data('pub'); 
      console.log(selection);

      // filter items in the list
      whitespacedivList.filter(function(item) {
        if (item.values().pub === selection) {
          return true;
        } else {
          return false;
        }
      });
      return false;
    });

    $('#bracket-filter li a').on('click touch', function()  {
      var selection = $(this).data('bracket'); 
      console.log(selection);

      // filter items in the list
      whitespacedivList.filter(function(item) {
        if (item.values().bracket === selection) {
          return true;
        } else {
          return false;
        }
      });
      return false;
    });

    $('#type-filter li a').on('click touch', function()  {
      var selection = $(this).data('pagetype'); 
      console.log(selection);

      // filter items in the list
      whitespacedivList.filter(function(item) {
        if (item.values().pagetype === selection) {
          return true;
        } else {
          return false;
        }
      });
      return false;
    });

    // show all items
    $('#filter-none').click(function() {
      whitespacedivList.filter();
      return false;
    });
    
  });

});
