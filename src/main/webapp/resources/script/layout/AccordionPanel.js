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

    _RT.extendClass("extras.apache.AccordionPanel", extras.apache.ComponentBase, {
                _LANG: myfaces._impl._util._Lang,
                _RT: myfaces._impl.core._Runtime,
                toggles: null,
                multiOpen: false,
                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);

                    if (!this.toggles) {
                        var _Lang = this._LANG;
                        /*we have to prepare our toggles
                         * and pass them as references to our toggle classes down*/
                        var toggles = this.rootNode.querySelectorAll(".accordionContent > [data-ezw_componentType = 'at.irian.Toggle']").getAttribute("data-ezw_javascriptVar");
                        this.toggles = [];
                        _Lang.arrForEach(toggles, _Lang.hitch(this, function(toggle) {
                            if (window[toggle]) {
                                toggle = window[toggle];
                                this.toggles.push(toggle);
                                toggle.groupRootNode = this.rootNode;
                            }
                        }));
                    }
                    this._resetOpenState();
                    /**
                     * the idea is that the event is only dispatched locally
                     * so we simply can close subtoggle panels
                     * and then let the toggle control itself do the rest
                     */
                    this.rootNode.addEventListener("ezw_onToggleOpen", this._LANG.hitch(this, this._onToggle), false);
                    //document.documentElement.addEventListener("ezw_onToggleOpen", function() {alert("toggle");}, false);
                    //this.rootNode.addEventListener("ezw_onToggleClose", this._LANG.hitch(this, this._onToggle));

                },

                _resetOpenState: function() {
                    if (this.multiOpen) return;
                    if (!this.toggles) return;
                    /**/
                    var openFound = false;
                    /*if we have multiple toggles open */
                    this._LANG.arrForEach(this.toggles, this._LANG.hitch(this, function(toggle) {
                        if (toggle.toggleOpen && !openFound) {
                            openFound = true;
                        } else {
                            toggle.close();
                        }
                    }));
                },

                _onToggle: function(evt) {
                    if (this.multiOpen) return;
                    this._LANG.arrForEach(this.toggles, this._LANG.hitch(this, function(toggle) {
                        toggle.close();
                    }));
                }

            })
})();
