/**
 * semi transparent underlay for modal elements
 */
( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Underlay", extras.apache.ComponentBase, {
                _NODE:myfaces._impl._dom.Node,
                opacity: "0.5",

                constructor_: function(args) {
                    this._callSuper("constructor_", args);

                },

                _postInit: function() {
                    this.rootNode = this._NODE.querySelector(".ews_underlay");
                    if (!this.rootNode) {
                        var elem = document.createElement("div");
                        this.rootNode = new myfaces._impl._dom.Node(elem);
                        this.rootNode.setStyle("display", "none");
                        this.rootNode.addClass("ews_underlay");
                        this.rootNode.addClass("fadeIn");
                        this._NODE.querySelector("body").toDomNode().appendChild(elem);
                    }
                },
                show: function() {
                    this.rootNode.setStyle("opacity", "0");
                    this.rootNode.setStyle("display", "");
                    this.rootNode.setStyle("opacity", this.opacity);
                },
                hide: function() {
                    this.rootNode.setStyle("opacity", "0");
                    var _t = this;
                    setTimeout(function() {
                        _t.rootNode.setStyle("display", "none");
                    }, 1000);
                }
            })
})();