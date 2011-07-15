( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * popup which is attached to another control
     * used for inputs which have meta input information
     * like date pickers or input suggests
     *
     *
     *
     * @namespace extras.apache.InputPopup
     */
    _RT.extendClass("extras.apache.InputPopup", extras.apache.Popup, {

        constructor_:function(args) {
            this._callSuper("constructor_", args);
            this._onFocus = _Lang.hitch(this, this._onFocus);
            this._onBlur = _Lang.hitch(this, this._onBlur);
            this._onParentChange = _Lang.hitch(this, this._onParentChange);
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
        },

        _initBehavior: function() {
            //this._callSuper("_initBehavior", arguments);
            this.rootNode.addEventListener("mouseover", this._onMouseEnter, false);
            this.rootNode.addEventListener("mouseout", this._onMouseLeave, false);

            this.rootNode.addEventListener(this.CEVT_PARENT_CHANGE, this._onParentChange, false);

            this._initReferenceBehavior();
        },

        _initReferenceBehavior: function() {
            this._referencedNode.addEventListener(this.EVT_CLICK, this._onFocus, false);
            this._referencedNode.addEventListener(this.EVT_FOCUS, this._onFocus, false);
            this._referencedNode.addEventListener(this.EVT_BLUR, this._onBlur, false);
        },

        _onParentChange: function(evt) {
            this._initReferenceBehavior();
            evt.consumeEvent();
        },

        _onFocus: function(evt) {
            if(this._closeTimer) {
                clearTimeout(this._hideTimer);
                this._hideTimer = null;
            }
            this.show();
        },

        _onBlur: function(evt) {
            if(this._mouseInPopup) {
                return;
            }
            var _t = this;
            this._closeTimer = setTimeout( function() {
                _t.hide();
                _t._hideTimer = null;
            },300);
        }
    })
})();