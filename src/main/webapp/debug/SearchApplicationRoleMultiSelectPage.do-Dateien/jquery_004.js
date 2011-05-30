/*
 * Used to retrieve hidden nodes in a DataTable.
 * Modified from the version in http://datatables.net/plug-ins/api
 *
 * @requires jquery.dataTables.min.js (v 1.6.1)
 *
 * TODO Attention: this function is not anymore available, even in the currently used version - this is obsolete...
 */
jQuery.fn.dataTableExt.oApi.fnGetHiddenNodes = function ( oTable ) {
	var oSettings = oTable.fnSettings();
	var anNodes = oTable.oApi._fnGetTrNodes( oSettings );
	var anDisplay = $('tbody tr', oSettings.nTable);

	/* Remove nodes which are being displayed */
	for ( var i=0 ; i<anDisplay.length ; i++ ) {
		var iIndex = jQuery.inArray( anDisplay[i], anNodes );
		if ( iIndex != -1 ) {
			anNodes.splice( iIndex, 1 );
		}
	}
	
	/* Fire back the array to the caller */
	return anNodes;
};
