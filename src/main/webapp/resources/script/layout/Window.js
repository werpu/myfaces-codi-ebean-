/**
 * movable modal or non modal window
 * with resizing capaibilities.
 */
( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Window", extras.apache.ComponentBase, {

                _NODE:myfaces._impl._dom.Node,
                _Lang: myfaces._impl._util._Lang,

                _moveable: false,
                _resizable: false,
                _modal: false,
                _focusOnCreate: true,

                _header: null,
                _footer: null,
                _content: null,

                /* nodes */
                _closer: null,
                _minimizer: null,
                _maximizer: null,
                _title: null,
                _resize: null,

                /*underlay is dynamically generated*/
                _underlay: null,

                _initialVisible: true,

                /*delta origins for mouse movements*/
                /*helpers only declared implicitely*/
                //_mouseOriginX: -1,
                //_mouseOriginY: -1,

                //_windowOriginX: -1,
                //_windowOriginY: -1,

                //extras.apache.Window._modalStack



                constructor_: function(args) {
                    this._callSuper("constructor", args);
                    this._mouseDownMove = _Lang.hitch(this, this._mouseDownMove);
                    this._mouseUpMove = _Lang.hitch(this, this._mouseUpMove);
                    this._mouseMoveMove = _Lang.hitch(this, this._mouseMoveMove);

                    this._mouseDownResize = _Lang.hitch(this, this._mouseDownResize);
                    this._mouseUpResize = _Lang.hitch(this, this._mouseUpResize);
                    this._mouseMoveResize = _Lang.hitch(this, this._mouseMoveResize);

                    this.focus = _Lang.hitch(this, this.focus);

                    this.hide = _Lang.hitch(this, this.hide);
                    this.maximize = _Lang.hitch(this, this.maximize);
                    this.normalize = _Lang.hitch(this, this.normalize);

                    if (this._modal) {
                        this._underlay = this._underlay || new extras.apache.Underlay();
                        if (!extras.apache.Window._modalStack) {
                            extras.apache.Window._modalStack = [];
                        }

                    }

                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    if (this._underlay) {
                        this._underlay._postInit();
                        this._underlay.show();
                    }
                    this._header = this._header || this.rootNode.querySelector(".header");
                    this._footer = this._footer || this.rootNode.querySelector(".footer");
                    this._content = this._content || this.rootNode.querySelector(".content");

                    this._closer = this._closer || this._header.querySelector(".close");
                    this._minimizer = this._minimizer || this._header.querySelector(".minimize");
                    this._maximizer = this._maximizer || this._header.querySelector(".maximize");
                    this._title = this._title || this._header.querySelector(".windowTitle");
                    this._resize = this._resize || this._footer.querySelector(".resize");

                    if (this._closer) {
                        this._closer.addEventListener("click", this.hide, true);
                    }
                    //if (this._maximize) {
                    this._maximizer.addEventListener("click", this.maximize, true);
                    //}

                    if (this._moveable) {
                        this._header.addEventListener("mousedown", this._mouseDownMove, false);
                    }

                    if (this._resizable) {
                        this._resize.addEventListener("mousedown", this._mouseDownResize, false);
                    } else {
                        this._resize.setStyle("display", "none");
                    }
                    this.rootNode.addEventListener("mousedown", this.focus, false);

                    this.pack();

                    /*last defined is the front window unless defined otherwise*/
                    if (this._focusOnCreate) {
                        this.focus();
                    }

                    if (this._initialVisible) {
                        //  this.show();
                    } else {
                        this.hide();
                    }
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

                hide: function() {

                    if (!this.onHide()) {
                        return;
                    }
                    var _t = this;

                    this.rootNode.setStyle("opacity", "0").delay(2000).setStyle("display", "none");

                    if (this._modal) {
                        extras.apache.Window._modalStack.pop();
                        if (this._underlay)
                            this._underlay.hide();
                        if (extras.apache.Window._modalStack.length > 0) {
                            var parent = extras.apache.Window._modalStack.pop();
                            parent.show();
                        }
                    }
                },

                onHide: function() {
                    return true;
                },

                show: function() {
                    if (this._modal) {
                        if (this._underlay)
                            this._underlay.show();
                        extras.apache.Window._modalStack.push(this);
                    }
                    this.rootNode.setStyle("display", "").setStyle("opacity", "1");
                },

                pack: function(w, h) {
                    //TODO add a proper border calculation here

                    var contentSizeH = this.rootNode.offsetHeight() - this._header.offsetHeight() - this._footer.offsetHeight();
                    var contentSizeW = this.rootNode.offsetWidth() - 2 * this.rootNode.toDomNode().borderWidth;

                    this._content.setStyle("width", contentSizeW + "px").setStyle("height", contentSizeH + "px");

                },

                maximize: function(evt) {

                    if (!this.onMaximize()) {
                        return false;
                    }
                    if (evt) {
                        evt.stopPropagation();
                    }
                    if (!this._dimensionStack) {
                        this._dimensionStack = [];
                    }
                    if (this._dimensionStack.length >= 1) {
                        this.normalize(evt);
                        return;
                    }

                    this._dimensionStack.push(
                            {
                                x:this.rootNode.offsetLeft() + "px", y: this.rootNode.offsetTop() + "px",
                                w:this.rootNode.offsetWidth() + "px", h: this.rootNode.offsetHeight() + "px"
                            });
                    document.getElementsByTagName('body')[0].clientWidth

                    this.rootNode.addClass("fastScale")
                            .style({"width": window.innerWidth + "px",
                                "height": window.innerHeight + "px",
                                "height": window.innerHeight + "px",
                                "left": "0px",
                                "top": "0px"}).delayTransition(500)
                            .removeClass("fastScale")
                            .exec(this._Lang.hitch(this, function() {
                        this.pack();
                    }));
                    this._moveable = false;
                    this._maximizer.removeClass("stateNormal").addClass("stateMaximized");
                },

                normalize: function(evt) {
                    this._moveable = true;
                    if (!this.onNormalize()) {
                        return false;
                    }
                    if (evt) {
                        evt.stopPropagation();
                    }
                    if (!this._dimensionStack || ! this._dimensionStack.length) {
                        return;
                    }
                    var oldDimension = this._dimensionStack.splice(0, 1)[0];
                    var _t = this;
                    this.rootNode.addClass("fastScale")
                            .style({"left": oldDimension.x,
                                "top": oldDimension.y,
                                "width": oldDimension.w,
                                "height": oldDimension.h})
                            .delayTransition(500).removeClass("fastScale")
                            .exec(this._Lang.hitch(this, function() {
                        this.pack();
                    }));

                    this._maximizer.removeClass("stateMaximized").addClass("stateNormal");
                },

                onMaximize: function(evt) {
                    //overridable callback handler
                    return true;
                },
                onNormalize: function(evt) {
                    //overridable callback handler
                    return true;
                },

                _mouseDownMove: function(evt) {
                    if (!this._moveable) return;

                    window.addEventListener("mouseup", this._mouseUpMove, true);
                    window.addEventListener("mousemove", this._mouseMoveMove, true);

                    this._windowOriginX = parseInt(this.rootNode.offsetLeft());
                    this._windowOriginY = parseInt(this.rootNode.offsetTop());

                    this._mouseOriginX = evt.pageX - window.scrollX;
                    this._mouseOriginY = evt.pageY - window.scrollY;

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



                _mouseMoveMove: function(evt) {
                    var posX = evt.pageX - window.scrollX;
                    var posY = evt.pageY - window.scrollY;

                    this.rootNode.style({"left": (posX - this._origDeltaX) + "px",
                                "top": (posY - this._origDeltaY) + "px"});
                },

                _mouseMoveResize: function(evt) {

                    var posX = evt.pageX - parseInt(window.scrollX);
                    var posY = evt.pageY - parseInt(window.scrollY);

                    this.rootNode.style({"width": (posX - this._windowOriginX) + "px",
                                "height": (posY - this._windowOriginY) + "px"});

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
                _onAjaxDomUnload: function(evt) {
                    this._callSuper("_onAjaxDomUnload", evt);
                    if (this._underlay) {
                        this._underlay.hide();
                    }
                }

            });
})();