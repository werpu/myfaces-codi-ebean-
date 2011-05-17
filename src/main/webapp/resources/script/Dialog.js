( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Dialog", extras.apache.ComponentBase, {
        constructor_: function() {
            this._callSuper("constructor", arguments);
        },
        _postInit: function() {
            this._callSuper("_postInit", arguments);
            this.rootNode.querySelectorAll(".dialog").setAttribute("style","display: block");
        },


        fadeIn: function() {
            setTimeout(_Lang.hitch(this, function() {
                this.rootNode.querySelectorAll(".fadeIn").setAttribute("style","opacity: 1");
            }, 0));
        },

        fadeInFullForce: function() {
            this.rootNode.querySelectorAll(".fadeIn")
                    .setStyle("transitionDuration", "0s")
                    .setStyle("mozTransitionDuration", "0s")
                    .setStyle("webkitTransitionDuration", "0s")
                    .setStyle("opacity", "1");

            setTimeout(_Lang.hitch(this, function() {
                this.rootNode.querySelectorAll(".fadeIn")
                        .setStyle("transitionDuration", "")
                    .setStyle("mozTransitionDuration", "")
                    .setStyle("webkitTransitionDuration", "");
            }), 10);

        }
    });

    function dialog() {
        this.NODE.querySelectorAll(".dialog").setStyle("display","block");
    }

    function fadeIn() {
        setTimeout(function() {
            this.NODE.querySelectorAll(".fadeIn").setStyle("opacity","1");
        }, 0);
    }

    function fadeInFullForce() {

        this.NODE.querySelectorAll(".fadeIn")
                    .setStyle("transitionDuration", "0s")
                    .setStyle("mozTransitionDuration", "0s")
                    .setStyle("webkitTransitionDuration", "0s")
                    .setStyle("opacity", "1");



        setTimeout(function() {
             this.NODE.querySelectorAll(".fadeIn")
                    .setStyle("transitionDuration", "")
                    .setStyle("mozTransitionDuration", "")
                    .setStyle("webkitTransitionDuration", "");
        }, 10);
    }
})();