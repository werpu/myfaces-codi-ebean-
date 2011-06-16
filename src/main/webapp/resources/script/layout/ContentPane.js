(function () {
    /**
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
                    this._titleNode = this._titleNode || this.rootNode.querySelector(".head");
                    this._contentNode = this._contentNode || this.rootNode.querySelector(".content");

                    if (this._externalContentUrl) {

                        var xhr = _RT.getXHRObject();
                        //now we assume for secure we have an xhr level2 object

                        if('undefined' == typeof xhr.onloadend) {
                            xhr.onload = this._Lang.hitch(this, function(data) {
                                var htmlStripper = new myfaces._impl._util._HtmlStripper();
                                var bodyData = htmlStripper.parse(data.currentTarget.responseText, "body")

                                this._contentNode.innerHTML(bodyData, this._evalExternalContent);


                            });
                        } else {
                            xhr.onloadend = this._Lang.hitch(this, function(data) {
                                this._contentNode.innerHTML(data.currentTarget.responseText);
                            });
                        }
                        xhr.onerror = this._Lang.hitch(this,function(data) {
                            throw Error("Communications error");
                        });
                        xhr.open("GET", this._externalContentUrl, true);
                        xhr.send();
                    }
                },
                //callback handler which is called
                //from an outer container whenever
                //the container shows the pane
                onShow: function() {
                    //TODO implement this
                }
            })
})();