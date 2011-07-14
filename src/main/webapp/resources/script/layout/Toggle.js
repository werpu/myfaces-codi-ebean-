(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.Toggle", extras.apache.ContentPane, {

                /**
                 * the refresh interval
                 */
                toggleOpen: true,

                /**
                 * special behavior for controls which stack
                 * the toggle
                 */
                mouseOpenable: true,
                mouseCloseable: true,

                ajaxPostback: true,

                constructor_:function(args) {
                    this._callSuper("constructor_", args);
                    this.ontoggleClick = _Lang.hitch(this, this.ontoggleClick);
                    this.unloadAware = false;
                    this.onOpen = _Lang.hitch(this, this.onOpen);
                    this.onClose = _Lang.hitch(this, this.onClose);

                    this._componentType = "at.irian.Toggle";
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.rootNode.querySelectorAll(".toggleControl").addEventListener("click", this.ontoggleClick, true);
                    this.valueHolder = this.rootNode.querySelector(".valueHolder input");
                    this.groupRootNode = this.groupRootNode || this.rootNode;


                },

                _toggle: function(evt) {
                    if (!this.toggleOpen) {
                        if(!this.mouseOpenable) return;
                        this.groupRootNode.dispatchEvent(this.CEVT_ON_TOGGLE_OPEN, {src: this});
                        this.open();
                        this.onOpen(evt);
                    } else {
                         if(!this.mouseCloseable) return;
                        this.groupRootNode.dispatchEvent(this.CEVT_ON_TOGGLE_CLOSE, {src: this});
                        this.close();
                        this.onClose(evt);
                    }
                },

                open: function() {

                    this.toggleOpen = true;
                    this.rootNode.querySelectorAll(".content").removeClass("toggleOff").removeClass("toggleOn").addClass("toggleOn");
                    this.rootNode.querySelectorAll(".toggleControl").removeClass("toggleOff").removeClass("toggleOn").addClass("toggleOn");
                    this.onOpen({});
                },

                close: function() {

                    this.toggleOpen = false;
                    this.rootNode.querySelectorAll(".content").removeClass("toggleOn").removeClass("toggleOff").addClass("toggleOff");
                    this.rootNode.querySelectorAll(".toggleControl").removeClass("toggleOn").removeClass("toggleOff").addClass("toggleOff");
                    this.onClose({});
                },


                ontoggleClick: function(evt) {
                    this._toggle(evt);
                },

                //callbacks for event handlers which can be set from outside, so that we can intercept toggle calls
                //with ajax replacements if needed
                onOpen: function(evt) {
                    this.valueHolder.setAttribute("value", "true");
                    //we ajax the value in case of a non submit page navigation
                    if(this.ajaxPostback) {
                        jsf.ajax.request(this.valueHolder.toDomNode(), null, {execute:"@this", render:"@none", myfaces:{delay: 500}});
                    }
                },

                onClose: function(evt) {
                    this.valueHolder.setAttribute("value", "false");
                    //we ajax the value in case of a non submit page navigation
                    if(this.ajaxPostback) {
                        jsf.ajax.request(this.valueHolder.toDomNode(), null, {execute:"@this", render:"@none", myfaces:{delay: 500}});
                    }
                 }
            });
})();