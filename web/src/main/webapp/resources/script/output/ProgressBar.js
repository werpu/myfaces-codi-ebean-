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

                _displayMatrix: [
                    "progressFirstThird",
                    "progressSecondThird",
                    "progressThirdThird",
                    "progressFinished"
                ],

                constructor_: function(args) {
                    this._callSuper("constructor", args);
                    this._onAjaxEvent = _Lang.hitch(this, this._onAjaxEvent);
                    /*we dont need any unload hooks*/
                    this.unloadAware = false;
                    this._componentType = "at.irian.ProgressBar";
                },

                /**
                 * refresh called due to periodicPull being to
                 */
                refresh: function() {
                    var progressText = this.rootNode.querySelector(".progressText");

                    jsf.ajax.request(this.valueHolderId, null, {execute:this.valueHolderId, render:this.valueHolderId + " " + progressText.getId(), onevent:this.onAjaxEvent});
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
                },


                onAjaxSuccess: function(evt) {
                    var newValue = parseInt(document.getElementById(this.valueHolderId).value);
                    var progressHolder = this.rootNode.querySelector(".progressHolder");
                    var progressGauge = this.rootNode.querySelector(".progressGauge");

                    progressGauge.style({width: Math.round(newValue * progressHolder.offsetWidth / 100.0) + "px"});

                    //rule set for the gauge coloring
                    if (newValue < this.thresholdLow) {
                        progressGauge.removeClass(this._getToRemove("progressFirstThird")).addClass("progressFirstThird");
                    } else if (newValue >= this.thresholdLow && newValue < this.thresholdMedium) {
                        progressGauge.removeClass(this._getToRemove("progressSecondThird")).addClass("progressSecondThird");
                    } else if (newValue >= this.thresholdMedium && newValue < this.thresholdHigh) {
                        progressGauge.removeClass(this._getToRemove("progressThirdThird")).addClass("progressThirdThird");
                    } else {
                        progressGauge.removeClass(this._getToRemove("progressFinished")).addClass("progressFinished");
                    }
                },

                _getToRemove: function(toShow) {
                    var res = [];
                    for (var cnt = this._displayMatrix.length - 1; cnt >= 0; cnt--) {
                        if (this._displayMatrix[cnt] != toShow) {
                            res.push(this._displayMatrix[cnt]);
                        }
                    }
                    return res;
                }
            });
})();