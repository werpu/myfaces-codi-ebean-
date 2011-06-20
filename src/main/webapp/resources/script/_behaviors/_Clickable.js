(function () {
    /**
     * Selectable Plugin
     *
     * we can use an ll parser here
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._ValueHolder", extras.apache._Behavior, {
                constructor_: function(scope) {
                    this._callSuper("constructor_", scope);
                },

                defineBehavior: function() {

                }
            })
})();