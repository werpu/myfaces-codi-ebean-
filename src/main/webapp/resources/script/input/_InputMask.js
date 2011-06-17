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
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.ImageButton", extras.apache.ComponentBase, {

                _LANG: myfaces._impl._util._Lang,

                _tokens: {
                    /*
                     0 Digit (0 through 9, entry required; plus [+]
                     and minus [-] signs not allowed).
                     */
                    "0":"DigitZeroNone",
                    /*
                     9   Digit or space
                     (entry not required;
                     plus and minus signs not allowed).
                     */
                    "9":"DigitSpace",
                    /*
                     #     Digit or space (entry not required; blank positions converted to spaces, plus and minus signs allowed).

                     */
                    "#":"DigitSpacePlusAllowed",
                    /*
                     L     Letter (A through Z, entry required).
                     */
                    "L":"AZ_EntryReq",
                    /*
                     L      Letter (A through Z, entry optional
                     */
                    "?":"AZ_EntryOptional",
                    /*
                     A      Letter or digit (entry required)
                     */
                    "A":"LetterOrDigitEntryReq",


                    "\\":"Escaped",
                    null: "ANY"


                },

                _syntaxPos: 0,

                /*syntax tree a tree of tokens after the parsing has been done*/
                _syntaxTree: null,

                constructor_: function(inputMask) {
                    this._tokenize(inputMask);
                },

                /**
                 * the tokenization of the input mask is relatively simple we
                 * simply tokenize it into a linear stream
                 * the semantics are simply a match or not match
                 * for a given character
                 */
                _tokenize: function(inputMask) {
                    var parseArray = this._Lang.strToArray(inputMask, /\*/);
                    var pos = 0;
                    this.syntaxTree = [];
                    this._Lang.arrForEach(parseArray, this._Lang.hitch(this, function(item) {
                        var token = this._tokens[item];
                        if (!item) {
                            throw new Error("Invalid token at position:" + pos + " in string:" + inputMask);
                        }
                        this.syntaxTree.push({
                                    tokenType: token,
                                    value: item
                                });
                        pos++;
                    }));
                },

                resetParse: function() {
                    this._syntaxPos = 0;
                },

                parse: function(incomingItem, syntaxPos) {
                    this._syntaxPos = syntaxPos;
                },


                parse: function(incomingItem) {
                    //end reached
                    if (this.syntaxTree.length >= this._syntaxPos) return;

                    var currentToken = this.syntaxTree[this._syntaxPos];

                    switch (currentToken.tokenType) {
                        case  "Escaped":
                            this._syntaxPos++;

                            currentToken = this._syntaxTree[this._syntaxPos];
                            this.semanticEscape(currentToken.value);
                            break;

                        //optional handlers here which check for optional and then move forward
                        default:
                            this["semantic" + currentToken.tokenType](incomingItem, false);

                    }
                },


                //semantic connection can and must be overloaded
                //by specialized functions which check
                semanticEscape: function(token, element) {

                },
                semanticDigitZeroNone: function(token, element) {

                },
                semanticDigitSpace: function(token, element) {

                },
                semanticDigitSpacePlusAllowed: function(token, element) {

                },
                semanticAZ_EntryReq: function(token, element) {

                },
                semanticAZ_EntryOptional: function(token, element) {

                },
                semanticLetterOrDigitEntryReq: function(token, element) {

                }

            })
})()