$(window).load(function(){
	var contW = $(window).width(); 		
	$('.memories-list').width(contW);
	 var $container = $('.memories-list');
	// init
	$container.isotope({
	  // options
	  itemSelector: '.memories-list li',
	  layoutMode: 'fitRows',
	  filter: '*',
	  animationEngine: 'best-available',
	  transitionDuration: '0.8s',
	})
	//.append( elem )
    //.isotope( 'appended', elem )
    //.isotope('layout')
	;
  
	$('#filters').on( 'click', 'a', function() {
	  var filterValue = $(this).attr('data-filter');
	  $container.isotope({ filter: filterValue });
	});
	
	
$('.memories-list li').find('img').load(function(){
	setCol();
	$container.isotope('reLayout');
});	
});

jQuery(window).load(function(){		
	"use strict";	
	jQuery('.memories-list').isotope('reLayout');
	setTimeout("jQuery('.memories-list').isotope('reLayout')", 500);		
});
jQuery(window).resize(function(){
	"use strict";
	jQuery('.memories-list').isotope('reLayout');	
});
