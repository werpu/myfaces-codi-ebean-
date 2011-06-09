( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Window", extras.apache.ComponentBase, {


                moveable: false,
                resizable: false,

                _header: null,
                _footer: null,
                _content: null,

                _closer: null,
                _minimizer: null,
                _maximizer: null,
                _title: null,

                /*delta origins for mouse movements*/
                _mouseOriginX: -1,
                _mouseOriginY: -1,

                _windowOriginX: -1,
                _windowOriginY: -1,

                constructor_: function(args) {
                    this._callSuper("constructor", args);
                    this.mouseDown = _Lang.hitch(this, this.mouseDown);
                    this.mouseUp = _Lang.hitch(this, this.mouseUp);
                    this.mouseMove = _Lang.hitch(this, this.mouseMove);

                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._header = this.rootNode.querySelector("header");
                    this._footer = this.rootNode.querySelector("footer");
                    this._content = this.rootNode.querySelector(".content");

                    this._closer = this._header.querySelector(".close");
                    this._minimizer = this._header.querySelector(".minimize");
                    this._maximizer = this._header.querySelector(".maximize");
                    this._title = this._header.querySelector(".windowTitle");


                    if (this.moveable) {
                        this._header.addEventListener("mousedown", this.mouseDown, true);
                    }
                },

                fadeIn: function() {
                    this.rootNode.querySelectorAll(".fadeIn").delay(0).setStyle("opacity", "1");
                },

                fadeInFullForce: function() {
                    this.rootNode.querySelectorAll(".fadeIn")
                            .setTransitionDuration("0s")
                            .setStyle("opacity", "1")
                            .delay(10)
                            .setTransitionDuration("");
                },

                mouseDown: function(evt) {
                    window.addEventListener("mouseup", this.mouseUp, true);
                    window.addEventListener("mousemove", this.mouseMove, true);

                    this._windowOriginX = parseInt(this.rootNode.offsetLeft());
                    this._windowOriginY = parseInt(this.rootNode.offsetTop());

                    this._mouseOriginX = evt.pageX;
                    this._mouseOriginY = evt.pageY;

                    this._origDeltaX = this._mouseOriginX - this._windowOriginX;
                    this._origDeltaY = this._mouseOriginY - this._windowOriginY;
                },

                mouseMove: function(evt) {
                    var posX = evt.pageX;
                    var posY = evt.pageY;

                    this.rootNode.setStyle("left", (posX-this._origDeltaX)+"px");
                    this.rootNode.setStyle("top", (posY-this._origDeltaY)+"px");

                },

                mouseUp: function(evt) {
                    window.removeEventListener("mouseup", this.mouseUp, true);
                    window.removeEventListener("mousemove", this.mouseMove, true);
                }
            });

})();