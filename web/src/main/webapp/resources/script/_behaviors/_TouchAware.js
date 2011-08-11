(function () {
    /**
     * Mouse aware behavior handler which automatically
     * registers all given html5 mouse events
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._TouchAware", extras.apache._Behavior, {
                constructor_: function(scope) {
                    this._callSuper("constructor_", scope);
                },

                defineBehavior: function() {
                    var events = ["touchstart","touchmove","touchend"];
                    for (var cnt = 0; cnt < events.length; cnt++) {
                        var event = events[cnt];
                        (this["_on" + event]) ? this.addEventListener(event, this["_on" + event], false) : null;
                        (this["on" + event]) ? this.addEventListener(event, this["_on" + event], false) : null;
                    }
                }
            })
})();