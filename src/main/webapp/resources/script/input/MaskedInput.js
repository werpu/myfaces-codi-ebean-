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
                    //mixin from behavior Selectable we
                    //can set our cursor pos
                    //@see extras.apache._Selectable

                    switch (evt.keyCode) {
                        //left compare with caret position
                        //right compare with caret position
                        //keycodes stem from the behavor KayboardAware
                        //@see extras.apache._KeyboardAware
                        case this.KEY_ARROW_RIGHT:
                            //right, we jump over a literal if we are in one
                            this._nextPosition(evt)

                            break;
                        case this.KEY_ARROW_LEFT:
                            this._previousPosition(evt);

                            break;

                        case this.KEY_DELETE:
                            this._delete(evt);

                            break;

                        case this.KEY_END:
                            //TODO add hook here

                            break;
                        case this.KEY_HOME:
                            //TODO add hook here

                            break;

                        case this.KEY_v:
                            (evt.metaKey) ? this._paste(evt) : this._charInput(evt);

                            break;

                        case this.KEY_x:
                            (evt.metaKey) ? this._cut(evt) : this._charInput(evt);
                            break;

                        default:
                            this._charInput(evt);

                            break;
                    }
                },

                /*next position*/
                _nextPosition: function(evt) {
                    var caretPosition = this.valueHolder.cursorPos;
                    caretPosition++;

                    while (this._literalPositions[caretPosition]) {
                        //end of position reached
                        caretPosition++;
                    }
                    if (caretPosition == this._defaultInputMask.length) {
                        evt.stopPropagation();
                        return;
                    }

                    //mixin from behavior Selectable we
                    //can set our cursor pos
                    //@see extras.apache._Selectable
                    this.cursorPos = caretPosition;
                },

                /*previous position*/
                _previousPosition: function(evt) {
                    var caretPosition = this.valueHolder.cursorPos;
                    caretPosition --;

                    while (this._literalPositions[caretPosition]) {
                        //end of position reached
                        caretPosition--;
                    }
                    if (caretPosition < 0) {
                        evt.stopPropagation();
                        return;
                    }
                    this.cursorPos = caretPosition;
                },

                /**

                 *
                 * @param evt
                 */
                _cut:function(evt) {
                    /*
                     now cut has to work differently
                     because we have to replace the cut
                     string with a set of underscores and literals
                     from our original mask
                     */
                },

                _delete: function(evt) {
                    //algorithm here, just remove the next non literal
                    //and replace it with _, this is not the standard
                    //behavior of an input which should do an entire shift left
                    //but it makes sense
                },

                _paste: function(evt) {
                    //paste over all positions given until we hit
                    //the first non match
                },
                _undo: function(evt) {
                    //do nothing the control should be able to take care if it
                    //itself
                },
                _charInput:function(evt) {
                    //insert the char if the next non literal is a free position and
                    //the result matches, otherwise do nothing
                }


            })
})();