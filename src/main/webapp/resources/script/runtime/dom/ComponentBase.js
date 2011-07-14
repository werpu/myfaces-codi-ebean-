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

    _RT.reserveNamespace("extras.apache", {});
    //_RT.reserveNamespace("extras.apache.ExtendedErrorQueue");

    var _extras = extras.apache;
    var _util = myfaces._impl._util;

    _extras.ExtendedEventQueue = _extras.ExtendedEventQueue || new _util._ListenerQueue();
    _extras.ExtendedErrorQueue = _extras.ExtendedErrorQueue || new _util._ListenerQueue();

    jsf.ajax.addOnEvent(function(eventData) {
        extras.apache.ExtendedEventQueue.broadcastEvent(eventData);
    });

    jsf.ajax.addOnError(function(eventData) {
        extras.apache.ExtendedErrorQueue.broadcastEvent(eventData);
    });

})();

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
     *
     * @namespace extras.apache.ComponentBase
     */
    _RT.extendClass("extras.apache.ComponentBase", Object, {
        _AjaxQueue : extras.apache.ExtendedEventQueue,
        _ErrorQueue : extras.apache.ExtendedErrorQueue,
        _LANG:  myfaces._impl._util._Lang,

        /**
         * the root node for grouped elements
         * (important for intra group messaging)
         */
        groupRootNode: null,
        /**
         * the root node of the current widget
         */
        rootNode: null,
        /**
         * client id for referencing proper embedded
         * jsf root elements which are usually decorated
         * with a html root element for ajax reasons
         */
        clientId: null,
        /**
         * the id of the root node for the current element
         */
        id: null,
        /**
         * string which references the javascript var
         * under the current window namespace
         */
        javascriptVar: null,

        ajaxRequest: false,

        NODE: myfaces._impl._dom.Node,
        /**
         * constants, since we only deal with html5+ we do not
         * cover the entire huge quirksmode.org section
         * but concentrate ourselves on the raw codes
         * only supported by newer browsers
         *
         * TODO move this part to the keyboard aware behavior
         *
         */
        KEY_ARROW_UP:   38,
        KEY_ARROW_DOWN: 40,
        KEY_TAB:         9,
        KEY_ESCAPE:     27,
        KEY_ENTER:      13,
        KEY_CTRL:       17,
        KEY_SPACE:      49,

        EVT_FOCUS:      "focus",
        EVT_BLUR:       "blur",
        EVT_KEY_DOWN:   "keydown",
        EVT_KEY_PRESS:  "keypress",
        EVT_KEY_UP:     "keyup",
        EVT_ENTER:      "keyenter",
        EVT_CLICK:      "click",
        EVT_MOUSE_OVER: "mouseover",
        EVT_MOUSE_OUT:  "mouseout",

        CEVT_DATE_SELECT: "ezw_dateSelect",
        CEVT_ON_TOGGLE_OPEN: "ezw_onToggleOpen",
        CEVT_ON_TOGGLE_CLOSE: "ezw_onToggleClose",
        CEVT_AFTER_POST_INIT: "ezw_afterPostInit",
        CEVT_VALUE_HOLDER_REPLACED: "ezw_valueHolderReplaced",
        CEVT_PARENT_CHANGE: "ezw_parentChange",


        DATA_ATTR_UPDATE_LISTENER: "data-ezw-update-listener",
        DATA_ATTR_JAVASCRIPT_VAR: "data-ezw_javascriptvar",
        DATA_ATTR_COMPONENTTYPE:"data-ezw_componentType",


        P_VIEWBODY: "javax.faces.ViewBody",
        P_VIEWROOT: "javax.faces.ViewRoot",

        valueHolderAppendix: "_valueHolder",
        valueHolderId: null,

        ajaxAware: true,
        unloadAware: true,

        /**
         * if the object is referenced from outside the referencing
         * instance can be assigned here as standard instance var
         */
        referencingInstance: null,

        constructor_: function(argsMap) {
            _Lang.applyArgs(this, argsMap);

            //we enforce the scope for the onAjaxEvent
            this.onAjaxEvent = _Lang.hitch(this, this.onAjaxEvent);
            this.onAjaxError = _Lang.hitch(this, this.onAjaxError);
            this._ajaxInit = _Lang.hitch(this, this._ajaxInit);

            this.id = this.id || this.clientId + ":" + this.clientId;

            this.valueHolderId = this.valueHolderId || this.id + this.valueHolderAppendix;

            if (this.ajaxRequest) {
                //TODO investigate why the queue is not triggering
                this._AjaxQueue.enqueue(this._ajaxInit);
                this._ErrorQueue.enqueue(this._ajaxInit);
                //setTimeout(this._ajaxInit, 100);

            } else {
                /*internal postinit*/
                this.addOnLoad(window, _Lang.hitch(this, function() {
                            this._onBeforePostInit();
                            this._postInit();
                            this._onAfterPostInit();
                        }
                ));
                /*external postinit*/
                this.addOnLoad(window, _Lang.hitch(this, function() {
                            this.postInit_();

                        }
                ));

            }

            this._initProperties();
        },

        _initProperties: function() {

        },

        //TODO apply ecmascript 2
        // setters and getters for the private vars

        _ajaxInit: function(data) {
            try {
                this._postInit();
                this.postInit_();
            } finally {
                this._AjaxQueue.remove(this._ajaxInit);
                this._ErrorQueue.remove(this._ajaxInit);
            }
        },

        addOnLoad: function(target, func) {
            var oldonload = (target) ? target.onload : null;
            target.onload = (!oldonload) ? func : function() {
                try {
                    oldonload();

                } catch (e) {
                    console.error(e);
                    throw e;
                } finally {
                    func();

                }
            };
        },

        _onBeforePostInit: function() {

        },

        _postInit: function() {

            this.rootNode = this.NODE.querySelector("#" + this.id.replace(/:/g, "\\:"));
            if (this.ajaxAware) {
                this._AjaxQueue.enqueue(this.onAjaxEvent);
                this._ErrorQueue.enqueue(this.onAjaxError);
            }
            if (this.javascriptVar) {
                this.rootNode.setAttribute(this.DATA_ATTR_JAVASCRIPT_VAR, this.javascriptVar);
            }
            if (this._componentType) {
                this.rootNode.setAttribute(this.DATA_ATTR_COMPONENTTYPE, this._componentType);
            }

        },

        _onAfterPostInit: function() {
            var dataUpdateListeners = this.rootNode.getAttribute("data-ezw-update-listener");
            if (dataUpdateListeners) {
                dataUpdateListeners = dataUpdateListeners.split(" ");
                var _t = this;
                setTimeout(function() {
                    for (var cnt = dataUpdateListeners.length - 1; cnt >= 0; cnt--) {
                        window[dataUpdateListeners[cnt]].rootNode.dispatchEvent(_t.CEVT_AFTER_POST_INIT, {src:this});
                    }
                }, 0);
            }
        },

        querySelectorAll: function(queryStr) {
            return this.rootNode.querySelectorAll(queryStr);
        },

        onAjaxError: function(evt) {

        },

        onAjaxBegin: function(evt) {

        },
        onAjaxComplete: function(evt) {

        },
        onAjaxSuccess: function(evt) {

        },

        onAjaxEvent: function(evt) {
            try {
                if (evt.status == "begin") {
                    this.onAjaxBegin(evt);
                }
                else if (evt.status == "success") {
                    this.onAjaxSuccess(evt);
                }
                else if (evt.status == "complete") {
                    this.onAjaxComplete(evt);
                }
            } finally {
                this._onAjaxEvent(evt);
            }
        },

        //TODO we need a replacement handler which notifies the control that it is about to be replaced
        //so that the control can unload eventual event hooks or ajax listeners
        _onAjaxEvent: function(evt) {
            if (evt.status == "complete" && this.unloadAware) {

                var responseXML = evt.responseXML;
                //we now parse the response xml for ids which
                //are root of alterations and then
                //send the unook event if our identifier is found
                //being one of the ids or a subchild of them
                //note this is way more performant then to hook
                //onto the dom change events
                var updates = null;
                var deletes = null;
                if (responseXML.querySelectorAll) {
                    updates = responseXML.querySelectorAll("changes update");
                    deletes = responseXML.querySelectorAll("changes delete");
                } else {
                    responseXML.setProperty("SelectionLanguage", "XPath");
                    updates = responseXML.documentElement.selectNodes("//changes/update");
                    deletes = responseXML.documentElement.selectNodes("//changes/delete");
                }

                //inserts are not needed because we can deal with
                for (var cnt = updates.length - 1; cnt >= 0; cnt--) {
                    var updateId = updates[cnt].getAttribute("id");
                    if (updateId && (updateId == this.P_VIEWBODY || updateId == "java.faces.ViewRoot" || this.id == updateId || this.clientId == updateId || document.querySelectorAll("#" + updateId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                        this._onAjaxDomUnload(evt);
                    }
                }
                for (var cnt = deletes.length - 1; cnt >= 0; cnt--) {
                    var deleteId = deletes[cnt].getAttribute("id");
                    if (deleteId && (deleteId == this.P_VIEWBODY || deleteId == this.P_VIEWROOT || this.id == deleteId || document.querySelectorAll("#" + deleteId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                        this._onAjaxDomUnload(evt);
                    }
                }
            }
            if (evt.status == "success" && this.contentAware) {
                var responseXML = evt.responseXML;
                var updates = null;
                var deletes = null;
                var inserts
                if (responseXML.querySelectorAll) {
                    updates = responseXML.querySelectorAll("changes update");
                    deletes = responseXML.querySelectorAll("changes delete");
                    inserts = responseXML.querySelectorAll("changes insert");
                } else {
                    responseXML.setProperty("SelectionLanguage", "XPath");
                    updates = responseXML.documentElement.selectNodes("//changes/update");
                    deletes = responseXML.documentElement.selectNodes("//changes/delete");
                }
                //inserts are not needed because we can deal with
                for (var cnt = updates.length - 1; cnt >= 0; cnt--) {
                    var updateId = updates[cnt].getAttribute("id");
                    if (updateId && (updateId == this.P_VIEWBODY || updateId == "java.faces.ViewRoot" || this.id == updateId || this.clientId == updateId || this.rootNode.querySelector("#" + updateId.replace(/:/g, "\\:")) || document.querySelectorAll("#" + updateId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                        this._onAjaxContentRefreshed(evt);
                    }
                }
                for (var cnt = deletes.length - 1; cnt >= 0; cnt--) {
                    var deleteId = deletes[cnt].getAttribute("id");
                    if (deleteId && (deleteId == this.P_VIEWBODY || deleteId == this.P_VIEWROOT || this.id == deleteId || this.rootNode.querySelector("#" + deleteId.replace(/:/g, "\\:")) || document.querySelectorAll("#" + deleteId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                        this._onAjaxContentRefreshed(evt);
                    }
                }
                /*for (var cnt = inserts.length - 1; cnt >= 0; cnt--) {
                 var deleteId = insert[cnt].getAttribute("id");
                 if (deleteId && (deleteId == this.P_VIEWBODY || deleteId == this.P_VIEWROOT || this.id == deleteId || this.rootNode.querySelector("#"+deleteId.replace(/:/g, "\\:")) || document.querySelectorAll("#" + deleteId.replace(/:/g, "\\:") + " #" + this.id.replace(/:/g, "\\:")).length > 0)) {
                 this._onAjaxDomUnload(evt);
                 }
                 }*/
            }

        },
        //TODO we might move our jsf event triggered handler
        //To the Dom Level 3 event DOMNodeRemoved
        _onAjaxDomUnload: function(evt) {
            this._AjaxQueue.dequeue(this.onAjaxEvent);
            this._ErrorQueue.dequeue(this.onAjaxError);
            this.onAjaxDomUnload(evt);
        },

        _onAjaxDomInsert: function(evt) {
            this._AjaxQueue.dequeue(this.onAjaxEvent);
            this.onAjaxDomLoad(evt);
        },

        _onAjaxContentRefreshed: function(evt) {

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
        onAjaxDomUnload: function(evt) {
        },

        onAjaxDomLoad: function(evt) {
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
        },

        postInit_: function() {

        },

        _defineProperty: function(name, getter, setter) {
            var props = {};
            (getter) ? props.get = getter : null;
            (setter) ? props.set = setter : props.readonly = true;

            Object.defineProperty(this, name, props);
        }

    });
})();