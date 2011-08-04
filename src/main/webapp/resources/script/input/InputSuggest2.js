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
            this._listReplaced = _Lang.hitch(this, this._listReplaced);
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
            //we register the component Listeners
            //because we want to know if the ajax cycled causes
            //one of the children to reinitialize

        },
        _postRender: function() {
            this._initReferences();
            //this works because we have the correct calling order with our parent being the last
            if (!this._initComponentListeners) {
                this.rootNode.addEventListener(this.CEVT_AFTER_POST_INIT, this._LANG.hitch(this, this.onChildPostInit));
                this.rootNode.addEventListener(this.CEVT_CHILD_VALUE_CHANGED, this._LANG.hitch(this, this.childValueChanged));
                this._initComponentListeners = true;
            }
        },

        _initReferences: function() {
            this._selectionPopup = this.rootNode.querySelector(".inputPopup");
            this._selectionList = this._selectionPopup.querySelector(".selectionList");

            this._selectionPopup.javascriptVar.referencedNode = this.valueHolder;
            this._selectionList.javascriptVar.valueHolder = this.valueHolder
        },
        /*once the child post render is done we can read our references*/
        onChildPostInit: function() {
            this._initReferences();
        },

        /**
         * the selection child has changed its selected value
         * @param evt
         */
        childValueChanged: function(evt) {
            if(evt.src.id !== this._selectionList.id) return;
            //this._selectionPopup.hide();
            //this.valueHolder.value =
        },

        /**
         * on key up should trigger a refresh of the preview
         * @param evt
         */
        onkeypress: function(evt) {
            this._callSuper("onkeypress", evt);

            if(evt.keyCode == this.KEY_ARROW_DOWN) {
                //down pressed menu has to pop open and the first item is selected
                this._selectionPopup.javascriptVar.show();
                this._selectionList.javascriptVar.onfocus();
                this._selectionList.javascriptVar.onkeydown(evt);
                return;
            }
            if(evt.keyCode == this.KEY_ARROW_UP) {
                this._selectionPopup.javascriptVar.show();
                this._selectionList.javascriptVar.onfocus();
                this._selectionList.javascriptVar.onkeydown(evt);
            }

            jsf.ajax.request(evt.target, evt, {
                execute:this.id,
                render:this._selectionList.id+" "+this.rootNode.querySelector(".preRenderTrigger").id,
                mf_ajaxSearch:"true",

                //onevent: this._listReplaced,
                myfaces:{delay: 500}
            });
        }
    });
})();