//GEN-GUARD:ALTURAWEBGRIDPANEL$pid11d118c16093cf7c7
/*
 * © 2001-2008 Compuware Corporation.  All rights reserved.
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

/**
 * Class representing a WebRepeatingPanel. Inherits from WebPanel.
 *
 * @param a_id id of element in DOM representing the WebRepeatingPanel
 */
function WebRepeatingPanel(a_id)
{
    WebPanel.prototype.constructor.call(this,a_id);
}

WebRepeatingPanel.prototype = new WebPanel();
WebRepeatingPanel.prototype.constructor = WebRepeatingPanel

/**
 * Attach Event Handler. Two options are available:
 * <ol>
 *   <li>
 * Attach event on the WebRepeatingPanel:
 * <pre>
 * attachEvent("onclick",object)
 * </pre>
 * The event handler method will have the following signature
 * <pre>
 * function WebRepeatingPanelId_eventName(event,row)
 * </pre>
 *    </li>
 *    <li>
 * Attach event on widgets placed inside the WebRepeatingPanel
 * <pre>
 * attchEvent("widgetId","onclick",object)
 * </pre>
 * The event handler method will have the following signature
 * <pre>
 * function widgetId_eventName(event,row)
 * </pre>
 *    </li>
 * </ol>
 */
WebRepeatingPanel.prototype.attachEvent = function()
{
    if (arguments.length==2)
    {
        var event = arguments[0];
        var object = arguments[1];
        this.attachEventOnPanel(this.m_elt.id,event,object);
    }
    else if (arguments.length==3)
    {
        var id = arguments[0];
        var event = arguments[1];
        var object = arguments[2];
        if (document.getElementById(id)!=null)
        {
            this.attachEventOnWidgetInHeader(id,event,object);
        }
        else
        {
            this.attachEventOnWidgetInGrid(id,event,object);
        }
    }
}

/**
 * Attach event directly on this panel
 *
 * @private
 * @see WebRepeatingPanel#attachEvent
 */
WebRepeatingPanel.prototype.attachEventOnPanel = function(a_event,a_object)
{
    var eventHandler = this.getEventHandler(this.m_elt.id,a_event,a_object);

    this.m_elt[a_event + "_old"] = this.m_elt[a_event];
    this.m_elt[a_event] = eventHandler;
}

/**
 * Attach event on widget placed inside this WebRepeatingPanel
 *
 * @private
 * @see WebRepeatingPanel#attachEvent
 */
WebRepeatingPanel.prototype.attachEventOnWidgetInGrid = function(a_id,a_event,a_object)
{
    var eventHandler = this.getEventHandler(a_id,a_event,a_object);

    var row = 0;
    while(true)
    {
        var element = document.getElementById(a_id + "_" + row);

        if (element==null)
        {
            break;
        }

        if (element.type && element.type=="checkbox" && a_event=="onchange" && !element.onchange)
        {
            element[a_event + "_old"] = element[a_event];
            element["onclick"] = eventHandler;
        }
        else if(element.name && element.name=="webradiogroup")
        {
            var inputElements = element.getElementsByTagName("input");
            for (var i=0;i < inputElements.length;i++)
            {
                var inputElement = inputElements[i];
                if (inputElement.type="radio")
                {
                    if (a_event=="onchange" && !element.onchange)
                    {
                        inputElement[a_event + "_old"] = element[a_event];
                        inputElement["onclick"] = eventHandler;
                    }
                    else
                    {
                        element[a_event + "_old"] = element[a_event];
                        element[a_event] = eventHandler;
                    }
                }
             }
        }
        else
        {
            element[a_event + "_old"] = element[a_event];
            element[a_event] = eventHandler;
        }

        row++;
    }
}

/**
 * Create and return event handler function
 *
 * @private
 * @param a_event
 * @param a_methodName
 * @param a_object
 */
WebRepeatingPanel.prototype.getEventHandler = function(a_id,a_event,a_object)
{
    var methodName = a_id + "_" + a_event;
    var webRepeatingPanel = this.m_elt;

    var eventHandler =
    function(a_evt)
    {
        // Firefox passes the event as parameter, whereas IE makes it
        // available throught the window object
        var evt = a_evt ? a_evt : window.event;
        var target = evt.srcElement ? evt.srcElement : evt.target;

        var rowElement = target;
        while(rowElement!=null && rowElement.parentNode!=webRepeatingPanel)
        {
            rowElement = rowElement.parentNode;
        }

        var row = -1;

        if (rowElement!=null)
        {
            row = 0;
            var element = webRepeatingPanel.firstChild;
            while(element!=null && element!=rowElement)
            {
                if(element.nodeType==1)
                {
                    row++;
                }
                element = element.nextSibling;
            }
        }

        var propagateEvent = a_object[methodName](evt,row);
        if(propagateEvent)
        {
            var oldEventHandler = target[a_event + "_old"];
            if (oldEventHandler!=null)
            {
                propagateEvent = oldEventHandler(evt);
            }
        }
        return propagateEvent;
    };

    return eventHandler;
}

/**
 * Return the number of rows in the WebRepeatingPanel
 */
WebRepeatingPanel.prototype.getRowCount = function()
{
    var rowCount = 0;
    var element = this.m_elt.firstChild;
    while(element!=null)
    {
        if (element.nodeType==1)
        {
            rowCount++;
        }
        element = element.nextSibling;
    }
    return rowCount;
}

/**
 * Return the data of the WebWidgets contained in the specified row as an object. This
 * object will have properties representing the (form) names (not the ids!) of the
 * WebWidgets.
 *
 * @param a_row Row index (0-based)
 */
WebRepeatingPanel.prototype.getRowData = function(a_row)
{
    if (a_row < 0 || a_row >= this.getRowCount())
    {
        return null;
    }

    var row = 0;
    var element = this.m_elt.firstChild;
    while(element!=null)
    {
        if (element.nodeType==1)
        {
            if (row==a_row)
            {
                break;
            }
            row++;
        }

        element = element.nextSibling;
    }

    return getElementData(element);
}

/**
 * Method inherited from WebPanel
 */
WebRepeatingPanel.prototype.getData = function()
{
    alert("Not supported");
}

/**
 * Method inherited from WebPanel
 */
WebRepeatingPanel.prototype.setData = function(a_object)
{
    alert("Not supported");
}

/**
 * Get WebLabel object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebLabel
 * @param a_row row that contains the WebLabel
 */
WebRepeatingPanel.prototype.getWebLabel = function(a_id,a_row)
{
    return WidgetFactory.createWebLabel(a_id + "_" + a_row);
}

/**
 * Get WebErrorLabel object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebErrorLabel
 * @param a_row row that contains the WebErrorLabel
 */
WebRepeatingPanel.prototype.getWebErrorLabel = function(a_id,a_row)
{
    return WidgetFactory.createWebErrorLabel(a_id + "_" + a_row);
}

/**
 * Get WebTextField object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebTextField
 * @param a_row row that contains the WebTextField
 */
WebRepeatingPanel.prototype.getWebTextField = function(a_id,a_row)
{
    return WidgetFactory.createWebTextField(a_id + "_" + a_row);
}

/**
 * Get WebTextArea object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebTextArea
 * @param a_row row that contains the WebTextArea
 */
WebRepeatingPanel.prototype.getWebTextArea = function(a_id,a_row)
{
    return WidgetFactory.createWebTextArea(a_id + "_" + a_row);
}

/**
 * Get WebCalendar object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebCalendar
 * @param a_row row that contains the WebCalendar
 */
WebRepeatingPanel.prototype.getWebCalendar = function(a_id,a_row)
{
    return WidgetFactory.createWebCalendar(a_id + "_" + a_row);
}

/**
 * Get WebPasswordField object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebPasswordField
 * @param a_row row that contains the WebPasswordField
 */
WebRepeatingPanel.prototype.getWebPasswordField = function(a_id,a_row)
{
    return WidgetFactory.createWebPasswordField(a_id + "_" + a_row);
}

/**
 * Get WebUploadField object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebUploadField
 * @param a_row row that contains the WebUploadField
 */
WebRepeatingPanel.prototype.getWebUploadField = function(a_id,a_row)
{
    return WidgetFactory.createWebUploadField(a_id + "_" + a_row);
}

/**
 * Get WebCheckBox object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebCheckBox
 * @param a_row row that contains the WebCheckBox
 */
WebRepeatingPanel.prototype.getWebCheckBox = function(a_id,a_row)
{
    return WidgetFactory.createWebCheckBox(a_id + "_" + a_row);
}

/**
 * Get WebRadioGroup object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebRadioGroup
 * @param a_row row that contains the WebRadioGroup
 */
WebRepeatingPanel.prototype.getWebRadioGroup = function(a_id,a_row)
{
    return WidgetFactory.createWebRadioGroup(a_id + "_" + a_row);
}

/**
 * Get WebDropDownList object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebDropDownList
 * @param a_row row that contains the WebDropDownList
 */
WebRepeatingPanel.prototype.getWebDropDownList = function(a_id,a_row)
{
    return WidgetFactory.createWebDropDownList(a_id + "_" + a_row);
}

/**
 * Get WebListBox object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebListBox
 * @param a_row row that contains the WebListBox
 */
WebRepeatingPanel.prototype.getWebListBox = function(a_id,a_row)
{
    return WidgetFactory.createWebListBox(a_id + "_" + a_row);
}

/**
 * Get WebButton object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebDropDownList
 * @param a_row row that contains the WebButton
 */
WebRepeatingPanel.prototype.getWebButton = function(a_id,a_row)
{
    return WidgetFactory.createWebButton(a_id + "_" + a_row);
}

/**
 * Get WebLink object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebLink
 * @param a_row row that contains the WebLink
 */
WebRepeatingPanel.prototype.getWebLink = function(a_id,a_row)
{
    return WidgetFactory.createWebLink(a_id + "_" + a_row);
}

/**
 * Get WebImage object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebImage
 * @param a_row row that contains the WebImage
 */
WebRepeatingPanel.prototype.getWebImage = function(a_id,a_row)
{
    return WidgetFactory.createWebImage(a_id + "_" + a_row);
}

/**
 * Get WebHidden object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebHidden
 * @param a_row row that contains the WebHidden
 */
WebRepeatingPanel.prototype.getWebHidden = function(a_id,a_row)
{
    return WidgetFactory.createWebHidden(a_id + "_" + a_row);
}

/**
 * Get WebPanel object with specified id on the specified row
 *
 * @param a_id id of element in DOM representing a WebPanel
 * @param a_row row that contains the WebPanel
 */
WebRepeatingPanel.prototype.getWebPanel = function(a_id,a_row)
{
    return WidgetFactory.createWebPanel(a_id + "_" + a_row);
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebGridPanel. Inherits from WebRepeatingPanel
 *
 * @param a_id id of element in DOM representing the WebGridPanel
 */
function WebGridPanel(a_id)
{
    WebRepeatingPanel.prototype.constructor.call(this,a_id);
}

WebGridPanel.prototype = new WebRepeatingPanel();
WebGridPanel.prototype.constructor = WebGridPanel;

/**
 * Attach Event Handler
 *
 * @see WebRepeatingPanel#attachEvent
 */
WebGridPanel.prototype.attachEvent = function()
{
    if (arguments.length==3)
    {
        var id = arguments[0];
        var event = arguments[1];
        var object = arguments[2];
        if (document.getElementById(id)!=null)
        {
            this.attachEventOnWidgetInHeader(id,event,object);
        }
        else
        {
            WebRepeatingPanel.prototype.attachEventOnWidgetInGrid.call(this,id,event,object);
        }
    }
}

/**
 * Attach event on widget placed in the header or footer
 *
 * @private
 * @see WebRepeatingPanel#attachEvent
 */
WebGridPanel.prototype.attachEventOnWidgetInHeader = function(a_id,a_event,a_object)
{
    var eventHandler = this.getEventHandler(a_id,a_event,a_object);

    var element = document.getElementById(a_id);
    element[a_event + "_old"] = this.m_elt[a_event];
    element[a_event] = eventHandler;
}

/**
 * Create and return event handler function
 *
 * @private
 * @param a_event
 * @param a_methodName
 * @param a_object
 */
WebGridPanel.prototype.getEventHandler = function(a_id,a_event,a_object)
{
    var methodName = a_id + "_" + a_event;

    var eventHandler =
    function(a_evt)
    {
        // Firefox passes the event as parameter, whereas IE makes it
        // available throught the window object
        var evt = a_evt ? a_evt : window.event;
        var target = evt.srcElement ? evt.srcElement : evt.target;
        
        var cell = getParentElement(target,"td");
        if (cell==null)
        {
            cell = getParentElement(target,"th");
        }
        
        var col = cell.cellIndex;
        var row = getParentElement(target,"tr").rowIndex;

        var table = getParentElement(target,"table");
        if (table.tHead!=null)
        {
            row = row - 1;
        }

        var propagateEvent = a_object[methodName](evt,row,col);
        if(propagateEvent)
        {
            var oldEventHandler = target[a_event + "_old"];
            if (oldEventHandler!=null)
            {
                propagateEvent = oldEventHandler(evt);
            }
        }
        return propagateEvent;
    };

    return eventHandler;
}

/**
 * Get row count
 */
WebGridPanel.prototype.getRowCount = function()
{
    var rowCount = this.m_elt.tBodies[0].rows.length;
    
    if (rowCount==1)
    {
        // Ignore the line "no records found" (this is a cell with rowspan 100)
        if (this.m_elt.tBodies[0].rows[0].cells[0].colSpan==100)
        {
            rowCount = 0;
        }
    }
    
    return rowCount;
}

/**
 * Get column count
 */
WebGridPanel.prototype.getColCount = function()
{
    return this.m_elt.tHead.rows[0].cells.length;
}

/**
 * Return the data of the WebWidgets contained in the specified row as an object. This
 * object will have properties representing the (form) names (not the ids!) of the
 * WebWidgets.
 *
 * @param a_row Row number (0-based)
 */
WebGridPanel.prototype.getRowData = function(a_row)
{
    if (row < 0 || row >= this.getRowCount())
    {
        return null;
    }
    var row = this.m_elt.tBodies[0].rows[a_row];
    return getElementData(row);
}

/**
 * Get the value of a cell (used for sorting)
 *
 * @private
 * @param a_row Row number (0-based)
 * @param a_col Column number (0-based)
 */
WebGridPanel.prototype.getCellValue = function(a_row,a_col)
{
    if (a_row<0 || a_row>=this.getRowCount())
    {
        return null;
    }

    if (a_col<0 || a_col>=this.getColCount())
    {
        return null;
    }

    var cell = this.m_elt.tBodies[0].rows[a_row].cells[a_col];

    // Get cell data
    var object = getElementData(cell);

    // Transform cell data into a string
    var value = "";
    for (var propertyName in object)
    {
        value += object[propertyName];
    }
    return value;
}

/**
 * Compare the values of two cells (used for sorting)
 *
 * @private
 * @param a_cell1
 * @param a_cell2
 * @param a_order
 */ 
WebGridPanel.prototype.compare = function(a_cell1,a_cell2,a_order)
{
    var cellValue1 = a_cell1.value;
    var cellValue2 = a_cell2.value;

    if (cellValue1 < cellValue2)
    {
        return a_order=="A" ? -1 : 1;
    }
    else if (cellValue1 > cellValue2)
    {
        return a_order=="A" ? 1 : -1;
    }
    else
    {
        return 0;
    }
}

/**
 * Sort the table on a specific column ascending or descending
 *
 * @param a_col Column to sort on
 * @param a_order Sorting order, "A" for Ascending and "D" for Descending
 */
WebGridPanel.prototype.sort = function(a_col,a_order)
{
    if (a_order!="A" && a_order!="D")
    {
        a_order = "A";
    }

    var rowCount = this.getRowCount();
    if (rowCount<=0)
    {
        return;
    }

    // Build array to be sorted
    var cells = new Array(rowCount);
    for (var row=0;row < rowCount;row++)
    {
        var cell = new Object();
        cell.row = row;
        cell.value = this.getCellValue(row,a_col);
        cells[row] = cell;
    }

    // Sort the array
    var thisObj = this;
    cells.sort
    (
        function(a_cell1,a_cell2)
        {
            return thisObj.compare(a_cell1,a_cell2,a_order);
        }
    );

    // Rebuild table
    var tableBody = this.m_elt.tBodies[0];
    var tableRows = tableBody.rows;


    // Step 1: copy rows from the HTML table to new array in sorted order
    var rows = new Array(rowCount);
    for (var row=0;row < rowCount;row++)
    {
       var cell = cells[row];
       rows[row] = tableRows[cell.row];
    }

    // Step 2: delete all rows from HTML table
    for(var row=rowCount-1;row>=0;row--)
    {
        tableBody.removeChild(rows[row]);
    }

    // Step 3: add the rows again
    for (var row=0;row < rowCount;row++)
    {
        var tableRow = rows[row];
        tableBody.appendChild(tableRow);
    }
}
