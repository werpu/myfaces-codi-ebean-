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

        _header: null,
        _footer: null,
        _body: null,
        _controls: null,

        valueHolder: null,
        /*special value holder which holds the long value*/
        _longValueHolder: null,
        constructor_:function(args) {
            this._callSuper("constructor", args);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            new extras.apache._KeyboardAware(this);
            this._initReferences();
            _t = this;
            this.rootNode.querySelectorAll("[data-mf-pickerdate]").forEach(function(elem) {
                var date = elem.getAttribute("data-mf-pickerdate");
                elem.querySelector(".selector").toDomNode().onclick = function(evt) {
                    return !!_t._onDateSelect_(evt, date);
                }
            })
        },

        _initReferences: function(resetReferences) {
            new extras.apache._ValueHolder(this, ".dateValueHolder");
            this._longValueHolder = this._longValueHolder || this.rootNode.querySelector(".longValueHolder") || this.valueHolder;

            this._header = this._header || this.rootNode.querySelector(".header");
            this._body = this._body || this.rootNode.querySelector(".body");
            this._footer = this._footer || this.rootNode.querySelector(".footer");
            this._controls = this._controls || this.rootNode.querySelector(".controls");
        },


        _onDateSelect_: function(evt, date) {
            //alert("date select");
            //in case of multiple requests it does not matter we simply go for the last date
            jsf.ajax.request(evt.target,
                    evt,
                    {
                        execute: evt.target.id,
                        render:[this.valueHolder.id,
                                this._header.getId(),
                                this._footer.getId(),
                                this._body.getId()].join(" "),
                        "mf_dp": date,
                        onevent:this._LANG.hitch(this, function(evt) {
                                this._onEvent(evt, date);
                        })
                    });
            return false;
        },

        _onEvent: function(evt, date) {
            if (evt.status == "success") {
                this.onDateSelect(date);
            }
        },

        onDateSelect: function(date) {

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
