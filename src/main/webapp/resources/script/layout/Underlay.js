/**
 * semi transparent underlay for modal elements
 */
( function() {

    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;

    _RT.extendClass("extras.apache.Underlay", extras.apache.ComponentBase, {
                _NODE:myfaces._impl._dom.Node,
                _Lang: myfaces._impl._util._Lang,
                opacity: "0.5",
                _styleClass:"",


                constructor_: function(args) {
                    this._callSuper("constructor_", args);
                    this.ajaxAware = false;
                },

                _postInit: function() {
                    this.rootNode = this._NODE.querySelector(".ews_underlay");
                    if (!this.rootNode) {
                        var elem = document.createElement("div");
                        this.rootNode = new myfaces._impl._dom.Node(elem);
                        this.rootNode.setStyle("display", "none");
                        this.rootNode.addClass("ews_underlay");
                        this._NODE.querySelector("body").toDomNode().appendChild(elem);
                    }
                },

                show: function() {
                    if(this.rootNode.getStyle("display") != "none" && this.rootNode.getStyle("opacity") == this.opacity) return;
                    this.rootNode.setStyle("opacity", "0").delay(300).setStyle("display", "block").delay(300).setStyle("opacity", this.opacity);
                },

                hide: function(fromUnload) {
                    if(this.rootNode.getStyle("display") == "none") return;
                    this.rootNode.setStyle("opacity", "1").delay(100).setStyle("display", "none");
                }
            })
})();