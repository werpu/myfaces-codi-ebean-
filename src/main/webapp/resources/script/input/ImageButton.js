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
                autoWidth: true,

                constructor_:function(args) {
                    this._callSuper("constructor", args);
                    this._onMouseDown = this._LANG.hitch(this, this._onMouseDown);
                    this._onMouseUp = this._LANG.hitch(this, this._onMouseUp);
                    this._onClickCallback = this._LANG.hitch(this, this._onClickCallback);
                    this._onKeyDown  = this._LANG.hitch(this, this._onKeyDown);
                    this._onKeyUp    = this._LANG.hitch(this, this._onKeyUp);
                    this._postInit = this._LANG.hitch(this, this._postInit);
                    setTimeout(this._postInit, 0);
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
                    this.rootNode.addEventListener("mousedown", this._onMouseDown, false);

                    this.rootNode.addEventListener("keydown", this._onKeyDown, false);
                    this.rootNode.addEventListener("keyup", this._onKeyUp, false);


                    this.rootNode.toDomNode().addEventListener('click', this._onClickCallback, false)

                    if(this.autoWidth) {
                        var innerWidth = parseInt(this._imageNormal.offsetWidth()) +
                                parseInt(this._label.offsetWidth())+
                                Math.min(
                                        parseInt(this._imageNormal.offsetLeft()) * 3,
                                        parseInt(this._label.offsetLeft()) * 3);
                        this.rootNode.setStyle("width",innerWidth+"px");
                    }

                },

                _onClickCallback: function(evt) {
                    var ret = (this.onClick) ? this.onClick(evt): true;
                    var currentTime = (new Date()).getTime();
                    //double click prevention
                    evt.stopPropagation();
                    if(extras.apache.ImageButton.__lastClick && (currentTime - extras.apache.ImageButton.__lastClick) < 500) {
                        extras.apache.ImageButton.__lastClick = currentTime;
                        return;
                    }
                    extras.apache.ImageButton.__lastClick = currentTime;
                    if(!ret) return;
                    //for strange kind of reasons we bubble a click up
                    this._imageCommand.toDomNode().onclick();

                },

                _onMouseDown: function(evt) {
                       this.rootNode.addClass("clicked");
                       window.addEventListener("mouseup", this._onMouseUp, false);
                },

                _onMouseUp: function(evt) {
                      this.rootNode.removeClass("clicked");
                      window.removeEventListener("mouseup", this._onMouseUp, false);

                },

                _onKeyDown: function(evt) {

                    var keyCode = evt.keyCode;
                    if(evt.keyCode == this.KEY_ENTER) {
                        this.rootNode.addClass("clicked");
                    }
                },

                _onKeyUp: function(evt) {
                    var keyCode = evt.keyCode;
                    if(evt.keyCode == this.KEY_ENTER) {
                        this.rootNode.removeClass("clicked");
                        this._onClickCallback(evt);
                    }
                }

            });
})
        ();