$(document).ready(function() {



	//pretty scroll
	$(" a.scroll").on('click touch', function(event){
	      event.preventDefault();
	      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 700);
	});

    $(window).scroll(function () {
    	if( $('#dynamic-pages').css('display') == 'block') {
            $('#back-to-bottom').fadeIn();
        } else {
            $('#back-to-bottom').fadeOut();
        }
    });

    $( "div#behance-magix" )
	  .mouseenter(function() {
	    $('#back-to-bottom').fadeOut();
	  })

    if ($("div#behance-magix").scrollTop() > 0) {
        $('#back-to-bottom').fadeOut();
    } 

	  // .mouseleave(function() {
	  //   $( this ).find( "span" ).text( "mouse leave" );
	  // });
    // scroll body to 0px on click
    // $('#back-to-bottom').click(function () {
    //     $('#back-to-bottom').tooltip('hide');
    //     $('body,html').animate({
    //         scrollTop: 0
    //     }, 800);
    //     return false;
    // });
        
    $('#back-to-bottom').tooltip('show');

	
	var url = 'https://api.behance.net/v2/users/sallymaier/projects/?api_key=qQRlBnCFszvGLbGHpVGfwoId7RnIPLjm&per_page=25&callback=?';
	/* some issue where no more than 25 can be returned at a time, there are ways to ask for more? https://help.behance.net/hc/communities/public/questions/202357274-Number-of-Behance-API-request-results-limited-to-25- */
	console.log('connected to ' + url + '.');

	

		var matchingHeights = function() {
		var pHeight = 0;
		$('.project').each(function() {
		  var projectID  = $(this).find('a.wrapping').attr('data-project-id');
		  pHeight = pHeight > $(this).height() ? pHeight : $(this).height();
		  console.log('Number ' + projectID + ' is ' + pHeight + ' px tall!');
		});
		$('.project').each(function() {
		  $(this).height(pHeight);
		});
		}

		var imageHeights = function() {
		var imgHeight = 0;
		$('.project img').each(function() {
		  var projectID  = $(this).attr('data-project-id');
		  imgHeight = imgHeight > $(this).height() ? imgHeight : $(this).height();
		  console.log('Number ' + projectID + ' is ' + imgHeight + ' px tall!');
		});
		$('.project img').each(function() {
		  $('.wrapping').css({"height": imgHeight });
		});
		}

		var imageWidths = function() {
		var imgWidth = 0;
		$('.wrapping').each(function() {
		  var projectID  = $(this).attr('data-project-id');
		  imgWidth = imgWidth > $(this).width() ? imgWidth : $(this).width();
		  console.log('Number ' + projectID + ' is ' + imgWidth + ' px wide!');
		});
		$('.project img').each(function() {
		  $('.wrapping').css({"width": imgWidth });
		});
		}
	

	//for templated carousel. turned off.
	// $.getJSON(url, function(data) {
	
	// var template = $('#carousel-slides').html();
	// var info = Mustache.to_html(template, data);
	// $('#project-slides').html(info);

	//carousel stuff
		// var $item = $('.carousel .item'); 
		// var $wHeight = $(window).height();
		// $item.eq(0).addClass('active');
		// $item.height($wHeight); 
		// $item.addClass('full-screen');

		// $('.carousel img').each(function() {
		//   var $src = $(this).attr('src');
		//   var $color = $(this).attr('data-color');
		//   $(this).parent().css({
		//     'background-image' : 'url(' + $src + ')',
		//     'background-color' : $color
		//   });
		//   $(this).remove();
		// });

		// $(window).on('resize', function (){
		//   $wHeight = $(window).height();
		//   $item.height($wHeight);
		// });

		// $('.carousel').carousel({
		//   interval: 6000,
		//   pause: "false"
		// });

		// var $numberofSlides = $('.item').length;
		// var $currentSlide = Math.floor((Math.random() * $numberofSlides));

		// $('.carousel-indicators li').each(function(){
		//   var $slideValue = $(this).attr('data-slide-to');
		//   if($currentSlide == $slideValue) {
		//     $(this).addClass('active');
		//     $item.eq($slideValue).addClass('active');
		//   } else {
		//     $(this).removeClass('active');
		//     $item.eq($slideValue).removeClass('active');
		//   }
		// });
	// });  end of templated carousel


	$.getJSON(url, function(data) {

	//mustache for projects
	var template = $('#project-cards').html();
	var info = Mustache.to_html(template, data);
	$('#behance-magix').html(info);

	$('#container').imagesLoaded()
	  .done( function( instance ) {
	    console.log('all images successfully loaded');
	  })


		function isMobile() {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			}

			if (!isMobile()) {
			/// try to get all the things printing out @ the same height.
				$('#behance-magix').imagesLoaded( function() {

					  matchingHeights();

					  imageHeights();

					  imageWidths();
			    });

			}



		

		

		$('.project a').on('click touch',function() {
		 var projectID  = $(this).attr('data-project-id');
		 var projectUrl = 'https://api.behance.net/v2/projects/' + projectID + '/?api_key=qQRlBnCFszvGLbGHpVGfwoId7RnIPLjm&callback=?';
		 console.log('trying to show ' + projectUrl + '.');
		 $('html, body').animate({
		        scrollTop: $("#dynamic-pages").offset().top
		    }, 2000);
		 $("#dynamic-pages").slideDown("slow");


		  $.getJSON(projectUrl, function(data) {
		    //mustache for projects
		    var template = $('#project-page').html();
		    var info = Mustache.to_html(template, data);
		    $('#dynamic-pages').html(info);
		    $('div.text *').removeAttr('style');

		    var iframe = $('iframe')[0],
            player = $f(iframe),
            status = $('.status');

            player.addEvent('ready', function() {
                player.api('pause');
            });





		    $('.close-project a').on('click touch', function() {
		    	console.log('trying to close.');
		      	$("#dynamic-pages").slideToggle("slow");

		    });
		  });
		});
	});
	
	function isMobile() {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			}

			if (!isMobile()) {
			/// try to get all the things printing out @ the same height.
				$(window).resize(function(){
				    $('.wrapping').css({"height": ""});
				    $('.wrapping').css({"width": ""});
					$('.project').css({"height": ""});
				    imageHeights();
				    imageWidths();
				   	matchingHeights();
				});

			}





		
});


