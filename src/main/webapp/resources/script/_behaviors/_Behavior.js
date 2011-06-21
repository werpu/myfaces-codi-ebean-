/**
 * The accordion panel is a group of toggles
 * interconnected by
 */
(function () {
    /**
     *  a behavior which is a plugin which isolates common ui element behavior
     *  (note this has nothing to do with jsf behaviors)
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._Behavior", Object, {

                constructor_: function(scope, eventTarget, eventOverrides) {
                    eventTarget = eventTarget || scope.rootNode;
                    eventOverrides = eventOverrides || {};
                    scope._tmpEventTarget = eventTarget;
                    scope._tmpEventOverrides = eventOverrides;
                    try {
                        myfaces._impl._util._Lang.hitch(scope, this.defineBehavior)();
                    } finally {
                        scope._tmpEventTarget = null;
                        scope._tmpEventOverrides = null;
                    }
                }
            })
})();
