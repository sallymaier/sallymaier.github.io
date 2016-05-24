$(document).ready(function() {


  var options = {
    valueNames: [ 'pub', 'bracket' ]
  };

  var publicationList = new List('whitespacediv', options);

    // var options = {
    //   valueNames: [ 'name', 'program', 'exhibitionlocation', 'showdate', 'id' ]
    // };
    // var studentlist = new List('students', options);



    // Update the content of the active filters div
    $(window).on('updateFilter', function () {
      if (_.isUndefined(sessionStorage.activefilter)) {
        $('div#active-filter .attribute').empty();
        $('div#active-filter').hide();
        publicationList.filter();
      } else {
        $('div#active-filter').show();
        $('div#active-filter button').off('click touch').on('click touch', function() {
          delete(sessionStorage.activefilter);
          publicationList.filter();
          $(window).trigger('updateFilter');
        });
        $('div#active-filter .attribute').html(sessionStorage.activefilter);
      }
    });

        // Process the publication filter
    $('#pub-filter a').on('click touch', function(e) {
       if (_.isUndefined($(this).data('pub'))) return true;
       e.preventDefault();
       if (_.isUndefined(sessionStorage.activefilter) == false) {
       delete(sessionStorage.activefilter);
      }
      $(window).trigger('updateFilter');
      var publication = decodeURIComponent($(this).data('pub'));
      var p = $(this).html();
      publicationList.filter(function(item) {
        return item.values().publication.replace('&amp;','&').toLowerCase().indexOf(publication.toLowerCase()) >= 0;
      });
       sessionStorage.activefilter = p;
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
      // $('#showdate-filter a,li.showtime.active').on('click touch', function(e) {
      //   if (_.isUndefined($(this).data('showdate'))) return true;
      //   e.preventDefault();
      //   if (_.isUndefined(sessionStorage.activefilter) == false) {
      //     delete(sessionStorage.activefilter);
      //   }
      //   $(window).trigger('updateFilter');
      //   var showdate = $(this).data('showdate');
      //   studentlist.filter(function(item) {
      //     return item.values().showdate.indexOf(showdate) >= 0;
      //   });
      //   sessionStorage.activefilter = 'Show Date: ' + showdate;
      //   $(window).trigger('updateFilter');
      //   var pos = $('#students').offset();
      //   $('body').animate({ scrollTop: pos.top-150 });
      // });

      // // Process the program filter
      // $('#program-filter a').on('click touch', function(e) {
      //   if (_.isUndefined($(this).data('program'))) return true;
      //   e.preventDefault();
      //   if (_.isUndefined(sessionStorage.activefilter) == false) {
      //     delete(sessionStorage.activefilter);
      //   }
      //   $(window).trigger('updateFilter');
      //   var program = decodeURIComponent($(this).data('program'));
      //   var p = $(this).html();
      //   studentlist.filter(function(item) {
      //     return item.values().program.replace('&amp;','&').toLowerCase().indexOf(program.toLowerCase()) >= 0;
      //   });
      //   sessionStorage.activefilter = 'Program: ' + p;
      //   $(window).trigger('updateFilter');
      //   var pos = $('#students').offset();
      //   $('body').animate({ scrollTop: pos.top-150 });
      // });

      // // Sorting methods
      // $('a.sort-studentlist').on('click touch', function(e) {
      //   e.preventDefault();
      //   var type = $(this).data('type');
      //   if (_.isUndefined(sessionStorage.activefilter) == false) {
      //     delete(sessionStorage.activefilter);
      //   }
      //   $(window).trigger('updateFilter');
      //   if (type === 'program') {
      //     studentlist.filter();
      //     studentlist.sort('program', { sortFunction:  function(a,b) {
      //                                                   if(a.values().program< b.values().program) return -1;
      //                                                   if(a.values().program>b.values().program) return 1;
      //                                                   if(a.values().firstname<b.values().firstname) return -1;
      //                                                   if(a.values().firstname>b.values().firstname) return 1;
      //                                                   return 0;
      //                                                 }
      //     });
      //   } else if (type === 'all') {
      //     studentlist.filter();
      //     studentlist.sort('name', {order: 'asc'});
      //   }
      //   var pos = $('#students').offset();
      //   $('body').animate({ scrollTop: pos.top-150 });
      // });
      // if (window.location.hash.length > 0) {
      //   $(window).trigger('hashchange');
      // }
      // // Navigation menu
      // $('ul.nav > li > a').on('click touch', function(e) {
      //   e.preventDefault();
      //   offset = $(this.hash).offset().top - 150;
      //   if ($(this).attr('href') == '#intro') offset = 0;
      //   if ($(this).attr('href') == '#students') {
      //     if (_.isUndefined(sessionStorage.activefilter) == false) {
      //       delete(sessionStorage.activefilter);
      //     }
      //     $('input#search-students').val('');
      //     studentlist.filter();
      //     $(window).trigger('updateFilter');
      //   }
      //   $('html, body').stop().animate({
      //     scrollTop: offset
      //   }, 400);
      // });


});


