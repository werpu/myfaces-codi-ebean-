/**
 * google like type ajaxing type ahead widget
 *
 * it consists of three elements an input field
 * a value target and a submit link which issues the final submit
 * the value target in the long run will be customizable by a user
 */
var _RT = myfaces._impl.core._Runtime;
_RT.extendClass("extras.apache.TypeAhead", extras.apache.ComponentBase, {
    _evtBindings: [],
    _input: null,
    placeHolder: null,

    /*the currently selected line which is altered with vk-up and vk-down*/
    selectedLine: -1,

    _selectionList: null,

    constructor_: function() {
        this._callSuper("constructor", arguments);
    },

    _postInit: function() {
        this._callSuper("_postInit", arguments);
        this._input = this.rootNode.querySelectorAll("#" + this.id + "_input")[0];
        this.placeHolder = this.rootNode.querySelectorAll("#" + this.id + "_placeholder")[0];
        this._selectionList = new extras.apache.SelectionList({id:this.id + "_placeholder", selectorIdentifier: "table tr"});
    }
});
