(function () {
    /**
     * Mouse aware behavior handler which automatically
     * registers all given html5 mouse events
     *
     * @namespace extras.apache._Resizable
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._Resizable", extras.apache._Behavior, {
                constructor_: function(scope, resizeHandler, eventOverrides) {
                    this._callSuper("constructor_", scope, resizeHandler, eventOverrides);
                },

                defineBehavior: function() {
                    var event = "mousedown";
                    var _LANG = myfaces._impl._util._Lang;

                    this._mouseDownResize = this._mouseDownResize || _LANG.hitch(this, function(evt) {
                        window.addEventListener("mouseup", this._mouseUpResize, true);
                        window.addEventListener("mousemove", this._mouseMoveResize, true);

                        this._NODE.querySelectorAll(".window").removeClass("focus");
                        this.rootNode.addClass("focus");

                        this._windowOriginX = parseInt(this.rootNode.offsetLeft);
                        this._windowOriginY = parseInt(this.rootNode.offsetTop);

                        this._mouseOriginX = evt.pageX;
                        this._mouseOriginY = evt.pageY;

                        this._origDeltaX = this._mouseOriginX - this._windowOriginX;
                        this._origDeltaY = this._mouseOriginY - this._windowOriginY;
                    });

                    this._mouseMoveResize = this._mouseMoveResize || _LANG.hitch(this, function(evt) {

                        var posX = evt.pageX - parseInt(window.scrollX);
                        var posY = evt.pageY - parseInt(window.scrollY);

                        this.rootNode.style({"width": (posX - this._windowOriginX) + "px",
                                    "height": (posY - this._windowOriginY) + "px"});

                        this.pack();

                    });

                    this._mouseUpResize = this._mouseUpResize || _LANG.hitch(this, function(evt) {
                        window.removeEventListener("mouseup", this._mouseUpResize, true);
                        window.removeEventListener("mousemove", this._mouseMoveResize, true);
                    });
                    this._tmpEventTarget.addEventListener("mousedown", this._mouseDownResize, false);


                }
            })
})();