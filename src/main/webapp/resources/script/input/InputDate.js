(function() {
    /**
     * inputDate input control, which combines a standard input
     * with a date picker which pops up on focus and is removed
     * on blur
     *
     * @namespace extras.apache.StdInput
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.InputDate", extras.apache.StdInput, {
        _NODE: myfaces._impl._dom.Node,

        _datePicker: null,
        _datePopup:null,


        constructor_:function(args) {
            this._callSuper("constructor_", args);
            this._unloadAware = true;
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            //TODO add movable behavior here trigger it on the title as move handler
            //so that we can move it around



        },

        _postRender: function() {
           this._initReferences();

            if(!this._initComponentListeners) {
                this.rootNode.addEventListener(this.CEVT_AFTER_POST_INIT, this._LANG.hitch(this, this.onChildPostInit));
                this.rootNode.addEventListener(this.CEVT_VALUE_HOLDER_REPLACED, this._LANG.hitch(this, this.valueHolderReplaced));
                this._initComponentListeners = true;
            }
        },

        _initReferences: function() {
            this._datePopup =  this.rootNode.querySelector(".inputPopup");
            this._datePicker =  this._datePopup.querySelector(".datePanel");
            //the date picker and this component share the same value holder

            this._datePicker.javascriptVar.valueHolder = this.valueHolder;
            this._datePopup.javascriptVar.referencedNode = this.valueHolder;
            this._datePicker.referencingInstance = this;

        },
        onChildPostInit: function(evt) {
            this._initReferences();
            evt.consumeEvent();
        },

        valueHolderReplaced: function(evt) {
            var _t = this;
            //this seems to be a nasty browser bug,
            //if we dont add the timeout here
            //we wont get a proper reference to the replaced element
            //instead the browser delivers the old one (the replacement
            //already is done by now
            setTimeout(function() {
                _t._postInit();
                _t._postRender();
                _t._datePopup.dispatchEvent(_t.CEVT_PARENT_CHANGE,{src:_t, srcType:"valueHolderReplaced" });
            },0);
            evt.consumeEvent();
        }

        /**
         * this is the listener for the content changes
         * which was enabled by our data-ezq-update-listener registration
         */
        //_onAjaxContentRefreshed: function() {
        //    this._postInit();
        //}

    });
})();