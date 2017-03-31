if ( 'undefined' === typeof window.usr ) {
	window.usr = {};
}

( function( usr ) {
	'use strict';

	usr.theme = {};
})( usr );

(function( $ ) {
	'use strict';

	$( '.context-height .eq-height' ).matchHeight();

	$( '.carousel' ).slick({
		arrows: false,
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
