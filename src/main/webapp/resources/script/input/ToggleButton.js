(function () {
    /**
     * generalized toggle button control
     * which displays a toggle one way or the other
     *
     * @namespace extras.apache.ToggleButton
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.ToggleButton", extras.apache.ImageButtonLight, {
        valueHolder: null,

        constructor_:function(args) {
            this._callSuper("constructor", args);
            this._initProperties();
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.valueHolder = this.rootNode.querySelector(".valueHolder");
            this._renderToggle(!!this.valueHolder.toDomNode().checked);
        },

        /**
         * in _initProperties we use the standard
         * javascript mechanisms for setters and getters
         */
        _initProperties: function() {
            try {
                /*checked property setter and getter*/
                this._defineProperty("checked", function() {
                    return this.valueHolder.toDomNode().checked;
                }, function(val) {
                    this.valueHolder.toDomNode().checked = !!val;
                });

                /*value property setter and getter*/
                this._defineProperty("value", function() {
                    return this.valueHolder.toDomNode().value;
                }, function(val) {
                    this.valueHolder.toDomNode().value = val;
                });
            } catch(e) {

            }
        },

        _onmousedown: function(evt) {
            this._renderToggle(!this.valueHolder.toDomNode().checked);
        },

        _renderToggle: function(toggle) {
            if (toggle) {
                this._imageCommand.addClass("clicked");
                this.checked = true;
            } else {
                this._imageCommand.removeClass("clicked");
                this.checked = false;
            }
        },

        _onMouseUp_: function(evt) {
        },

        _onkeydown: function(evt) {

            var keyCode = evt.keyCode;
            if (evt.keyCode == this.KEY_ENTER || evt.keyCode == this.KEY_SPACE) {
                this._onmousedown(evt);
            }
        },

        _onkeyup: function(evt) {

        }
    });
})();
