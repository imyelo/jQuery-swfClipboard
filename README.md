# jQuery Plugin - swfClipboard


[Download Demo](https://github.com/imyelo/jQuery-swfClipboard/tree/master/demo)

## How to use it
### 0. Sorry for my English.
### 1. Include the jQuery and SWFObject JavaScript library in the head of your HTML page
SwfClipboard requires [jQuery](http://jquery.com/) and swfObject(https://github.com/swfobject/swfobject) :

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>

### 2. Include the swfClipboard JavaScript libraray

	<script src="jquery-swfClipboard.js"></script>

### 3. Bind a handle to your button

	$("#button").swfClipboard('Sth here.');

## Options
- *text (string)*
	the content you want to copy to the clipboard.
- *swf (string)*
	the path of the 'swfClipboard.swf'.
	This argument has a default value as './swfClipboard.swf', but if you move the swf file to another path, 'swf' is must be set.
- *callback (function(t))*
	the callback function has a parameter as the content you want to copy if the copying method complete successfully.
- debug (string)

### Anyway, you can use swfClipboard easily as the following way: 
+ $selector.swfClipboard(object);
	- *text*
	- *swf*
	- *callback*
	- debug
+ $selector.swfClipboard(string);
	- *text*
+ $selector.swfClipboard(string, function);
	- *text*
	- *callback*
+ $selector.swfClipboard(string, string);
	- *text*
	- *swf*
 $selector.swfClipboard(string, string, function) / .swfClipboard(string, function, string)
	- *text*
	- *swf / callback*
	- *callback / swf*


*e.g. :*

	<!DOCTYPE HTML>
	<html>
	<head>
		<title>jQuery Plugin - swfClipboard</title>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
		<script src="js/jquery-swfClipboard.js"></script>
	</head>
	<body>
		<textarea id="text"></textarea>
		<button id="copy">Copy</button>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#copy").swfClipboard($("#text").text(), './src/swfClipboard.swf', function(text){
					alert('Completed! The content is : ' + text);
				});
			});
		</script>
	</body></html>

## License
Released under the [MIT license](http://opensource.org/licenses/MIT).