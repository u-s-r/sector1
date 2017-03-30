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
})( jQuery );
