if ( 'undefined' === typeof window.usr ) {
	window.usr = {};
}

( function( usr ) {
	'use strict';

	usr.theme = {};
})( usr );

(function( $ ) {
	'use strict';

	var timer;
	var $fb = $( '.fb-page' );

	$( window ).on( 'load resize', function() {
		if ( ! timer ) {
			timer = setTimeout( function() {
				$fb.attr( 'data-width', $fb.width() );

				FB.XFBML.parse();

				timer = null;
			}, 300 );
		}
	} );

	$( '.context-height .eq-height' ).matchHeight();

	$( '.section-carousel' ).slick({
		autoplay: true,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}
		]
	});

	$( '.column-carousel' ).slick({
		arrows: false,
		autoplay: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToScroll: 2,
					slidesToShow: 2
				}
			}
		],
		slidesToScroll: 3,
		slidesToShow: 3
	});
})( jQuery );
