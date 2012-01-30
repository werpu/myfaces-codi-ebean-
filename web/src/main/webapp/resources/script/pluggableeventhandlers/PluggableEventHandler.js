/**
 * The accordion panel is a group of toggles
 * interconnected by
 */
(function () {
    /**
     * The base class for the pluggable event handlers
     *
     * usage for all of them
     * var handler = new <Handler>(boundingElement.id);
     * jsf.ajax.request(...,{onError: handler.onError,onEvent: handler.onEvent, }
     *
     * The handler now simply takes over and produces some effects
     */

    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.pluggableeventhandlers.PluggabeEventHandler", Object, {
        //phases


        _begin:null,
        _complete:null,
        _success:null,
        _error:null,
        _id: null, //Source element id

        constructor_: function(args) {
            //this._callSuper("constructor_");
            var _Lang = myfaces._impl._util._Lang;
            _Lang.applyArgs(this, args);
            this.onEvent = _Lang.hitch(this, this.onEvent);
            this.onError = _Lang.hitch(this, this.onError);
        },
        onEvent:function (evt) {
            var status = "_"+evt.status;
            (this[status]) ? this[status](evt) : null;
        },
        onError:function (evt) {
            (this["_error"]) ? this["_error"](evt) : null;
        }

    })
})();