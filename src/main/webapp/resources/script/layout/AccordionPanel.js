/**
 * The accordion panel is a group of toggles
 * interconnected by
 */
(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.Toggle", extras.apache.ComponentBase, {
                toggles: null,
                multiOpen: false,
                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    /**
                     * the idea is that the event is only dispatched locally
                     * so we simply can close subtoggle panels
                     * and then let the toggle control itself do the rest
                     */
                    this.rootNode.addEventListener("ezw_onToggleOpen", _Lang.hitch(this, this._onToggle));
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);

                    this._resetOpenState();
                },

                _resetOpenState: function() {
                    if (this.multiOpen) return;
                    if (!this.toggles) return;
                    /**/
                    var openFound = false;
                    /*if we have multiple toggles open */
                    _Lang.forEach(this.toggles, _Lang.hitch(this, function(toggle) {
                        if (toggle.toggleOpen && !openFound) {
                            openFound = true;
                        } else {
                            toggle.close();
                        }
                    }));
                },

                _onToggle: function(evt) {
                    if (this.multiOpen) return;
                    _Lang.forEach(this.toggles, _Lang.hitch(this, function(toggle) {
                        toggle.close();
                    }));
                }

            })
})();
