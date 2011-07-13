( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * popup which is attached to another control
     * used for inputs which have meta input information
     * like date pickers or input suggests
     *
     * @namespace extras.apache.InputPopup
     */
    _RT.extendClass("extras.apache.InputPopup", extras.apache.Popup, {

        constructor_:function(args) {
            this._callSuper("constructor_", args);
            this._onFocus = _Lang.hitch(this, this._onFocus);
            this._onBlur = _Lang.hitch(this, this._onBlur);
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
        },

        _initBehavior: function() {
            //this._callSuper("_initBehavior", arguments);
            this._referencedNode.addEventListener("focus", this._onFocus, false);
            this._referencedNode.addEventListener("blur", this._onBlur, false);
            this.rootNode.addEventListener("mouseover", this._onMouseEnter, false);
            this.rootNode.addEventListener("mouseout", this._onMouseLeave, false);
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