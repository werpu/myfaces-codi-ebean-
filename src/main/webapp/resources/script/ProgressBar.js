(function() {
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;
    var _ErrorQueue = extras.apache.ExtendedErrorQueue;

    /**
     * progress bar which displays a bar which indicates a value
     * between 0 and 100
     * the update is either done via a periodical pull
     * or by manual refreshes on the bar
     */
    _RT.extendClass("extras.apache.ProgressBar", extras.apache.Pull, {
        /**
         * if set to true auto refresh is triggered
         */
        periodicPull: true,

        thresholdLow: 33,
        thresholdMedium: 66,
        thresholdHigh: 95,


        constructor_: function(args) {
            this._callSuper("constructor", args);
            this._onAjaxEvent = _Lang.hitch(this, this._onAjaxEvent);
            /*we dont need any unload hooks*/
            this.unloadAware = false;
        },

        /**
         * refresh called due to periodicPull being to
         */
        refresh: function() {
            var progressText = this.rootNode.querySelector(".progressText");

            jsf.ajax.request(this.valueHolderId, null, {execute:this.valueHolderId, render:this.valueHolderId + " " + progressText.getId(), onevent:this._onAjaxEvent});
        },

        _onAjaxEvent: function(evt) {
            if (evt.status == "success") {
                var newValue = parseInt(document.getElementById(this.valueHolderId).value);
                var progressHolder = this.rootNode.querySelector(".progressHolder");
                var progressGauge = this.rootNode.querySelector(".progressGauge");

                progressGauge.setStyle("width", Math.round(newValue * parseFloat(progressHolder.getAttribute("offsetWidth")) / 100.0) + "px");

                //rule set for the gauge coloring
                if (newValue < this.thresholdLow) {
                    progressGauge.addClass("progressFirstThird");
                    progressGauge.removeClass("progressSecondThird");
                    progressGauge.removeClass("progressThirdThird");
                    progressGauge.removeClass("progressFinished");
                } else if (newValue >= this.thresholdLow && newValue < this.thresholdMedium) {
                    progressGauge.removeClass("progressFirstThird");
                    progressGauge.addClass("progressSecondThird");
                    progressGauge.removeClass("progressThirdThird");
                    progressGauge.removeClass("progressFinished");
                } else if (newValue >= this.thresholdMedium && newValue < this.thresholdHigh) {
                    progressGauge.removeClass("progressFirstThird");
                    progressGauge.removeClass("progressSecondThird");
                    progressGauge.addClass("progressThirdThird");
                    progressGauge.removeClass("progressFinished");
                } else {
                    progressGauge.removeClass("progressFirstThird");
                    progressGauge.removeClass("progressSecondThird");
                    progressGauge.removeClass("progressThirdThird");
                    progressGauge.addClass("progressFinished");
                }

            }
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
        },

        start: function() {
            if (this.periodicPull) {
                this._callSuper("start");
            }
        },
        stop: function() {
            if (this.periodicPull) {
                this._callSuper("stop");
            }
        }

    });
})();