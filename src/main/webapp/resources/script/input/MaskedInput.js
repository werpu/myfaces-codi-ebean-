(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * @namespace extras.apache.MaskedInput
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
                    //value defined in _ValueHolder.js
                    this.value = this._defaultInputMask;
                },


                onkeyup: function(evt) {
                    //now to something messy, the key events,
                    //if you think that the browsers get it finally right
                    //after all those years, good luck
                    //opera keyup, keypress
                    //safari non visual command keyup, letter keyup keypress
                    //mozilla, keydown, keypress,keyup, the only browser getting
                    //a simple keypress right is Mozilla
                    //so to avoid browser fallbacks we will handle all command
                    //keys on keyup

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
                            (evt.metaKey) ? this._paste(evt) : null;

                            break;

                        case this.KEY_x:
                            (evt.metaKey) ? this._cut(evt) : null;
                            break;

                        default:

                            break;

                    }
                },

                onkeypress: function(evt) {
                    if(evt.metaKey) return;

                    switch (evt.keyCode) {
                        case this.KEY_ARROW_RIGHT:

                            break;
                        case this.KEY_ARROW_LEFT:

                            break;

                        case this.KEY_DELETE:

                            break;

                        case this.KEY_END:

                            break;
                        case this.KEY_HOME:
                            //TODO add hook here

                            break;

                        default:
                            this._charInput(evt);
                    }

                },



                /*next position*/
                _nextPosition: function(evt) {
                    var origCaretPosition = this.cursorPos - 1, caretPosition = this.cursorPos;

                    while (this._literalPositions[caretPosition]) {
                        //end of position reached
                        caretPosition++;
                    }

                    if (caretPosition == this.value.length - 1 && this._literalPositions[caretPosition]) {
                        caretPosition = origCaretPosition;
                    }

                    //mixin from behavior Selectable we
                    //can set our cursor pos
                    //@see extras.apache._Selectable
                    this.cursorPos = caretPosition;
                },

                /*previous position*/
                _previousPosition: function(evt) {
                    var origCaretPosition = this.cursorPos + 1, caretPosition = this.cursorPos;

                    while ((caretPosition) && this._literalPositions[caretPosition]) {
                        //end of position reached
                        caretPosition--;
                    }
                    if (!caretPosition && this._literalPositions[caretPosition]) {
                        caretPosition = origCaretPosition;
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
                    try {
                        var origCaretPosition = this.cursorPos, caretPosition = this.cursorPos;
                        this._keydownState = this.value;
                        var str = String.fromCharCode(evt.charCode || evt.keyCode);
                        var cursorPos = this.cursorPos;

                        var value = this.value;
                        if (cursorPos == value.length - 1) {
                            return;
                        }

                        value = value.substr(0, cursorPos) + str + value.substr(cursorPos + 1, value.length - 1);
                        this.value = value;
                        this.cursorPos = ++origCaretPosition;
                        this._nextPosition();
                    } finally {
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                }
            })
})();