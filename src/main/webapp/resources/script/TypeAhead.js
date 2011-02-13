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

        _postInit: function(arguments) {
            this._callSuper("_postInit", arguments);
            this.valueHolder.addEventListener(this.EVT_KEY_PRESS, _Lang.hitch(this, this.onKeypressInput), false);
            _AjaxQueue.addOnEvent(_Lang.hitch(this, this.onAjaxEvent));
        },

        onKeypressInput: function(evt) {
            jsf.ajax.request(evt.target, evt, {
                execute:"@this",
                render:(this.id + this.placeHolderAppendix),
                typeAhead: this.id,
                myfaces:{
                    queueSize: this.maxTypeAhead,
                    delay: this.typeDelay
                }});
        },

        onSelectionChange:function(evt) {

        }



    });

})();