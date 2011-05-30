/*
 * Custom functions related to filtering.
 *
 * @requires jquery.js
 * @requires jquery.dataTables.js
 */
(function($) {
	/*
	 * Ensures that, for all custom column types we define, HTML tags
	 * inside table cells (which are not visible to the user) are not
	 * considered when filtering.
	 *
	 * See http://datatables.net/plug-ins/filtering
	 */
    var fnStripHtml = function(sData) {
		var n = document.createElement('div');
		n.innerHTML = sData;
		var result;
		if (n.textContent) {
			result = n.textContent.replace(/\n/g, '');
		} else {
			result = n.innerText.replace(/\n/g, '');
		}
		// trim
		result = result.replace(/^\s*/, '').replace(/\s*$/, '');
		return result;
	};

	var dte = jQuery.fn.dataTableExt;
	dte.ofnSearch['numbers'] = fnStripHtml;
	dte.ofnSearch['dates'] = fnStripHtml;
	dte.ofnSearch['duration'] = fnStripHtml;
	dte.ofnSearch['span-html'] = fnStripHtml;
})(jQuery);
