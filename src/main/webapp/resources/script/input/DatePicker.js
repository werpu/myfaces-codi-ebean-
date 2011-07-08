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

                    this.rootNode.querySelectorAll("[data-mf-pickerdate]").forEach(function(elem) {
                        var date = elem.getAttribute([data-mf-pickerdate]);
                        elem.querySelector("a").toDomNode().onClick = function(evt) {
                            jsf.ajax.request(evt.target, evt, {execute: "@this", mf_dp:date} );
                        }
                    })
                },

                onkeypress: function(evt) {

                },
                onkeup: function(evt) {

                },
                onkeydown: function(evt) {

                }
            })
})();
