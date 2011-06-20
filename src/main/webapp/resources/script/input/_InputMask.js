/**
 valid input mask characters according to Microsoft office
 we will clone their behavior since it is consistent with earlier systems

 0     Digit (0 through 9, entry required; plus [+] and minus [-] signs not allowed).
 9     Digit or space (entry not required; plus and minus signs not allowed).
 #     Digit or space (entry not required; blank positions converted to spaces, plus and minus signs allowed).
 L     Letter (A through Z, entry required).
 ?     Letter (A through Z, entry optional).
 A     Letter or digit (entry required).
 a     Letter or digit (entry optional).
 &     Any character or a space (entry required).
 C     Any character or a space (entry optional).
 . , : ; - /     Decimal placeholder and thousands, date, and time separators. (The actual character used depends on the regional settings specified in Microsoft Windows Control Panel.)
 <     Causes all characters that follow to be converted to lowercase.
 >     Causes all characters that follow to be converted to uppercase.
 !     Causes the input mask to display from right to left, rather than from left to right. Characters typed into the mask always fill it from left to right. You can include the exclamation point anywhere in the input mask.
 \     Causes the character that follows to be displayed as a literal character. Used to display any of the characters listed in this table as literal characters (for example, \A is displayed as just A).
 Password     Setting the InputMask property to the word Password creates a password entry text box. Any character typed in the text box is stored as the character but is displayed as an asterisk (*).

 */
/**
 * The accordion panel is a group of toggles
 * interconnected by
 */
(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * we can use an ll parser here
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._InputMask", extras.apache.ComponentBase, {

                _LANG: myfaces._impl._util._Lang,

                _tokens: {
                    /*
                     0 Digit (0 through 9, entry required; plus [+]
                     and minus [-] signs not allowed).
                     */
                    "0": {
                        val: "DigitZeroNone",
                        fixed: true

                    },
                    /*
                     9   Digit or space
                     (entry not required;
                     plus and minus signs not allowed).
                     */
                    "9":{
                        val: "DigitSpace",
                        fixed: true
                    },
                    /*
                     #     Digit or space (entry not required; blank positions converted to spaces, plus and minus signs allowed).
                     note + and - is not allowed here for now

                     */
                    "#":{
                        val:"DigitSpacePlusAllowed",
                        fixed: true
                    },
                    /*
                     L     Letter (A through Z, entry required).
                     */
                    "L":{
                        val:"AZ_EntryReq",
                        fixed: true
                    },
                    /*
                     L      Letter (A through Z, entry optional
                     */
                    "?":{
                        val:"AZ_EntryOptional",
                        fixed: false
                    },
                    /*
                     A      Letter or digit (entry required)
                     */
                    "A":{
                        val: "LetterOrDigitEntryReq",
                        fixed: true
                    },


                    "\\":{
                        val:"Escaped",
                        fixed: true
                    },
                    null:{
                        val:"ANY",
                        fixed: true
                    }


                },

                _syntaxPos: 0,

                /*syntax tree a tree of tokens after the parsing has been done*/
                _syntaxTree: null,

                constructor_:  function(inputMask) {
                    this._createMatchTree(inputMask);
                },

                /**
                 * the tokenization of the input mask is relatively simple we
                 * simply tokenize it into a linear stream
                 * the semantics are simply a match or not match
                 * for a given character
                 */
                _createMatchTree: function(inputMask) {
                    var parseArray = inputMask.split("");
                    var pos = 0;
                    this.syntaxTree = [];
                    for (var cnt = 0; cnt < parseArray.length; cnt++) {
                        var nextAny = false;
                        var item = parseArray[cnt];
                        var token = this._tokens[item];
                        if (nextAny || !token) {
                            nextAny = false;
                            this.syntaxTree.push({
                                        tokenType: "ANY",
                                        value: item
                                    });
                        } else if (token.val == "ESCAPED") {
                            nextAny = true;
                        } else {
                            this.syntaxTree.push({
                                        tokenType: token,
                                        value: item
                                    });
                        }

                    }
                },

                parse: function(incomingItem, syntaxPos) {
                    syntaxPos = syntaxPos || 0;
                    incomingItem = incomingItem.split("");

                    for(var cnt = syntaxPos; cnt < this.syntaxTree.length; cnt++ ) {
                        if(!this._matches(incomingItem, cnt)) return false;
                    }
                    return true;
                },

                _matches: function(incomingItem, syntaxPos) {
                    try {
                        if (incomingItem == "_") {
                            return true;
                        }
                        //end reached
                        if (this.syntaxTree.length >= syntaxPos) return true;
                        var currentToken = this.syntaxTree[this._syntaxPos];
                        /*if(!currentToken.fixed) {
                            //optional handling
                            //var res = this["semantic" + currentToken.tokenType](incomingItem, false);
                            //if(!res) {
                            //    this._syntaxPos++;
                                //case a optional fails next element must match
                            //    return this._matches(incomingItem);
                            //}
                            var lookAheadPos = this._syntaxPos + 1;
                            while(!this.syntaxTree[lookAheadPos])  lookAheadPos++;
                            var lookAhead = lookAheadPos;

                            //case optional matches and subsequent non optional fails optional is the one
                            //case optional matches and subsequent non optoonal matches then optional is set
                            //cas optional matches and subsequent also optional matches rins repeat for the next one

                        }*/



                        return this["semantic" + currentToken.val](incomingItem[syntaxPos], false);

                    } finally {
                        this._syntaxPos++;
                    }
                }
                ,


                //semantic connection can and must be overloaded
                //by specialized functions which check
                //semanticEscape: function(token, element) {
                //cannot happen due to the tokenizer prefiltering escape
                //},
                semanticAny: function(token, element) {
                    return true;
                }
                ,
                semanticDigitZeroNone: function(token, element) {
                    return element.match(/0-9/g);
                }
                ,
                semanticDigitSpace: function(token, element) {
                    return element.match(/[0-9\s]/g);
                }
                ,
                semanticDigitSpacePlusAllowed: function(token, element) {
                    throw Error("not yet supported");
                }
                ,
                semanticAZ_EntryReq: function(token, element) {
                    return element.match(/[A-Z]/g);
                }
                ,
                semanticAZ_EntryOptional: function(token, element) {
                    throw Error("Not supported yet");
                }
                ,
                semanticLetterOrDigitEntryReq: function(token, element) {
                    return element.match(/[A-Z0-9]/g)
                }

            });
})();