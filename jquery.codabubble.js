/*!
 * jQuery Codabubble Plugin
 * http://github.com/elidupuis
 *
 * Copyright 2010, Eli Dupuis
 * Version: 0.1 (Dec 14, 2010)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.4.2 or later
 * Based heavily on Remy Sharp's snippet at http://jqueryfordesigners.com/coda-popup-bubbles/
 */

(function($) {

  var ver = '0.1';

  $.fn.codabubble = function(options) {

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

        // set the mouseover and mouseout on both element
        $([trigger.get(0), popup.get(0)]).mouseover(function () {
         // stops the hide event if we move from the trigger to the popup element
         if (hideDelayTimer) clearTimeout(hideDelayTimer);

         // don't trigger the animation again if we're being shown, or already visible
         if (beingShown || shown) {
           return;
         } else {
           beingShown = true;

           // reset position of popup box
           popup.css(opts.popupStyle)

           // (we're using chaining on the popup) now animate it's opacity and position
           .animate({
             top: '-=' + opts.distance + 'px',
             opacity: 1
           }, opts.time, 'swing', function() {
             // once the animation is complete, set the tracker variables
             beingShown = false;
             shown = true;
           });
         }
        }).mouseout(function () {
         // reset the timer if we get fired again - avoids double animations
         if (hideDelayTimer) clearTimeout(hideDelayTimer);

         // store the timer so that it can be cleared in the mouseover if required
         hideDelayTimer = setTimeout(function () {
           hideDelayTimer = null;
           popup.animate({
             top: '-=' + opts.distance + 'px',
             opacity: 0
           }, opts.time, 'swing', function () {
             // once the animate is complete, set the tracker variables
             shown = false;
             // hide the popup entirely after the effect (opacity alone doesn't do the job)
             popup.css('display', 'none');
           });
         }, opts.hideDelay);
        });


        //  attach
        $(this).data('codabubble', {
          target : $this,
          opts: opts
        });

      };
  		

		
  	});
  };	

  //	defaults
  $.fn.codabubble.defaults = {
  	distance: 10,
    time: 250,
    hideDelay: 500,
    popupStyle: {
      top: -30,
      left: 0,
      display: 'block'
    },
    triggerClass: '.trigger',
    popupClass: '.popup'
  };

  $.fn.codabubble.ver = function() { return "jquery.codabubble ver. " + ver; };

})(jQuery);