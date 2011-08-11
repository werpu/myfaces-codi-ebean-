(function () {
    /**
     * Mouse aware behavior handler which automatically
     * registers all given html5 mouse events
     *
     * @namespace extras.apache._MouseAware
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._MouseAware", extras.apache._Behavior, {

                constructor_: function(scope, eventTarget, eventOverrides) {
                    this._callSuper("constructor_", scope, eventTarget, eventOverrides);
                },

                defineBehavior: function() {
                    var events = ["click","dblclick","drag","dragend",
                                  "dragenter","dragleaver","dragover","dragstart",
                                  "drop","mousedown","mouseout","mouseover","mouseup","mousehweel","scroll"];
                    for (var cnt = 0; cnt < events.length; cnt++) {
                        var event = events[cnt];
                        (this["_on" + event]) ? this._tmpEventTarget.addEventListener(event, this["_on" + (this._tmpEventOverrides[event] || event)], false) : null;
                        (this["on" + event]) ? this._tmpEventTarget.addEventListener(event, this["_on" + (this._tmpEventOverrides[event] || event)], false) : null;
                    }
                }
            })
})();