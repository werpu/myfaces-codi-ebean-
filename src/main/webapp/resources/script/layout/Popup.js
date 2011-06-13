( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * popup which is attached to another control
     *
     */
    _RT.extendClass("extras.apache.Popup", extras.apache.ComponentBase, {
                _NODE:myfaces._impl._dom.Node,
                _Lang: myfaces._impl._util._Lang,

                /*
                 *
                 */
                _referenceControl: null,
                _mousePositioned: false,
                _controlPositioned: true,

                _position: "bottom", /*possible values, bottom, left, top, right*/

                /*if set to true, the parent gets a hover event attached which opens the popup*/
                _autoHover: false,

                constructor_: function(args) {
                    this._callSuper("constructor_", args);
                    this._onMouseEnter = _Lang.hitch(this, this._onMouseEnter);
                    this._onMouseEnter = _Lang.hitch(this, this._onMouseLeave);

                    if(this._autoHover) {
                        //attach the hover events on the parent
                        //this._referenceControl.rootNode.addEventListener("hover",
                        //)
                    }
                },

                _postInit: function() {

                },

                show: function() {

                },

                hide: function() {

                },

                _onMouseEnter: function() {

                },

                _onMouseLeave: function() {

                }

            },
            //static in namespace attached
            {
                popupStack: []
            })
})();