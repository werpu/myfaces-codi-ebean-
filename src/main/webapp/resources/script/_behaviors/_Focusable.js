(function () {
    /**
     * Mouse aware behavior handler which automatically
     * registers all given html5 mouse events
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._Focusable", extras.apache._Behavior, {

                constructor_: function(scope, eventTarget, eventOverrides) {
                    this._callSuper("constructor_", scope, eventTarget, eventOverrides);
                },

                defineBehavior: function() {
                    var event = "focus";
                    (this["_onfocus"]) ? this._tmpEventTarget.addEventListener(event, this["_on" + (this._tmpEventOverrides[event] || event)], false) : null;
                    (this["onfocus"]) ? this._tmpEventTarget.addEventListener(event, this["_on" + (this._tmpEventOverrides[event] || event)], false) : null;
                }
            })
})();