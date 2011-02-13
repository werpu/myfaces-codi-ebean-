( function() {
    /**
     * Base class for all widgets
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    /**
     * Base class for all components which adds certain behavior
     * to our widgets, we dont use a dojo like templating system
     * because our jsf facelet templates are enough,
     * for subtemplating we can move over but for now
     * what we have suffices.
     */
    _RT.extendClass("extras.apache.ComponentBase", Object, {
        rootNode: null,
        id: null,


        constructor_: function(argsMap) {
            _Lang.applyArgs(this,argsMap);
            _RT.addOnLoad(window, _Lang.hitch(this, this._postInit));
        },

        _postInit: function() {

            this.rootNode = document.querySelectorAll("#" + this.id)[0];
        },

        querySelectorAll: function(queryStr) {
            return this.rootNode.querySelectorAll(queryStr);
        },

        addClass: function(node, styleClass) {
            var classes = node.getAttribute("class");
            if (!classes) {
                node.setAttribute("class", styleClass);
                return;
            }
            classes = classes.split(/\s+/g);
            var alreadyIn = false;
            for (var cnt = classes.length - 1; cnt >= 0; cnt--) {
                alreadyIn = alreadyIn || (classes[cnt] == styleClass)
            }
            if (alreadyIn) return;
            classes.push(styleClass);

            node.setAttribute("class", classes.join(" "));
        },

        removeClass: function(node, styleClass) {
            var res = [];
            var classes = node.getAttribute("class");
            if (!classes) return;
            classes = classes.split(/\s+/g);
            for (var cnt = classes.length - 1; cnt >= 0; cnt--) {
                if (classes[cnt] != styleClass) res.push(classes[cnt]);
            }
            node.setAttribute("class", res.join(" "));
        }

    });
})();