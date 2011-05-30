/**
 * Sorting functions for auratable.js 
 * 
 * @requires dateparser.js 
 * @requires jquery.js
 * @requires jquery.dataTables.js
 */

// TODO move to auratable_constants.js
var AURA_SPAN_REGEX = /<span[^>]*>([^<]*)<\/span>/gi;
var DURATION_REGEX = /([0-9]+d[0-9]+h)|([0-9]+d)|([0-9]+h)/g;

(function($) {
	
	/**
	 * From DataTables version 1.7, the order of the jQuery.fn.dataTableExt.aTypes
	 * array is important (the type detection functions are in priority order).
	 * Since we want to override the default behaviour, so we need to move existing
	 * entries of the array forward by one place and then insert our function into
	 * the first position. The following is an emulation of the 'unshift' array 
	 * function, which IE6 does not support.
	 */
	var typesCopy = [];
	typesCopy.push(function(sData) {
		var result = null;
		
		if (sData.match(AURA_SPAN_REGEX)) {
			var spanContents = RegExp.$1;
			if (spanContents.match(/^-?(\d+[,\.]?)+(E[-+][\d]+)?%?$/)) {
				result = 'numbers';
			} else if (DateParser.parse(spanContents)) {
				// dates in various formats
				result = 'dates';
			} else if (spanContents.match(DURATION_REGEX)) {
				result = 'duration';
			} else {
				result = 'span-html';
			}
		}
		return result;
	});

	var typesLength = jQuery.fn.dataTableExt.aTypes.length;
	for (var i = 0; i < typesLength; i++) {
		// remove next value and add it to copy
		var next = jQuery.fn.dataTableExt.aTypes.shift();
		typesCopy[i + 1] = next;
	}

	// array should now point to copy
	jQuery.fn.dataTableExt.aTypes = typesCopy;

	// Static helper functions
	jQuery.fn.aura = {
		// general
		getSpanContents: function(span) {
			span.match(AURA_SPAN_REGEX);
			return RegExp.$1;
		},	
	
		// date
		sortDates : function(a, b, ascending) {
			// extract date Strings from SPAN tags and parse them as JavaScript Date objects
			a.match(AURA_SPAN_REGEX);
			var x = DateParser.parse(RegExp.$1);
			b.match(AURA_SPAN_REGEX);
			var y = DateParser.parse(RegExp.$1);

			var result;
			if (x == null && y == null) {
				result = 0;
			} else if (x == null) {
				result = (ascending ? -1 : 1);
			} else if (y == null) {
				result = (ascending ? 1 : -1);
			} else if (x.compareTo(y)==0) {
				result = 0;
			} else if (x.compareTo(y)==-1) {
				result = (ascending ? -1 : 1);
			} else {
				result = (ascending ? 1 : -1);
			}
			
			return result;
		},

		// numbers
		parseNumber : function(a) {
			var x = parseFloat(a);
			return isNaN(x) ? 0 : x;
		},
		sortNumbers : function(a, b, ascending) {
			var x = jQuery.fn.aura.parseNumber(a);
			var y = jQuery.fn.aura.parseNumber(b);
			return ascending ? (x - y) : (y - x);
		},

		// duration
		getNumber: function(numberAndUnit) {
			var toParse = numberAndUnit.substring(0, numberAndUnit.length);
			return parseFloat(toParse); 
		},
		parseDuration : function(durationString) {
			// compute a numerical value for the duration (in hours)
			var result = 0;
			var daysIndex = durationString.indexOf('d');
			if (daysIndex > 0) {
				var days = jQuery.fn.aura.getNumber(durationString.substring(0, daysIndex));
				result += (days * 24);
			}
			var hoursIndex = durationString.indexOf('h');
			if (hoursIndex > 0) {
				var hoursPart = durationString.substring(daysIndex + 1, hoursIndex);
				var hours = jQuery.fn.aura.getNumber(hoursPart);
				result += hours;
			}
			return result;
		},
		sortDuration : function(a, b, ascending) {
			var contentsA = jQuery.fn.aura.getSpanContents(a);
			var x = jQuery.fn.aura.parseDuration(contentsA);
			
			var contentsB = jQuery.fn.aura.getSpanContents(b);
			var y = jQuery.fn.aura.parseDuration(contentsB);

			return ascending ? (x - y) : (y - x);
		},

		// span-html
		sortSpanHtml : function(a, b, ascending) {
			a.match(AURA_SPAN_REGEX);
			var x = RegExp.$1;
			b.match(AURA_SPAN_REGEX);
			var y = RegExp.$1;

			var cmp = x.localeCompare(y);
			return ascending ? cmp : -cmp;
		}
	};

	// dates
	jQuery.fn.dataTableExt.oSort['dates-asc'] = function(a,b) {
		return jQuery.fn.aura.sortDates(a, b, true);
	};
	jQuery.fn.dataTableExt.oSort['dates-desc'] = function(a,b) {
		return jQuery.fn.aura.sortDates(a, b, false);
	};

	// numbers
	jQuery.fn.dataTableExt.oSort['numbers-asc'] = function(a,b) {
		return jQuery.fn.aura.sortNumbers(a, b, true);
	};
	jQuery.fn.dataTableExt.oSort['numbers-desc'] = function(a,b) {
		return jQuery.fn.aura.sortNumbers(a, b, false);
	};
	
	// duration
	jQuery.fn.dataTableExt.oSort['duration-asc'] = function(a,b) {
		return jQuery.fn.aura.sortDuration(a, b, true);
	};
	jQuery.fn.dataTableExt.oSort['duration-desc'] = function(a,b) {
		return jQuery.fn.aura.sortDuration(a, b, false);
	};
	
	// span-html
	jQuery.fn.dataTableExt.oSort['span-html-asc'] = function(a,b) {
		return jQuery.fn.aura.sortSpanHtml(a, b, true);
	};
	jQuery.fn.dataTableExt.oSort['span-html-desc'] = function(a,b) {
		return jQuery.fn.aura.sortSpanHtml(a, b, false);
	};

    jQuery.fn.dataTableExt.ofnSearch['dates'] = function ( sData ) {
        var n = document.createElement('div');
        n.innerHTML = sData;
        if ( n.textContent || n.textContent == '') {
            return n.textContent.replace(/\n/g," ");
        } else {
            return n.innerText.replace(/\n/g," ");
        }
    }

    jQuery.fn.dataTableExt.ofnSearch['string'] = function ( sData ) {
        var n = document.createElement('div');
        n.innerHTML = sData;
        if ( n.textContent || n.textContent == '') {
            return n.textContent.replace(/\n/g," ");
        } else {
            return n.innerText.replace(/\n/g," ");
        }
    }

})(jQuery);