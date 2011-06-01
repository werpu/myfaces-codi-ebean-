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

    _RT.extendClass("extras.apache.ImageButton", extras.apache.ComponentBase, {

                 _LANG: myfaces._impl._util._Lang,

                _imageNormal: null,
                _imagePressed: null,
                _imageFocus: null,
                _label: null,
                _imageCommand: null,
                onClick: null,


                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    this._onMouseDown = this._LANG.hitch(this, this._onMouseDown);
                    this._onMouseUp = this._LANG.hitch(this, this._onMouseUp);
                    this._onClickCallback = this._LANG.hitch(this, this._onClickCallback);

                },

                _postInit:function() {
                    this._callSuper("_postInit", arguments);
                    this._imageNormal = this.rootNode.querySelector(".imageNormal");
                    this._imagePressed = this.rootNode.querySelector(".imagePressed");
                    this._imageFocus = this.rootNode.querySelector(".imageFocus");

                    this._label =   this.rootNode.querySelector(".label");
                    this._imageCommand = this.rootNode.querySelector(".imageCommand");

                    //now we fix the values
                    if(!this._imagePressed.getAttribute("src") || this._imagePressed.getAttribute("src") == "") {
                        this._imagePressed.setAttribute("src", this._imageNormal.getAttribute("src"));
                    }
                    if(!this._imageFocus.getAttribute("src") || this._imageFocus.getAttribute("src") == "") {
                        this._imageFocus.setAttribute("src", this._imageNormal.getAttribute("src"));
                    }

                    //now we apply the event handlers
                    //click should make a short animation between the image changes
                    //mousedown should apply the click styleclass
                    //mouseup on a global scale should remove the image styleclass
                    //this.rootNode.addEventListener("mousedown", this._onMouseDown, false);
                    //this.rootNode.addEventListener("mouseup", this._onMouseUp, false);

                    //this.rootNode.addEventListener("click", this._onClick, false);
                    this.rootNode.toDomNode().addEventListener('click', this._onClickCallback, false)
                    var _t = this;
                    this.rootNode.querySelectorAll("*").forEach(function(elem) {
                        if(!elem.hasClass("imageCommand"))   {
                            elem.toDomNode().addEventListener('click', _t._onClickCallback, false);
                        }
                    });

                },

                _onClickCallback: function(evt) {
                    var ret = (this.onClick) ? this.onClick(evt): true;
                    if(!ret) return;

                    this._imageCommand.toDomNode().click();
                    evt.consumeEvent();
                },

                _onMouseDown: function(evt) {
                       this.rootNode.addClass("clicked");
                       window.addEventListener("mouseup", this._onMouseUp, false);
                },

                _onMouseUp: function(evt) {
                      this.rootNode.removeClass("clicked");
                      window.removeEventListener("mouseup", this._onMouseUp, false);

                }
            });
})
        ();