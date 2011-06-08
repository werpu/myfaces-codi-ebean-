

( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Dialog", extras.apache.ComponentBase, {

                moveable: false,
                resizable: false,

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
                    this.mouseDown = _RT.hitch(this, this.mouseDown);
                    this.mouseUp = _RT.hitch(this, this.mouseUp);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._dialog = this.rootNode.querySelectorAll(".dialog");
                    this._dialogHeader = this.rootNode.querySelector(".dialogHeader");
                    this._dialogCloser = this.rootNode.querySelector(".dialogCloser");

                    this._dialog.setStyle("display", "block");
                    if(this.moveable) {
                        this._dialogHeader.addEventListener("mouseDown",this.mouseDown, true);
                        this._dialogHeader.addEventListener("mouseUp",this.mouseUp, true);
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

                },

                mouseMove: function(evt) {

                },

                mouseUp: function(evt) {

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