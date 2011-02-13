( function() {
    /**
     * Base class for all widgets
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;


    /**
     * Base class for all components which adds certain behavior
     * to our widgets, we dont use a dojo like templating system
     * because our jsf facelet templates are enough,
     * for subtemplating we can move over but for now
     * what we have suffices.
     */
    _RT.extendClass("extras.apache.ComponentBase", Object, {
        rootNode: null,
        id: null,
        /**
         * constants, since we only deal with html5+ we do not
         * cover the entire huge quirksmode.org section
         * but concentrate ourselves on the raw codes
         * only supported by newer browsers
         */
        KEY_ARROW_UP:   38,
        KEY_ARROW_DOWN: 40,
        KEY_TAB:         9,
        KEY_ESCAPE:     27,

        EVT_FOCUS:      "focus",
        EVT_BLUR:       "blur",
        EVT_KEY_DOWN:   "keydown",
        EVT_KEY_PRESS:  "keypress",
        EVT_KEY_UP:     "keyup",

        EVT_CLICK:      "click",

        P_VIEWBODY: "javax.faces.ViewBody",
        P_VIEWROOT: "javax.faces.ViewRoot",


        constructor_: function(argsMap) {
            _Lang.applyArgs(this, argsMap);
            _RT.addOnLoad(window, _Lang.hitch(this, this._postInit));
        },

        _postInit: function() {

            this.rootNode = document.querySelectorAll("#" + this.id)[0];
        },

        querySelectorAll: function(queryStr) {
            return this.rootNode.querySelectorAll(queryStr);
        },

        addClass: function(node, styleClass) {
            var classes = node.getAttribute("class");
            if (!classes) {
                node.setAttribute("class", styleClass);
                return;
            }
            classes = classes.split(/\s+/g);
            var alreadyIn = false;
            for (var cnt = classes.length - 1; cnt >= 0; cnt--) {
                alreadyIn = alreadyIn || (classes[cnt] == styleClass)
            }
            if (alreadyIn) return;
            classes.push(styleClass);

            node.setAttribute("class", classes.join(" "));
        },

        removeClass: function(node, styleClass) {
            var res = [];
            var classes = node.getAttribute("class");
            if (!classes) return;
            classes = classes.split(/\s+/g);
            for (var cnt = classes.length - 1; cnt >= 0; cnt--) {
                if (classes[cnt] != styleClass) res.push(classes[cnt]);
            }
            node.setAttribute("class", res.join(" "));
        },

        //TODO we need a replacement handler which notifies the control that it is about to be replaced
        //so that the control can unload eventual event hooks or ajax listeners
        onAjaxEvent: function(evt) {
            if (evt.status == "success") {
                var responseXML = evt.responseXML;
                //we now parse the response xml for ids which
                //are root of alterations and then
                //send the unook event if our identifier is found
                //being one of the ids or a subchild of them
                //note this is way more performant then to hook
                //onto the dom change events
                var updates = responseXML.querySelectorAll("changes update");
                var deletes = responseXML.querySelectorAll("changes delete");

                //inserts are not needed because we can deal with
                for (var cnt = updates.length - 1; cnt >= 0; cnt++) {
                    var udateId = updates[cnt].getAttribute("id");
                    if (udateId == this.P_VIEWBODY || udateId == "java.faces.ViewRoot" || this.id == udateId || document.querySelectorAll("#" + udateId + " #" + this.id).length > 0) {
                        this.onDomUnload(evt);
                    }
                }
                for (var cnt = deletes.length - 1; cnt >= 0; cnt++) {
                    var updateId = updates[cnt].getAttribute("id");
                    if (updateId == this.P_VIEWBODY || updateId == this.P_VIEWROOT || this.id == updateId || document.querySelectorAll("#" + updateId + " #" + this.id).length > 0) {
                        this.onDomUnload(evt);
                    }
                }
            }
        },

        onDomUnload: function(evtt) {
            //callback which is triggered upon a dom change
            //we can use this callback for further cleanup operations
        }

    });
})();