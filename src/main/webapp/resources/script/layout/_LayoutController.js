( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache._LayoutController", extras.apache.ComponentBase, {
                constructor_: function(args) {
                    this._callSuper(args);
                },
                /*-------------------layout functionality-------------------*/
                _layoutBottom: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":parOffset.x + "px",
                                "top":(parOffset.y + parOffset.h) + "px"
                            });
                },
                _layoutRight: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x + parOffset.w ) + "px",
                                "top":parOffset.y + "px"
                            });
                },
                _layoutLeft: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x - this.rootNode.offsetWidth(this._offsetWith) ) + "px",
                                "top":parOffset.y + "px"
                            });
                },
                _layoutTop: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":parOffset.x + "px",
                                "top":(parOffset.y - this.rootNode.offsetHeight(this._offsetHeight)) + "px"
                            });
                },
                _layoutTopLeft: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x - this.rootNode.offsetWidth(this._offsetWith) ) + "px",
                                "top":(parOffset.y - this.rootNode.offsetHeight(this._offsetHeight)) + "px"
                            });
                },
                _layoutTopRight: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x + parOffset.w ) + "px",
                                "top":(parOffset.y - this.rootNode.offsetHeight(this._offsetHeight)) + "px"
                            });
                },
                _layoutBottomLeft: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x - this.rootNode.offsetWidth(this._offsetWith)) + "px",
                                "top":(parOffset.y + parOffset.h) + "px"
                            });
                },
                _layoutBottomRight: function() {
                    var parOffset = this._referencedNode.offset();
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x + parOffset.w) + "px",
                                "top":(parOffset.y + parOffset.h) + "px"
                            });
                },
                _layoutMouse: function() {
                    var rightOverflow = this.rootNode.globalMousePos().x + this.rootNode.offsetWidth() > (window.innerWidth - window.scrollX);
                    var topOverflow = this.rootNode.globalMousePos().y + this.rootNode.offsetHeight(this._offsetHeight) > (window.innerHeight - window.scrollY)
                    var xPos = rightOverflow ? this.rootNode.globalMousePos().x - this.rootNode.offsetWidth(this._offsetWith) :
                            this.rootNode.globalMousePos().x;
                    var yPos = topOverflow ? this.rootNode.globalMousePos().y - this.rootNode.offsetHeight(this._offsetHeight) :
                            this.rootNode.globalMousePos().y;

                    this.rootNode.style({
                                "position":"fixed",
                                "left":xPos + "px",
                                "top":yPos + "px"
                            });
                },
                _layoutFollowMouse: function() {
                    throw Exception("Not yet implemented");
                }
            })
})();