(function () {
    /**
     * Mouse aware behavior handler which automatically
     * registers all given html5 mouse events
     *
     * @namespace extras.apache._Movable
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._Movable", extras.apache._Behavior, {

                constructor_: function(scope, moveHandler, eventOverrides) {
                    this._callSuper("constructor_", scope, moveHandler, eventOverrides);
                },

                defineBehavior: function() {
                    var event = "mousedown";
                    var _LANG = myfaces._impl._util._Lang;
                    this._mouseDownMove = this._mouseDownMove || _LANG.hitch(this, function(evt) {
                        if (!this._moveable) return;

                        window.addEventListener("mouseup", this._mouseUpMove, true);
                        window.addEventListener("mousemove", this._mouseMoveMove, true);

                        this._windowOriginX = parseInt(this.rootNode.offsetLeft());
                        this._windowOriginY = parseInt(this.rootNode.offsetTop());

                        this._mouseOriginX = evt.pageX - window.scrollX;
                        this._mouseOriginY = evt.pageY - window.scrollY;

                        this._origDeltaX = this._mouseOriginX - this._windowOriginX;
                        this._origDeltaY = this._mouseOriginY - this._windowOriginY;
                    });

                    this._mouseUpMove = this._mouseUpMove || _LANG.hitch(this, function(evt) {
                        window.removeEventListener("mouseup", this._mouseUpMove, true);
                        window.removeEventListener("mousemove", this._mouseMoveMove, true);
                    });

                    this._mouseMoveMove = this._mouseMoveMove || _LANG.hitch(this, function(evt) {
                        var posX = evt.pageX - window.scrollX;
                        var posY = evt.pageY - window.scrollY;

                        this.rootNode.style({"left": (posX - this._origDeltaX) + "px",
                                    "top": (posY - this._origDeltaY) + "px"});
                    });

                    this._tmpEventTarget.addEventListener("mousedown", this._mouseDownMove, false);

                }
            })
})();