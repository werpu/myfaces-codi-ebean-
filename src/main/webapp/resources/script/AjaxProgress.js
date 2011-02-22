(function() {
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;
    var _ErrorQueue = extras.apache.ExtendedErrorQueue;

    _RT.extendClass("extras.apache.AjaxProgress", extras.apache.ComponentBase, {
        constructor_: function(args) {
            this._callSuper("constructor", args);
        },

        onAjaxEvent: function(evt) {
            try {
                if (evt.status == "begin") {
                    this.start();
                }
                if (evt.status == "success") {
                    this.end();
                }
            } finally {
                this._callSuper("onAjaxEvent", evt);
            }
        },

        onErrorEvent: function(evt) {
            this.end();
        },

        start: function() {
            this.removeClass(this.rootNode, "progressStopped");
            this.addClass(this.rootNode, "ajaxInProgress");
        },

        end: function() {
            this.removeClass(this.rootNode, "ajaxInProgress");
            this.addClass(this.rootNode, "progressStopped");
        }


    });

})()