(function() {
    var _RT = myfaces._impl.core._Runtime;
    _RT.extendClass("extras.apache.AjaxStatus", extras.apache.ComponentBase, {
                _displayMatrix: [
                    "ajaxBegin",
                    "ajaxComplete",
                    "ajaxSuccess",
                    "ajaxError"
                ],


                constructor_: function(args) {
                    this._callSuper("constructor", args);
                    /*we dont need any unload hooks*/
                    this.unloadAware = false;
                },

                onAjaxBegin: function(evt) {

                    this.rootNode.removeClass(this._getToRemove("ajaxBegin")).addClass("ajaxBegin");
                },
                onAjaxError: function(evt) {
                    this.rootNode.removeClass(this._getToRemove("ajaxError")).addClass("ajaxError");
                },

                onAjaxSuccess: function(evt) {
                    this.rootNode.removeClass(this._getToRemove("ajaxSuccess")).addClass("ajaxSuccess");
                },
                onAjaxComplete: function(evt) {
                    this.rootNode.removeClass(this._getToRemove("ajaxComplete")).addClass("ajaxComplete");
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