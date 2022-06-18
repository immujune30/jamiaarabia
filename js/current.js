var fixed_menu = true;
window.jQuery = window.$ = jQuery;

//<![CDATA[
	jQuery(window).load(function(){
		"use strict";
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	})
//]]>

/* Custom Scripts */
function calculateScroll() {
	"use strict";
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu li.scrollable').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scrollable')
			.removeClass('active')
			.eq(i).addClass('active');
			
			$('#top .navmenu li').first().addClass('active');
			jQuery('.mobile_menu_wrapper').css({'display' : 'none'});			
		}
	})
};

function menu_update() {
	"use strict";
	if (jQuery(window).width() > 767) {
		jQuery('nav.navmenu li a').css({'line-height': jQuery('#logo').height() + 'px'});		
	} else {
		jQuery('nav.navmenu li a').css({'line-height': 'auto'});		
	}
}

function fullwidthslider() {
	"use strict";
	var full_slider_w = jQuery(window).width();
	if (jQuery(window).width() > 767) {
		var full_slider_h = jQuery(window).height();
	} 
	else {
		var full_slider_h = jQuery(window).width()*0.7;
	}
		
	jQuery('.full_slider .flexslider, .full_slider .flexslider li').css({'width': full_slider_w, 'height': full_slider_h});	
	jQuery('.full_slider, .full_slider .flexslider li img.slide_bg').attr('style', 'height: '+full_slider_h+'px');		
	jQuery('.full_slider').css({'min-height': full_slider_h + 'px'});
};

jQuery(document).ready(function() {
	"use strict";
	
	fullwidthslider();
	
	calculateScroll();

	$('.causes-item .info .collect-remaining').hide();
	
	$('.causes-item').each(function(){
		var block = $(this);
		block.find('.img-wrap').hover(function(){

		block.find('.info .text').hide();
			block.find('.info .collect-remaining').fadeIn(0);
		},
		function(){
			block.find('.info .text').fadeIn(0);
			block.find('.info .collect-remaining').hide();
		});
	});
	

	//Fixed Menu
	if (jQuery('.fixed-menu').size() && fixed_menu == true) {		
		jQuery('.fixed-menu').append('<div class="fixed-menu-wrapper">'+jQuery('#top header').html()+'</div>');
		$('.fixed-menu .navmenu li').first().removeClass('active');
		jQuery('.fixed-menu').find('.menu').children('li').each(function(){
			jQuery(this).children('a').append('<div class="menu_fadder"/>');
		});
		var fixd_menu = setInterval(scrolled_menu, 10);
	}
	
	//MobileMenu
	jQuery('#top header').append('<a href="javascript:void(0)" class="menu_toggler"/>');
	jQuery('#top').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});
		
	
	$(window).scroll(function(event) {
		calculateScroll();
	});
	
	$('.navmenu ul li.scrollable a, .mobile_menu ul li.scrollable a, .next_section, #logo a, .go_section, .logo-bottom a').click(function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - jQuery('#logo').height() - 38}, 1000);
		return false;
	});

		
	// prettyPhoto
	$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
	
	jQuery('.full_slider .flexslider li img.slide_bg').each(function(){
		jQuery(this).parent().attr('style', 'background-image:url('+$(this).attr('src')+');');		
	});
			
	jQuery('.full_slider .flexslider').flexslider({
        slideshow: true,
		slideshowSpeed: 4000,
		animation: "fade",
		controlNav: true,
		pauseOnHover: false,
		directionNav: true

    });
	
	
	// contact form
	jQuery("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					jQuery("#fields").hide();
				} else {
					var result = msg;
				}
				jQuery('#note').html(result);
			}
		});
		return false;
	});
	
	
	menu_update();	
			
});

jQuery(window).load(function(){
	"use strict";
		
	fullwidthslider();
	
	menu_update();
	
	jQuery('.full_slider').removeClass('preloader');
	jQuery('.next_section').removeClass('hide');
});


jQuery(window).resize(function(){	
	"use strict";
	
	fullwidthslider();
	
	menu_update();
			
});

function scrolled_menu() {
	
	if (jQuery(window).scrollTop() > (jQuery(window).height() - jQuery('#logo').height() - 39)) {
		jQuery('.fixed-menu').addClass('fixed_show');
	} else {
		jQuery('.fixed-menu').removeClass('fixed_show');
	}
};


/*===========================================================*/
/*	MEMORIES FULL WIDTH
/*===========================================================*/

	function portfolioCol() {
		"use strict"; 
		var width = $(window).width(),
			column = 1;           
		
		if (width > 1500) {
			column = 4;
		} else if (width > 1200) {
			column = 4;
		} else if (width > 1000) {
			column = 4;
		} else if (width > 768) {
			column = 4;
		} else if (width > 480) {
			column = 2;	
		} else if (width > 0) {
			column = 1;
		}

		return column;
	}       
	
	function setCol() {
		"use strict"; 
		if (!$('.memories-list').length) return false

		var width = $(window).width(); 
		var	column = portfolioCol(); 
		var	divWidth = Math.floor(width/column);
		
		$('.memories-list li').each(function () { 
			$(this).css( { 
				width : divWidth + 'px' 
			});
		});
	}   
			
	setCol();
	jQuery(document).ready(function() {
		"use strict";
		setCol();
	});
	jQuery(window).resize(function() {
		"use strict";
		setCol();
	});
	jQuery(window).bind('resize', function () {
		"use strict"; 
		setCol();    
	});
