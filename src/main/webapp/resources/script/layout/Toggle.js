(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.Toggle", extras.apache.ComponentBase, {

                /**
                 * the refresh interval
                 */
                toggleOpen: true,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    this.ontoggleClick = _Lang.hitch(this, this.ontoggleClick);
                    this.unloadAware = false;
                    this.onOpen = _Lang.hitch(this, this.onOpen);
                    this.onClose = _Lang.hitch(this, this.onClose);
                    this.groupRootNode = this.groupRootNode || this.rootNode;
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.rootNode.querySelectorAll(".toggleControl").addEventListener("click", this.ontoggleClick, true);
                    this.valueHolder = this.rootNode.querySelector(".valueHolder input");

                },

                _toggle: function(evt) {
                    if (!this.toggleOpen) {
                        this.groupRootNode.dispatchEvent("ezw_onToggleOpen", {src: this});
                        this.open();
                        this.onOpen(evt);
                    } else {
                        this.groupRootNode.dispatchEvent("ezw_onToggleClose", {src: this});
                        this.close();
                        this.onClose(evt);
                    }
                },

                open: function() {
                    this.toggleOpen = true;
                    this.rootNode.querySelectorAll(".toggleContent").removeClass("toggleOff").removeClass("toggleOn").addClass("toggleOn");
                    this.rootNode.querySelectorAll(".toggleControl").removeClass("toggleOff").removeClass("toggleOn").addClass("toggleOn");
                    this.onOpen({});
                },

                close: function() {
                    this.toggleOpen = false;
                    this.rootNode.querySelectorAll(".toggleContent").removeClass("toggleOn").removeClass("toggleOff").addClass("toggleOff");
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
                },

                onClose: function(evt) {
                    this.valueHolder.setAttribute("value", "false");
                }
            });
})();