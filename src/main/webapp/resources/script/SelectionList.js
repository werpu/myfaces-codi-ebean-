var _RT = myfaces._impl.core._Runtime;
_RT.extendClass("extras.apache.SelectionList", extras.apache.ComponentBase, {
    _selectedLine: -1,
    _target: null,
    _selectorIdentifier: "table tr",
    _numberOfDatasets: 0,

    /**
     * constants, since we only deal with html5+ we do not
     * cover the entire huge quirksmode.org section
     * but concentrate ourselves on the raw codes
     * only supported by newer browsers
     */
    KEY_ARROW_UP: 38,
    KEY_ARROW_DOWN: 40,


    constructor_: function() {
        this.callSuper("constructor", arguments);
    },

    _postInit: function() {
        this._target = this._rootNode.querySelectorAll("#" + this._id + "_placeholder")[0];
        this._target.addEventListener("onkeydown", _RT.hitch(this, this.onkeydown, false));
        this._refresh();
    },

    _refresh: function() {
        var lines = this._rootNode.querySelectorAll(this._selectorIdentifier);
        this._numberOfDatasets = lines.length;
        var _DOM = extras.apache.HTML5Dom;
        for (var cnt = lines.length - 1; cnt >= 0; cnt --) {
            (cnt == this._selectedLine) ? _DOM.removeClass(lines[cnt], "selected") :
                    _DOM.addClass(lines[cnt], "selected");
        }
    },

    reset: function() {
        this._selectedLine = -1;
        this._numberOfDatasets = 0;
        this._refresh();
    },

    keyUp: function() {
        this._selectedLine = Math.max(0, this._selectedLine - 1);
        this._refresh();
    },

    keyDown: function() {
        this._selectedLine = Math.min(this._numberOfDatasets, this._selectedLine + 1);
        this._refresh();
    },

    onkeydown: function(evt) {
        var target = evt.target;
        var keyCode = evt.keyCode;
        switch (keyCode) {
            case this.KEY_ARROW_UP:
                this.keyUp();
                return;
            case this.KEY_ARROW_DOWN:
                this.keyDown();
                return;

            default:;
        }
    }
});
