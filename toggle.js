/**
 * Via handle, toggle a panel. Used together with e.g. dropdown + overlay. Tested
 * on IE10+.
 *
 * @author Andreas Nymark <andreas@nymark.me>
 * @license MIT
 * @version 3
**/
var merl = merl || {};

merl.toggle = ( function( window, document ) {
	"use strict";


	var defs = {
			all: [],
			event: 'click',
			selectElem: '.Toggle',
			selectHandle: '.Toggle-handle',
			selectPanel: '.Toggle-panel',
			expanded: 'is-expanded',
			dataAttr: 'data-toggle',
			selectFocus: 'input, a',
			autoClose: true,
			keepOpen: false
		},
		instances = [],
		eventOpen = document.createEvent( 'Event' ),
		eventClose = document.createEvent( 'Event' );

	eventOpen.initEvent( 'merl.toggle.open', true, true);
	eventClose.initEvent( 'merl.toggle.close', true, true);


	/**
	 * Initiate plugin
	 *
	 * @method init
	 * @param {Object} options - override default settings
	**/
	var init = function( options ) {
		if( options ) {
			for( var o in options ) {
				defs[ o ] = options[ o ];
			}
		}
		defs.all = document.querySelectorAll( defs.selectElem );
		window.addEventListener( 'keydown', escapeToggle );
		setup();
	};


	/**
	 * Setup. Parse options, construct Toggles and keep a reference in
	 *
	 * @method setup
	**/
	var setup = function() {
		for ( var i = 0; i < defs.all.length; i++ ) {
			var each = defs.all[ i ],
				handle = each.querySelector( defs.selectHandle ),
				event = defs.event,
				alternate = null,
				limelight = defs.selectFocus,
				data = each.getAttribute( defs.dataAttr );

			if ( data ) {
				var d = JSON.parse( data );
				if( d.event ) event = d.event;
				if( d.handle ) handle = d.handle;
				if( d.alternate ) alternate = d.alternate;
				if( d.focus ) limelight = d.focus;
			}

			instances.push( new Toggle( each, event, handle, alternate, limelight ));
		}
		document.addEventListener( defs.event, handleKill );
	};


	/**
	 * Contructor
	 *
	 * @constructor Toggle
	 * @param {HTMLElement} parent -
	 * @param {MouseEvent} event - Event on handle
	 * @param {HTMLElement} handle - Handler of toggle
	 * @param {String} alternate - Alternative text when toggle is expanded
	 * @param {String} limelight - Element to focus on when panel is visible
	**/
	var Toggle = function ( parent, event, handle, alternate, limelight ) {
		var t = this;
		t.parent = parent;
		t.event = event;
		t.handle = handle;
		t.panel = t.parent.querySelector( defs.selectPanel );
		t.textDefault = handle.innerHTML;
		t.textAlternate = alternate;
		t.limelight = t.parent.querySelector( limelight );
		t.handle.addEventListener( t.event, t.handleTrigger.bind( t ) );
		t.handleLive();
	};


	Toggle.prototype = {


		/**
		 * Reset handle by removing expanded class and reset handle text to default.
		 *
		 * @method handleReset
		**/
		handleReset: function () {
			var t = this;
			if ( t.textAlternate ) t.handle.innerHTML = t.textDefault;
			if ( t.parent.classList.contains( defs.expanded ) ) {
				t.parent.classList.remove( defs.expanded );
				t.parent.dispatchEvent( eventClose );
				t.handle.focus();
			}
			t.handle.setAttribute( 'aria-expanded', 'false' );
			t.panel.setAttribute( 'aria-hidden', 'true' );
		},


		/**
		 * Changes ARIAs for each state and dispatch event.
		 *
		 * @method handleState
		**/
		handleState: function () {
			var t = this;
			if( t.parent.classList.contains( defs.expanded ) ) {
				t.handle.setAttribute( 'aria-expanded', 'true' );
				t.panel.setAttribute( 'aria-hidden', 'false' );
				t.parent.dispatchEvent( eventOpen );
			} else {
				t.handle.setAttribute( 'aria-expanded', 'false' );
				t.panel.setAttribute( 'aria-hidden', 'true' );
				t.parent.dispatchEvent( eventClose );
			}
		},


		/**
		 * When handle is triggered, toggle expanded class and set alternate text. Also
		 * reset all other toggles.
		 *
		 * @method handleTrigger
		 * @param {MouseEvent} evt - Mouse event
		**/
		handleTrigger: function ( evt ) {
			var t = this;
			if( t.event === defs.event ) {
				t.parent.classList.toggle( defs.expanded );
				t.handleState();
			}
			if( t.limelight ) {
				t.limelight.focus();
			}
			if( t.textAlternate && t.handle.innerHTML === t.textDefault ) {
				t.handle.innerHTML = t.textAlternate;
			} else if( t.textAlternate && t.handle.innerHTML === t.textAlternate ) {
				t.handle.innerHTML = t.textDefault;
			}
			for ( var i = 0; i < instances.length; i++ ) {
				var toggle = instances[ i ];
				if( toggle !== this && !defs.keepOpen ) {
					toggle.handleReset();
				}
			}
			evt.preventDefault();
		},


		/**
		 * Add ARIA if handle changes label.
		 *
		 * @method handleLive
		**/
		handleLive: function () {
			var t = this;
			if ( t.textAlternate ) t.handle.setAttribute( 'aria-live', 'polite' );
		},
	};


	/**
	 * Remove all open toggles
	 *
	 * @method handleKill
	 * @param {MouseEvent} evt - Mouse event
	**/
	var handleKill = function ( evt ) {
		for ( var i = 0; i < instances.length; i++ ) {
			var toggle = instances[ i ];
			if( !toggle.parent.contains( evt.target ) && defs.autoClose && !defs.keepOpen ) {
				toggle.handleReset();
			}
		}
	};


	/**
	 * Remove all open toggles
	 *
	 * @method handleKill
	 * @param {MouseEvent} evt - Mouse event
	**/
	var closeAllToggles = function ( evt ) {
		for ( var i = 0; i < instances.length; i++ ) {
			var toggle = instances[ i ];
			toggle.handleReset();
		}
	};


	/**
	 * Remove all open toggles when user press escape key.
	 *
	 * @method escapeToggle
	 * @param {KeyEvent} evt - Key event
	**/
	var escapeToggle = function ( evt ) {
		if ( evt.keyCode === 27 ) {
			closeAllToggles();
		}
	};


	return {
		init: init,
		closeAll: handleKill,
		closeAllToggles: closeAllToggles,
	};

}( window, document ));
