( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Dialog", extras.apache.ComponentBase, {
                constructor_: function() {
                    this._callSuper("constructor", arguments);
                },
                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this.rootNode.querySelectorAll(".dialog").setStyle("display", "block");
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
                }
            });

    function dialog() {
        this.NODE.querySelectorAll(".dialog").setStyle("display", "block");
    }

    function fadeIn() {
        this.NODE.querySelectorAll(".fadeIn").delay(0).setStyle("opacity", "1");
    }

    function fadeInFullForce() {
        this.NODE.querySelectorAll(".fadeIn")
                .setTransitionDuration("0s")
                .setStyle("opacity", "1")
                .delay(10)
                .setTransitionDuration("");
    }
})();