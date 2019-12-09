$(document).ready(function() {
    
    $("body").fadeIn(1500);
    $("body").addClass('stop_animation');
    let interval;
    function visible_body(){
        interval = setInterval(function tick() {
          console.log('tick');
          if($("body").hasClass('stop_animation')){
              $("body").addClass('visible');
              clearInterval(interval);
          }
        }, 100);
    }
    setTimeout(visible_body, 1600);

    var $grid = $('.works_overflow').isotope({
      itemSelector: '.section',
      layoutMode: 'fitRows',
      filter: '*'
    });
    
    function win_res(){
        window.dispatchEvent(new Event('resize'));
    }
    setTimeout(win_res, 1000);
    
    
    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
    
    // bind filter button click
    $('.main_menu').on( 'click', 'a', function() {
      var filterValue = $(this).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });
    
    
    

	var getURLParams = function() {
		var temp = {};
		var category;
		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
			var decode = function(s) {
				return decodeURIComponent(s.split("+").join(" "));
			};
			temp[decode(arguments[1])] = decode(arguments[2]);
		});
		return temp;
	};

	//Then, we'll take those parameters we temporarily saved and turn them into JS variables

	var $_GET = getURLParams();
	var mfilter = getURLParams()["filter"];
	if(mfilter){
	    if(mfilter == '*'){
	        $grid.isotope({ filter: '*' })
	    }
	    else {
    	    var fff = '.' + mfilter;
    		$grid.isotope({ filter: fff });
    		$('.main_menu a').removeClass('active');
    		$('.main_menu a' + fff).addClass('active');
    		setTimeout(portfolio_scroll, 500);
	    }
	}

	function portfolio_scroll(){
		$('html,body').stop().animate({ scrollTop: $('#portfolio').offset().top }, 0);
	}

	var res1 = true;
	var res2 = true;
	$(window).resize(function () {
		if ($(document).width() <= 767 && res1 === true) {
			$(".mm_link").removeClass('active');
			$('.main_menu').fadeOut(200);
			res1 = false;
			res2 = true;
		}
		else if ($(document).width() >= 768 && res2 === true) {
			$(".mm_link").removeClass('active');
			$('.main_menu').css('display', 'flex');
			res2 = false;
			res1 = true;
		}
	});



	$(".portfolio_filter a").click(function(event){
		if($(this).hasClass('active')){}
		else {
			if($(window).width() <= 767){
				$('.portfolio_filter').fadeOut(200);
			}
			$(".portfolio_filter a").removeClass('active');
			$(this).addClass('active');
			filter = $(this).attr('data-filter');
			
			
			
			anntop = Number($('.scroller').offset().top) - 1;
			$('html,body').stop().animate({ scrollTop: anntop }, 0);
			$('html,body').stop().animate({ scrollTop: anntop + 1 }, 0);
			$(window).trigger("scroll");
		}
	});

	$('.mm_link').click(function(e) {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.main_menu').fadeOut(0);
		}
		else {
			$(this).addClass('active');
			$(this).parent().find('.main_menu').fadeIn(200);
		}
	});
	
	$('.sl_block').click(function(e) {
		target = $(this).attr('data-target');
		$('html,body').stop().animate({ scrollTop: $('#'+target).offset().top }, 1600);
		e.preventDefault();
	});

	$('.portfolio_link').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $('#portfolio').offset().top }, 1600);
		e.preventDefault();
	});

	$('.contacts a').click(function(e) {
		e.stopPropagation();
	});

	$('#contacts_btn').click(function(e) {
		e.stopPropagation();
	});
	$('h1 a').click(function(e) {
		e.stopPropagation();
	});
	var page_closed = false;




	$("a.transition").click(function(event){
		event.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(1500);
		setTimeout(redirectPage, 1600);
		page_closed = true;
	});


	var timerId = setInterval(function() {
		if (page_closed === true){
			$("body").fadeIn(1500);
			page_closed = false;
		}
	}, 1000);

	window.onbeforeunload = function(e) {};

	function redirectPage() {
		window.location = linkLocation;
	}

	wow1 = new WOW().init();

	function afterReveal (el) {
		el.addEventListener('animationstart', function () {
			$(this).addClass('animation_end');
		});
	}










	function hide_loader(){
		$('.preloader_wp').fadeOut(1500);
		setTimeout(an_1, 1700);
		setTimeout(an_2, 1900);
	}

	$('.preloader_wp').each(function() {
		setTimeout(hide_loader, 3500);
	});
	function an_1(){
		$('.an_1').addClass('fadeInUp animated');
	}
	function an_2(){
		$('.an_2').addClass('fadeInUp animated');
		//$('.mci_btn').addClass('animated flash infinite')
	}

    //var scene = document.getElementById('scene');
    //var parallax = new Parallax(scene);



	$(function(){
		$("#twentytwenty").twentytwenty({
			default_offset_pct: 0.5, // How much of the before image is visible when the page loads
			no_overlay: true, //Do not show the overlay with before and after
			move_slider_on_hover: false, // Move slider on mouse hover?
			move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement.
			click_to_move: false // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
		});
	});





























});