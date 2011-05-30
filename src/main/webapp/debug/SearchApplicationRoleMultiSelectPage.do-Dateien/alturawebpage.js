//GEN-GUARD-NOGEN:ALTURAWEBPAGE$pid11d118c16093cf7c7
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
 * Class responsible for creating WebWidget objects
 */
function WidgetFactory()
{
}

/**
 * Array holding previously created WebWidgets
 */
WidgetFactory.widgets = new Array();

/**
 * Perform an element check to assure the element represents a specific widget
 *
 * @private
 * @param a_type Widget type (e.g. WebTextField, WebButton, ...)
 * @param a_id id of element in DOM
 * @param a_eltNames Either one or a list of valid element names
 * @param a_attributeName (Optional) Name of an attribute to check
 * @param a_attributeValues (Optional) Either one or a list of valid attribute values
 */
WidgetFactory.check = function(a_type,a_id,a_eltNames,a_attributeName,a_attributeValues)
{
    var elt = document.getElementById(a_id);
    if (elt==null)
    {
        alert("ERROR: Element with id '" + a_id + "' not found!");
        return false;
    }

    var eltNameCheck = false;

    if (typeof a_eltNames=="string")
    {
        eltNameCheck = elt.nodeName.toLowerCase()==a_eltNames.toLowerCase();
    }
    else
    {
        for (var i=0;i < a_eltNames.length;i++)
        {
            var eltName = a_eltNames[i];
            if (elt.nodeName.toLowerCase()==eltName.toLowerCase())
            {
                eltNameCheck = true;
                break;
            }
        }
    }

    if (!eltNameCheck)
    {
        alert("ERROR: Element with id '" + a_id + "' is not of type " + a_type + "!");
        return false;
    }

    if (a_attributeName==null || a_attributeValues==null)
    {
        return true;
    }

    var attrValueCheck = false;

    if (typeof a_attributeValues=="string")
    {
        attrValueCheck = elt[a_attributeName]==a_attributeValues
    }
    else
    {
        for (var i=0;i < a_attributeValues.length;i++)
        {
            var attributeValue = a_attributeValues[i];
            if (elt[a_attributeName]==attributeValue)
            {
                attrValueCheck = true;
                break;
            }
        }
    }

    if (!attrValueCheck)
    {
        alert("ERROR: Element with id '" + a_id + "' is not of type " + a_type + "!");
        return false;
    }

    return true;
}

/**
 * Create a WebLabel
 *
 * @param a_id id of element in DOM representing a WebLabel
 */
WidgetFactory.createWebLabel = function(a_id)
{
    if (!WidgetFactory.check("WebLabel",a_id,"span"))
    {
        return null;
    }
    var webLabel = WidgetFactory.widgets[a_id];
    if (webLabel==null)
    {
        webLabel = new WebLabel(a_id);
        WidgetFactory.widgets[a_id] = webLabel;
    }
    return webLabel;
}

/**
 * Create a WebErrorLabel
 *
 * @param a_id id of element in DOM representing a WebErrorLabel
 */
WidgetFactory.createWebErrorLabel = function(a_id)
{
    if (!WidgetFactory.check("WebErrorLabel",a_id,"span"))
    {
        return null;
    }
    var webErrorLabel = WidgetFactory.widgets[a_id];
    if (webErrorLabel==null)
    {
        webErrorLabel = new WebErrorLabel(a_id);
        WidgetFactory.widgets[a_id] = webErrorLabel;
    }
    return webErrorLabel;
}


/**
 * Create a WebTextField
 *
 * @param a_id id of element in DOM representing a WebTextField
 */
WidgetFactory.createWebTextField = function(a_id)
{
    if (!WidgetFactory.check("WebTextField",a_id,"input","type","text"))
    {
        return null;
    }
    var webTextField = WidgetFactory.widgets[a_id];
    if (webTextField==null)
    {
        webTextField = new WebTextField(a_id);
        WidgetFactory.widgets[a_id] = webTextField;
    }
    return webTextField;
}

/**
 * Create a WebTextArea
 *
 * @param a_id id of element in DOM representing a WebTextArea
 */
WidgetFactory.createWebTextArea = function(a_id)
{
    if (!WidgetFactory.check("WebTextArea",a_id,"textarea"))
    {
        return null;
    }
    var webTextArea = WidgetFactory.widgets[a_id];
    if (webTextArea==null)
    {
        webTextArea = new WebTextArea(a_id);
        WidgetFactory.widgets[a_id] = webTextArea;
    }
    return webTextArea;
}

/**
 * Create a WebPasswordField
 *
 * @param a_id id of element in DOM representing a WebPasswordField
 */
WidgetFactory.createWebPasswordField = function(a_id)
{
    if (!WidgetFactory.check("WebPasswordField",a_id,"input","type","password"))
    {
        return null;
    }
    var webPasswordField = WidgetFactory.widgets[a_id];
    if (webPasswordField==null)
    {
        webPasswordField = new WebPasswordField(a_id);
        WidgetFactory.widgets[a_id] = webPasswordField;
    }
    return webPasswordField;
}

/**
 * Create a WebHidden
 *
 * @param a_id id of element in DOM representing a WebHidden
 */
WidgetFactory.createWebHidden = function(a_id)
{
    if (!WidgetFactory.check("WebHidden",a_id,"input","type","hidden"))
    {
        return null;
    }
    var webHidden = WidgetFactory.widgets[a_id];
    if (webHidden==null)
    {
        webHidden = new WebHidden(a_id);
        WidgetFactory.widgets[a_id] = webHidden;
    }
    return webHidden;
}

/**
 * Create a WebCalendar
 *
 * @param a_id id of element in DOM representing a WebCalendar
 */
WidgetFactory.createWebCalendar = function(a_id)
{
    if (!WidgetFactory.check("WebCalendar",a_id,"input","type","text"))
    {
        return null;
    }
    var webCalendar = WidgetFactory.widgets[a_id];
    if (webCalendar==null)
    {
        webCalendar = new WebCalendar(a_id);
        WidgetFactory.widgets[a_id] = webCalendar;
    }
    return webCalendar;
}

/**
 * Create a WebCheckBox
 *
 * @param a_id id of element in DOM representing a WebCheckBox
 */
WidgetFactory.createWebCheckBox = function(a_id)
{
    if (!WidgetFactory.check("WebCheckBox",a_id,"input","type","checkbox"))
    {
        return null;
    }
    var webCheckBox = WidgetFactory.widgets[a_id];
    if (webCheckBox==null)
    {
        webCheckBox = new WebCheckBox(a_id);
        WidgetFactory.widgets[a_id] = webCheckBox;
    }
    return webCheckBox;
}

/**
 * Create a WebRadioButton
 *
 * @param a_id id of element in DOM representing a WebCheckBox
 */
WidgetFactory.createWebRadioButton = function(a_id)
{
    if (!WidgetFactory.check("WebRadioButton",a_id,"input","type","radio"))
    {
        return null;
    }
    var webRadioButton = WidgetFactory.widgets[a_id];
    if (webRadioButton==null)
    {
        webRadioButton = new WebRadioButton(a_id);
        WidgetFactory.widgets[a_id] = webRadioButton;
    }
    return webRadioButton;
}

/**
 * Create a WebRadioGroup
 *
 * @param a_id id of element in DOM representing a WebRadioGroup
 */
WidgetFactory.createWebRadioGroup = function(a_id)
{
    if (!WidgetFactory.check("WebRadioGroup",a_id,"span"))
    {
        return null;
    }
    var webRadioGroup = WidgetFactory.widgets[a_id];
    if (webRadioGroup==null)
    {
        webRadioGroup = new WebRadioGroup(a_id);
        WidgetFactory.widgets[a_id] = webRadioGroup;
    }
    return webRadioGroup;
}

/**
 * Create a WebListBox
 *
 * @param a_id id of element in DOM representing a WebListBox
 */
WidgetFactory.createWebListBox = function(a_id)
{
    if (!WidgetFactory.check("WebListBox",a_id,"select"))
    {
        return null;
    }
    var webListBox = WidgetFactory.widgets[a_id];
    if (webListBox==null)
    {
        webListBox = new WebListBox(a_id);
        WidgetFactory.widgets[a_id] = webListBox;
    }
    return webListBox;
}

/**
 * Create a WebDropDownList
 *
 * @param a_id id of element in DOM representing a WebDropDownList
 */
WidgetFactory.createWebDropDownList = function(a_id)
{
    if (!WidgetFactory.check("WebDropDownList",a_id,"select"))
    {
        return null;
    }
    var webDropDownList = WidgetFactory.widgets[a_id];
    if (webDropDownList==null)
    {
        webDropDownList = new WebDropDownList(a_id);
        WidgetFactory.widgets[a_id] = webDropDownList;
    }
    return webDropDownList;
}

/**
 * Create a WebUploadField
 *
 * @param a_id id of element in DOM representing a WebUploadField
 */
WidgetFactory.createWebUploadField = function(a_id)
{
    if (!WidgetFactory.check("WebUploadField",a_id,"input","type","file"))
    {
        return null;
    }
    var webUploadField = WidgetFactory.widgets[a_id];
    if (webUploadField==null)
    {
        webUploadField = new WebUploadField(a_id);
        WidgetFactory.widgets[a_id] = webUploadField;
    }
    return webUploadField;
}

/**
 * Create a WebButton
 *
 * @param a_id id of element in DOM representing a WebButton
 */
WidgetFactory.createWebButton = function(a_id)
{
    if (!WidgetFactory.check("WebButton",a_id,"input","type",["button","submit"]))
    {
        return null;
    }
    var webButton = WidgetFactory.widgets[a_id];
    if (webButton==null)
    {
        webButton = new WebButton(a_id);
        WidgetFactory.widgets[a_id] = webButton;
    }
    return webButton;
}

/**
 * Create a WebLink
 *
 * @param a_id id of element in DOM representing a WebLink
 */
WidgetFactory.createWebLink = function(a_id)
{
    if (!WidgetFactory.check("WebLink",a_id,"a"))
    {
        return null;
    }
    var webLink = WidgetFactory.widgets[a_id];
    if (webLink==null)
    {
        webLink = new WebLink(a_id);
        WidgetFactory.widgets[a_id] = webLink;
    }
    return webLink;
}

/**
 * Create a WebImage
 *
 * @param a_id id of element in DOM representing a WebImage
 */
WidgetFactory.createWebImage = function(a_id)
{
    if (!WidgetFactory.check("WebImage",a_id,["img","a"]))
    {
        return null;
    }
    var webImage = WidgetFactory.widgets[a_id];
    if (webImage==null)
    {
        webImage = new WebImage(a_id);
        WidgetFactory.widgets[a_id] = webImage;
    }
    return webImage;
}

/**
 * Create a WebPanel
 *
 * @param a_id id of element in DOM representing a WebPanel
 */
WidgetFactory.createWebPanel = function(a_id)
{
    if (!WidgetFactory.check("WebPanel",a_id,["div","table"]))
    {
        return null;
    }
    var webPanel = WidgetFactory.widgets[a_id];
    if (webPanel==null)
    {
        webPanel = new WebPanel(a_id);
        WidgetFactory.widgets[a_id] = webPanel;
    }
    return webPanel;
}

/**
 * Create a WebErrorPanel
 *
 * @param a_id id of element in DOM representing a WebErrorPanel
 */
WidgetFactory.createWebErrorPanel = function(a_id)
{
    if (!WidgetFactory.check("WebErrorPanel",a_id,["div","table"]))
    {
        return null;
    }
    var webErrorPanel = WidgetFactory.widgets[a_id];
    if (webErrorPanel==null)
    {
        webErrorPanel = new WebErrorPanel(a_id);
        WidgetFactory.widgets[a_id] = webErrorPanel;
    }
    return webErrorPanel;
}

/**
 * Create a WebRepeatingPanel
 *
 * @param a_id id of element in DOM representing a WebRepeatingPanel
 */
WidgetFactory.createWebRepeatingPanel = function(a_id)
{
    if (!WidgetFactory.check("WebRepeatingPanel",a_id,"div"))
    {
        return null;
    }
    var webRepeatingPanel = WidgetFactory.widgets[a_id];
    if (webRepeatingPanel==null)
    {
        webRepeatingPanel = new WebRepeatingPanel(a_id);
        WidgetFactory.widgets[a_id] = webRepeatingPanel;
    }
    return webRepeatingPanel;
}

/**
 * Create a WebGridPanel
 *
 * @param a_id id of element in DOM representing a WebGridPanel
 */
WidgetFactory.createWebGridPanel = function(a_id)
{
    var id = "grid-table-" + a_id;
    
    if (!WidgetFactory.check("WebGridPanel",id,"table"))
    {
        return null;
    }
    var webGridPanel = WidgetFactory.widgets[id];
    if (webGridPanel==null)
    {
        webGridPanel = new WebGridPanel(id);
        WidgetFactory.widgets[id] = webGridPanel;
    }
    return webGridPanel;
}


/**
 * Base class for WebPage specific class handling the events
 */
function AlturaWebPage()
{
}

/**
 * Get WebLabel object with specified id
 *
 * @param a_id id of element in DOM representing a WebLabel
 */
AlturaWebPage.prototype.getWebLabel = function(a_id)
{
    return WidgetFactory.createWebLabel(a_id);
}

/**
 * Get WebErrorLabel object with specified id
 *
 * @param a_id id of element in DOM representing a WebErrorLabel
 */
AlturaWebPage.prototype.getWebErrorLabel = function(a_id)
{
    return WidgetFactory.createWebErrorLabel(a_id);
}

/**
 * Get WebTextField object with specified id
 *
 * @param a_id id of element in DOM representing a WebTextField
 */
AlturaWebPage.prototype.getWebTextField = function(a_id)
{
    return WidgetFactory.createWebTextField(a_id);
}

/**
 * Get WebTextArea object with specified id
 *
 * @param a_id id of element in DOM representing a WebTextArea
 */
AlturaWebPage.prototype.getWebTextArea = function(a_id)
{
    return WidgetFactory.createWebTextArea(a_id);
}

/**
 * Get WebPasswordField object with specified id
 *
 * @param a_id id of element in DOM representing a WebPasswordField
 */
AlturaWebPage.prototype.getWebPasswordField = function(a_id)
{
    return WidgetFactory.createWebPasswordField(a_id);
}

/**
 * Get WebHidden object with specified id
 *
 * @param a_id id of element in DOM representing a WebHidden
 */
AlturaWebPage.prototype.getWebHidden = function(a_id)
{
    return WidgetFactory.createWebHidden(a_id);
}

/**
 * Get WebCalendar object with specified id
 *
 * @param a_id id of element in DOM representing a WebCalendar
 */
AlturaWebPage.prototype.getWebCalendar = function(a_id)
{
    return WidgetFactory.createWebCalendar(a_id);
}

/**
 * Get WebCheckBox object with specified id
 *
 * @param a_id id of element in DOM representing a WebCheckBox
 */
AlturaWebPage.prototype.getWebCheckBox = function(a_id)
{
    return WidgetFactory.createWebCheckBox(a_id);
}

/**
 * Get WebRadioGroup object with specified id
 *
 * @param a_id id of element in DOM representing a WebRadioGroup
 */
AlturaWebPage.prototype.getWebRadioGroup = function(a_id)
{
    return WidgetFactory.createWebRadioGroup(a_id);
}

/**
 * Get WebListBox object with specified id
 *
 * @param a_id id of element in DOM representing a WebListBox
 */
AlturaWebPage.prototype.getWebListBox = function(a_id)
{
    return WidgetFactory.createWebListBox(a_id);
}

/**
 * Get WebDropDownList object with specified id
 *
 * @param a_id id of element in DOM representing a WebDropDownList
 */
AlturaWebPage.prototype.getWebDropDownList = function(a_id)
{
    return WidgetFactory.createWebDropDownList(a_id);
}

/**
 * Get WebUploadField object with specified id
 *
 * @param a_id id of element in DOM representing a WebUploadField
 */
AlturaWebPage.prototype.getWebUploadField = function(a_id)
{
    return WidgetFactory.createWebUploadField(a_id);
}

/**
 * Get WebButton object with specified id
 *
 * @param a_id id of element in DOM representing a WebButton
 */
AlturaWebPage.prototype.getWebButton = function(a_id)
{
    return WidgetFactory.createWebButton(a_id);
}

/**
 * Get WebLink object with specified id
 *
 * @param a_id id of element in DOM representing a WebLink
 */
AlturaWebPage.prototype.getWebLink = function(a_id)
{
    return WidgetFactory.createWebLink(a_id);
}

/**
 * Get WebImage object with specified id
 *
 * @param a_id id of element in DOM representing a WebImage
 */
AlturaWebPage.prototype.getWebImage = function(a_id)
{
    return WidgetFactory.createWebImage(a_id);
}

/**
 * Get WebPanel object with specified id
 *
 * @param a_id id of element in DOM representing a WebPanel
 */
AlturaWebPage.prototype.getWebPanel = function(a_id)
{
    return WidgetFactory.createWebPanel(a_id);
}

/**
 * Get WebErrorPanel object with specified id
 *
 * @param a_id id of element in DOM representing a WebErrorPanel
 */
AlturaWebPage.prototype.getWebErrorPanel = function(a_id)
{
    return WidgetFactory.createWebErrorPanel(a_id);
}

/**
 * Get WebRepeatingPanel object with specified id
 *
 * @param a_id id of element in DOM representing a WebRepeatingPanel
 */
AlturaWebPage.prototype.getWebRepeatingPanel = function(a_id)
{
    return WidgetFactory.createWebRepeatingPanel(a_id);
}

/**
 * Get WebGridPanel object with specified id
 *
 * @param a_id id of element in DOM representing a WebGridPanel
 */
AlturaWebPage.prototype.getWebGridPanel = function(a_id)
{
    return WidgetFactory.createWebGridPanel(a_id);
}
