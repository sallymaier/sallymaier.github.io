$(document).ready(function() {

  //sorter sticker

  // $(function() {
  //   $('#sorter-wrapper').height($("#sorter").height());
    
  //   $('#sorter').affix({
  //       offset: { top: $('#sorter').offset().top }
  //   });
  // });

  $.getJSON('https://sheetlabs.com/SALL/WhitespaceRotationLayersData', function(data) {

    //mustache for images
    var template = $('#whitespace').html();
    var info = Mustache.to_html(template, data);
    $('#whitespacediv').html(info);

    var template = $('#rotations').html();
    var info = Mustache.to_html(template, data);
    $('#rotationsdiv').html(info);  



    // trying the list.js here, seems to work better here... weird.
    var options = {
      valueNames: [ 'pub', 'bracket', 'pagetype' ]
    };

    var whitespaceList = new List('whitespacecont', options);
    var rotationsList = new List('rotationscont', options);

    $('#pub-filter li a').on('click touch', function()  {
      var selection = $(this).data('pub'); 

      // filter items in the list
      whitespaceList.filter(function(item) {
        if (item.values().pub === selection) {
          return true;
        } else {
          return false;
        }
      });

      rotationsList.filter(function(item) {
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

      // filter items in the list
      whitespaceList.filter(function(item) {
        if (item.values().bracket === selection) {
          return true;
        } else {
          return false;
        }
      });

      rotationsList.filter(function(item) {
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

      // filter items in the list
      whitespaceList.filter(function(item) {
        if (item.values().pagetype === selection) {
          return true;
        } else {
          return false;
        }
      });

      rotationsList.filter(function(item) {
        if (item.values().pagetype === selection) {
          return true;
        } else {
          return false;
        }
      });
      return false;
    });

    $('#analysis-filter li a').on('click touch', function()  {
      var selection = $(this).data('dissection'); 

      // filter items in the list
      whitespaceList.filter(function(item) {
        if (item.values().dissection === selection) {
          return true;
        } else {
          return false;
        }
      });

      rotationsList.filter(function(item) {
        if (item.values().dissection === selection) {
          return true;
        } else {
          return false;
        }
      });
      return false;
    });

    // show all items
    $('#filter-none').click(function() {
      whitespaceList.filter();
      return false;
    });
    $('#filter-none').click(function() {
      rotationsList.filter();
      return false;
    });
  }); 

  //an attempt at video mouseovers. probably not worth the effort.
  
  // $('.quick-video').mouseover(function()  {
  //   var playerid = $(this).data('playerid'); 
  //       player = $("#player_" + playerid);
  //       froogaloop = $f(player[0].id);

  //   console.log(playerid);
  //   console.log(player);
    
  //   player.mouseover(function(){
  //       froogaloop.api('play');
  //   }).mouseout(function(){
  //       froogaloop.api('pause');
  //   });
  // });

});
