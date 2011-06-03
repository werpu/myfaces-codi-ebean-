(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.ToggleButton", extras.apache.ImageButtonLight, {
                valueHolder: null,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.valueHolder = this.rootNode.querySelector(".valueHolder");
                },

                //todo toggle via the checked state on the value holder
                _onMouseDown: function(evt) {
                    var toggle = !this.valueHolder.getAttribute("clicked");
                    if (toggle) {
                        this._imageCommand.addClass("clicked");
                        this.valueHolder.toDomNode().setAttribute("clicked", "");
                    } else {
                        this._imageCommand.removeClass("clicked");
                        this.valueHolder.toDomNode().removeAttribute("clicked");
                    }
                    //window.addEventListener("mouseup", this._onMouseUp, false);
                    //this._imageCommand.addEventListener("onmouseout", this._onMouseUp, false);
                },


                _onMouseUp: function(evt) {
                    //this._imageCommand.removeClass("clicked");
                    //window.removeEventListener("mouseup", this._onMouseUp, false);
                    //this._imageCommand.removeEventListener("onmouseout", this._onMouseUp, false);

                },

                _onKeyDown: function(evt) {

                    var keyCode = evt.keyCode;
                    if (evt.keyCode == this.KEY_ENTER || evt.keyCode == this.KEY_SPACE) {
                        this._onMouseDown(evt);
                    }
                },

                _onKeyUp: function(evt) {
                    var keyCode = evt.keyCode;
                    if (evt.keyCode == this.KEY_ENTER || evt.keyCode == this.KEY_SPACE) {
                        this._onMouseUp(evt);

                    }
                }
            });
})();
