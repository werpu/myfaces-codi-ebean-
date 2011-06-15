(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * a content pane with some extras like being able to fetch extra content
     * and a title section which optionally is set
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.ContentPane", extras.apache.ComponentBase, {
                _NODE:myfaces._impl._dom.Node,
                _Lang: myfaces._impl._util._Lang,
                _RT: myfaces._impl.core._Runtime,

                _externalContentUrl: null,
                /*if set to true embedded javascrips are evaled
                 * otherwise not*/
                _evalExternalContent: false,

                _titleNode: null,
                _contentNode: null,


                constructor_: function(args) {
                    this._callSuper("constructor_",args);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._titleNode = this._titleNode || this.rootNode.querySelector(".title");
                    this._contentNode = this._titleNode || this.rootNode.querySelector(".content");

                    if (this._externalContentUrl) {
                        //TODO fetch content and innerHTML
                        //we only use xhr level2 objects
                        //if not xhr level2 we bomb out here
                        var xhr = _RT.getXHRObject();
                        //now we assume for secure we have an xhr level2 object
                        xhr.loadend = function(data) {
                            this._contentNode.innerHTML(data.toString());
                        };
                        xhr.error = function(data) {
                            throw Error("Communications error");
                        }
                        xhr.open("GET", this._externalContentUrl, true);
                    }
                },
                //callback handler which is called
                //from an outer container whenever
                //the container shows the pane
                onShow: function() {

                }
            })
})();