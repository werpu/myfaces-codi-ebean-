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

function object2string(a_object,/* optional */ a_separator)
{
    var separator = a_separator ? a_separator : ",";
    var result = "";
    for (var propertyName in a_object)
    {
        var propertyValue = a_object[propertyName];
        result += propertyName + "=" + propertyValue + separator;
    }
    return result.substring(0,result.length - separator.length);
}

function string2object(a_string,/* optional */ a_separator)
{
    var separator = a_separator ? a_separator : ",";

    var object = new Object();
    var properties = a_string.split(separator);
    for (var i=0;i<properties.length;i++)
    {
        var property = properties[i];
        var pos = property.indexOf("=");
        var name = property.substring(0,pos);
        var value = property.substring(pos+1);
        object[name] = value;
    }

    return object;
}



function getElementData(a_elt)
{
    var object = new Object();

    var elements = getElements(a_elt,new Array("span","input","textarea","select"));
    for (var i=0;i<elements.length;i++)
    {
        var element = elements[i];

        var nodeName = element.nodeName.toLowerCase();

        var name = null;
        var value = null;

        if (nodeName=="span")
        {
            if (element.attributes["name"])
            {
                name = element.attributes["name"].value;
            }
        }
        else
        {
            name = element.name;
        }

        if (name==null || name=="")
        {
            continue;
        }

        if (nodeName=="input")
        {
            if (element.type=="text" || element.type=="password")
            {
                value = element.value;
            }
            else if (element.type=="checkbox")
            {
                value = element.checked;
            }
            else if (element.type=="radio")
            {
                // handled below
                continue;
            }
        }
        else if(nodeName=="textarea")
        {
            value = element.value;
        }
        else if(nodeName=="select")
        {
            if (element.selectedIndex>=0)
            {
                value = element.options[element.selectedIndex].value;
            }
        }
        else if(nodeName=="span")
        {
            if (name=="webradiogroup")
            {
                var radioElements = element.getElementsByTagName("input");
                for (var j=0;j < radioElements.length;j++)
                {
                    var radioElement = radioElements[j];
                    name = radioElement.name;
                    if (radioElement.type=="radio")
                    {
                        if(radioElement.checked)
                        {
                            value = radioElement.value;
                        }
                    }
                }
            }
            else
            {
                value = element.innerHTML;
            }
        }

        object[name] = value;
    }

    return object;
}

function setElementData(a_elt,a_object)
{
    var elements = getElements(a_elt,new Array("span","input","textarea","select"));
    for (var i=0;i<elements.length;i++)
    {
        var element = elements[i];

        var nodeName = element.nodeName.toLowerCase();

        var name = null;
        var value = null;

        if (nodeName=="span")
        {
            if (element.attributes["name"])
            {
                name = element.attributes["name"].value;
            }
        }
        else
        {
            name = element.name;
        }

        if (name==null || name=="")
        {
            continue;
        }

        value = a_object[name];

        if (nodeName=="input")
        {
            if (element.type=="text" || element.type=="password")
            {
                element.value = value;
            }
            else if (element.type=="checkbox")
            {
                if (typeof value=="string")
                {
                    element.checked = value=="true";
                }
                else
                {
                    element.checked = value;
                }
            }
            else if (element.type=="radio")
            {
                // handled below
                continue;
            }
        }
        else if(nodeName=="textarea")
        {
            element.value = value;
        }
        else if(nodeName=="select")
        {
            for (var j=0;j < element.options.length;j++)
            {
                var optionElement = element.options[j];
                if (optionElement.value==value)
                {
                    optionElement.selected = true;
                }
                else
                {
                    optionElement.selected = false;
                }
            }
        }
        else if(nodeName=="span")
        {
            if (name=="webradiogroup")
            {
                var radioElements = element.getElementsByTagName("input");
                for (var j=0;j < radioElements.length;j++)
                {
                    var radioElement = radioElements[j];
                    value = a_object[radioElement.name];

                    if (radioElement.value==value)
                    {
                        radioElement.checked = true;
                    }
                    else
                    {
                        radioElement.checked = false;
                    }
                }
            }
            else
            {
                element.innerHTML = value;
            }
        }
    }

}

function getElements(a_elt,a_tagNames)
{
    var result = new Array();
    for (var i=0;i<a_tagNames.length;i++)
    {
        var tagName = a_tagNames[i];
        var elements = a_elt.getElementsByTagName(tagName);

        for (var j=0;j<elements.length;j++)
        {
            var element = elements[j];
            result[result.length] = element;
        }
    }
    return result;
}

/**
 * Find the next element (siblings and not children) with a specific tag name
 *
 * a_elt: the element to start searching from
 * a_eltTag: the tag of the element to find
 */
function getNextElement ( a_elt,a_eltTag )
{
    var node = a_elt.nextSibling;

    while (node!=null)
    {
        if (node.nodeName && node.nodeName.toLowerCase()==a_eltTag.toLowerCase())
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
 * Find the previous element (siblings and not children) with a specific tag name
 *
 * a_elt: the element to start searching from
 * a_eltTag: the tag of the element to find
 */
function getPrevElement ( a_elt,a_eltTag )
{
    var node = a_elt.previousSibling;

    while (node!=null)
    {
        if (node.nodeName && node.nodeName.toLowerCase()==a_eltTag.toLowerCase())
        {
            return node;
        }
        else
        {
            node = node.previousSibling;
        }
    }
    return null;
}

/**
 * Find a parent element with a specific tag name
 *
 * a_elt: the element to start searching from
 * a_eltTag: the tag of the element to find
 */
function getParentElement ( a_elt,a_eltTag )
{
    var node = a_elt;

    while (node!=null)
    {
        if (node.nodeName && node.nodeName.toLowerCase()==a_eltTag.toLowerCase())
        {
            return node;
        }
        else
        {
            node = node.parentNode;
        }
    }
    return null;
}

/**
 * Link to the value of href of the next link
 *
 * a_event: event that triggered the doLink call
 */
function doLink ( a_event )
{
    var targetElt = a_event.srcElement ? a_event.srcElement : a_event.target;

    var linkElt = getNextElement ( targetElt,"a" );
    if (linkElt!=null)
    {
        window.location.href = linkElt.href;
    }
}

/**
 * Set form action
 *
 * a_elt: the element that is part of the form of which the action needs to be changed
 * a_action: the new action
 */
function setFormAction ( a_elt,a_action )
{
    var form = getParentElement ( a_elt,"form" );
    if (form==null)
    {
        return;
    }

    form.action = a_action;
}
/**
 * Set form action to the value of href of the next link
 *
 * a_elt: the element that is part of the form of which the action needs to be changed
 */
function setFormLinkAction ( a_elt )
{
    var linkElt = getNextElement ( a_elt,"a" );
    if (linkElt!=null)
    {
        setFormAction ( a_elt,linkElt.href );
    }
}

/**
 * Add a queryString to the action of the form
 *
 * a_elt: the element that is part of the form of which the action needs to be changed
 */
function setFormQueryString ( a_elt )
{
    var linkElt = getNextElement ( a_elt,"a" );
    if (linkElt==null)
    {
        return;
    }

    var href = linkElt.href;
    var queryStringStart = href.indexOf ( "?" );
    if (queryStringStart<0)
    {
        return;
    }

    var queryString = href.substring ( queryStringStart + 1 );

    var form = getParentElement ( a_elt,"form" );
    if (form==null)
    {
        return;
    }

    var nameValues = queryString.split("&");
    for (var i=0;i<nameValues.length;i++)
    {
        var nameValue = nameValues[i];
        var nameAndValue = nameValue.split("=");

        var hiddenField = document.createElement ( "input" );
        hiddenField.type = "hidden";
        hiddenField.name = nameAndValue[0];
        if (nameAndValue.length==2)
        {
            hiddenField.value = decode(nameAndValue[1]);
        }
        else
        {
            hiddenField.value = "";
        }
        form.appendChild ( hiddenField );
    }

}

/**
 * Decode a URI encoded value
 *
 * @param a_str
 */
function decode ( a_str )
{
    // For some reason the + sign is not translated into a space by decodeURIComponent
    var result = a_str.replace ( /[+]/g," " );
    result = decodeURIComponent ( result );
    return result;
}

/**
 * Submit the form of which the specified element is a child
 *
 * a_elt: the element that is part of the form that needs to be submitted
 */
function submitForm ( a_elt )
{
	showLoading();
	
    var form = getParentElement ( a_elt,"form" );
    if (form!=null)
    {
		setTimeout('document.images["pbar"].src = "../images/loader.gif"', 1); 
		document.body.style.cursor='wait';
        form.submit();
		
    }
}

/**
 * Cancel the form of which the specified element is a child
 *
 * a_event: event that triggers the cancelForm call
 */
function cancelForm ( a_event )
{
    // Get target element (element that triggered the event)
    var targetElt = a_event.srcElement ? a_event.srcElement : a_event.target;

    var cancelButton = getNextElement ( targetElt,"input" );
    if (cancelButton!=null)
    {
        cancelButton.click();
    }
}

/**
 * handle an event upon a submitting a form and submit.
 *
 * a_event: the event that triggered the onSubmit call
 * validate: a boolean indicator whether vaidation needs to occur before the form is submitted
 */
function onSubmit(a_event, validate)
{
	showLoading();
    // Get target element (element that triggered the event)
    var targetElt = a_event.srcElement ? a_event.srcElement : a_event.target;

    if (targetElt.nodeName.toLowerCase()=="img")
    {
        // The img is wrapped inside a anchor to make it clickable
        targetElt = targetElt.parentNode;
    }

    var isValid = true;

    // If client side validation functions are present and validation
    // is requested, validate the form.
    try
    {
        if(validate)
        {
            var form = getParentElement ( targetElt, "form" );
            if (form != null)
            {
                isValid = isFormValid( form );
            }
        }
    }
    catch (ex)
    {
        // We get here when the isFormValid function is not defined
    }

    if(isValid)
    {
        // The form is either valid or validation is not required.
        // submit the form.
        setFormQueryString(targetElt);
        if(targetElt.type == null || !(targetElt.type == "submit")) {
            submitForm(targetElt);
        }
        return true;
    }
    else
    {
        // The form is either invalid and need not be submited, or it is valid and has been
        // submitted already.
        return false;
    }
}

/**
 * Handle checking / unchecking of a CheckBox. (Un)Checking will set
 * the next hidden field to false/true. The reason a hidden field is used, is
 * because unchecked checkboxes are NOT send as part of the HTTP request
 *
 * @param a_event
 */
function onClickCheckBox ( a_event )
{
    // Get target element (element that triggered the event)
    var targetElt = a_event.srcElement ? a_event.srcElement : a_event.target;

    var hiddenElt = getNextElement ( targetElt,"input" );

    if (targetElt.checked)
    {
        hiddenElt.value = "true";
    }
    else
    {
        hiddenElt.value = "false";
    }
}