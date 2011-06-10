( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Window", extras.apache.ComponentBase, {

                _NODE:myfaces._impl._dom.Node,

                moveable: false,
                resizable: false,

                _header: null,
                _footer: null,
                _content: null,

                _closer: null,
                _minimizer: null,
                _maximizer: null,
                _title: null,
                _resize: null,

                /*delta origins for mouse movements*/
                _mouseOriginX: -1,
                _mouseOriginY: -1,

                _windowOriginX: -1,
                _windowOriginY: -1,


                constructor_: function(args) {
                    this._callSuper("constructor", args);
                    this._mouseDownMove = _Lang.hitch(this, this._mouseDownMove);
                    this._mouseUpMove = _Lang.hitch(this, this._mouseUpMove);
                    this._mouseMoveMove = _Lang.hitch(this, this._mouseMoveMove);

                    this._mouseDownResize = _Lang.hitch(this, this._mouseDownResize);
                    this._mouseUpResize = _Lang.hitch(this, this._mouseUpResize);
                    this._mouseMoveResize = _Lang.hitch(this, this._mouseMoveResize);

                    this.focus = _Lang.hitch(this,this.focus);

                    this.hide = _Lang.hitch(this, this.hide);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._header = this._header || this.rootNode.querySelector(".header");
                    this._footer = this._footer || this.rootNode.querySelector(".footer");
                    this._content = this._content || this.rootNode.querySelector(".content");

                    this._closer = this._closer || this._header.querySelector(".close");
                    this._minimizer = this._minimizer || this._header.querySelector(".minimize");
                    this._maximizer = this._maximizer || this._header.querySelector(".maximize");
                    this._title = this._title || this._header.querySelector(".windowTitle");
                    this._resize = this._resize || this._footer.querySelector(".resize");


                    if (this._closer) {
                        this._closer.addEventListener("mousedown", this.hide, true);
                    }

                    if (this.moveable) {
                        this._header.addEventListener("mousedown", this._mouseDownMove, false);
                    }

                    if (this.resizable) {
                        this._resize.addEventListener("mousedown", this._mouseDownResize, false);
                    } else {
                        this._resize.setStyle("display","none");
                    }
                    this.rootNode.addEventListener("mousedown", this.focus, false);

                    this.pack();
                },

                fadeIn: function() {
                    this.rootNode.querySelectorAll(".fadeIn").delay(0).setStyle("opacity", "1");
                },

                fadeInFullForce: function() {
                    this.rootNode.querySelectorAll(".fadeIn")
                            .setTransitionDuration("0s")
                            .setStyle("opacity", "1")
                            .delay(10)
                            .setTransitionDuration("");
                },

                focus: function() {
                    this._NODE.querySelectorAll(".window").removeClass("focus");
                    this.rootNode.addClass("focus");
                },

                _mouseDownMove: function(evt) {
                    window.addEventListener("mouseup", this._mouseUpMove, true);
                    window.addEventListener("mousemove", this._mouseMoveMove, true);

                    this._windowOriginX = parseInt(this.rootNode.offsetLeft());
                    this._windowOriginY = parseInt(this.rootNode.offsetTop());

                    this._mouseOriginX = evt.pageX;
                    this._mouseOriginY = evt.pageY;

                    this._origDeltaX = this._mouseOriginX - this._windowOriginX;
                    this._origDeltaY = this._mouseOriginY - this._windowOriginY;
                },

                _mouseDownResize: function(evt) {
                    window.addEventListener("mouseup", this._mouseUpResize, true);
                    window.addEventListener("mousemove", this._mouseMoveResize, true);

                    this._NODE.querySelectorAll(".window").removeClass("focus");
                    this.rootNode.addClass("focus");

                    this._windowOriginX = parseInt(this.rootNode.offsetLeft());
                    this._windowOriginY = parseInt(this.rootNode.offsetTop());

                    this._mouseOriginX = evt.pageX;
                    this._mouseOriginY = evt.pageY;

                    this._origDeltaX = this._mouseOriginX - this._windowOriginX;
                    this._origDeltaY = this._mouseOriginY - this._windowOriginY;
                },

                pack: function(w, h) {
                    var contentSizeH = this.rootNode.offsetHeight() - this._header.offsetHeight() - this._footer.offsetHeight();
                    var contentSizeW = this.rootNode.offsetWidth() - this._header.offsetWidth() - this._footer.offsetWidth();

                    this._content.setStyle("width", contentSizeW + "px");
                    this._content.setStyle("height", contentSizeH + "px");

                },

                _mouseMoveMove: function(evt) {
                    var posX = evt.pageX;
                    var posY = evt.pageY;

                    this.rootNode.setStyle("left", (posX - this._origDeltaX) + "px");
                    this.rootNode.setStyle("top", (posY - this._origDeltaY) + "px");
                },

                _mouseMoveResize: function(evt) {

                    var posX = evt.pageX - parseInt(window.scrollX);
                    var posY = evt.pageY - parseInt(window.scrollY);

                    this.rootNode.setStyle("width", (posX - this._windowOriginX) + "px");
                    this.rootNode.setStyle("height", (posY - this._windowOriginY) + "px");

                    this.pack();
                },

                _mouseUpMove: function(evt) {
                    window.removeEventListener("mouseup", this._mouseUpMove, true);
                    window.removeEventListener("mousemove", this._mouseMoveMove, true);
                },

                _mouseUpResize: function(evt) {
                    window.removeEventListener("mouseup", this._mouseUpResize, true);
                    window.removeEventListener("mousemove", this._mouseMoveResize, true);
                },

                hide: function() {
                    if(!this.onHide()) {
                        return;
                    }
                    this.rootNode.setStyle("opacity", "0");
                    var _t = this;
                    setTimeout(function() {
                        _t.rootNode.setStyle("display", "none");
                    }, 2000);
                },

                onHide: function() {
                    return true;
                },

                show: function() {
                    this.rootNode.setStyle("display", "")
                            .setStyle("opacity", "1");
                }
            });

})();