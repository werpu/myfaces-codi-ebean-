(function () {
    /**
     * Base date selector class
     * this encapsules the common behavior between the date selector
     * and date picker and other similar classes
     *
     * @namespace extras.apache.BaseDateSelector
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.BaseDateSelector", extras.apache.ComponentBase, {
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
            this._initEvents();
        },

        _initReferences: function(resetReferences) {
            new extras.apache._ValueHolder(this, ".dateValueHolder");
            this._longValueHolder = this._longValueHolder || this.rootNode.querySelector(".longValueHolder") || this.valueHolder;

            this._header = this._header || this.rootNode.querySelector(".header");
            this._body = this._body || this.rootNode.querySelector(".body");
            this._footer = this._footer || this.rootNode.querySelector(".footer");
            this._controls = this._controls || this.rootNode.querySelector(".controls");
        },

        _initEvents: function() {
            _t = this;
            this.rootNode.querySelectorAll("[data-mf-pickerdate]").forEach(function(elem) {
                var date = elem.getAttribute("data-mf-pickerdate");
                elem.querySelector(".selector").addEventListener("click", function(evt) {
                    return !!_t._onDateSelect_(evt, date);
                }, false);
            });
            this._controls.querySelector(".previousYear").addEventListener("click", this._LANG.hitch(this, this.onPreviousYear), false );
            this._controls.querySelector(".previousMonth").addEventListener("click", this._LANG.hitch(this, this.onPreviousMonth), false );
            this._controls.querySelector(".nextYear").addEventListener("click",this._LANG.hitch(this, this.onNextYear), false);
            this._controls.querySelector(".nextMonth").addEventListener("click", this._LANG.hitch(this, this.onNextMonth), false);
        },

        onPreviousYear: function(evt) {

        },
        onNextYear: function(evt) {

        },

        onPreviousMonth: function(evt) {

        },
        onNextMont: function(evt) {

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
