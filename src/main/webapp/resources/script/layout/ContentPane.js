(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * a content pane with some extras like being able to fetch extra content
     * and a title section which optionally is set
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.AccordionPanel", extras.apache.ComponentBase, {
                _externalContentUrl: null,
                _title: null,
                _titleNode: null,
                _contentNode: null,
                constructor_: function(args) {
                    this._callSuper(args);
                },

                _postInit: function() {
                    this._callSuper("_postInit", arguments);
                    this._titleNode = this._titleNode || this.rootNode.querySelector(".title");
                    this._contentNode = this._titleNode || this.rootNode.querySelector(".content");

                    if (this._externalContentUrl) {
                        //TODO fetch content and innerHTML
                        //we only use xhr level2 objects
                        //if not xhr level2 we bomb out here
                    }
                },
                //callback handler which is called
                //from an outer container whenever
                //the container shows the pane
                onShow: function() {

                }
            })
})();