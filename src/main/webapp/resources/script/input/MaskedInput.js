(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.MaskedInput", extras.apache.StdInput, {

                /*original input mask which represents
                * the input state before the first keypress*/
                _defaultInputMask: null,
                /*literalposition index*/
                _literalPositions: null,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },
                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                },

                onkeypress: function(evt) {
                    this._callSuper("onkeyPress", evt);

                }

            })
})();