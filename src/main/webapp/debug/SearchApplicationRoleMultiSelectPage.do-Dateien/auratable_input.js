/*
 * Functions related to user input.
 */
var AuraTableInput = function() {
	
	var WILDCARD = '*';
	var MATCH_START = '^';
	var WILDCARD_REGEX_MATCH = /\*/g;
	var WILDCARD_REPLACEMENT = '.*';

	return {
	
		/**
		 * Converts a user's search input into a regular expression or
		 * simple substring to match.
		 * 
		 * @returns an array of two elements: [convertedInput, regexMatching]
		 */
		convertUserInput: function(inputString) {
			var converted = inputString;
			var substringMatching;
			var firstWildcardIndex = inputString.indexOf(WILDCARD);
			var hasWildcard = firstWildcardIndex >= 0;
			var regexMatching = hasWildcard;
			if (hasWildcard) {
				// if no wildcard prefix, add '^'
				var hasWildCardPrefix = firstWildcardIndex == 0;
				if (hasWildCardPrefix) {
					// Remove redundant wildcard
					converted = converted.substring(1, converted.length);
				} else {
					converted = MATCH_START + converted;
				}
				
				// Find remaining wildcards
				firstWildcardIndex = converted.indexOf(WILDCARD);
				var hasRemainingWildcard = firstWildcardIndex >= 0;
				if (hasRemainingWildcard) {
					lastWildcardIndex = converted.lastIndexOf(WILDCARD);
					var onlyWildcardAsSuffix = firstWildcardIndex == lastWildcardIndex &&
						firstWildcardIndex == converted.length - 1;
					if (onlyWildcardAsSuffix) {
						converted = converted.substring(0, converted.length - 1);
					}
					if (hasWildCardPrefix) {
						regexMatching = hasRemainingWildcard && !onlyWildcardAsSuffix;
					}
					// convert wildcards to their replacements
					converted = converted.replace(WILDCARD_REGEX_MATCH, WILDCARD_REPLACEMENT);
				} else {
					regexMatching = converted.indexOf(MATCH_START) == 0;
				}
			}
			return [converted, regexMatching];
		}
		
	};
}();