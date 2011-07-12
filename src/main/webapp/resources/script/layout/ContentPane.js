(function () {
    /**
     * a content pane with some extras like being able to fetch extra content
     * and a title section which optionally is set
     * @namespace extras.apache.ContentPane
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

                _externalContentTarget: null,

                constructor_: function(args) {
                    this._callSuper("constructor_", args);

                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._titleNode = this._titleNode || this.rootNode.querySelector(".head");
                    this._contentNode = this._contentNode || this.rootNode.querySelector(".content");
                    this._externalContentTarget = (this._Lang.isString(this._externalContentTarget)) ? this.rootNode.querySelectorAll(this._externalContentTarget) :
                            this._externalContentTarget;

                    if (this._externalContentUrl) {
                        this.refreshContent(this._externalContentUrl);
                    }
                },

                refreshContent: function(contentUrl) {
                    var xhr = new XMLHttpRequest();

                    //now we assume for secure we have an xhr level2 object
                    //we now only support the official w3c specs since firefox
                    //and chrome have caught up and probably opera as well
                    xhr.onloadend = this._Lang.hitch(this, function(data) {
                        var htmlStripper = new myfaces._impl._util._HtmlStripper();
                        var bodyData = htmlStripper.parse(data.currentTarget.responseText, "body")

                        this._externalContentTarget.innerHTML(bodyData, this._evalExternalContent);

                    });

                    xhr.onerror = this._Lang.hitch(this, function(data) {
                        throw Error("Communications error");
                    });
                    xhr.open("GET", contentUrl, true);
                    xhr.send();
                },

                //callback handler which is called
                //from an outer container whenever
                //the container shows the pane
                onShow: function() {
                    //TODO implement this
                }
            })
})();