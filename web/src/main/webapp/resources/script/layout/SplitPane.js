(function () {
    /**
     * A split pane which splits two panels within one parent panel
     * and allows dynamic resizing of both child panes
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.SplitPane", extras.apache.ContentPane, {
        /**
         * the refresh interval
         */
        sliderPos: null,
        resizeVertical: true,

        _resizable: true,
        _moveable: true,

        _initialMouseMos: null,
        _currentMousePos: null,
        vertical: true,


        constructor_:function(args) {
            this._callSuper("constructor_", args);

            this._componentType = "at.irian.VerticalSplitPane";
            this._onminimize = _Lang.hitch(this, this._onminimize);
            this._onnormal = _Lang.hitch(this, this._onnormal);
            this.ontoggle = _Lang.hitch(this, this.ontoggle);
            this.value = this.sliderPos || 0;

            //move scoped by the behavior
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);

            this.slider = new myfaces._impl._dom.Node(document.querySelector("#" + this.rootNode.id + " > .slider"));
            this.firstPanel = new myfaces._impl._dom.Node(document.querySelector("#" + this.rootNode.id + "> .first"));
            this.secondPanel = new myfaces._impl._dom.Node(document.querySelector("#" + this.rootNode.id + "> .second"));
            this.valueHolderToggle = this.rootNode.querySelector(".valueHolder_toggle");

            //this.toggle = this.slider.querySelector(".toggle");
            this.slider.addEventListener("dblclick", this.ontoggle);

            //we now add a mouse behavior so that we can move the slider up and down
            new extras.apache._Movable(this, this.slider);
            //the ValueHolder behavior exposes a value property on this
            new extras.apache._ValueHolder(this);
            this.pack();
        },
        /*initial packing**/
        pack: function() {
            if (this.vertical) {
                this._packVertically();
            } else {
                this._packHorizontally();
            }
            this._originRootNode = (this.vertical) ? this.rootNode.absoluteOffsetTop : this.rootNode.absoluteOffsetLeft;
        },

        _packVertically: function() {
            var containerHeight = this.rootNode.offsetHeight;
            var dividerHeight = this.slider.offsetHeight;

            var firstHeight = parseInt(this.sliderPos);
            var secondHeight = Math.floor(containerHeight - dividerHeight - firstHeight);
            var secondTop = Math.floor(firstHeight + dividerHeight);
            if (!this.valueHolderToggle.checked) {
                this.firstPanel.style({display: ""});
                this.slider.style({top: firstHeight + "px"});
                this.firstPanel.style({height: firstHeight + "px"});
                this.secondPanel.style({height: secondHeight + "px", top: secondTop + "px"});

                this._originRootNode = (this.vertical) ? this.rootNode.absoluteOffsetTop : this.rootNode.absoluteOffsetLeft;
            } else {
                this.slider.style({top: "0px"});
                this.firstPanel.style({display: "none"});
                this.secondPanel.style({height: (containerHeight - dividerHeight) + "px", top: dividerHeight + "px"});

            }
        },

        _packHorizontally: function() {
            var containerWidth = this.rootNode.offsetWidth;
            var dividerWidth = this.slider.offsetWidth;

            var firstWidth = parseInt(this.sliderPos);
            var secondWidth = Math.floor(containerWidth - dividerWidth - firstWidth);
            var secondLeft = Math.floor(firstWidth + dividerWidth);
            if (!this.valueHolderToggle.checked) {
                this.firstPanel.style({display: ""});
                this.slider.style({left: firstWidth + "px"});
                this.firstPanel.style({width: firstWidth + "px"});
                this.secondPanel.style({width: secondWidth + "px", left: secondLeft + "px"});

            } else {

                this.slider.style({left: "0px"});
                this.firstPanel.style({display: "none"});
                this.secondPanel.style({width: (containerWidth - dividerWidth) + "px", left: dividerWidth + "px"});

            }
        },

        /**
         * callback from the movable handler
         * the incoming data is position data relative to the viewport
         * according to the movable behavior which calculates viewport positions
         * instead of absolute ones (for now, this needs to be revisited)
         */
        onmove: function(positiondata) {
            if (this.vertical) {
                this._onSliderMoveVertically(positiondata);
            } else {
                this._onSliderMoveHorizontally(positiondata);
            }
        },

        ontoggle: function() {
            if (!this.valueHolderToggle.checked) {
                this._onminimize();
            } else {
                this._onnormal();
            }
        },

        _onminimize: function() {
            this.valueHolderToggle.checked = true;
            this.pack();
        },

        _onnormal: function() {
            this.valueHolderToggle.checked = false;
            this.pack();
        },

        _onSliderMoveVertically: function(positiondata) {
            //posY is the relativ position with the scroller position removed, within the viewport
            //we have to add the window scroller to the mix to get the final result
            positiondata.top = Math.floor(parseInt(positiondata.pageY - this.slider.offsetHeight / 2 - this._originRootNode));
            positiondata.top = Math.max(positiondata.top, 0);
            positiondata.top = Math.min(this.rootNode.offsetHeight - this.slider.offsetHeight, positiondata.top);
            this.sliderPos = positiondata.top;
            this.value = this.sliderPos;
            //this.valueHolder.value = this.sliderPos;
            this.pack();
        },

        _onSliderMoveHorizontally: function(positiondata) {
            //posY is the relativ position with the scroller position removed, within the viewport
            //we have to add the window scroller to the mix to get the final result
            positiondata.left = Math.floor(parseInt(positiondata.pageX - this.slider.offsetWidth / 2 - this._originRootNode));
            positiondata.left = Math.max(positiondata.left, 0);
            positiondata.left = Math.min(this.rootNode.offsetWidth - this.slider.offsetWidth, positiondata.left);
            this.sliderPos = positiondata.left;
            this.value = this.sliderPos;
            //this.valueHolder.value = this.sliderPos;
            this.pack();
        }

    });
})();