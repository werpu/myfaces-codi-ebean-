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
        lineHolderId: null,
        valueHolder: null,

        _suggestPart: null,

        _args: null,

        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.onKeypressInput = _Lang.hitch(this, this.onKeypressInput);
            this.valueHolderId = this.valueHolderId || this.id + this.valueHolderAppendix;

            this._initSelectionList(args);
            this._args = args;

        },



        onKeypressInput: function(evt) {

            if (evt.keyCode == this.KEY_ARROW_DOWN) {
                this._suggestPart.selectedLine = 0;
                this._suggestPart.placeHolder.focus();
                this._suggestPart.placeHolder.setAttribute("style", "display", "");
            } else if (evt.keyCode == this.KEY_ESCAPE) {
                //hide the panel
                this._suggestPart.placeHolder.setAttribute("style", "display", "none");
                jsf.ajax.request(evt.target, evt, {
                    execute:this.rootNode.id,
                    render:this._suggestPart.placeHolder.id + " " + this.valueHolder.id,
                    ez_typeahead: true,
                    ez_typahead_show: false,
                    myfaces:{
                        queueSize: this.maxTypeAhead,
                        delay: this.typeDelay
                    }});
            } else {
                this._suggestPart.placeHolder.setAttribute("style", "display", "");
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

        onAjaxEvent: function(evt) {
            this._callSuper("onAjaxEvent", evt);
            if (evt.status == "success" ) {
                var responseXML = evt.responseXML;
                var updates = responseXML.querySelectorAll("changes update");
                var found = false;
                for (var cnt = updates.length - 1; cnt >= 0 && !found; cnt--) {
                    found = updates[cnt].getAttribute("id") == this._suggestPart.placeHolderId;
                }
                if (! found) return;

                //we have to retrigger our refresh area handling because our ajax preview area was
                //updated
                //this._postInit();
                this._initSelectionList(this._args);
                this._suggestPart._postInit();
            }
        },

        onFinalSelection:function(evt) {
            //TODO trigger ajax selection change event
            this._suggestPart.placeHolder.setAttribute("style", "display", "none");
            jsf.ajax.request(evt.target, evt, {
                execute:this.rootNode.id,
                render:this._suggestPart.placeHolder.id + " " + this.valueHolder.id,
                ez_typeahead: true,
                ez_typeahead_line: this.selectedLine,
                ez_typahead_show: true,
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        },

        _initSelectionList: function(args) {
            var selectionArgs = _Lang.mixMaps({}, args);
            selectionArgs.valueHolderId = this.lineHolderId;

            this._suggestPart = new extras.apache.SelectionList(selectionArgs);
            var oldSel = _Lang.hitch(this._suggestPart, this._suggestPart.onFinalSelection);

            this.onFinalSelection = _Lang.hitch(this, this.onFinalSelection);
            var _t = this;
            this._suggestPart.onFinalSelection = _Lang.hitch(this._suggestPart, function(evt) {
                oldSel(evt);
                _t.onFinalSelection(evt);
            });

            var oldKeyb = _Lang.hitch(this._suggestPart, this._suggestPart.onKeypressInput);
            this._suggestPart.onKeypressInput = _Lang.hitch(this._suggestPart, function(evt) {
                oldKeyb(evt);
            });

        },

        _escapeHandler: function(evt) {

        },


        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.valueHolder = this.rootNode.querySelectorAll("#" + this.valueHolderId.replace(/:/g, "\\:"))[0];
            this.valueHolder.addEventListener(this.EVT_KEY_PRESS, this.onKeypressInput, false);
        }

        //TODO add hide code for the preview area
        //TODO also set the focus back to the component
    });

})();