/**
 * The accordion panel is a group of toggles
 * interconnected by
 */
(function () {
    /**
     * Selectable Plugin
     *
     * we can use an ll parser here
     *
     * @namespace extras.apache._Selectable
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache._Selectable", extras.apache._Behavior, {

        constructor_: function(scope) {
            this._callSuper("constructor_", scope);
        },

        defineBehavior: function() {
            try {
                this._defineProperty("selection",
                        function() {
                            this.valueHolder.toDomNode().focus();
                            return {
                                start: this.valueHolder.toDomNode().selectionStart,
                                end: this.valueHolder.toDomNode().selectionEnd
                            };
                        }, function(val1, val2) {
                            this.valueHolder.toDomNode().focus();
                            this.valueHolder.toDomNode().setSelectionRange(val1, val2);
                        });

                this._defineProperty("cursorPos", function() {
                    return this.valueHolder.toDomNode().selectionStart;
                }, function(val1) {
                    this.valueHolder.toDomNode().focus();
                    this.valueHolder.toDomNode().setSelectionRange(val1, val1);
                });

                this._defineProperty("selectedText", function() {
                    var selectionPos = this.selection;
                    if (selectionPos.start == selectionPos.end) return "";
                    return this.value.substr(selectionPos.start, selectionPos.end);

                });

                this._defineProperty("form", function() {
                    return this.valueHolder.getAttribute("form");
                }, function(val) {
                    return this.valueHolder.setAttribute("form", val);
                });
            } catch (e) {

            }
        }

    })
})();