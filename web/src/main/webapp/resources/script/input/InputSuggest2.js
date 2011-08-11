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
        _underlay: null,
        constructor_: function(args) {
            this._callSuper("constructor_", args);
            this._unloadAware = true;
            this._listReplaced = _Lang.hitch(this, this._listReplaced);
            this._ajaxEventTrigger = _Lang.hitch(this, this._ajaxEventTrigger);
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
            //we register the component Listeners
            //because we want to know if the ajax cycled causes
            //one of the children to reinitialize
            this._underlay = this.rootNode.querySelector(".inputUnderlay");
            //we now realign the underlay straight below our input control
            /*old box model where padding is not part of the width*/
            var width =  parseInt(this.valueHolder.offsetWidth()) - parseInt(this._underlay.getStyle("padding-left")|| 0)-parseInt(this._underlay.getStyle("padding-right")|| 0);
            var height =  parseInt(this.valueHolder.offsetHeight()) - parseInt(this._underlay.getStyle("padding-top")|| 0)-parseInt(this._underlay.getStyle("padding-bottom")|| 0);

            this._underlay.style({
                width: width+"px",
                height: height+"px"
            });
        },
        _postRender: function() {
            this._initReferences();
            //this works because we have the correct calling order with our parent being the last
            if (!this._initComponentListeners) {
                this.rootNode.addEventListener(this.CEVT_AFTER_POST_INIT, this._LANG.hitch(this, this.onChildPostInit));
                this.rootNode.addEventListener(this.CEVT_VALUE_CHANGED, this._LANG.hitch(this, this.childValueChanged));
                this.rootNode.addEventListener(this.CEVT_SELECTION_CHANGED, this._LANG.hitch(this, this.childSelectionChanged));

                this._initComponentListeners = true;
            }

        },

        _initReferences: function() {

            this._selectionPopup = this.rootNode.querySelector(".inputPopup").javascriptVar;
            this._selectionList = this._selectionPopup.rootNode.querySelector(".selectionList").javascriptVar;

            this._selectionPopup.referencedNode = this.valueHolder;
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
            if (evt.additionalData.src.id !== this._selectionList.id) return;
            this._selectionPopup.hide();
            this._underlay.innerHTML("", false);
            this.valueHolder.value = this._selectionList.valueHolder.value;
            his._selectionList.valueHolder.value="";
            //this.valueHolder.value =
        },

        childSelectionChanged: function(evt) {
            if (evt.additionalData.src.id !== this._selectionList.id) return;
            this._refreshUnderlay();
        },

        _refreshUnderlay: function(evt) {
            /*in case of nothing selected or no selection list we have no underlay*/
            if(this._selectionList.isEmpty() || this._selectionList.valueHolder.value == "") {
                this._underlay.innerHTML("",false);
                return;
            }
            var splitPos = Math.min(this._selectionList.valueHolder.value.length,this.valueHolder.value.length);
            var underlayValue = "<span style='visibility: hidden;'>"+this._selectionList.valueHolder.value.substring(0,splitPos)+"</span>";
            var valueLen = this._selectionList.valueHolder.value.length;
            underlayValue = (splitPos < valueLen) ?
                    underlayValue + this._selectionList.valueHolder.value.substring(splitPos, valueLen) : underlayValue;
            this._underlay.innerHTML(underlayValue, false);
        },

        onkeyup: function(evt) {

        },
        /**
         * on key up should trigger a refresh of the preview
         * @param evt
         */
        onkeypress: function(evt) {
            this._callSuper("onkeypress", evt);



            if (evt.keyCode == this.KEY_ARROW_DOWN || evt.keyCode == this.KEY_ARROW_UP) {
                //down pressed menu has to pop open and the first item is selected
                if(!this._inPopup) {
                    this._selectionList.clear();
                }

                this._selectionPopup.show();
                this._selectionList.onfocus();
                this._selectionList.onkeydown(evt);
                this._inPopup = true;
                return;
            }

            else if (evt.keyCode == this.KEY_ESCAPE) {
                this._selectionPopup.hide();
                this._inPopup = false;
                this._selectionList.valueHolder.value="";
                return;
            }
            else if (evt.keyCode == this.KEY_ENTER) {
                this._selectionPopup.hide();
                if(!this._inPopup) return;
                this._selectionList.onkeydown(evt);
                return;
            }
           else if (evt.keyCode == this.KEY_DELETE || evt.keyCode == this.KEY_BACKSPACE) {
                var _t = this;
                if(this._deleteTimer) {
                    clearTimeout(this._deleteTimer);
                    this._deleteTimer = null;
                }
                this._underlayTimer = setTimeout(function() {
                    clearTimeout(this._deleteTimer);
                    this._underlayTimer = null;
                     _t._refreshUnderlay();
                }, 10);
            }

            this._selectionPopup.show();
            this._selectionList.onfocus();

            jsf.ajax.request(evt.target, evt, {
                execute:this.id,
                render:this._selectionList.id + " " + this.rootNode.querySelector(".preRenderTrigger").id,
                mf_ajaxSearch:"true",
                onevent: this._ajaxEventTrigger,
                //onevent: this._listReplaced,
                myfaces:{delay: 500}
            });
        },
        _ajaxEventTrigger: function(evt) {
            if(evt.data == "complete") {
                this._refreshUnderlay();
            }
        }

    });
})();