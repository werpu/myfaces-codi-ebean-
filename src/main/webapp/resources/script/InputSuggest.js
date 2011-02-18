(function () {

    /**
     * google like type ajaxing type ahead widget
     *
     * it consists of three elements an input field
     * a value target and a submit link which issues the final submit
     * the value target in the long run will be customizable by a user
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.InputSuggest", extras.apache.ComponentBase, {
        /**
         * delay until the ajax request is triggered
         */
        typeDelay: 200,

        /**
         * maximum of types in the queue until the
         *
         */
        maxTypeAhead: 3,
        valueHolderAppendix: "_valueHolder",
        valueHolderId: null,
        valueHolder: null,

        _suggestPart: null,
        
        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.onKeypressInput = _Lang.hitch(this, this.onKeypressInput);
            this.valueHolderId = this.valueHolderId || this.id + this.valueHolderAppendix;
            this._suggestPart = new extras.apache.SelectionList(arguments)
            var oldSel = this._suggestPart.onFinalSelection

            this.onFinalSelection =_Lang.hitch(this, this.onFinalSelection)
            var _t = this
            this._suggestPart.onFinalSelection = _Lang.hitch(this._suggestPart, function() {
                oldSel()
                _t.onFinalSelection
            });
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.valueHolder = this.rootNode.querySelectorAll("#" + this.valueHolderId.replace(/:/g, "\\:"))[0];
            this.valueHolder.addEventListener(this.EVT_KEY_PRESS, this.onKeypressInput, false);
        },

        onKeypressInput: function(evt) {
            if(evt.keyCode == this.EVT_KEY_DOWN) {
                this._suggestPart.selectedLine = 0;
                this._suggestPart.focus();
            } else {
                this._suggestPart.placeHolder.setAttribute("style","display","");
                jsf.ajax.request(evt.target, evt, {
                   execute:this.rootNode.id,
                    render:this._suggestPart.placeHolder.id,
                    ez_typeahead: true,
                    myfaces:{
                        queueSize: this.maxTypeAhead,
                        delay: this.typeDelay
                    }});

            }
        },

        /**
         * override which is triggered against the preview List
         * @param evt
         */
        onKeyDown: function(evt) {
            this._callSuper("onKeyDown", evt);
            this._onSuggestKeyDown(evt);
        },


        _onSuggestKeyDown: function(evt) {
            if(evt.isPropagationStopped()) {
                return;
            }
            if(evt.keyCode == this.KEY_ESCAPE) {
                //hide the panel
                this._suggestPart.placeHolder.setAttribute("style","display","");
                jsf.ajax.request(evt.target, evt, {
                execute:this.rootNode.id,
                render:this._suggestPart.placeHolder.id+" "+this.valueHolder.id,
                ez_typeahead: true,
                ez_typahead_show: false,
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
            }
        },

        onAjaxEvent: function(evt) {
            this._callSuper("onAjaxEvent", evt);
            if (evt.status == "success" && evt.source == (this.id + this._suggestPart.placeHolderAppendix)) {
                //we have to retrigger our refresh area handling because our ajax preview area was
                //updated
                this._postInit();
            }
        },

        onFinalSelection:function(evt) {
            //TODO trigger ajax selection change event
            this._suggestPart.placeHolder.setAttribute("style","display","none");
            jsf.ajax.request(evt.target, evt, {
                execute:this.rootNode.id,
                render:this._suggestPart.placeHolder.id+" "+this.valueHolder.id,
                ez_typeahead: true,
                ez_typeahead_line: this.selectedLine,
                ez_typahead_show: true,
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        }

        //TODO add hide code for the preview area
        //TODO also set the focus back to the component
    });

})();