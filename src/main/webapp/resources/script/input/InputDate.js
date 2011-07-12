(function() {
    /**
     * inputDate input control, which combines a standard input
     * with a date picker which pops up on focus and is removed
     * on blur
     *
     * @namespace extras.apache.StdInput
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.InputDate", extras.apache.extras.apache.StdInput, {
        _datePicker: null,
        _datePopup:null,

        constructor_:function() {
            this._callSuper("constructor_", arguments);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            new extras.apache._ValueHolder(this, ".inputTextValueHolder");

            this._datePopup = this._datePopup || this._rootNode.querySelector(".inputPopup");
            this._datePicker = this._datePicker || this._datePopup.querySelector(".datePanel");
            //the date picker and this component share the same value holder
            this._datePicker.valueHolder = this.valueHolder;
        }


    })();
})();