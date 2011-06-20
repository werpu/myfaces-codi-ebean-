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

                constructor_: function(scope) {
                    this._callSuper("constructor_", scope);
                },
                defineBehavior: function() {
                    (this._onKeyDown) ? this.addEventListener("keydown", this._onKeyDown, true) : null;
                    (this._onKeyUp) ? this.addEventListener("keyup", this._onKeyUp, true) : null;
                    (this._onKeyPress) ? this.addEventListener("keypress", this._onKeyPress, true) : null;
                    (this.onKeyDown) ? this.addEventListener("keydown", this.onKeyDown, true) : null;
                    (this.onKeyUp) ? this.addEventListener("keyup", this.onKeyUp, true) : null;
                    (this.onKeyPress) ? this.addEventListener("keypress", this.onKeyPress, true) : null;
                }})
})();