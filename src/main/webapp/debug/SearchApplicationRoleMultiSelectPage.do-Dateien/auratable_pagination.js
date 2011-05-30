/**
 * Custom pagination function, based on the "full_numbers" style
 * 
 * @requires auratable.css
 */
(function($) {
	jQuery.fn.dataTableExt.oPagination.aura = {
		/*
		 * Maximum number of controls for navigation between pages.
		 * Any ellipses displayed do not function as controls.
		 */
		NUMBER_OF_PAGE_CONTROLS: 6,

		fnFireCallback: function( fnCallbackDraw, oSettings ) {
			fnCallbackDraw( oSettings );
			// fire custom event
			$('div.dataTables_wrapper table').trigger('pageChanged');
		},
	
		/*
		 * Function: oPagination.aura.fnInit
		 * Purpose:  Initialise navigation controls and container for page buttons
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:nPaging - the DIV which contains this pagination control
		 *           function:fnCallbackDraw - draw function which must be called on update
		 */
		fnInit: function ( oSettings, nPaging, fnCallbackDraw ) {
			var nFirst = document.createElement( 'span' );
			var nPrevious = document.createElement( 'span' );
			var nList = document.createElement( 'span' );
			var nNext = document.createElement( 'span' );
			var nLast = document.createElement( 'span' );
			
			nFirst.title = oSettings.oLanguage.oPaginate.sFirst;
			nPrevious.title = oSettings.oLanguage.oPaginate.sPrevious;
			nNext.title = oSettings.oLanguage.oPaginate.sNext;
			nLast.title = oSettings.oLanguage.oPaginate.sLast;
	
			// Fix for IE6
			nFirst.innerHTML = nPrevious.innerHTML = nNext.innerHTML = nLast.innerHTML = '&nbsp';
			
			var oClasses = oSettings.oClasses;
			nFirst.className = oClasses.sPageButton+" "+oClasses.sPageFirst;
			nPrevious.className = oClasses.sPageButton+" "+oClasses.sPagePrevious;
			nNext.className= oClasses.sPageButton+" "+oClasses.sPageNext;
			nLast.className = oClasses.sPageButton+" "+oClasses.sPageLast;
			
			nPaging.appendChild( nFirst );
			nPaging.appendChild( nPrevious );
			nPaging.appendChild( nList );
			nPaging.appendChild( nNext );
			nPaging.appendChild( nLast );
					
			$(nFirst).click( function () {
				oSettings.oApi._fnPageChange( oSettings, "first" );
				jQuery.fn.dataTableExt.oPagination.aura.fnFireCallback( fnCallbackDraw, oSettings );
			});
			
			$(nPrevious).click( function() {
				oSettings.oApi._fnPageChange( oSettings, "previous" );
				jQuery.fn.dataTableExt.oPagination.aura.fnFireCallback( fnCallbackDraw, oSettings );
			});
			
			$(nNext).click( function() {
				oSettings.oApi._fnPageChange( oSettings, "next" );
				jQuery.fn.dataTableExt.oPagination.aura.fnFireCallback( fnCallbackDraw, oSettings );
			});
			
			$(nLast).click( function() {
				oSettings.oApi._fnPageChange( oSettings, "last" );
				jQuery.fn.dataTableExt.oPagination.aura.fnFireCallback( fnCallbackDraw, oSettings );
			});
			
			/* Take the brutal approach to cancelling text selection */
			$('span', nPaging)
				.bind( 'mousedown', function() { return false; } )
				.bind( 'selectstart', function() { return false; } );
			
			/* ID the first elements only */
			if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.p == "undefined" )
			{
				nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
				nFirst.setAttribute( 'id', oSettings.sTableId+'_first' );
				nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
				nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
				nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
			}
	
			oSettings.nPaginateList = nList;
		},
	
		/*
		 * Function: oPagination.aura.fnUpdate
		 * Purpose:  Update the list of page buttons in the pagination control. Buttons are always present
		 *           for the first and last pages in a data set, and ellipses ("...") may be present
		 *           depending on which page is currently active.
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           function:fnCallbackDraw - draw function which must be called on update
		 */
		fnUpdate: function ( oSettings, fnCallbackDraw ) {
			if ( !oSettings.aanFeatures.p )	{
				// no pagination
				return;
			}
			
			var iPageCount = jQuery.fn.dataTableExt.oPagination.aura.NUMBER_OF_PAGE_CONTROLS;
			var iPageCountHalf = Math.floor(iPageCount / 2);
			var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
			
			var parentDiv = oSettings.nPaginateList.parentNode;
			if (iPages <= 1) {
				// hide pagination controls
				$(parentDiv).hide();
				// nothing more to do
				return;
			} else {
				// show pagination controls
				$(parentDiv).show();
			}
			
			var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
			var sList = "";
			var iStartButton;
			var iEndButton;
			var oClasses = oSettings.oClasses;
	
			var sEllipsisSpan = '<span class="ellipsis">...</span>';
			
			/*
			 * Appends a representation of the DOM elements required for the page buttons   
			 */
			var fnAddPageButtons = function(startPage, endPage) {
				for (var i = startPage; i <= endPage; i++) {
					var buttonClass = (iCurrentPage == i) ? oClasses.sPageButtonActive : oClasses.sPageButton;
					sList += '<span class="'+buttonClass+'">'+i+'</span>';
				}
			};
			
			var fnAddEllipsis = function() {
				sList += sEllipsisSpan;
			};
			
			if (iPages < iPageCount) {
				// small data set - show buttons for all pages
				iStartButton = 1;
				iEndButton = iPages;
			} else if (iCurrentPage <= iPageCountHalf) {
				// show lower half which starts from the beginning of the data set 
				iStartButton = 1;
				iEndButton = iPageCount;
			} else if (iCurrentPage >= (iPages - iPageCountHalf)) {
				// show upper half which ends at the end of the data set 
				iStartButton = iPages - iPageCount + 1;
				iEndButton = iPages;
			} else {
				// show a range somewhere in the middle of the data set
				iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1;
				iEndButton = iStartButton + iPageCount - 1;
			}
			
			// always display first page of record set
			fnAddPageButtons(1, 1);
			
			// Pagination window (exclude start and end, since these are always shown)
			var iStartOfWindow = iStartButton + 1;
			var iEndOfWindow = iEndButton - 1;
			var showLeadingEllipsis = iStartOfWindow >= 3;
			var hiddenPagesInUpperRange = iPages - iEndButton;
			var showTrailingEllipsis = hiddenPagesInUpperRange >= 1;
			
			if (showLeadingEllipsis) {
				fnAddEllipsis();
				// add remaining buttons (and possibly an ellipsis)
				if (showTrailingEllipsis) {
					fnAddPageButtons(iStartOfWindow + 1, iEndOfWindow - 1);
					fnAddEllipsis();
				} else {
					fnAddPageButtons(iStartOfWindow + 1, iEndOfWindow);
				}
			} else if (showTrailingEllipsis) {
				// At least one page in the upper range is hidden:
				// add remaining buttons (remove one to account for trailing ellipsis)
				fnAddPageButtons(iStartOfWindow, iEndOfWindow - 1);
				fnAddEllipsis();
			} else {
				// no ellipses are shown
				fnAddPageButtons(iStartOfWindow, iEndOfWindow);
			}
			
			if (iPages > 1) {
				// always display last page of record set
				fnAddPageButtons(iPages, iPages);
			}
			
			oSettings.nPaginateList.innerHTML = sList;
			
			/* Take the brutal approach to cancelling text selection */
			var spans = $('span', oSettings.nPaginateList);
			spans.bind( 'mousedown', function () { return false; } );
			spans.bind( 'selectstart', function () { return false; } );
			
			spans.click(function(e) {
				if (this.className == 'ellipsis') {
					// don't attempt to follow the link
					e.preventDefault();
					return false;
				}
				
				var iTarget = (this.innerHTML * 1) - 1;
				oSettings._iDisplayStart = iTarget * oSettings._iDisplayLength;

				jQuery.fn.dataTableExt.oPagination.aura.fnFireCallback( fnCallbackDraw, oSettings );

				return false;
			});
			
			/* Update the classes of the permanent navigation buttons */
			var nButtons = $('span', oSettings.aanFeatures.p);
			var nStatic = [ nButtons[0], nButtons[1], nButtons[nButtons.length-2], nButtons[nButtons.length-1] ];
			$(nStatic).removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive );
			if (iCurrentPage == 1) {
				nStatic[0].className += " "+oClasses.sPageButtonStaticDisabled;
				nStatic[1].className += " "+oClasses.sPageButtonStaticDisabled;
			} else {
				nStatic[0].className += " "+oClasses.sPageButton;
				nStatic[1].className += " "+oClasses.sPageButton;
			}
			
			if (iCurrentPage == iPages || oSettings._iDisplayLength == -1) {
				nStatic[2].className += " "+oClasses.sPageButtonStaticDisabled;
				nStatic[3].className += " "+oClasses.sPageButtonStaticDisabled;
			} else {
				nStatic[2].className += " "+oClasses.sPageButton;
				nStatic[3].className += " "+oClasses.sPageButton;
			}			
		}
	};
})(jQuery);