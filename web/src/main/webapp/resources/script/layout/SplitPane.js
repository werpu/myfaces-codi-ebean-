(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
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
        resizable: true,

        constructor_:function(args) {
            this._callSuper("constructor_", args);

            this._componentType = "at.irian.VerticalSplitPane";
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.valueHolder = this.rootNode.querySelector("input.valueHolder");

            this.slider = this.rootNode.querySelector("> .slider");
            this.firstPanel = this.rootNode.querySelector("> .first");
            this.secondPanel = this.rootNode.querySelector("> .second");

            //we now layout our container

            //TODO register sliding events on the slider
        },
        /*initial packing*/
        pack: function() {
            var containerHeight = this.rootNode.offsetHeight;
            var dividerHeight = this.slider.offsetHeight;

            var firstHeight = Math.floor(this.rootNode.offsetHeight - dividerHeight) * (this.sliderPos / 100);
            var secondHeight = containerHeight - dividerHeight - firstHeight;
            var secondTop = firstHeight + dividerHeight;

            this.slider.style({top: firstHeight});
            this.firstPanel.style({height: firstHeight + "px"});
            this.secondPanel.style({height: secondHeight + "px", top: secondTop + "px"});
        },

        onmousedown: function(evt) {
        },
        onmouseup: function(evt) {
        }

    });
})();