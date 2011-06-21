(function () {
    /**
     * Safari/Chrome gesture event behaviors
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._TouchAware", extras.apache._Behavior, {
                constructor_: function(scope, eventTarget, eventOverrides) {
                    this._callSuper("constructor_", scope, eventTarget, eventOverrides);
                },

                defineBehavior: function() {
                    var events = ["gesturestart","gesturechange","gestureend"];
                    for (var cnt = 0; cnt < events.length; cnt++) {
                        var event = events[cnt];
                        (this["_on" + event]) ? this._tmpEventTarget.addEventListener(event, this["_on" + event], false) : null;
                        (this["on" + event]) ? this._tmpEventTarget.addEventListener(event, this["_on" + event], false) : null;
                    }
                }
            })
})();