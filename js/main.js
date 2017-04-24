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

	window.initMap = function() {
		var mymap = new google.maps.Map( document.getElementById( 'usr-map' ), {
			center: {
				lat: 0,
				lng: 0
			},
			disableDefaultUI: true,
			disableDoubleClickZoom: true,
			draggable: false,
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
			zoom: 1
		});

		var bounds = new google.maps.LatLngBounds();
		var latlng = new google.maps.LatLng(
			usr.map.position.lat,
			usr.map.position.lng
		);

		function CustomMarker( latlng, map, args ) {
			this.latlng = latlng;
			this.args = args;
			this.setMap( map );
		}

		CustomMarker.prototype = new google.maps.OverlayView();

		CustomMarker.prototype.draw = function() {
			var marker = this.marker;
			var pin = this.pin;
			var panes = this.getPanes();
			var point = this.getProjection().fromLatLngToDivPixel( this.latlng );

			if ( ! marker ) {
				marker = this.marker = document.createElement( 'div' );

				marker.className = 'mymarker';

				pin = this.pin = marker.cloneNode();
				pin.className = 'mypin';

				panes.overlayImage.appendChild( marker );
				panes.overlayImage.appendChild( pin );
			}

			if ( point ) {
				marker.style.left = point.x + 'px';
				marker.style.top  = point.y + 'px';

				pin.style.left = point.x + 'px';
				pin.style.top  = point.y + 'px';
			}
		};

		CustomMarker.prototype.getPosition = function() {
			return this.latlng;
		};

		CustomMarker.prototype.onAdd = function() {
			var projection = this.getProjection();
			var center = projection.fromLatLngToContainerPixel( bounds.getCenter() );

			center.y -= 60;

			mymap.setCenter( projection.fromContainerPixelToLatLng( center ) );
		};

		new CustomMarker( latlng, mymap, {} );

		bounds.extend( latlng );

		mymap.setZoom( 16 );
	};
})( jQuery );
