/**
 * core class for
 *
 * @namespace myfaces._impl._dom._NodeUtils
 */

myfaces._impl.core._Runtime.singletonExtendClass("myfaces._impl._dom._NodeUtils", myfaces._impl._dom._DomEngine, {


    _domEngine: null,

    constructor_: function() {
    },


    getEngine: function() {
        if (!this._engineInitiated) {
            this._domEngine = (this.isDomCompliant()) ? myfaces._impl._dom._DomEngineCompliant : myfaces._impl._dom._DomEngineNonCompliant;
            this._engineInitiated = true;
        }
        return this._domEngine;
    },

    /**
     * Checks whether the browser is dom compliant.
     * Dom compliant means that it performs the basic dom operations safely
     * without leaking and also is able to perform a native setAttribute
     * operation without freaking out
     *
     *
     * Not dom compliant browsers are all microsoft browsers in quirks mode
     * and ie6 and ie7 to some degree in standards mode
     * and pretty much every browser who cannot create ranges
     * (older mobile browsers etc...)
     *
     * We dont do a full browser detection here because it probably is safer
     * to test for existing features to make an assumption about the
     * browsers capabilities
     */
    isDomCompliant: function() {
        if ('undefined' == typeof this._isCompliantBrowser) {
            this._isCompliantBrowser = !! ((window.Range
                    && typeof Range.prototype.createContextualFragment == 'function') //createContextualFragment hints to a no quirks browser but we need more fallbacks
                    || document.querySelectoryAll  //query selector all hints to html5 capabilities
                    || document.createTreeWalker);   //treewalker is either firefox 3.5+ or ie9 standards mode
        }
        return this._isCompliantBrowser;
    },


    /**
     * determines to fetch a node
     * from its id or name, the name case
     * only works if the element is unique in its name
     * @param elem
     */
    byIdOrName: function(elem) {
        if (!this._Lang.isString(elem)) return elem;
        if (!elem) return null;
        var ret = this.byId(elem);
        if (ret) return ret;
        //we try the unique name fallback
        var items = document.getElementsByName(elem);
        return ((items.length == 1) ? items[0] : null);
    },



    /**
     * Simple delete on an existing item
     */
    deleteItem: function(itemIdToReplace) {
        var item = this.byId(itemIdToReplace);
        if (!item) {
            throw Error("_Dom.deleteItem  Unknown Html-Component-ID: " + itemIdToReplace);
        }

        this.getEngine()._removeNode(item, false);
    },

    outerHTML: function(item, markup) {
        if (!item) {
            throw Error(this._Lang.getMessage("ERR_MUST_BE_PROVIDED1", null, "myfaces._impl._util._Dom.outerHTML", "item"));
        }
        if (!markup) {
            throw Error(this._Lang.getMessage("ERR_MUST_BE_PROVIDED1", null, "myfaces._impl._util._Dom.outerHTML", "markup"));
        }

        markup = this._Lang.trim(markup);
        if (markup !== "") {
            var ret = this.getEngine().outerHTML(item, markup);

            // and remove the old item
            //first we have to save the node newly insert for easier access in our eval part
            if (this.isManualScriptEval()) {
                var isArr = ret instanceof Array;
                if (isArr && ret.length) {
                    for (var cnt = 0; cnt < ret.length; cnt++) {
                        this.runScripts(ret[cnt]);
                    }
                } else if (!isArr) {
                    this.runScripts(ret);
                }
            }
            return ret;
        }
        // and remove the old item, in case of an empty newtag and do nothing else
        this.getEngine()._removeNode(item, false);
        return null;
    },

    innerHTML: function(node, markup) {
        this.getEngine().innerHTML(node, markup);
        if (this.isManualScriptEval()) {
            this.runScripts(node);
        }
    },

    /**
     * bugfixing for ie6 which does not cope properly with setAttribute
     */
    setAttribute : function(node, attr, val) {

        if (!node) {
            throw Error(this._Lang.getMessage("ERR_MUST_BE_PROVIDED1", null, "_Dom.setAttribute", "node {DomNode}"));
        }
        if (!attr) {
            throw Error(this._Lang.getMessage("ERR_MUST_BE_PROVIDED1", null, "_Dom.setAttribute", "attr {String}"));
        }

        this.getEngine().setAttribute(node, attr, val);
    },

    getAttribute : function(node, attr) {
        return this.getEngine().getAttribute(node, attr);
    },

    hasClass: function(node, styleClass) {
        var classes = node.getAttribute("class");
        if(!classes) return false;
         classes = classes.split(/\s+/g);
        var alreadyIn = false;
        for (var cnt = classes.length - 1; cnt >= 0 && !alreadyIn; cnt--) {
            alreadyIn = alreadyIn || (classes[cnt] == styleClass)
        }
        return alreadyIn;
    },

    /**
     * add class helper which adds
     * a style class to a given node
     * @param node
     * @param styleClass
     */
    addClass: function(node, styleClass) {

        if(this.hasClass(node, styleClass)) return;
        var classes = node.getAttribute("class");

        this.getEngine().setAttribute(node, "class", classes + " " + styleClass);
    },

    /**
     * remove class helper which removes a styleclass from a given node
     *
     * @param node
     * @param styleClass
     */
    removeClass: function(node, styleClass) {
        var res = [];
        var classes = node.getAttribute("class");
        if (!classes) return;
        classes = classes.split(/\s+/g);
        for (var cnt = classes.length - 1; cnt >= 0; cnt--) {
            if (classes[cnt] != styleClass) res.push(classes[cnt]);
        }
        this.getEngine().setAttribute(node, "class", res.join(" "));
    },

    //TODO this code is html5 centric we probable have to shift it over
    //To the dom engine
    createEvent: function(event,/*optional*/ additionalData) {
        return this.getEngine().createEvent(event, additionalData);
    }


});
