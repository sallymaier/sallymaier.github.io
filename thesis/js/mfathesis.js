 $(document).ready(function() {
  if (_.isUndefined(sessionStorage.activefilter) == false) {
    delete(sessionStorage.activefilter);
  }

  var captions = {};

  // Show a random header image
  $('header img.backgroundfill:nth-of-type('+_.random(1,$('header img.backgroundfill').length)+')').show();

  $.getJSON('http://mfa.cape.io/items/data.json', function(data) {

    // Correct the caption data structure
    var keys = _.keys(data.photo_info);
    _.forEach(keys, function(id) {
      var student = data.photo_info[id];
      if (_.isArray(student)) {
        captions[id] = _.map(_.values(student), function(item) { return _.values(item)[0]; });
        _.map(captions[id], function(item) {
          item.size = (_.isUndefined(item.size)) ? 'N/A':item.size;
          item.size = (item.size.toLowerCase().indexOf('n/a') > -1) ? false:item.size;
          item.medium = (_.isUndefined(item.medium)) ? 'N/A':item.medium;
          item.medium = (item.medium.toLowerCase().indexOf('n/a') > -1) ? false:item.medium;
          item.year = (_.isUndefined(item.year)) ? '':item.year;
          item.year = (item.year.toString().toLowerCase().indexOf('n/a') > -1) ? '':item.year;
          item.year = (item.year.length == 0) ? false:item.year;
        });
      } else {
        console.log(id);
      }
    });

    // Remove any bad entries that are missing firstname
    data.students = _.filter(data.students, function(student) { return (_.isUndefined(student.firstname) == false); })

    // Programs grouped by showdates as taken from the actual data
    var showdates = [{
      name: [ "Post-Baccalaureate Fine Art",
              "Post-Baccalaureate Fine Arts" ],
      date: 'Jan 31-Feb 16, 2014'
    }, {
      name: [ "Graphic Design MFA",
              "Post-Baccalaureate Graphic Design",
              "Illustration Practice MFA" ],
      date: 'Mar 28-Apr 06, 2014'
    }, {
      name: [ "Social Design MA" ],
      date: 'Apr 23-May 04, 2014'
    }, {
      name: [ "Rinehart School of Sculpture MFA",
              "Photographic & Electronic Media MFA",
              "Photographic & Electronic Media",
              "Community Arts MFA",
              "Community Arts MFA MFA" ],
      date: 'Apr 11-Apr 20, 2014'
    }, {
      name: [ "Teaching MA",
              "Teaching" ],
      date: 'Jan 24-Feb 16, 2014'
    }, {
      name: [ "Mount Royal School of Art MFA",
              "Leroy E. Hoffberger School of Painting MFA" ],
      date: 'Apr 25-May 04, 2014'
    }, {
      name: [ 'Curatorial Practice MFA' ],
      date: 'Feb 01-May 09, 2014'
    }, {
      name: [ "Critical Studies MA" ],
      date: 'May 03, 2014'
    }, {
      name: [ "Studio Art MFA",
              "Studio Art" ],
      date: 'Jun 28-Jul 12, 2014'
    }, {
      name: [ "Art Education MA",
              "Art Education" ],
      date: 'Jul 29-Aug 1, 2014'
    }];

    // Function to convert a program into a showdate
    var showDate = function(program) {
      var showdate = '';
      var shows = this;
      // Cycle through available showdates to find a match
      for (var i = 0; i<shows.length; i++) {
        if (_.indexOf(shows[i].name, program) > -1) {
          showdate = shows[i].date;
        }
      }
      return showdate;
    }

    // Print all programs to the console, grouped and sorted
    // console.log(_.uniq(_.pluck(data.students, 'program')).sort().join('\n'));

    // Function for getting a list of other people in the same program
    var sameProgram = function(program) {
      var students = this;
      program = (_.isUndefined(program)) ? '':program;
      program = program.replace('&amp;','&');
      // Return sorted list of students from program
      return _.sortBy(_.where(students, { program: program }), 'firstname');
    }

    // Slideshow items
    var slideShow = function(id) {
      var slideshow = this;
      var a = [];
      if (_.isUndefined(slideshow[id])) return false;
      slideshow[id] = slideshow[id].sort();
      // Return an array of slides for a given id
      for (i=0; i<slideshow[id].length; i++) {
        var caption = (_.isUndefined(captions[id])) ? false:captions[id][i];
        a.push({slide: slideshow[id][i], caption: caption});
      }
      return a;
    }

    // Returns an array to be used as a counter for mustache templating
    var slideShowcount = function(id) {
      var slideshow = this;
      var r = [];
      if (_.isUndefined(slideshow[id]) == false) {
        for (var i=0; i<slideshow[id].length; i++) {
          r.push(i);
        }
      }
      return r;
    }

    // Function to determine whether we have images for an id
    var slideShowimages = function(id) {
      var slideshow = this;
      var r = [];
      if (_.isUndefined(slideshow[id]) == false) {
        for (var i=0; i<slideshow[id].length; i++) {
          r.push(i);
        }
      }
      return r.length > 0;
    }

    // Function to determine whether we have only a single image or multiple images
    var slideShowsingle = function(id) {
      var slideshow = this;
      var r = [];
      if (_.isUndefined(slideshow[id]) == false) {
        for (var i=0; i<slideshow[id].length; i++) {
          r.push(i);
        }
      }
      return r.length > 1;
    }

    // Get the id of the next student
    var nextStudent = function(id) {
      var students = this;
      // Pluck id values, sorting the students by name
      var sorted = _.pluck(_.sortBy(students, 'firstname'), 'studentid');
      var pos = _.indexOf(sorted, id);
      if (pos == sorted.length-1) return sorted[0];
      return sorted[pos+1];
    }

    // Get the id of the previous student
    var prevStudent = function(id) {
      var students = this;
      var sorted = _.pluck(_.sortBy(students, 'firstname'), 'studentid');
      var pos = _.indexOf(sorted, id);
      if (pos == 0) return sorted[sorted.length-1];
      return sorted[pos-1];
    }

    // Map various function bindings to the objects that will be sent to mustache
    _.map(data.students, function(student) {
      student.studentid            = student.studentid;
      student.personalemail        = (_.isUndefined(student.personalemail) || student.personalemail.length == 0) ? false:student.personalemail;
      student.urlofpersonalwebsite = (_.isUndefined(student.urlofpersonalwebsite) || student.urlofpersonalwebsite.length == 0) ? false:student.urlofpersonalwebsite;
      student.showdate             = _.bind(showDate, showdates, student.program);
      student.peers                = _.bind(sameProgram, data.students, student.program);
      student.slideshow            = _.bind(slideShow, data.slideshow, student.studentid);
      student.slideshowcount       = _.bind(slideShowcount, data.slideshow, student.studentid);
      student.slideshowsingle      = _.bind(slideShowsingle, data.slideshow, student.studentid);
      student.slideshowimages      = _.bind(slideShowimages, data.slideshow, student.studentid);
      student.nextid               = _.bind(nextStudent, data.students, student.studentid);
      student.previd               = _.bind(prevStudent, data.students, student.studentid);
    });

    // Compile templates for the list and the overlay
    var StudentTemplate = Hogan.compile($('#students-template').html());
    var StudentOverlay  = Hogan.compile($('#overlay-template').html());

    // Render the template for the list and initialize list.js
    $('#projects-demo').html(StudentTemplate.render(data));
    var options = {
      valueNames: [ 'name', 'program', 'exhibitionlocation', 'showdate', 'id' ]
    };
    var studentlist = new List('students', options);


    /*** Activate peers ***/
    $(window).on('activatePeers', function() {
      $('ul.program-peers li').removeClass('active');

      // Get the active element and previous and next for button usage
      var $active = $('span[id="id-'+sessionStorage.activestudent+'"]');
      $active.parent().addClass('active');

      // When closing the window, revert the body overflow and scroll position
      $('.student-overlay button.close').on('click touch', function(e) {
        hash.remove('id');
        $('html,body').css('overflow','auto').css('height', '');
        if (_.isUndefined(sessionStorage.overlaypos) == false) {
          delete(sessionStorage.overlaypos);
        }
        $('body').animate({ scrollTop: sessionStorage.scrollpos }, 0);
      });

      // Close the overlay on img.logo click
      $('.student-overlay img.logo').on('click touch', function(e) {
        hash.remove('id');
        $('html,body').css('overflow','auto').css('height', '');
        if (_.isUndefined(sessionStorage.overlaypos) == false) {
          delete(sessionStorage.overlaypos);
        }
        $('body').animate({ scrollTop: sessionStorage.scrollpos }, 0);
      });

      // Navigate to a random person in the list
      $('.student-nav li.random').off().on('click touch', function(e) {
        var ids = _.pluck(data.students, 'studentid');
        var random_id = ids[_.random(0,ids.length-1)];
        hash.add({id:random_id});
      });

      // Click handlers to navigate to peers by id
      $('ul.program-peers li').on('click touch', function(e) {
        var id = $(this).find('.id').html();
        sessionStorage.overlaypos = $('.student-overlay').scrollTop();
        hash.add({id:id});
      });
    });

    /*** Hashchange ***/
    $(window).on('hashchange', function(e) {
      var id = hash.get('id');
      // If we have an id, open the overlay
      if (_.isUndefined(id) == false) {
        // Get the student from the original object by id
        var s = _.where(data.students, { studentid:id })[0];
        // Remove any existing overlay and render new data
        $('.student-overlay').remove();
        $('body').append(StudentOverlay.render(s));
        $('html,body').css('overflow','hidden').height($(window).height());
        // Activate the first slide in the slideshow
        $('div.carousel-inner div.item:nth-of-type(1)').addClass('active');
        $('#slideshow ol.carousel-indicators li:nth-of-type(1)').addClass('active');
        // When we navigate, store the scroll position
        $('.student-nav a').on('click touch', function() {
          sessionStorage.overlaypos = $('.student-overlay').scrollTop();
        });
        // If we have a scroll position, scroll to it
        if (_.isUndefined(sessionStorage.overlaypos) == false) {
          $('.student-overlay').animate({ scrollTop: sessionStorage.overlaypos }, 0);
        }
        sessionStorage.activestudent = s.studentid;
        $(window).trigger('activatePeers');
      } else {
        $('.student-overlay').remove();
        $('html,body').css('overflow','auto').css('height', '');
        if (_.isUndefined(sessionStorage.overlaypos) == false) {
          delete(sessionStorage.overlaypos);
        }
        $('body').animate({ scrollTop: sessionStorage.scrollpos }, 0);
      }
    });

    /*** List is updated ***/
    studentlist.on('updated', function() {
      $('li.student').each(function(i,obj) {
        // Retrieve the id for the current list item
        var id = $(this).find('p.id').html();
        // Click handler for the list item
        $(this).off('click touch').on('click touch', function(e) {
          // Get the student information from the list
          var s = _.where(data.students, { studentid:id })[0];
          sessionStorage.activestudent = s.studentid;
          hash.add({id:s.studentid});
          // Save the current scroll position
          sessionStorage.scrollpos = document.body.scrollTop;
          // When we close the window, rest the body overflow and scroll position
          $(window).trigger('activatePeers');
        });
      });
    });

    // Initially, sort the list by ascending first name
    studentlist.sort('name', { order: 'asc' });

    // Update the content of the active filters div
    $(window).on('updateFilter', function () {
      if (_.isUndefined(sessionStorage.activefilter)) {
        $('div#active-filter .attribute').empty();
        $('input#search-students').val('');
        $('div#active-filter').hide();
        studentlist.filter();
      } else {
        $('div#active-filter').show();
        $('div#active-filter button').off('click touch').on('click touch', function() {
          delete(sessionStorage.activefilter);
          $('input#search-students').val('');
          studentlist.filter();
          $(window).trigger('updateFilter');
        });
        $('div#active-filter .attribute').html(sessionStorage.activefilter);
      }
    });

    // Search on input keyup
    $('input#search-students').on('keyup', function() {
      var search = $(this).val();
      if (search.length > 0) {
        studentlist.filter(function (item) {
          var search_string = item.values().name.toLowerCase();
          return search_string.indexOf(search.toLowerCase()) >= 0;
        });
        sessionStorage.activefilter = 'Search: ' + search;
        $(window).trigger('updateFilter');
      } else {
        if (_.isUndefined(sessionStorage.activefilter) == false) {
          delete(sessionStorage.activefilter);
        }
        $(window).trigger('updateFilter');
      }
      var pos = $('#students').offset();
      $('body').animate({ scrollTop: pos.top-150 });
    });

    // Process dropdown gallery filter
    $('#gallery-filter a').on('click touch', function(e) {
      e.preventDefault();
      if (_.isUndefined(sessionStorage.activefilter) == false) {
        delete(sessionStorage.activefilter);
      }
      $(window).trigger('updateFilter');
      var gallery = $(this).data('gallery');
      var g = $(this).html();
      studentlist.filter(function(item) {
        var terms = gallery.split(',');
        var match = false;
        for (var i = 0; i<terms.length; i++) {
          if (item.values().exhibitionlocation.replace('&amp;','&').toLowerCase().indexOf(terms[i].toLowerCase()) >= 0) match = true;
        }
        return match;
      });
      sessionStorage.activefilter = 'Gallery: ' + g.replace('Gallery', '');
      $(window).trigger('updateFilter');
      var pos = $('#students').offset();
      $('body').animate({ scrollTop: pos.top-150 });
    });

    // Process gallery list filter
    $('#galleries-data ul').each(function() {
      if (_.isUndefined($(this).data('gallery')) == false) {
        $galleries = $(this).find('li');
        $galleries.slice(0,($galleries.length-1)).on('click touch', function(e) {
          e.preventDefault();
          if (_.isUndefined(sessionStorage.activefilter) == false) {
            delete(sessionStorage.activefilter);
          }
          $(window).trigger('updateFilter');
          var gallery = $(this).parent().data('gallery');
          studentlist.filter(function(item) {
            var terms = gallery.split(',');
            var match = false;
            for (var i = 0; i<terms.length; i++) {
              if (item.values().exhibitionlocation.replace('&amp;','&').toLowerCase().indexOf(terms[i].toLowerCase()) >= 0) match = true;
            }
            return match;
          });
          sessionStorage.activefilter = 'Gallery: ' + gallery.split(',').join(', ');
          $(window).trigger('updateFilter');
          var pos = $('#students').offset();
          $('body').animate({ scrollTop: pos.top-150 });
        });
      }
    });

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

    // this should fix an annoying issue in FF with the single images not fitting their container properly.
    // except I don't know where to put this! damn!
    var siih = $('#singleimg img').height();
    var siiw = $('#singleimg img').width();
    if (siih >= siiw) {
        var sih = $('#singleimg').height();
        $('#singleimg img').height(sih);
    }
    if (siih <= siiw) {
        var siw = $('#singleimg').width();
        $('#singleimg img').width(siw);
    }

  });
});

// Parallax Scrolling for the SiteName -->
$(window).scroll(function(){
  var s = $(window).scrollTop();
  $("header > img.backgroundfill").css("transform","translateY(" + (s*-1.075) + "px)");

  if (s >= 400) {
    $('header .ontop .pattern').addClass('sticky');
  }

  else {
    $('header .ontop .pattern').removeClass('sticky');
  }
});
