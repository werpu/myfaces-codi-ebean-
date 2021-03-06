/**
 * The accordion panel is a group of toggles
 * interconnected by
 */
(function () {
    /**
     *  a behavior which is a plugin which isolates common ui element behavior
     *  (note this has nothing to do with jsf behaviors)
     *  fades an element away during the begin phase
     *
     *  @namespace extras.apache._Behavior
     *
     * usage: new extras.apache.pluggableeventhandlers.Fade({id:<id>, fadeOutTime:<fadeTimeInMs>, fadeInTime...})
     *
     *
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.pluggableeventhandlers.Fade", extras.apache.pluggableeventhandlers.PluggabeEventHandler, {
        //phases

        _rootNode:null,

        /*fading time 500ms*/
        _fadeOutTime:100,
        _fadeInTime:100,

        constructor_:function (args) {
            this.callSuper("constructor_", args);
            this._rootNode = new myfaces._impl._dom.Node(document.getElementById(this.id));
        },

        onError:function (evt) {
            this._rootNode.styleCrossBrowser({"opacity":0});
        },

        _begin:function () {
            var transition = [];
            transition.push("opacity");

            transition.push((parseFloat(this._fadeOutTime) / 1000.0) + "s");

            transition.push("ease-out");
            this._rootNode.styleCrossBrowser({"transition":transition.join(" "), "opacity":1});
            this._rootNode.styleCrossBrowser({});
        },
        _success:function () {
            transition.push("opacity");

            transition.push((parseFloat(this._fadeInTime) / 1000.0) + "s");

            transition.push("ease-out");
            this._rootNode.styleCrossBrowser({"transition":transition.join(" "), "opacity":1});
            this._rootNode.styleCrossBrowser({});
        }
    })
})();