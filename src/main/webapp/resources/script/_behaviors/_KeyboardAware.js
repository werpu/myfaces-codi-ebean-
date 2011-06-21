/**
 * a mask validating control
 * dependency, the component must be a value holder
 */
(function () {

    /**
     * a matching control which
     *
     * we can use an ll parser here
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._KeyboardAware", extras.apache._Behavior, {



                constructor_: function(scope, eventTarget) {
                    eventTarget = eventTarget || scope.rootNode;
                    scope._tmpEventTarget = eventTarget;
                    try {
                        this._callSuper("constructor_", scope);
                    } finally {
                        scope._tmpEventTarget = null;
                    }
                },
                defineBehavior: function() {
                    var events = ["keydown","keyup","keypress"];
                    for(var cnt = 0; cnt < events.length; cnt++) {
                        var event = events[cnt];
                        (this["_on"+event])?this._tmpEventTarget.addEventListener(event, this["_on"+event], false):null;
                        (this["on"+event])?this._tmpEventTarget.addEventListener(event, this["_on"+event], false):null;
                    }
                }})
})();