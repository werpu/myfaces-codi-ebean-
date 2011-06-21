(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.MaskedInput", extras.apache.StdInput, {

                /*original input mask which represents
                * the input state before the first keypress*/
                _defaultInputMask: null,
                /*literalposition index*/
                _literalPositions: null,

                /**
                 * inherited from base and behavior
                 * _validationMask the mas
                 * matcher
                 */

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                },
                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._defaultInputMask = this.matcher.controlInputMask;
                },

                onkeypress: function(evt) {
                    this._callSuper("onkeyPress", evt);
                    var matches = this.matcher.match();
                    var caretPosition = this.valueHolder.cursorPos;
                    switch(evt.keyCode) {
                        //left compare with caret position
                        //right compare with caret position
                        case
                    }
                },

                /*next position*/
                _nextPosition: function(position) {

                },

                /*previous position*/
                _previous: function(position) {

                }

            })
})();