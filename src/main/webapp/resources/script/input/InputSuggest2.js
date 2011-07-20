(function () {

    /**
     * google like type ajaxing type ahead widget
     * it consists of an input field (valueHolder)
     * the popup holding the selection list (_selectionPopup)
     * and the list type  extras.apache.SelectionList (_selectionList)
     *
     * the behavior is as follows as soon as the person starts typing
     * the popup is shown, if datasets are present
     *
     * if the user uses down the popup receives the focus at the first entry present
     * he then can navigate up and down with the keyboard and an enter shifts
     * the selection to the input and the input receives focus
     * escape brings the focus back to the input
     *
     * a mouseclick also shifts the value back to the input closes the popup
     * and focuses the input
     *
     * if no dataset is found no popup is shown
     *
     * @namespace extras.apache.InputSuggest2
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.InputSuggest2", extras.apache.StdInput, {

        _selectionList: null,
        _selectionPopup: null,

        constructor_: function(args) {
            this._callSuper("constructor_", args);
            this._unloadAware = true;
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
        },
        _postRender: function() {
            this._initReferences();

            if (!this._initComponentListeners) {
                this.rootNode.addEventListener(this.CEVT_AFTER_POST_INIT, this._LANG.hitch(this, this.onChildPostInit));
                this.rootNode.addEventListener(this.CEVT_VALUE_HOLDER_REPLACED, this._LANG.hitch(this, this.valueHolderReplaced));
                this._initComponentListeners = true;
            }
        },
        onChildPostInit: function() {

        },

        valueHolderReplaced: function() {

        }

    });
})();