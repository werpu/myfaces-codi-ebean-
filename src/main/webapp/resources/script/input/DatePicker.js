(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * @namespace extras.apache.StdInput
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.DatePicker", extras.apache.ComponentBase, {
        _LANG: myfaces._impl._util._Lang,


        valueHolder: null,

        constructor_:function(args) {
            this._callSuper("constructor", args);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            new extras.apache._KeyboardAware(this);
            new extras.apache._ValueHolder(this,".dateValueHolder");

            _t = this;
            this.rootNode.querySelectorAll("[data-mf-pickerdate]").forEach(function(elem) {
                var date = elem.getAttribute("data-mf-pickerdate");
                elem.querySelector(".selector").toDomNode().onclick = function(evt) {
                    return _t._onDateSelect_(date) || _t.onDateSelect(date) || false;
                }
            })
        },

        _onDateSelect_: function(date) {
            alert("date select");
            this.valueHolder.value = date;
            return false;
        },

        onDateSelect: function(date) {
            alert(date);
            return false
        },

        onkeypress: function(evt) {

        },
        onkeup: function(evt) {

        },
        onkeydown: function(evt) {

        }
    })
})();
