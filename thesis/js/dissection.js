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



var publications = {
  valueNames: [ "Woman's World", "People", "Time", "Wired", "Bon Appetit", "Real Simple", "New Yorker", "Wallpaper",
"New York Times Magazine" ]
};

var publicationList = new List('whitespacediv', options);

$('#filter-games').click(function() {
  featureList.filter(function(item) {
    if (item.values().category == "Game") {
      return true;
    } else {
      return false;
    }
  });
  return false;
});

// $('#filter-beverages').click(function() {
//   featureList.filter(function(item) {
//     if (item.values().category == "Beverage") {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return false;
// });

// $('#filter-none').click(function() {
//   featureList.filter();
//   return false;
// });

  // Process the program filter
  $('#pub-filter a').on('click touch', function(e) {
    if (_.isUndefined($(this).data('publication'))) return true;
    e.preventDefault();
    if (_.isUndefined(sessionStorage.activefilter) == false) {
      delete(sessionStorage.activefilter);
    }
    $(window).trigger('updateFilter');
    var publication = decodeURIComponent($(this).data('publication'));
    var p = $(this).html();
    dissections.filter(function(item) {
      return item.values().publication.replace('&amp;','&').toLowerCase().indexOf(publication.toLowerCase()) >= 0;
    });
    sessionStorage.activefilter = 'Program: ' + p;
    $(window).trigger('updateFilter');
    var pos = $('#analysis').offset();
    $('body').animate({ scrollTop: pos.top-150 });
  });


  // // Process dropdown gallery filter
  //   $('#pubfilter a').on('click touch', function(e) {
  //     e.preventDefault();
  //     if (_.isUndefined(sessionStorage.activefilter) == false) {
  //       delete(sessionStorage.activefilter);
  //     }
  //     $(window).trigger('updateFilter');
  //     var gallery = $(this).data('pub');
  //     var g = $(this).html();
  //     dissections.filter(function(item) {
  //       var terms = gallery.split(',');
  //       var match = false;
  //       for (var i = 0; i<terms.length; i++) {
  //         if (item.values().income.replace('&amp;','&').toLowerCase().indexOf(terms[i].toLowerCase()) >= 0) match = true;
  //       }
  //       return match;
  //     });
  //     sessionStorage.activefilter = 'Gallery: ' + g.replace('Gallery', '');
  //     $(window).trigger('updateFilter');
  //     var pos = $('#analysis').offset();
  //     $('body').animate({ scrollTop: pos.top-150 });
  //   });

    // Process the showdate filter
    $('#showdate-filter a,li.showtime.active').on('click touch', function(e) {
      if (_.isUndefined($(this).data('showdate'))) return true;
      e.preventDefault();
      if (_.isUndefined(sessionStorage.activefilter) == false) {
        delete(sessionStorage.activefilter);
      }
      $(window).trigger('updateFilter');
      var showdate = $(this).data('showdate');
      studentlist.filter(function(item) {
        return item.values().showdate.indexOf(showdate) >= 0;
      });
      sessionStorage.activefilter = 'Show Date: ' + showdate;
      $(window).trigger('updateFilter');
      var pos = $('#students').offset();
      $('body').animate({ scrollTop: pos.top-150 });
    });

    // Process the program filter
    $('#program-filter a').on('click touch', function(e) {
      if (_.isUndefined($(this).data('program'))) return true;
      e.preventDefault();
      if (_.isUndefined(sessionStorage.activefilter) == false) {
        delete(sessionStorage.activefilter);
      }
      $(window).trigger('updateFilter');
      var program = decodeURIComponent($(this).data('program'));
      var p = $(this).html();
      studentlist.filter(function(item) {
        return item.values().program.replace('&amp;','&').toLowerCase().indexOf(program.toLowerCase()) >= 0;
      });
      sessionStorage.activefilter = 'Program: ' + p;
      $(window).trigger('updateFilter');
      var pos = $('#students').offset();
      $('body').animate({ scrollTop: pos.top-150 });
    });

    // Sorting methods
    $('a.sort-studentlist').on('click touch', function(e) {
      e.preventDefault();
      var type = $(this).data('type');
      if (_.isUndefined(sessionStorage.activefilter) == false) {
        delete(sessionStorage.activefilter);
      }
      $(window).trigger('updateFilter');
      if (type === 'program') {
        studentlist.filter();
        studentlist.sort('program', { sortFunction:  function(a,b) {
                                                      if(a.values().program< b.values().program) return -1;
                                                      if(a.values().program>b.values().program) return 1;
                                                      if(a.values().firstname<b.values().firstname) return -1;
                                                      if(a.values().firstname>b.values().firstname) return 1;
                                                      return 0;
                                                    }
        });
      } else if (type === 'all') {
        studentlist.filter();
        studentlist.sort('name', {order: 'asc'});
      }
      var pos = $('#students').offset();
      $('body').animate({ scrollTop: pos.top-150 });
    });
    if (window.location.hash.length > 0) {
      $(window).trigger('hashchange');
    }
    // Navigation menu
    $('ul.nav > li > a').on('click touch', function(e) {
      e.preventDefault();
      offset = $(this.hash).offset().top - 150;
      if ($(this).attr('href') == '#intro') offset = 0;
      if ($(this).attr('href') == '#students') {
        if (_.isUndefined(sessionStorage.activefilter) == false) {
          delete(sessionStorage.activefilter);
        }
        $('input#search-students').val('');
        studentlist.filter();
        $(window).trigger('updateFilter');
      }
      $('html, body').stop().animate({
        scrollTop: offset
      }, 400);
    });





});



