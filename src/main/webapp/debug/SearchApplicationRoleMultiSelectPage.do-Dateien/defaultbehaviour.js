$(document).ready(function() {
	/* Add behaviour on focus and on blur [losing focus] */
	(function() {
		var sfEls = document.getElementsByTagName("INPUT");
		for (var i = 0; i < sfEls.length; i++) { 
	      var elt = sfEls[i];
	      if (elt.type != "submit"){
	        elt["originalOnfocus"] = elt.onfocus;
	        elt.onfocus = function() {
	          this.className+=" sffocus";
	          if (this.originalOnfocus != null) {
	            return this.originalOnfocus();
	          }
	        }
	        elt["originalOnblur"] = elt.onblur;
	        elt.onblur = function() {
	          this.className = this.className.replace(new RegExp(" sffocus\\b"), "");
	          if (this.originalOnblur != null) {
	            return this.originalOnblur();
	          }
	        }
	      }
	    }
	})();

	/* Set focus to first form field of type 'text' or 'textarea' */
	(function() {
		var forms = document.forms || [];
	    for (var i = 0; i < forms.length; i++){
			for (var j = 0; j < forms[i].length; j++) {
				var formElement = forms[i][j];
				var type = formElement.type;
				var textControl = (type == "text" || type == "textarea") && type != "checkbox";
				var enabled = formElement.disabled != true;
				var visible = formElement.style.display != 'none';
				if (textControl && enabled && visible){
					formElement.focus();
					return;
				}
			}
		}
	})();
	
	/* Set up animation for main menu items (uses jQuery Kwicks library) */
	$('#kwick ul.kwicks').kwicks({
		/* Width of button (135px) + width of image */
		max: 155,
		duration: 150
	});
	
	/* Set up animation for links in left navigation */
	$('ul#sidebar-list a').hover(function() {
    	$(this).stop().animate({ marginLeft: 10 }, 'fast');
    }, function() {
    	$(this).stop().animate({ marginLeft: 0 }, 'fast');
    });
});