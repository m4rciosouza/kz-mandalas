'use strict';

var GameScreen = {

	qtyMandalas : 32,
	colors : [
		'#008000', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', 
		'#808080', '#800000', '#000080', /*'#808000',*/ '#800080', 
		'#FF0000', '#C0C0C0', '#008080', '#FFFF00', '#FFA500'
	],

	init : function() {
		this.buildMandalasImages();
		this.buildColorButtons();
		this.addMandalaImgClick();
		this.addHomeButtonClick();
	},

	buildMandalasImages : function() {
		var qtyMandalas = this.qtyMandalas;
		while( qtyMandalas > 0 ) {
			$( '.img-mandalas' ).prepend( 
				'<div class="col-xs-6 col-sm-6 col-md-3 col-lg-2">' + 
					'<img src="images/mandalas/mandala' + qtyMandalas + '.png" alt="Mandala" ' + 
						'class="img-thumbnail img-responsive center-block link-mandala">' +
				'</div>'
			);
			qtyMandalas --;
		}
	},

	buildColorButtons : function() {
		for( var i = 0; i < this.colors.length; i ++ ) {
			$( '.btn-colors' ).append( 
				'<button class="btn btn-color" data-color="' + this.colors[ i ] + 
					'" style="background-color: ' + this.colors[ i ] + '">&nbsp;</button>'
			);
		}
	},

	addMandalaImgClick : function() {
		$( '.link-mandala' ).each( function() {
			$( this ).click( function() {
				$( '.home-screen' ).hide();
				$( '.painting-screen' ).show();
				var outlineImageSrc = $( this ).attr( 'src' );
				GameCanvas.init( outlineImageSrc );
			});
		});
	},

	addHomeButtonClick : function() {
		$( '.btn-home' ).click( function() {
			$( '.home-screen' ).show();
			$( '.painting-screen' ).hide();
		});
	}
};