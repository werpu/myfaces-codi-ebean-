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

    _RT.extendClass("extras.apache.TypeAhead", extras.apache.SelectionList, {
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

        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.onKeypressInput = _Lang.hitch(this, this.onKeypressInput);
            this.valueHolderId = this.valueHolderId || this.id + this.valueHolderAppendix;
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.valueHolder = this.rootNode.querySelectorAll("#" + this.valueHolderId.replace(/:/g, "\\:"))[0];
            this.valueHolder.addEventListener(this.EVT_KEY_PRESS, this.onKeypressInput, false);
        },

        onKeypressInput: function(evt) {
            jsf.ajax.request(evt.target, evt, {
               execute:this.rootNode.id,
                render:this.placeHolder.id,
                ez_typeahead: true,
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        },

        onAjaxEvent: function(evt) {
            this._callSuper("onAjaxEvent", evt);
            if (evt.status == "success" && evt.source == (this.id + this.placeHolderAppendix)) {
                //we have to retrigger our refresh area handling because our ajax preview area was
                //updated
                this._postInit();
            }
        },

        onSelectionChange:function(evt) {
            this._callSuper("onSelectionChange", evt);
            //TODO trigger ajax selection change event
            jsf.ajax.request(evt.target, evt, {
                execute:this.rootNode.id,
                render:this.placeHolder.id,
                ez_typeahead: true,
                ez_typeahead_line: this.selectedLine,
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        }
    });

})();