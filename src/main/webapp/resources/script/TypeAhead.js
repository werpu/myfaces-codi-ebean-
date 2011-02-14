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

        constructor_:function(args) {
          this._callSuper("constructor", args);
          this.onKeypressInput = _Lang.hitch(this, this.onKeypressInput);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.valueHolder.addEventListener(this.EVT_KEY_PRESS, this.onKeypressInput, false);
        },

        onKeypressInput: function(evt) {
            jsf.ajax.request(evt.target, evt, {
                execute:"@this",
                render:(this.id + this.placeHolderAppendix),

                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        },

        onAjaxEvent: function(evt) {
            this._callSuper("onAjaxEvent", evt);
            if(evt.status == "success" && evt.source == (this.id + this.placeHolderAppendix)) {
                //we have to retrigger our refresh area handling because our ajax preview area was
                //updated
                this._postInit();
            }
        },

        onSelectionChange:function(evt) {

        }
    });

})();