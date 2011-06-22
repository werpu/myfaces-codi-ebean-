( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * this class adds selectable capabilities to read only elements
     * which do not trigger normally to onfocus and onblur events
     *
     * Probably @deprecated can be handled better in a behavior
     */
    _RT.extendClass("extras.apache.SelectableReadOnly", extras.apache.ComponentBase, {

    })
})();