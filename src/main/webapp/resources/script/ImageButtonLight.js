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

    _RT.extendClass("extras.apache.ImageButtonLight", extras.apache.ComponentBase, {

                 _LANG: myfaces._impl._util._Lang,
                _label: null,
                _imageCommand: null,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    this._onMouseDown = this._LANG.hitch(this, this._onMouseDown);
                    this._onMouseUp = this._LANG.hitch(this, this._onMouseUp);

                    this._onKeyDown  = this._LANG.hitch(this, this._onKeyDown);
                    this._onKeyUp    = this._LANG.hitch(this, this._onKeyUp);
                    this._postInit = this._LANG.hitch(this, this._postInit);
                    setTimeout(this._postInit, 0);
                },

                _postInit:function() {
                    this._callSuper("_postInit", arguments);

                    this._label =   this.rootNode.querySelector(".label");
                    this._imageCommand = this.rootNode.querySelector(".imageCommand");
                    this.rootNode.querySelectorAll("*").setAttribute("draggable", "false");


                    //now we apply the event handlers
                    //click should make a short animation between the image changes
                    //mousedown should apply the click styleclass
                    //mouseup on a global scale should remove the image styleclass
                    this._imageCommand.addEventListener("mousedown", this._onMouseDown, false);

                    this._imageCommand.addEventListener("keydown", this._onKeyDown, false);
                    this._imageCommand.addEventListener("keyup", this._onKeyUp, false);
                 },



                _onMouseDown: function(evt) {
                       this._imageCommand.addClass("clicked");
                       window.addEventListener("mouseup", this._onMouseUp, false);
                       this._imageCommand.addEventListener("onmouseout", this._onMouseUp, false);
                },

                _onMouseUp: function(evt) {
                      this._imageCommand.removeClass("clicked");
                      window.removeEventListener("mouseup", this._onMouseUp, false);
                      this._imageCommand.removeEventListener("onmouseout", this._onMouseUp, false);
                },

                _onKeyDown: function(evt) {

                    var keyCode = evt.keyCode;
                    if(evt.keyCode == this.KEY_ENTER) {
                        this._imageCommand.addClass("clicked");
                    }
                },

                _onKeyUp: function(evt) {
                    var keyCode = evt.keyCode;
                    if(evt.keyCode == this.KEY_ENTER) {
                        this._imageCommand.removeClass("clicked");
                    }
                }

            });
})
        ();