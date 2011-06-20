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

    _RT.extendClass("extras.apache._MaskMatcher", Object, {

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
                        val:"LITERAL",
                        fixed: true
                    }


                },

                _syntaxPos: 0,

                /*syntax tree a tree of tokens after the parsing has been done*/
                _syntaxTree: null,

                _matchRegexp: null,

                _controlInputMask: null,

                constructor_:  function(inputMask) {
                    this._createMatchTree(inputMask);
                    var reexpr = this._compile();
                    this._matchRegexp = new RegExp(reexpr);
                    var _t = this;
                    this._generateControlInputMask();
                    this._initProperties();
                },


                _initProperties: function() {
                    this.__defineGetter__("controlInputMask", function() {
                        return _t._controlInputMask;
                    });
                },

                match: function(incomingString) {
                    return !! incomingString.match(this._matchRegexp);
                },

                _generateControlInputMask: function() {
                    var res = [];
                    for (var cnt = 0; cnt < this.syntaxTree.length; cnt++) {
                        var currentToken = this.syntaxTree[cnt];
                        res.push(currentToken.tokenType.val == "LITERAL" ? this.syntaxTree.value : "_");
                    }
                    this._controlInputMask = res.join("");
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

                        token = token || this._tokens["LITERAL"];

                        if (nextAny || !token) {
                            nextAny = false;
                            this.syntaxTree.push({
                                        tokenType: "LITERAL",
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


                /**
                 * we now have a mini compiler which compiles
                 * our input mask format into a regular expression
                 * so that we can leverage regexps for the pattern matching
                 * */
                _compile: function() {
                    var compiledExpr = [];
                    for (var cnt = 0; cnt < this.syntaxTree.length; cnt++) {
                        compiledExpr.push(this._exprEntry(this.syntaxTree[cnt]));
                    }
                    return compiledExpr.join("");
                },

                _exprEntry: function(currentToken) {
                    return this["_semantic" + currentToken.tokenType.val](currentToken);
                },

                //TODO semantic any to a letter resolution given (with escapes)
                _semanticLiteral: function(token) {
                    return (!token.value.match(/A-Za-z/gi)) ? "\\" + token.value : token.value;
                },

                _semanticDigitZeroNone: function(token) {
                    return "[0-9\\_]";
                },
                _semanticDigitSpace: function(token) {
                    return "[0-1\\s_]";
                },
                _semanticDigitSpacePlusAllowed: function() {
                    return "[\\+\\-]{0,1}" + this._semanticDigitSpace();
                },
                _semanticAZ_EntryReq: function() {
                    return "[A-Za-z_]";
                },
                semanticAZ_EntryOptional: function() {
                    return this._semanticAZ_EntryReq() + "{0,1}";
                }
                //TODO add more semantics here


            });
})();