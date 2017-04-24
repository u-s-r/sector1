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

	function addMarker( position, map ) {
		new google.maps.Marker({
			position: position,
			map: map,
			icon: {
				url: usr.map.icon,
				scaledSize: new google.maps.Size( 96, 96 )
			}
		});
	}

	window.initMap = function() {
		var map = new google.maps.Map( document.getElementById( 'usr-map' ), {
			center: {
				lat: 0,
				lng: 0
			},
			disableDefaultUI: true,
			scrollwheel: false,
			styles: [
				{
					'featureType': 'all',
					'elementType': 'labels.text.fill',
					'stylers': [
						{
							'saturation': 36
						},
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 80
						}
					]
				},
				{
					'featureType': 'all',
					'elementType': 'labels.text.stroke',
					'stylers': [
						{
							'visibility': 'on'
						},
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 16
						}
					]
				},
				{
					'featureType': 'all',
					'elementType': 'labels.icon',
					'stylers': [{
						'visibility': 'off'
					}]
				},
				{
					'featureType': 'administrative',
					'elementType': 'geometry.fill',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 20
						}
					]
				},
				{
					'featureType': 'administrative',
					'elementType': 'geometry.stroke',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 17
						},
						{
							'weight': 1.2
						}
					]
				},
				{
					'featureType': 'landscape',
					'elementType': 'geometry',
					'stylers': [
						{
						'color': '#5e6d7b'
						},
						{
							'lightness': 20
						}
					]
				},
				{
					'featureType': 'poi',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 21
						}
					]
				},
				{
					'featureType': 'road.highway',
					'elementType': 'geometry.fill',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 17
						}
					]
				},
				{
					'featureType': 'road.highway',
					'elementType': 'geometry.stroke',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 29
						},
						{
							'weight': 0.2
						}
					]
				},
				{
					'featureType': 'road.arterial',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 18
						}
					]
				},
				{
					'featureType': 'road.local',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 16
						}
					]
				},
				{
					'featureType': 'transit',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 19
						}
					]
				},
				{
					'featureType': 'water',
					'elementType': 'geometry',
					'stylers': [
						{
							'color': '#5e6d7b'
						},
						{
							'lightness': 17
						}
					]
				}
			],
			zoom: 1,
			zoomControl: true
		});

		var overlay = new google.maps.OverlayView();
		var bounds = new google.maps.LatLngBounds();

		addMarker( usr.map.position, map );

		bounds.extend( new google.maps.LatLng(
			usr.map.position.lat,
			usr.map.position.lng
		) );

		overlay.draw = function() {};

		overlay.onAdd = function() {
			var center, projection = this.getProjection();

			center    = projection.fromLatLngToContainerPixel( bounds.getCenter() );
			center.y -= 60;

			map.setCenter( projection.fromContainerPixelToLatLng( center ) );
		};

		overlay.setMap( map );

		map.setZoom( 16 );
	};
})( jQuery );
