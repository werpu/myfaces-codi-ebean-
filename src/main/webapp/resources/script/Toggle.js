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
                open: true,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    this.ontoggleClick = _Lang.hitch(this, this.ontoggleClick);
                    this.unloadAware = false;
                    this.onToggleOn = _Lang.hitch(this, this.onToggleOn);
                    this.onToggleOff = _Lang.hitch(this, this.onToggleOff);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.rootNode.querySelectorAll(".toggleControl").addEventListener("click", this.ontoggleClick, true);
                    this.valueHolder = this.rootNode.querySelector(".valueHolder");

                },

                _toggle: function(evt) {
                    this.open = !this.open;

                    if (this.open) {
                        this.rootNode.querySelectorAll(".toggleArea").removeClass("toggleOff").removeClass("toggleOn").addClass("toggleOn");
                        this.rootNode.querySelectorAll(".toggleControl").removeClass("toggleOff").removeClass("toggleOn").addClass("toggleOn");

                        this.onToggleOn(evt);
                    } else {
                        this.rootNode.querySelectorAll(".toggleArea").removeClass("toggleOn").removeClass("toggleOff").addClass("toggleOff");
                        this.rootNode.querySelectorAll(".toggleControl").removeClass("toggleOn").removeClass("toggleOff").addClass("toggleOff");

                        this.onToggleOff(evt);
                    }
                },

                ontoggleClick: function(evt) {
                    this._toggle(evt);
                },

                //callbacks for event handlers which can be set from outside, so that we can intercept toggle calls
                //with ajax replacements if needed
                onToggleOn: function(evt) {
                    this.valueHolder.setAttribute("value","true");
                },

                onToggleOff: function(evt) {
                    this.valueHolder.setAttribute("value","false");
                }


            });

})();