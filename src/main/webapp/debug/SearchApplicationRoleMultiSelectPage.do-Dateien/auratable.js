/**
 * Example usage:
 * 
 * new AuraTable('grid-table-p_myComponentsTable',5,false,[0,2,1,0,0,0],[0,1,1,0,0,0],[0,1,1,0,0,0]);
 * 
 * This function is unfortunately available globally. In order to retain the current API, it has not
 * been added to a namespace, but in the future a technique like the Module Pattern should be
 * applied to achieve proper namespacing and modularity. See http://tinyurl.com/bq9x5y
 *
 * NOTE: the design of the table assumes that if a visible, enabled checkbox is present on the
 * table, that checkbox is used to control row selections.
 *
 * @param tableId the id of the HTML table element
 * @param itemsPerPage an integer for the number of items to display per page
 * @param pagingAlt whether paging is white (true) or grey (false)
 * @param colDefns array defining what action to take on each column:
 * 			0 - no action
 * 			1 - whole row is selected
 * 			2 - set the action for the containing form to the href of the second anchor found in the row, and submit the form
 * @param columnFiltering array of booleans encoded as integers (i.e., [0, 1]), which defines which columns are filterable
 * @param columnSorting array of booleans encoded as integers which defines which columns are sortable
 * @param initialSort optional array of arrays giving the initial sort order. For example, [ [0,'asc'], [1,'asc'] ] sorts
 *        by the first and then second column.
 * @param columnWidths optional array of column widths (Strings)
 * 
 * @requires jquery.js
 * @requires jquery.dataTables.js
 * @requires jquery-aop.min.js
 * @requires alturacore.js
 * @requires auratable_constants.js
 * @requires auratable_input.js
 * @requires auratable_lang_[EN|DE].js
 * @requires auratable_pagination.js
 * @requires auratable_registry.js
 * @requires auratable_sorting.js
 */
var AuraTable = function(tableId, itemsPerPage, pagingAlt, colDefns, columnFiltering, columnSorting, initialSort, columnWidths, columnTypes, associatedTableIds) {
    if (!(colDefns || columnFiltering || columnSorting)) {
    	alert('AuraTable error: All column specification arrays must be supplied');
    }
    if (!(colDefns.length === columnFiltering.length && columnFiltering.length === columnSorting.length)) {
    	alert('AuraTable error: The lengths of each of the column specification arrays must be equal');
    }
    if (columnWidths && (columnWidths.length != colDefns.length)) {
    	alert('AuraTable error: Provided array of column widths does not have the same length as the number of columns defined');
    }
    
    var tableId = tableId;
    var itemsPerPage = itemsPerPage;
    var pagingAlt = pagingAlt;
    var colDefns = colDefns;
    var columnFiltering = columnFiltering;
    var columnSorting = columnSorting;
    var columnCount = columnSorting.length;
    var initialSort = initialSort;
    /* Value is assigned inside createFilterControls() */
    var hasFiltering = false;
    var columnWidths = columnWidths;
	var columnTypes = columnTypes;     

    /**Associate a table with another table on the page if the data-models
     * of the tables are connected. This will mean that the next-button
     * on the page will get enabled when _any_ of the rows of the two tables
     * have the state selected.
     */
    var associatedTableIds=associatedTableIds;
	    
    /*
	 * Initialisation done within a block which encapsulates access to the
	 * dollar function. See the following for more info:
	 *
	 * http://docs.jquery.com/Using_jQuery_with_Other_Libraries#Referencing_Magic_-_Shortcuts_for_jQuery
	 * http://www.dustindiaz.com/namespace-your-javascript/
	 */
    (function($) {
	    var initialiser = function() {
			
	    	function getColumnSpecs() {
	    		var result = new Array(columnCount);
	    		for (i = 0; i < columnCount; i++) {
	    			var columnSortable = columnSorting[i] === 1;
	    			var columnFilterable = columnFiltering[i] === 1;
	    			
	    			result[i] = {
	    				'bSortable': columnSortable,
	    				'bSearchable': columnFilterable
	    			};
	    			
	    			if (columnWidths) {
		    			result[i]['sWidth'] = columnWidths[i];
	    			}

	    			if (columnTypes) {
		    			if (columnTypes[i]!=null) {
		    				result[i]['sType'] = columnTypes[i];
		    			}
	    			}

	    			
	    		}
	    		return result;
	    	};
	    	
	    	function createFilterControls(oTable, aColumnFiltering) {
	    		for (i = 0; i < aColumnFiltering.length; i++) {
	    			if (aColumnFiltering[i] === 1) {
	    				hasFiltering = true;
	    				break;
	    			}
	    		}
	    		
	    		if (hasFiltering) {
	    			// insert filter inputs
	        		var theadPrefix = '<thead><tr>';
	        		var theadSuffix = '</tr></thead>';
	        		var contents = '';
	        		
	        		// help icon
					/*
	        		contents += '<th><span class="helpicon">&nbsp;</span></th>';
	        		*/
	        		
					for (i = 0; i < aColumnFiltering.length; i++) {
						if (columnWidths) {
							contents += '<th width=' + columnWidths[i] + '>';
						} else {
							contents += '<th>';
						}
						contents += '<div class="line">' +
	        					'<input type="text"';
	        			var columnFilterable = aColumnFiltering[i] === 1;
	        			if (columnFilterable) {
	        				// just close element
	        				contents += '></input>';
	        			} else {
	        				// hide the input
	        				contents += ' style="display:none"/>';
	        			}
	        			// close content div and filter item div
	        			contents += '</div>' +
		        			'</th>';
	        		}
	        		oTable.prepend(theadPrefix + contents + theadSuffix);    			
	    		}
	    	};
	    	
	    	// TODO see http://datatables.net/forums/comments.php?DiscussionID=255
	    	function bindFilteringControls(oDataTable) {
	    		var inputs = $('#' + tableId + ' thead input');
	    		inputs.keyup(function() {
	    			// Find index of column associated with the input
	    			var index = inputs.index(this);
	    			
	    			// Convert user input and filter
	    			var searchMetadata = AuraTableInput.convertUserInput(this.value);
	    			var convertedInput = searchMetadata[0];
					var regexMatching = searchMetadata[1];
	    			oDataTable.fnFilter(convertedInput, index, regexMatching, false, false);
	    			
	    			// Show or hide "clear filter" button
	    			var lineDiv = $(this).parents('div.line')[0];
	    			var button = $(lineDiv).find('div.button div.content span')[0];
	    			
	    			var clearField = this.value === '';
	    			var parentDiv = this.parentNode;
	    			if (clearField) {
	    				$(button).addClass('disabled');
	    				$(parentDiv).removeClass('content');
	    			} else {
	    				$(button).removeClass('disabled');
	    				$(parentDiv).addClass('content');
	    				
	    				var title = $(button).attr('title');
	    				if (title == '') {
	    					// initialise onclick
	    					var input = this;
	    	    			$(button).click(function() {
	    						input.value = '';
	    						$(input).trigger('keyup');					
	    					});
	    					
	    					// add title from language JSON object if this has not been set yet
	    					$(button).attr('title', jQuery.fn.auratable.language.oFilter.sClear);
	    				}
	    			}
	    		});
	    		
	    		inputs.keypress(function(e) {
		    		// prevent form submission when enter pressed
	    			return e.keyCode != 13;
	    		});
	    	};
	    	
	    	function fnGetTableHeaderDiv() {
	    		var oTable = $('#' + tableId);
	    		var wrapper = oTable.parents('div.dataTables_wrapper').first();
	    		return wrapper.children().first();
	    	};
	
			/* Inserts the icon into the header of the table */
			function createHelpIcon() {
				var headerDiv = fnGetTableHeaderDiv();
				// notice float: right
				var iconDiv = '<div style="float:right;padding-top:3px;"><span class="helpicon">&nbsp;</span></div>';
				// placeholder div used only to reset floats
				var floatResetDiv = '<div style="clear:both;display:none"></div>';
				headerDiv.append(iconDiv + floatResetDiv);
				// ensure that the first div has float:left to vertically align "left" and "right" divs
				var leftDiv = headerDiv.children().first();
				leftDiv.css('float', 'left');
				
				if (!hasFiltering) {
					$('span.helpicon').css('display', 'none');
				}
			};
	
	    	function addLocalisation(oDataTable, header) {
	
	    		/* Based loosely on the _fnMap function from Datatables code */
	    		var fnCopy = function( oRet, oSrc, sParent, sChild ) {
	    			if ( typeof oRet[sParent] == 'undefined') {
	    				// create container
	    				oRet[sParent] = {};
	    			}
	    			if ( typeof oSrc[sParent][sChild] != 'undefined' ) {
	    				oRet[sParent][sChild] = oSrc[sParent][sChild];
	    			}
	    		};
	    			
	    		var fnUpdateHelpIcon = function() {
	    			var headerDiv = fnGetTableHeaderDiv();
	    			// find icon within header
	    			var icon = headerDiv.find('span.helpicon').first();
	    			/* TODO fix URL */
	    			var iconUrl = '/aura-rc/images/icons/ico_info_question_16_cli.gif'; 
	    			var iconPrefix = '<img src="' + iconUrl + '" style="vertical-align:middle">&nbsp;&nbsp;';	
	    			var l = jQuery.fn.auratable.language;	    			
	    			var sHeader = l.oFilterHelp.sHeader;
	    			var sBody = l.oFilterHelp.sBody;
					icon.attr('title', 'header=[' + iconPrefix + sHeader + '] body=[' + sBody + ']');
	    		};
	    		
	    		// Set titles etc based on custom language entries
	    		fnUpdateHelpIcon();    			
	    		fnUpdateHeaderTitles(header);
	    	};
	    	
	    	function getRowClickType() {
	    		/*
	    		 * TODO: API should define that an integer be used
	    		 * for the whole row, not an array of columns
	    		 */
	    		var type = 0;
	    		for (i = 1; i < colDefns.length; i++) {
	    			var definition = colDefns[i];
	    			if (definition == 1) {
	    				type = 1;
	    				break;
	    			} else if (definition == 2) {
	    				type = 2;
	    				break;
	    			}
	    		}
	    		return type;
	    	};
	    	
	    	/**
	    	 * Retrieves hidden anchors in the first TR in the row (which
	    	 * is the target itself or its ancestor)
	    	 */
	    	function fnGetAnchors(target) {
	    		var row = target.closest('tr');
	    		if (row) {
	    			var firstTd = row.children('td')[0];
	    			return $(firstTd).children('a');
				} else {
					return [];
				}
	    	};
	    	
	    	function setupRowClickBehaviour(oSettings, iRowClickType) {
	    		var tbody = $('#' + tableId + ' tbody');
	    		
	    		var fnOnclick = function(event) {
	    			$(oSettings.aoData).each(function() {
						$(this.nTr).removeClass('click');
					});
					// find parent TR element
					var tr = $(event.target).parents('tr');
					tr.addClass('click');
				};
	    		
	    		if (iRowClickType == 1) {
		    		tbody.click(fnOnclick);
	    		} else if (iRowClickType == 2) {
					tbody.click(function(event) {
		    			var target = $(event.target);
						var tagName = target[0].tagName;
						if (tagName == 'INPUT' && target.attr('type') == 'checkbox') {
							// don't submit, but allow checkbox to be checked/unchecked
							return true;
						}
		    			var anchors = fnGetAnchors(target);
		    			if (anchors.length == 2) {
			    			// convention is to use second anchor's href: submit as requested
			    			var link = anchors[1].href;
			    			
				            var form = target.parents('form')[0];
				            form.setAttribute('action', link);
				            
							// submit the form (function below is from alturacore.js)
				            onSubmit(event, true);
		    			}
		    		});
	    		}
	    	};
	    	
	    	function fnGetHeader() {
	    		return $('#' + tableId + ' thead tr.webgridheaderpanel')[0];
	    	};
	    	
	    	/**
	    	 * Initialises / updates title attributes of all headers based on their CSS classes
	    	 */
			function fnUpdateHeaderTitles(tr) {
				var l = jQuery.fn.auratable.language;
				if (tr) {
					var ths = tr.childNodes;
					for (var i = 0; i < ths.length; i++) {
						var th = $(ths[i]);
						var title = '';
						if (th.hasClass('sorting')) {
							title = l.oSorting.sSort;
						} else if (th.hasClass('sorting_asc')) {
							title = l.oSorting.sSortAsc;
						} else if (th.hasClass('sorting_desc')) {
							title = l.oSorting.sSortDesc;
						}
						th.attr('title', title);
					}
				}
			};
			
	    	function setupRowHover(iRowClickType) {
	    		/* 
	    		 * Use event delegation to achieve row hover effect, since
	    		 * the DOM only ever contains a subset of the TRs which make
	    		 * up the original HTML table.
	    		 */
	    		var bClickable = iRowClickType == 2;

	    		var fnAddOrRemoveHover = function(el, add) {
	    			el.toggleClass('hover', add);
	    			if (bClickable) {
	    				var anchors = fnGetAnchors(el);
	    				var linkExists = anchors.length == 2;
						el.toggleClass('clickable', add && linkExists);
					}
					// allow event bubbling after live event handler execution
					return true;
	    		};
	    		
				$('#' + tableId + ' tbody tr').live('mouseover', function() {
					return fnAddOrRemoveHover($(this), true);
				}).live('mouseout', function() {
					return fnAddOrRemoveHover($(this), false);
				});
				
				// TODO fix special link-clicking behaviour
				/*
				alert('adding live');
				$('a.weblink').live('click', function(event) {
					var target = event.target;
					var href = target.href;
					alert('clicked: ' + target + ', href: ' + href);
					return true;
				});
				*/
	    	};
	    	
	    	function setupHeaderTitles(header) {
				$(header).click(function(e) {
					fnUpdateHeaderTitles(this);
				});
	    	};
	    	
	    	function setupCheckboxClickBehaviour(oSettings, oTable) {
	    		var selector = '#' + tableId + ' tbody tr td input[type=checkbox]';
				var className = AuraTableConstants.selectionClassName;
				var selectedRowSelector = '#' + tableId + ' tbody tr.' + className;
	
    			// monitor clicks
    			$(selector).live('click', function(e) {
    				var target = e.target;
    				var td = target.parentNode;
					var tr = td.parentNode;
					var trj = $(tr);
		
					var checked = $(target).is(':checked');
					if (checked) {
						// add class to row, so selections are preserved								
						trj.addClass(className);
					} else {
						trj.removeClass(className);
					}
					
					// fire custom event
					oTable.trigger('tableSelectionChanged');
			
					// allow other event handlers to run
					return true;
    			});
			
				// listen for page changes
				oTable.live('pageChanged', function(e) {
					var inputs = $(this).find('tr.' + className + ' td input[type=checkbox]');
					inputs.each(function() {
						var input = $(this);
						var checked = input.is(':checked');
						if (!checked) {
							// run onclick event handler
							input.click();
						}
					});
					
					$(this).find("td input[name$='.isSelected'][type='hidden']").each(function() {
    					$(this).prev("input").get(0).checked = (this.value == "true");
					});
					
					$(this).find("td input[name$='.maFlag'][type='hidden']").each(function() {
    					$(this).prev("input").get(0).checked = (this.value == "true");
					});
					
					setupTableCellTitles(oTable);
					
					// allow other event handlers to run
					return true;
				});
	    	};
	    	
	    	/**
	    	 * Highlights selected rows depending on whether checkboxes controlling
	    	 * the row selections are checked or not.
	    	 * 
	    	 * @see AuraTableConstants.rowSelectionControlClassName
	    	 */
	    	function setupInitialRowSelections(oTable) {
	    		var subSelector = 'tbody tr td input[type=checkbox].' + AuraTableConstants.rowSelectionControlClassName;
	    		var className = AuraTableConstants.selectionClassName;
	    		var rowSelectionCheckboxes = oTable.find(subSelector);
	    		rowSelectionCheckboxes.each(function() {
		    		var checkbox = $(this);
		    		var tr = checkbox.closest('tr');
	    			var checked = $(this).is(':checked');
	    			if (checked) {
						// add class to row	
						tr.addClass(className);
					}
	    		});					
	    	};
	    	
	    	function setupFormSubmissionMonitoring(tableId) {
	    		// call function before each call to onSubmit (alturacore.js)
	    		var table = AuraTableRegistry.get(tableId);
				jQuery.aop.before({target: window, method: 'onSubmit'},
	    			function(a_event, validate) {
	    				prepareFormSubmission(table);
	    			}
	    		);
	    	};
	    	
			/**
			 * Called immediately prior to form submission in order to retrieve
			 * all hidden inputs inside rows which are not currently shown in the
			 * paginated table. These inputs are inserted into the HTML FORM element
			 * (an ancestor of the TABLE element).
			 */
			function prepareFormSubmission(table) {	
				var hiddenNodes = jQuery.fn.dataTableExt.oApi.fnGetHiddenNodes(table);
				var forms = $('#' + tableId).parents('form');
				
				if (forms.size() >= 1) {
					var form = forms.get(0);
			    	for (var i = 0; i < hiddenNodes.length; i++) {
			    		var tr = hiddenNodes[i];
						var trj = $(tr);
						var h = trj.find('input');
						// insert hidden inputs
						for (var j = 0; j < h.length; j++) {
							var input = $(h[j]);
							var type = input.attr('type').toLowerCase();
							if (type == 'hidden') {
								if (j > 0) {
									// special handling for checkboxes
									var previous = $(h[j - 1]);
									var previousType = previous.attr('type').toLowerCase();
									if (previousType == 'checkbox' && trj.hasClass(AuraTableConstants.selectionClassName)) {
										// update value of hidden input before submit
										var previousValue = previous.attr('value');
										input.attr('value', previousValue);
									}
								}
								input.appendTo(form);
							}
						}
					}
				}
			};
			
	    	function setupTableCellTitles(oTable) {
				/*
				 * At this point, the table has been rendered, so widths have been adjusted
				 */
				var tds = oTable.find('td');
	    		tds.each(function() {
    				var maxWidth = $(this).width();
    				$(this).children().each(function() {
    					if ($(this).width() > maxWidth) {
    						$(this).attr('title', $(this).text());
    					}
    				});
    			});
	    	};
			
			function doInitialSorting(oDataTable) {
				if (initialSort) {
					oDataTable.fnSort( initialSort );
				}
			};

			return {
				init: function() {
					/* 
					 * If the table only has a single row with no actual
					 * records to display, abandon initialisation
					 */
					var nonEmpty = $('#' + tableId + ' tbody tr.row-empty').length === 0;
					
					if (nonEmpty) {
						var oTable = $('#' + tableId);
						
						var oDataTable = oTable.dataTable({
							// pagination style
							sPaginationType: 'aura',
							
							// rows per page					
							iDisplayLength: itemsPerPage,
							
							// use fixed "display length" (rows per page)
							bLengthChange: false,
							
							// use global variable to set language resource
							oLanguage: jQuery.fn.auratable.language,
							
							aoColumns: getColumnSpecs(),
							
							/*
							 * DOM positioning:
							 *
							 * t - The table
							 * i - Information
							 * p - Pagination
							 * r - pRocessing
							 * < and > - div elements
							 * <"class" and > - div with a class
							 */
							sDom: '<i>rt<p>',
							
							// Performance optimisation
							bSortClasses: false,
							
							bAutoWidth: typeof columnWidths == 'undefined',
							
							fnInitComplete: function() {
								if (columnWidths) {
									oTable.addClass('fixed_layout');
								}
						
								/* Initial titles for visible rows */
								setupTableCellTitles(oTable);				
							}
	    				});
						
						// put DataTable instance into registry
						AuraTableRegistry.put(tableId, oDataTable);

                        oDataTable.associatedTableIds = associatedTableIds;
		
						var oSettings = oDataTable.fnSettings();
						var header = fnGetHeader();
						var iRowClickType = getRowClickType();
		
						createFilterControls(oTable, columnFiltering);
						createHelpIcon();
						bindFilteringControls(oDataTable);
						addLocalisation(oDataTable, header);
						setupRowClickBehaviour(oSettings, iRowClickType);
						setupHeaderTitles(header);
						setupRowHover(iRowClickType);
						setupCheckboxClickBehaviour(oSettings, oTable);
						setupInitialRowSelections(oTable);
						
						setupFormSubmissionMonitoring(tableId);
						
						doInitialSorting(oDataTable);
					}
				}
			};
		}();
		
		initialiser.init();	
	})(jQuery);
};