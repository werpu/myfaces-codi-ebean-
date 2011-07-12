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

                _popupDelay: 500,

                _initialVisible: false,
                //just in case the css does not trigger
                _offsetHeight: 16,
                _offsetWith: 16,

                _layouter: null,

                constructor_: function(args) {
                    this._callSuper("constructor_", args);
                    this._layouter = new extras.apache._LayoutController(args);

                    this._onMouseEnter = _Lang.hitch(this, this._onMouseEnter);
                    this._onMouseLeave = _Lang.hitch(this, this._onMouseLeave);
                    this._popupDelay = parseInt(this._popupDelay);
                    if (this._autoHover) {
                        //attach the hover events on the parent
                        //this._referenceControl.rootNode.addEventListener("hover",
                        //)

                    }

                    this._defineProperty( 'referencedNode',  function() {
                            return this._referencedNode;
                        }, function(value) {
                            this._referencedNode = value;
                            this._layouter.referencedNode = value;
                        }
                    );

                },



                _postInit: function() {

                    this._callSuper("_postInit", arguments);
                    this._referencedNode = this._Lang.isString(this._referencedNode) ?
                            this._NODE.querySelector("#" + this._referencedNode.replace(/:/g, "\\:")) :
                            this._referencedNode;

                    /*we store a reference to our for element for easier backward referencing*/
                    this.rootNode.setAttribute("data-ews_for", this._referencedNode.id);
                    if (!this._initialVisible) {
                        this.rootNode.style({"display": "none","opacity":"0"});
                    } else {
                        this.rootNode.style({"display": "block","opacity":"1"});
                    }
                    this._initBehavior();

                },

                _initBehavior: function() {
                    if (this._autoHover && this._referencedNode) {
                        this._referencedNode.addEventListener("mouseover", this._onMouseEnter, false);
                        this._referencedNode.addEventListener("mouseout", this._onMouseLeave, false);
                        this.rootNode.addEventListener("mouseover", this._onMouseEnter, false);
                        this.rootNode.addEventListener("mouseout", this._onMouseLeave, false);
                    }
                },

                show: function() {
                    if (this._mousePositioned) {
                        var globalMousePos = this.rootNode.globalMousePos();
                        this.rootNode.setStyle("position", "fixed").
                                setStyle("left", globalMousePos.x + "px").
                                setStyle("top", globalMousePos.y + "px");
                    } else {
                        //standard case position absolute with the enclosing container
                        //being position relative and part of the control, and offet the same X as the parent control

                        switch (this._position) {
                            case "bottom":
                                this._layouter._layoutBottom();
                                break;
                            case "left":
                                this._layouter._layoutLeft();
                                break;
                            case "top":
                                this._layouter._layoutTop();
                                break;
                            case "bottom":
                                this._layouter._layoutBottom();
                                break;
                            case "topRight":
                                this._layouter._layoutTopRight();
                                break;
                            case "topLeft":
                                this._layouter._layoutTopLeft();
                                break;

                            case "bottomLeft":
                                this._layouter._layoutBottomLeft();
                                break;
                            case "bottomRight":
                                this._layouter._layoutBottomRight();
                                break;
                            case "mouse":
                                this._layouter._layoutMouse();
                                break;
                            case "followMouse":
                                this._layouter._layoutFollowMouse();
                                break;
                            default:
                                throw Error("Unsupported layout position");
                        }
                    }
                    this.rootNode.addClass("fastScale").setStyle("display", "block")
                            .setStyle("opacity", "1")
                            .delay(500)
                            .removeClass("fastScale");
                },



                hide: function() {
                    this.rootNode.addClass("fastScale")
                            .setStyle("opacity", "0")
                            .delay(200)
                            .setStyle("display", "none")
                            .removeClass("fastScale");
                },

                _onMouseEnter: function() {
                    if (this._openTimer) return;
                    if (this._closeTimer) {
                        clearTimeout(this._closeTimer);
                        this._closeTimer = null;
                    }
                    if (this.rootNode.getStyle("display") != "none") return;
                    this._openTimer = setTimeout(this._Lang.hitch(this, function() {
                        this._openTimer = null;
                        this.show();
                    }), this._popupDelay);
                },

                _onMouseLeave: function() {
                    if (this._openTimer) {
                        clearTimeout(this._openTimer);
                        this._openTimer = null;
                    }
                    if (this.rootNode.getStyle("display") == "none") return;

                    this._closeTimer = setTimeout(this._Lang.hitch(this, function() {
                        this._closeTimer = null;
                        this.hide();
                    }), this._popupDelay);
                }
            },
            //static in namespace attached
            {
                popupStack: []
            })
})();