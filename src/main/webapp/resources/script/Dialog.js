var _RT = myfaces._impl.core._Runtime;
var _Lang = myfaces._impl.core._util._Lang;

_RT.extendClass("extras.apache.Dialog", extras.apache.ComponentBase, {
    constructor_: function() {
        this._callSuper("constructor", arguments);
    },
    _postInit: function() {
        this._callSuper("_postInit", arguments);
        var fadeIn = this._rootNode.querySelectorAll(".dialog");
        for (var cnt = 0; cnt != dialog.length; cnt++) {
            fadeIn[cnt].style.display = "block";
        }
        //TODO add event
    },


    fadeIn: function() {
        setTimeout(_Lang.hitch(this, function() {
            var fadeIn = this._rootNode.querySelectorAll(".fadeIn");
            for (var cnt = 0; cnt != fadeIn.length; cnt++) {
                fadeIn[cnt].style.opacity = 1;
            }
        }, 0));
    },

    fadeInFullForce: function() {
        var fadeIn = this._rootNode.querySelectorAll(".fadeIn");
        for (var cnt = 0; cnt != fadeIn.length; cnt++) {
            fadeIn[cnt].style.transitionDuration =
                    fadeIn[cnt].style.mozTransitionDuration =
                            fadeIn[cnt].style.webkitTransitionDuration = "0s";

            fadeIn[cnt].style.opacity = 1;
        }

        setTimeout(_Lang.hitch(this, function() {
            for (var cnt = 0; cnt != fadeIn.length; cnt++) {
                //by setting it blank we reset the transition
                fadeIn[cnt].style.transitionDuration =
                        fadeIn[cnt].style.mozTransitionDuration =
                                fadeIn[cnt].style.webkitTransitionDuration = "";
            }
        }), 10);

    }
});

function dialog() {
    var fadeIn = document.querySelectorAll(".dialog");
    for (var cnt = 0; cnt != dialog.length; cnt++) {
        fadeIn[cnt].style.display = "block";
    }
}

function fadeIn() {
    setTimeout(function() {
        var fadeIn = document.querySelectorAll(".fadeIn");
        for (var cnt = 0; cnt != fadeIn.length; cnt++) {
            fadeIn[cnt].style.opacity = 1;
        }
    }, 0);
}

function fadeInFullForce() {
    var fadeIn = document.querySelectorAll(".fadeIn");
    for (var cnt = 0; cnt != fadeIn.length; cnt++) {
        fadeIn[cnt].style.transitionDuration =
                fadeIn[cnt].style.mozTransitionDuration =
                        fadeIn[cnt].style.webkitTransitionDuration = "0s";

        fadeIn[cnt].style.opacity = 1;
    }

    setTimeout(function() {
        for (var cnt = 0; cnt != fadeIn.length; cnt++) {
            //by setting it blank we reset the transition
            fadeIn[cnt].style.transitionDuration =
                    fadeIn[cnt].style.mozTransitionDuration =
                            fadeIn[cnt].style.webkitTransitionDuration = "";
        }
    }, 10);

}

/*jsf.ajax.addOnEvent(function (event) {
 if (event.status == "success") {
 fadeIn();
 dialog();
 }
 });
 fadeInFullForce();   */