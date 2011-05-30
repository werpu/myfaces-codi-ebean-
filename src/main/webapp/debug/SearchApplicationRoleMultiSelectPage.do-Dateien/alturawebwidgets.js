//GEN-GUARD-NOGEN:ALTURAWEBWIDGETS$pid11d118c16093cf7c7
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
 * Cancel event
 *
 * @param a_event Event Object
 */
function cancelEvent(a_event)
{
    if (a_event.stopPropagation)
    {
        a_event.stopPropagation ();
    }
    if (a_event.preventDefault)
    {
        a_event.preventDefault ();
    }
    a_event.cancelBubble = true;
    a_event.returnValue = false;
}

/**
 * This class implements the basic interface and implementation
 * of widgets
 *
 * @param a_id id of element in DOM representing the Widget
 */
function WebWidget(a_id)
{
    // HTML DOM Element representing the Widget
    this.m_elt = document.getElementById(a_id);
}

/**
 * Set style class
 *
 * @param a_styleClass The name of the style class
 */
WebWidget.prototype.setStyleClass = function(a_styleClass)
{
    /**
     * HTML DOM Element being wrapped
     */
    this.m_elt.className = a_styleClass;
}

/**
 * Change Opacity. Note: in IE elements need to have layout!
 *
 * @param a_opacity Opacity, a value between 0 and 1
 */
WebWidget.prototype.setOpacity = function(a_opacity)
{
    // IE:
    // Element needs to have layout! Setting style to "inline-block" might cause the page to
    // be rendered in a undesired manner!
    this.m_elt.style.display = "inline-block";

    var opacity = a_opacity * 100;
    this.m_elt.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opacity + ")";

    // FireFox
    this.m_elt.style.opacity = a_opacity + "";
}

/**
 * Hide or show widget
 *
 * @param a_visible Visibility flag
 */
WebWidget.prototype.setVisible = function(a_visible)
{
    if (a_visible)
    {
        this.m_elt.style.display = "";
    }
    else
    {
        this.m_elt.style.display = "none";
    }
}

/**
 * Check if widget is visible or hidden
 */
WebWidget.prototype.isVisible = function()
{
    return this.m_elt.style.display != "none";
}

/**
 * Enable or disable widget
 *
 * @param a_enabled Enable flag
 */
WebWidget.prototype.setEnabled = function(a_enabled)
{
    this.m_elt.disabled = !a_enabled;
}

/**
 * Check if widget is enabled or disabled
 */
WebWidget.prototype.isEnabled = function()
{
    return !this.m_elt.disabled;
}

/**
 * Return the DOM element encapsulated by this widget
 */
WebWidget.prototype.getDOMElement = function()
{
    return this.m_elt;
}

/**
 * Attach Event Handler. The first argument specifies the event. The second argument
 * specifies the object that contains the event handler method. This method must
 * have the following signature:
 * <pre>
 * function widgetId_eventName(event)
 * </pre>
 * The argument of this function is the DOM event object (for both IE and FireFox)
 *
 * @param a_event Name of the event (onclick, ondblclick, onchange etc.)
 * @param a_object Object that contains event handler method that needs to be called
 */
WebWidget.prototype.attachEvent = function(a_event,a_object)
{
    var methodName = this.m_elt.id + "_" + a_event;
    this.setEventHandler(a_event,methodName,a_object);
}

/**
 * Set event handler callback.
 *
 * @private
 * @param a_event
 * @param a_methodName
 * @param a_object
 */
WebWidget.prototype.setEventHandler = function(a_event,a_methodName,a_object)
{
    var eventHandler = this.getEventHandler(a_event,a_methodName,a_object);

    this.m_elt[a_event + "_old"] = this.m_elt[a_event];
    this.m_elt[a_event] = eventHandler;
}

/**
 * Create and return event handler function
 *
 * @private
 * @param a_event
 * @param a_methodName
 * @param a_object
 */
WebWidget.prototype.getEventHandler = function(a_event,a_methodName,a_object)
{
    var eventHandler =
    function(a_evt)
    {
        // Firefox passes the event as parameter, whereas IE makes it
        // available throught the window object
        var evt = a_evt ? a_evt : window.event;
        var target = evt.srcElement ? evt.srcElement : evt.target;

        var propagateEvent = a_object[a_methodName](evt);
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

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebLabel. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebLabel
 */
function WebLabel(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
    this.m_enabled = true;
    this.m_onclickHandler = null;
}

WebLabel.prototype = new WebWidget();
WebLabel.prototype.constructor = WebLabel;

/**
 * Enable or disable WebLabel
 *
 * @param a_enabled Enable flag
 */
WebLabel.prototype.setEnabled = function(a_enabled)
{
    this.m_enabled = a_enabled;
    if (a_enabled)
    {
        this.setOpacity(1);
        this.m_elt.onclick = this.m_onclickHandler;
    }
    else
    {
        this.setOpacity(0.5);
        this.m_onclickHandler = this.m_elt.onclick;
        this.m_elt.onclick = null;
    }
}

/**
 * Check if WebLabel is enabled or disabled
 */
WebLabel.prototype.isEnabled = function()
{
    return this.m_enabled;
}

/**
 * Get label text
 */
WebLabel.prototype.getLabel = function()
{
    return this.m_elt.innerHTML;
}

/**
 * Set label text
 *
 * @param a_label Label text
 */
WebLabel.prototype.setLabel = function(a_label)
{
    this.m_elt.innerHTML = a_label;
}

/**
 * Get value (label text)
 */
WebLabel.prototype.getValue = function()
{
    return this.getLabel();
}

/**
 * Set value (label text)
 *
 * @param a_value New value
 */
WebLabel.prototype.setValue = function(a_value)
{
    this.setLabel(a_value);
}

/**
 * Get value and convert this value to a int. If the value
 * can not be converted to a int eithet NaN is returned or
 * the default value (optional argument)
 *
 * @param a_default (optional) Default value returned when label can not be converted to int
 */
WebLabel.prototype.getIntValue = function(/* optional */ a_default)
{
    var intValue = parseInt(this.getValue());
    if (isNaN(intValue))
    {
        return a_default!=null ? a_default : NaN;
    }
    else
    {
        return intValue;
    }
}

/**
 * Get value and convert this value to a float. If the value
 * can not be converted to a float eithet NaN is returned or
 * the default value (optional argument)
 *
 * @param a_default (optional) Default value returned when label can not be converted to float
 */
WebLabel.prototype.getFloatValue = function(/* optional */ a_default)
{
    var floatValue = parseFloat(this.getValue());
    if (isNaN(floatValue))
    {
        return a_default!=null ? a_default : NaN;
    }
    else
    {
        return floatValue;
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebErrorLabel. Inherits from WebLabel.
 *
 * @param a_id id of element in DOM representing the WebLabel
 */
function WebErrorLabel(a_id)
{
    WebLabel.prototype.constructor.call(this,a_id);
}

WebErrorLabel.prototype = new WebLabel();
WebErrorLabel.prototype.constructor = WebErrorLabel;

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebTextField. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebTextField
 */
function WebTextField(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
}

WebTextField.prototype = new WebWidget();
WebTextField.prototype.constructor = WebTextField;

/**
 * Get value
 */
WebTextField.prototype.getValue = function()
{
    return this.m_elt.value;
}

/**
 * Set value
 *
 * @param a_value New value
 */
WebTextField.prototype.setValue = function(a_value)
{
    this.m_elt.value = a_value;
}

/**
 * Get value and convert this value to a int. If the value
 * can not be converted to a int eithet NaN is returned or
 * the default value (optional argument)
 *
 * @param a_default (optional) Default value returned when label can not be converted to int
 */
WebTextField.prototype.getIntValue = function(/* optional */ a_default)
{
    var intValue = parseInt(this.m_elt.value);
    if (isNaN(intValue))
    {
        return a_default!=null ? a_default : NaN;
    }
    else
    {
        return intValue;
    }
}

/**
 * Get value and convert this value to a float. If the value
 * can not be converted to a float eithet NaN is returned or
 * the default value (optional argument)
 *
 * @param a_default (optional) Default value returned when label can not be converted to float
 */
WebTextField.prototype.getFloatValue = function(/* optional */ a_default)
{
    var floatValue = parseFloat(this.m_elt.value);
    if (isNaN(floatValue))
    {
        return a_default!=null ? a_default : NaN;
    }
    else
    {
        return floatValue;
    }
}

/**
 * Set focus
 */
WebTextField.prototype.setFocus = function()
{
    this.m_elt.focus();
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebTextArea. Inherits from WebTextField.
 *
 * @param a_id id of element in DOM representing the WebTextArea
 */
function WebTextArea(a_id)
{
    WebTextField.prototype.constructor.call(this,a_id);
}

WebTextArea.prototype = new WebTextField();
WebTextArea.prototype.constructor = WebTextArea;


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebPasswordField. Inherits from WebTextField.
 *
 * @param a_id id of element in DOM representing the WebPasswordField
 */
function WebPasswordField(a_id)
{
    WebTextField.prototype.constructor.call(this,a_id);
}

WebPasswordField.prototype = new WebTextField();
WebPasswordField.prototype.constructor = WebPasswordField;

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebHidden. Inherits from WebTextField.
 *
 * @param a_id id of element in DOM representing the WebHidden
 */
function WebHidden(a_id)
{
    WebTextField.prototype.constructor.call(this,a_id);
}

WebHidden.prototype = new WebTextField();
WebHidden.prototype.constructor = WebHidden;

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebCalendar. Inherits from WebTextField.
 *
 * @param a_id id of element in DOM representing the WebCalendar
 */
function WebCalendar(a_id)
{
    WebTextField.prototype.constructor.call(this,a_id);
}

WebCalendar.prototype = new WebTextField();
WebCalendar.prototype.constructor = WebCalendar;

/**
 * Enable or disable WebCalendar
 *
 * @param a_enabled Enable flag
 */
WebCalendar.prototype.setEnabled = function(a_enabled)
{
    // Get reference to link holding icon element
    var id = this.m_elt.id;
    var webLinkIcon = WidgetFactory.createWebLink("link" + id.substring(0,1).toUpperCase() + id.substring(1) );

    var iconElt = getNextElement(this.m_elt,"a");

    if (a_enabled)
    {
        this.m_elt.disabled = false;
        webLinkIcon.setEnabled(true);
    }
    else
    {
        this.m_elt.disabled = true;
        webLinkIcon.setEnabled(false);
    }
}

/**
 * Hide or show WebCalendar
 *
 * @param a_visible Visibility flag
 */
WebCalendar.prototype.setVisible = function(a_visible)
{
    // Get reference to icon element
    var iconElt = getNextElement(this.m_elt,"a");

    if(a_visible)
    {
        this.m_elt.style.display = "";
        iconElt.style.display = "";
    }
    else
    {
        this.m_elt.style.display = "none";
        iconElt.style.display = "none";
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebCheckBox. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebCheckBox
 */
function WebCheckBox(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
}

WebCheckBox.prototype = new WebWidget();
WebCheckBox.prototype.constructor = WebCheckBox;

/**
 * Check or uncheck the WebCheckBox
 *
 * @param a_checked Checked flag
 */
WebCheckBox.prototype.setChecked = function(a_checked)
{
    this.m_elt.checked = a_checked;
}

/**
 * Check if the WebCheckBox is checked or unchecked
 */
WebCheckBox.prototype.isChecked = function()
{
    return this.m_elt.checked;
}

/**
 * Attach Event Handler.
 *
 * @param a_event Name of the event (onclick, ondblclick, onchange etc.)
 * @param a_object Object that contains event handler method that needs to be called
 * @see WebWidget#attachEvent
 */
WebCheckBox.prototype.attachEvent = function(a_event,a_object)
{
    // IE does not have a onchange event on checkboxes
    if (a_event=="onchange" && !this.m_elt.onchange)
    {
        var methodName = this.m_elt.id + "_" + a_event;
        this.setEventHandler("onclick",methodName,a_object);
    }
    else
    {
        WebWidget.prototype.attachEvent.call(this,a_event,a_object);
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebRadioGroup. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebRadioGroup
 */
function WebRadioGroup(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);

    this.m_radioButtons = new Array();

    var elements = this.m_elt.getElementsByTagName("input");
    for (var i=0;i < elements.length;i++)
    {
        var element = elements[i];
        if (element.type=="radio")
        {
            this.m_radioButtons[this.m_radioButtons.length] = element;
        }
    }
}

WebRadioGroup.prototype = new WebWidget();
WebRadioGroup.prototype.constructor = WebRadioGroup;

/**
 * Enable or disable WebRadioGroup
 *
 * @param a_enabled Enable flag
 */
WebRadioGroup.prototype.setEnabled = function(a_enabled)
{
    for(var i=0;i < this.m_radioButtons.length;i++)
    {
        var radioButton = this.m_radioButtons[i];
        radioButton.disabled = !a_enabled;
    }
}

/**
 * Check if WebRadioGroup is enabled or disabled
 */
WebRadioGroup.prototype.isEnabled = function()
{
    for(var i=0;i < this.m_radioButtons.length;i++)
    {
        var radioButton = this.m_radioButtons[i];
        if (radioButton.disabled)
        {
            return false;
        }
    }
    return true;
}

/**
 * Get the value of the selected radio button of the WebRadioGroup
 */
WebRadioGroup.prototype.getValue = function()
{
    for(var i=0;i < this.m_radioButtons.length;i++)
    {
        var radioButton = this.m_radioButtons[i];
        if (radioButton.checked)
        {
            return radioButton.value;
        }
    }

    return null;
}

/**
 * Set value. This means that one of the radio buttons of the WebRadioGroup
 * will be selected.
 *
 * @param a_value New value
 */
WebRadioGroup.prototype.setValue = function(a_value)
{
    for(var i=0;i < this.m_radioButtons.length;i++)
    {
        var radioButton = this.m_radioButtons[i];
        if (radioButton.value==a_value)
        {
            radioButton.checked = true;
        }
        else
        {
            radioButton.checked = false;
        }
    }
}

/**
 * Attach Event Handler.
 *
 * @param a_event Name of the event (onclick, ondblclick, onchange etc.)
 * @param a_object Object that contains event handler method that needs to be called
 * @see WebWidget#attachEvent
 */
WebRadioGroup.prototype.attachEvent = function(a_event,a_object)
{
    var methodName = this.m_elt.id + "_" + a_event;

    if (a_event=="onchange" && !this.m_radioButtons[0].onchange)
    {
        this.setEventHandler("onclick",methodName,a_object);
    }
    else
    {
        this.setEventHandler(a_event,methodName,a_object);
    }

}
/**
 * Set event handler callback.
 *
 * @private
 * @see WebWidget#setEventHandler
 */
WebRadioGroup.prototype.setEventHandler = function(a_event,a_methodName,a_object)
{
    var eventHandler = this.getEventHandler(a_event,a_methodName,a_object);

    for (var i=0;i < this.m_radioButtons.length;i++)
    {
        var radioButton = this.m_radioButtons[i];
        radioButton[a_event + "_old"] = radioButton[a_event];
        radioButton[a_event] = eventHandler;
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Option object representing options in a WebDropDownList or a WebListBox
 *
 * @param value The option value
 * @param label The option label
 * @param selected The option selected flag
 */
function Option(value,label,selected)
{
    this.value = value;
    this.label = label;
    this.selected = selected;
}

/**
 * Get option value
 */
Option.prototype.getValue = function()
{
    return this.value;
}

/**
 * Set option value
 *
 * @param value Option value
 */
Option.prototype.setValue = function(value)
{
    this.value = value;
}

/**
 * Get option label
 */
Option.prototype.getLabel = function()
{
    return this.label;
}

/**
 * Set option label
 *
 * @param label Label text
 */
Option.prototype.setLabel = function(label)
{
    this.label = label;
}

/**
 * Get option selected flag
 */
Option.prototype.isSelected = function()
{
    return this.selected;
}

/**
 * Set option selected flag
 *
 * @param selected Selected flag
 */
Option.prototype.setSelected = function(selected)
{
    this.selected = selected;
}

/**
 * Convert option to a string for debugging purposes
 */
Option.prototype.toString = function()
{
    return "Option[value=" + this.value + ",label=" + this.label + ",selected=" + this.selected + "]";
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebDropDownList. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebDropDownList
 */
function WebDropDownList(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
}

WebDropDownList.prototype = new WebWidget();
WebDropDownList.prototype.constructor = WebDropDownList;

/**
 * Return the options available in the WebDropDownList. An array
 * of Option objects is returned.
 *
 * @see Option
 */
WebDropDownList.prototype.getOptions = function()
{
    var options = new Array();
    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        options[options.length] = new Option(option.value,option.text,option.selected);

    }
    return options;
}

/**
 * Return the selected option as an Option object
 *
 * @see Option
 */
WebDropDownList.prototype.getSelectedOption = function()
{
    var options = new Array();
    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        if (option.selected)
        {
            return new Option(option.value,option.text,true);
        }
    }
    return null;
}

/**
 * Set the selected option
 *
 * @param a_option This can either be a Option object or an option value
 * @see Option
 */
WebDropDownList.prototype.setSelectedOption = function(a_option)
{
    var value = a_option.getValue ? a_option.getValue() : a_option;

    var options = new Array();
    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        if (option.value==value)
        {
            option.selected = true;
        }
        else
        {
            option.selected = false;
        }
    }
}

/**
 * Set the available options of the WebDropDownList
 *
 * @param a_options An array of Option objects
 * @see Option
 */
WebDropDownList.prototype.setOptions = function(a_options)
{
    this.m_elt.options.length = 0;

    for (var i=0;i < a_options.length;i++)
    {
        var option = a_options[i];

        var optionElt = document.createElement("option");
        optionElt.value = option.value;
        optionElt.text = option.label;
        optionElt.selected = option.selected;

        this.m_elt.options[i] = optionElt;
    }
}

/**
 * Add an option to the WebDropDownList
 *
 * @param a_option An Option object to be added
 * @see Option
 */
WebDropDownList.prototype.addOption = function(a_option)
{
    var optionElt = document.createElement("option");
    optionElt.value = a_option.value;
    optionElt.text = a_option.label;
    optionElt.selected = a_option.selected;

    this.m_elt.options [ this.m_elt.options.length ] = optionElt;
}

/**
 * Add options to the WebDropDownList
 *
 * @param a_options An array of Option objects to be added
 * @see Option
 */
WebDropDownList.prototype.addOptions = function(a_options)
{
    for (var i=0;i < a_options.length;i++)
    {
        var option = a_options[i];
        this.addOption(option);
    }
}

/**
 * Remove an option from the WebDropDownList
 *
 * @param a_option This can either be a Option object or an option value
 * @see Option
 */
WebDropDownList.prototype.removeOption = function(a_option)
{
    var value = a_option.getValue ? a_option.getValue() : a_option;

    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        if (option.value==value)
        {
            this.m_elt.removeChild(option);
        }
    }
}

/**
 * Remove options from the WebDropDownList
 *
 * @param a_options An array of Option objects to be removed
 * @see Option
 */
WebDropDownList.prototype.removeOptions = function(a_options)
{
    for (var i=0;i < a_options.length;i++)
    {
        var option = a_options[i];
        this.removeOption(option);
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebList. Inherits from WebDropDownList.
 *
 * @param a_id id of element in DOM representing the WebList
 */
function WebListBox(a_id)
{
    WebDropDownList.prototype.constructor.call(this,a_id);
}

WebListBox.prototype = new WebDropDownList();
WebListBox.prototype.constructor = WebListBox;

/**
 * Enable or disable multiple select
 *
 * @param a_multiple Multiple select flag
 */
WebListBox.prototype.setMultipleSelect = function(a_multiple)
{
    this.m_elt.multiple = a_multiple;

    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        option.selected = false;
    }
}

/**
 * Check if multiple select is enabled or disabled
 */
WebListBox.prototype.isMultipleSelect = function()
{
    return this.m_elt.multiple;
}

/**
 * Get selected options as an array of Option objects
 */
WebListBox.prototype.getSelectedOptions = function()
{
    var options = new Array();
    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        if (option.selected)
        {
            options[options.length] = new Option(option.text,option.value,true);
        }
    }
    return options;
}

/**
 * Select all options
 */
WebListBox.prototype.selectAll = function()
{
    if (!this.isMultipleSelect())
    {
        return;
    }

    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        option.selected = true;
    }
}

/**
 * Deselect all options
 */
WebListBox.prototype.deselectAll = function()
{
    for (var i=0;i < this.m_elt.options.length;i++)
    {
        var option = this.m_elt.options[i];
        option.selected = false;
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebUploadField. Inherits from WebTextField.
 *
 * @param a_id id of element in DOM representing the WebUploadField
 */
function WebUploadField(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
}

WebUploadField.prototype = new WebWidget();
WebUploadField.prototype.constructor = WebTextField;


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebButton. Inherits from WebWidget
 *
 * @param a_id id of element in DOM representing the WebButton
 */
function WebButton(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
}

WebButton.prototype = new WebWidget();
WebButton.prototype.constructor = WebButton;

/**
 * Set label of the WebButton
 *
 * @param a_label Label text
 */
WebButton.prototype.setLabel = function(a_label)
{
    this.m_elt.value = a_label;
}

/**
 * Get label of the WebButton
 */
WebButton.prototype.getLabel = function()
{
    return this.m_elt.value;
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebLink. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebLink
 */
function WebLink(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
    this.m_enabled = true;
    this.m_onclickHandler = null;
}

WebLink.prototype = new WebWidget();
WebLink.prototype.constructor = WebLink;

/**
 * Enable or disable WebLink
 *
 * @param a_enabled Enable flag
 */
WebLink.prototype.setEnabled = function(a_enabled)
{
    this.m_enabled = a_enabled;
    if (a_enabled)
    {
        this.setOpacity(1);
        this.m_elt.onclick = this.m_onclickHandler;
    }
    else
    {
        this.setOpacity(0.5);
        this.m_onclickHandler = this.m_elt.onclick;
        this.m_elt.onclick =
        function(event)
        {
            return false;
        }
    }
}

/**
 * Check if WebLink is enabled or disabled
 */
WebLink.prototype.isEnabled = function()
{
    return this.m_enabled;
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebImage. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebImage
 */
function WebImage(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
    this.m_enabled = true;
    this.m_onclickHandler = null;
}

WebImage.prototype = new WebWidget();
WebImage.prototype.constructor = WebImage;

/**
 * Set image (URL pointing to image)
 *
 * @param a_url URL pointing to image)
 */
WebImage.prototype.setImage = function(a_url)
{
    this.m_elt.src = a_url;
}

/**
 * Get image (URL pointing to image)
 */
WebImage.prototype.getImage = function()
{
    return this.m_elt.src;
}

/**
 * Enable or disable WebImage
 *
 * @param a_enabled Enable flag
 */
WebImage.prototype.setEnabled = function(a_enabled)
{
    this.m_enabled = a_enabled;
    if (a_enabled)
    {
        this.setOpacity(1);
        this.m_elt.onclick = this.m_onclickHandler;
    }
    else
    {
        this.setOpacity(0.5);
        this.m_onclickHandler = this.m_elt.onclick;
        this.m_elt.onclick =
        function(event)
        {
            return false;
        }
    }
}

/**
 * Check if WebImage is enabled or disabled
 */
WebImage.prototype.isEnabled = function()
{
    return this.m_enabled;
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * Class representing a WebPanel. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebPanel
 */
function WebPanel(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
    this.m_enabled = true;
}

WebPanel.prototype = new WebWidget();
WebPanel.prototype.constructor = WebPanel;

/**
 * Enable or disable WebPanel. This means that all WebWidgets inside this WebPanel
 * will be enabled or disabled (also WebWidgets in nested WebPanels)
 *
 * @param a_enabled Enable flag
 */
WebPanel.prototype.setEnabled = function(a_enabled)
{
    var elements = this.m_elt.getElementsByTagName("input");
    for (var i=0;i < elements.length;i++)
    {
        var element = elements[i];
        element.disabled = !a_enabled;
    }

    var elements = this.m_elt.getElementsByTagName("select");
    for (var i=0;i < elements.length;i++)
    {
        var element = elements[i];
        element.disabled = !a_enabled;
    }

    var elements = this.m_elt.getElementsByTagName("textarea");
    for (var i=0;i < elements.length;i++)
    {
        var element = elements[i];
        element.disabled = !a_enabled;
    }

    var elements = this.m_elt.getElementsByTagName("img");
    for (var i=0;i < elements.length;i++)
    {
        var element = elements[i];
        if (element.id)
        {
            var webImage = WidgetFactory.createWebImage(element.id);
            webImage.setEnabled(a_enabled);
        }
    }

    var elements = this.m_elt.getElementsByTagName("a");
    for (var i=0;i < elements.length;i++)
    {
        var element = elements[i];
        if (element.id)
        {
            var webLink = WidgetFactory.createWebLink(element.id);
            webLink.setEnabled(a_enabled);
        }
    }

    this.m_enabled = a_enabled;
}

/**
 * Check if WebPanel is enabled or disabled
 */
WebPanel.prototype.isEnabled = function()
{
    return this.m_enabled;
}

/**
 * Return the data of the WebWidgets inside this WebPanel as an object (map with named properties).
 * This object will have properties representing the (form) names (not the ids!) of the
 * WebWidgets nested inside this WebPanel.
 */
WebPanel.prototype.getData = function()
{
    return getElementData(this.m_elt);
}

/**
 * Set data for the WebWidgets nested inside the WebPanel. Data is passed as an object
 * whose property names are used to populate the WebWidgets that have the same name.
 *
 * @param a_object Object used as data
 */
WebPanel.prototype.setData = function(a_object)
{
    setElementData(this.m_elt,a_object);
}

/**
 * Class representing a WebRadioButton. Inherits from WebWidget.
 *
 * @param a_id id of element in DOM representing the WebRadioButton
 */
function WebRadioButton(a_id)
{
    WebWidget.prototype.constructor.call(this,a_id);
}

WebRadioButton.prototype = new WebWidget();
WebRadioButton.prototype.constructor = WebRadioButton;

/**
 * Check or uncheck the WebRadioButton
 *
 * @param a_checked Checked flag
 */
WebRadioButton.prototype.setChecked = function(a_checked)
{
    this.m_elt.checked = a_checked;
}

/**
 * Check if the WebRadioButton is checked or unchecked
 */
WebRadioButton.prototype.isChecked = function()
{
    return this.m_elt.checked;
}

/**
 * Attach Event Handler.
 *
 * @param a_event Name of the event (onclick, ondblclick, onchange etc.)
 * @param a_object Object that contains event handler method that needs to be called
 * @see WebWidget#attachEvent
 */
WebRadioButton.prototype.attachEvent = function(a_event,a_object)
{
    // IE does not have a onchange event on checkboxes
    if (a_event=="onchange" && !this.m_elt.onchange)
    {
        var methodName = this.m_elt.id + "_" + a_event;
        this.setEventHandler("onclick",methodName,a_object);
    }
    else
    {
        WebWidget.prototype.attachEvent.call(this,a_event,a_object);
    }
}


