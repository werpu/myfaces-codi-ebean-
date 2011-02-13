( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * a variable selection list
     * which can be any type of list (table, ul, list of
     * subsequent div combinations)
     *
     * this class adds the needed callback listeners
     * and mouse and keyboard event handlers to enable
     * it
     */

    _RT.extendClass("extras.apache.SelectionList", extras.apache.ComponentBase, {
        /**
         * currently selected line
         */
        selectedLine: 0,
        /**
         * placeholder for the ajax enabled replacement area
         * aka list holder
         */
        placeHolder: null,
        /**
         * value holder input hidden for the final receiving holder
         */
        valueHolder: null,

        /**
         * the selector identifier which can identify single lines
         */
        selectorIdentifier: "table tr",

        /**
         * style class for the selected line
         */
        selectionSelected:  "selected",

        /**
         * the identifier appendix for the placeHolder
         */
        placeHolderAppendix: "_placeHolder",

        /**
         * the idenitifer applendix for the value holder
         */
        valueHolderAppendix: "_valueHolder",

        /**
         * tabindex for the outer component
         */
        tabIndex: 1,

        _onKeyDownHandler:  null,
        _numberOfItems:     0,



        constructor_: function(argsMap) {
            this._callSuper("constructor", argsMap);
        },

        /**
         * resets the selector to its original state
         */
        reset: function() {
            this.selectedLine = -1;
            this._numberOfItems = 0;
            this._refresh();
        },

        /**
         * keyUp action
         */
        keyUp: function() {
            this.selectedLine = Math.max(0, this.selectedLine - 1);
            this._refresh();
        },

        /**
         * keyDown action
         */
        keyDown: function() {

            this.selectedLine = Math.min(this._numberOfItems - 1, this.selectedLine + 1);
            this._refresh();
        },

        /**
         * callback for the onfocus event
         * @param evt
         */
        onfocus: function(evt) {
            this._onKeyDownHandler = this._onKeyDownHandler || _Lang.hitch(this, this.onkeydown);
            this.rootNode.addEventListener(this.EVT_KEY_DOWN, this._onKeyDownHandler, true);
        },
        /**
         * callback for the onblur event
         * @param evt
         */
        onblur: function(evt) {
            this.rootNode.removeEventListener(this.EVT_KEY_DOWN, this._onKeyDownHandler, true);
        },

        /**
         * callback for the onclick event
         * @param evt
         */
        onclick: function(evt) {
            var target = evt.target;

            //find out which element in the row of elements was clicked
            this._iterateElements(_Lang.hitch(this, function(elem, pos) {
                if (elem == evt.target) {
                    this.selectedLine = pos;
                    return false;
                }
            }));
            this._refresh();
            this.onSelectionChange(evt);
        },

        /**
         * onKeyDown which triggers
         * on up down and escape
         * tab is handled by the onblur event
         *
         * @param evt
         */
        onkeydown: function(evt) {
            this._focused = false;

            var target = evt.target;
            var keyCode = evt.keyCode;
            var oldScroll = window.scrollY;
            try {
                switch (keyCode) {
                    case this.KEY_ARROW_UP:

                        this.keyUp();

                        evt.stopPropagation();
                        var selectionChangeEvent = {};
                        selectionChangeEvent.target = this.rootNode.querySelectorAll(this.selectorIdentifier)[this.selectedLine];
                        this.onSelectionChange(selectionChangeEvent);
                        return false;
                    case this.KEY_ARROW_DOWN:

                        this.keyDown();
                        evt.stopPropagation();
                        var selectionChangeEvent = {};
                        selectionChangeEvent.target = this.rootNode.querySelectorAll(this.selectorIdentifier)[this.selectedLine];
                        this.onSelectionChange(selectionChangeEvent);

                        return false;

                    case this.KEY_ESCAPE:
                        this.onblur();
                        return false;

                    default: return true;
                }
            } finally {
                window.scrollY = oldScroll;
            }

        },

        /**
         * callback for a selection change on the control
         *
         * @param evt a javascript event object with target
         * being set to the currently selected item
         */
        onSelectionChange: function(evt) {

        },

        /**
         * postInit called after onLoad
         */
        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.rootNode.tabIndex = this.tabIndex;

            this.placeHolder = this.rootNode.querySelectorAll("#" + this.id + this.placeHolderAppendix)[0];
            this.valueHolder = this.rootNode.querySelectorAll("#" + this.id + this.valueHolderAppendix)[0];

            this.rootNode.addEventListener(this.EVT_FOCUS, _Lang.hitch(this, this.onfocus), true);
            this.rootNode.addEventListener(this.EVT_BLUR, _Lang.hitch(this, this.onblur), true);

            this._iterateElements(_Lang.hitch(this, _Lang.hitch(this, function(elem, cnt) {
                elem.addEventListener(this.EVT_CLICK, _Lang.hitch(this, this.onclick), false);
            })));

            this._refresh();
        },

        /**
         * element iterator
         *
         * @param closure
         */
        _iterateElements: function(/*function(elem, position){}*/closure) {
            var lines = this.rootNode.querySelectorAll(this.selectorIdentifier);
            this._numberOfItems = lines.length;

            for (var cnt = lines.length - 1; cnt >= 0; cnt --) {
                var ret = closure(lines[cnt], cnt);
                if ('undefined' != typeof ret && ret === false) break;
            }
        },

        _refresh: function() {
            this._iterateElements(_Lang.hitch(this, function(elem, cnt) {
                (cnt != this.selectedLine) ? this.removeClass(elem, this.selectionSelected) :
                        this.addClass(elem, this.selectionSelected);

            }));
        }

    });
})();