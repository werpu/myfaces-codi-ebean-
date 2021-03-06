( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache._LayoutController", extras.apache.ComponentBase, {

                _referencedNode: null,

                constructor_: function(args) {
                    this._callSuper("constructor_",args);

                    this._defineProperty('referencedNode',
                        function() {
                            return this._referencedNode;
                        },
                        function(value) {
                            this._referencedNode = value;
                        }
                    );
                    if(this._referencedNode) {
                        this._referencedNode = new myfaces._impl._dom.Node(this._referencedNode);
                    }
                    this._offsetHeight = this._offsetHeight || 0;
                    this._offsetWith = this._offsetWith || 0;
                },
                _ajaxInit: function(data) {

                    this._callSuper("_ajaxInit", data);

                },
                _postInit: function() {

                    this.rootNode = this.NODE.querySelector("#" + this.id.replace(/:/g, "\\:"));

                },
                /*-------------------layout functionality-------------------*/
                _layoutBottom: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":parOffset.x + "px",
                                "top":(parOffset.y + parOffset.h) + "px"
                            });
                },
                _layoutRight: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x + parOffset.w ) + "px",
                                "top":parOffset.y + "px"
                            });
                },
                _layoutLeft: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x - Math.max(this.rootNode.offsetWidth , this._offsetWith) ) + "px",
                                "top":parOffset.y + "px"
                            });
                },
                _layoutTop: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":parOffset.x + "px",
                                "top":(parOffset.y - Math.max(this.rootNode.offsetHeight , this._offsetHeight)) + "px"
                            });
                },
                _layoutTopLeft: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x - Math.max(this.rootNode.offsetWidth , this._offsetWith) ) + "px",
                                "top":(parOffset.y - Math.max(this.rootNode.offsetHeight , this._offsetHeight)) + "px"
                            });
                },
                _layoutTopRight: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x + parOffset.w ) + "px",
                                "top":(parOffset.y - Math.max(this.rootNode.offsetHeight , this._offsetHeight)) + "px"
                            });
                },
                _layoutBottomLeft: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x - Math.max(this.rootNode.offsetWidth , this._offsetWith)) + "px",
                                "top":(parOffset.y + parOffset.h) + "px"
                            });
                },
                _layoutBottomRight: function() {
                    var parOffset = this._referencedNode.offset;
                    this.rootNode.style({
                                "position":"absolute",
                                "left":(parOffset.x + parOffset.w) + "px",
                                "top":(parOffset.y + parOffset.h) + "px"
                            });
                },
                _layoutMouse: function() {
                    var rightOverflow = this.rootNode.globalMousePos().x + this.rootNode.offsetWidth > (window.innerWidth - window.scrollX);
                    var topOverflow = this.rootNode.globalMousePos().y + Math.max(this.rootNode.offsetHeight , this._offsetHeight) > (window.innerHeight - window.scrollY)
                    var xPos = rightOverflow ? this.rootNode.globalMousePos().x - Math.max(this.rootNode.offsetWidth , this._offsetWith) :
                            this.rootNode.globalMousePos().x;
                    var yPos = topOverflow ? this.rootNode.globalMousePos().y - Math.max(this.rootNode.offsetHeight , this._offsetHeight) :
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