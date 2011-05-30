//GEN-GUARD:WEBPAGEJAVASCRIPT$pid1233d4a6b45170ccfa$pid1233d4a6bb21cc9549
/**
 * MultiSelectPage class implementing client side behavior.
 */
function SearchApplicationRoleMultiSelectPage() {
    AlturaWebPage.prototype.constructor.call(this);
}

// SearchApplicationRoleMultiSelectPage inherits from AlturaWebPage
SearchApplicationRoleMultiSelectPage.prototype = new AlturaWebPage;
SearchApplicationRoleMultiSelectPage.prototype.constructor = SearchApplicationRoleMultiSelectPage;

/**
 * Initialize
 */
SearchApplicationRoleMultiSelectPage.prototype.init = function()
{
    // Register Event Handlers
    if (this.getWebCheckBox("cb_isNameSearch") != null){
        this.getWebCheckBox("cb_isNameSearch").attachEvent("onclick",this);
    }
    if (this.getWebCheckBox("cb_isDescriptionSearch") != null){
        this.getWebCheckBox("cb_isDescriptionSearch").attachEvent("onclick",this);
    }
    if (this.getWebCheckBox("cb_isId") != null){
        this.getWebCheckBox("cb_isId").attachEvent("onclick",this);
    }
    if (this.getWebCheckBox("cb_isApplicationSearch") != null){
        this.getWebCheckBox("cb_isApplicationSearch").attachEvent("onclick",this);
    }
    if (this.getWebCheckBox("cb_isARQSearch") != null){
        this.getWebCheckBox("cb_isARQSearch").attachEvent("onclick",this);
    }
    if (this.getWebCheckBox("cb_isPidSearch") != null){
        this.getWebCheckBox("cb_isPidSearch").attachEvent("onclick",this);
    }
}

/**
 * Destroy
 */
SearchApplicationRoleMultiSelectPage.prototype.destroy = function()
{
    // Cleanup Event Handlers
}
//GEN-GUARD:WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bc2bcd1c3$pid1233d4a6bc26f67f2
/**
 * Handle onclick event
 *
 * @param event Event object
 */
SearchApplicationRoleMultiSelectPage.prototype.cb_isNameSearch_onclick = function(event)   
{
//GEN-FREE:ViewEvent:onClick$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bc2bcd1c3$pid1233d4a6bc26f67f2
uncheckAllSearchCheckBoxes();
document.getElementById("cb_isNameSearch").checked = true;
//GEN-GUARD:1$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bc2bcd1c3$pid1233d4a6bc26f67f2
} 
//GEN-GUARD:WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bd2118ac5f$pid1233d4a6bd2dcc2c6
/**
 * Handle onclick event
 *
 * @param event Event object
 */
SearchApplicationRoleMultiSelectPage.prototype.cb_isDescriptionSearch_onclick = function(event)   
{
//GEN-FREE:ViewEvent:onClick$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bd2118ac5f$pid1233d4a6bd2dcc2c6
uncheckAllSearchCheckBoxes();
 
     document.getElementById("cb_isDescriptionSearch").checked = true;
//GEN-GUARD:1$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bd2118ac5f$pid1233d4a6bd2dcc2c6
} 
//GEN-GUARD:WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bd218c290a$pid1233d4a6bd2da818e
/**
 * Handle onclick event
 *
 * @param event Event object
 */
SearchApplicationRoleMultiSelectPage.prototype.cb_isId_onclick = function(event)   
{
//GEN-FREE:ViewEvent:onClick$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bd218c290a$pid1233d4a6bd2da818e
uncheckAllSearchCheckBoxes();
 
 
     document.getElementById("cb_isId").checked = true;
//GEN-GUARD:1$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6bd218c290a$pid1233d4a6bd2da818e
} 
//GEN-GUARD:WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be115e49db$pid1233d4a6be1142f6b3
/**
 * Handle onclick event
 *
 * @param event Event object
 */
SearchApplicationRoleMultiSelectPage.prototype.cb_isApplicationSearch_onclick = function(event)   
{
//GEN-FREE:ViewEvent:onClick$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be115e49db$pid1233d4a6be1142f6b3
uncheckAllSearchCheckBoxes();
 
       document.getElementById("cb_isApplicationSearch").checked = true;
//GEN-GUARD:1$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be115e49db$pid1233d4a6be1142f6b3
} 
//GEN-GUARD:WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be1d2acf0$pid1233d4a6be1157cf58
/**
 * Handle onclick event
 *
 * @param event Event object
 */
SearchApplicationRoleMultiSelectPage.prototype.cb_isARQSearch_onclick = function(event)   
{
//GEN-FREE:ViewEvent:onClick$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be1d2acf0$pid1233d4a6be1157cf58
uncheckAllSearchCheckBoxes();
document.getElementById("cb_isARQSearch").checked = true;
//GEN-GUARD:1$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be1d2acf0$pid1233d4a6be1157cf58
} 
//GEN-GUARD:WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be11419a6b$pid1233d4a6be1117a8
/**
 * Handle onclick event
 *
 * @param event Event object
 */
SearchApplicationRoleMultiSelectPage.prototype.cb_isPidSearch_onclick = function(event)   
{
//GEN-FREE:ViewEvent:onClick$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be11419a6b$pid1233d4a6be1117a8
uncheckAllSearchCheckBoxes();
document.getElementById("cb_isPidSearch").checked = true;
//GEN-GUARD:1$$WEBPAGEJAVASCRIPT_EVENT$pid1233d4a6be11419a6b$pid1233d4a6be1117a8
} 
//GEN-FREE:JavaScript:AdditionalMethods$$WEBPAGEJAVASCRIPT$pid1233d4a6b45170ccfa$pid1233d4a6bb21cc9549
// Additional methods / functions
function uncheckAllSearchCheckBoxes()
{
	uncheckHiddenSearchBoxByName("cb_isNameSearch");
	uncheckHiddenSearchBoxByName("cb_isDescriptionSearch");
	uncheckHiddenSearchBoxByName("cb_isId");
	uncheckHiddenSearchBoxByName("cb_isApplicationSearch");
	//	uncheckHiddenSearchBoxByName("cb_isTransactionSearch");
	uncheckHiddenSearchBoxByName("cb_isARQSearch");
	uncheckHiddenSearchBoxByName("cb_isPidSearch");
}

function uncheckHiddenSearchBoxByName(nameTxt){
	
	var hiddenDocumentArray;

	document.getElementById(nameTxt).checked = false;
	hiddenDocumentArray = document.getElementsByName( document.getElementById(nameTxt).name);
	uncheckHiddenSearchBoxByElt(hiddenDocumentArray);
}

function uncheckHiddenSearchBoxByElt(hiddenDocumentArray){
	for(var i = 0; i < hiddenDocumentArray.length; i++)
	{		
		if( hiddenDocumentArray[i].type == "hidden")
		{ 
			hiddenDocumentArray[i].value = "";
		}	
	}	
}
//GEN-GUARD:8$$WEBPAGEJAVASCRIPT$pid1233d4a6b45170ccfa$pid1233d4a6bb21cc9549
/**
 * Create SearchApplicationRoleMultiSelectPage object
 */
var searchApplicationRoleMultiSelectPage = new SearchApplicationRoleMultiSelectPage();

/**
 * Initialize SearchApplicationRoleMultiSelectPage object
 */
function initSearchApplicationRoleMultiSelectPage()
{
    searchApplicationRoleMultiSelectPage.init();
}

/**
 * Destroy SearchApplicationRoleMultiSelectPage object
 */
function destroySearchApplicationRoleMultiSelectPage()
{
    searchApplicationRoleMultiSelectPage.destroy();
    searchApplicationRoleMultiSelectPage = null;
}

// Attach to the onload and onunload event
if (window.attachEvent)
{
    window.attachEvent ( "onload",initSearchApplicationRoleMultiSelectPage );
    window.attachEvent ( "onunload",destroySearchApplicationRoleMultiSelectPage );
}
else if (window.addEventListener )
{
    window.addEventListener ( "load",initSearchApplicationRoleMultiSelectPage,false );
    window.addEventListener ( "unload",destroySearchApplicationRoleMultiSelectPage,false );    
}
