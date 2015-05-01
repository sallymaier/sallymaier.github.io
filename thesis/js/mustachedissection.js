$(document).ready(function() {

  $.getJSON('https://sheetlabs.com/SALL/whitespace2', function(data) {

    //mustache for images
    var template = $('#whitespace').html();
    var info = Mustache.to_html(template, data);
    $('#whitespacediv').html(info);

    // trying the list.js here
    var options = {
      valueNames: [ 'pub', 'income' ]
    };

    var whitespacedivList = new List('analysis', options);

    $('#pub-filter li a').on('click touch', function()  {
      var selection = $(this).data('pub'); 
      console.log(selection);

      // filter items in the list
      whitespacedivList.filter(function(item) {
        if (item.values().category === selection) {
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
