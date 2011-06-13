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
                 * root node of the referencing element
                 * can be another control (in that case a jsVar must be set as -data attribute
                 * or another normal node
                 */
                _referencedNode: null,
                _mousePositioned: false,
                _controlPositioned: true,

                _position: "bottom", /*possible values, bottom, left, top, right*/

                /*if set to true, the parent gets a hover event attached which opens the popup*/
                _autoHover: false,

                constructor_: function(args) {
                    this._callSuper("constructor_", args);
                    this._onMouseEnter = _Lang.hitch(this, this._onMouseEnter);
                    this._onMouseEnter = _Lang.hitch(this, this._onMouseLeave);

                    if (this._autoHover) {
                        //attach the hover events on the parent
                        //this._referenceControl.rootNode.addEventListener("hover",
                        //)

                    }
                },

                _postInit: function() {

                },

                show: function() {
                    if (this._mousePositioned) {
                        var globalMousePos = this.rootNode.globalMousePos();
                        this.rootNode.style("position", "fixed").
                                style("left", globalMousePos.x + "px").
                                style("top", globalMousePos.y + "px");
                    } else {
                        //standard case position absolute with the enclosing container
                        //being position relative and part of the control, and offet the same X as the parent control

                        switch(this._position) {
                            case "bottom":
                                this._layoutBottom();

                                break;
                            case "left": break;
                            case "top": break;
                            case "bottom": break;
                            default:break;


                        }

                    }
                    this.rootNode.style("display", "block");
                },

                _layoutBottom: function() {
                    var offsetLeft = this._referencedNode.offsetLeft();
                    var offsetTop = this._referencedNode.offsetTop();
                    var height = this._referencedNode.offsetHeight();


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