/**
 * movable modal or non modal window
 * with resizing capaibilities.
 */
( function () {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Window", extras.apache.ComponentBase, {

        _NODE:myfaces._impl._dom.Node,
        _Lang:myfaces._impl._util._Lang,

        _moveable:false,
        _resizable:false,
        _modal:false,
        _focusOnCreate:true,

        _header:null,
        _footer:null,
        _content:null,

        /* nodes */
        _closer:null,
        _minimizer:null,
        _maximizer:null,
        _title:null,
        _resizeHandler:null,

        /*underlay is dynamically generated*/
        _underlay:null,

        _initialVisible:true,

        /*delta origins for mouse movements*/
        /*helpers only declared implicitely*/
        //_mouseOriginX: -1,
        //_mouseOriginY: -1,

        //_windowOriginX: -1,
        //_windowOriginY: -1,

        //extras.apache.Window._modalStack



        constructor_:function (args) {
            this._callSuper("constructor", args);

            this._onfocus = _Lang.hitch(this, this._onfocus);

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

        _postInit:function () {
            this._callSuper("_postInit", arguments);
            if (this._underlay) {
                this._underlay._postInit();
                this._underlay.show();
            }
            this._header = this._header || this.rootNode.querySelector(".header");
            this._moveHandler = this._moveHandler || this.rootNode.querySelector(".moveHandler");

            this._footer = this._footer || this.rootNode.querySelector(".footer");
            this._content = this._content || this.rootNode.querySelector(".content");

            this._closer = this._closer || this._header.querySelector(".close");
            this._minimizer = this._minimizer || this._header.querySelector(".minimize");
            this._maximizer = this._maximizer || this._header.querySelector(".maximize");
            this._title = this._title || this._header.querySelector(".windowTitle");
            this._resizeHandler = this._resizeHandler || this._footer.querySelector(".resize");

            if (this._closer) {
                this._closer.addEventListener("click", this.hide, true);
            }
            //if (this._maximize) {
            this._maximizer.addEventListener("click", this.maximize, true);
            //}

            if (this._moveable) {
                new extras.apache._Movable(this, this._moveHandler);
            }

            if (this._resizable) {
                new extras.apache._Resizable(this, this._resizeHandler);
            } else {
                this._resizeHandler.setStyle("display", "none");
            }
            this.rootNode.addEventListener("mousedown", this._onfocus, false);

            this.pack();

            /*last defined is the front window unless defined otherwise*/
            if (this._focusOnCreate) {
                new extras.apache._Focusable(this);
            }

            if (this._initialVisible) {
                //  this.show();
                if (extras.apache.Window._focusTimer) {
                    clearTimeout(extras.apache.Window._focusTimer);
                    extras.apache.Window._focusTimer = null;
                }
                extras.apache.Window._focusTimer = setTimeout(this._Lang.hitch(this, this.focus), 100);
            } else {
                this.hide();
            }

        },

        fadeIn:function () {
            this.rootNode.querySelectorAll(".fadeIn").delay(0).setStyle("opacity", "1");
        },

        fadeInFullForce:function () {
            this.rootNode.querySelectorAll(".fadeIn")
                .setTransitionDuration("0s")
                .setStyle("opacity", "1")
                .delay(10)
                .setTransitionDuration("");
        },

        _onfocus:function () {
            this._NODE.querySelectorAll(".window").removeClass("focus");
            this.rootNode.addClass("focus");
        },

        focus:function () {
            this._onfocus();
        },

        hide:function () {

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

        onHide:function () {
            return true;
        },

        show:function () {
            if (this._modal) {
                if (this._underlay)
                    this._underlay.show();
                extras.apache.Window._modalStack.push(this);
            }
            this.rootNode.setStyle("display", "").setStyle("opacity", "1");
            this.focus();
        },

        pack:function (w, h) {
            //TODO add a proper border calculation here

            var contentSizeH = this.rootNode.offsetHeight - this._header.offsetHeight - this._footer.offsetHeight;
            var contentSizeW = this.rootNode.offsetWidth - 2 * this.rootNode.toDomNode().borderWidth;

            this._content.setStyle("width", contentSizeW + "px").setStyle("height", contentSizeH + "px");

        },

        maximize:function (evt) {

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
                    x:this.rootNode.offsetLeft + "px", y:this.rootNode.offsetTop + "px",
                    w:this.rootNode.offsetWidth + "px", h:this.rootNode.offsetHeight + "px"
                });
            document.getElementsByTagName('body')[0].clientWidth
            //transition: all 0.2s linear;
            this.rootNode.addClass("fastScale")
                .style({"width":window.innerWidth + "px",
                    "height":window.innerHeight + "px",
                    "height":window.innerHeight + "px",
                    "left":"0px",
                    "top":"0px"}).delayTransition(500)
                .removeClass("fastScale")
                .exec(
                    this._Lang.hitch(this, function () {
                        this.pack();
                    }
                ));
            this._moveable = false;
            this._maximizer.removeClass("stateNormal").addClass("stateMaximized");
        },

        normalize:function (evt) {
            this._moveable = true;
            if (!this.onNormalize()) {
                return false;
            }
            if (evt) {
                evt.stopPropagation();
            }
            if (!this._dimensionStack || !this._dimensionStack.length) {
                return;
            }
            var oldDimension = this._dimensionStack.splice(0, 1)[0];
            var _t = this;
            this.rootNode.addClass("fastScale")
                .style({"left":oldDimension.x,
                    "top":oldDimension.y,
                    "width":oldDimension.w,
                    "height":oldDimension.h})
                .delayTransition(500).removeClass("fastScale")
                .exec(this._Lang.hitch(this, function () {
                this.pack();
            }));

            this._maximizer.removeClass("stateMaximized").addClass("stateNormal");
        },

        onMaximize:function (evt) {
            //overridable callback handler
            return true;
        },
        onNormalize:function (evt) {
            //overridable callback handler
            return true;
        },
        /**
         * callback from the movable behavior
         * @param position
         */
        onmove:function (position) {
            this.rootNode.style({"left":position.left,
                "top":position.top});
        },

        _onAjaxDomUnload:function (evt) {
            this._callSuper("_onAjaxDomUnload", evt);
            if (this._underlay) {
                this._underlay.hide();
            }
        }

    });
})();