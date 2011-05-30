function cancelCheck(){
    var msg = "";

    if (language == "DE"){
    	msg = unescape("M%F6chten Sie wirklich abbrechen? Daten, die nicht gespeichert wurden gehen verloren.");
    } else {
    	msg = unescape("Do you really want to cancel? Data not stored will be lost.");
    }
   
    cancel = confirm(msg);
    return cancel;
	
}

function deleteDescriptionCheck(){
    var msg = "";
    
    if (language == "DE"){
    	msg = unescape("M%F6chten Sie die Beschreibung wirklich l%F6schen%3F");
    } else {
    	msg = unescape("Do you really want to delete the description%3F");
    }

   
    cancel = confirm(msg);
    return cancel;
}

function genericApproveTask(){
    var msg = "";

    if (language == "DE"){
    	msg = unescape("M%F6chten Sie wirklich die Fragerunde best%E4tigen%3F");
    } else {
    	msg = unescape("Do you really want to confirm the question round%3F");
    }
   
    cancel = confirm(msg);
    return cancel;
}

function genericDeclineTask(){
    var msg = "";

    if (language == "DE"){
    	msg = unescape("M%F6chten Sie wirklich die Fragerunde ablehnen%3F");
    } else {
    	msg = unescape("Do you really want to decline the question round%3F");
    }
   
    cancel = confirm(msg);
    return cancel;
}

function genericSubmitTask(){
    var msg = "";

    if (language == "DE"){
    	msg = unescape("M%F6chten Sie wirklich die Fragerunde einreichen%3F");
    } else {
    	msg = unescape("Do you really want to submit the question round%3F");
    }
   
    cancel = confirm(msg);
    return cancel;
}

function genericDeleteCheck(){
    var msg = "";

    if (language == "DE"){
    	msg = unescape("M%F6chten Sie den Eintrag wirklich l%F6schen%3F? Die Mutation wird erst nach dem Speichern abgeschlossen!");
    } else {
    	msg = unescape("Do you really want to delete the selected entry? Changes will be commited after store!");
    }
   
    cancel = confirm(msg);
    return cancel;
}

function genericDeleteCheck2(){
    var msg = "";

    if (language == "DE"){
    	msg = unescape("M%F6chten Sie den Eintrag wirklich l%F6schen?");
    } else {
    	msg = unescape("Do you really want to delete the selected entry?");
    }
   
    cancel = confirm(msg);
    return cancel;
}

function genericFinishMigration(){

if (language == "DE"){
    	msg = unescape("M%F6chten Sie wirklich den Migrationsprozess der ausgew%E4hlten Komponente beenden?");
    } else {
    	msg = unescape("Do you really want to end the migration process of the selected component?");
    }  

    
    var result =  window.confirm(msg);
    if (result){
    	return true;
    } else {
         event.cancelBubble = true;
	 event.stopPropagation();
	 return false;

    }
}

function showLoading(){
	//var theBody = document.getElementsByTagName('body')[0]; 
	//if (typeof document.body.style.maxHeight === "undefined") { //if IE 6
	//	$("body","html").css({height: "100%", width: "100%"});
	//	$("html").css("overflow","hidden");
	//}

	var modalPanel = document.getElementById('cs_Loading');
	var overlayPanel = document.getElementById('cs_overlay');
	
   	modalPanel.style.display = "block";
   	overlayPanel.style.display = "block";
	
}
        
function hideLoading(){
	document.getElementById('cs_Loading').style.display = "none";
    document.getElementById('cs_overlay').style.display = "none";
}

function showModal(){
  var div_modal= document.getElementById('div_modal');
  div_modal.style.display = 'block';
}

function hideModal(){
         var div_modal= document.getElementById('div_modal');
         div_modal.style.display = 'none';
}

/**

Synchronize lables with the value of a filed
sourceElt = DOM element with the value
referencedFields = array with the target id of the dom element
rowIndex = int with the row 
**/
function synchReference(sourceElt, referencedFields,rowIndex){
  var sourceValue = sourceElt.value;
  for (var i = 0; i < referencedFields.length; ++i) {
    var targetId = referencedFields[i]+rowIndex;
    var targetElt =  document.getElementById(targetId);
    setInnerText(targetElt,sourceValue);
  }
}
