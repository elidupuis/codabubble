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

  var ver = '0.3',
  methods = {
    init: function( options ) {
      // iterate and reformat each matched element
    	return this.each(function() {
    		var $this = $(this),
    		    opts = $.extend({}, $.fn.codabubble.defaults, options),
            data = $this.data('codabubble');

        // If the plugin hasn't been initialized yet
        if ( ! data ) {

          var hideDelayTimer = null,
              beingShown = false, // tracker
              shown = false;

          var trigger = $(opts.triggerClass, this),
              popup = $(opts.popupClass, this).css('opacity', 0);

          // var defaultCSS = {
          //             'up': {
          //               top: '-' + popup.height() + 'px',
          //               display: 'block'
          //             },
          //             'down': {
          //               bottom: '-' + popup.height() + 'px',
          //               display: 'block'
          //             },
          //             'left': {
          //               left: '-' + popup.width() + 'px',
          //               display: 'block'
          //             },
          //             'right': {
          //               right: '-' + popup.width() + 'px',
          //               display: 'block'
          //             }
          //           },
          var defaultCSS = {
            'up': {
              top: '-' + opts.offset + 'px',
              display: 'block'
            },
            'down': {
              bottom: '-' + opts.offset + 'px',
              display: 'block'
            },
            'left': {
              left: '-' + opts.offset + 'px',
              display: 'block'
            },
            'right': {
              right: '-' + opts.offset + 'px',
              display: 'block'
            }
          },
          css = defaultCSS[ opts.direction ],
          directionProperty;

          switch ( opts.direction ) {
            case 'left' :
              directionProperty = 'left';
              break;
            case 'right' :
              directionProperty = 'right';
              break;
            case 'down' :
              directionProperty = 'bottom';
              break;
            default : 
              directionProperty = 'top';
              break;
          };

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
               
               var animCSS = {
                 opacity: 1
               };
               animCSS[directionProperty] = '-=' + opts.distance + 'px';
               
               popup.css( css ).animate(animCSS, opts.time, 'swing', function() {
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

                var animCSS = {
                  opacity: 0
                };
                animCSS[directionProperty] = '-=' + opts.distance + 'px';
               
                popup.animate(animCSS, opts.time, 'swing', function () {
                  shown = false; // once the animate is complete, set the tracker variables
                  popup.hide();  // hide the popup entirely after the effect (opacity alone doesn't do the job)
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
  	distance: 10,             //  distance traveled by bubble during animation.
  	offset: 0,                //  offset distance 
    time: 250,                //  milliseconds. duration of the animation.
    hideDelay: 500,           //  milliseconds. time before bubble fades out (after mouseout)
    direction: 'up',          //  either 'left', 'right', down' or 'up'
    triggerClass: '.trigger', //  class of the trigger (in your markup)
    popupClass: '.popup'      //  class of the bubble (in your markup)
  };

  $.fn.codabubble.ver = function() { return "jquery.codabubble ver. " + ver; };

})(jQuery);