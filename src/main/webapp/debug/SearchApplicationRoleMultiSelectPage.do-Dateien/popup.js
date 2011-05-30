var ie = document.all;
var nn6 = document.getElementById &&! document.all;

var isdrag = false;
var x, y;
var dobj;

function movemouse( e ) {
  if( isdrag ) {
    dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x;
    dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y;
    return false;
  }
}

function selectmouse( e ) {
  var fobj       = nn6 ? e.target : event.srcElement;
  var topelement = nn6 ? "HTML" : "BODY";

  while (fobj.tagName != topelement && fobj.className != "dragme") {
    fobj = nn6 ? fobj.parentNode : fobj.parentElement;
  }

  if (fobj.className=="dragme") {
    isdrag = true;
    dobj = document.getElementById("styled_popup");
    tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    x = nn6 ? e.clientX : event.clientX;
    y = nn6 ? e.clientY : event.clientY;
    document.onmousemove=movemouse;
    return false;
  }
}

/*
 * When opening and closing popup we remove and add the 'hideSelects' class to the
 * body, respectively. Refer to the following page for the reasoning:
 * http://stackoverflow.com/questions/224471/iframe-shimming-or-ie6-and-below-select-z-index-bug
 */

function closePopup(elt) {
  var popUp = document.getElementById(elt);
  vis = popUp.style.display = 'none';
  hideModal();
  document.body.className = document.body.className.replace(' hideSelects', '');
}

function showPopup(elt) {
  document.body.className += 'hideSelects';
  showModal();
  var popUp = document.getElementById(elt);
  vis = popUp.style.display = 'block';
  centerPopup(elt);
}

function centerPopup(elt) {
	var popUp = document.getElementById(elt);

	var centerX, centerY;
	if( self.innerHeight ) {
	  centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
	  centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
	  centerY = document.body.clientHeight;
	}
	centerX = window.screen.availWidth;
	
	var popUpWidth = popUp.offsetWidth;
	var popUpHeight = popUp.offsetHeight;
	
 	var topOffset = (centerY - popUpHeight) / 2;

	// not sure why this is needed
	var constant = 142;
	
	var leftOffset = (centerX - popUpWidth) / 2 - constant;

	popUp.style.top = topOffset;
	popUp.style.left = leftOffset;
}

document.onmousedown=selectmouse;
document.onmouseup=new Function("isdrag=false");