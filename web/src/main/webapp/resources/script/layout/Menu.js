( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * Behavioral class for the drop down menu
     * (the menu should open onclick not on hover
     * we need some timeouts for closing the submenus
     * etc...)
     *
     * @namespace extras.apache.InputPopup
     */
    _RT.extendClass("extras.apache.Menu", extras.apache.ComponentBase, {


        _currentActiveMainMenu: null,
        _autoPos: true,

        constructor_:function(args) {
            this._callSuper("constructor_", args);
            this._onMenuClick = _Lang.hitch(this, this._onMenuClick);
            this._onWindowClick = _Lang.hitch(this, this._onWindowClick);
            // this._onMouseLeave = _Lang.hitch(this, this._onWindowClick);
            this._onListEnter = _Lang.hitch(this, this._onListEnter);
            this._onMenuEnter = _Lang.hitch(this, this._onMenuEnter);
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.rootNode.querySelectorAll(".menuBar > .menu > div").addEventListener(this.EVT_CLICK, this._onMenuClick, false);
            this.rootNode.querySelectorAll(".menuBar .menu .menu > div").addEventListener(this.EVT_MOUSE_OVER, this._onMenuEnter, false);
            //   this.rootNode.querySelectorAll(".menuBar .menu .menu").addEventListener(this.EVT_MOUSE_OUT, this._onMouseLeave, false);
            this.rootNode.querySelectorAll(".menu > ul > li").addEventListener(this.EVT_MOUSE_OVER, this._onListEnter);

            window.addEventListener(this.EVT_CLICK, this._onWindowClick, false);

        },

        _clearSubmenus: function(target) {

            target.parentNode.querySelectorAll(".menu.active").removeClass("active");

        },

        _onListEnter: function(evt) {

            var target = new myfaces._impl._dom.Node(evt.target);
            while (!target.nodeName.toLowerCase("li")) {
                target = target.parentNode;
            }

            this._clearSubmenus(target);
        },

        _onMenuEnter: function(evt) {
            var target = new myfaces._impl._dom.Node(evt.target);
            while (!target.hasClass("menu")) {
                target = target.parentNode;
            }
            this._clearSubmenus(target);
            var _t = this;
            setTimeout(function() {
                target.addClass("active");
                _t._onPositionMenuItems(target);
            }, 100);
        },

        _onPositionMenuItems: function(target) {
            var w = target.parentNode.offsetWidth();
            if (this._autoPos) {
                target.querySelector(".menu > ul").style({
                    right:  "-" + (parseInt(w) / 2) + "px"
                });
            }
        },



        _onMenuClick: function(evt) {
            var target = new myfaces._impl._dom.Node(evt.target);
            while (!target.hasClass("menu")) {
                target = target.parentNode;
            }

            //event was triggered way to low and has not bubbled up
            if (!target || !target.parentNode || !target.parentNode.hasClass("menuBar")) return;
            var active = this._currentActiveMainMenu;
            if (active && !target.equals(active)) {
                target.parentNode.querySelectorAll(".menu").removeClass("active");
            }
            if (!active || !active.equals(target)) {
                target.addClass("active");
            }

            this._currentActiveMainMenu = (target.hasClass("active")) ? target : null;
        },

        _onWindowClick: function(evt) {
            if (!this.rootNode.querySelectorAll(".menu.active").length) return;
            var _t = this;
            var target = new myfaces._impl._dom.Node(evt.target);
            while (target.nodeName.toLowerCase() != "body") {
                if (target.hasClass("menu") && target.hasClass("active")) return;
                target = target.parentNode;
            }

            myfaces._impl._dom.Node.requestAnimFrame(function() {
                this._menuActive = false;
                _t.rootNode.querySelectorAll(".menu").removeClass("active");
            });
        },
        //we need to use the dom unload callback here to handle
        //the clearing up of our window event handler code
        onAjaxDomUnload: function() {
            window.removeEventListener(this.EVT_CLICK, this._onWindowClick);
        }
    });
})();