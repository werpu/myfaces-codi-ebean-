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

        }
    })();
})();