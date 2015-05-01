$(document).ready(function() {

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
  