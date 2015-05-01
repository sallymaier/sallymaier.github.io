$(document).ready(function() {


  var options = {
    valueNames: [ 'pub', 'bracket' ]
  };

  var whitespacedivList = new List('whitespacediv', options);
  

  $('#pub-filter li a').on('click touch', function()  {
      var selection = $(this).data('pub'); 

      console.log(selection);


      // filter items in the list
      pubList.filter(function (item) {
           if (item.values().pub == "selection") {
              return true;
          } else {
              return false;
          }
      });
  });




});