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
        lineHolderAppendix: "_lineHolder",
        /**
         * if set to true the value holder
         * search field is updated
         * we have two different types of suggest
         * ones for searches which update the search term
         * and ones which just display data and leave the input unaffected
         *
         */
        updateValueHolder: true,

        /**
         * note if set to true
         * then the type ahead area
         * is sticky on the underlying page
         *
         */
        sticky: false,

        _suggestPart: null,

        _args: null,



        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.onKeyDown = _Lang.hitch(this, this.onKeyDown);
            this.valueHolderId = this.valueHolderId || this.id + this.valueHolderAppendix;

            this._initSelectionList(args);
            this._args = args;

        },



        onKeyDown: function(evt) {

            if (evt.keyCode == this.KEY_ARROW_DOWN) {
                //this._suggestPart.selectedLine = 0;
                //this._suggestPart.placeHolder.focus();
                this._suggestPart.placeHolder.setAttribute("style", "display:");
                this._suggestPart.onkeydown(evt);
                this._onLineSelection(evt);

            } else if (evt.keyCode == this.KEY_ARROW_UP) {
                this._suggestPart.placeHolder.setAttribute("style", "display:");
                this._suggestPart.onkeydown(evt);
                this._onLineSelection(evt);

            } else if (evt.keyCode == this.KEY_ESCAPE) {
                //hide the panel
                this._suggestPart.placeHolder.setAttribute("style", "display:none");

            } else {
                this._suggestPart.placeHolder.setAttribute("style", "display:");
                this._onCharType(evt);

            }
        },

        onKeyPressSuggest: function(evt) {

        },

        ajaxCallHandler: function(evt) {
            this._callSuper("onAjaxEvent", evt);
            if (evt.status == "success") {
                var responseXML = evt.responseXML;
                var updates = responseXML.querySelectorAll("changes update");
                var panelFound = false;
                var inputFound = false;
                for (var cnt = updates.length - 1; cnt >= 0 && !panelFound && !inputFound; cnt--) {
                    panelFound = panelFound || updates[cnt].getAttribute("id") == this._suggestPart.placeHolderId;
                    inputFound = inputFound || updates[cnt].getAttribute("id") == this.valueHolderId;

                }
                if (! panelFound && ! inputFound) return;

                //we have to retrigger our refresh area handling because our ajax preview area was
                //updated
                if (panelFound || inputFound) {
                    this._postInit();
                    _Lang.byId(this.valueHolderId).focus();
                }
                if (panelFound) {
                    this._initSelectionList(this._args);
                    this._suggestPart._postInit();
                }
            }
        },

        _onCharType: function(evt) {
            jsf.ajax.request(evt.target, evt, {
                execute:this.rootNode.id,
                render:this._suggestPart.placeHolder.id,
                ez_typeahead: true,
                onevent: _Lang.hitch(this, this.ajaxCallHandler),
                windowId: this.getWindowParam("windowId"),
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        },

        _onLineSelection:function(evt) {
            //TODO trigger ajax selection change event
            this._suggestPart.placeHolder.setAttribute("style", "display", "none");
            //_Lang.byId(this.valueHolderId).removeEventListener(this.EVT_KEY_DOWN, this.onKeyDown, false);
            jsf.ajax.request(evt.target, evt, {
                execute:this.rootNode.id,
                render:(this.updateValueHolder) ? this.valueHolderId : "@none",
                onevent: _Lang.hitch(this, this.ajaxCallHandler),
                ez_typeahead: true,
                ez_typeahead_line:  _Lang.byId(this.lineHolderId).value,
                ez_typahead_show: true,
                windowId: this.getWindowParam("windowId"),

                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});

        },

        _initSelectionList: function(args) {
            var selectionArgs = _Lang.mixMaps({}, args);
            selectionArgs.valueHolderId = this.lineHolderId;
            this._suggestPart = new extras.apache.SelectionList(selectionArgs);
        },

        _escapeHandler: function(evt) {

        },


        _postInit: function() {
            this._callSuper("_postInit", arguments);
            //this.valueHolder = this.rootNode.querySelectorAll("#" + this.valueHolderId.replace(/:/g, "\\:"))[0];
            _Lang.byId(this.valueHolderId).addEventListener(this.EVT_KEY_DOWN, this.onKeyDown, false);
        }
    });

})();