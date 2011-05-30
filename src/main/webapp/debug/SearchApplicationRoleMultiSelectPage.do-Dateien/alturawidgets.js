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

var theWidgetManager = new OJWidgetManager();

/**
 * @class
 * WidgetManager maintains series of widgets that are associated by ids. 
 * Widgets that are stored in this manager must expose the following interfaces.
 *  widgetId, used to uniquely identify a widget.
 */
function OJWidgetManager() { 
    this.widgets = new Array ();
}

/**
 * Calculate a widget id based on the link id.
 *
 * @param (String} linkId id of the link that starts this widget.
 */
OJWidgetManager.prototype.widgetid = function(linkId) {
    return "theWidgetManager.widget('" + linkId + "').widgetImpl";
}

/**
 * Aquire the Widget from a given id.
 * If no such object exists, null is returned.
 *
 * @param (String} id of the Widget.
 */
OJWidgetManager.prototype.widget = function(id) {
    for (var i = 0; i < this.widgets.length; i++) {
        var w = this.widgets[i];
        if( w.widgetId == this.widgetid(id) ||
            w.widgetId == id ) {
            return w;
        }
    }
    return null;
}

/**
 * Register a new widget with the manager.
 *
 * @param (Object} widgetObject the Widget itself.
 */
OJWidgetManager.prototype.register = function(widgetObject) {
    this.widgets [ this.widgets.length ] = widgetObject;
}


/**
 * @class
 * OJCalendarManager manages instance of the calendars and assures there exists
 * only a single instance of the calendar associated with the link id.
 * Collaborates with the widget manager to manage instances.
 *
 */
function OJCalendarManager() {
}

/**
 * Acquire a single instance of a particular calendar configuration.
 *
 * @param (String} linkId id of the link that starts this widget.
 * @param (String} containerId id of the div container in which the calendar pops up.
 * @param (String} textfieldId id of the textfield that stores the selected date.
 *
 */
OJCalendarManager.prototype.instance = function(linkId, containerId, textfieldId, format, useLocale, isLenient) {
    var calendar = theWidgetManager.widget(linkId);
    if( calendar == null ) {
        calendar = new OJCalendar(linkId,  containerId, textfieldId, format, useLocale, isLenient);
        theWidgetManager.register(calendar);
    }
    return calendar;
}

/**
 * @class
 * OJCalendar maintains state to manage a date picker objects.
 * It holds the link from which the calendar was invoked as well as
 * the div container in which to display the calendar widget and the
 * text field to place the selected date in.
 *
 * @param (String} linkId id of the link that starts this widget.
 * @param (String} containerId id of the div container in which the calendar pops up.
 * @param (String} textfieldId id of the textfield that stores the selected date.
 * @param (String} format literal, or predefined string specifying the date format and parse rules.
 * @param (boolean} useLocale specifies whether the request locale must be used in formatting, parsing.
 * @param (boolean} isLenient specifies whether formatter must behave lenient when parsing a date.
 */
function OJCalendar(linkId,  containerId,  textfieldId, format, useLocale, isLenient) {
    this.widgetId = theWidgetManager.widgetid(linkId);

    this.calendarLink = document.getElementById(linkId);
    this.calendarTextField = document.getElementById(textfieldId);
    this.calendarContainer = document.getElementById(containerId);
    
    this.widgetImpl = new YAHOO.widget.Calendar(this.widgetId,  containerId);
    this.widgetImpl.onSelect = this.onChangedCalendar;

    this.request = null;

    this.formatterFormat = format;
    this.formatterLenience = isLenient;
    this.formatterUsesRequestLocale = useLocale;
    this.inPressedIconState = false;
    this.inChangedTextState = false;
}

/**
 * Determines state of the calendar control.
 *
 * @param (String} linkId id of the link that starts this widget.
 */
OJCalendar.prototype.isShown = function() {
    if( this.calendarContainer.style.display == 'block') {
        return true;
    }
    return false;
}

/**
 * Display the calendar control.
 *
 * @param (String} linkId id of the link that starts this widget.
 */
OJCalendar.prototype.show = function() {
    this.calendarContainer.style.display = "block";    
}

/**
 * Hide the calendar control.
 *
 * @param (String} linkId id of the link that starts this widget.
 */
OJCalendar.prototype.hide = function() {
    this.calendarContainer.style.display = "none";
}
    
/**
 * Event handler invoked upon clicking the calendar link.
 * Shows or Hides the calendar control, depending of its current state.
 * If it is currently shown, it will be hidden and vice versa.
 */
OJCalendar.prototype.onPressedIcon = function() {
    this.inPressedIconState = true;
    if( this.isShown()) {
        // copy is not required, because this has be 
        // done before.
        this.hide();
        this.clearState();
    } else {
        this.fieldToCalendar();
        this.show();
    } 
}

/**
 * Event handler invoked when the textfield of a calendar widget
 * has been changed.
 */
OJCalendar.prototype.onChangedText = function() {
    this.inChangedTextState = true;
    this.fieldToCalendar();
}

/**
 * Event handler invoked when a date has been selected
 * in the calendar widget.
 */
OJCalendar.prototype.onChangedCalendar = function() {

    var selectedDate = this.getSelectedDates()[0];
    var calendar = theWidgetManager.widget(this.id);
    if( calendar != null  ) {

        if( !calendar.inPressedIconState && !calendar.inChangedTextState ) {

            var parameters = 
                "action=" + escape("localize") + "&" + 
                "month=" + escape(selectedDate.getMonth()) + "&" + 
                "day=" + escape(selectedDate.getDate()) + "&" + 
                "year=" + escape(selectedDate.getFullYear()) + "&" + 
                "format=" + escape(calendar.formatterFormat) + "&" + 
                "uselocale=" + escape(calendar.formatterUsesRequestLocale) + "&" + 
                "islenient=" + escape(calendar.formatterLenience);

            var url = "AlturaLocalizationAction.do?" + parameters;
            if (window.XMLHttpRequest) { 
                this.request = new XMLHttpRequest();
            } 
            else if (window.ActiveXObject) { 
                this.request = new ActiveXObject("Microsoft.XMLHTTP");
            }

            var thisObj = this;
            this.request.onreadystatechange = function() {
                if (thisObj.request.readyState == 4) { 
                    if (thisObj.request.status == 200) { 
                        var xml = thisObj.request.responseXML;

                        var localizeddate = xml.getElementsByTagName("date")[0].firstChild.nodeValue;
                        calendar.calendarTextField.value = localizeddate; 
                        calendar.hide();
                    }
                }
            }

            this.request.open("GET", url, true);
            this.request.send(null);
        }
    }
}

/**
 * Moves the content (date) from textfield and selects this date on the associated calendar widget.
 * @param (String} linkId id of the link that starts this widget.
 */
OJCalendar.prototype.fieldToCalendar = function() {
    if( this.calendarTextField.value == '' || this.calendarTextField.value == null ) {
        var date = new Date();
        this.widgetImpl.setMonth(date.getMonth());
        this.widgetImpl.setYear(date.getFullYear());
        this.widgetImpl.select(date);            
        this.widgetImpl.render();
        this.clearState();
        return;
    }

    var parameters = 
        "action=" + escape("normalize") + "&" + 
        "date=" + escape(this.calendarTextField.value) + "&" + 
        "format=" + escape(this.formatterFormat) + "&" + 
        "uselocale=" + escape(this.formatterUsesRequestLocale) + "&" + 
        "islenient=" + escape(this.formatterLenience);
        
    var url = "AlturaLocalizationAction.do?" + parameters;
    if (window.XMLHttpRequest) { 
        this.request = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) { 
        this.request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var thisObj = this;
    this.request.onreadystatechange = function() {
        if (thisObj.request.readyState == 4) { 
            if (thisObj.request.status == 200) { 
                var xml = thisObj.request.responseXML;
                
                var month = xml.getElementsByTagName("month")[0].firstChild.nodeValue;
                var year = xml.getElementsByTagName("year")[0].firstChild.nodeValue;
                var day = xml.getElementsByTagName("day")[0].firstChild.nodeValue;

                var date = new Date();
                date.setMonth(month);
                date.setFullYear(year);
                date.setDate(day);

                thisObj.widgetImpl.setMonth(date.getMonth());
                thisObj.widgetImpl.setYear(date.getFullYear());
                thisObj.widgetImpl.select(date);            
                thisObj.widgetImpl.render();

                thisObj.clearState();
            }
        }
    }

    this.request.open("GET", url, true);
    this.request.send(null);
}

/**
 * Helper function for clearing the state of the calendar control.
 */
OJCalendar.prototype.clearState  = function() {
    this.inChangedTextState = false;
    this.inPressedIconState = false;
}

