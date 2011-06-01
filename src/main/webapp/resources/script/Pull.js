(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.Pull", extras.apache.ComponentBase, {

        /**
         * the refresh interval
         */
        interval: 5000,

        /**
         * the target appendix which in summary is the same
         * which is used if no refreshTargetId is given
         * the final id is refreshTargetId or
         * id + ":"+ appendix
         */
        refreshTargetAppendix: "_refreshArea",

        /**
         * the refresh target id override
         */
        refreshTargetId: null,

        /**
         * auto start if set to true
         * the refresh triggers automatically
         */
        autoStart: true,

        /**
         * temporary handle for the refresh interval
         */
        _intervalHandle: null,



        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.refresh = _Lang.hitch(this, this.refresh);
            this.refreshTargetId = this.refreshTargetId || this.id + ":" + this.refreshTargetAppendix;
            this._componentType = "at.irian.Pull";
        },

        /**
         * main entry point every refresh basically just triggers an ajax request
         */
        refresh: function() {
            jsf.ajax.request(this.valueHolderId, null, {execute:this.valueHolderId, render:this.refreshTargetId});
        },

        /**
         * callback for the dom unload
         * if unloaded our refresh becomes invalid
         *
         * @param evt
         */
        onAjaxDomUnload: function(evt) {
            this.stop();
        },

        /**
         * start for the periodic refresh
         */
        start: function() {
            this.stop();
            if(this.interval) {
                if(this._intervalHandle) {
                    clearInterval(this._intervalHandle);
                }
                this._intervalHandle = setInterval(this.refresh, this.interval);
            }
        },

        /**
         * stop for the periodic refresh
         */
        stop: function() {
            if (this._intervalHandle) {
                clearInterval(this._intervalHandle);
                this._intervalHandle = null;
            }
        },


        _postInit: function() {
            this._callSuper("_postInit", arguments);

            if(this.autoStart) {
             this.start();
            }
        }
    });

})();