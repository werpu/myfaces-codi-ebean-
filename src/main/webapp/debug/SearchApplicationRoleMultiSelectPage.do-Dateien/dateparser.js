/*
 * Parses dates in several supported formats
 *
 * @requires date-en-GB.js
 */
var DateParser = function() {

	/* See http://code.google.com/p/datejs/wiki/FormatSpecifiers */
	var SUPPORTED_FORMATS = [
		// DE
		'd\\.M\\.yyyy',		
		'd\\.M\\.yyyy HH:mm:ss',
		'd\\.M\\.yyyy HH:mm:ss tt',
		// US
		'M/d/yyyy',
		// EN
		'MMM d, yyyy',
		'MMM d, yyyy H:mm:ss tt'		
	];				
	
	function parseInternal(dateString) {
		for (var i = 0; i < SUPPORTED_FORMATS.length; i++) {
			var parsed = Date.parseExact(dateString, SUPPORTED_FORMATS[i]);
			if (parsed) {
				// success
				return parsed;
			}
		}
		// failure
		return null;
	};
	
	return {
		parse: function(dateString) {
			return parseInternal(dateString);
		}
	};
}();