(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.StdInput", extras.apache.ComponentBase, {
                valueHolder: null,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.valueHolder = this.rootNode.querySelector(".valueHolder");
                    this._renderToggle(!!this.valueHolder.toDomNode().checked);
                },

                _onMouseDown: function(evt) {
                    this._renderToggle(!this.valueHolder.toDomNode().checked);
                },
                _renderToggle: function(toggle) {
                  if (toggle) {
                        this._imageCommand.addClass("clicked");
                        this.valueHolder.toDomNode().checked = true;
                    } else {
                        this._imageCommand.removeClass("clicked");
                        this.valueHolder.toDomNode().checked = false;
                    }
                },

                _onMouseUp: function(evt) {
                },

                _onKeyDown: function(evt) {

                    var keyCode = evt.keyCode;
                    if (evt.keyCode == this.KEY_ENTER || evt.keyCode == this.KEY_SPACE) {
                        this._onMouseDown(evt);
                    }
                }
            });
})();
