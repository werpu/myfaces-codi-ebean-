/**
 * a mask validating control
 * dependency, the component must be a value holder
 */
(function () {

    /**
     * a matching control which
     *
     * we can use an ll parser here
     *
     * @namespace extras.apache._KeyboardAware
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._KeyboardAware", extras.apache._Behavior, {



                constructor_: function(scope, eventTarget, eventOverrides) {
                    this._callSuper("constructor_", scope, eventTarget, eventOverrides);
                },
                defineBehavior: function() {
                    /**
                     * constants, since we only deal with html5+ we do not
                     * cover the entire huge quirksmode.org section
                     * but concentrate ourselves on the raw codes
                     * only supported by newer browsers
                     */
                    
                    
                    if (!this.KEY_ARROW_LEFT) {
                        var proto = this;

                        proto.KEY_ARROW_LEFT = 37;
                        proto.KEY_ARROW_UP = 38;
                        proto.KEY_ARROW_RIGHT = 39;
                        proto.KEY_ARROW_DOWN = 40;
                        proto.KEY_TAB = 9;
                        proto.KEY_ESCAPE = 27;
                        proto.KEY_ENTER = 13;
                        proto.KEY_CTRL = 17;
                        proto.KEY_SPACE = 49;
                        proto.KEY_DELETE = 46;
                        proto.KEY_END = 35;
                        proto.KEY_HOME = 36;

                        //standard character keys which get a new meaning with meta
                        proto.KEY_c = 67;
                        proto.KEY_x = 88;
                        proto.KEY_v = 86;




                        //TODO add additional keycodes on demand
                    }

                    var events = ["keydown","keyup","keypress"];
                    for (var cnt = 0; cnt < events.length; cnt++) {
                        var event = events[cnt];
                        (this["_on" + event]) ? this._tmpEventTarget.addEventListener(event, this["_on" + event], true) : null;
                        (this["on" + event]) ? this._tmpEventTarget.addEventListener(event, this["on" + event], true) : null;
                    }
                }})
})();