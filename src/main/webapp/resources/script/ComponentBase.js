/**
 * base class of the EZComponent framework.
 *
 * WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
 *
 * Note since we do not rely on legacy technology
 * here anymore a W3C Dom Level3 compliant browser is a must
 * which has node.querySelectorAll and the dom level3 events implemented
 *
 *
 * Before you start crying, I want to have all this working in IE(name whatever
 * version you like), I wont be doing it for you if you want to use non
 * standard compliant browsers supported
 * roll it yourself I will be happy to merge the code in as long
 * as you dont stain the core code with fallbacks within the same class.
 *
 * Same goes for shoddy mobile browsers, roll it yourself I will only
 * support W3C compliant browsers in this code to keep the code
 * as lean as possible, for learning purposes. Support for non compliant
 * browsers is not part of this project and would taint the code.
 * I had to do it for jsf.js in myfaces which now is a pointles 40% more code
 * than needed bloat, but this is a sideproject which does not need it!
 */

(function() {

    var _RT = myfaces._impl.core._Runtime;

    _RT.reserveNamespace("extras.apache.ExtendedEventQueue");
    _RT.reserveNamespace("extras.apache.ExtendedErrorQueue");

    var _extras = extras.apache;
    var _util = myfaces._impl._util;

    _extras.ExtendedEventQueue = new _util._ListenerQueue();
    _extras.ExtendedErrorQueue = new _util._ListenerQueue();

    jsf.ajax.addOnEvent(function(eventData) {
        _extras.ExtendedEventQueue.broadcastEvent(eventData);
    });

    jsf.ajax.addOnError(function(eventData) {
        _extras.ExtendedErrorQueue.broadcastEvent(eventData);
    });

})();

( function() {
    /**
     * Base class for all widgets
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;
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
        KEY_ENTER:      13,


        EVT_FOCUS:      "focus",
        EVT_BLUR:       "blur",
        EVT_KEY_DOWN:   "keydown",
        EVT_KEY_PRESS:  "keypress",
        EVT_KEY_UP:     "keyup",
        EVT_ENTER:      "keyenter",


        EVT_CLICK:      "click",

        P_VIEWBODY: "javax.faces.ViewBody",
        P_VIEWROOT: "javax.faces.ViewRoot",


        constructor_: function(argsMap) {
            _Lang.applyArgs(this, argsMap);
            _RT.addOnLoad(window, _Lang.hitch(this, this._postInit));

            //we enforce the scope for the onAjaxEvent
            this.onAjaxEvent = _Lang.hitch(this, this.onAjaxEvent);
        },

        _postInit: function() {

            this.rootNode = document.querySelectorAll("#" + this.id.replace(/:/g, "\\:"))[0];
            _AjaxQueue.enqueue(this.onAjaxEvent);
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
            if (evt.status == "complete") {

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
                for (var cnt = updates.length - 1; cnt >= 0; cnt--) {
                    var updateId = updates[cnt].getAttribute("id");
                    if (updateId && (updateId == this.P_VIEWBODY || updateId == "java.faces.ViewRoot" || this.id == updateId || document.querySelectorAll("#" + updateId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                        this._onDomUnload(evt);
                    }
                }
                for (var cnt = deletes.length - 1; cnt >= 0; cnt--) {
                    var deleteId = deletes[cnt].getAttribute("id");
                    if (deleteId && (deleteId == this.P_VIEWBODY || deleteId == this.P_VIEWROOT || this.id == deleteId || document.querySelectorAll("#" + deleteId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                        this._onDomUnload(evt);
                    }
                }
            }
            /*if (evt.status == "success") {
             var responseXML = evt.responseXML;
             var updates = responseXML.querySelectorAll("changes update");
             var inserts = responseXML.querySelectorAll("changes insert");
             //inserts are not needed because we can deal with
             for (var cnt = updates.length - 1; cnt >= 0; cnt--) {
             var updateId = updates[cnt].getAttribute("id");
             if (updateId && (updateId == this.P_VIEWBODY || updateId == "java.faces.ViewRoot" || this.id == updateId || document.querySelectorAll("#" + updateId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
             this._onDomLoad(evt);
             }
             }
             for (var cnt = inserts.length - 1; cnt >= 0; cnt--) {
             var insertId = inserts[cnt].getAttribute("id");
             if (insertId && (insertId == this.P_VIEWBODY || insertId == this.P_VIEWROOT || this.id == insertId || document.querySelectorAll("#" + insertId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
             this._onDomLoad(evt);
             }
             }
             }*/
        },
        //TODO we might move our jsf event triggered handler
        //To the Dom Level 3 event DOMNodeRemoved
        _onDomUnload: function(evt) {
            _AjaxQueue.dequeue(this.onAjaxEvent);
            this.onDomUnload(evt);
        },

        _onDomInsert: function(evt) {
            _AjaxQueue.dequeue(this.onAjaxEvent);
            this.onDomLoad(evt);
        },

        /**
         * note this is the most important callback handler
         * it is triggered whenever the current component is unloaded
         * from the dom via an ajax update or replace of itself
         * or one of its parent components
         *
         * this callback should or better must be used to deregister
         * event listeners or other data which might leak into memory
         *
         * sidenote we currently do this event over the ajax api
         * which should suffice but we may add another event hook
         * which is triggered in manual cases, because from
         * time to time we trigger node deletes in non ajax cases
         * (going over the official api is way too slow, because
         * it literally triggers on any node)
         *
         * @param evt
         */
        onDomUnload: function(evt) {
        },
        onDomLoad: function(evt) {
        },

        getWindowParam: function(name) {
            var s = window.location.search.substring(1).split('&');
            if (!s.length) return;
            var c = {};
            for (var i = 0; i < s.length; i++) {
                var parts = s[i].split('=');
                c[unescape(parts[0])] = unescape(parts[1]);
            }
            return name ? c[name] : c;
        }


    });
})();