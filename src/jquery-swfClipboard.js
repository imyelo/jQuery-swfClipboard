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
	$.fn.swfClipboard = function(){

		var $self = $(this),
			self = this,
			$arguments = arguments;


		var setArguments = function(args){
			var opts, defaults, options;
			defaults = {
				text : '',
				swf : 'swfClipboard.swf',
				callback : function(){},
				debug : 'false'
			};

			// arguments
			switch (args.length) {
				case 1 :
				opts = args[0];
				break;
				case 2 :
				if (typeof args[1] === 'string') {
					opts = {text: args[0], swf: args[1]};
				} else if (typeof args[1] === 'function') {
					opts = {text: args[0], callback: args[1]};
				} else {
					console.error('swfClipboard : Illegal_args');
					return false;
				}
				break;
				case 3 :
				if (typeof args[1] === 'string' && typeof args[2] === 'function') {
					opts = {text: args[0], swf: args[1], callback: args[2]};
				} else if (typeof args[1] === 'function' && typeof args[2] === 'string') {
					opts = {text: args[0], callback: args[1], swf: args[2]};
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
			// console.log(options);
			return options;
		};
		

		var	swf_params = {
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
			// $clipboard.css({top: top, left: left, position: 'absolute', 'z-index': z_index, float: 'left'});
			swfobject.embedSWF(options.swf, 'swfClipboard_holder', width, height, '9.0.0', null, {c: options.text, debug: options.debug, callback : '$.swfClipboardCallback'}, swf_params);
			
			return $clipboard;
		};
		
		var clearElement = function($ele) {
			if ($ele.length > 0) {
				$ele.remove();
			}
		};

		var $clip = showClipboard(setArguments($arguments));

		$clip.bind('mouseout, mouseleave', function (e) {
			var mousePosX = e.pageX,
				mousePosY = e.pageY,
				top = $self.offset().top,
				left = $self.offset().left,
				width = $self.width(),
				height = $self.height();
			if ((mousePosX >= left + width) || (mousePosX <= left)) {
				if ((mousePosY >= top + height) || (mousePosY <= top)) {
					clearElement($clip);
					// console.log('removed');
				}
			}
			/*
			console.log('x : ' + mousePosX);
			console.log('y : ' + mousePosY);
			console.log('left : ' + left);
			console.log('right : ' + (left + width));
			console.log('width : ' + width);
			console.log('top : ' + top);
			console.log('bottom : ' + (top + height));
			console.log('height : ' + height);
			*/
		});

		return $clip;

		// $self.mouseover(function () {
		//	clearElement($("#swfClipboard_cover"));
		//	console.log('removed');
		// });
		// $self.mousedown(function () {
		//	clearElement($("#swfClipboard_cover"));
		//	console.log('removed');
		// });


	};

})(jQuery, swfobject);