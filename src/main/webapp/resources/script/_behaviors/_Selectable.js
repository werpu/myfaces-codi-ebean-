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
                    this.__defineGetter__("cursorPos", function() {
                        return this.valueHolder.toDomNode().selectionStart;

                    });

                    this.__defineSetter__("selection", function(val1, val2) {
                        this.valueHolder.toDomNode().focus();
                        this.valueHolder.toDomNode().setSelectionRange(val1, val2);
                    });

                    this.__defineGetter__("selection", function() {
                        this.valueHolder.toDomNode().focus();
                        return {
                            start: this.valueHolder.toDomNode().selectionStart,
                            end: this.valueHolder.toDomNode().selectionEnd
                        };
                    });

                    this.__defineSetter__("cursorPos", function(val1) {
                        this.valueHolder.toDomNode().focus();
                        this.valueHolder.toDomNode().setSelectionRange(val1, val1);
                    });

                    this.__defineGetter__("cursorPos", function() {
                        return this.valueHolder.toDomNode().selectionStart;

                    });

                    this.__defineSetter__("cursorPos", function(val) {
                        this.valueHolder.toDomNode().focus();
                        this.valueHolder.toDomNode().setSelectionRange(val, val);
                    });

                    this.__defineGetter__("selectedText", function() {

                        var selectionPos = this.selection;
                        if (selectionPos.start == selectionPos.end) return "";
                        return this.value.substr(selectionPos.start, selectionPos.end);

                    });

                    this.__defineGetter__("form", function() {
                        return this.valueHolder.getAttribute("form");
                    });

                    this.__defineSetter__("form", function(val) {
                        return this.valueHolder.setAttribute("form", val);
                    });
                }

            })
})();