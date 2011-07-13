(function() {
    /**
     * inputDate input control, which combines a standard input
     * with a date picker which pops up on focus and is removed
     * on blur
     *
     * @namespace extras.apache.StdInput
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.InputDate", extras.apache.StdInput, {
        _datePicker: null,
        _datePopup:null,


        constructor_:function(args) {
            this._callSuper("constructor_", args);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            //TODO add movable behavior here trigger it on the title as move handler
            //so that we can move it around

            this._datePopup = this._datePopup || this.rootNode.querySelector(".inputPopup");
            this._datePicker = this._datePicker || this._datePopup.querySelector(".datePanel");
            //the date picker and this component share the same value holder
            this._datePicker.valueHolder = this.valueHolder;
            this._datePopup.jsVar().referencedNode = this.valueHolder;
        }

    });
})();