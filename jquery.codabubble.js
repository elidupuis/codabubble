/*!
 * jQuery Codabubble Plugin
 * http://github.com/elidupuis
 *
 * Copyright 2010, Eli Dupuis
 * Version: 0.3
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.2 or later
 * Based heavily on Remy Sharp's snippet at http://jqueryfordesigners.com/coda-popup-bubbles/
 */

(function($) {

  var ver = '0.3';
    
  var methods = {
    init: function( options ) {
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend({}, $.fn.codabubble.defaults, options),
            data = $this.data('codabubble');


        // If the plugin hasn't been initialized yet
        if ( ! data ) {

          var defaultCSS = {
            'up': {
              top: -30,
              display: 'block'
            },
            'down': {
              bottom: -30,
              display: 'block'
            }
          },
          css = defaultCSS[ opts.direction ],
          animateInCSS, animateOutCSS, cssDirection;

          switch ( opts.direction ) {
            case 'down' :
              animateInCSS = {
                bottom: '-=' + opts.distance + 'px',
                opacity: 1
              };
              animateOutCSS = {
                bottom: '-=' + opts.distance + 'px',
                opacity: 0
              };
              break;
            default : 
              animateInCSS = {
                top: '-=' + opts.distance + 'px',
                opacity: 1
              };
              animateOutCSS = {
                top: '-=' + opts.distance + 'px',
                opacity: 0
              };
              break;
          };

          var hideDelayTimer = null,
              beingShown = false, // tracker
              shown = false;

          var trigger = $(opts.triggerClass, this),
              popup = $(opts.popupClass, this).css('opacity', 0);

          // set the mouseover and mouseout on both element
          $([trigger.get(0), popup.get(0)]).bind({
            mouseover: function () {
              // stops the hide event if we move from the trigger to the popup element
              if (hideDelayTimer) {
                clearTimeout(hideDelayTimer);
              };

              // don't trigger the animation again if we're being shown, or already visible
              if (beingShown || shown) {
                return;
              } else {
                beingShown = true;
               // reset position of popup box

               popup.css( css )

               // (we're using chaining on the popup) now animate it's opacity and position
               .animate(animateInCSS, opts.time, 'swing', function() {
                 // once the animation is complete, set the tracker variables
                 beingShown = false;
                 shown = true;
               });
             }
            },
            mouseout: function () {
             // reset the timer if we get fired again - avoids double animations
             if (hideDelayTimer) {
               clearTimeout(hideDelayTimer);
             };
            
             // store the timer so that it can be cleared in the mouseover if required
             hideDelayTimer = setTimeout(function () {
               hideDelayTimer = null;
               popup.animate(animateOutCSS, opts.time, 'swing', function () {
                 // once the animate is complete, set the tracker variables
                 shown = false;
                 // hide the popup entirely after the effect (opacity alone doesn't do the job)
                 popup.hide();
               });
             }, opts.hideDelay);
            }
          });


          //  attach
          $(this).data('codabubble', {
            target : $this,
            opts: opts
          });

        };
      });
    },
    update: function() {
      // to be implemented....
      if(window.console) window.console.log('update called.');
    }
  };


  $.fn.codabubble = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.codabubble' );
    };
  };

  //	defaults
  $.fn.codabubble.defaults = {
  	distance: 10,
    time: 250,
    hideDelay: 500,
    direction: 'up',
    triggerClass: '.trigger',
    popupClass: '.popup'
  };

  $.fn.codabubble.ver = function() { return "jquery.codabubble ver. " + ver; };

})(jQuery);