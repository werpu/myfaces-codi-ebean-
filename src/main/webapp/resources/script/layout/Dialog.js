

( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Dialog", extras.apache.ComponentBase, {

                _moveable: false,
                _resizable: false,

                _dialogHeader: null,
                _dialog: null,
                _dialogCloser: null,

                /*delta origins for mouse movements*/
                _mouseOriginX: -1,
                _mouseOriginY: -1,

                _windowOriginX: -1,
                _windowOriginY: -1,

                constructor_: function() {
                    this._callSuper("constructor", arguments);
                    this._mouseDownMove = _RT.hitch(this, this._mouseDownMove);
                    this._mouseUpMove = _RT.hitch(this, this._mouseUpMove);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._dialog = this.rootNode.querySelectorAll(".dialog");
                    this._dialogHeader = this.rootNode.querySelector(".dialogHeader");
                    this._dialogCloser = this.rootNode.querySelector(".dialogCloser");

                    this._dialog.setStyle("display", "block");
                    if(this._moveable) {
                        this._dialogHeader.addEventListener("mouseDown",this._mouseDownMove, true);
                        this._dialogHeader.addEventListener("mouseUp",this._mouseUpMove, true);
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

                _mouseDownMove: function(evt) {

                },

                _mouseMoveMove: function(evt) {

                },

                _mouseUpMove: function(evt) {

                }
            });
    //legacy methods to fix the existing code
    function dialog() {
        this.NODE.querySelectorAll(".dialog").setStyle("display", "block");
    }

    function fadeIn() {
        this.NODE.querySelectorAll(".fadeIn").delay(0).setStyle("opacity", "1");
    }

    function fadeInFullForce() {
        this.NODE.querySelectorAll(".fadeIn")
                .setTransitionDuration("0s")
                .setStyle("opacity", "1")
                .delay(10)
                .setTransitionDuration("");
    }
})();