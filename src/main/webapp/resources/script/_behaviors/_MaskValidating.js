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
     * @namespace extras.apache._MaskValidating
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._MaskValidating", extras.apache._Behavior, {

                constructor_: function(scope) {
                    this._callSuper("constructor_", scope);
                },

                defineBehavior: function() {
                    this.__defineGetter__("validationMask", function() {
                        return this._validationMask;
                    });

                    this.__defineSetter__("validationMask", function(pattern) {
                        this._validationMask = pattern;
                        this.matcher = new extras.apache._MaskMatcher(pattern);
                    });

                    this.match = function() {
                        var valid = this.matcher.match(this.valueHolder.value);
                        this.rootNode.addClass(valid ? "valid" : "invalid");
                        return valid;
                    }
                    this.matcher = new extras.apache._MaskMatcher(this._validationMask);
                    this._literalPositions = this.matcher.literalPositions;
                }
            })
})();