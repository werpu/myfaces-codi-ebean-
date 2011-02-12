( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.SelectionList", extras.apache.ComponentBase, {
        _selectedLine: 0,
        _target: null,
        _valueHolder: null,
        _selectorIdentifier: "table tr",
        _numberOfDatasets: 0,

        _selectionSelected: "selected",
        _selectionHover: "hover",

        _placeHolderAppendix: "_placeHolder",
        _valueHolderAppendix: "_valueHolder",

        _onKeyDownHandler: null,

        _tabIndex: 1,

        /**
         * constants, since we only deal with html5+ we do not
         * cover the entire huge quirksmode.org section
         * but concentrate ourselves on the raw codes
         * only supported by newer browsers
         */
        KEY_ARROW_UP: 38,
        KEY_ARROW_DOWN: 40,
        KEY_TAB: 9,
        KEY_ESCAPE: 27,

        constructor_: function(argsMap) {
            this._callSuper("constructor", argsMap);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this._rootNode.tabIndex = this._tabIndex;

            this._target = this._rootNode.querySelectorAll("#" + this._id + this._placeHolderAppendix)[0];
            this._valueHolder = this._rootNode.querySelectorAll("#" + this._id + this._valueHolderAppendix)[0];

            this._rootNode.addEventListener("focus", _Lang.hitch(this, this.onfocus), true);
            this._rootNode.addEventListener("blur",  _Lang.hitch(this, this.onblur), true);

            //TODO add hover and click behavior to the list
            //TODO find out how to suppress the document scroll


            this._refresh();
        },

        _refresh: function() {
            var lines = this._rootNode.querySelectorAll(this._selectorIdentifier);
            this._numberOfDatasets = lines.length;

            for (var cnt = lines.length - 1; cnt >= 0; cnt --) {
                (cnt != this._selectedLine) ? this.removeClass(lines[cnt], this._selectionSelected) :
                        this.addClass(lines[cnt], this._selectionSelected);
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

        onfocus: function(evt) {
            this._onKeyDownHandler = this._onKeyDownHandler || _Lang.hitch(this, this.onkeydown);
            this._rootNode.addEventListener("keydown", this._onKeyDownHandler, true);
        },
        onblur: function(evt) {
            this._rootNode.removeEventListener("keydown", this._onKeyDownHandler, true);
        },


        onkeydown: function(evt) {
            this._focused = false;
            var target = evt.target;
            var keyCode = evt.keyCode;
            switch (keyCode) {
                case this.KEY_ARROW_UP:
                    this.keyUp();
                    evt.stopPropagation();
                    return false;
                case this.KEY_ARROW_DOWN:
                    this.keyDown();
                    evt.stopPropagation();
                    return false;
                case this.KEY_ESCAPE:
                    this.onblur();
                    return false;
                default: return true;
            }
        }
    });
})();