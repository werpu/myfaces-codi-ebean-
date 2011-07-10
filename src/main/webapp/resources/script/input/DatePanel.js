(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * @namespace extras.apache.StdInput
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.DatePanel", extras.apache.BaseDateSelector, {
        constructor_:function(args) {
            this._callSuper("constructor", args);
        }
    })
})();
