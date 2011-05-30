/*
 * © 2001-2007 Compuware Corporation.  All rights reserved.
 * Unpublished - rights reserved under the Copyright
 * Laws of the United States.
 *
 * U.S. GOVERNMENT RIGHTS-Use, duplication, or
 * disclosure by the U.S. Government is subject to
 * restrictions as set forth in Compuware Corporation
 * license agreement and as provided in DFARS
 * 227.7202-1(a) and 227.7202-3(a) (1995), DFARS
 * 252.227-7013(c)(1)(ii)(OCT 1988), FAR 12.212(a)
 * (1995), FAR 52.227-19, or FAR 52.227-14 (ALT III), as
 * applicable.  Compuware Corporation.
 *
 * This product contains confidential information and
 * trade secrets of Compuware Corporation.  Use,
 * disclosure, or reproduction is prohibited without the
 * prior express written permission of Compuware
 * Corporation.
 */

var tableBehaviors = new Array ();
var tabPanes = new Array ();

function alturaInit ()
{
    // Additional table behavior is currently only supported for IE 5.5 or higher
    if (getIEVersionNumber()>5)
    {
        window.attachEvent ( "onbeforeprint",alturaBeforePrint );
        window.attachEvent ( "onafterprint",alturaAfterPrint );
    }

    // Tabs are supported for browser supporting the XHTML 1.0 standard
    if (hasSupport())
    {
        initTables ();
      //  initTabs ();
        clearTabCookies ();
    }

    // Call initPage function. This function can be defined in the page that
    // includes this JavaScript. It's used to for example to support the nested
    // tabs in the UI designer
    try
    {
		 
        initPage ();
		 
		 Page.adjustShadowLayout();
		 
		  
    }
    catch ( ex )
    {
        // no initPage function defined. We don't have to do anything
    }

}

function alturaFinish ()
{
    // Clear TableBehaviors
    for (var i=0;i<tableBehaviors.length;i++)
    {
        var tableBehavior = tableBehaviors [ i ];
        tableBehavior.dispose ();
    }

    // Clear TabPanes
    for (var i=0;i<tabPanes.length;i++)
    {
        var tabPane = tabPanes [ i ];
        tabPane.dispose ();
    }

    tableBehaviors = null;
    tabPanes = null;

    // IE specific function to trigger the garbage collector
    try
    {
        CollectGarbage();
    }
    catch ( ex )
    {
        // no CollectGarbage defined so we don't have to do anything
    }
}

/**
 * Create a nice shadow around certain tables. A filter is used to create
 * the shadow. Filters are IE specific and thus only appear when the application
 * is run in IE
 *
 * NOTE: Uncomment the code in this method to enable shadows in IE.
 */
function setShadow ( a_element,a_on )
{
    /***
    if (a_element==null)
    {
        return;
    }

    if (getIEVersionNumber()>5)
    {
        if (a_on)
        {
            a_element.style.filter = "progid:DXImageTransform.Microsoft.Shadow(color='#777777', Direction=135, Strength=4) alpha(Opacity=90)";
        }
        else
        {
            a_element.style.filter = "none";
        }
    }
    ***/
}

/**
 * Method called before the page is printed. Only called when using
 * IE on Windows
 *
 */
function alturaBeforePrint ()
{
    for (var i=0;i<tabPanes.length;i++)
    {
        var tabPane = tabPanes [ i ];
        tabPane.prepareForPrint ();
    }

    for (var i=0;i<tableBehaviors.length;i++)
    {
        var tableBehavior = tableBehaviors [ i ];
        tableBehavior.prepareForPrint ();
    }

}

/**
 * Method called after the page is printed. Only called when using
 * IE on Windows
 *
 */
function alturaAfterPrint ()
{
    for (var i=0;i<tabPanes.length;i++)
    {
        var tabPane = tabPanes [ i ];
        tabPane.restoreFromPrint ();
    }

    for (var i=0;i<tableBehaviors.length;i++)
    {
        var tableBehavior = tableBehaviors [ i ];
        tableBehavior.restoreFromPrint ();
    }


}

/**
 * Look for tables for which additional behavior can be attached
 */
function initTables ()
{
    var tableCollection = document.getElementsByTagName ( "TABLE" );

    for (var i=0;i<tableCollection.length;i++)
    {
        var tableElt = tableCollection [ i ];
        if (isValidTable(tableElt))
        {
            var tableBehavior = new TableBehavior ( tableElt );
            tableBehavior.attach ();
            tableBehaviors [ tableBehaviors.length ] = tableBehavior;
        }
    }
}

/**
 * Check if the table is valid in order to attach the additional behavior
 */
function isValidTable ( a_tableElt )
{
    var id = a_tableElt.id;

    if ( (id.substr(0,"grid-table".length)!="grid-table") &&
         (a_tableElt.className!="browse-table") &&
         (a_tableElt.className!="selectlist-table") &&
         (a_tableElt.className!="maint-rel-table") )
    {
        return false;
    }

    if ( (a_tableElt.tHead!=null)&&(a_tableElt.tBodies.length>0) )
    {
        return true;
    }

    return false;
}


/**
 * Init the TabPane object
 */
function initTabs ()
{
    var tabPane = new TabPane ();

    var tableArray = document.getElementsByTagName ( "TABLE" );
    for (var i=0;i<tableArray.length;i++)
    {
        var tableElt = tableArray [ i ];
        if ( (tableElt.className=="tab")||(tableElt.className=="tab-main") )
        {
            tabPane.addTabPage ( tableElt );
        }
    }

    tabPane.paint ();
    tabPanes [ tabPanes.length ] = tabPane;
}

/**
 * Iniy a specific TabPage
 *
 * a_id: TabPane id defined in the HTML page (see TabPane constructor)
 */
function initTabPane ( a_id, bRoundedBottom )
{
    var tabPane = new TabPane ();
    tabPane.m_borderRounded = bRoundedBottom;

    var tableArray = document.getElementsByTagName ( "TABLE" );
    for (var i=0;i<tableArray.length;i++)
    {
        var tableElt = tableArray [ i ];
        if (tableElt.id==a_id)
        {
            tabPane.addTabPage ( tableElt );
        }
    }

    tabPane.paint ();
    tabPanes [ tabPanes.length ] = tabPane;
}


/**
 * Clear cookies that save the active tab of maintenance pages
 */
function clearTabCookies ()
{
    if ( ((getTableWithId("table-menu")!=null) || (getTableWithClass("browse-table")!=null)) && (getTableWithClass("tab")==null) )
    {
        var cookieStr = document.cookie;

        var re = new RegExp( "(\;|^)[ ]*([^;=][^;]*\.tabIndex)\=([^;]*)(;|$)" );
        var res = cookieStr.match ( re );

        while (res!=null)
        {
            var cookieName = RegExp.$2;
            clearCookie ( cookieName );

            cookieStr = RegExp.rightContext;
            res = cookieStr.match ( re );
        }
    }
}

/**
 * Search for a table with a certain id. In IE this would be very
 * simple using the getElementById method. However, firefox doesn't have
 * such a method
 */
function getTableWithId ( a_id )
{
    var tableArray = document.getElementsByTagName ( "TABLE" );
    for (var i=0;i<tableArray.length;i++)
    {
        var tableElt = tableArray [ i ];
        if (tableElt.id==a_id)
        {
            return tableElt;
        }
    }
    return null;
}


/**
 * Search for a table with a certain class.
 */
function getTableWithClass ( a_className )
{
    var tableArray = document.getElementsByTagName ( "TABLE" );
    for (var i=0;i<tableArray.length;i++)
    {
        var tableElt = tableArray [ i ];
        if (tableElt.className==a_className)
        {
            return tableElt;
        }
    }
    return null;
}


/**
 * Class used for retrieving rows (TR) and cells (TD) elements
 * from a HTML table
 *
 * a_tableElt: Element refering to a <TABLE> element
 */
function HTMLTable ( a_tableElt )
{
    this.m_tableElt = a_tableElt;
}

/**
 * Return reference to a row (<TR> element) in the table
 *
 * a_row: Row number (zero-based)
 */
HTMLTable.prototype.getTRElement = function ( a_row )
{
    var trArray = this.m_tableElt.getElementsByTagName ( "TR" );
    if (a_row<trArray.length)
    {
        return trArray [ a_row ];
    }
    else
    {
        return null;
    }
}

/**
 * Return reference to a cell ( <TD> element) in the table
 *
 * a_row: Row number (zero-based)
 * a_column: Column number (zero-based)
 */
HTMLTable.prototype.getTDElement = function ( a_row,a_column )
{
    var trElt = this.getTRElement ( a_row );
    if (trElt==null)
    {
        return null;
    }

    var tdArray = trElt.getElementsByTagName ( "TD" );

    if (a_column<tdArray.length)
    {
        return tdArray [ a_column ];
    }
    else
    {
        return null;
    }
}

/**
 * Return a reference to a cell with a certain class name in the table
 *
 * a_row: Row number (zero-based)
 * a_className: Class name to search for
 */
HTMLTable.prototype.getTDElementWithClassName = function ( a_row,a_className )
{
    var trElt = this.getTRElement ( a_row );
    var tdArray = trElt.getElementsByTagName ( "TD" );

    for (var i=0;i<tdArray.length;i++)
    {
        var tdElt = tdArray [ i ];
        if (tdElt.className==a_className)
        {
            return tdElt;
        }
    }
    return null;
}

/**
 * Class representing a TabPane. The TabPane consists of TabPage objects.
 * The TabPane depends on the following structure:
 *
 * <TABLE class="tab" cellspacing="0">
 *   <TR>
 *     <TD class="active-tab">Label tab 1</TD>
 *     <TD class="clear-tab" width="100%">&nbsp;</TD>
 *   </TR>
 * </TABLE>
 * <TABLE class="content-tab" WIDTH="100%">
 *   <TR>
 *     <TD>Content of tab 1</TD>
 *   </TR>
 * </TABLE>
 *
 * <!-- Same structure for next tabs -->
 *
 * This structure makes sure that the pages still looks nice if the browser
 * doesn't support DOM level 1
 *
 * The first table with class="tab" is used to add additional cells representing
 * the tabs. Activating a tab means that the associated table with class="content-tab"
 * is made visible.
 *
 * Nested and multiple tab panes on the same page are currently not supported
 */
function TabPane ()
{
    // Reference to the first table element with class="tab"
    this.m_tabPaneElt = null;
    // Array of TabPage objects
    this.m_tabPages = new Array ();
    // Reference to the active TabPage object */
    this.m_activeTabPage = null;
    // Page ID used to save the active tab across pages
    this.m_pageId = null;
    // Has rounded corners?
    this.m_borderRounded = false;
}

/**
 * Clean-up resources (needed otherwise IE will consume more and more memory; FireFox does
 * not have this problem)
 */
TabPane.prototype.dispose = function ()
{
    for (var i=0;i<this.m_tabPages.length;i++)
    {
        var tabPage = this.m_tabPages [ i ];
        tabPage.dispose ();
    }
    this.m_tabPaneElt = null;
    this.m_tabPages = null;
    this.m_activeTabPage = null;
    this.m_borderRounded = null;
}


/**
 * Get active tab index. The active tab is taken from a non-persistent cookie.
 * To get a unique name for the cookie for this page, the getUniquePageID method
 * is called.
 */
TabPane.prototype.getActiveTabIndex = function ()
{
    var tabIndex = getCookie ( this.getUniquePageId() );
    if (tabIndex==null)
    {
        return 0;
    }
    else
    {
        return parseInt ( tabIndex );
    }
}

/**
 * Determine a unique id for this page. This is determined by using
 * concatenating the text of the different tabs (see comment at TabPane constructor).
 * The id only has to be unique withint the user's session, because the id is used
 * to remember the last active tab which is only important per user. If another algorithm
 * is needed, reimplement this method.
 */
TabPane.prototype.getUniquePageId = function ()
{
    if (this.m_pageId!=null)
    {
        return this.m_pageId;
    }

    this.m_pageId = this.m_tabPaneElt.id + ".tabIndex";
    return this.m_pageId;
}


/**
 * Method called to prepare for printing. All tab folders
 * are made visible, so that one print prints all
 */
TabPane.prototype.prepareForPrint = function ()
{
    for (var i=0;i<this.m_tabPages.length;i++)
    {
        var tabPage = this.m_tabPages [ i ];
        tabPage.prepareForPrint ();
    }
}

/**
 * Method called after printing. This makes sure
 * that the TabPane is displayed as a TabPane
 */
TabPane.prototype.restoreFromPrint = function ()
{
    for (var i=0;i<this.m_tabPages.length;i++)
    {
        var tabPage = this.m_tabPages [ i ];
        tabPage.restoreFromPrint ();
    }
}


/**
 * "Paint" the TabPane object. This means that TD elements are added to the first
 * table element with class="tab"
 */
TabPane.prototype.paint = function ()
{
    if (this.m_tabPaneElt==null)
    {
        return;
    }

    if (this.m_activeTabPage==null)
    {
        this.m_activeTabPage = this.m_tabPages [ 0 ];
    }

    for (var i=0;i<this.m_tabPages.length;i++)
    {
        var tabPage = this.m_tabPages [ i ];
        this.paintTabPage ( tabPage );
    }

    // Make the TabPane object visible
    this.m_tabPaneElt.style.display = "";
    // Activate the active TabPage
    this.m_activeTabPage.activate ();
}

/**
 * "Paint" each TabPage object. For each TabPage object a TD element is created, which
 * is added to the first table element with class="tab"
 *
 * a_tabPage: reference to a TabPage object
 */
TabPane.prototype.paintTabPage = function ( a_tabPage )
{
    var table = new HTMLTable ( this.m_tabPaneElt );

    if (a_tabPage.m_index==0)
    {
        var trElt = table.getTRElement ( 0 );
        var tdElt = table.getTDElementWithClassName ( 0,"active-tab" );

        trElt.replaceChild ( a_tabPage.m_tabElt,tdElt );
    }
    else
    {
        var trElt = table.getTRElement ( 0 );
        var tdElt = table.getTDElementWithClassName ( 0,"clear-tab" );

        trElt.insertBefore ( a_tabPage.m_tabElt,tdElt );
    }
}

/**
 * Add a tab page to the TabPane. This is done by passing a reference
 * to a table element with class="tab".
 *
 * a_tableElt: reference to table element with class="tab"
 */
TabPane.prototype.addTabPage = function ( a_tableElt )
{
    var index = this.m_tabPages.length;

    var tabPage = new TabPage ( this,index,a_tableElt );
    this.m_tabPages [ index ] = tabPage;

    if (index==0)
    {
        // We use the first table element to add the tab pages to
        this.m_tabPaneElt = a_tableElt;
    }

    if (index==this.getActiveTabIndex())
    {
        this.m_activeTabPage = tabPage;
    }

}

/**
 * Activate a certain TabPage
 *
 * a_index: index of the tab page to activate
 */
TabPane.prototype.select = function ( a_index )
{
    this.m_activeTabPage.deactivate ();
    this.m_activeTabPage = this.m_tabPages [ a_index ];
    this.m_activeTabPage.activate ();

    setCookie ( this.getUniquePageId(),a_index );

    onResize ();
}

/**
 * Class representing a TabPage. When constructing a TabPage a reference
 * to a table element with class="tab" is passed. The TabPage class
 * expects the following structure of this table element:
 *
 * <TABLE class="tab" cellspacing="0">
 *   <TR>
 *     <TD class="active-tab">Label tab 1</TD>
 *     <TD class="clear-tab" width="100%">&nbsp;</TD>
 *   </TR>
 * </TABLE>
 *
 * a_tabPane: reference to TabPane object "owning" this TabPage
 * a_index: the index of the TabPage
 * a_tableElt: reference to the table element
 */
function TabPage ( a_tabPane,a_index,a_tableElt )
{
    this.m_tabPane = a_tabPane;
    this.m_index = a_index;

    this.m_tableTabElt = a_tableElt;
    // Find the associated table representing the content of this tab page
    this.m_tableContentElt = this.getContentElt ( a_tableElt );

    setShadow ( this.m_tableContentElt,true );

    // Hide both table elements
    this.m_tableTabElt.style.display = "none";
    this.m_tableContentElt.style.display = "none";

    // Clone the TD element respresenting the label of the tab page
    // The TD element is later added to the first table with class="tab" (see TabPane class)
    var table = new HTMLTable ( a_tableElt );

    this.m_tabElt = table.getTDElementWithClassName ( 0,"active-tab" ).cloneNode ( true );
    this.m_tabElt.className = "inactive-tab";

    // Attach event handler to the new TD element
    var thisObj = this;
    this.m_tabElt.onclick = function () { thisObj.select (); };
}

/**
 * Clean-up resources (needed otherwise IE will consume more and more memory; FireFox does
 * not have this problem)
 */
TabPage.prototype.dispose = function ()
{
    this.m_tabPane = null;
    this.m_index = null;
    this.m_tableTabElt = null;
    this.m_tableContentElt = null;
    this.m_tabElt = null;
}

/**
 * Make the TabPage printable
 */
TabPage.prototype.prepareForPrint = function ()
{
    this.m_tableTabElt.style.display = "";
    if (this.m_index!=0)
    {
        this.m_tabElt.style.display = "none";
    }
    else
    {
        this.m_tabElt.className = "active-tab";
    }
    this.m_tableContentElt.style.display = "";
    setShadow ( this.m_tableContentElt,false );
}

/**
 * Make the TabPage ready for use again after printing
 */
TabPage.prototype.restoreFromPrint = function ()
{
    if (this.m_index!=0)
    {
        this.m_tableTabElt.style.display = "none";
    }

    this.m_tabElt.style.display = "";

    setShadow ( this.m_tableContentElt,true );

    if (this.m_tabPane.m_activeTabPage==this)
    {
        this.m_tabElt.className = "active-tab";
        this.m_tableContentElt.style.display = "";
        this.m_tableContentElt.className = "content-tab";
        if (this.m_tabPane.m_borderRounded) this.m_tableContentElt.style.borderBottom="0px";
    }
    else
    {
        this.m_tabElt.className = "inactive-tab";
        this.m_tableContentElt.style.display = "none";
    }
}

/**
 * Active this TabPage
 */
TabPage.prototype.activate = function ()
{
    this.m_tabElt.className = "active-tab";
    this.m_tableContentElt.style.display = "";
}

/**
 * Deactivate this TabPage
 */
TabPage.prototype.deactivate = function ()
{
    this.m_tabElt.className = "inactive-tab";
    this.m_tableContentElt.style.display = "none";
}

/**
 * Method called when the user clicks on the TabPage.
 */
TabPage.prototype.select = function ()
{
    // Tell the TabPane that this TabPage needs to be selected
    this.m_tabPane.select ( this.m_index );
}

/**
 * Find the associated table element with class="content-tab" representing the content of the
 * TabPage.
 *
 * a_tableElt: reference to the table element with class="tab"
 */
TabPage.prototype.getContentElt = function ( a_tableElt )
{
    var elt = a_tableElt.nextSibling;

    while (elt!=null)
    {
        if (elt.className=="content-tab")
        {
            if (this.m_tabPane.m_borderRounded) elt.style.borderBottom="0px";
            return elt;
        }
        elt = elt.nextSibling;
    }

    return null;
}

/**
 * TableBehaviore class. When this is attached to a (valid) table element
 * the table gets the following functionality:
 *
 * - selecting (highlighting) a row
 * - selecting (highlighting) a column
 * - reordering columns via drag and drop
 *
 * Additional functionality will be added in the future
 *
 * a_tableElt: reference to a valid table element
 */
function TableBehavior ( a_tableElt )
{
    // Reference to table element
    this.m_tableElt = a_tableElt;

    // Selected row and style
    this.m_selectedRow = null;
    this.m_selectedRowClassName = null;

    // Selected column and style
    this.m_selectedColumn = null;
    this.m_selectedColumnClassName = null;

    // Reference to thead element the mouse is current above (while dragging a header)
    this.m_thead = null;
    this.m_theadClassName = null;

    // Used for dragging the header
    this.m_dragHeader = null;
    this.m_dragIndex = 0;
    this.m_dragX = 0;
    this.m_dragY = 0;

    // Header of column that is being resized
    this.m_resizeHeader = null;
    this.m_resizeIndex = 0;

    // Create an array of header objects to make hit detection easy
    this.m_headers = new Array ();

    // Initialize
    this.init();
}


/**
 * Initialize the TableBehavior
 */
TableBehavior.prototype.init = function ()
{
    var inputElt = this.getNextElt(this.m_tableElt.parentNode.firstChild,"input");
    if (inputElt!=null)
    {
        var selectedRow = inputElt.value;
        if (selectedRow>=0)
        {
            var trElt = this.m_tableElt.tBodies[0].rows[selectedRow];
            this.m_selectedRow = trElt;
            this.m_selectedRowClassName = trElt.className;
            this.selectRow(trElt,true);
        }
    }

    setTimeout("onResize()",1);
}


/**
 * Clean-up resources (needed otherwise IE will consume more and more memory; FireFox does
 * not have this problem)
 */
TableBehavior.prototype.dispose = function ()
{
    this.m_tableElt = null;
    this.m_selectedRow = null;
    this.m_selectedRowClassName = null;
    this.m_thead = null;
    this.m_theadClassName = null;
    this.m_dragHeader = null;
    this.m_resizeHeader = null;
    this.m_headers = null;
}

/**
 * Make the Table printable
 */
TableBehavior.prototype.prepareForPrint = function ()
{
}

/**
 * Make the Table ready for use again after printing
 */
TableBehavior.prototype.restoreFromPrint = function ()
{
}

/**
 * Check if the element has a parent element with a certain tag
 *
 * a_element: element to start a looking for a parent
 * a_tag: the tag to search for
 */
TableBehavior.prototype.hasParentElt = function ( a_element,a_tag )
{
    return this.getParentElt(a_element,a_tag) != null;
}

/**
 * Return a reference to the first parent element with a certain tag
 *
 * a_element: element to start a looking for a parent
 * a_tag: the tag to search for
 */
TableBehavior.prototype.getParentElt = function ( a_element,a_tag )
{
    if (!a_element.nodeName)
    {
        return null;
    }

    var parentElt = a_element;
    while ( parentElt!=this.m_tableElt )
    {
        if (parentElt.nodeName.toLowerCase()==a_tag.toLowerCase())
        {
            return parentElt;
        }
        parentElt = parentElt.parentNode;
    }

    return null;
}

/**
 * Return a reference to the first previous sibling element with a certain tag
 *
 * a_element: element to start a looking for a previous sibling
 * a_tag: the tag to search for
 */
TableBehavior.prototype.getNextElt = function ( a_element,a_tag )
{
    var node = a_element;

    while (node!=null)
    {
        if (node.nodeName.toLowerCase()==a_tag.toLowerCase())
        {
            return node;
        }
        else
        {
            node = node.nextSibling;
        }
    }
    return null;
}

/**
 * Attach event handlers to the table element
 */
TableBehavior.prototype.attach = function ()
{
    var thisObj = this;
    this.m_tableElt.onclick = function (event) { thisObj.onClick(event); };
    this.m_tableElt.onmousedown = function (event) { thisObj.onMouseDown(event); };
    this.m_tableElt.onmouseup = function (event) { thisObj.onMouseUp(event); };
    this.m_tableElt.onmousemove = function (event) { thisObj.onMouseMove(event); };
}


/**
 * Special event handler for non IE browsers. Called when certain
 * elements capture mouse events
 *
 * @param a_event Event Object
 */
TableBehavior.prototype.handleEvent = function ( a_event )
{
    if (a_event.type=="mousemove")
    {
        this.onMouseMove ( a_event );
    }
    else if (a_event.type=="mouseup")
    {
        this.onMouseUp ( a_event );
    }

}


/**
 * Init the headers of the table. This means that absolute
 * position information is saved of each headers, which is used later
 * for hit detection when draggen a header
 */
TableBehavior.prototype.initHeaders = function ()
{
    var thead = this.m_tableElt.tHead;

    if (thead==null)
    {
        return;
    }

    var theadRow = thead.rows.item(0)
    var theads = theadRow.cells;

    for (var i=0;i<theads.length;i++)
    {
        var thead = theads [ i ];

        var pos = getAbsolutePosition ( thead );

        var headerInfo = new Object ();
        headerInfo.ref = thead;
        headerInfo.x = pos.m_x;
        headerInfo.y = pos.m_y;
        headerInfo.width  = thead.clientWidth;
        headerInfo.height = thead.clientHeight;

        this.m_headers [ i ] = headerInfo;
    }
}

/**
 * Check is the table has rows
 */
TableBehavior.prototype.hasRows = function ()
{
    var tbodies = this.m_tableElt.tBodies;

    if (tbodies.length==0)
    {
        return false;
    }

    if (tbodies.item(0).className=="row-empty")
    {
        return false;
    }

    return true;
}

/**
 * onClick event handler
 *
 * @param a_event Event object (in case of non-IE browser)
 */
TableBehavior.prototype.onClick = function ( a_event )
{
/*  !Disabled functionality for master-detail (currently selecting!
    !a row does not select this row to be the master)!

    var evt = a_event==null ? event : a_event;

    if (!this.hasRows())
    {
        return;
    }

    var targetElt = getTarget ( evt );

    if (targetElt.nodeName!="INPUT" && this.hasParentElt(targetElt,"TH"))
    {
        this.onClickColumn ( this.getParentElt(targetElt,"TH") );
    }
    else if (targetElt.nodeName!="INPUT" && this.hasParentElt(targetElt,"TD"))
    {
        this.onClickRow ( this.getParentElt(targetElt,"TR") );
    }
*/
}

/**
 * When a column is clicked the column is selected or deselected
 *
 * a_thElt: reference to <TH> element on which is clicked
 */
TableBehavior.prototype.onClickColumn = function ( a_thElt )
{
    if (this.m_selectedColumn==a_thElt)
    {
        if (this.isColumnSelected(this.m_selectedColumn))
        {
            this.selectColumn ( this.m_selectedColumn,false );
        }
        else
        {
            this.selectColumn ( this.m_selectedColumn,true );
        }
    }
    else
    {
        if (this.m_selectedColumn!=null)
        {
            this.selectColumn ( this.m_selectedColumn,false );
        }

        this.m_selectedColumn = a_thElt;
        this.m_selectedColumnClassName = a_thElt.className;
        this.selectColumn ( this.m_selectedColumn,true );
    }
}

/**
 * When a row is clicked the row is selected or deselected
 *
 * a_trElt: reference to <TR> element on which is clicked
 */
TableBehavior.prototype.onClickRow = function ( a_trElt )
{
    if (this.m_selectedRow==a_trElt)
    {
        if (this.isRowSelected(this.m_selectedRow))
        {
            this.selectRow ( this.m_selectedRow,false );
        }
        else
        {
            this.selectRow ( this.m_selectedRow,true );
        }
    }
    else
    {
        if (this.m_selectedRow!=null)
        {
            this.selectRow ( this.m_selectedRow,false );
        }

        this.m_selectedRow = a_trElt;
        this.m_selectedRowClassName = a_trElt.className;

        this.selectRow ( this.m_selectedRow,true );
    }
}

/**
 * Select or deselect a row
 *
 * a_row: reference to <TR> element to be selected/deselected
 * a_select: true=select, false=deselect
 */
TableBehavior.prototype.selectRow = function ( a_row,a_select )
{
    if (a_select)
    {
        a_row.className = "row-selected";
    }
    else
    {
        a_row.className = this.m_selectedRowClassName;
    }
}

/**
 * Check if a row is selected
 */
TableBehavior.prototype.isRowSelected = function ( a_row )
{
    return a_row.className=="row-selected";
}

/**
 * Select or deselect a column
 *
 * a_column: reference to the <TH> element to be selected/deselected
 * a_select: true=select, false=deselect
 */
TableBehavior.prototype.selectColumn = function ( a_column,a_select )
{
    var tbody = this.m_tableElt.tBodies[0];

    for (var row=0;row<tbody.rows.length;row++)
    {
        if (a_select)
        {
            tbody.rows[row].cells[a_column.cellIndex].className = "column-selected";
        }
        else
        {
            tbody.rows[row].cells[a_column.cellIndex].className = this.m_selectedColumnClassName;
        }
    }
}

/**
 * Check is a column is selected
 *
 * a_column: reference to the <TH> element to be selected/deselected
 */
TableBehavior.prototype.isColumnSelected = function ( a_column )
{
    var tbody = this.m_tableElt.tBodies[0];
    return tbody.rows[0].cells[a_column.cellIndex].className == "column-selected";
}

/**
 * Handle mouse down events
 *
 * @param a_event Event object (in case of non-IE browser)
 */
TableBehavior.prototype.onMouseDown = function (a_event)
{
    var evt = a_event==null ? event : a_event;

    if (!this.hasRows())
    {
        return;
    }

    var targetElt = getTarget ( evt );

    if (!this.hasParentElt(targetElt,"TH"))
    {
        return;
    }

    var thElt = this.getParentElt ( targetElt,"TH" );

    // Check if the mouse is down in the resizing area...
    if (thElt.style.cursor=="e-resize")
    {
        this.createResizeHeader ( evt );
    }
    else
    {
        this.createDraggingHeader ( evt );
    }

    cancelEvent ( evt );
}

/**
 * Create temporary header for resizing columns
 *
 * @param a_event Event Object
 */
TableBehavior.prototype.createResizeHeader = function ( a_event )
{
    var evt = a_event==null ? event : a_event;

    var targetElt = getTarget ( evt );
    var thElt = this.getParentElt ( targetElt,"TH" );

    this.m_resizeHeader = thElt.cloneNode ( true );
    this.m_resizeHeader.style.position = "absolute";
    this.m_resizeHeader.style.width = thElt.offsetWidth + "px";
    this.m_resizeHeader.style.height = thElt.offsetHeight + "px";
    if (getIEVersionNumber()>5)
    {
        this.m_resizeHeader.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=65)";
    }
    else
    {
        this.m_resizeHeader.style.opacity = "0.65";
        this.m_resizeHeader.className = "header-drag";
    }
    this.m_resizeHeader.style.borderStyle = "outset";
    this.m_resizeIndex = thElt.cellIndex;

    var pos = getAbsolutePosition ( thElt );
    this.m_resizeHeader.style.left = pos.m_x + "px";
    this.m_resizeHeader.style.top  = pos.m_y + "px";

    // We hide the hide until it is being moved
    this.m_resizeHeader.style.display = "none";

    thElt.parentNode.insertBefore ( this.m_resizeHeader,null );

    if (this.m_resizeHeader.setCapture)
    {
        this.m_resizeHeader.setCapture ();
    }
    else
    {
        document.body.addEventListener ( "mousemove",this,true);
        document.body.addEventListener ( "mouseup",this,true);
    }
}

/**
 * Create temporary header for dragging in order to reorder the columns
 * of the table
 *
 * @param a_event Event Object
 */
TableBehavior.prototype.createDraggingHeader = function ( a_event )
{
    var evt = a_event==null ? event : a_event;

    var targetElt = getTarget ( evt );
    var thElt = this.getParentElt ( targetElt,"TH" );

    this.m_dragHeader = thElt.cloneNode ( true );
    this.m_dragHeader.style.position = "absolute";
    this.m_dragHeader.style.width = thElt.offsetWidth + "px";
    this.m_dragHeader.style.height = thElt.offsetHeight + "px";
    if (getIEVersionNumber()>5)
    {
        this.m_dragHeader.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=65)";
    }
    else
    {
        this.m_dragHeader.style.opacity = "0.65";
        this.m_dragHeader.className = "header-drag";
    }
    this.m_dragHeader.style.borderStyle = "outset";
    this.m_dragIndex = thElt.cellIndex;

    var pos = getAbsolutePosition ( thElt );
    this.m_dragHeader.style.left = pos.m_x + "px";
    this.m_dragHeader.style.top  = pos.m_y + "px";

    // We hide the hide until it is being moved
    this.m_dragHeader.style.display = "none";

    thElt.parentNode.insertBefore ( this.m_dragHeader,null );

    this.m_dragX = evt.clientX - pos.m_x;
    this.m_dragY = evt.clientY - pos.m_y;

    this.m_thead = thElt;

    if (this.m_dragHeader.setCapture)
    {
        this.m_dragHeader.setCapture ();
    }
    else
    {
        document.body.addEventListener ( "mousemove",this,true);
        document.body.addEventListener ( "mouseup",this,true);
    }
}

/**
 * Handle mouse up events
 *
 * @param a_event Event object (in case of non-IE browser)
 */
TableBehavior.prototype.onMouseUp = function ( a_event )
{
    var evt = a_event==null ? event : a_event;

    if (this.m_dragHeader!=null)
    {
        this.copyColumn ( this.m_dragIndex,this.m_thead.cellIndex );

        if (this.m_dragHeader.releaseCapture)
        {
            this.m_dragHeader.releaseCapture ();
        }
        else
        {
            document.body.removeEventListener ( "mousemove",this,true );
            document.body.removeEventListener ( "mouseup",this,true );
        }

        this.m_dragHeader.parentNode.removeChild ( this.m_dragHeader );
        this.m_dragHeader = null;

        // "Remove" the hit detection color by setting the orginal style class
        this.m_thead.className = this.m_theadClassName;
        this.m_thead = null;
        this.m_theadClassName = null;
    }
    else if (this.m_resizeHeader!=null)
    {
        var header = this.m_headers [ this.m_resizeIndex ];

        var newWidth = evt.clientX + document.body.scrollLeft - header.x;

        if (newWidth>0)
        {
            header.ref.style.width = newWidth + "px";

            // Reinitialize headers
            this.initHeaders ();
        }

        if (this.m_resizeHeader.releaseCapture)
        {
            this.m_resizeHeader.releaseCapture ();
        }
        else
        {
            document.body.removeEventListener ( "mousemove",this,true );
            document.body.removeEventListener ( "mouseup",this,true );
        }

        this.m_resizeHeader.parentNode.removeChild ( this.m_resizeHeader );
        this.m_resizeHeader = null;
    }
}

/**
 * Handle mouse move events
 *
 * @param a_event Event object (in case of non-IE browser)
 */
TableBehavior.prototype.onMouseMove = function ( a_event )
{
    var evt = a_event==null ? event : a_event;

    var targetElt = getTarget ( evt );

    if (this.m_dragHeader!=null)
    {
        this.handleDragging ( evt );
    }
    else if (this.m_resizeHeader!=null)
    {
        this.handleResizing ( evt );
    }
    else
    {
        if (!this.hasParentElt(targetElt,"TH"))
        {
            return;
        }

        var thElt = this.getParentElt ( targetElt,"TH" );

        var header = this.m_headers [ thElt.cellIndex ];

        if (header==null) {
            return;
        }

        var mouseX = evt.clientX + document.body.scrollLeft;
        var mouseY = evt.clientY + document.body.scrollTop;

        var resizeX1 = header.x + header.width - 4;
        var resizeX2 = header.x + header.width + 2;

        if ( (mouseX>=resizeX1)&&(mouseX<=resizeX2) )
        {
            thElt.style.cursor = "e-resize";
        }
        else
        {
            thElt.style.cursor = "";
        }
    }

}

/**
 * Handle resizing of column
 *
 * @param a_event Event object (in case of non-IE browser)
 */
TableBehavior.prototype.handleResizing = function ( a_event )
{
    var evt = a_event==null ? event : a_event;

    if (this.m_resizeHeader.style.display=="none")
    {
        this.m_resizeHeader.style.display = "";
    }

    var header = this.m_headers [ this.m_resizeIndex ];

    var newWidth = evt.clientX + document.body.scrollLeft - header.x;

    if (newWidth>0)
    {
        this.m_resizeHeader.style.width = newWidth + "px";
    }

    // Prevent text being selected during resizing
    cancelEvent(evt);
}

/**
 * Handle dragging of header in order to reorder the columns
 *
 * @param a_event Event object (in case of non-IE browser)
 */
TableBehavior.prototype.handleDragging = function ( a_event )
{
    var evt = a_event==null ? event : a_event;

    if (this.m_dragHeader.style.display=="none")
    {
        this.m_dragHeader.style.display = "";
    }

    this.m_dragHeader.style.left = evt.clientX - this.m_dragX  + "px";

    var pos = getAbsolutePosition ( this.m_dragHeader );

    var thead = this.checkHeaderHit ( evt.clientX - this.m_dragX + this.m_dragHeader.offsetWidth/2,pos.m_y );
    if (thead!=null)
    {
        if (this.m_thead==null)
        {
            this.m_thead = thead;
            this.m_theadClassName = thead.className;
            thead.className = "header-dragover";
        }
        else if (this.m_thead!=thead)
        {
            this.m_thead.className = this.m_theadClassName;
            this.m_thead = thead;
            this.m_theadClassName = thead.className;
            thead.className = "header-dragover";
        }
    }

    // Prevent text being selected when the header is dragged by the mouse
    cancelEvent(evt);
}


/**
 * Check if and which header is under the specified position
 *
 * a_x: x position
 * a_y: y position
 */
TableBehavior.prototype.checkHeaderHit = function ( a_x,a_y )
{
    for (var i=0;i<this.m_headers.length;i++)
    {
        var header = this.m_headers [ i ];

        if ( (a_x>=header.x) && (a_x<(header.x + header.width)) &&
             (a_y>=header.y) && (a_y<(header.y + header.height)) )
        {
            return header.ref;
        }
    }
    return null;
}

/**
 * Copy a column from one place to another
 *
 * a_indexFrom: index of column to be copied
 * a_indexTo: index of column to be copied to
 */
TableBehavior.prototype.copyColumn = function ( a_indexFrom,a_indexTo )
{
    if (!this.isColumnMoveable(a_indexFrom))
    {
        return;
    }

    if (!this.isColumnMoveable(a_indexTo))
    {
        return;
    }

    if (a_indexFrom==a_indexTo)
    {
        return;
    }

    var thead = this.m_tableElt.tHead;

    if (thead==null)
    {
        return;
    }

    var theadRow = thead.rows [ 0 ];

    if (a_indexFrom>a_indexTo)
    {
        var tempHTML = theadRow.cells [ a_indexFrom ].innerHTML;
        var tempWidth = theadRow.cells [ a_indexFrom ].style.width;
        var tempAlign = theadRow.cells [ a_indexFrom ].align;
        for (var i=a_indexFrom;i>a_indexTo;i--)
        {
            theadRow.cells[i].innerHTML = theadRow.cells[i - 1].innerHTML;
            theadRow.cells[i].style.width = theadRow.cells[i - 1].style.width;
            theadRow.cells[i].align = theadRow.cells[i - 1].align;
        }
        theadRow.cells [ a_indexTo ].innerHTML = tempHTML;
        theadRow.cells [ a_indexTo ].style.width = tempWidth;
        theadRow.cells [ a_indexTo ].align = tempAlign;
    }
    else
    {
        var tempHTML = theadRow.cells [ a_indexFrom ].innerHTML;
        var tempWidth = theadRow.cells [ a_indexFrom ].style.width;
        var tempAlign = theadRow.cells [ a_indexFrom ].align;
        for (var i=a_indexFrom;i<a_indexTo;i++)
        {
            theadRow.cells[i].innerHTML = theadRow.cells[i + 1].innerHTML;
            theadRow.cells[i].style.width = theadRow.cells[i + 1].style.width;
            theadRow.cells[i].align = theadRow.cells[i + 1].align;
        }
        theadRow.cells [ a_indexTo ].innerHTML = tempHTML;
        theadRow.cells [ a_indexTo ].style.width = tempWidth;
        theadRow.cells [ a_indexTo ].align = tempAlign;
    }

    var tbody = this.m_tableElt.tBodies [ 0 ];

    for (var row=0;row<tbody.rows.length;row++)
    {
        if (a_indexFrom>a_indexTo)
        {
            var tempHTML = tbody.rows[row].cells[a_indexFrom].innerHTML
            var tempAlign = tbody.rows[row].cells[a_indexFrom].align
            for (var i=a_indexFrom;i>a_indexTo;i--)
            {
                tbody.rows[row].cells[i].innerHTML = tbody.rows[row].cells[i - 1].innerHTML
                tbody.rows[row].cells[i].align = tbody.rows[row].cells[i - 1].align
            }
            tbody.rows[row].cells[a_indexTo].innerHTML = tempHTML;
            tbody.rows[row].cells[a_indexTo].align = tempAlign;
        }
        else
        {
            var tempHTML = tbody.rows[row].cells[a_indexFrom].innerHTML
            var tempAlign = tbody.rows[row].cells[a_indexFrom].align
            for (var i=a_indexFrom;i<a_indexTo;i++)
            {
                tbody.rows[row].cells[i].innerHTML = tbody.rows[row].cells[i + 1].innerHTML
                tbody.rows[row].cells[i].align = tbody.rows[row].cells[i + 1].align
            }
            tbody.rows[row].cells[a_indexTo].innerHTML = tempHTML;
            tbody.rows[row].cells[a_indexTo].align = tempAlign;
        }
    }

    // Reinitialize headers
    this.initHeaders ();
}

/**
 * Check if a column is moveable. Apparently columns with <INPUT> elements
 * fail. Don't know why yet
 *
 * a_columnIndex: index of column to check if it is moveable
 */
TableBehavior.prototype.isColumnMoveable = function ( a_columnIndex )
{
    var tbody = this.m_tableElt.tBodies [ 0 ];
    var td = tbody.rows [ 0 ].cells [ a_columnIndex ];

    if (td==null)
    {
        return false;
    }
    else
    {
        // UI Designer uses tables with id "grid-table"
        if (this.m_tableElt.id=="grid-table")
        {
            return td.tagName.toLowerCase()=="td"
        }
        else
        {
            return td.getElementsByTagName("FORM").length==0;
        }
    }
}

/**
 * Get target of the event
 *
 * @param a_event Event Object
 */
function getTarget(a_event) {
    return a_event.srcElement ? a_event.srcElement : a_event.target;
}

/**
 * Cancel event
 *
 * @param a_event Event Object
 */
function cancelEvent(a_event) {
    if (a_event.preventDefault) {
        a_event.preventDefault ();
        a_event.stopPropagation ();
    } else {
        a_event.cancelBubble = false;
        a_event.returnValue = false;
    }
}

/**
 * When the window is resized, the headers need to be reinitialized (absolute positions have changed)
 */
function onResize ()
{
    for (var i=0;i<tableBehaviors.length;i++)
    {
        var tableBehavior = tableBehaviors [ i ];
        tableBehavior.initHeaders ();
    }
}

/**
 * Structure representing a point
 */
function Point ( a_x,a_y )
{
    this.m_x = a_x;
    this.m_y = a_y;
}

/**
 * Returns the absolute position of a element
 */
function getAbsolutePosition ( a_element )
{
    var pos = new Point ( 0,0 );

    var elt = a_element;
    while (elt.offsetParent!=null)
    {
        pos.m_x += elt.offsetLeft;
        pos.m_y += elt.offsetTop;

        elt = elt.offsetParent;
    }

    return pos;
}

/**
 * Check if the browser has the needed features
 */
function hasSupport ()
{
    if (getIEVersionNumber()>5)
    {
        return true;
    }

    return (document.implementation!=null) && document.implementation.hasFeature ( "html","1.0" );
}

/**
 * Returns the version number of IE or 0 if
 * its not IE
 */
function getIEVersionNumber( ) {
    var ua = navigator.userAgent;
    var MSIEOffset = ua.indexOf("MSIE ");
    if (MSIEOffset == -1)
    {
        return 0;
    }
    else
    {
        return parseFloat(ua.substring(MSIEOffset + 5, ua.indexOf(";", MSIEOffset)));
    }
}

/**
 * Save a value in a non-persistent cookie
 */
function setCookie ( a_name,a_value )
{
    document.cookie = a_name + "=" + a_value;
}

/**
 * Get a value from a cookie
 */
function getCookie ( a_name )
{
    var re = new RegExp( "(\;|^)[^;]*(" + a_name + ")\=([^;]*)(;|$)" );
    var res = re.exec( document.cookie );
    return res != null ? RegExp.$3 : null;
}

/**
 * Clear cookie (so the cookie is not sent to the server anymore)
 */
function clearCookie ( a_name )
{
    var day = -1;

    var expiryDate = new Date();
    expiryDate.setTime( expiryDate.getTime() + day * 24 * 60 * 60 * 1000 );

    var expires = "; expires=" + expiryDate.toGMTString();
    document.cookie = a_name + "= " + expires;
}

/**
 * Updates image with id 'which' and sets src to 'src'.
 * If src is not a valid image type, it uses 'defaultSrc'
 */
function updatePhoto(id, filePath, origSrc, defaultSrc) {
    if (filePath.length == 0) {
        document.images[id].src = origSrc;
        return;
    }
    if (filePath.indexOf("/") != 0) {
        filePath = "/" + filePath;
    }
    filePath = "file://" + filePath;
    if (!hasValidSuffix(filePath)) {
        document.images[id].src = defaultSrc;
        return;
    }
    document.images[id].src = filePath;
}

/**
 * Returns true if 'str' endsWith 'suffix'
 */
function endsWith(str, suffix) {
    if (suffix.length == 0) {
        return true;
    }

    return str.length >= suffix.length &&
           str.indexOf(suffix) == str.length - suffix.length;
}


/**
 * Returns true if 'src' ends in one of the suffixes in validPhotoSuffixes array.
 */
var validPhotoSuffixes = new Array('.bmp',  '.emf',  '.gif',  '.icl',  '.icn',  '.ico',  '.iff',
                                   '.jpeg', '.jpg',  '.pbm',  '.pcx',  '.pgm',  '.pic',  '.pict',
                                   '.pix',  '.png',  '.ppm',  '.psd',  '.psp',  '.ras',  '.sgi',
                                   '.tga',  '.tif',  '.tiff', '.wmf',  '.xbm',  '.xpm');
function hasValidSuffix(src) {
    src = src.toLowerCase();
    for (var i = 0 ; i < validPhotoSuffixes.length; i++) {
        if (endsWith(src, validPhotoSuffixes[i])) {
            return true;
        }
    }

    return false;
}

/**
 * Make tag visible by id
 */
function makeVisibleById( id ) {
    document.getElementById(id).style.visibility="visible";
}

