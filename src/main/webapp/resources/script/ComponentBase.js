/**
 * Base class for all widgets
 */
var _RT = myfaces._impl.core._Runtime;
/**
 * Base class for all components which adds certain behavior
 * to our widgets, we dont use a dojo like templating system
 * because our jsf facelet templates are enough,
 * for subtemplating we can move over but for now
 * what we have suffices.
 */
_RT.extendClass("extras.apache.ComponentBase", Object, {
    _rootNode: null,
    _id: null,
    _Lang: null,


    constructor_: function() {
        this._id = this._id || "${cc.atts.id}";
        this._Lang = myfaces._impl._util._Lang;
        this._Lang.applyArgs(arguments);

        _RT.addOnload(_RT.hitch(this, this._postInit));
    },

    _postInit: function() {
        this._rootNode = document.querySelectorAll("#" + this.id)[0];
    },

    querySelectorAll: function(queryStr) {
        return this._rootNode.querySelectorAll(queryStr);
    },

    addClass: function(node, styleClass) {

    },

    removeClass: function(node, styleClass) {

    }

});
