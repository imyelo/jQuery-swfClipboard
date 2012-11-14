/**
 * jquery-swfClipboard
 * 2012.11.14
 * @yelo
 * http://github.com/imyelo/swfClipboard
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function($, swfobject) {
	$.fn.swfClipboard = function() {

		var $self = $(this),
			opts, defaults, options, swf_params;
		defaults = {
			text : '',
			swf : 'swfClipboard.swf',
			callback : function(){},
			debug : 'false'
		};

		// arguments
		switch (arguments.length) {
			case 1 :
			opts = arguments[0];
			break;
			case 2 :
			if (typeof arguments[1] === 'string') {
				opts = {text: arguments[0], swf: arguments[1]};
			} else if (typeof arguments[1] === 'function') {
				opts = {text: arguments[0], callback: arguments[1]};
			} else {
				console.error('swfClipboard : Illegal_Arguments');
				return false;
			}
			break;
			case 3 :
			if (typeof arguments[1] === 'string' && typeof arguments[2] === 'function') {
				opts = {text: arguments[0], swf: arguments[1], callback: arguments[2]};
			} else if (typeof arguments[1] === 'function' && typeof arguments[2] === 'string') {
				opts = {text: arguments[0], callback: arguments[1], swf: arguments[2]};
			} else {
				console.error('swfClipboard : Illegal_Arguments');
				return false;
			}
			break;
			default :
			console.error('swfClipboard : Illegal_Arguments');
			return false;
		}
		if ( typeof opts === 'string' || typeof opts === 'number') {
			options = $.extend({}, defaults, {text: opts});
		} else {
			options = $.extend({}, defaults, opts);
		}

		swf_params = {
			wmode: "transparent",
			allowScriptAccess: "always"
		};

		var showClipboard = function(options) {
			var $copy, position, top, left, width, height,
				$parent, copy_z_index, z_index, div, $clipboard;

			$.extend({swfClipboardCallback: options.callback});	// callback

			$copy = $self,
			position = $copy.position(),
			top = position.top,
			left = position.left,
			width = $copy.outerWidth(),
			height = $copy.outerHeight(),
			$parent = $copy.parent(),
			copy_z_index =  $copy.css('z-index'),
			z_index = copy_z_index + 1,
			div = '<div id="swfClipboard_cover" style="width:' + width + 'px; height:' + height + 'px; background-color:#ccc;"><span id="swfClipboard_holder"></span></div>',
			$clipboard = $("#swfClipboard_cover");
			clearElement($clipboard);
			$clipboard = $(div).appendTo($parent);
			$clipboard.css({background: 'none', top: top, left: left, position: 'absolute', 'z-index': z_index, float: 'left'});
			swfobject.embedSWF(options.swf, 'swfClipboard_holder', width, height, '9.0.0', null, {c: options.text, debug: options.debug, callback : '$.swfClipboardCallback'}, swf_params);
		};
		
		var clearElement = function($ele) {
			if ($ele.length > 0) {
				$ele.remove();
			}
		};

		$self.mouseenter(function () {
			showClipboard(options);
		});
		// $self.mouseleave(function () {
		//	clearElement($("#swfClipboard_cover"));
		// });
	};
})(jQuery, swfobject);