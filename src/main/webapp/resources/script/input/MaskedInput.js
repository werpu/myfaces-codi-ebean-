(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.MaskedInput", extras.apache.StdInput, {
                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },
                onkeyPress: function(evt) {
                    this._callSuper("onkeyPress", evt);
                }

            })
})();