'use strict';

var GameEvents = {

	init : function() {
		this.addColorButtonsClick();
		this.addSizeButtonsClick();
		this.addToolButtonsClick();
		this.addMouseDown();
		this.addMouseMove();
		this.addMouseUp();
		this.addMouseLeave();
		GameCanvas.canvas.addEventListener( 'touchstart', this.addTouchStart );
		GameCanvas.canvas.addEventListener( 'touchend', this.addTouchEnd );
		GameCanvas.canvas.addEventListener( 'touchleave', this.addTouchEnd );
		GameCanvas.canvas.addEventListener( 'touchmove', this.addTouchMove );
	},

	addColorButtonsClick : function() {
		$( '.btn-color' ).removeClass( 'btn-border-sel' ).first().addClass( 'btn-border-sel' );
		$( '.btn-color' ).click( function() {
			$( '.btn-color' ).removeClass( 'btn-border-sel' );
			GameCanvas.curColor = $( this ).attr( 'data-color' );
			$( this ).addClass( 'btn-border-sel' );
		});
	},

	addSizeButtonsClick : function() {
		$( '.btn-size' ).removeClass( 'btn-primary' ).first().addClass( 'btn-primary' );
		$( '.btn-size' ).click( function() {
			$( '.btn-size' ).removeClass( 'btn-primary' );
			GameCanvas.curSize = $( this ).attr( 'data-size' );
			$( this ).addClass( 'btn-primary' );
		});
	},

	addToolButtonsClick : function() {
		$( '.btn-tool' ).removeClass( 'btn-primary' ).first().addClass( 'btn-primary' );
		$( '.btn-tool' ).click( function() {
			$( '.btn-tool' ).removeClass( 'btn-primary' );
			GameCanvas.curTool = $( this ).attr( 'data-tool' );
			$( this ).addClass( 'btn-primary' );
		});
	},

	addTouchStart : function( e ) {
		e.preventDefault();
		var posX = e.targetTouches[ 0 ].pageX - this.offsetLeft;
		var posY = e.targetTouches[ 0 ].pageY - this.offsetTop;
		GameCanvas.handleClick( posX, posY );
	},

	addTouchEnd : function( e ) {
		e.preventDefault();
		GameCanvas.paint = false;
	},

	addTouchMove : function( e ) {
		e.preventDefault();
	  	var posX = e.targetTouches[ 0 ].pageX - this.offsetLeft;
		var posY = e.targetTouches[ 0 ].pageY - this.offsetTop;
	  	GameCanvas.handleMove( posX, posY );
	},

	addMouseDown : function() {
		$( '#canvas' ).mousedown( function( e ) {
		  	var posX = e.pageX - this.offsetLeft;
		  	var posY = e.pageY - this.offsetTop;
			GameCanvas.handleClick( posX, posY );
		});
	},

	addMouseMove : function() {
		$( '#canvas' ).mousemove( function( e ) {
		  	if( GameCanvas.paint ) {
		    	var posX = e.pageX - this.offsetLeft;
		  		var posY = e.pageY - this.offsetTop;
		    	GameCanvas.handleMove( posX, posY );
		  	}
		});
	},

	addMouseUp : function() {
		$( '#canvas' ).mouseup( function( e ) {
		  	GameCanvas.paint = false;
		});
	},

	addMouseLeave : function() {
		$( '#canvas' ).mouseleave( function( e ) {
		  	GameCanvas.paint = false;
		});
	},
};