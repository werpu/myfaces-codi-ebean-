/**
 * a regular expression validating control
 * dependency, the component must be a value holder
 */
(function () {
    /**
     * a matching control which
     *
     * we can use an ll parser here
     *
     * @namespace extras.apache._RegexpValidating
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._RegexpValidating", extras.apache._Behavior, {

                constructor_: function(scope) {
                    this._callSuper("constructor_", scope);
                },

                defineBehavior: function() {
                    this.__defineGetter__("validationRegExp", function() {
                        return this._validationRegExp;
                    });

                    this.__defineSetter__("validationRegExp", function(re) {
                        this._validationRegExp = re;
                        this.matcher = new extras.apache._RegexpMatcher(re);
                    });

                    this.match = function() {
                        var valid = this.matcher.match(this.valueHolder.value);
                        this.rootNode.addClass(valid ? "valid":"invalid");
                        return valid;
                    }
                }
            })
})();