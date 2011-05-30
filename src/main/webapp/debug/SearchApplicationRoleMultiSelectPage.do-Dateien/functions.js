var Page = {
   onload : null, init : function () {
      if(Page.isPopup) {
         Page.setupPopup(); 
         }
      else {
         Page.setZoomFactor(); 
		 
		  
         Page.adjustLayout(); 
         Page.adjustFrameworkWidth();
		 
		
         }
      if(!Page.onload && typeof PageOnload == "function") {
         Page.onload = PageOnload; 
         }
      if(typeof Page.onload == "function") {
         Page.onload(); 
         }
      }
   , setZoomFactor : function() {
      var logo = document.getElementById(Constants.LOGO_ID); 
      Constants.ZOOM_FACTOR = (logo) ? logo.width / Constants.LOGO_REFERENCEWIDTH : 1; 
      Constants.FONTSIZE_FACTOR_MAINAREA = 1 / (12 * Constants.ZOOM_FACTOR); 
      Constants.FONTSIZE_FACTOR_CONTENT = 1 / (16 * Constants.ZOOM_FACTOR); 
      }
   , adjustLayout : function() {
      if(!Page.isPopup) {
         Page.adjustContentTopPosition(); 
         Page.adjustShadowLayout(); 

         Page.adjustBgHeight(); 
         }
      }
   , adjustContentTopPosition : function() {
      Page.has2ndTab = false; 
      Page.has2lines = false; 
      if( Navigation && Navigation.getById("tabnav") && Navigation.getById("tabnav").getViewById("tabmenu") && Navigation.getById("tabnav").getViewById("tabmenu").isinit) {
         var navigation = document.getElementById("tabNavRoot"); 
         var leftCol = document.getElementById("leftCol"); 
         var mainArea = document.getElementById("mainArea"); 
         if(navigation && leftCol && mainArea) {
            var items = navigation.getElementsByTagName("ul"); 
            if(items[0]) {
               var childs = items[0].childNodes; 
               for(var i = 0; i < childs.length; i++) {
                  if(childs[i].nodeName.toLowerCase() == "li") {
                     if(childs[i].className.indexOf("current") > - 1) {
                        var subnav = childs[i].childNodes; 
                        for(var j = 0; j < subnav.length; j++) {
                           if (childs[i].childNodes[j].nodeName.toLowerCase() == "ul") {
                              Page.has2ndTab = true; 
                              }
                           if (childs[i].childNodes[j].innerHTML && childs[i].childNodes[j].innerHTML.toLowerCase().indexOf("<br") > - 1) {
                              Page.has2lines = true; 
                              }
                           }
                        }
                     }
                  }
               if(Page.has2ndTab) {
                  if (Page.has2lines) {
                     leftCol.style.marginTop = "3.75em"; 
                     mainArea.style.marginTop = "3.75em"; 
                     }
                  }
               else {
                  leftCol.style.marginTop = "0.83333333em"; 
                  mainArea.style.marginTop = "0.83333333em"; 
                  }
               }
            }
         }
      }
   , adjustShadowLayout : function() {
      var sl = document.getElementById("shadowLeft"); 
      if(sl) sl.style.height = Page.computeNewBgHeight(); 
      var sr = document.getElementById("shadowRight"); 
      if(sr) sr.style.height = Page.computeNewBgHeight(); 
      }
   , adjustLeftcolHeight : function() {
      var leftcol = document.getElementById("leftCol"); 
      var navroot = document.getElementById("lefthandNavRoot"); 
      if(leftcol && navroot) {
         var navmenus = navroot.getElementsByTagName("ul"); 
         if(!(navmenus.length > 0)) {
            var mar_height = document.getElementById("mainArea").offsetHeight; 
            mar_height = ((mar_height - 15) / 12) + "em";
            leftcol.style.height = mar_height; 
            }
         }
      }
   , computeNewBgHeight : function() {
      var marginHeight = 2.6666666667; 
      if(Page.has2ndTab && Page.has2lines) {
         marginHeight = 2.75; 
         }
      else if(Page.has2ndTab && !Page.has2lines) {
         marginHeight = 0.83333333334; 
         }
      var co_height = document.getElementById("content").offsetHeight; 
      var win_height = (window.innerHeight) ? window.innerHeight : document.body.clientHeight; 
      var new_height = parseInt(Constants.HEADER_HEIGHT + (marginHeight / Constants.FONTSIZE_FACTOR_MAINAREA)); 
      var new_height = (new_height > co_height) ? new_height : co_height; 
	
	  return new_height;
	 
      //return (new_height >= win_height) ? Constants.FONTSIZE_FACTOR_CONTENT * new_height + "em" : "100%"; 
      }
   , adjustFrameworkWidth : function() {
      var body = document.getElementsByTagName("body")[0]; 
      var content = document.getElementById("content"); 
      var tabnav = document.getElementById("tabNavRoot"); 
      var leftCol = document.getElementById("leftCol"); 
      var mainContent = document.getElementById("mainContent"); 
      var footer = document.getElementById("footer"); 
      var originalWidth = (body.className.indexOf("frameworkWide") == - 1) ? (Constants.MAINAREA_WIDTH_NORMAL * Constants.ZOOM_FACTOR) : (Constants.MAINAREA_WIDTH_WIDE * Constants.ZOOM_FACTOR); 
      var contentWidth = content.offsetWidth * Constants.FONTSIZE_FACTOR_CONTENT; 
      if((mainContent.offsetWidth) > originalWidth && tabnav && contentWidth && body) {
         if(browser.agent == AbstractBrowser.AGENT_IE && footer) {
            tabnav.style.width = contentWidth + "em"; 
            var w = tabnav.offsetWidth * Constants.FONTSIZE_FACTOR_MAINAREA - Constants.FOOTER_MARGIN_LEFT;
            if (w > 0) {
            	/* If the condition is omitted, IE6 throws an exception */
            	footer.style.width = w + "em";
            }
            Page.adjustSimpleContWidth(); 
         }
         contentWidth = tabnav.offsetWidth * Constants.FONTSIZE_FACTOR_CONTENT; 
         Page.adjustTabnavWidth(tabnav); 
         Page.repositionShadows(body, contentWidth); 
         }
      if(tabnav) contentWidth = tabnav.offsetWidth * Constants.FONTSIZE_FACTOR_CONTENT; 
      if(browser.agent == AbstractBrowser.AGENT_IE && tabnav) {
         Page.adjustTabnavWidth(tabnav); 
         }
      }
   , adjustBgHeight : function() {
      var body = document.getElementsByTagName("body")[0]; 
      var content = document.getElementById("content"); 
      var tabnav = document.getElementById("tabNavRoot"); 
   }
   , adjustSimpleContWidth : function() {
      var mainContent = document.getElementById("mainContent"); 
      var allSimpleCont = new Array; 
      var divs = mainContent.getElementsByTagName("div"); 
      var c = 0; 
      if(mainContent) {
         for(var i = 0; div = divs[i]; i++) {
            if(div.className.indexOf(Constants.CSS_CLASS_CONTAINER) >= 0) {
               allSimpleCont[c] = new Object; 
               allSimpleCont[c]["simpleCont"] = div; 
               }
            if(div.className.indexOf(Constants.CSS_CLASS_CONTAINER_TITLE) >= 0) {
               allSimpleCont[c]["contTitle"] = div; 
               }
            if(div.className.indexOf(Constants.CSS_CLASS_CONTAINER_BODY) >= 0) {
               allSimpleCont[c]["contBody"] = div; 
               c++; 
               }
            }
         for(var i = 0; i < allSimpleCont.length; i++) {
            var widthCor = 0; 
            if(allSimpleCont[i]["contTitle"].className.indexOf(Constants.CSS_CLASS_CONTAINER_CLOSED) >= 0) widthCor = 1.25; 
            if(allSimpleCont[i]["contTitle"].className.indexOf(Constants.CSS_CLASS_CONTAINER_OPEN) >= 0) widthCor = 1.1667; 
            if(allSimpleCont[i]["contTitle"].offsetWidth < allSimpleCont[i]["contBody"].offsetWidth) {
               if(browser.version < 6) {
                  allSimpleCont[i]["contTitle"].style.width = allSimpleCont[i]["contBody"].offsetWidth * Constants.FONTSIZE_FACTOR_MAINAREA + "em"; 
                  }
               else {
                  allSimpleCont[i]["contTitle"].style.width = allSimpleCont[i]["contBody"].offsetWidth * Constants.FONTSIZE_FACTOR_MAINAREA - widthCor + "em"; 
                  }
               }
            }
         }
      }
   , adjustTabnavWidth : function(tabnav) {
      var contentWidth = tabnav.offsetWidth * Constants.FONTSIZE_FACTOR_CONTENT; 
      var firstLevelTabNav = tabnav.getElementsByTagName("ul")[0]; 
      if(firstLevelTabNav) {
         for(var i = 0; li = firstLevelTabNav.getElementsByTagName("li")[i]; i++) {
            if(li.getElementsByTagName("ul")[0]) {
               var secondLevelTabNav = li.getElementsByTagName("ul")[0]; 
               secondLevelTabNav.style.width = (browser.agent == AbstractBrowser.AGENT_IE && browser.version < 6) ? (contentWidth) + "em" : (contentWidth - 0.0625) + "em"; 
               }
            }
         }
      }
   , repositionShadows : function(body, contentWidth) {
      var sl = document.getElementById("shadowLeft"); 
      var sr = document.getElementById("shadowRight"); 
      var newOffsetLeft = "-" + (contentWidth / 2) + "em"; 
      var newOffsetRight = (body.className == "leftAlign") ? (contentWidth - 0.0625) + "em 0" : (contentWidth / 2 - 0.0625) + "em 0"; 
      if(browser.agent == AbstractBrowser.AGENT_OP) {
         newOffsetLeft = "-" + (contentWidth / Constants.FONTSIZE_FACTOR_CONTENT / 2) + "px"; 
         newOffsetRight = (body.className == "leftAlign") ? (contentWidth / Constants.FONTSIZE_FACTOR_CONTENT) + "px 0" : (contentWidth / Constants.FONTSIZE_FACTOR_CONTENT) /2 + "px 0";
         }
      if(sl) sl.style.marginLeft = newOffsetLeft; 
      if(sr) sr.style.backgroundPosition = newOffsetRight; 
      }
   , ENUM_POPUPSIZES : {
      inter_small : [460, 500], inter_large : [642, 500], intra_small : [331, 650], intra_large : [628, 650], apps_small : [331, 500], apps_medium : [446, 500], apps_large : [628, 500], apps_xlarge : [860, 500]}
   , DEFAULT_POPUP_HEIGHT : [500, 650], openPopup : function(pop_url, pop_name, pop_type) {
      var w_factor = (navigator.userAgent.match(/msie/gi))? 0 :0;
      if(!pop_type) {
         var pop_params = ""; 
         }
      else if(this.ENUM_POPUPSIZES[pop_type]) {
         var pop_width = this.ENUM_POPUPSIZES[pop_type][0] + w_factor; 
         var pop_height = this.ENUM_POPUPSIZES[pop_type][1]; 
         var pop_params = "width=" + pop_width + ",height=" + pop_height + ",scrollbars=1,resizable=0"; 
         }
      else if(pop_type.match(/\d{1,4},\d{1,4}/) != ""){var dims = pop_type.split(",");
      var pop_width = parseInt(dims[0]) + w_factor; 
      var pop_height = parseInt(dims[1]); 
      var pop_params = "width=" + pop_width + ",height=" + pop_height + ",scrollbars=1,resizable=0"; 
      }
   pop_name = (pop_name != "") ? pop_name : ("pop_" + new Date().getTime()); 
   var popup = window.open(pop_url, pop_name, pop_params); 
   if(pop_width) Page.currentPopup_width = pop_width; 
   }
, setupPopup : function() {
   var maclass = document.getElementById("mainArea").className; 
   if(window["ShowHeader"] && ShowHeader) {
      document.getElementById("logo").className = "visible"; 
      }
   if(window["HideFooter"] && HideFooter) {
      document.getElementById("footer").className = "invisible"; 
      }
   if(maclass.indexOf("content2Col") > - 1) {
      var PopID = "popup2Col"; 
      }
   else if(maclass.indexOf("contentMedium") > - 1) {
      var PopID = "popupMedium"; 
      }
   else if(maclass.indexOf("contentWide") > - 1) {
      var PopID = "popupWide"; 
      }
   else if(maclass.indexOf("MainWeather") > - 1) {
      var PopID = "popupWeather"; 
      }
   else if(maclass.indexOf("MainOrgChart") > - 1) {
      var PopID = "popupOrgChart"; 
      }
   else {
      var PopID = "popupSpecial"; 
      }
   var body = document.getElementsByTagName("body")[0]; 
   with(body) {
      style.textAlign = "left"; 
      style.background = "none"; 
      style.backgroundColor = "#ffffff"; 
      setAttribute("id", PopID); 
      className = className + " popup"; 
      }
   if(opener && opener.Page && opener.Page.currentPopup_width) {
      var content = document.getElementById("content"); 
      content.style.height = "auto"; 
      content.style.minHeight = "1px"; 
      var cheight = content.offsetHeight; 
      var dheight = (window["HideFooter"] && HideFooter) ? 51 : 26; 
      var h_factor = ((navigator.userAgent.match(/opera/gi) || navigator.userAgent.match(/gecko/gi)) && !navigator.userAgent.match(/netscape/gi))? 25 :5;
      var pop_height = cheight + dheight + h_factor; 
      var pop_width = parseInt(opener.Page.currentPopup_width) + 10; 
      var default_height = (Navigation && Navigation.getById("metanav")) ? this.DEFAULT_POPUP_HEIGHT[1] : this.DEFAULT_POPUP_HEIGHT[0]; 
      if(pop_height <= default_height) {
         if(browser.agent == AbstractBrowser.AGENT_MZ) {
            pop_width = pop_width - 22; 
            }
         else if(browser.agent == AbstractBrowser.AGENT_OP) {
            pop_width = pop_width - 18; 
            }
         window.resizeTo(pop_width, pop_height); 
         }
      }
   self.focus(); 
   }
, openInParent : function(url) {
   if(top.opener && url != "") {
      top.opener.location.href = url; 
      }
   }
, ENUM_LANGUAGES : {
   "en" : ["English", "Language"], "de" : ["Deutsch", "Sprache"], "fr" : ["Fran&ccedil;ais", "Langue"], "it" : ["Italiano", "Lingua"], "es" : ["Espa&ntilde;ol", "Idioma"]}
, changeLanguage : function(newlang) {

	var confirmVar = window.confirm("Changing language takes you to the home page!");
	
	if (confirmVar){
	
	var langs = "";
   for(var l in this.ENUM_LANGUAGES) langs += l + "|"; 
   langs = langs.substring(0, langs.length - 1); 
   var url_rexp = new RegExp("(.[\\./])(" + langs + ")([\\./])"); 
   var doc_rexp = new RegExp("_(" + langs + ")\\."); 
   var prm_rexp = new RegExp("language=(" + langs + ")"); 
   var url = document.location.pathname; 
   var prm = document.location.search; 
   var match = null; 
   match = url.match(url_rexp);
   if(match) {
      var url = url.replace(url_rexp, (RegExp.$1 + newlang + RegExp.$3)); 
      }
   var match = null; 
   match = url.match(doc_rexp); 
   if(match) {
      var url = url.replace(doc_rexp, ("_" + newlang + ".")); 
      }
   var match = null; 
   match = prm.match(prm_rexp); 
   if(match) {
      var prm = prm.replace(prm_rexp, ("language=" + newlang)); 
      }
   var new_url = url + prm;
   var host = document.location.pathname;
   var registerLanguage = null;
   var lastIndex = host.lastIndexOf("/");
   var changeLanguageAddress = host.substr(0,lastIndex) + "/ChangeLanguage.do";


   //var changeLanguageParams = "?language=" + newlang +"&rp="+ new_url;
    var changeLanguageParams = "?language=" + newlang ;
   
   //document.location.href =   changeLanguageAddress + changeLanguageParams;
    document.location.href =   "/aura-base/bw/ChangeLanguage.do" + changeLanguageParams;
   }
  
   }
, detectLanguage : function() {
   var langs = ""; 
   for(var l in this.ENUM_LANGUAGES) langs += l + "|"; 
   langs = langs.substring(0, langs.length - 1); 
   var url = document.location.pathname; 
   var prm = document.location.search; 
   var url_rexp = new RegExp(".[\\./](" + langs + ")[\\./]"); 
   var doc_rexp = new RegExp("_(" + langs + ")\\."); 
   var prm_rexp = new RegExp("language=(" + langs + ")"); 
   var act_lang = null; 
   url_rexp.exec(url); 
   if(RegExp.$1 && RegExp.$1.length == 2) {
      var act_lang = RegExp.$1; 
      }
   else {
      doc_rexp.exec(url); 
      if(RegExp.$1 && RegExp.$1.length == 2) {
         var act_lang = RegExp.$1;
         }
      else {
         prm_rexp.exec(prm); 
         if(RegExp.$1 && RegExp.$1.length == 2) {
            var act_lang = RegExp.$1; 
            }
         }
      }
   this.act_lang = (act_lang) ? act_lang : language.toLowerCase();
   }
, writeLanguageSelector : function(pagelangs) {
   if(window["SettingsLabel"] && SettingsLabel.length > 0) return; 
   if(!this.act_lang) {
      this.act_lang = language.toLowerCase();
      }
   if(this.ENUM_LANGUAGES[this.act_lang]) {
      var html_langsel = this.ENUM_LANGUAGES[this.act_lang][1] + ":"; 
      var pagelangs = pagelangs.split("."); 
      var lang_count = 0; 
      var lang_act = false; 
      for(var i = 0; i < pagelangs.length; i++) {
         if(this.ENUM_LANGUAGES[pagelangs[i]]) {
            if(pagelangs[i] == this.act_lang) {
               lang_act = true; 
               html_langsel += "<span class=\"active\" title=\"" + this.ENUM_LANGUAGES[pagelangs[i]][0] + "\">" + pagelangs[i].toUpperCase() + "</span> "; 
               }
            else {
               html_langsel += "<a class=\"lang\" href=\"javascript:Page.changeLanguage('" + pagelangs[i] + "');\" title=\"" + this.ENUM_LANGUAGES[pagelangs[i]][0] + "\">" + pagelangs[i].toUpperCase() + "</a> "; 
               }

            lang_count++; 
            }
         }
      var html = html_langsel; 
      if(lang_count != 1 || lang_act == false) {
         document.write(html); 
         document.getElementById("languageSelector").className = "languageSelector"; 
         }
      }
   }
, writeElement : function(item, param1, param2) {
   if(item && item.length && item.length > 0) {
      if(!param1 && !param2) {
         if(item.constructor && item.constructor.toString().toLowerCase().indexOf("array") > - 1) {
            var html = ""; 
            for(var i = 0; i < item.length; i++) {
               if(i != 0) html += "/ "; 
               html += item[i] + " "; 
               }
            }
         else var html = item; 
         }
      else if(param1 && !param2) {
         if(item.constructor && item.constructor.toString().toLowerCase().indexOf("array") > - 1) {
            }
         else {
            if(param1.indexOf("{$}") > - 1) {
               param1 = param1.replace(/</gi, "<").replace(/>/gi, ">");
               var html = param1.replace(/\{\$\}/, item);
               }
            else {
               var html = "<a href=\"" + param1 + "\">" + item + "</a>"; 
               }
            }
         }
      else if(param1 && param2) {
         if(item.constructor && item.constructor.toString().toLowerCase().indexOf("array") > - 1) {
            if(param2.indexOf("{$}") > - 1) {
               param2 = param2.replace(/</gi, "<").replace(/>/gi, ">");
               var html = ""; 
               for(var i = 0; i < item.length; i++) {
                  var link = "<a href=\"" + ((param1[i]) ? param1[i] : "#") + "\">" + item[i] + "</a>"; 
                  html += param2.replace(/\{\$\}/, link);
                  }
               }
            }
         else {
            if(param2.indexOf("{$}") > - 1) {
               param2 = param2.replace(/</gi, "<").replace(/>/gi, ">");
               var html = "<a href=\"" + param1 + "\">" + item + "</a>"; 
               html = param2.replace(/\{\$\}/, html);
               }
            }
         }
      if(html) document.write(html); 
      }
   }
, writeStatefullElement : function(param1, param2) {
   var html = " <a class=\"prefs\" href=\"" + param2 + "\">" + param1 + "</a>"; 
   if(param2.length == 0) {
      html = "<span class=\"active\">" + param1 + "</span>"; 
      }
   document.write(html); 
   }
, writeFooterInfo : function(date, datehtml, owner, ownerurl, ownerhtml) {
   if(!date || date.length == 0) {
      datehtml = ""; 
      }
   else {
      datehtml = datehtml.replace(/</gi, "<").replace(/>/gi, ">");
      datehtml = datehtml.replace(/\{\$\}/, date);
      }
   if(!owner || owner.length == 0) {
      ownerhtml = ""; 
      }
   else {
      ownerhtml = ownerhtml.replace(/</gi, "<").replace(/>/gi, ">");
      ownerhtml = ownerhtml.replace(/\{\$\}/, "" + owner + "");
      }
   document.write(datehtml + ownerhtml); 
   }
, print : function() {
   if(window.print) {
      window.print(); 
      }
   else {
      alert("Your browser does't support this feature.\nPlease, use your browser's normal print command."); 
      }
   }
}; 
var Constants = {
ZOOM_FACTOR : 1, FONTSIZE_FACTOR_MAINAREA : (1 / 16), FONTSIZE_FACTOR_CONTENT : (1 / 12), LOGO_REFERENCEWIDTH : 175, MAINAREA_WIDTH_NORMAL : 812, MAINAREA_WIDTH_WIDE : 974, LOGO_ID : "picInvisible", FOOTER_MARGIN_LEFT : 14.333334, HEADER_HEIGHT : 120, CSS_CLASS_CONTAINER : "simple-container", CSS_CLASS_CONTAINER_TITLE : "container-title", CSS_CLASS_CONTAINER_BODY : "container-body", CSS_CLASS_CONTAINER_CLOSED : "witharrow-closed", CSS_CLASS_CONTAINER_OPEN : "witharrow-open"};

/* Removed the following as altura.js is no longer used */
/*
// Attach to the onload event
if (window.attachEvent)
{
    window.attachEvent ( "onload",alturaInit );
    window.attachEvent ( "onunload",alturaFinish );
}
else if (window.addEventListener )
{
    window.addEventListener ( "load",alturaInit,false );
    window.addEventListener ( "unload",alturaFinish,false );
}
else
{
    window.onload = alturaInit;
    window.onunload = alturaFinish;
}
*/

window.onload = Page.init; 
if(self.name == "") {
window.onresize = Page.adjustLayout; 
}
