(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.Pull", extras.apache.ComponentBase, {

                /**
                 * the refresh interval
                 */
                open: false,

                /**
                 * the target appendix which in summary is the same
                 * which is used if no refreshTargetId is given
                 * the final id is refreshTargetId or
                 * id + ":"+ appendix
                 */
                toggleId: null,

                /**
                 * the refresh target id override
                 */
                toggleAreaId: null,

                valueHolderAppendix: "_valueHolder",
                valueHolderId: null,


                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    this.ontoggleClick = _Lang.hitch(this, this.ontoggleClick);
                },

                postInit_: function() {
                    this._callSuper("postInit_", args);
                    this.rootNode.querySelector("#" + this.toggleId).addEventListener("onclick", this.ontoggleClick, true);
                },

                ontoggleClick: function(evt) {
                    this.open = this.open;
                    if (this.open) {
                        this.rootNode.querySelector("#" + this.toggleAreaId).removeClass("toggleOff").addClass("toggleOn");
                    } else {
                        this.rootNode.querySelector("#" + this.toggleAreaId).removeClass("toggleOn").addClass("toggleOff");
                    }
                    //todo notify the server as well
                }

            });

})();