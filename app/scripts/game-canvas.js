'use strict';

var GameCanvas = {

	initDefaultValues : function() {
		this.clickX = []; // click and painting controls
		this.clickY = [];
		this.clickDrag = [];
		this.clickUndo = [];
		this.curColor = '#008000'; // colors control
		this.clickColor = [];
		this.clickSize = []; // sizes control
		this.curSize = '1';
		//this.clickTool = []; // tools control
		this.curTool = 'normal';
		this.crayonTextureImage = new Image();
		this.outlineImage = new Image(); // outline image control
	},

	init : function( outlineImageSrc ) {
		this.initDefaultValues( outlineImageSrc );
		this.crayonTextureImage.src = 'images/crayon-texture.png';
		this.outlineImage.src = outlineImageSrc;
		this.canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
		this.defineCanvasSize();
		this.context = this.canvas.getContext( '2d' );
		GameEvents.init();
		setTimeout( function() { GameCanvas.redraw(); }, 500);
		return this;
	},

	defineCanvasSize : function() {
		var height = window.innerHeight - 150;
		var width = window.innerWidth - 20;
		if( height < width ) {
			this.canvas.width = height;
			this.canvas.height = height;
		} else {
			this.canvas.width = width;
			this.canvas.height = width;
		}
	},

	addClick : function( x, y, dragging ) {
	  	this.clickX.push( x );
	  	this.clickY.push( y );
	  	this.clickDrag.push( dragging );
	  	if( this.curTool === 'eraser' ) {
		    this.clickColor.push( 'white' );
		} else {
		    this.clickColor.push( this.curColor );
		}
	  	this.clickSize.push( this.curSize );
	},

	redraw : function() {
	  	this.context.clearRect( 0, 0, this.context.canvas.width, this.context.canvas.height );
	  
	  	this.context.lineJoin = 'round';
				
	  	for( var i = 0; i < this.clickX.length; i ++ ) {		
	    	this.context.beginPath();
	    	if( this.clickDrag[ i ] && i ) {
	      		this.context.moveTo( this.clickX[ i - 1 ], this.clickY[ i - 1 ] );
	     	} else {
	       		this.context.moveTo( this.clickX[ i ] - 1, this.clickY[ i ] );
	     	}
	     	this.context.lineTo( this.clickX[ i ], this.clickY[ i ] );
	     	this.context.closePath();
	     	this.context.strokeStyle = this.clickColor[ i ];
	     	this.context.lineWidth = this.clickSize [ i ];
	     	this.context.stroke();
	  	}

	  	if( this.curTool === 'crayon' ) {
    		this.context.globalAlpha = 0.4;
    		this.context.drawImage( this.crayonTextureImage, 0, 0, this.context.canvas.width, this.context.canvas.height );
  		}
  		this.context.globalAlpha = 1;
		
		this.context.drawImage( this.outlineImage, 0, 0, this.context.canvas.width, this.context.canvas.height );
	},

	handleClick : function( posX, posY ) {
		this.paint = true;
		this.addClick( posX, posY );
		this.clickUndo.push(1);
		this.redraw();
	},

	handleMove : function( posX, posY ) {
		if( this.paint ) {
	    	this.addClick( posX, posY, true );
	    	var clickUndoTail = this.clickUndo.length - 1;
	    	this.clickUndo[ clickUndoTail ] ++;
	    	this.redraw();
	  	}
	}
};