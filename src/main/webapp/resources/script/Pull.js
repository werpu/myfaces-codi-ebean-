(function () {
    /**
     * a pull component which pulls
     * a certain a
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.Pull", extras.apache.ComponentBase, {

        interval: 5000,
        refreshTargetAppendix: "_refreshArea",
        refreshTargetId: null,

        _refreshInterval: null,



        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.refresh = _Lang.hitch(this, this.refresh);
            this.refreshTargetId = this.refreshTargetId || this.id + ":" + this.refreshTargetAppendix;
        },

        refresh: function() {
            jsf.ajax.request(this.valueHolderId, null, {execute:this.valueHolderId, render:this.refreshTargetId});
        },

        onDomUnload: function(evt) {
            this.stop();
        },

        start: function() {
            this.stop();
            if(this.interval) {
                setInterval(this.refresh, this.interval);
            }
        },

        stop: function() {
            if (this._refreshInterval) {
                clearInterval(this._refreshInterval);
                this._refreshInterval = null;
            }
        },

        _postInit: function() {
            this.start();
        }

    });

})();