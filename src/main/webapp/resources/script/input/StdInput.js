(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.StdInput", extras.apache.ComponentBase, {
                valueHolder: null,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.valueHolder = this.rootNode.querySelector(".valueHolder");
                    //http://ejohn.org/blog/javascript-getters-and-setters/

                },
                //exposed props for now value
                _initProperties: function() {
                    this._callSuper("_initProperties", arguments);
                    this.__defineGetter__("value", function() {
                        return this.valueHolder.toDomNode().value;
                    });

                    this.__defineSetter__("value", function(val) {
                        this.valueHolder.toDomNode().value = val;
                    });
                }
            });
})();
